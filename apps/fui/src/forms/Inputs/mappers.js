import { stringifyType } from '../../utils';

export default function mapToItem(item) {
    const handle = {
        object: stringifyType,
        string: arg => arg
    }[typeof item];

    // TODO: double check this
    // eslint-disable-next-line no-extra-boolean-cast
    return !!handle ? handle(item?.value ?? item?.label ?? item) : '';
}
