function generateTicket() {
  const ticket = Array.from({ length: 3 }, () => Array(9).fill(null));
  const columnRanges = [
    [1, 9],
    [10, 19],
    [20, 29],
    [30, 39],
    [40, 49],
    [50, 59],
    [60, 69],
    [70, 79],
    [80, 90],
  ];

  // Generate shuffled numbers for each column
  const columnNumbers = columnRanges.map(([start, end]) => {
    const nums = [];
    for (let i = start; i <= end; i++) {
      nums.push(i);
    }
    return shuffle(nums).slice(0, 3); // Only pick max 3 numbers per column
  });

  // Assign positions: 5 numbers per row, 15 in total
  for (let row = 0; row < 3; row++) {
    const cols = getRandomColumns(5); // Pick 5 unique columns
    cols.forEach((col) => {
      // Pick number from the available numbers for this column
      if (columnNumbers[col].length === 0) return;

      ticket[row][col] = columnNumbers[col].pop();
    });
  }

  return ticket;
}

// Pick n unique columns randomly
function getRandomColumns(n) {
  const indices = Array.from({ length: 9 }, (_, i) => i);
  return shuffle(indices).slice(0, n);
}

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default generateTicket;
