import React from "react";
import {connect} from "react-redux";

import './loader.css';
import Ax from '../../hoc/ax';

class Loader extends React.Component{
    render(){
        return(
            <Ax>
            {
                this.props.isLoading ? <div className="spinner-wrapper"><div className="spinner-border"></div></div> : null
            }
            </Ax>
        )
    }
}

const mapStateToProps = (state) => {
    const {isLoading} = state;
    return {isLoading};
};

const mapDispatchToProps = (dispatch) => ({
    actions : {}
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);