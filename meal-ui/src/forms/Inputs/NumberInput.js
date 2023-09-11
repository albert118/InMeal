export default function NumberInput({ className, ...additionalProps }) {
	return (
		<div className={`form-input ${className ?? ''}`}>
			{additionalProps.label && (
				<label htmlFor={additionalProps.label ?? 'generic-text-input-id'}>
					{additionalProps.label}
				</label>
			)}
			<input
				id={additionalProps.id ?? additionalProps.label ?? 'generic-text-input-id'}
				className='text-input'
				type='number'
				{...additionalProps}
			/>
		</div>
	);
}
