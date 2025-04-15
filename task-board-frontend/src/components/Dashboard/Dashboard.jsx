// src/components/Dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import axios from "axios";

export default function Dashboard() {
  const [hasTasks, setHasTasks] = useState(false);
  const [disableCreate, setDisableCreate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await axios.get("/api/tasks", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          const tasks = response.data || [];
          setHasTasks(tasks.length > 0);
          setDisableCreate(tasks.length >= 4);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    });
  
    return () => unsubscribe(); // cleanup listener
  }, []);
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const token = await auth.currentUser.getIdToken();
  //       const response = await axios.get("/api/tasks", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       const tasks = response.data || [];
  //       setHasTasks(tasks.length > 0);
  //       setDisableCreate(tasks.length >= 4); // ✅ Disable if 4 or more tasks exist
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 text-white p-6">
      <h1 className="text-4xl font-bold mb-10">180 Days</h1>
      <div className="space-y-4 w-full max-w-xs">
      <div
          title={
            disableCreate
              ? "You already have 4 active tasks. Finish one to create a new one."
              : ""
          }
        >
        <button
          onClick={() => navigate("/create-task")}
          disabled={disableCreate}
          className="w-full py-3 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Task
        </button>
          </div>
        <button
          onClick={() => navigate("/board")}
          disabled={!hasTasks}
          className={`w-full py-3 ${
            hasTasks
              ? "bg-white text-indigo-600 hover:bg-gray-100"
              : "bg-gray-400 text-white cursor-not-allowed"
          } rounded-xl font-semibold text-lg`}
        >
          Your Journey
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// // src/components/Dashboard/Dashboard.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../firebase";
// import { signOut } from "firebase/auth";
// import axios from "axios";

// export default function Dashboard() {
//   const [hasTasks, setHasTasks] = useState(false);
//   const navigate = useNavigate();

//   // Fetch tasks to check if user has at least one
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = await auth.currentUser.getIdToken();
//         const response = await axios.get("/api/tasks", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setHasTasks(response.data.length > 0);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 text-white p-6">
//       <h1 className="text-4xl font-bold mb-10">180 Days</h1>
//       <div className="space-y-4 w-full max-w-xs">
//         <button
//           onClick={() => navigate("/create-task")}
//           className="w-full py-3 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-gray-100"
//         >
//           Create Task
//         </button>

//         <button
//           onClick={() => navigate("/board")}
//           disabled={!hasTasks}
//           className={`w-full py-3 ${
//             hasTasks
//               ? "bg-white text-indigo-600 hover:bg-gray-100"
//               : "bg-gray-400 text-white cursor-not-allowed"
//           } rounded-xl font-semibold text-lg`}
//         >
//           Your Journey
//         </button>

//         <button
//           onClick={handleLogout}
//           className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold text-lg"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
