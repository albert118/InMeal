export default function Image({ alt, url, className }) {
    if (!url || url === '#')
        return <div style={{ display: 'None' }}>no content</div>;

    return (
        <div
            role='img'
            title={alt}
            className={`image-content ${className ?? ''}`}
            style={{ backgroundImage: `url(${url})` }}
        >
            <img className='image-content--alt' src='' alt={alt} />
        </div>
    );
}
