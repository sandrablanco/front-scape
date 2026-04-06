import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async() => {
    const response = await fetch('${import.meta.env.VITE_API_URL}/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (response.ok) {
        localStorage.setItem('token', data.token)
        navigate('/game')
    } else {
        alert('Error al iniciar sesión: ' + data.message)
    }
}
return (
    <div className="loginContainer">
        <div className="loginCard">
            <img 
              src="https://res.cloudinary.com/du5e2crvt/image/upload/v1775474709/descargar_zsobmv.png"
              alt="login"
              className="loginImage"
            />
        <h2>Iniciar Sesión</h2>
        <input type="email" placeholder="Escribe aqui tu correo" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Escribe aqui tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    </div>
)
}

export default Login