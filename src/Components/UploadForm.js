// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadForm = ({ token }) => {
//   const [file, setFile] = useState(null);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     await axios.post("http://localhost:5000/api/upload", formData, {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//       },
//     });

//     alert("Uploaded!");
//   };

//   return (
//     <form onSubmit={handleUpload} className="max-w-md mx-auto mt-4 bg-white p-4 rounded shadow">
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-3" />
//       <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Upload</button>
//     </form>
//   );
// };

// export default UploadForm;
