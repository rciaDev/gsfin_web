import { 
    CheckCircledIcon, 
    CrossCircledIcon, 
    InfoCircledIcon 
} from "@radix-ui/react-icons";

import { 
    Alert,
    AlertTitle,
    AlertDescription
} from "@/components/ui/alert";

interface AlertProps {
    type ?: 'error' | 'success' | 'info'
    title : string
    description ? : string,
    variant ? : 'destructive' | 'default',
    show ?: boolean,
    icon ?: React.ReactNode
}

export default function AlertInBox(props:AlertProps){
    function handleIcon(){
        if(props.icon) return props.icon;

        if(props.type === 'success')
            return <CheckCircledIcon color="#10b981"/>
        else if(props.type === 'error')
            return <CrossCircledIcon color="#ef4444"/>
        else if(props.type === 'info')
            return <InfoCircledIcon color="#06b6d4" />
    }
    return props.show ? (
            <Alert 
                variant={props.variant} 
                className={`
                    ${ props.type === 'error' && `text-red-500 border-red-500` }
                    ${ props.type === 'success' && `text-green-500 border-green-500` }
                    ${ props.type === 'info' && `text-sky-500 border-sky-500` }
                `}
            >
                { handleIcon() }
                <AlertTitle>{ props.title }</AlertTitle>
                { props.description !== '' &&  <AlertDescription>{ props.description }</AlertDescription> }
            </Alert>
        )
    :
    <></>
}
    