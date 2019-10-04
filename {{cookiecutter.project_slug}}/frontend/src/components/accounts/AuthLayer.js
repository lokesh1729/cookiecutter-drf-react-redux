import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { trimBasename } from "../../utils";

export default function authRequired(WrappedComponent) {
    const innerClass = class extends React.Component {
        render() {
            const isAuthenticated = this.props.state.isAuthenticated && this.props.state.currentUser;
            return (
                <Fragment>
                    {!isAuthenticated ? (
                        <Redirect to={`/login?next=${encodeURIComponent(trimBasename(this.props.location.pathname + this.props.location.search))}`} />
                    ) : (
                            <WrappedComponent {...this.props} />
                        )}
                </Fragment>
            );
        }
    };

    const mapStateToProps = (state) => ({
        state: state.auth,
    });
    return connect(
        mapStateToProps,
        null,
    )(withCookies(innerClass));
}
