import React, {Component} from 'react';
import { Button, Alert} from 'reactstrap';
import Ax from '../../hoc/ax'
import BioData from './bioData'
import {bindActionCreators} from "redux";
import * as bioDataAction from "../../action/bioDataAction";
import connect from "react-redux/es/connect/connect";
class BioDataHandler extends Component {
    state = {
        toggle:false,
        uploaded : false
    }
    setToggle(){
        this.setState({toggle:!this.state.toggle});
    }

    componentWillMount() {
        this.props.action.bioData.getBioData();
        setTimeout(()=>{
        if(this.props.bioData.firstName!=="")
             this.setState({uploaded:true});
        },100);
    }
    render() {
        return (
            <Ax>
                {
                    (!this.state.toggle) ?
                        <Alert color="info" className="bioData">
                            <h4 className="alert-heading">
                                {(this.state.uploaded)?'You have successfully uploaded your bio-data'
                                    :'You have not yet uploaded your bio-data'
                                }
                            </h4>
                            <p>
                                click below button to {(this.state.uploaded)?'update':'upload'} your bio-data
                            </p>
                            <Button onClick={() => {
                                this.setToggle(true)
                            }}>{(this.state.uploaded)?'UPDATE':'UPLOAD'} BIO-DATA</Button>
                        </Alert> :
                        <BioData toggleHandler = {() => {this.setToggle()}}
                                 uploadBioData = {this.props.action.bioData.uploadBioData}
                                 bioData =  {this.props.bioData}
                        />
                }
            </Ax>
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