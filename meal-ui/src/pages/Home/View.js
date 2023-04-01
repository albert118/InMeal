import { useContext } from 'react';
import { GenericContext } from 'pages/GenericPageContainer';
import { CommonActions } from './CommonActions';
import { QuickRecipesView } from './QuickRecipesView';
import { Grid, Column } from '@carbon/react';

export default function View({ plannedItems, suggestedItems }) {
	const genericContext = useContext(GenericContext);

	return (
		<Grid
			fullWidth
			className={
				genericContext.className
					? `p-home-view ${genericContext.className}`
					: `p-home-view`
			}
		>
			<Column
				lg={8}
				md={8}
				sm={4}
			>
				<QuickRecipesView
					plannedRecipes={plannedItems}
					suggestedRecipes={suggestedItems}
				/>
			</Column>
			<Column
				lg={8}
				md={8}
				sm={4}
			>
				<CommonActions />
			</Column>
		</Grid>
	);
}
