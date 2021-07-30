import React, {useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import {updateAccountPassword} from "../../store/actions/auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";

const SettingsPassword = (props) => {
  const id = JSON.parse(localStorage.getItem('profile')).result.id;
  const [values, setValues] = useState({
    old_password: '',
    new_password: '',
    new_password2: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = () => {
    dispatch(updateAccountPassword(id, {
      ...values
    }));
    setTimeout(function () {
      navigate('/home', {replace: true});
    }, 3000);

  };
  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider/>
        <CardContent>
          <TextField
            fullWidth
            required
            label="Old Password"
            margin="normal"
            name="old_password"
            onChange={handleChange}
            type="password"
            value={values.old_password}
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            label="New Password"
            margin="normal"
            name="new_password"
            onChange={handleChange}
            type="password"
            value={values.new_password}
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            label="Confirm New Password"
            margin="normal"
            name="new_password2"
            onChange={handleChange}
            type="password"
            value={values.new_password2}
            variant="outlined"
          />
        </CardContent>
        <Divider/>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <ConfirmDialog
            dialogText="Are you sure? You will be logged out upon reset of your password."
            okBtnText="Yes" cancelBtnTxt="No" openState={false}
            removeFunction={handleSubmit}
            color="primary" size="small"
            dialogBtnTxt={<> <Button
              color="primary"
              variant="contained"
            >
              Update
            </Button></>}/>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;
