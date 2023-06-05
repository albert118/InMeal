import Button from 'components/Button';

export default function ViewRecipeButton({ handler }) {
	return (
		<div className='action-container view-recipe-action'>
			<Button
				className='view-recipe-btn'
				onClick={handler}
			>
				view recipe
			</Button>
		</div>
	);
}
