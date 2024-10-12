export const fetchPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  };
  
  export const createPost = async (newPost) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    return res.json();
  };
  
  export const updatePost = async (updatedPost) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    });
    return res.json();
  };
  
  export const deletePost = async (postId) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    });
  };
  
  export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation(deletePost, {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    });
  };
  
  export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation(updatePost, {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    });
  };
  