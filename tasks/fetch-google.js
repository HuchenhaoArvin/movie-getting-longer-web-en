import fs from "fs";
import archieml from "archieml";
import docs from "../google.config.js";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent"; // 注意导入方式

const CWD = process.cwd();

const proxyUrl = "http://127.0.0.1:16005";
const agent = new HttpsProxyAgent(proxyUrl); // 创建代理实例

const fetchGoogle = async ({ id, gid }) => {
	console.log(`fetching...${id}`);

	const base = "https://docs.google.com";
	const post = gid
		? `spreadsheets/u/1/d/${id}/export?format=csv&id=${id}&gid=${gid}`
		: `document/d/${id}/export?format=txt`;
	const url = `${base}/${post}`;

	try {
		const response = await fetch(url, { agent });
		const text = await response.text();

		if (gid) return text;

		const parsed = archieml.load(text);
		const str = JSON.stringify(parsed);
		return str;
	} catch (err) {
		throw new Error(err);
	}
};

(async () => {
	for (let d of docs) {
		try {
			const str = await fetchGoogle(d);
			const file = `${CWD}/${d.filepath}`;
			fs.writeFileSync(file, str);
		} catch (err) {
			console.log(err);
		}
	}
})();
