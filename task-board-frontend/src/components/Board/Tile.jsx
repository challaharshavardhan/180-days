// // src/components/Board/Tile.jsx
// src/components/Board/Tile.jsx
// src/components/Board/Tile.jsx
import { useNavigate } from "react-router-dom";

export default function Tile({ number, tasksOnTile = [], isVisible, getPawnPositionStyle }) {
  const navigate = useNavigate();

  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

  if (!isVisible) {
    return (
      <div className="relative w-20 h-20 border border-gray-300 flex items-center justify-center bg-gray-300">
        <span className="text-2xl">☁️</span>
      </div>
    );
  }

  return (
    <div className="relative w-20 h-20 border border-gray-300 bg-white">
      <span className="absolute top-1 left-1 text-xs text-gray-500">{number}</span>

      {tasksOnTile.slice(0, 4).map((task, index) => (
        <div
          key={task._id}
          title={`${task.title} - ${task.description}`}
          onClick={() => navigate(`/upload/${task._id}`)}
          className={`absolute w-5 h-5 rounded-full ${colors[index % colors.length]} 
            text-white text-xs flex items-center justify-center cursor-pointer 
            hover:scale-110 transition ${getPawnPositionStyle(index, tasksOnTile.length)}`}
        >
          {getChessPieceIcon(task.tilePosition)}
        </div>
      ))}
    </div>
  );
}

function getChessPieceIcon(tile) {
  if (tile >= 181) return "👑";
  if (tile >= 151) return "🤴"; // Queen riding horse (reuse 👑 or make custom later)
  if (tile >= 121) return "♕"; // Queen
  if (tile >= 91) return "♖";  // Rook
  if (tile >= 61) return "♘";  // Knight
  if (tile >= 31) return "♗";  // Bishop
  return "♙"; // Pawn
}

//change at 04/14/2025 at 3:09 they are working fine with more than 5 pawns creating
// export default function Tile({ number, tasksOnTile = [], isVisible }) {
//     const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
  
//     return (
//       <div
//         className={`relative w-20 h-20 border border-gray-300 flex items-center justify-center transition-all
//           ${isVisible ? "bg-white" : "bg-gray-300"}
//         `}
//       >
//         {isVisible ? (
//           <>
//             <span className="absolute top-1 left-1 text-xs text-gray-500">{number}</span>
//             {tasksOnTile.map((task, index) => (
//               <div
//                 key={task._id}
//                 className={`w-6 h-6 rounded-full ${colors[index % colors.length]} flex items-center justify-center text-white text-xs mx-0.5 tooltip`}
//                 title={`${task.title} - ${task.description}`}
//                 onClick={() => window.location.href = `/upload/${task._id}`}
//               >
//                 {getChessPieceIcon(task.tilePosition)}
//               </div>
//             ))}
//           </>
//         ) : (
//           <span className="text-2xl">☁️</span>
//         )}
//       </div>
//     );
//   }
  
//   function getChessPieceIcon(tile) {
//     if (tile >= 151) return "👑";
//     if (tile >= 121) return "♕";
//     if (tile >= 91) return "♖";
//     if (tile >= 61) return "♘";
//     if (tile >= 31) return "♗";
//     return "♙";
//   }
  
// export default function Tile({ number, isUnlocked, isCurrent, hasPiece, piece }) {
//     const pieceEmoji = {
//       pawn: "♙",
//       bishop: "♗",
//       knight: "♘",
//       rook: "♖",
//       queen: "♕",
//       queen_riding_horse: "🩷🐴",
//       king: "♔",
//     };
  
//     return (
//       <div
//         className={`w-16 h-16 border border-gray-300 flex items-center justify-center text-lg font-semibold
//         ${isUnlocked ? "bg-white" : "bg-gray-300"} 
//         ${isCurrent ? "ring-4 ring-yellow-500" : ""}`}
//       >
//         {hasPiece ? pieceEmoji[piece] : isUnlocked ? number : "☁️"}
//       </div>
//     );
//   }
  