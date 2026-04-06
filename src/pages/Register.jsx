import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../Register.css' 

function Register() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async () => {
        const response = await fetch('${import.meta.env.VITE_API_URL}/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password })
        })
        const data = await response.json()
        if (response.ok) {
            // Registro exitoso, redirigir a login
            navigate('/login')
            //opcion luego de login automatico
        } else {
            alert('Error al registrarse: ' + data.message)
        }
    }

    return (
        <div className="registerContainer">
           <div className="registerCard">
            <h2>Registrarse como nuevo usuario</h2>
            <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Apellido" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Registrarse</button>
           </div>
        </div>
    )
}

export default Register