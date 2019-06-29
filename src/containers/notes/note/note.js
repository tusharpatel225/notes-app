import React from 'react'
import {MDBBtn} from 'mdbreact'
import './note.css'

const note = (props) => {
    return(
        <div className="note" >
            <h3 onClick={props.clicked}>{props.note.title}</h3>
            <p>{props.note.body}</p>
            <MDBBtn color="danger" onClick={(event) => props.delete(event, props.note._id)}>DELETE</MDBBtn>
        </div>
    )
}
export default note;