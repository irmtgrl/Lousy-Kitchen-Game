import "../App.css"

export function Order(props){
    const style = {
        backgroundColor: props.isLocked ? "#14248A" : "#D4C2FC",
        color: props.isLocked ? "#D4C2FC" : "#28262C",
    }
    return (
        <button onClick={props.onClick} style={style} className="meal">
            {props.meal}
        </button>
    )
}