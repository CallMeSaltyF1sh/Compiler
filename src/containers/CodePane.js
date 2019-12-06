import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Snackbar, IconButton } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import Scanner from '../interpreter/scanner';
import Parser from '../interpreter/parser';
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
        width: '15%'
    },

    close: {
        padding: '5px'
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

    const [value, setValue] = useState('');
    const [open, setOpen] = React.useState(false);


    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleCompile = event => {
        const code = value;
        sendCodes(code);

        const scanner = new Scanner(code);
        let temp = scanner.printTokens();
        if (temp === -1) {
            sendTokenlist([]);
            sendDotlist([]);
            setOpen(true);
        } else {
            sendTokenlist(temp);

            const parser = new Parser(code);
            const error = parser.run();
            if (error) {
                sendTokenlist([]);
                sendDotlist([]);
                setOpen(true);
            } else {
                sendDotlist(parser.dotList);
            }
        }

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
            <ColorButton variant="outlined" className={classes.btn} onClick={handleCompile}>Run it</ColorButton>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">syntaxError occured!</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
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