import reduceFunctionCall from 'reduce-function-call'
import { linearClamp } from './fluid-helpers.js'

/**
 * @type {import('postcss').PluginCreator<{
 *   defaultFromWidth?: string
 *   defaultToWidth?: string
 * }>}
 */
const plugin = (opts) => {
	return {
		postcssPlugin: 'postcss-fluid',

		Declaration: function (decl) {
			decl.value = reduceFunctionCall(decl.value, 'fluid', (body) => {
				const values = body.split(',')
				if (values.length !== 2 && values.length !== 4) {
					throw decl.error(`Invalid value ${body}. You need to provide either 2 or 4 values.`)
				}

				try {
					return linearClamp(
						values[0],
						values[1],
						values[2] ?? opts?.defaultFromWidth ?? '480px',
						values[3] ?? opts?.defaultToWidth ?? '1440px'
					)
				} catch (e) {
					throw decl.error(`${e}`)
				}
			})
		}
	}
}

plugin.postcss = true

export default plugin
