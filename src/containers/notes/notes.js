import React, {Component} from  'react'
import './notes.css'
import {Input, Button,FormGroup, Label} from 'reactstrap'

import Note from './note/note'
import {bindActionCreators} from "redux";
import * as notesAction from "../../action/notesAction";
import connect from "react-redux/es/connect/connect";

class Notes extends Component {
    state = {
            note:{_id:0, title:"", body:""},
            updateFlag:false
        };
    async componentWillMount() {
        await this.props.action.notes.getNotes();
    }
    clickHandler = (note) => {
        this.setState({updateFlag:true,note});
    }
    cancelHandler = () => {
        this.setState({note:{_id:0, title:"", body:""}, updateFlag:false})
    }
    updateHandler = (e) => {
        e.preventDefault();
        this.props.action.notes.updateNote(this.state.note);
        this.cancelHandler();
    }
    changeHandler= (event) => {
        let note = {...this.state.note};
        note[event.target.name]=event.target.value;
        this.setState({note})
    }
    deleteHandler = (e, id) => {
        e.preventDefault();
        this.props.action.notes.deleteNote(id);
    }
    addHandler = async (e) => {
        e.preventDefault();
        this.props.action.notes.addNote(this.state.note);
        setTimeout(()=>{
            this.cancelHandler();
        },1000);
    }
    render() {

        return(
            <div>
                <h1>My Notes</h1>
                <div className="noteControl">
                        <FormGroup>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={this.state.note.title} onChange={this.changeHandler.bind(this)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Body</Label>
                            <Input type="textarea" rows="4" name="body" value={this.state.note.body} onChange={this.changeHandler.bind(this)}/>
                        </FormGroup>
                        <div className="btn">
                    {
                        (!this.state.updateFlag) ?
                        <Button color="primary" onClick={this.addHandler.bind(this)}>ADD NOTE</Button>
                     : <Button color="primary" onClick={this.updateHandler.bind(this)}>UPDATE</Button>

                    }

                    <Button onClick={this.cancelHandler.bind(this)}>CANCEL</Button></div>
                </div>
                {
                    this.props.notes.map((note) => {
                        return <Note delete={this.deleteHandler.bind(this)} clicked={this.clickHandler.bind(this,note)} key={note._id} note={note}/>
                    })
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const {notes} = state;
    return {notes}
};
const mapDispatchToProps = (dispatch) => ({
    action : {
        notes : bindActionCreators(notesAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);