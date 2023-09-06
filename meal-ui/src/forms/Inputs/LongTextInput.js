export default function LongTextInput({ label, rows, ...additionalProps }) {
	return (
		<div className={`form-input ${additionalProps.className ?? ''}`}>
			{label ? <label htmlFor={label}>{label}</label> : ''}
			<textarea
				id={label ?? crypto.randomUUID()}
				className='long-text-input scrollbar-vertical'
				rows={rows ?? '4'}
				maxLength='5000'
				{...additionalProps}
			/>
		</div>
	);
}
