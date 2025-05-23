import { useToast } from "@/hooks/use-toast.ts"
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
// import { Button } from "@/components/ui/button"
import Toaster from '@/components/ui/toaster.tsx'
import { Context } from "../context/apiContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios"


const AlertDialogDemo = ({ event }) => {
    const { apiglobaldata, setapiglobaldata,
        indice
    } = useContext(Context)
    const updatedData = apiglobaldata?.[indice]
    const { toast } = useToast()
    const [afficheToats, setAfficheToats] = useState(false)

    useEffect(() => {
        if (updatedData) {
            console.log(updatedData._id)
        }
    }, [updatedData])


    const DeletedData = () => {
        axios.delete(`http://localhost:3000/api/personnel/${updatedData._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        updataApiglobaldata()
    }

    const updataApiglobaldata = () => {
        const result = apiglobaldata.filter((item) => item._id != updatedData._id);
        setapiglobaldata(result);
        setAfficheToats(true);
        console.log(afficheToats)
        toast({
            variant: "destructive",
            description: "Vous avez effectuer une suppression",
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span onClick={event}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={DeletedData}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default AlertDialogDemo;