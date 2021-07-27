import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

export default function ConfirmDialog({dialogText, okBtnText, cancelBtnTxt, openState, removeFunction, id, dialogBtnTxt, color, size}) {
    const [open, setOpen] = React.useState(openState);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (choice) => {
        setOpen(false);

        if (choice === true) {
            removeFunction()
        }
    };

    return (
        <Fragment>
            <Button onClick={handleClickOpen} size={size} color={color}> {dialogBtnTxt}</Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            ><DialogContent>
                <DialogContentText>
                    {dialogText}
                </DialogContentText>
            </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleClose(false)} color="primary">
                        {cancelBtnTxt}
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                        {okBtnText}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
