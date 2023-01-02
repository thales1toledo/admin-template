import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconWarning } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {

    const { cadastrar, login, loginGoogle } = useAuth()

    const [erro, setErro] = useState(null)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')

    function exibirErro(msg, tempo = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempo * 1000)
    }

    async function submit() {
        const message = 'Credenciais inválidas!'
        try {
            if (modo === 'login') {
                await login(email, senha)
            } else {
                await cadastrar(email, senha)
            }
        } catch (props) {
            exibirErro(message)
            // or catch(e){
            //     exibirErro(e.message)
            // }
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <img src="https://source.unsplash.com/random" alt="Img tela auth"
                    className="h-screen w-screen object-cover" />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:1/3">
                <h1 className="text-2xl font-bold mb-5" >
                    {modo === 'login' ? 'Entre com sua conta' : 'Cadastre-se na plataforma'}
                </h1>

                {erro ? (
                    <div className="flex items-center bg-red-400 text-white py-3 px-5 my-2
                                border border-red-700 rounded-lg">
                        {IconWarning()}
                        <span className="ml-3">{erro}</span>
                    </div>
                ) :
                    false}
                <AuthInput
                    tipo="email"
                    label="Email"
                    valor={email}
                    valorMudou={setEmail}
                />
                <AuthInput
                    tipo="password"
                    label="Senha"
                    valor={senha}
                    valorMudou={setSenha}
                />

                <button onClick={submit}
                    className="w-full bg-indigo-500 hover:bg-indigo-400 text-white 
                            rounded-lg px-4 py-3 mt-6"
                >
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button onClick={loginGoogle}
                    className="w-full bg-red-500 hover:bg-red-400 text-white 
                            rounded-lg px-4 py-3"
                >
                    Entrar com Google
                </button>

                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')}
                            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                        > Crie uma conta
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já faz parte da comunidade?
                        <a onClick={() => setModo('login')}
                            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
                        > Faça o login
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}