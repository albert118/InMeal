import { Carousel, Card } from 'components';

export function QuickRecipesView({ plannedRecipes, suggestedRecipes }) {
	return (
		<div className='quick-recipes-view'>
			<Card
				className='planning-quick-view'
				title='Upcoming...'
			>
				<Carousel items={plannedRecipes} />
			</Card>
			<Card
				className='explore-quick-view'
				title='Something else?'
			>
				<Carousel items={suggestedRecipes} />
			</Card>
		</div>
	);
}
