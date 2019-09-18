import React, {Component} from 'react';
import { MDBBtn, MDBAlert} from 'mdbreact';
import BioData from './bioData'
import {bindActionCreators} from "redux";
import * as bioDataAction from "../../action/bioDataAction";
import connect from "react-redux/es/connect/connect";
class BioDataHandler extends Component {
    state = {
        toggle:false
    }
    setToggle(){
        this.setState({toggle:!this.state.toggle});
    }

    async componentDidMount() {
        await this.props.action.bioData.getBioData();
    }
    render() {
        return (
            <>
                {
                    (!this.state.toggle) ?
                        <MDBAlert color="info" className="bioData">
                            <h4 className="alert-heading">
                                {(this.props.bioData.firstName)?'You have successfully uploaded your bio-data'
                                    :'You have not yet uploaded your bio-data'
                                }
                            </h4>
                            <p>
                                click below button to {(this.state.uploaded)?'update':'upload'} your bio-data
                            </p>
                            <MDBBtn onClick={() => {
                                this.setToggle(true)
                            }}>{(this.props.bioData.firstName)?'UPDATE':'UPLOAD'} BIO-DATA</MDBBtn>
                        </MDBAlert> : (this.state.toggle) ?
                            <BioData toggleHandler = {() => {this.setToggle()}}
                                 uploadBioData = {this.props.action.bioData.uploadBioData}
                                 bioData =  {this.props.bioData}
                        /> : null
                }
            </>
        )
    }
}
const mapStateToProps = (state) => {
    const {bioData} = state;
    return {bioData}
};
const mapDispatchToProps = (dispatch) => ({
    action : {
        bioData : bindActionCreators(bioDataAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BioDataHandler);