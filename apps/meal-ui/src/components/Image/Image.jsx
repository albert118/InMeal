// TODO: long run this could be replaced with a default fallback image when URL is invalid
import { demoImage } from 'DemoImage';

export default function Image({ alt, url, className }) {
    return (
        <div
            role='img'
            title={alt}
            className={`image-content ${className ?? ''}`}
            style={{ backgroundImage: `url(${url ?? demoImage.url})` }}
        >
            <img className='image-content--alt' src='' alt={alt} />
        </div>
    );
}
