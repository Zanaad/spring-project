import React, { useEffect, useState } from 'react';

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Load cached image if valid
    const cachedImage = localStorage.getItem('randomImageUrl');
    const lastFetchedTime = localStorage.getItem('imageFetchedTime');
    const currentTime = Date.now();

    if (cachedImage && lastFetchedTime && currentTime - lastFetchedTime < 3600000) {
      setImageUrl(cachedImage);
    } else {
      fetch('https://picsum.photos/1200')
        .then((response) => response.url)
        .then((url) => {
          setImageUrl(url);
          localStorage.setItem('randomImageUrl', url);
          localStorage.setItem('imageFetchedTime', currentTime);
        });
    }

    fetch('/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Failed to fetch todos:', err));
  }, []);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0 || trimmed.length > 140) return;

    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed }),
    })
      .then(() => {
        setTodos([...todos, trimmed]);
        setInputValue('');
      })
      .catch((err) => console.error('Failed to create todo:', err));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Todo App with Random Image</h1>

      {/* Display Random Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Random"
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
        />
      )}

      {/* Todo Input */}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter a todo"
          maxLength={140}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: '300px', padding: '10px', fontSize: '16px' }}
        />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px 20px' }}>
          Send
        </button>
      </div>

      {/* List of Todos */}
      <ul style={{ marginTop: '20px' }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ fontSize: '18px', marginBottom: '10px' }}>
            {todo.text} {/* Render the 'text' property of each todo */}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default RandomImage;
