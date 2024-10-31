import { RecipeCard, TitleBar } from '..';
import { default as MultiCarousel } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { propagateProps } from '../../utils';
import './styles.scss';
import { ArrowRight, ArrowLeft } from '@carbon/icons-react';
import { Button } from '..';

// https://www.npmjs.com/package/react-multi-carousel
// a content gallery (carousel) display design
export default function Carousel({
    items,
    responsiveOptions,
    ...additionalProps
}) {
    const options = {
        // custom arrows are used instead
        arrows: false,
        responsive: responsiveOptions,
        containerClass: `minimal-carousel ${additionalProps.className ?? ''}`,
        itemClass: `minimal-carousel__item`
    };

    return (
        <div className='minimal-carousel'>
            <MultiCarousel
                {...options}
                customButtonGroup={<NavigationActions />}
            >
                {items?.map((item, index) =>
                    propagateProps(additionalProps.children, {
                        key: index,
                        ...item
                    })
                )}
            </MultiCarousel>
        </div>
    );
}

function NavigationActions({ next, previous, goToSlide, ...additionalProps }) {
    const {
        carouselState: { currentSlide, totalItems }
    } = additionalProps;

    return (
        <div className='minimal-carousel__actions'>
            <SlideArrow left onClick={previous} disabled={currentSlide === 0} />
            <SlideDots
                count={totalItems}
                currentSlide={currentSlide}
                onClick={slideNumber => console.log(slideNumber)}
            />
            <SlideArrow
                right
                onClick={next}
                disabled={currentSlide === totalItems - 1}
            />
        </div>
    );
}

function SlideDots({ count, currentSlide, onClick }) {
    return (
        <ul className='minimal-carousel__dot-list'>
            {Array.from({ length: count }).map((_, i) => (
                <li key={i} className='minimal-carousel__dot'>
                    <button
                        className={currentSlide === i ? 'current-slide' : ''}
                        onClick={() => onClick({ index: i })}
                    />
                </li>
            ))}
        </ul>
    );
}

function SlideArrow({ onClick, ...additionalProps }) {
    const { left, right, disabled } = additionalProps;
    return (
        <Button onClick={onClick} disabled={disabled}>
            {right && <ArrowRight />}
            {left && <ArrowLeft />}
        </Button>
    );
}
