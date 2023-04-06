import { CommonActions } from './CommonActions';
import { QuickRecipesView } from './QuickRecipesView';
import { Grid, Column } from '@carbon/react';
import ThemingGradient from 'assets/theming-gradient.svg';

export default function View({ plannedItems, suggestedItems }) {
	return (
		<Grid
			fullWidth
			className='p-home'
		>
			<Column
				className='p-home__r1'
				max={8}
				lg={16}
				md={8}
				sm={4}
			>
				<img
					className='theming-gradient-1'
					src={ThemingGradient}
				/>
				<QuickRecipesView
					plannedRecipes={plannedItems}
					suggestedRecipes={suggestedItems}
				/>
			</Column>
			<Column
				className='p-home__r2'
				max={8}
				lg={16}
				md={8}
				sm={4}
			>
				<img
					className='theming-gradient-2'
					src={ThemingGradient}
				/>
				<CommonActions />
			</Column>
		</Grid>
	);
}
