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
  const id = JSON.parse(localStorage.getItem('profile')).result._id;
  const [values, setValues] = useState({
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAccountPassword(id, {
      ...values
    }));
    navigate('/home', {replace: true});

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
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            value={values.confirmPassword}
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
