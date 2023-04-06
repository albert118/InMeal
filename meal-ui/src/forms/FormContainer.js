export default function FormContainer({
	className,
	onSubmit,
	...additionalProps
}) {
	return (
		<form
			className={className ? `form ${className}` : `form`}
			onSubmit={onSubmit}
		>
			{additionalProps.children}
		</form>
	);
}
