import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {GoogleLogin} from "react-google-login";
import {Helmet} from 'react-helmet';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from '../../icons/Facebook';
import GoogleIcon from '../../icons/Google';
import {signin} from '../../store/actions/auth';
import {GOOGLE_CLIENT_ID} from '../../environment/environment';
import React from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Login | Django-React Stack</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">

          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              dispatch(signin(values)).then(() => {
                navigate('/app/dashboard', {replace: true});

              })
            }}
            googleSuccess={async (res) => {
              const result = res?.profileObj;
              const token = res?.tokenId;

              try {
                dispatch(({type: 'AUTH', data: {result, token}}));
              } catch (error) {
                console.log(error)
              }
            }}

            googleFailure={(error) => {
              console.log(error);
              console.log('Google Sign in Was Unsuccessful. Try again Later.')
            }}
          >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                googleSuccess,
                googleFailure,
                isSubmitting,
                touched,
                values
              }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{mb: 3}}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon/>}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <GoogleLogin clientId={GOOGLE_CLIENT_ID} render={(renderProps) => (<Button
                      fullWidth
                      startIcon={<GoogleIcon/>}
                      onClick={renderProps.onClick}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>)}
                                 onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy="single_host_origin"/>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{py: 2}}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
