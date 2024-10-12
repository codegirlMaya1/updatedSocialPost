import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const updatePost = async (updatedPost) => {
  const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, updatedPost);
  return data;
};

const UpdatePostForm = ({ post }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const updatePostMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostMutation.mutate({ ...post, title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Update Post</button>
    </form>
  );
};

export default UpdatePostForm;
