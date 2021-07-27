import {Helmet} from 'react-helmet';
import {
  Box,
  Paper,
  Container,
  Grid,
  TextField,
  Typography,
  Button
} from '@material-ui/core';
import PostFormToolbar from '../../components/post/PostFormToolbar';
import {Formik} from "formik";
import FileBase from 'react-file-base64';
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createPosts, updatePost, getPost, deletePost} from "../../store/actions/posts";

const PostForm = () => {
  const initialState = {
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  };
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialState);
  const {id} = useParams();
  const {post} = useSelector((state) => state.posts);
  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post]);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  return (<>
    <Helmet>
      <title>Posts | Django-React Stack</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Formik
          enableReinitialize
          initialValues={postData}
          onSubmit={(values) => {
            if (id) {
              dispatch(updatePost(id, {
                ...values, name: `${user?.result?.firstName} ${user?.result?.lastName}`
              }));
            } else {

              dispatch(createPosts({...values, name: `${user?.result?.firstName} ${user?.result?.lastName}`}));
              navigate('/app/posts', {replace: true});
            }

          }}
          onDelete={(id) => {
            dispatch(deletePost(id));
            navigate('/app/posts', {replace: true});

          }}
        >
          {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              onDelete,
              touched,
              values
            }) => (
            <Container maxWidth={false}>
              <PostFormToolbar onSubmit={handleSubmit} onDelete={onDelete}/>
              <Box sx={{pt: 3}}>
                <Paper>
                  < form onSubmit={handleSubmit}>
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
                        {}
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.title && errors.title)}
                      fullWidth
                      helperText={touched.title && errors.title}
                      label="Title"
                      margin="normal"
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.title}
                      variant="outlined"
                      required
                    />
                    <TextField
                      error={Boolean(touched.message && errors.message)}
                      fullWidth
                      helperText={touched.message && errors.message}
                      label="Description"
                      margin="normal"
                      name="message"
                      multiline
                      rows={4}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="message"
                      value={values.message}
                      variant="outlined"
                      required
                    />

                    <TextField
                      error={Boolean(touched.tags && errors.tags)}
                      fullWidth
                      helperText={touched.tags && errors.tags}
                      label="Tags"
                      margin="normal"
                      name="tags"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.tags}
                      variant="outlined"
                    />
                    <FileBase type="file" multiple={false}
                              onDone={({base64}) => values.selectedFile = base64}/>
                  </form>
                  {id && values.selectedFile!== null && <div>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 3
                      }}
                    >
                      <img style={{
                        borderRadius: '20px',
                        objectFit: 'cover',
                        width: '90%',
                        maxHeight: '500px',
                        maxWidth: '400px'
                      }} src={values.selectedFile} alt={values.title}/>

                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 3
                      }}
                    >
                      <Button size="small" color="primary" variant="contained"
                              onClick={() => setPostData({...postData, selectedFile: ''})}
                      >
                        Remove Image
                      </Button></Box></div>}
                </Paper>
              </Box>
            </Container>
          )}
        </Formik>

      </Container>
    </Box>
  </>);
};

export default PostForm;
