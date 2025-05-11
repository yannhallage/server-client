import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"


const Authentification = () => {
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
                    />
                    <Input 
                        placeholder="password"
                    />
                </div>
                
                {/*  */}
                <div className="float-end">
                    <Button>
                        Login
                    </Button>
                </div>
                
            </div>
        </div>
    )
}

export default Authentification;