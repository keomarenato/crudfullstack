import axios, {AxiosError} from "axios";
import {parseCookies} from 'nookies'

export function setupAPIClient(ctx){
 let cookies = parseCookies(ctx)

 const api = axios.create({
    baseURL: 'http://192.168.1.101:3333',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`
    }
})
 return api
}