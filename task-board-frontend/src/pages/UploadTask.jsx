import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import axios from "axios";

export default function UploadTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Wait for user to be available
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const token = await user.getIdToken();
            const res = await axios.get(`/api/tasks/${taskId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setTask(res.data);
          } else {
            console.error("User not authenticated");
          }
        });
  
        return () => unsubscribe(); // Cleanup on unmount
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };
  
    fetchTask();
  }, [taskId]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");
    
    try {
        const token = await auth.currentUser.getIdToken();

        const validationRes = await axios.post(
            "/api/upload/validate",
            { taskId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("taskId", taskId);
    
        await axios.post("http://localhost:5000/api/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        });
    
        alert("File uploaded successfully!");
        navigate("/board");

      alert("File uploaded and task updated!");
      navigate("/board");
    } catch (err) {
        if (err.response?.data?.message === "Task already updated today") {
          alert("You’ve already submitted progress for this task today.");
        } else {
          console.error("Upload failed:", err);
          alert("Upload failed. Please try again.");
        }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = await auth.currentUser.getIdToken();
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task deleted");
      navigate("/board");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Upload Proof for: {task?.title}
        </h2>

        <p className="text-sm mb-4">{task?.description}</p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={!file}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Upload
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}
