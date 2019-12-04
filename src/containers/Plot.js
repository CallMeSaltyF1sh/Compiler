import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Parser from '../compiler/parser';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from 'recharts';

function Plot(props) {
    const { codes } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        let parser = new Parser(codes);
        parser.run();
        //setData(parser.dotList);
    });

    return (
        <div>
            <ScatterChart width={730} height={250}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="x" />
                <YAxis dataKey="y" name="y" />
                <Scatter name="A school" data={data} fill="#8884d8" />
            </ScatterChart>
        </div>
    )
}

Plot.propTypes = {
    codes: PropTypes.string.isRequired
}

const stateMapToProps = (state) => {
    return {
        codes: state.codes
    }
};
const dispatchMapToProps = dispatch => ({
});

export default connect(stateMapToProps, dispatchMapToProps)(Plot);