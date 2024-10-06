/**
 * @param {string} fromWidthString
 * @param {string} toWidthString
 * @param {string} minSizeString
 * @param {string} maxSizeString
 * @returns {string}
 */
export const linearClamp = (minSizeString, maxSizeString, fromWidthString, toWidthString) => {
	const pixelsPerRem = 16

	if (!fromWidthString.endsWith('px') || !toWidthString.endsWith('px')) {
		throw new Error(
			`fromWidth and toWidth must be in pixels (got ${fromWidthString} and ${toWidthString}`
		)
	}

	let fromWidth = parseFloat(fromWidthString)
	let toWidth = parseFloat(toWidthString)
	if (minSizeString.endsWith('rem')) {
		fromWidth /= pixelsPerRem
		toWidth /= pixelsPerRem
	}

	const minSize = parseFloat(minSizeString)
	const maxSize = parseFloat(maxSizeString)

	const sizeUnit = minSizeString.endsWith('rem') ? 'rem' : 'px'

	const slope = (maxSize - minSize) / (toWidth - fromWidth)
	const yAxisIntersection = -fromWidth * slope + minSize
	const preferredValue = `${yAxisIntersection}${sizeUnit} + ${slope * 100}vw`

	return `clamp(${minSizeString}, ${preferredValue}, ${maxSizeString})`
}
