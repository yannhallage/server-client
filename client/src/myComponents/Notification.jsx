import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import TooltipDemo from "./TooltipDemo";
import DialogDemo from "./DialogDemo";
import AlertDialogDemo from "./AlertDialogDemo";
import { Context } from "../context/apiContext"; 
import { useContext,useState,useEffect } from "react"; 

const Notifications = () => {
    const Notification = [
        // { id: 1, description: "suppression d'un utilisateur" , datesuppression :'13/12/202'},
        // { id: 2, description: "suppression d'un utilisateur" , datesuppression :'13/12/202'},
        // { id: 3, description: "suppression d'un utilisateur" , datesuppression :'13/12/202'},
        // { id: 4, description: "suppression d'un utilisateur" , datesuppression :'13/12/202'},
        // { id: 5, description: "suppression d'un utilisateur" , datesuppression :'13/12/202'},
        // { id: 6, description: "suppression d'un utilisateur" , datesuppression :'13/12/202'}
    ]
    
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Notifications</h4>
        {
            Notification.length == 0 ? (
                <DivMessage />
            ): 
            Notification.map((tag, index) => (
              <React.Fragment key={index}>
                <div className="text-sm flex justify-between items-center">
                  <span className="mr-2">{tag.description}</span>
                  <span className="mr-2 text-[11px] "> {tag.datesuppression}</span>
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))
        }
      </div>
    </ScrollArea>
  );
};


const DivMessage = () => {
  return (
    <div className="text-center font-bold text-[#ccc] mt-11">
      {
        "Aucune notifications pour le moment "
      }
    </div>
  )
}

export default Notifications;
