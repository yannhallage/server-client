import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { useState } from "react"


const Authentification = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const verifyData = () => {
        if (email === '' || password === '') {
            return console.log('Please fill all the fields')
        } else {
            return console.log(true)
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="space-y-5 border p-5">
                <div className="text-center text-xl">
                    <span>
                        Authentification
                    </span>
                </div>
                {/*  */}

                <div className="space-y-2">
                    <Input
                        placeholder="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
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