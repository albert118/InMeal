export default function NumberInput({ className, label, id, ...additionalProps }) {
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
				type='number'
				{...additionalProps}
			/>
		</div>
	);
}
