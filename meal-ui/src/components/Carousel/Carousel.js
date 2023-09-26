import { TitleBar, NavigationArrowLeft, NavigationArrowRight } from 'components'
import { propagateProps } from 'utils'

export default function Carousel({ items, title, ...additionalProps }) {
    const isStart = true
    const isEnd = false

    return (
        <div className={`minimal-carousel ${additionalProps.className ?? ''}`}>
            <div className="minimal-carousel__header">
                <TitleBar>{title ?? additionalProps.label ?? ''}</TitleBar>
                <div className="nav-buttons">
                    <NavigationArrowLeft disabled={isStart} />
                    <NavigationArrowRight disabled={isEnd} />
                </div>
            </div>
            <div className="minimal-carousel__divider" />
            <div className="minimal-carousel__items scrollbar-vertical">
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
