import React from 'react';

const StatusBadge = props => {
	const { className, status } = props;

	return (
		<div
			className={`status-badge ${className}`}
			style={{ backgroundColor: status.color }}
		>
			<p>{status.text}</p>
		</div>
	);
};

export default StatusBadge;
