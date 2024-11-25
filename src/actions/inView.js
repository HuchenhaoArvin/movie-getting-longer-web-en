/**
 * This action triggers a custom event on node entering/exiting the viewport.
 * example:
 * <p
 * 	use:inView
 * 	on:enter={() => console.log("enter")}
 * 	on:exit={() => console.log("exit")}
 * >
 * 
 * optional params { root, top, bottom, progress }
 * top and bottom are numbers
 * use:inView={{ bottom: 100 }} // 100 pixels from bottom of viewport
 * 
 * progress is a boolean for incremental updates
 * use:inView={{ progres: true }}
 */

export default function inView(node, params = {}) {
	let observer;

	const handleIntersect = (e) => {
		const intersecting = e[0].isIntersecting;
		// console.log(intersecting, "intersecting")
		const v = intersecting ? "enter" : "exit";
		node.dispatchEvent(new CustomEvent(v));
		// console.log(node, "node")
		if (params.progress && intersecting) {
			const ratio = e[0].intersectionRatio;
			const detail = { ratio };
			// console.log(ratio, "ratio")
			// console.log(detail, "detail")
			node.dispatchEvent(new CustomEvent("progress", { detail }));
		}
	};

	const setObserver = ({ root, top, bottom }) => {
		const marginTop = top ? top * -1 : 0;
		const marginBottom = bottom ? bottom * -1 : 0;
		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
		const options = { root, rootMargin };
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(handleIntersect, options);;
		observer.observe(node);
		// console.log(observer, "observer")
	}

	setObserver(params);

	return {
		update(params) {
			setObserver(params);
		},

		destroy() {
			if (observer) observer.disconnect();
		}
	};
}