import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/files");
      setFilesList(res.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose a file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/upload/upload", formData);
      setFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`http://localhost:5000/upload/delete/${filename}`);
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(to right, #8EC5FC, #E0C3FC)",
      padding: "20px",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#333"
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "30px",
      color: "#fff",
      textShadow: "1px 1px 3px rgba(0,0,0,0.5)"
    },
    centerBox: {
      backgroundColor: "#ffffffcc",
      padding: "30px",
      borderRadius: "16px",
      maxWidth: "750px",
      margin: "0 auto",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    },
    sectionTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#4b0082"
    },
    fileInputRow: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      marginBottom: "25px"
    },
    uploadButton: {
      padding: "10px 24px",
      background: "linear-gradient(to right, #667eea, #764ba2)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "0 4px 10px rgba(118, 75, 162, 0.4)",
      transition: "transform 0.2s ease-in-out"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    },
    th: {
      textAlign: "left",
      padding: "12px",
      backgroundColor: "#7f5af0",
      color: "#fff",
      fontWeight: "600"
    },
    td: {
      padding: "12px",
      backgroundColor: "#f9f9f9",
      borderBottom: "1px solid #e0e0e0"
    },
    link: {
      color: "#4f46e5",
      textDecoration: "none",
      fontWeight: "bold"
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },
    downloadBtn: {
      backgroundColor: "#2ecc71",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "8px 12px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "background-color 0.2s ease"
    },
    deleteBtn: {
      color: "#f43f5e",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "color 0.2s ease"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌈 Personal Cloud</h1>
      <div style={styles.centerBox}>
        <h2 style={styles.sectionTitle}>📂 Your Cloud Files</h2>

        <div style={styles.fileInputRow}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button
            style={styles.uploadButton}
            onClick={handleUpload}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            🚀 Upload
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>📄 File</th>
              <th style={styles.th}>🛠 Action</th>
            </tr>
          </thead>
          <tbody>
            {filesList.map((f, i) => (
              <tr key={i}>
                <td style={styles.td}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                  >
                    {f.name}
                  </a>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button
                      style={styles.downloadBtn}
                      onClick={() => handleDownload(f.url, f.name)}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#27ae60")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#2ecc71")}
                    >
                      ⬇ Download
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(f.name)}
                      onMouseOver={(e) => (e.target.style.color = "#be123c")}
                      onMouseOut={(e) => (e.target.style.color = "#f43f5e")}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;