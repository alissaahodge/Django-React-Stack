import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/styles";

// @material-ui/icons

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import {Box, Button, Container, Grid, Link, TextField, Typography} from "@material-ui/core";
import {Formik} from "formik";
import * as Yup from "yup";
import {signin} from "../../../store/actions/auth";
import FacebookIcon from "../../../icons/Facebook";
import {GoogleLogin} from "react-google-login";
import {GOOGLE_CLIENT_ID} from "../../../environment/environment";
import GoogleIcon from "../../../icons/Google";
import {Link as RouterLink, useNavigate} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" className={classes.section}>
      <Box sx={{
        minHeight: '100%',
        py: 3
      }}>
        <Typography
          color="textPrimary"
          variant="h2"
        >
          Work with us
        </Typography><br/>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="body1">

          Divide details about your product or agency work into parts. Write a
          few lines about each one and contact us about any further
          collaboration. We will respond get back to you in a couple of
          hours.
        </Typography>
        <br/>
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              message: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              message: Yup.string().required('Message is required'),
            })}
            onSubmit={(values) => {
              navigate('/', {replace: true});
            }}
          >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{mb: 3}}>
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
                    send us a message
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.message && errors.message)}
                  fullWidth
                  helperText={touched.message && errors.message}
                  label="Message"
                  margin="normal"
                  name="message"
                  multiline
                  rows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="message"
                  value={values.message}
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
                    Send
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box></Container>
  );
}
