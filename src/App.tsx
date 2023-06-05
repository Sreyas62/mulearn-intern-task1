import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Todo from './components/Todo/Todo';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.loggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      const user = { ...storedUser, loggedIn: true };
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (storedUser) {
      const user = { ...storedUser, loggedIn: false };
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedIn(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            loggedIn ? (
              <Todo handleLogout={handleLogout} />
            ) : (
              <Login handleLogin={handleLogin} loggedIn={loggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
