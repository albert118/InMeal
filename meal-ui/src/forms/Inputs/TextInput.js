export default function TextInput({ label, onChange, handleKeyDown, ...additionalProps }) {
	return (
		<div className={`form-input ${additionalProps.className ?? ''}`}>
			{label && <label htmlFor={label}>{label}</label>}
			<input
				id={additionalProps.id ?? 'default_text_input_id'}
				className='text-input'
				onChange={handler}
				onKeyDown={handleKeyDown}
				type='text'
			/>
		</div>
	);
}
