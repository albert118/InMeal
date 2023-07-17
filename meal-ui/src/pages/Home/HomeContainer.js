import HomeView from './View';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { useUpcomingRecipes } from 'hooks/data';

const randomSortArray = arr => {
	return arr.sort((a, b) => 0.5 - Math.random());
};

export default function HomeContainer() {
	const navigate = useNavigate();

	const mapper = dto => {
		return {
			...dto,
			handler: id => navigate(`${AppRoutes.recipe}/${id}`),
			status: {
				text: dto.status,
				color: '#ff3350'
			}
		};
	};

	const { upcomingRecipes } = useUpcomingRecipes(mapper);

	return (
		<HomeView
			plannedItems={upcomingRecipes}
			suggestedItems={randomSortArray(upcomingRecipes)}
		/>
	);
}
