import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Details(props) {
    const { codes } = props;

    return (
        <div>
            {codes}
        </div>
    )
}

Details.propTypes = {
    codes: PropTypes.string.isRequired
};

const stateMapToProps = (state) => {
    return {
        codes: state.codes
    }
};
const dispatchMapToProps = dispatch => ({
});

export default connect(stateMapToProps, dispatchMapToProps)(Details);