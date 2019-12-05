import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Scanner from '../compiler/scanner';
import Parser from '../compiler/parser';
import { sendCodes, sendDotlist, sendTokenlist } from '../actions/index';

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '1vh',
        width: '96%',
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 5px 20px #999',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
                borderRadius: 10,
                color: '#888',
            },
            '&:hover fieldset': {
                borderColor: '#efefef',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3F51B5',
            },
        },
    },
    btn: {
        marginTop: '30px',
        marginLeft: '1%',
        width: '12%'
    },
};

const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: '#3F51B5',
        '&:hover': {
            backgroundColor: '#3F56Be',
        },
    },
}))(Button);

const CodePane = (props) => {
    //const classes = useStyles();
    const { classes, sendCodes, sendDotlist, sendTokenlist, codes } = props;
  
    const [value, setValue] = useState('Controlled');

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleCompile = event => {
        const code = value;
        sendCodes(code);

        const scanner = new Scanner(code);
        let temp = scanner.printTokens();
        
        sendTokenlist(temp);

        const parser = new Parser(code);
        parser.run();
        
        sendDotlist(parser.dotList);
    }

    return (
        <div className={classes.root}>
            <TextField
                id="outlined-multiline-static"
                label="Coding Pane"
                placeholder="Please input your codes here."
                multiline
                rows="18"
                onChange={handleChange}
                defaultValue={codes}
                className={classes.textField}
                variant="outlined"
            />
            <ColorButton variant="outlined" className={classes.btn} onClick={handleCompile}>Compile</ColorButton>  
        </div>

    );
}

CodePane.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    codes: PropTypes.string.isRequired,
    sendCodes: PropTypes.func.isRequired,
    sendDotlist: PropTypes.func.isRequired,
    sendTokenlist: PropTypes.func.isRequired
};

const stateMapToProps = (state) => {
    return {
        codes: state.codes,
        dotlist: state.dotlist,
        tokenlist: state.tokenlist
    }
};
const dispatchMapToProps = dispatch => ({
    sendCodes: (codes) => dispatch(sendCodes(codes)),
    sendDotlist: (dotlist) => dispatch(sendDotlist(dotlist)),
    sendTokenlist: (tokenlist) => dispatch(sendTokenlist(tokenlist))
});

export default connect(stateMapToProps, dispatchMapToProps)(withStyles(styles)(CodePane));