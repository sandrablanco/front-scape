import { useEffect, useState } from "react";

function Game() {
  const [level, setLevel] = useState(null);
  const [answer, setAnswer] = useState('');
  const [client, setClient] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      const token = localStorage.getItem('token');
      try {
        const responseClient = await fetch('http://localhost:3000/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const dataClient = await responseClient.json();
        setClient(dataClient);

        const responseLevel = await fetch(`http://localhost:3000/auth/levels/${dataClient.currentLevel}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const levelData = await responseLevel.json();
        setLevel(levelData);

        if (levelData.type === 'maze') {
          setPosition(levelData.start);
        }

        if (levelData.type === 'puzzle') {
          const shuffled = [...levelData.pieces].sort(() => Math.random() - 0.5);
          setPieces(shuffled);
        }

      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchClient();
  }, []);

  const handleAnswer = async () => {
    if (answer.trim().toLowerCase() === level.correctAnswer.toLowerCase()) {
      alert(`Respuesta correcta 🎉 ${client.name}`);
      const token = localStorage.getItem('token');
      try {
        await fetch('http://localhost:3000/auth/level', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ newLevel: client.currentLevel + 1 })
        });
        window.location.reload();
      } catch (error) {
        console.error("Error al actualizar nivel:", error);
      }
    } else {
      alert(`Casi pero no 😈 inténtalo de nuevo ${client.name}`);
    }
  };

  const handlePieceClick = (index) => {
    if (selected === null) {
      setSelected(index);
    } else {
      const newPieces = [...pieces];
      [newPieces[selected], newPieces[index]] = [newPieces[index], newPieces[selected]];
      setPieces(newPieces);
      setSelected(null);
    }
  };

  const checkPuzzle = async () => {
    const isCorrect = pieces.every((p, i) => p === level.correctAnswer[i]);

    if (isCorrect) {
      alert(`Puzzle completado: Felicidades ${client.name} 🎉`);
      const token = localStorage.getItem('token');
      await fetch('http://localhost:3000/auth/level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newLevel: client.currentLevel + 1 })
      });
      window.location.reload();
    } else {
      alert(`No está correcto 😈 vuelve a intentarlo ${client.name}`);
    }
  };
  
  const move = (dx, dy) => {
  const newX = position.x + dx;
  const newY = position.y + dy;

  // límites
  if (
    newX < 0 ||
    newY < 0 ||
    newX >= level.maze.length ||
    newY >= level.maze[0].length
  ) return;

  // muro
  if (level.maze[newX][newY] === 'X') return;

  setPosition({ x: newX, y: newY });

  // llegada a meta
  if (newX === level.end.x && newY === level.end.y) {
    alert(`¡Has salido del laberinto ${client.name}! 🎉`);

    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/auth/level', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ newLevel: client.currentLevel + 1 })
    }).then(() => window.location.reload());
  }
};

  if (!level || !client) return <p>Cargando nivel...</p>;

  return (
    <div className="game">
      <h2>Nivel {client.currentLevel}</h2>
      <p>Hola {client.name} {level.story}</p>

      {level.type === 'image' && (
        <img src={level.image} alt="nivel" style={{ width: '300px' }} />
      )}

      <p>{level.description}</p>
      <h3>{level.question}</h3>

      {level.options && level.options.map((opt, i) => (
        <button key={i} onClick={() => setAnswer(opt)}>{opt}</button>
      ))}

      {level.type === 'audio' && level.audio && (
        <div>
          <audio controls>
            <source src={level.audio} type="audio/mpeg" />
            Reproduce canción
          </audio>
        </div>
      )}

      {level.type === 'puzzle' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 100px)', gap: '10px' }}>
          {pieces.map((piece, index) => (
            <img
              key={index}
              src={piece}
              alt="pieza"
              style={{
                width: '100px',
                height: '100px',
                border: selected === index ? '3px solid red' : '1px solid black',
                cursor: 'pointer'
              }}
              onClick={() => handlePieceClick(index)}
            />
          ))}
        </div>
      )}

      {level.type === 'maze' && position && (
      <div>
      <h3>🧩Intenta escapar del monstruo de tu mente🧩</h3>

      <div
        style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${level.maze[0].length}, 50px)`
       }}
    >
      {level.maze.map((row, i) =>
        row.map((cell, j) => {
          let content = '';

         if (cell === 'X') content = '🧱';        // muro
         if (cell === 'E') content = '🗝️';        // meta
         if (cell === '.') content = '';         // camino vacío

        // jugador (esto sobrescribe todo)
        if (position.x === i && position.y === j) {
        content = '🚶‍♀️';
        }

          return (
            <div
              key={`${i}-${j}`}
              style={{
                width: '50px',
                height: '50px',
                border: '1px solid gray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              {content}
              </div>
          );
        })
      )}
    </div>
    

    {/* CONTROLES */}
    <div style={{ marginTop: '20px' }}>
      <button onClick={() => move(-1, 0)}>⬆️</button>
      <br />
      <button onClick={() => move(0, -1)}>⬅️</button>
      <button onClick={() => move(0, 1)}>➡️</button>
      <br />
      <button onClick={() => move(1, 0)}>⬇️</button>
    </div>
  </div>
)}

      {/* Input y botón solo para niveles que NO son puzzle */}
      {level.type !== 'puzzle' && level.type !== 'maze' && level.type !== 'the end' && (
        <>
          <input
            placeholder="Escribe tu respuesta"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={handleAnswer}>Enviar respuesta</button>
        </>
      )}

      {/* Botón comprobar solo para puzzle */}
      {level.type === 'puzzle' && (
        <button onClick={checkPuzzle}>Comprobar</button>
      )}
      
      {level.type === 'the end' && (
      <div style={{ marginTop: '20px' }}>
      <h3>✨ Fin del juego ✨</h3>

      <button onClick={handleRestart}>
      🔄 Volver a empezar
      </button>

      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
      Cerrar sesión
      </button>
      </div>
    )}
    </div>
  );
}

export default Game;