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
        .then(data => setClient(data))
        .catch(() => setClient(null))
    }
  }, [])

  return (
    <div>
      <h1>¡Escape Room Unfollow al corazón ❤️! 🔐</h1>

      {!client ? (
        <>
          <p>En la era del 'visto' y las promesas vacías, el amor moderno se ha convertido en el enigma más difícil de resolver. ¿Cansado de recibir solo migajas o de desaparecer en el vacío del ghosting? Entra en nuestra sala, descifra las señales mezcladas del lovebombing y descubre si eres capaz de encontrar tu verdadero yo antes de que se agote el tiempo... o la batería de tu corazón😏</p>

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