import {useState} from "react";

const GRID = [
  ['G','H','O','S','T','I','N','G','A','B','C','D'],
  ['L','O','V','E','B','O','M','B','I','N','G','E'],
  ['F','R','X','Q','Z','W','K','P','S','T','U','V'],
  ['B','R','E','A','D','C','R','U','M','B','I','N'],
  ['G','H','J','K','L','M','N','O','P','Q','R','S'],
  ['T','U','V','W','X','Y','Z','A','B','C','D','E'],
];

const WORDS = ['GHOSTING', 'LOVEBOMBING', 'BREADCRUMBING'];

function WordSearch({ onComplete }) {
  const [selected, setSelected] = useState([]);
  const [found, setFound] = useState([]);
  const [foundCells, setFoundCells] = useState([]);

  const handleClick = (row, col) => {
    const cellKey = `${row}-${col}`;
    const alreadySelected = selected.find(c => c.key === cellKey);

    if (alreadySelected) {
      setSelected(selected.filter(c => c.key !== cellKey));
      return;
    }

    const newSelected = [...selected, { key: cellKey, row, col, letter: GRID[row][col] }];
    setSelected(newSelected);

    const word = newSelected.map(c => c.letter).join('');
    const wordReverse = word.split('').reverse().join('');

    const match = WORDS.find(w => w === word || w === wordReverse);

    if (match && !found.includes(match)) {
      const newFound = [...found, match];
      setFoundCells([...foundCells, ...newSelected.map(c => c.key)]);
      setFound(newFound);
      setSelected([]);
      alert(`¡Encontraste: ${match}! 🎉`);

      if (newFound.length === WORDS.length) {
        onComplete();
      }
    }
  };

  return (
    <div>
      <p>Debes ir haciendo clic letra por letra: {WORDS.map(w => (
        <span key={w} style={{
          marginRight: '10px',
          textDecoration: found.includes(w) ? 'line-through' : 'none',
          color: found.includes(w) ? 'green' : 'black',
          fontWeight: 'bold'
        }}>{w}</span>
      ))}</p>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID[0].length}, 36px)`, gap: '4px' }}>
        {GRID.map((row, rIdx) =>
          row.map((letter, cIdx) => {
            const key = `${rIdx}-${cIdx}`;
            const isSelected = selected.find(c => c.key === key);
            const isFound = foundCells.includes(key);
            return (
              <div
                key={key}
                onClick={() => handleClick(rIdx, cIdx)}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isFound ? '#90EE90' : isSelected ? '#FFD700' : '#f0f0f0',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  borderRadius: '4px'
                }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default WordSearch;