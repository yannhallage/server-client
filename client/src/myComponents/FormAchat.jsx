"use client"

import { useToast } from "@/hooks/use-toast.ts"
import { Input } from "@/components/ui/input.tsx";
import ScrollAreaDemo from "./ScrollAreaDemo";
import CardWithForm from "./cardWithForm";
import { Button } from "@/components/ui/button.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import Toaster from '@/components/ui/toaster.tsx'
import { Context } from '../context/apiContext'
import Notifications from "./Notification";
import axios from "axios";

const FormAchat = () => {
    const { addAchat, achats } = useContext(Context);
    const [variableAdd, setVariableAdd] = useState(0)

    const [placeholder] = useState({
        name: "Nom et prenom",
        email: "address mail",
        telephone: "telephone",
        matricule: "matricule"
    });

    const { toast } = useToast()
    const [afficheToats, setAfficheToats] = useState(false)
    const [dataValue, setDataValue] = useState([])
    const [valeurTotal, setValeurTotal] = useState(0)

    const inputRef = useRef({});

    const handleClick = async () => {

        const emptyFields = [];
        const values = Object.keys(placeholder).reduce((acc, key) => {
            const value = inputRef.current[key]?.value.trim(); // Trim pour éviter les espaces vides
            if (value) {
                acc[key] = value;
            } else {
                emptyFields.push(key);
            }
            return acc;
        }, {});

        if (emptyFields.length > 0) {
            setAfficheToats(true);
            toast({
                variant: "destructive",
                description: "Veuillez remplir tous les champs.",
            });
            EmptyFields();
            return;
        }

        let valeurEnvoyers = {
            name: values.name,
            email: values.email,
            telephone: parseInt(values.telephone),
            matricule: values.matricule
        };

        // envoie la requete au server 
        try {
            const response = await axios.post('http://localhost:3000/api/personnel', valeurEnvoyers)
           
            setDataValue((prevData) => [...prevData, response.data]);

            console.log("Donnée insérée avec succès:", response.data);

            valeurEnvoyers = {
                name: '',
                email: '',
                telephone: '',
                matricule: ''
            };
            toast({
                variant: "destructive",
                description: "Le personnel a été créé avec succès!",
            });
            EmptyFields();
        }
        catch (error) {
            console.error("Erreur lors de l'insertion des données:", error);
        }

    };



    const EmptyFields = () => {
        const values = Object.keys(placeholder).reduce((acc, key) => {
            const value = inputRef.current[key].value = ''
        }, {});
        return;
    }


    return (
        <section className="p-5">
            <div className="space-y-7">
                <span className="md:text-4xl text-xl font-bold">Ajouter un utilisateur</span>
                {/* Formulaire */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2 space-x-6">
                    <div className="space-y-3">
                        <div className="flex space-x-3">
                            {Object.entries(placeholder).map(([key, value]) => (
                                <Input
                                    key={key}
                                    placeholder={value}
                                    ref={(el) => (inputRef.current[key] = el)}
                                    name={key}
                                />
                            ))}
                            <Button onClick={handleClick}>Enregistrer</Button>
                        </div>
                        <div>
                            <ScrollAreaDemo
                                
                            />
                        </div>
                    </div>
                    {/* Pagnets */}
                    <DivPagnet />
                </div>
                <div className="">
                    <Toaster />
                </div>
            </div>
        </section>
    );
};

const DivPagnet = () => {
    return (
        <div className="space-y-5">
            <div>
                <span className="text-xl font-bold">Notifications</span>
            </div>
            <div>
                <Notifications />
            </div>
        </div>
    );
};

export default FormAchat;