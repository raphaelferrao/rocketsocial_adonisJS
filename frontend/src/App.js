import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchOldPosts = async () => {
      const {data: oldPosts} = await api.get('/posts');
      setPosts(oldPosts);
    }

    fetchOldPosts();
  });

  const api = axios.create({
    baseURL: 'http://localhost:3333'
  });

  const handlePostSave = async (e) => {
    e.preventDefault();

    const { data: post } = await api.post('/posts', { content: newPostContent });

    setPosts([...posts, post]);
    setNewPostContent('');
  };

  return (
    <div className="App">
      <form onSubmit={handlePostSave} >
        <textarea
          onChange={(e) => setNewPostContent(e.target.value)}
          value={newPostContent} ></textarea>
        <button type="submit">Postar</button>
      </form>

      <ul>
        { posts.map( post => (
          <li key={post.id}>{post.content}</li>
        )) }
      </ul>
    </div>
  );
}

export default App;
