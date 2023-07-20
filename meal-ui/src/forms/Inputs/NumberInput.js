export default function NumberInput({
	className,
	name,
	label,
	value,
	placeholder,
	onChange,
	id,
	handleKeyDown
}) {
	const getIdOrLabel = () => {
		if (id) return id;
		if (label) return label;

		return 'generic-text-input-id';
	};

	return (
		<div className={`form-input ${className ?? ''}`}>
			{label ? <label htmlFor={label}>{label}</label> : ''}
			<input
				id={getIdOrLabel()}
				className='text-input'
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onKeyDown={handleKeyDown}
				type='number'
			/>
		</div>
	);
}
