import route from "next/router";
import { Children, createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";
import Cookies from 'js-cookie'

interface AuthContextProps {
    usuario?: User
    carregando?: boolean
    cadastrar?:(email: string, senha: string) => Promise<void>
    login?:(email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<User> {
    const token = usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-cod3r-auth', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-cod3r-auth')
    }
}

export function AuthProvider(props) {

    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<User>(null)

    async function configSessao(usuarioFirebase) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function login(email, senha) {
        try {
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)

            await configSessao(resp.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }

    }
    
    async function cadastrar(email, senha) {
        try {
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha)

            await configSessao(resp.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }

    }

    async function loginGoogle() {
        try {
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )

            await configSessao(resp.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }

    }

    async function logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configSessao(null)
            route.push('/autenticacao')
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-cod3r-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            cadastrar,
            login,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext