import { URL_BASE } from '../constants'

const URL_BASE_SUBSCRIBER = URL_BASE + '/subscribers'
import { toast } from "react-toastify";

export const useSubscriber = async (user: any) => {

    const data = await fetch(URL_BASE_SUBSCRIBER + `?email=${user.email}`)
    const result = await data.json();
    if (result.toString() === "") {
        const response = await fetch(URL_BASE_SUBSCRIBER, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        response.status === 200 ? null : toast.warning("Subscriber Failed") 
        return response.status
    } else return  toast.warning("Email already registered")
}
export const useGetContentSubscribe = async () => {
    const data = await fetch(URL_BASE+`/subscribe-page`)
    return data.json()
}