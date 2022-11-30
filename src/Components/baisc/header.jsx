
export default function Header({children}) {

    const headerStyle = {
        color: '#aaa',
        width: '85vw',
        height: '3rem',
        overflow: 'hidden',
        borderBottom: '1px solid'
    }
    return (
        <div style={headerStyle}>
            {children}
        </div>
    );
}