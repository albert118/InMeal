// very simple texture component - kept separate for easy refactoring
// as I'd like to circle back to this idea at some point
// use this next to the component you'd like a glass background on, so long as they share
// the same container then the effect is g2g

// avoid using this directly on elements that contain text! It will mess with readability
// instead create a fake element for the background within a common parent container
export default function GlassBackground({ borderRadius }) {
    return (
        <div
            style={{
                // saturation and contrast make the colors pop for a nice vibrant effect
                // the blur creates the glass effect
                // brightness needs to be dropped for readability
                backdropFilter:
                    'saturate(100%) contrast(100%) blur(32px) brightness(60%)',
                // implement the "background"
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 'var(--layers-background)',
                // some usages need to match custom border radii - specify that here
                borderRadius: borderRadius ?? '12px'
            }}
        />
    );
}
