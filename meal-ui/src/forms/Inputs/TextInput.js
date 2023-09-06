export default function TextInput({ label, onChange, ...additionalProps }) {
	function handleKeyDown(event) {
		if (event.key !== 'Enter') return;
		event.preventDefault();
		onChange(event);
	}

	return (
		<div className={`form-input ${additionalProps.className ?? ''}`}>
			{label && <label htmlFor={label}>{label}</label>}
			<input
				id={additionalProps.id ?? 'default_text_input_id'}
				className='text-input'
				onKeyDown={handleKeyDown}
				onChange={onChange}
				type='text'
			/>
		</div>
	);
}
