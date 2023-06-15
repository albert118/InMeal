export default function IndexRow({ label, children }) {
    return (
        <div className="index-row">
            <label>{label}</label>
            <div className="index-row--items">
            {children}
            </div>
        </div>
    );
}