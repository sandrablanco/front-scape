import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Home.css'

function Home() {
  const [client, setClient] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
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
    <div className="homeContainer">
      <div className="homeCard">
      <strong><h1>¡Unfollow al corazón ❤️! 🔐</h1></strong>

      {!client ? (
        <>
          <em><p className="text">En la era del 'visto' y las promesas vacías, el amor moderno se ha convertido en el enigma más difícil de resolver. ¿Cansado de recibir solo migajas o de desaparecer en el vacío del ghosting? Entra en nuestra sala, descifra las señales mezcladas del lovebombing y descubre si eres capaz de encontrar tu verdadero yo antes de que se agote el tiempo... o la batería de tu corazón😏</p></em>
          <div className="buttonsContainer">
          <Link to="/login">
            <button className="loginButton">Ya tengo cuenta, empezar ya!</button>
          </Link>

          <Link to="/register">
            <button className="registerButton">No tengo cuenta</button>
          </Link>
          </div>
        </>
      ) : (
        <>
          <p>Bienvenido, {client.name} 👋</p>

          <Link to="/game">
            <button className="gameButton">Continua con la aventura</button>
          </Link>
        </>
      )}
    </div>
  </div>
  )
}

export default Home