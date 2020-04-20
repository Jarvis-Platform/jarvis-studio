type ConfActivated = boolean | undefined;
type ConfArchived = boolean;

export const getActiveConfColor = (activated: ConfActivated, archived: ConfArchived) => {
	if (archived) return 'black';

	let activeColor;

	switch (activated) {
		case true:
			activeColor = 'green';
			break;
		case false:
			activeColor = 'grey';
			break;
		default:
			activeColor = 'amber';
			break;
	}
	return activeColor;
};

export const getActiveConfLabel = (activated: ConfActivated) => {
	let label = '';

	switch (activated) {
		case true:
			label = 'Activated';
			break;
		case false:
			label = 'Disabled';
			break;
		default:
			label = 'Not set';
			break;
	}
	return label;
};

export default {
	getActiveConfColor,
	getActiveConfLabel
};
