import { stringifyType } from 'utils';

export default function mapToItem(item) {
	const handle = {
		object: stringifyType,
		string: arg => arg
	}[typeof item];

	return !!handle ? handle(item?.value ?? item?.label ?? '') : '';
}
