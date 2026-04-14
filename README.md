🧩 ScapeRoom Online

Aplicación web de tipo escape room donde los usuarios pueden registrarse, iniciar sesión y resolver retos interactivos.

🚀 Tecnologías

-Frontend
React + Vite
CSS
Axios

-Backend
Node.js
Express
Base de datos (MongoDB)

🔐Funcionalidades principales
1.Registro de usuarios
2.Inicio de sesión
3.Sistema de autenticación
4.Resolución y navegación de pruebas por niveles

⚙️ Instalación
1. Clonar repositorio
git clone <URL_DEL_REPO>
cd nombre-del-proyecto

2. Backend
cd backend
npm init -y
npm install express mongoose cors dotenv bcrypt jsonwebtoken
npm i nodemon --save-dev
npm run dev

3. Frontend
cd frontend
npm create vite @latest
npm i react-router-dom
npm install
npm start

🌐 Variables de entorno

Crear archivo .env en backend con:

PORT=3000
DB_URI=tu_base_de_datos
JWT_SECRET=tu_secreto

🧠 Aprendizajes
Manejo de autenticación
Comunicación cliente-servidor
Gestión de estado en React
Diseño de interfaces


## 🔗 Backend
Este proyecto funciona con un repositorio en el frontend https://github.com/sandrablanco/front-scape.git y otro repositorio backend https://github.com/sandrablanco/back-scape.git desarrollado en Node.js. El frontend se comunica con el backend mediante una API REST.
donde los endpoints principales son:
- POST /login
- POST /register


📌 Mejoras futuras
Implementar sopa de letras con más dificultad de palabras añadidas
La narración de la historia sea contada en función del género del usuario registrado
Tiempo límite por prueba
Mejora en las css

👩‍💻 Autor

Sandra Blanco

