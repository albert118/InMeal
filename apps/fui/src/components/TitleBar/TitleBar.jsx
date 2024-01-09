import { Button } from '../../components';

export default function TitleBar({ className, btnText, handler, children }) {
    return (
        <div className={`title-bar ${className ?? ''}`}>
            <h2 className='title'>{children}</h2>
            {!!btnText && <Button onClick={handler}>{btnText}</Button>}
        </div>
    );
}
