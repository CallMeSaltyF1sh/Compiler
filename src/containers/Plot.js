import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from 'recharts';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = {
    paper: {
        width: '100%',
        margin: 'auto',
        height: 'auto'
    }
};

function Plot(props) {
    const { dotlist, classes } = props;
    const [data, setData] = useState(dotlist);

    return (
        <div>
            <Paper className={classes.paper}>
            <ScatterChart width={520} height={500}
                margin={{ top: 50, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="x" type='number' interval={0} domain={[0, 500]} />
                <YAxis dataKey="y" name="y" type='number' interval={0} domain={[0, 500]} />
                <Scatter name="dot" data={data} fill="#8884d8" />
            </ScatterChart>
            </Paper>
        </div>
    )
}

Plot.propTypes = {
    dotlist: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
};

const stateMapToProps = (state) => {
    return {
        dotlist: state.dotlist
    }
};

export default connect(stateMapToProps)(withStyles(styles)(Plot));