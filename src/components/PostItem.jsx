import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const deletePost = async (postId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
};

const PostItem = ({ post }) => {
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      // Remove the post from local storage
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      const updatedPosts = posts.filter(p => p.id !== post.id);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));

      // Invalidate and refetch the posts query
      queryClient.invalidateQueries('posts');
    },
  });

  const handleDelete = () => {
    deletePostMutation.mutate(post.id);
  };

  return (
    <li className="list-group-item">
      <h5>{post.title}</h5>
      <p>{post.body}</p>
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
    </li>
  );
};

export default PostItem;
