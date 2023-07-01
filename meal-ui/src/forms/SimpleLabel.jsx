export default function SimpleLabel({ label }) {
	const getLabelOrLabels = () => label.split(/\r?\n/).filter(e => e);

	return (
		<div className='form-input u-form-flexed-input'>
			<label>
				{getLabelOrLabels().map(l => (
					<div style={{ paddingTop: 0 }}>{l}</div>
				))}
			</label>
		</div>
	);
}
