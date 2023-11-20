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
function generateWalls(randomConstant) {
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
function generateStartingPoints(startingPoint, endingPoint) {
  const board = document.getElementById('board');
  if (startingPoint && endingPoint) {
    startingPoint.classList.add('path-start');
    endingPoint.classList.add('path-end');
    return [startingPoint, endingPoint];
  } else {
    let randomCord1 = Math.floor(Math.random() * numRows);
    let randomCord2 = Math.floor(Math.random() * numCols);
    point1 = startingPoint ? startingPoint : board.querySelector(`[data-row="${randomCord1}"][data-col="${randomCord2}"]`);
    randomCord1 = Math.floor(Math.random() * numRows);
    randomCord2 = Math.floor(Math.random() * numCols);
    point2 = endingPoint ? endingPoint : board.querySelector(`[data-row="${randomCord1}"][data-col="${randomCord2}"]`);

    point1.classList.add('path-start');
    point2.classList.add('path-end');
    return [point1, point2];
  }
}
async function generatePath(start, end, interval = 1000) {
  console.log("Trace?");
  const path = findPath(start, end);
  if (path.length > 0) {
    for (let i = 0; i < path.length; i++) {
      const currentCell = path[i];
      if (!currentCell.classList.contains('path-start') && !currentCell.classList.contains('path-end')) {
        currentCell.classList.add('path-found');
        // sleep for 1 s then proceed with the for
        await sleep(interval);
      }
    }
    return true;
  } else {
    return false;
  }
}
function findPath(start, end) {
  const queue = [];
  const visited = new Set();
  const parent = new Map();
  queue.push(start);
  visited.add(start);
  while (queue.length > 0) {
    const currentCell = queue.shift();
    if (currentCell === end) {
      return constructPath(parent, start, end);
    }
    const neighbors = getNeighbors(currentCell);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!visited.has(neighbor) && !neighbor.classList.contains('wall')) {
        queue.push(neighbor);
        visited.add(neighbor);
        parent.set(neighbor, currentCell);
      }
    }
  }
  return [];
}
function constructPath(parent, start, end) {
  const path = [];
  let currentCell = end;
  while (currentCell !== start) {
    path.unshift(currentCell);
    currentCell = parent.get(currentCell);
  }
  return path;
}
function getNeighbors(cell) {
  const neighbors = [];
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const north = document.querySelector(`[data-row="${row - 1}"][data-col="${col}"]`);
  const south = document.querySelector(`[data-row="${row + 1}"][data-col="${col}"]`);
  const east = document.querySelector(`[data-row="${row}"][data-col="${col + 1}"]`);
  const west = document.querySelector(`[data-row="${row}"][data-col="${col - 1}"]`);
  if (north) {
    neighbors.push(north);
  }
  if (south) {
    neighbors.push(south);
  }
  if (east) {
    neighbors.push(east);
  }
  if (west) {
    neighbors.push(west);
  }
  return neighbors;

}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function resetBoard() {
  createBoard();
  generateWalls();
  generateStartingPoints(false, false);
}
function startInfinitePathfinding() {
  let c = 1;
  while (true) {
    generatePath(points[0], points[1], 200)
    resetBoard();
    if (c > 100) { break; }
    c++;
  }
}
createBoard();
generateWalls();
points = generateStartingPoints(false, false);
document.getElementById('start-pathfinding').addEventListener('click', () => {
  generatePath(points[0], points[1], 200);
});
document.getElementById('reset').addEventListener('click', resetBoard);
// document.getElementById('start-pathfinding-infinite').addEventListener('click', () => {
//   resetBoard();
//   startInfinitePathfinding();
// });
