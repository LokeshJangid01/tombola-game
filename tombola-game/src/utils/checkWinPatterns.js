export const checkWinPatterns = ({
  players,
  calledNumbers,
  setWinner,
  lineWinners,
  setLineWinners,
  winner,
  winTracker,
  setWinTracker,
}) => {
  players.forEach((player, index) => {
    const ticket = player.ticket;
    const flatNumbers = ticket.flat().filter(Boolean);

    // ✅ Full House
    if (!winner && flatNumbers.every((num) => calledNumbers.includes(num))) {
      setWinner(`🎉 ${player.name} wins Full House!`);
    }

    // ✅ Top / Middle / Bottom Lines
    if (!lineWinners.top) {
      const topRow = ticket[0].filter(Boolean);
      if (topRow.length > 0 && topRow.every((n) => calledNumbers.includes(n))) {
        setLineWinners((prev) => ({ ...prev, top: player.name }));
      }
    }

    if (!lineWinners.middle) {
      const midRow = ticket[1].filter(Boolean);
      if (midRow.length > 0 && midRow.every((n) => calledNumbers.includes(n))) {
        setLineWinners((prev) => ({ ...prev, middle: player.name }));
      }
    }

    if (!lineWinners.bottom) {
      const bottomRow = ticket[2].filter(Boolean);
      if (bottomRow.length > 0 && bottomRow.every((n) => calledNumbers.includes(n))) {
        setLineWinners((prev) => ({ ...prev, bottom: player.name }));
      }
    }

    // ✅ Early Five (first 5 numbers marked)
    if (!winTracker.earlyFive) {
      const marked = flatNumbers.filter((num) => calledNumbers.includes(num));
      if (marked.length >= 5) {
        setWinTracker((prev) => ({ ...prev, earlyFive: player.name }));
      }
    }

    // ✅ Star Pattern: 4 corners + center
    if (!winTracker.star) {
  const getNthNumber = (row, n) => row.filter(Boolean)[n - 1]; // 1-based index

  const topRow = ticket[0];
  const middleRow = ticket[1];
  const bottomRow = ticket[2];

  const topFirst = getNthNumber(topRow, 1);
  const topFifth = getNthNumber(topRow, 5);

  const middleThird = getNthNumber(middleRow, 3);

  const bottomFirst = getNthNumber(bottomRow, 1);
  const bottomFifth = getNthNumber(bottomRow, 5);

  const starPattern = [
    topFirst,
    topFifth,
    middleThird,
    bottomFirst,
    bottomFifth,
  ].filter(Boolean); // Exclude any nulls just in case

  if (starPattern.length === 5 && starPattern.every(num => calledNumbers.includes(num))) {
    setWinTracker(prev => ({ ...prev, star: player.name }));
  }
}
  });
};
