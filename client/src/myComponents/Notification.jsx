import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { io } from 'socket.io-client';
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [apinotif, setApinotif] = useState([]);
  const [loaderNotif, setLoaderNotif] = useState(true)
  const [notifLength, setNotifLength] = useState(0)

  useEffect(() => {
    const socket = io('http://localhost:3000', { withCredentials: true });

    socket.on('newNotification', (notification) => {
      setApinotif((prev) => {
        if(!prev.some((item) => item._id === notification._id)){
          return [...prev , notification]
        }
        return prev
      });
    });

    // Fetch initial
    axios.get('http://localhost:3000/api/notification')
      .then(response => {
        setApinotif(response.data.notifications);
        setLoaderNotif(false);
      })
      .catch((error) => {
        console.log("Erreur lors du chargement des données :", error);
        setLoaderNotif(false);
      });


    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (apinotif) {
      setNotifLength(apinotif.length)
    }
  }, [apinotif]);

  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Notifications <span className="bg-black p-[1px] pr-[4px] text-[11px] text-white rounded-full">{notifLength}</span></h4>
        {
          loaderNotif ? (
            <div className="text-center text-sm text-muted-foreground">Chargement en cours...</div>
          ) : Array.isArray(apinotif) && apinotif.length > 0 ? (
            apinotif.map((notif, index) => (
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
        "Aucunes notifications pour le moment "
      }
    </div>
  )
}

export default Notifications;
