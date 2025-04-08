import React, { useState } from 'react';
import Login from './Components/Login';
import UploadForm from './Components/UploadForm';
import FileList from './Components/FileList';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">🌩️ Personal Cloud</h1>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <>
          <UploadForm token={token} />
          <FileList token={token} />
        </>
      )}
    </div>
  );
}

export default App;
