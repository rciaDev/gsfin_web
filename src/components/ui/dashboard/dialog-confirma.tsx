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
}

export default function ModalConfirmaOperacao(props:DialogConfirmaProps) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button 
                    variant={props.variant || 'default'}
                    disabled={props.onLoad || false}
                    className={cn("min-w-[100px]",props.classNameButton)}
                >
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
  