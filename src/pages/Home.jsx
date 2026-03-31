import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [client, setClient] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      fetch('http://localhost:3000/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => setUser(null))
    }
  }, [])

  return (
    <div>
      <h1>¡ Bienvenido al Escape Room ! 🔐</h1>

      {!client ? (
        <>
          <p>Hoy en dia el amor moderno es un enigma. Si te has quedado soltero/a y crees en el amor a la antigua ¿Estás listo para resolver los enigmas y encontrar tu verdadero yo dentro de tanto lovebombing, ghosting...?😏</p>

          <Link to="/login">
            <button>Ya tengo cuenta, empezar ya!</button>
          </Link>

          <Link to="/register">
            <button>No tengo cuenta</button>
          </Link>
        </>
      ) : (
        <>
          <p>Bienvenido, {client.name} 👋</p>

          <Link to="/game">
            <button>Continuemos con la aventura</button>
          </Link>
        </>
      )}
    </div>
  )
}

export default Home