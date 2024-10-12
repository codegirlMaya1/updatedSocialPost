import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const createPost = async (newPost) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return data;
};

const NewPostForm = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const createPostMutation = useMutation(createPost, {
    onSuccess: (data) => {
      // Add a timestamp to the new post
      const newPostWithTimestamp = { ...data, timestamp: new Date().toISOString() };

      // Save the new post to local storage
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(newPostWithTimestamp);
      localStorage.setItem('posts', JSON.stringify(posts));

      queryClient.invalidateQueries('posts');

      // Clear the form fields
      setTitle('');
      setBody('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate({ title, body });
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
      <button type="submit" className="btn btn-primary">Create Post</button>
    </form>
  );
};

export default NewPostForm;
