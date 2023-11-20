const numRows = 30;
const numCols = 30;
function createBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('path');
      cell.dataset.row = row;
      cell.dataset.col = col;
      board.appendChild(cell);
    }
  }
}
function generateRandomPoints(randomConstant) {
  if (!randomConstant) {
    randomConstant = 5;
  }
  const board = document.getElementById('board');
  // resets the board from the previous random points
  const alreadyWall = board.querySelectorAll('.wall');
  Array.from(alreadyWall).forEach((cell) => {
    cell.classList.remove('wall');
  });
  const start = board.querySelector(`[data-row="0"][data-col="0"]`);
  const end = board.querySelector(`[data-row="${numRows - 1}"][data-col="${numCols - 1}"]`);
  start.classList.add('start');
  end.classList.add('end');

  const randomPoints = Math.floor((numRows * numCols) / randomConstant);
  for (let i = 0; i < randomPoints; i++) {
    const randomRow = Math.floor(Math.random() * numRows);
    const randomCol = Math.floor(Math.random() * numCols);
    const randomCell = board.querySelector(`[data-row="${randomRow}"][data-col="${randomCol}"]`);
    randomCell.classList.add('wall');
  }
}
createBoard();
generateRandomPoints();