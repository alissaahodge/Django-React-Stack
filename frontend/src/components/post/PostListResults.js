import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';
import {getPosts} from "../../store/actions/posts";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PostListResults = ({posts, ...rest}) => {
  const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {numberOfPages} = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts(page))

  }, [page]);

  const handleSelectAll = (event) => {
    let newSelectedPostIds;

    if (event.target.checked) {
      newSelectedPostIds = posts.map((post) => post.id);
    } else {
      newSelectedPostIds = [];
    }

    setSelectedPostIds(newSelectedPostIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPostIds.indexOf(id);
    let newSelectedPostIds = [];

    if (selectedIndex === -1) {
      newSelectedPostIds = newSelectedPostIds.concat(selectedPostIds, id);
    } else if (selectedIndex === 0) {
      newSelectedPostIds = newSelectedPostIds.concat(selectedPostIds.slice(1));
    } else if (selectedIndex === selectedPostIds.length - 1) {
      newSelectedPostIds = newSelectedPostIds.concat(selectedPostIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPostIds = newSelectedPostIds.concat(
        selectedPostIds.slice(0, selectedIndex),
        selectedPostIds.slice(selectedIndex + 1)
      );
    }

    setSelectedPostIds(newSelectedPostIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{minWidth: 1050}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPostIds.length === posts.length}
                    color="primary"
                    indeterminate={
                      selectedPostIds.length > 0
                      && selectedPostIds.length < posts.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Creator
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Tags
                </TableCell>
                <TableCell>
                  Creation date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.slice(0, limit).map((post) => (
                <TableRow
                  hover
                  key={post._id}
                  selected={selectedPostIds.indexOf(post._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPostIds.indexOf(post._id) !== -1}
                      onChange={(event) => handleSelectOne(event, post._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell   onClick={()=>navigate(`/app/posts/edit/${post._id}`, {replace: true})}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={post.selectedFile}
                        sx={{mr: 2}}
                      >
                        {getInitials(post.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {post.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell   onClick={()=>navigate(`/app/posts/edit/${post._id}`, {replace: true})}>
                    {post.title}
                  </TableCell>
                  <TableCell   onClick={()=>navigate(`/app/posts/edit/${post._id}`, {replace: true})}>
                    {post.message}
                  </TableCell>
                  <TableCell   onClick={()=>navigate(`/app/posts/edit/${post._id}`, {replace: true})}>
                    {post.tags}
                  </TableCell>
                  <TableCell   onClick={()=>navigate(`/app/posts/edit/${post._id}`, {replace: true})}>
                    {moment(post.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={numberOfPages}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={Number(page) || 1}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PostListResults.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostListResults;
