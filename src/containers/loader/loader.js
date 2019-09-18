import React from "react";
import {connect} from "react-redux";

import './loader.css';

class Loader extends React.Component{
    render(){
        return(
            <>
            {
                this.props.isLoading ? <div className="spinner-wrapper"><div className="spinner-border"></div></div> : null
            }
            </>
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