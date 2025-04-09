import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import TooltipDemo from "./TooltipDemo";
import DialogDemo from "./DialogDemo";
import AlertDialogDemo from "./AlertDialogDemo";
import { Context } from "../context/apiContext";
import { io } from 'socket.io-client';
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [notification, setNotification] = useState([]);
  const [loaderNotif, setLoaderNotif] = useState(true)
  const [notifLength, setNotifLength] = useState(0)

  useEffect(() => {
    const socket = io('http://localhost:3000', { withCredentials: true });
  
    socket.on('newNotification', (notification) => {
      setNotification((prev) => {
        const alreadyExists = prev.some((item) => item.message === notification.message);
        if (!alreadyExists) {
          return [...prev, notification];
        }
        return prev;
      });
    });
  
    // Fetch initial
    axios.get('http://localhost:3000/api/notification')
      .then(response => {
        setNotification(response.data.notifications);
        setLoaderNotif(false);
      })
      .catch((error) => {
        console.log("Erreur lors du chargement des données :", error);
        setLoaderNotif(false);
      });
  
    // Cleanup socket à la destruction
    return () => {
      socket.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (notification) {
      setNotifLength(notification.length)
    }
  }, [notification]);
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Notifications <span className="bg-black p-[1px] pr-[4px] text-[11px] text-white rounded-full">{notifLength}</span></h4>
        {
          loaderNotif ? (
            <div className="text-center text-sm text-muted-foreground">Chargement en cours...</div>
          ) : Array.isArray(notification) && notification.length > 0 ? (
            notification.map((notif, index) => (
              <div key={index}>
                <div className="text-sm flex justify-between items-center">
                  <span className="mr-2">{notif.message}</span>
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
      {
        "Aucune notifications pour le moment "
      }
    </div>
  )
}

export default Notifications;
