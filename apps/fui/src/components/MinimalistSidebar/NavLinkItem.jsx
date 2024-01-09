import { IconButton, LabelledIconButton } from '../../components/Button';

export function NavLinkItem({
    isActive,
    icon,
    onClick,
    isPrimary,
    ...additionalProps
}) {
    return isActive ? (
        <LabelledIconButton
            faIcon={icon}
            onClick={onClick}
            isPrimary={isPrimary}
        >
            <div className='nav-label'>{additionalProps.children}</div>
        </LabelledIconButton>
    ) : (
        <IconButton faIcon={icon} onClick={onClick} isPrimary={isPrimary} />
    );
}
