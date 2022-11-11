import React from "react";
import { StyledRegisterVideo } from "./styles";

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

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://youtube..."}
    });
    const [ formVisivel, setFormVisivel ] = React.useState(false);
    
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