declare module "*.css" {
	interface CSSObject {
		default: string
		origin: string
	}

	const content: CSSObject['default'];

	export default content;
}