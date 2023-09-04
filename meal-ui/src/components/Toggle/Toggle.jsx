import { Toggle } from 'carbon-components-react';

export default function ToggleCustom({ onClick, ...additionalProps }) {
	const onClickAdaptor = event => {
		return onClick({
			target: { checked: event.target.ariaChecked, ...event.target }
		});
	};

	return (
		<Toggle
			className={`toggle ${additionalProps.className ?? ''}`}
			onClick={onClickAdaptor}
			{...additionalProps}
		/>
	);
}
