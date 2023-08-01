export default function ValidationWarnings({ warnings }) {
	const showWarnings = warnings && Array.isArray(warnings) && warnings.length > 0;

	return (
		<div className={`validation-warnings ${showWarnings ? 'validation-warning--active' : ''}`}>
			{showWarnings &&
				warnings.map((e, idx) => <label key={`validation-warning--${idx}`}>{e}</label>)}
		</div>
	);
}
