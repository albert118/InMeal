import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ImageCard } from "components/Card";
import '@splidejs/react-splide/css';


// An item is expected in the structure
// item = { 
//      id: "unique string ID",
//      content: object,
//      label: "string",
//      status: DisplayStatus.enum,
//      handler: handlerFunc,
//      image: { url: "url", label: "string" } 
// }
const Carousel = props => {
    const { className, items } = props;

    const splideOptions = Object.freeze({
        rewind: true,
        autoWidth: true,
        perPage: 2,
    });

    const classes = className ? `simple-carousel ${className}` : 'simple-carousel';

    return(
        <Splide className={classes} options={splideOptions}>
            { items.map(item => 
                <SplideSlide key={item.id}>
                    <ImageCard 
                        id={item.id}
                        label={item.label}
                        status={item.status}
                        ctaHandler={item.handler}
                    >
                        <img src={item.image.url} alt={item.label} />
                    </ImageCard>
                </SplideSlide>
            )}
        </Splide>
    );
};

export default Carousel;
