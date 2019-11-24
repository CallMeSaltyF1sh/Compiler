import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        width: '98.5%',
        borderColor: '#ccc'
    },
}));

function CodePane(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = event => {
        setValue(event.target.value);
        console.log(event.target.value)
    };

    return (
        <div>
            <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows="20"
                defaultValue="Please input your codes here."
                onChange={handleChange}
                className={classes.textField}
                variant="outlined"
            />
        </div>

    );
}

export default CodePane;