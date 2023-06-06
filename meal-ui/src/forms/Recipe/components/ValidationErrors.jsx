export default function ValidationErrors({ errors }) {
	// don't render if there's nothing to show
	const showErrors = errors && errors.length > 0;

	const classes = `validation-errors ${
		showErrors ? 'validation-error--active' : ''
	}`;

	return (
		<div className={classes}>
			{errors &&
				errors.map(e => (
					<>
						{e}
						<br />
					</>
				))}
		</div>
	);
}
