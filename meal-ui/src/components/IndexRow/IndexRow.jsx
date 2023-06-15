export default function IndexRow({ label, children }) {
    return (
        <div className="index-row">
            <label>{label}</label>
            {children}
        </div>
    );
}