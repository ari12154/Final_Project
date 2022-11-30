export default function Body({children, opacityBody}) {
    return (
        <div style={{
            display: 'flex',
            minHeight: '80vh',
            border: '1px solid transparent',
            pointerEvents: (opacityBody ? "none" : "all"),
            opacity: (opacityBody ? 0.5 : 1),
            filter: (opacityBody ? 'blur(.8px)' : "none"),
        }}>
            {children}
        </div>
    )
}