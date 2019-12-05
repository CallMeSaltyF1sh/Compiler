import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

const styles = {
    paper: {
        width: '40%',
        marginLeft: '35px'
    }
};

function Details(props) {
    const { classes, tokenlist } = props;
    const [rows, setRows] = useState(tokenlist);

    return (
        <div>
            <Paper className={classes.paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>记号类别（序号）</TableCell>
                            <TableCell align="right">字符串</TableCell>
                            <TableCell align="right">常数值</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.type}
                                </TableCell>
                                <TableCell align="right">{row.lexeme}</TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

Details.propTypes = {
    tokenlist: PropTypes.array.isRequired,
};

const stateMapToProps = (state) => {
    return {
        tokenlist: state.tokenlist
    }
};

export default connect(stateMapToProps)(withStyles(styles)(Details));