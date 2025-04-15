// utils/getChessRole.js
function getChessRole(tile) {
    if (tile >= 181) return 'king';
    if (tile >= 151) return 'queen_riding_horse';
    if (tile >= 121) return 'queen';
    if (tile >= 91) return 'rook';
    if (tile >= 61) return 'knight';
    if (tile >= 31) return 'bishop';
    return 'pawn';
  }
  
  module.exports = getChessRole;
  