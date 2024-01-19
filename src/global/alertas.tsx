import { toast } from 'react-toastify';

const alertaSucesso = (cMsg:string) => {
    return toast.success(cMsg,
        {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,  
        } 
    )
}

const alertaErro = (cMsg:string) => {
    return toast.error(cMsg,
        {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,  
        } 
    )
}

const alertaErroServidor = () => {
    return toast.error('Ocorreu algum erro, já estamos trabalhando para resolver',
        {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,  
        } 
    )
}

export default { alertaSucesso,alertaErro,alertaErroServidor };