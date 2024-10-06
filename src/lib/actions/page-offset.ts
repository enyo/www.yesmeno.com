const cumulativeOffset = (element: HTMLElement) => {
	let top = 0,
		left = 0
	let el: HTMLElement | null = element

	do {
		top += el.offsetTop || 0
		left += el.offsetLeft || 0
		if (el.offsetParent && el.offsetParent instanceof HTMLElement) {
			el = el.offsetParent
		} else {
			el = null
		}
	} while (el)

	return {
		top: top,
		left: left
	}
}

export const pageOffset = (node: HTMLElement) => {
	const dispatch = () => {
		node.dispatchEvent(new CustomEvent('offset', { detail: cumulativeOffset(node) }))
	}
	setTimeout(dispatch, 1)
	window.addEventListener('resize', dispatch)
	return {
		destroy() {
			window.removeEventListener('resize', dispatch)
		}
	}
}
