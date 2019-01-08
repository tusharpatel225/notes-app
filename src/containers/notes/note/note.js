import React from 'react'
import {Button} from 'reactstrap'
import './note.css'

const note = (props) => {
    return(
        <div className="note" >
            <h3 onClick={props.clicked}>{props.note.title}</h3>
            <p>{props.note.body}</p>
            <Button color="danger" onClick={(event) => props.delete(event, props.note._id)}>DELETE</Button>
        </div>
    )
}
export default note;