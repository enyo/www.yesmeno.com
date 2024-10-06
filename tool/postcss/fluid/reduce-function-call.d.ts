declare module 'reduce-function-call' {
	const ReduceFunction: (
		input: string,
		functionRE: string,
		callback: (body: string, functionIdentifier: string) => string
	) => string

	export default ReduceFunction
}
