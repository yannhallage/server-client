import { Button } from "@/components/ui/button.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useEffect, useState } from "react"
import { Context } from "../context/apiContext"

const DialogDemo = ({ event }) => {
  const { apiglobaldata, setapiglobaldata, indice } = useContext(Context);
  const userData = apiglobaldata?.[indice];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
    }
  }, [userData]);

  const Enregistrer = () => {
    const updatedData = apiglobaldata.map((item, index) => {
      if (index === indice) {
        return { ...item, name, email };
      } else {
        return item;
      }
    })

    setapiglobaldata(updatedData);
    console.log('Saved data:', updatedData);
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="mr-2 cursor-pointer" onClick={event}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="size-3">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 
              2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 
              1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 
              1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile {userData?.name}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              placeholder="nom complet"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="username"
              placeholder="email"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="username"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={Enregistrer}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDemo;
