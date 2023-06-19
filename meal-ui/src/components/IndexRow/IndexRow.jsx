export default function IndexRow({ label, children }) {
    return (
        <div className="index-row">
            <div className="index-row--divider" />
            <div className="index-row--index-block">
                <label>{label}</label>
                <div className="index-row--items">
                    {children}
                </div>
            </div>
        </div>
    );
}