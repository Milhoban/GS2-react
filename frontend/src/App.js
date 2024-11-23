import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <div>
          <Login setUser={setUser} />
          <Signup setUser={setUser} />
        </div>
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
};

export default App;