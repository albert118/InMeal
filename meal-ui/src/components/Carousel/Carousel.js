import { RecipeCard } from 'components/RecipeCard';

import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const splideOptions = Object.freeze({
	rewind: true,
	autoWidth: true,
	perPage: 3
});

// An item is expected in the structure
// item = {
//      id: "unique string ID",
//      content: object,
//      label: "string",
//      status: DisplayStatus.enum,
//      handler: handlerFunc,
//      image: { url: "url", label: "string" }
// }
const Carousel = ({ className, items }) => {
	const classes = className
		? `simple-carousel ${className}`
		: 'simple-carousel';

	if (!items) {
		return <Splide className={classes}></Splide>;
	}

	return (
		<Splide
			className={classes}
			options={splideOptions}
		>
			{items.map(item => (
				<SplideSlide key={item.id}>
					<RecipeCard
						key={item.id}
						className='carousel-item'
						label={item.label}
						onClick={item.handler}
						recipe={item}
					/>
				</SplideSlide>
			))}
		</Splide>
	);
};

export default Carousel;

{
	/* <ImageCard
						className='carousel-item'
						id={item.id}
						label={item.label}
						status={item.status}
						ctaHandler={item.handler}
						entityName
					>
						<img
							src={item.image.url}
							alt={item.label}
						/>
					</ImageCard> */
}
