import { useContext } from 'react';
import Card, { SimpleCard } from 'components/Card';
import Carousel from 'components/Carousel';
import { GenericContext } from 'pages/GenericPageContainer';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';

export default function View(props) {
	const { plannedItems, suggestedItems } = props;

	const genericContext = useContext(GenericContext);

	const navigate = useNavigate();

	const classes = genericContext.className
		? `p-home-view ${genericContext.className}`
		: `p-home-view`;

	return (
		<div className={classes}>
			<Card
				className='planning-quick-view'
				title='Upcoming...'
			>
				<Carousel items={plannedItems} />
			</Card>
			<Card
				className='explore-quick-view'
				title='Something else?'
			>
				<Carousel items={suggestedItems} />
			</Card>
			<SimpleCard>
				<div>
					Recipes
					<div className='action-option'>
						Add a new recipe
						<Button
							handler={() => navigate(`${AppRoutes.recipe}/add`)}
						>
							Add
						</Button>
					</div>
				</div>
				<div>
					Pantry
					<div className='action-option'>
						Update the pantry
						<Button handler={() => navigate(`${AppRoutes.root}`)}>
							add ingredients
						</Button>
					</div>
				</div>
				<div>
					Planning
					<div className='action-option'>
						Create a meal plan
						<Button handler={() => navigate(`${AppRoutes.root}`)}>
							plan
						</Button>
					</div>
				</div>
			</SimpleCard>
		</div>
	);
}
