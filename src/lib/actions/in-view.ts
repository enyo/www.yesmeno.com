export const inView = (node: HTMLElement, { threshold = 1.0 } = {}) => {
	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0]?.isIntersecting ?? false) {
				node.dispatchEvent(new CustomEvent('viewenter'))
			} else {
				node.dispatchEvent(new CustomEvent('viewexit'))
			}
		},
		{
			threshold
		}
	)
	observer.observe(node)

	return {
		destroy() {
			observer.disconnect()
		}
	}
}
