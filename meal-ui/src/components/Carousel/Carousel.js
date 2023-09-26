import { propagateProps } from 'utils'

export default function Carousel({ items, ...additionalProps }) {
    return (
        <div className={`simple-carousel ${additionalProps.className ?? ''}`}>
            {items?.map((item) =>
                propagateProps(additionalProps.children, {
                    key: item.id,
                    ...item,
                    className: 'carousel-item',
                }),
            )}
        </div>
    )
}
