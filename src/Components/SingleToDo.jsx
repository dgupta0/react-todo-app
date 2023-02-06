import React from 'react'

export default function SingleToDo(props) {
    const styles = {
        backgroundColor: props.bulletClicked ? "#4a4adf" : "transparent",
    }

    const ValueStyles = {
        textDecoration: props.bulletClicked ? "line-through" : "none"
    }

    return (
        <li>
            <span id={props.value} className="bullet"
                onClick={() => props.handleBullet(props.value)} style={styles}>
                {props.bulletClicked && <p>✔</p>}

            </span>
            <h2 style={ValueStyles}>{props.value}</h2>
            <span onClick={props.handleDelete} id={props.value} className='delete'>X</span>
        </li>
    )
}