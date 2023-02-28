import View from './View';
import GenericPageContainer from 'pages/GenericPageContainer';

export default function AddRecipeContainer() {
	return (
		<GenericPageContainer>
			<div className='p-recipe'>
				<View />
			</div>
		</GenericPageContainer>
	);
}
