import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import PostListResults from '../../components/post/PostListResults';
import PostListToolbar from '../../components/post/PostListToolbar';
import {useSelector} from 'react-redux';

const PostList = () => {
  const {posts} = useSelector((state) => state.posts);

return(  <>
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
        <PostListToolbar/>
        <Box sx={{pt: 3}}>
          <PostListResults posts={posts}/>
        </Box>
      </Container>
    </Box>
  </>);
};

export default PostList;
