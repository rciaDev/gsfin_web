"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import Spinner from "../spinner";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface DialogConfirmaProps {     
    title?:string;
    variant?:'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    textButton?:string;    
    textButtonConfirm?:string;
    textButtonCancel?:string;
    textDescription?:string;
    onConfirm?:Function;
    onLoad?:boolean;
    classNameButton?:string;
    icon?:IconProp;
    classNameIcon?:String;
}

export default function ModalConfirmaOperacao(props:DialogConfirmaProps) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button 
                    variant={props.variant || 'default'}
                    disabled={props.onLoad || false}
                    className={cn("min-w-[100px] flex gap-2 ",props.classNameButton)}                    
                >
                    { props?.icon && <FontAwesomeIcon icon={props.icon} className={cn("w-4 h-4 ",props.classNameIcon)}/>}
                    { props?.onLoad ? <Spinner className="w-4 h-4 fill-primary"/> : props.textButton }
                </Button>
            </AlertDialogTrigger>

            
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{ props.title || 'Você realmente deseja confirmar essa operação?' }</AlertDialogTitle>
                    <AlertDialogDescription>
                        { props?.textDescription }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>
                    { props.textButtonCancel || 'Cancelar' }
                </AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => props.onConfirm && props.onConfirm() }                     
                >                    
                    { props.textButtonConfirm || 'Confirmar' }
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
  }
  