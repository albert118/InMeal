import { RecipeCard } from 'components';

// const splideOptions = Object.freeze({
// 	rewind: true,
// 	autoWidth: true,
// 	perPage: 3
// });

// An item is expected in the structure
// item = {
//      id: "unique string ID",
//      content: object,
//      label: "string",
//      handler: handlerFunc,
//      image: { url: "url", label: "string" }
// }
export default function Carousel({ className, items }) {
	if (!items) {
		return <div className={`simple-carousel ${className ?? ''}`}>nadda TODO</div>;
	}

	return (
		// <Splide
		// 	className={classes}
		// 	options={splideOptions}
		// >
		<div className={`simple-carousel ${className ?? ''}`}>
			{items.map(item => (
				<RecipeCard
					key={item.id}
					className='carousel-item'
					label={item.label}
					onClick={item.handler}
					recipe={item}
				/>
			))}
		</div>
		// </Splide>
	);
}
