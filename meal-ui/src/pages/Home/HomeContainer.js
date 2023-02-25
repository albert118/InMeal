import GenericPageContainer from 'pages/GenericPageContainer';
import HomeView from './View';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import useUpcomingRecipes from 'dataHooks/useUpcomingRecipes';

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

	const randomSortArray = arr => {
		return arr.sort((a, b) => 0.5 - Math.random());
	};

	const { upcomingRecipes, isLoading } = useUpcomingRecipes(mapper);

	return (
		<GenericPageContainer>
			{!isLoading ? (
				<HomeView
					plannedItems={upcomingRecipes}
					suggestedItems={randomSortArray(upcomingRecipes)}
				/>
			) : (
				'loading...'
			)}
		</GenericPageContainer>
	);
}
