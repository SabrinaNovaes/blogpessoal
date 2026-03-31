export default function Home() {
    return (
        <section
            style={{
                backgroundColor: '#312e81',
                display: 'flex',
                justifyContent: 'center'
            }}>
            <article
                style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem',
                    color: 'white',
                    width: '100%',
                    maxWidth: '1280px'
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        paddingTop: '1rem',
                        paddingBottom: '1rem'                    
                    }}>
                    <h2
                        style={{
                            fontSize: '3rem',
                            fontWeight: 'bold'
                        }}>
                            Seja Bem-Vinda(o)!
                    </h2>
                    <p
                        style={{
                            fontSize: '1.25rem'
                        }}>
                            Esse é o Blog Pessoal, onde você pode compartilhar 
                            suas ideias, pensamentos e experiências com o mundo. 
                            Aqui, você pode criar e publicar seus próprios posts, 
                            interagir com outros usuários e explorar uma variedade 
                            de conteúdos interessantes. 
                            Seja para expressar sua criatividade, compartilhar 
                            conhecimento ou simplesmente se conectar com outras 
                            pessoas, o Blog Pessoal é o lugar perfeito para você. 
                            Junte-se a nós e comece a compartilhar suas histórias 
                            hoje mesmo!
                    </p>

                    <div
                        style={{
                            display:'flex',
                            justifyContent: 'space-around',
                            gap: '1rem'
                        }}>
                        <div
                            style={{
                                borderRadius: '1rem',
                                color: 'white',
                                border: '2px, solid, white',
                                padding: '0.5rem 1rem'
                            }}>
                                Nova Postagem
                        </div>
                    </div>
                </div>

                <figure
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <img src="https://i.imgur.com/fyfri1v.png" 
                        alt="Imagem Página Home" 
                        style={{ 
                            width: '60%',
                            borderRadius: '1rem'
                        }}/>
                </figure>
            </article>
        </section>
    )
}
