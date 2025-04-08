import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import TooltipDemo from "./TooltipDemo";
import DialogDemo from "./DialogDemo";
import AlertDialogDemo from "./AlertDialogDemo";
import { Context } from "../context/apiContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const ScrollAreaDemo = () => {
  // const { apiData, setApiData } = useContext(Context);
  const [apiData, setApiData] = useState([]);
  const [loaderData, setLoaderData] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3000/api/personnel')
      .then((response) => {
        setApiData(response.data.personnels);
        setLoaderData(false);
      })
      .catch((error) => {
        console.log("Erreur lors du chargement des données :", error);
        setLoaderData(false);
      });
  }, []);



  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Lister tous les utilisateurs</h4>
        {
          loaderData ? (
            <div className="text-center text-sm text-muted-foreground">Chargement en cours...</div>
          ) : Array.isArray(apiData) && apiData.length > 0 ? (
            apiData.map((tag, index) => (
              <React.Fragment key={index}>
                <div className="text-sm flex justify-between items-center">
                  <span className="mr-2">{tag.name}</span>
                  <span className="mr-2">{tag.email}</span>
                  <div className="flex space-x-2">
                    <DialogDemo />
                    <AlertDialogDemo />
                  </div>
                </div>
                <Separator className="my-2" />
              </React.Fragment>
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
      {
        "Vous n'avez pas de produits à afficher. Veuillez ajouter un produit "
      }
    </div>
  )
}

export default ScrollAreaDemo;
