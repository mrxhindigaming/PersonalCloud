import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileList = ({ token }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await axios.get("http://localhost:5000/api/files", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setFiles(res.data);
    };
  
    fetchFiles();
  }, [token]);
  

  const fetchFiles = async () => {
    const res = await axios.get("http://localhost:5000/api/files", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    setFiles(res.data);
  };

  const handleDelete = async (fileName) => {
    await axios.delete(`http://localhost:5000/api/delete/${fileName}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchFiles();
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">📁 Your Files</h3>
      {files.map((f, idx) => (
        <div key={idx} className="flex justify-between items-center border-b py-2">
          <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-600">{f.name}</a>
          <button
            className="text-red-500"
            onClick={() => handleDelete(f.name)}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileList;
