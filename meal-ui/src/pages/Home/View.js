import { CommonActions } from './CommonActions';
import { QuickRecipesView } from './QuickRecipesView';
import { Grid, Column } from '@carbon/react';

export default function View({ plannedItems, suggestedItems }) {
	return (
		<Grid
			fullWidth
			className='p-home'
		>
			<Column
				className='p-home__r1'
				lg={16}
				md={8}
				sm={4}
			>
				<QuickRecipesView
					plannedRecipes={plannedItems}
					suggestedRecipes={suggestedItems}
				/>
			</Column>
			<Column
				className='p-home__r2'
				lg={16}
				md={8}
				sm={4}
			>
				<CommonActions />
			</Column>
		</Grid>
	);
}
