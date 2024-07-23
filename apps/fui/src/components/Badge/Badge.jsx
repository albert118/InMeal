export default function Badge({ text, labelText, isWarning, onClick }) {
    const portraitMinMediaQuery = window.matchMedia(
        '(max-width: 1194px)'
    ).matches;

    return (
        <div className='badge' onClick={onClick}>
            <a
                className={
                    portraitMinMediaQuery && isWarning ? 'e-warning-label' : ''
                }
            >
                {text}
            </a>
            {!portraitMinMediaQuery && labelText && (
                <label className={isWarning ? 'e-warning-label' : ''}>
                    {labelText}
                </label>
            )}
        </div>
    );
}
