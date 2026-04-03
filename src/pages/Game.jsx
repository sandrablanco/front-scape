import { useEffect, useState } from "react";

function Game() {
  const [level, setLevel] = useState(null);
  const [answer, setAnswer] = useState('');
  const [client, setClient] = useState(null);

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
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchClient();
  }, []);

  const handleAnswer = async () => {
    // Corregido: trim() es una función
    if (answer.trim().toLowerCase() === level.correctAnswer.toLowerCase()) {
      alert('Respuesta correcta 🎉');
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
      alert('Casi pero no 😈 inténtalo de nuevo');
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
      
      {level.type === 'audio' && (
        <div>
          <audio controls>
          <source src={level.audio} type="audio/mpeg" />Reproduce canción
          </audio>
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