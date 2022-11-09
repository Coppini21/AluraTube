import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estilosDaHomePage = {
        // backgroundColor: "red" 
    };

    // console.log(config.playlists);

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} favoritos={config.favoritos}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }


const StyledHeader = styled.div`
    .imagemBanner{
        width: 100%;
        height: 350px;
        object-fit: cover;
    }
    .imagemPerfil {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 30px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header() {
    return (
        <StyledHeader>
            <img className="imagemBanner" src="https://images.unsplash.com/photo-1548602088-9d12a4f9c10f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2052&q=80" />
            <section className="user-info">
                <img className="imagemPerfil" src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline(propriedades) {
    const playlistNames = Object.keys(propriedades.playlists);
    const favoritos = Object.keys(propriedades.favoritos)

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                console.log(playlistName);
                console.log(videos);
                return (
                    <section className="secaoVideos">
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img className="imagemVideo" src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>

                    </section>
                )
            })}
            {favoritos.map((favorito) => {
                const fotos = propriedades.favoritos[favorito]
                console.log(favorito)
                console.log(fotos)
                return (
                    <section>
                        <h2>{favorito}</h2>
                        <div className="divFavoritos">
                            {fotos.map((fotos) => {
                                return (
                                    <div className="fotoName">
                                        <img className="imagemYoutuber" src={`https://github.com/${fotos.github}.png`} />
                                        <span>
                                            {fotos.nome}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                    </section>
                )
            })}
        </StyledTimeline>  
    )
}

