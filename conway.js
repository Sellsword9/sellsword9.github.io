const numRows = 30;
const numCols = 50;
const interval = 100; // Intervalo de actualización en milisegundos
let grid = Array.from({ length: numRows }, () => Array(numCols).fill(false));
let running = false;
let timer;

// Función para crear el tablero y asignar eventos de clic
function createBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('dragenter', toggleCell);
      cell.addEventListener('click', toggleCell);
      board.appendChild(cell);
    }
  }
}

// Función para cambiar el estado de una celda
function toggleCell(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  grid[row][col] = !grid[row][col];
  updateCellState(row, col);
}

// Función para actualizar el estado visual de una celda
function updateCellState(row, col) {
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  cell.style.backgroundColor = grid[row][col] ? '#c55' : '#838383';
}

// Función para calcular el próximo estado del tablero
function calculateNextStep() {
  const newGrid = Array.from({ length: numRows }, () => Array(numCols).fill(false));

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const neighbors = countNeighbors(row, col);
      if (grid[row][col]) {
        // Celula viva
        if (neighbors === 2 || neighbors === 3) {
          newGrid[row][col] = true;
        }
      } else {
        // Celula muerta
        if (neighbors === 3) {
          newGrid[row][col] = true;
        }
      }
    }
  }

  grid = newGrid;
}

// Función para contar el número de células vecinas vivas
function countNeighbors(row, col) {
  let count = 0;
  const offsets = [-1, 0, 1];
  for (let i of offsets) {
    for (let j of offsets) {
      if (i === 0 && j === 0) continue;
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        count += grid[newRow][newCol] ? 1 : 0;
      }
    }
  }
  return count;
}

// Función para actualizar el tablero y programar la siguiente actualización
function updateBoard() {
  calculateNextStep();
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      updateCellState(row, col);
    }
  }
  if (running) {
    timer = setTimeout(updateBoard, interval);
  }
}

// Función para iniciar el juego
function startGame() {
  running = true;
  updateBoard();
}

// Función para detener el juego
function stopGame() {
  running = false;
  clearTimeout(timer);
}

// Función para limpiar el tablero
function clearBoard() {
  grid = Array.from({ length: numRows }, () => Array(numCols).fill(false));
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      updateCellState(row, col);
    }
  }
}

createBoard();