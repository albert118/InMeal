import {
    NavigationArrowLeft,
    NavigationArrowRight,
    TitleBar
} from 'components';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import { propagateProps } from 'utils';

const carouselConfig = {
    isIntrinsicHeight: true,
    totalSlides: 3
};

export default function Carousel({ items, title, ...additionalProps }) {
    return (
        <CarouselProvider
            className={`minimal-carousel ${additionalProps.className ?? ''}`}
            {...carouselConfig}
        >
            <div className='minimal-carousel__header'>
                <TitleBar>{title ?? additionalProps.label ?? ''}</TitleBar>
                <div className='nav-buttons'>
                    <NavigationArrowLeft />
                    <NavigationArrowRight />
                </div>
            </div>
            <div className='minimal-carousel__divider' />
            <Slider
                classNameAnimation='slider-animation'
                classNameTray='slider-tray'
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
