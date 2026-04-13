import {useState} from "react";

const GRID = [
  ['G','H','O','S','T','I','N','G','A','B','C','D','E','F','Z','P'],
  ['A','L','O','V','E','B','O','M','B','I','N','G','J','K','O','E'],
  ['S','R','X','Q','Z','W','K','P','S','T','U','V','R','L','M','R'],
  ['L','B','R','E','A','D','C','R','U','M','B','I','N','G','B','A'],
  ['I','E','J','K','L','M','N','O','P','Q','R','S','N','H','I','G'],
  ['G','N','Y','R','Q','U','Z','A','N','J','D','E','A','N','E','N'],
  ['H','C','E','N','I','N','S','F','L','P','Ñ','U','V','H','I','I'],
  ['T','H','W','G','X','Y','Z','A','B','C','N','E','M','I','N','K'],
  ['I','I','T','J','L','F','R','G','N','T','O','G','L','I','G','L'],
  ['N','N','M','A','J','L','I','T','I','W','I','Ñ','M','T','X','A'],
  ['G','G','V','W','X','Y','Z','N','B','C','H','E','M','U','S','T'],
  ['W','E','C','H','O','C','G','L','I','M','A','M','I','N','T','S'],
];

const WORDS = ['LOVEBOMBING', 'BREADCRUMBING', 'GHOSTING', 'GASLIGHTING', 'ZOMBIEING', 'HAUNTING', 'STALKING', 'BENCHING'];

//palabras que sean en linea recta

function isValidLine(cells) {
  if (cells.length < 2) return true;
  const dr = cells[1].row - cells[0].row;
  const dc = cells[1].col - cells[0].col;
  for (let i = 1; i < cells.length; i++) {
    if ((cells[i].row - cells[i - 1].row) !== dr) return false;
    if ((cells[i].col - cells[i - 1].col) !== dc) return false;
  }
  return true;
}

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

    //rechazamos si la palabra no forma una linea recta en cualquier dirección
     if (!isValidLine(newSelected)) return;

    setSelected(newSelected);

    const word = newSelected.map(c => c.letter).join('');
    const wordReverse = word.split('').reverse().join('');
    const match = WORDS.find(w => w === word || w === wordReverse) && !found.includes(w);

    if (match){
      const newFound = [...found, match];
      setFoundCells([...foundCells, ...newSelected.map(c => c.key)]);
      setFound(newFound);
      setSelected([]);
      alert(`¡Encontraste: ${match}! 🎉`);

      const correctAnswer = ['LOVEBOMBING', 'BREADCRUMBING', 'GHOSTING', 'GASLIGHTING', 'ZOMBIEING', 'HAUNTING', 'STALKING', 'BENCHING'];
      if (correctAnswer.every(w => newFound.includes(w))) { 
       onComplete();

      // if (newFound.length === WORDS.length) {
      //   onComplete();
      }
    }
  };

  return (
    <div>
      <p>Debes ir haciendo click letra por letra: {WORDS.map(w => (
        <span key={w} style={{
          marginRight: '10px',
          textDecoration: found.includes(w) ? 'line-through' : 'none',
          color: found.includes(w) ? 'green' : 'black',
          fontWeight: 'bold'
        }}>{w}</span>
      ))}</p>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID[0].length}, 38px)`, gap: '3px' }}>
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
                  backgroundColor: isFound ? '#90EE90' : isSelected ? '#ff9d00' : '#f20b73',
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