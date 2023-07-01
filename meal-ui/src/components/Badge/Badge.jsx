export default function Badge({ text, labelText, isWarning, onClick }) {
    return (
        <div className='badge' onClick={onClick}>
            <a>{text}</a>
            <label className={ isWarning ? '': 'e-warning-label'}>{labelText}</label>
        </div>
    );
}