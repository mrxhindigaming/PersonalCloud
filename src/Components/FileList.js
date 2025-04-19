// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FileList = () => {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/files')
//       .then(response => setFiles(response.data))
//       .catch(error => console.error('Error fetching files:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Files on Azure</h2>
//       <ul>
//         {files.map((file) => (
//           <li key={file.name}>
//             <span>{file.name}</span> 
//             <a href={file.url} download>
//               <button>Download</button>
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FileList;
