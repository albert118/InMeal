import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { useUpcomingRecipes } from 'hooks/data';
import { CommonActions } from './CommonActions';
import { QuickRecipesView } from './QuickRecipesView';
import { Grid, Column } from '@carbon/react';

export default function HomeContainer() {
	const navigate = useNavigate();

	const mapper = dto => {
		return {
			...dto,
			handler: id => navigate(`${AppRoutes.recipe}/${id}`)
		};
	};

	const { upcomingRecipes } = useUpcomingRecipes(mapper);

	return (
		<Grid className='p-home'>
			<Column
				className='p-home__r1'
				max={16}
				lg={16}
				md={8}
				sm={4}
			>
				<QuickRecipesView
					plannedRecipes={upcomingRecipes}
					suggestedRecipes={upcomingRecipes}
				/>
			</Column>
			<Column
				className='p-home__r2'
				max={16}
				lg={16}
				md={8}
				sm={4}
			>
				<CommonActions />
			</Column>
		</Grid>
	);
}
