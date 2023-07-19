export default function ValidationErrors({ errors }) {
	// don't render if there's nothing to show
	const showErrors = errors && Array.isArray(errors) && errors.length > 0;

	const classes = `validation-errors ${showErrors ? 'validation-error--active' : ''}`;

	return (
		<div className={classes}>
			{showErrors && errors.map((e, idx) => <label key={`validation-error--${idx}`}>{e}</label>)}
		</div>
	);
}
