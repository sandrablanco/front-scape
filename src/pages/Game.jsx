import { useEffect, useState } from "react";

function Game() {
  const [level, setLevel] = useState(null);
  const [answer, setAnswer] = useState('');
  const [client, setClient] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      const token = localStorage.getItem('token');
      try {
        // 1. Cargar datos del usuario
        const responseClient = await fetch('http://localhost:3000/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` } // Uso de backticks
        });
        const dataClient = await responseClient.json();
        setClient(dataClient);

        // 2. Cargar nivel actual usando el ID del usuario
        const responseLevel = await fetch(`http://localhost:3000/auth/levels/${dataClient.currentLevel}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const levelData = await responseLevel.json();
        setLevel(levelData);

        //shuffle del puzzle
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
    // Corregido: trim() es una función
    if (answer.trim().toLowerCase() === level.correctAnswer.toLowerCase()) {
      alert(`Respuesta correcta {🎉} ${client.name}`);
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
    const isCorrect = pieces.every((p, i) => p === level.solution[i]);

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

  if (!level || !client) return <p>Cargando nivel...</p>;

  return (
    <div className="game">
      <h2>Nivel {client.currentLevel}</h2>
      <p>Hola {client.name} {level.story}</p>
      {level.type === 'image' && (
      <img 
      src={level.image} 
      alt="nivel" 
      style={{ width: '300px' }}
      />
       )}
      <p>{level.description}</p>
      <h3>{level.question}</h3>
      
      {level.options && level.options.map((opt, i) => (
        <button key={i} onClick={() => setAnswer(opt)}>
          {opt}
        </button>
      ))}
      
      {level.type === 'audio' && level.audio && (
        <div>
          <audio controls>
          <source src={level.audio} type="audio/mpeg" />Reproduce canción
          </audio>
        </div>
      )}
      
      {level.type === 'puzzle' && (
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px' }}>
       {pieces.map((piece, index) => (
       <img
        key={index}
        src={piece}          //recorremos el array de las fotos de cloudinary
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
          {level.type !== 'puzzle' && (
        <>
          <input
            placeholder="Escribe tu respuesta"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={handleAnswer}>Enviar respuesta</button>
        </>
      )}

      {level.type === 'puzzle' && (
        <button onClick={checkPuzzle}>Comprobar</button>
      )}
    </div>
)}


      <input 
        placeholder="Escribe tu respuesta" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
      />
      <button onClick={handleAnswer}>Enviar respuesta</button>
    </div>
  );
}

export default Game;