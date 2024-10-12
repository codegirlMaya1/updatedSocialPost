import { useQuery } from 'react-query';
import axios from 'axios';
import PostItem from './PostItem';
import { useEffect, useState } from 'react';

const fetchPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

const PostsList = () => {
  const { data: posts, isLoading, error } = useQuery('posts', fetchPosts);
  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setLocalPosts(storedPosts);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  // Combine and sort posts by timestamp
  const combinedPosts = [...localPosts, ...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="container">
      <h1>Posts</h1>
      <ul className="list-group">
        {combinedPosts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
