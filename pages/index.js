import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";



function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});
  
    React.useEffect(() => {
        service.getAllVideos()
        .then((dados) => {
            console.log(dados.data);
            const novasPlaylists = { ...playlists };
            console.log(novasPlaylists);
            dados.data.forEach((video) => {
                if (!novasPlaylists[video.playlist]) {
                    novasPlaylists[video.playlist] = [];
                }
                novasPlaylists[video.playlist].push(video);
            })
            setPlaylists(novasPlaylists)
        });

        
    }, [])

    console.log("Playlists Pronto", playlists)

    
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header />
                <Timeline playlists={config.playlists} favoritos={config.favoritos} searchValue={valorDoFiltro} >
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
    background-color: ${({ theme }) => theme.backgroundLevel1};

    .imagemPerfil {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader >
            <StyledBanner bg={config.bg}/>
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

function Timeline( { searchValue, ...propriedades } ) {
    const playlistNames = Object.keys(propriedades.playlists);
    const favoritos = Object.keys(propriedades.favoritos)

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName} className="secaoVideos">
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((item) => {
                                const titleNormalized = item.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized);

                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
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
                // console.log(favorito)
                // console.log(fotos)
                return (
                    <section key={favorito}>
                        <h2>{favorito}</h2>
                        <div className="divFavoritos">
                            {fotos.map((fotos) => {
                                return (
                                    <div key={fotos.nome} className="fotoName">
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

