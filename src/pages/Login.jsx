import {useState, useNavigate} from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async() => {
    const response = await fetch('http://localhost:3000/auth/login', {
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
    <div className="login">
        <h2>Iniciar Sesión</h2>
        <input type="email" placeholder="Escribe aqui tu correo" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Escribe aqui tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>

)
}

export default Login