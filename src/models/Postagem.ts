import type Tema from "./Tema"
import type Usuario from "./Usuario"

export default interface Postagem {
    id: number
    titulo: string
    texto: string
    data: string
    like: number
    comentario: string
    tema: Tema | null
    usuario: Usuario | null
}