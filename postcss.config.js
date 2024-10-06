// import postcssLabFunction from 'postcss-lab-function'
import postcssPresetEnv from 'postcss-preset-env'
import postcssFluid from './tool/postcss/fluid/fluid.js'
import cssnano from 'cssnano'

const mode = process.env.NODE_ENV
const dev = mode === 'development'

export default {
	map: false,
	plugins: [
		postcssPresetEnv({
			stage: 2,
			features: {
				'custom-properties': false,
				'nesting-rules': true,
				'oklab-function': {
					preserve: true
				},
				'gamut-mapping': false
			}
		}),
		postcssFluid({ defaultFromWidth: '480px', defaultToWidth: '1440px' }),
		!dev &&
			cssnano({
				preset: [
					'default',
					{
						// For some reason these need to be disabled otherwise it breaks with
						// container queries.
						normalizeWhitespace: false,
						discardComments: false
					}
				]
			})
	]
}
