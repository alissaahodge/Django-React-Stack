import {useNavigate} from 'react-router-dom';
import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Typography, Button} from '@material-ui/core';
import classNames from "classnames";
import {makeStyles} from "@material-ui/styles";


// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";

import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import WorkSection from "./Sections/WorkSection.js";

const useStyles = makeStyles(styles);
//https://demos.creative-tim.com/material-kit-react
const Home = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/app/dashboard', {replace: true});

    } else {
      navigate('/home', {replace: true});

    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

          <Parallax filter image={require("../../assets/images/backgrounds/landing-bg.jpg").default}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h1 className={classes.title}> Django-React Stack</h1>
                  <Typography variant="h5" paragraph>
                    Every landing page needs a small description after the big bold
                    title, that{"'"}s why we added this text here. Add here all the
                    information that can make you or your product create the first
                    impression.
                  </Typography>
                  <br/>
                  <Button
                    color="primary"
                    size="large"
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <ProductSection/>
              <WorkSection/>
            </div>
          </div>
    </>);
};

export default Home;
