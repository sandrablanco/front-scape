import {Link} from 'react-router-dom'

function Home() {
  const link = useLink()
  return (
    <div className="home">
      <h2>¡Bienvenido al Escape Room!</h2>
      <p>Hoy en dia el amor moderno es un enigma. Si te has quedado soltero/a y crees en el amor a la antigua ¿Estás listo para resolver los enigmas y encontrar tu verdadero yo dentro de tanto lovebombing, ghosting...?</p>
      <Link to="/login">Empieza ya! Si ya te has registrado</Link>
      <Link to="/register">Registrate si todavia no tienes cuenta</Link>
      <button onClick={() => link('/login')}>Empieza ya!</button>
    </div>
  )
}

export default Home