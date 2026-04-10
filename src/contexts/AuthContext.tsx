/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../util/ToastAlerta";

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    // Inicializar o Estado usuario
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    // Inicializar o estado isLoading
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Implementaçõa da função de Login
    async function handleLogin(usuario: UsuarioLogin) {

        setIsLoading(true)

        try {
            await login('/usuarios/logar', usuario, setUsuario)
            ToastAlerta('Usuário autenticado com sucesso!', 'sucesso')
        } catch (error) {
            ToastAlerta('E-mail ou senha incorretos!', 'erro')
        }
        setIsLoading(false)
    }

    // Implementação da função Logout
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
