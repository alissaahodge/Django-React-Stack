import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Toolbar
} from '@material-ui/core';
import {Search as SearchIcon} from 'react-feather';
import {useDispatch} from "react-redux";
import {getPostsBySearch} from "../../store/actions/posts";

const PostListToolbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({search, tags: tags.join(',')}));
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
      //search for post
    }
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      > <RouterLink to="/app/posts/edit">
        <Button
          color="primary"
          variant="contained"
        >
          Add Post
        </Button></RouterLink>
      </Box>
      <Box sx={{mt: 3}}>
        <Card>
          <CardContent>
            <Box sx={{maxWidth: 500}}>
              <TextField
                fullWidth value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon/>
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Posts"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
};

export default PostListToolbar;
