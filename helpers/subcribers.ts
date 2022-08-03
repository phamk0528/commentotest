import { URL_BASE } from '../constants'

const URL_BASE_SUBCRIBER = URL_BASE + '/subscribers'
import { toast } from "react-toastify";

export const useSubcriber = async (user: any) => {

    const data = await fetch(URL_BASE_SUBCRIBER + `?email=${user.email}`)
    const result = await data.json();
    if (result.toString() === "") {
        const response = await fetch(URL_BASE_SUBCRIBER, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        response.status === 200 ? toast.success("Subcriber Successfully") : toast.warning("Subcriber Failed") 
        return response.status
    } else return  toast.warning("Email already registered")

}