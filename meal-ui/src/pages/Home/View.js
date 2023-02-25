import { useContext } from 'react';
import { GenericContext } from 'pages/GenericPageContainer';
import { CommonActions } from './CommonActions';
import { QuickRecipesView } from './QuickRecipesView';

export default function View(props) {
	const genericContext = useContext(GenericContext);

	const { plannedItems, suggestedItems } = props;

	const classes = genericContext.className
		? `p-home-view ${genericContext.className}`
		: `p-home-view`;

	return (
		<div className={classes}>
			<QuickRecipesView
				plannedRecipes={plannedItems}
				suggestedRecipes={suggestedItems}
			/>
			<CommonActions />
		</div>
	);
}
