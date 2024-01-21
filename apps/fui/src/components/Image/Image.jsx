export default function Image({ alt, url, className }) {
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
