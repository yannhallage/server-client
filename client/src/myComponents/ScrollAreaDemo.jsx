import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import DialogDemo from "./DialogDemo";
import AlertDialogDemo from "./AlertDialogDemo";
import { useState, useEffect, useContext } from "react";
import { io } from 'socket.io-client';
import axios from "axios";
import { Context } from "../context/apiContext";

const ScrollAreaDemo = () => {
  const { apiglobaldata, setapiglobaldata
  } = useContext(Context)

  const [loaderData, setLoaderData] = useState(true);
  const [indice , setIndice] = useState(null)

  useEffect(() =>{
    console.log(indice)
  }, [indice])
  
  useEffect(() => {

    const socket = io('http://localhost:3000', { withCredentials: true });

    socket.on('newUser', (personnel) => {

      setapiglobaldata((prev) => {
        if (!prev.some((item) => item.matricule === personnel.matricule)) {
          return [...prev, personnel];
        }
        return prev;
      });

    });

    axios.get('http://localhost:3000/api/personnel')
      .then((response) => {
        setapiglobaldata(response.data.personnels); // Assurez-vous que c'est la structure correcte
        setLoaderData(false);
      })
      .catch((error) => {
        console.log("Erreur lors du chargement des données :", error);
        setLoaderData(false);
      });

    return () => {
      socket.disconnect();
    };

  }, []);

  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Lister tous les utilisateurs</h4>
        {
          loaderData ? (
            <div className="text-center text-sm text-muted-foreground">Chargement en cours...</div>
          ) : Array.isArray(apiglobaldata) && apiglobaldata.length > 0 ? (
            apiglobaldata.map((tag, index) => (
              <div key={index}>
                <div className="text-sm flex justify-between items-center">
                  <span className="mr-2">{tag.name}</span>
                  <span className="mr-2">{tag.matricule}</span>
                  <span className="mr-2">{tag.email}</span>
                  <div className="flex space-x-2">
                    <DialogDemo 
                      event={()=>{setIndice(index)}}
                    />
                    <AlertDialogDemo />
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            ))
          ) : (
            <DivMessage />
          )
        }
      </div>
    </ScrollArea>
  );
};

const DivMessage = () => {
  return (
    <div className="text-center font-bold text-[#ccc] mt-11">
      "Vous n'avez pas de produits à afficher. Veuillez ajouter un produit."
    </div>
  );
}

export default ScrollAreaDemo;
