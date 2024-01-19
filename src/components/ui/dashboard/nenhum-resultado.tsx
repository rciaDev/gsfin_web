import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function NenhumResultadoEncontrado(){
    return <div className="w-full py-3 flex gap-3 justify-center items-center">
        <FontAwesomeIcon 
            icon={faSearch} 
            className="h-4 w-4 text-muted-foreground"
        />
        
        <span className="text-muted-foreground">Nenhum resultado encontrado</span>
    </div>
}