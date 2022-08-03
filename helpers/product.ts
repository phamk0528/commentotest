import {URL_BASE_PRODUCT} from '../constants'

export const useGetProductById = async (id:string) => {
    const data = await fetch(URL_BASE_PRODUCT+`/products/${id}`)   
    return data.json()
}