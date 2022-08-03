import { URL_BASE } from '../constants';
import dayjs from "dayjs";

export const getUrlImage = (image: string) => {
    return URL_BASE + image
}

export const getTags = (tags: string) => { 
    return tags.split(',')
}

export const getProductIds = (ids: string) => { 
    return ids.split(',')
}

export const getInterested = (ids: string) => { 
    return ids.split(',')
}

export const formatDatePublic = (datePublic: any) => {
    return dayjs(datePublic).format("D MMM YY");
}
