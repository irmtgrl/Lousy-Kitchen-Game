import "../App.css"

export function Header({ rep, locked }) {
    const repBar = {
        backgroundColor: "#F9F5FF",
        height: "20px",
        width: "90%",
        filter: "drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.25))"
    }

    const repGained = {
        WebClipPath: "polygon(0% 0%, 90% 0%, 100% 100%, 0% 100%)",
        clipPath: "polygon(0% 0%, 90% 0%, 100% 100%, 0% 100%)",
        backgroundColor: "#998FC7",
        width: `${rep * 5}%`,
        height: "20px",
    }

    const lockedItems = {
        backgroundColor: "#F9F5FF",
        height: "10px",
        width: "70%"
    }

    const itemsLocked = {
        WebClipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)",
        clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)",
        backgroundColor: "#D4C2FC",
        width: `${locked * 25}%`,
        height: "10px"
    }

    return (
        <header>
            <div className="container">
                <p style={{margin: "0px"}}>Reputation & Items</p>
                <div style={repBar} className="repBar">
                    <div style={repGained} className="repGained"></div>
                </div>
                <div style={lockedItems} className="lockedItems">
                    <div style={itemsLocked} className="itemsLocked"></div>
                </div>
            </div>
        </header>
    )
}