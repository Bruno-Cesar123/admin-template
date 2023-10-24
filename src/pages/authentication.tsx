import { AuthInput } from "@/components/auth/AuthInput";
import { WarningIcon } from "@/components/icons";
import { useAuth } from "@/data/hook/useAuth";
import { useState } from "react";


export default function Authentication() {

  const { login, register, loginGoogle } = useAuth()

  const [error, setError] = useState('')
  const [model, setModel] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function showError(msg: string, time = 5) {
    setError(msg)
    setTimeout(() => setError(''), time * 1000)
  }

  async function submit() {
    try {
      if (model === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }
    } catch (err) {
        showError('Ocorreu um erro!')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da tela de altenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-5 ">
          {model === 'login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
        </h1>

        {error && (
          <div className="flex items-center bg-red-400 text-white py-3 px-5 my-2 border-2 border-red-700 rounded-lg">
            {WarningIcon(6)}
            <span className="ml-3">{error}</span>
          </div>
        )}



        <AuthInput
          label="Email"
          type="email"
          required
          value={email}
          onChange={setEmail}
        />
        <AuthInput
          label="Senha"
          type="password"
          required
          value={password}
          onChange={setPassword}
        />

        <button onClick={submit} className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6">
          {model === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        <button onClick={loginGoogle} className="w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3">
          Entrar com Google
        </button>

        {model === 'login' ? (
          <p className="mt-8">
            Novo por aqui ?
            <a onClick={() => setModel('register')} className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">
              {' '} Criar uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade ?
            <a onClick={() => setModel('login')} className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">
              {' '} Entre com as suas credenciais
            </a>
          </p>
        )}

      </div>
    </div>
  )
}