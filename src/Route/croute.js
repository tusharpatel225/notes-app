import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class CRoute extends Component {
    render() {
        const isUserLoggedIn = this.props.auth.token ? this.props.auth.token !== "" : false;
        //const userCurrentRole = this.props.auth.role;
        const { component, cprivate, crole, ...rest } = this.props;
        const Component = component;

        let redirectTo = undefined;
        if (isUserLoggedIn && (rest.path === "/login"||rest.path === "/signUp"))
            redirectTo = "/";
        else if (!isUserLoggedIn && cprivate)
            redirectTo = "/login";
        return (
            <Route
                {...rest}
                render={props => (
                    (redirectTo)
                        ?  <Redirect to={{pathname:redirectTo, state:{from:props.location}}} />
                        : <Component {...props} />
                )}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth : auth
    }
};

const mapDispatchToProps = dispatch => ({
    actions: {
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CRoute)
