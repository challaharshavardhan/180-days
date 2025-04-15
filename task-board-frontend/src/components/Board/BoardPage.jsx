// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../firebase";
// import { Tooltip } from "react-tooltip";

// const BOARD_SIZE = 180;
// const VISIBLE_TILES = 30;
// const ROWS = 5;
// const COLS = 6;

// const pawnColors = ["#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D"];

// export default function BoardPage() {
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = await auth.currentUser.getIdToken();
//         const res = await axios.get("/api/tasks", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(res.data);
//       } catch (err) {
//         console.error("Error fetching tasks", err);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const getPawnsOnTile = (tileIndex) => {
//     return tasks.filter((task) => task.tilePosition === tileIndex + 1);
//   };

//   const renderTile = (index) => {
//     const pawns = getPawnsOnTile(index);

//     return (
//       <div
//         key={index}
//         className="w-20 h-20 border border-gray-300 relative bg-white hover:bg-gray-100 transition rounded-md shadow-sm"
//       >
//         {pawns.slice(0, 4).map((pawn, i) => (
//           <div
//             key={pawn._id}
//             title={`${pawn.title} - ${pawn.description}`}
//             className="absolute w-4 h-4 rounded-full cursor-pointer"
//             style={{
//               backgroundColor: pawnColors[i % pawnColors.length],
//               top: i === 0 ? "4px" : i === 1 ? "4px" : i === 2 ? "28px" : "28px",
//               left: i === 0 ? "4px" : i === 1 ? "28px" : i === 2 ? "4px" : "28px",
//             }}
//             onClick={() => navigate(`/upload/${pawn._id}`)}
//           ></div>
//         ))}

//         {pawns.length > 4 && (
//           <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 text-xs text-red-500 font-bold">
//             Max 4 tasks!
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-100 p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Your Journey</h1>

//       <div className="grid grid-cols-6 gap-2 justify-center mb-6">
//         {[...Array(VISIBLE_TILES)].map((_, index) => renderTile(index))}
//       </div>

//       <div className="w-full h-48 bg-cover bg-center relative rounded-xl overflow-hidden">
//         <img
//           src="https://i.imgur.com/SzbLvCP.png" // Or a cartoon cloud image of your choice
//           alt="Cloud covering"
//           className="w-full h-full object-cover opacity-80"
//         />
//         <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-gray-700">
//           More tiles unlock as you progress...
//         </div>
//       </div>

//       <div className="mt-6 text-center">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="text-blue-600 underline text-sm"
//         >
//           ← Back to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// }
