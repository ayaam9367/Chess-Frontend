export const PlayButton = ({ onClick, classes, children }) => {
    return <button onClick={onClick} 
            className={classes}
            >
        {children}
    </button>
}