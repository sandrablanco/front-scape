import {useNavigate} from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className="home">
      <h2>¡Bienvenido al Escape Room!</h2>
      <p>Hoy en dia el amor moderno es un enigma. Si te has quedado soltero/a y crees en el amor a la antigua ¿Estás listo para resolver los enigmas y encontrar tu verdadero yo dentro de tanto lovebombing, ghosting...?</p>
      <button onClick={() => navigate('/login')}>Empieza ya!</button>
    </div>
  )
}

export default Home