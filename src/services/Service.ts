/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import axios from "axios"

// Cria uma nova instância do Axios
const api = axios.create({
    baseURL: 'https://blogpessoal-vqq6.onrender.com'
})

// Função para Cadastrar Usuário
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}
