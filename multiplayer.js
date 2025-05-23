import { getDatabase, ref, onValue, off } from "firebase/database";

window.friendGameBoard = function(id) {
  mode = "friend";
  if (id) gameId = id;
  if (playerSymbol == null) playerSymbol = "O";
  startMultiplayer();
};

function startMultiplayer() {
  renderFriendGame();
  if (roomRef) off(roomRef); // Modular sintaksis
  roomRef = ref(db, "games/" + gameId);
  onValue(roomRef, (snap) => {
    let data = snap.val();
    if (!data) {
      alert("O‘yin tugadi yoki mavjud emas.");
      // leaveGame();
      return;
    }
    board = data.board;
    turn = data.turn;
    winner = data.winner;
    renderFriendGame();
  });
}
