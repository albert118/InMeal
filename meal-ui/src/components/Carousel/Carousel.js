import { TitleBar } from 'components'
import { propagateProps } from 'utils'

export default function Carousel({ items, title, ...additionalProps }) {
    return (
        <div className={`minimal-carousel ${additionalProps.className ?? ''}`}>
            <TitleBar>{title ?? additionalProps.label ?? ''}</TitleBar>
            <div className="minimal-carousel__items">
                {items?.map((item) =>
                    propagateProps(additionalProps.children, {
                        key: item.id,
                        ...item,
                        className: 'carousel-item',
                    }),
                )}
            </div>
        </div>
    )
}
