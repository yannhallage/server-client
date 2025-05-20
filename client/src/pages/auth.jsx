import { Input } from "@/components/ui/input"
import { Separator } from '@/components/ui/separator'
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router";
import { useState } from "react"

import axios from "axios";

const Authentification = () => {
    const navigate = useNavigate();
    const [matricule, setmatricule] = useState('')
    const [email, setemail] = useState('')

    const verifyData = () => {
        if (matricule === '' || email === '') {
            return console.log('Please fill all the fields')
        } else {
            let dataVerify = {
                matricule: matricule,
                email: email
            }

            return SendDataOnServer(dataVerify)

        }
    }
    const SendDataOnServer = (dataVerify) => {
        console.log(dataVerify)

        axios.post('http://localhost:3000/api/authentification', dataVerify)
            .then(response => {
                console.log(response.data)
                // utilsation du token creer si est valider par la bd 
                const { token } = response.data

                localStorage.setItem('token', token);
                navigate('/home');
            })
            .catch(error => {
                console.log("une erreur au niveau de l'auth : ", error)
            })
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="space-y-5 border  rounded-sm p-5">
                <div className="text-center text-xl">
                    <Label>
                        Authentification
                    </Label>
                </div>
                {/*  */}

                <div className="space-y-2">
                    <Input
                        placeholder="matricule"
                        value={matricule}
                        onChange={(e) => { setmatricule(e.target.value) }}
                    />
                    <Input
                        placeholder="email"
                        onChange={(e) => { setemail(e.target.value) }}
                        value={email}
                    />
                </div>

                {/*  */}
                <div className="space-x-2">
                    <Button className="float-end" onClick={verifyData}>
                        <span>
                            Login
                        </span>
                    </Button>
                    <span className="">
                        <span className="cursor-pointer text-blue-400" onClick={() => { console.log('tetet') }}>
                            {/* <Link to='/create'>Signup</Link> */}
                        </span>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default Authentification;