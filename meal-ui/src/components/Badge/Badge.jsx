export default function Badge({ text, labelText, isWarning, onClick }) {
	return (
		<div
			className='badge'
			onClick={onClick}
		>
			<a>{text}</a>
			{labelText && <label className={isWarning ? 'e-warning-label' : ''}>{labelText}</label>}
		</div>
	);
}
