import { IconButton, LabelledIconButton } from 'components/Button';

export function NavLinkItem(props) {
	const { isActive, icon, handler } = props;

	return isActive ? (
		<LabelledIconButton
			faIcon={icon}
			handler={handler}
		>
			<div className='nav-label font-white'>{props.children}</div>
		</LabelledIconButton>
	) : (
		<IconButton
			faIcon={icon}
			handler={handler}
		/>
	);
}
