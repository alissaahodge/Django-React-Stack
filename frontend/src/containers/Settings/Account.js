import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from '../../components/account/AccountProfile';
import AccountProfileDetails from '../../components/account/AccountProfileDetails';
import {useState} from "react";

const Account = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')).result);

  return(
  <>
    <Helmet>
      <title>Account | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile user={user} setUser={setUser}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails values={user} setValues={setUser} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default Account;
