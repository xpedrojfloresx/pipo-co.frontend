import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const URL = import.meta.env.VITE_API_URL 

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${URL}/api/usuarios/login`, {
        email,
        password
      })
      const data = response.data
      localStorage.setItem('usuario', JSON.stringify(data.user))
      window.dispatchEvent(new Event('usuarioActualizado'))
      navigate('/')
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al iniciar sesión'
      alert(mensaje)
    }
  }

  return (
    <div className="min-h-[85vh] bg-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8 mt-0 md:mt-1">
          <div className="relative w-32 h-auto">
            <div className="absolute inset-0 flex flex-col justify-between">
                <img src="/Logo-LetrasVerdes.png" alt="Logo" className="w-32 h-auto" />
            </div>
          </div>
        </div>

        {/* Encabezado */}
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#60804F] mb-10 mt-10">
          Ingresar a mi cuenta
        </h2>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#8fbc6a] mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 text-slate-700 placeholder-slate-400 text-base sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#8fbc6a]">
                Contraseña
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-[#8fbc6a] hover:text-[#60804F]">
                  Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 pr-11 text-slate-700 placeholder-slate-400 text-base sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#60804F] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#8fbc6a] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#60804F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fbc6a] transition-colors"
            >
              Ingresar
            </button>
          </div>
        </form>

        {/* Registro */}
        <p className="mt-10 text-center text-sm text-gray-400">
          Aun no tienes una cuenta?{' '}
          <a href="/register" className="font-semibold leading-6 text-[#8fbc6a] hover:text-[#60804F]" onClick={() => navigate('/register')}>
            Registrate ahora
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;