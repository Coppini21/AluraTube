import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return{
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm(){
            setValues({});
        }
    };
}

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
    
}


const PROJECT_URL = "https://xhndpxroeuzjioecdmhk.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhobmRweHJvZXV6amlvZWNkbWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTkxODMsImV4cCI6MTk4Mzc3NTE4M30.9XcmT9DW-044lnaUO9oc7VMwJ0ZRUyRrAmsXTZFgXfU"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "RESIDENT EVIL 4 - REMAKE : PRIMEIRA GAMEPLAY ( Análise )", url: "https://www.youtube.com/watch?v=iZWc8gMZ3cM"}
    });
    const [ formVisivel, setFormVisivel ] = React.useState(false);
    console.log();
    
    return(    
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values)

                        //Contrato entre o nosso Front e o BackEnd
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                        })
                        .then((oqueveio) => {
                            console.log(oqueveio);
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button className="close-modal" type="button" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input placeholder="Titulo do vídeo" value={formCadastro.values.titulo} name='titulo' onChange={formCadastro.handleChange} />
                            <input placeholder="URL" value={formCadastro.values.url} name='url' onChange={formCadastro.handleChange} />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div> 
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}