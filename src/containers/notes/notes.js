import React, {Component} from  'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput,
    MDBCard, MDBCardBody, MDBCardHeader, MDBTable, MDBTableHead, MDBTableBody} from 'mdbreact'
import {Radio} from '@material-ui/core';

import {bindActionCreators} from "redux";
import * as notesAction from "../../action/notesAction";
import connect from "react-redux/es/connect/connect";

class Notes extends Component {
    state = {
        note:{_id:0, title:"", body:""},
        updateFlag:false,
        viewFlag : false,
        toggleModal : false,
        noteId : ""
    };
    async componentWillMount() {
        await this.props.action.notes.getNotes();
    }
    clickHandler = () => {
        let notes = {...this.props.notes.filter((note) => note._id === this.state.noteId)[0]};
        this.setState({updateFlag:true,note : notes, toggleModal: true});
    }
    viewHandler = () => {
        let notes = {...this.props.notes.filter((note) => note._id === this.state.noteId)[0]};
        this.setState({viewFlag:true,note : notes, toggleModal:true});
    }
    cancelHandler = () => {
        this.setState({note:{_id:0, title:"", body:""}, updateFlag:false, toggleModal: false, noteId:"", viewFlag:false})
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
    deleteHandler = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.action.notes.deleteNote(this.state.noteId);
                        this.setState({noteId: ""});
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }
    addHandler = async (e) => {
        e.preventDefault();
        this.props.action.notes.addNote(this.state.note);
        setTimeout(()=>{
            this.cancelHandler();
        },1000);
    }
    toggleModal = () => {
        let toggle = this.state.toggleModal;
        if(toggle){
            this.cancelHandler();
        }
        this.setState({toggleModal : !toggle});
    }
    toggleEdit = (e) => {
        e.preventDefault();
        this.setState({viewFlag : false, updateFlag : true});
    }
    render() {
        return(
            <div>
                <MDBModal isOpen={this.state.toggleModal}>
                    <form onSubmit={this.state.updateFlag ? this.updateHandler.bind(this) : this.addHandler.bind(this) }>
                        <MDBModalHeader>
                            {
                                (this.state.updateFlag) ? 'Update ': (this.state.viewFlag) ? 'View ' : 'Add '
                            }
                            Note
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput required minLength={5} readOnly={this.state.viewFlag} label="Title" type="text" name="title" value={this.state.note.title} onChange={this.changeHandler.bind(this)}/>
                            <MDBInput required readOnly={this.state.viewFlag} label="Body" type="textarea" rows="3" name="body" value={this.state.note.body} onChange={this.changeHandler.bind(this)}/>
                        </MDBModalBody>
                        <MDBModalFooter>
                            {
                                (this.state.viewFlag) ? <MDBBtn color="primary" onClick={this.toggleEdit.bind(this)}>Edit</MDBBtn> : null
                            }
                            <MDBBtn color="secondary" onClick={this.toggleModal.bind(this)}>Close</MDBBtn>
                            {
                                (!this.state.viewFlag) ?
                                    <MDBBtn type="submit" color="primary">Submit</MDBBtn>
                                    : null
                            }
                        </MDBModalFooter>
                    </form>
                </MDBModal>
                {
                    (this.props.notes.length > 0) ?
                        <MDBCard className="mt-4">
                                <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                                    <div>
                                        <MDBBtn outline rounded size="sm" color="white" className="px-2" onClick={this.toggleModal.bind(this)}>
                                            <i className="fa fa-plus mt-0" title="Add Note"></i>
                                        </MDBBtn>
                                    </div>
                                    <div className="white-text mx-3">My Notes</div>
                                    <div>
                                        <MDBBtn outline rounded size="sm" color="white" className="px-2" onClick={this.clickHandler.bind(this)}
                                                disabled={this.state.noteId === ""}>
                                            <i className="fas fa-pencil-alt mt-0" title="edit"></i>
                                        </MDBBtn>
                                        <MDBBtn outline rounded size="sm" color="white" className="px-2" onClick={this.deleteHandler.bind(this)}
                                                disabled={this.state.noteId === ""}>
                                            <i className="fas fa-times mt-0" title="delete"></i>
                                        </MDBBtn>
                                        <MDBBtn outline rounded size="sm" color="white" className="px-2"
                                                disabled={this.state.noteId === ""} onClick={this.viewHandler.bind(this)}>
                                            <i className="fa fa-info-circle mt-0" title="View"></i>
                                        </MDBBtn>
                                    </div>
                                </MDBCardHeader>
                                <MDBCardBody cascade>
                                    <MDBTable fixed>
                                        <MDBTableHead columns={[
                                            {
                                                'label': <MDBBtn color="primary" outline size="sm" className="px-2" title="clear"
                                                                 onClick={ () => {this.setState({noteId:""})}}
                                                                 disabled={this.state.noteId === ""}>
                                                            <i className="fa fa-times mt-0"></i>
                                                </MDBBtn>,
                                                'field': 'check',
                                                'sort': 'asc'
                                            },
                                            {
                                                'label': 'Number',
                                                'field': 'number',
                                                'sort': 'asc'
                                            },
                                            {
                                                'label': 'Title',
                                                'field': 'title',
                                                'sort': 'asc'
                                            },
                                            {
                                                'label': 'Body',
                                                'field': 'body',
                                                'sort': 'asc'
                                            }]} />
                                        <MDBTableBody rows={this.props.notes.map((note, index) => {
                                            return {
                                                'check':<Radio
                                                    color="primary"
                                                    id={"chk"+index}
                                                    value={note._id}
                                                    name="chk"
                                                    onChange={() => {this.setState({noteId : note._id})}}
                                                    checked={this.state.noteId === note._id}
                                                />,
                                                'number':index+1,
                                                'title':note.title,
                                                'body':<div className="text-truncate">{note.body}</div>
                                            }
                                        })} />
                                    </MDBTable>
                                </MDBCardBody>
                            </MDBCard>
                        : null
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