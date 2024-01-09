export default function LongTextInput({ label, rows, ...additionalProps }) {
    return (
        <div className={`form-input ${additionalProps.className ?? ''}`}>
            {label ? <label htmlFor={label}>{label}</label> : ''}
            <textarea
                id={label ?? 'default_long_text_input_id'}
                className='long-text-input scrollbar-vertical'
                rows={rows ?? '4'}
                maxLength='5000'
                {...additionalProps}
            />
        </div>
    );
}
