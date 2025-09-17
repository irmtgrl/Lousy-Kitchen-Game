export function Button (props) {
    /*** 3 button types: refresh, send, next ***/

    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}