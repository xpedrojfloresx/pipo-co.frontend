import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const URL = import.meta.env.VITE_API_URL 

  const handleLimpiarDatos = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const persona = {
      nombre: name,
      email,
      password
    };

    if(password !== confirmPassword){
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
      return;
    }

    setCargando(true)
    try{
      await axios.post(`${URL}/api/usuarios/registro`, persona);
      handleLimpiarDatos();
      navigate('/registro/confirmacion')
    }catch(error){
      console.log(error)
      if(error.response){
        alert(error.response.data.message || 'Error en la solicitud de registro');
      }else if(error.request){
        alert('No se pudo conectar con el servidor. Revisa si el backend está encendido.');
      }else{
        alert('Error desconocido. Por favor, intente de nuevo más tarde.');
      }
    } finally {
      setCargando(false)
    }
  };

  return (
    <div className="min-h-[85vh] bg-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8 mt-10 md:mt-0">
          <div className="relative w-32 h-auto">
            <div className="absolute inset-0 flex flex-col justify-between">
                <img src="/Logo-LetrasVerdes.png" alt="Logo" className="w-32 h-auto" />
            </div>
          </div>
        </div>

        {/* Encabezado */}
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#60804F] mb-4 mt-10">
          Crear mi cuenta
        </h2>

        <p className="text-center text-xl text-[#8fbc6a] mb-5">
          Por favor complete la información a continuación:
        </p>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#8fbc6a] mb-2">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nombre"
              className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 text-slate-700 placeholder-slate-400 text-base sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#8fbc6a]">
                Confirmar contraseña
              </label>
            </div>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 pr-11 text-slate-700 placeholder-slate-400 text-base sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              disabled={cargando}
              className="flex w-full justify-center rounded-md bg-[#8fbc6a] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#60804F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {cargando ? 'Procesando...' : 'Registrarse'}
            </button>
          </div>
        </form>

        {/* Registro */}
        <p className="mt-10 text-center text-sm text-gray-400 mb-10 md:mb-0">
          Ya tienes una cuenta?{' '}
          <a href="/login" className="font-semibold leading-6 text-[#8fbc6a] hover:text-[#60804F]" onClick={() => navigate('/login')}> 
            Ingresar en tu cuenta ahora
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
