// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { auth } from "../../firebase";
// import Tile from "./Tile";

// export default function Board() {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem("tasks");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = await auth.currentUser?.getIdToken();
//         if (!token) return;

//         const res = await axios.get("/api/tasks", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setTasks(res.data);
//         localStorage.setItem("tasks", JSON.stringify(res.data)); // Save to localStorage
//       } catch (err) {
//         console.error("Error fetching tasks", err);
//       }
//     };

//     // Fetch only if no cached data
//     if (tasks.length === 0) fetchTasks();
//   }, []);

//   const getHighestTile = () =>
//     tasks.reduce((max, task) => Math.max(max, task.tilePosition), 0);

//   const visibleLimit = Math.ceil(getHighestTile() / 30) * 30 || 30;

//   const groupedTasks = {};
//   for (let i = 1; i <= 180; i++) {
//     groupedTasks[i] = tasks.filter((task) => task.tilePosition === i);
//   }

//   const getPawnPositionStyle = (index, total) => {
//     const styles = {
//       1: ['top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'],
//       2: ['top-1/2 left-1/4 transform -translate-y-1/2', 'top-1/2 right-1/4 transform -translate-y-1/2'],
//       3: ['top-1/4 left-1/4', 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', 'bottom-1/4 right-1/4'],
//       4: ['top-1/4 left-1/4', 'top-1/4 right-1/4', 'bottom-1/4 left-1/4', 'bottom-1/4 right-1/4'],
//     };
//     return styles[total]?.[index] || '';
//   };

//   const renderTiles = () => {
//     const tiles = [];
//     for (let i = 1; i <= 30; i++) {
//       tiles.push(
//         <Tile
//           key={i}
//           number={i}
//           tasksOnTile={groupedTasks[i] || []}
//           isVisible={i <= visibleLimit}
//           getPawnPositionStyle={getPawnPositionStyle}
//           navigate={navigate}
//         />
//       );
//     }
//     return tiles;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4">
//       <div className="mb-4 flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Your 180-Day Journey</h1>
//         <button
//           className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
//           onClick={() => navigate("/dashboard")}
//         >
//           ← Back to Dashboard
//         </button>
//       </div>

//       <div className="grid grid-cols-6 grid-rows-5 gap-2">
//         {renderTiles()}
//       </div>

//       <div className="mt-8 flex justify-center">
//         {visibleLimit < 180 && (
//           <div className="w-[520px] h-[170px] bg-gray-400 rounded-3xl shadow-inner flex items-center justify-center text-white text-2xl">
//             ☁️ More Tiles Coming Soon...
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // src/components/Board/Board.jsx
// src/components/Board/Board.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";
import Tile from "./Tile";

export default function Board() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const getHighestTile = () =>
      tasks.reduce((max, task) => Math.max(max, task.tilePosition), 0);
  
    const visibleLimit = Math.ceil(getHighestTile() / 30) * 30 || 30;
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const token = await auth.currentUser.getIdToken();
          const res = await axios.get("/api/tasks", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTasks(res.data);
        } catch (err) {
          console.error("Error fetching tasks", err);
        }
      };
      fetchTasks();
    }, []);

  const groupedTasks = {};
  for (let i = 1; i <= 180; i++) {
    groupedTasks[i] = tasks.filter((task) => task.tilePosition === i);
  }
  const getPawnPositionStyle = (index, total) => {
    const styles = {
      1: ['top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'],
      2: ['top-1/2 left-1/4 transform -translate-y-1/2', 'top-1/2 right-1/4 transform -translate-y-1/2'],
      3: ['top-1/4 left-1/4', 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', 'bottom-1/4 right-1/4'],
      4: ['top-1/4 left-1/4', 'top-1/4 right-1/4', 'bottom-1/4 left-1/4', 'bottom-1/4 right-1/4'],
    };
    return styles[total]?.[index] || '';
  };
  
  const renderTiles = () => {

    // const visibleLimit = Math.ceil(getHighestTile() / 30) * 30 || 30;

    const tiles = [];
    for (let i = 1; i <= 30; i++) {
      tiles.push(
        <Tile
        key={i}
        number={i}
        tasksOnTile={groupedTasks[i] || []}
        isVisible={i <= visibleLimit}
        getPawnPositionStyle={getPawnPositionStyle}
        navigate={navigate}
        />
      );
    }
    return tiles;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your 180-Day Journey</h1>
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-6 grid-rows-5 gap-2">
        {renderTiles()}
      </div>

      <div className="mt-8 flex justify-center">
        {visibleLimit < 180 && (
          <div className="w-[520px] h-[170px] bg-gray-400 rounded-3xl shadow-inner flex items-center justify-center text-white text-2xl">
            ☁️ More Tiles Coming Soon...
          </div>
        )}
      </div>
    </div>
  );
}
