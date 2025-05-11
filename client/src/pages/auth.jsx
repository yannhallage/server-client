import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"


const Authentification = () => {
    const [matricule, setmatricule] = useState('')
    const [password, setPassword] = useState('')

    const verifyData = () => {
        if (matricule === '' || password === '') {
            return console.log('Please fill all the fields')
        } else {
            let dataVerify = {
                matricule: matricule,
                password: password
            }

            return SendDataOnServer(dataVerify)

        }
    }
    const SendDataOnServer = (dataVerify) => {
        console.log(dataVerify)
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="space-y-5 border p-5">
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
                        placeholder="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                    />
                </div>

                {/*  */}
                <div className="float-end">
                    <Button onClick={verifyData}>
                        Login
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Authentification;