import { TitleBar } from '..';
import {
    CarouselProvider,
    Slide,
    Slider,
    ButtonBack,
    ButtonNext
} from 'pure-react-carousel';

import { propagateProps } from '../../utils';

export default function Carousel({ items, title, ...additionalProps }) {
    const visibleSlides = additionalProps?.visibleSlides ?? 3;

    return (
        <CarouselProvider
            className={`minimal-carousel ${additionalProps.className ?? ''}`}
            // the number of visible slides should vary based on screen size - I am too lazy to make this better
            // past the two target screens I want rn (my desktop + ipad) - but this could be done
            visibleSlides={
                items?.length > visibleSlides
                    ? visibleSlides
                    : items?.length ?? 0
            }
            totalSlides={items?.length ?? 0}
            isIntrinsicHeight={true}
            lockOnWindowScroll={true}
            // disable mouse dragging as it's buggy and allows "overdragging"
            dragEnabled={false}
            // step 2 at a time to make the user feel more movement - but not overwhelmed by too many items at once
            step={2}
        >
            <div className='minimal-carousel__header'>
                <TitleBar>{title ?? additionalProps.label ?? ''}</TitleBar>
                <div className='nav-buttons'>
                    <ButtonBack className='btn nav-btn'>&lt;</ButtonBack>
                    <ButtonNext className='btn nav-btn'>&gt;</ButtonNext>
                </div>
            </div>
            <div className='minimal-carousel__divider' />
            <Slider
                classNameTray='slider-tray'
                classNameAnimation='slider-animation'
            >
                {items?.map((item, index) => {
                    return (
                        <Slide index={index} key={index}>
                            {propagateProps(additionalProps.children, {
                                key: index,
                                ...item,
                                className: 'carousel-item'
                            })}
                        </Slide>
                    );
                })}
            </Slider>
        </CarouselProvider>
    );
}
