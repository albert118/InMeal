export default function IndexRow({ label, children }) {
    return (
        <div className='index-row'>
            <div className='index-row__divider' />
            <div className='index-row__index-block'>
                <label className='index-block__label'>{label}</label>
                <div className='index-block__items'>{children}</div>
            </div>
        </div>
    );
}
