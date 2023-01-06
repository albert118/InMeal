import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ImageCard } from "components/Card";
import '@splidejs/react-splide/css';


const Carousel = props => {
    const { className, items } = props;

    const splideOptions = {
        rewind: true,
        autoWidth: true,
        perPage: 2,
    };

    const classes = className ? `simple-carousel ${className}` : 'simple-carousel';

    return(
        <Splide className={classes} options={splideOptions}>
            { items.map(item => 
                <SplideSlide key={item.label}>
                    <ImageCard label={item.label} status={item.status}>
                        <img src={item.imgUrl} alt={item.label} />
                    </ImageCard>
                </SplideSlide>
            )}
        </Splide>
    );
};

export default Carousel;
