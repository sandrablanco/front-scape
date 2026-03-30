import { use, useEffect, useState } from "react";
 
function Game() {
  const [level, setLevel] = useState('')

  useEffect(() => {
    const fetchClient = async () => {
      const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        setLevel(data.currentLevel)

    }; 
    fetchClient()
  }, [])
  return (
    <div className="game">
      <h2>¡Bienvenido al Escape Room!</h2>
      <p>Tu nivel actual es: {level}</p>
    </div>
  )
}

export default Game