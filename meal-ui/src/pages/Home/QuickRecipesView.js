import Card from 'components/Card';
import Carousel from 'components/Carousel';

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
