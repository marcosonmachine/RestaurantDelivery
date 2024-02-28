import axios from 'axios'
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';
import { jsonToUrl } from './utils';


const axiosInstance = axios.create({
    baseURL: "https://food-delivery.kreosoft.ru/api",
    timeout: 1000,
    headers: {
        'Accept' : 'text/plain',
        'Content-Type' : 'application/json',
    }
})

axiosInstance.interceptors.request.use((config) => {
    const cookieStore = cookies()
    config.headers.Authorization = `Bearer ${ cookieStore.get("token")?.value }`;
    return config
  }
)

export const loginAPI = async (formData: Record<string, any>) =>
{
    try {
        const response = await axiosInstance.post("/account/login", formData )
        return response.data
    }
    catch(e){ console.error(e) }
}

export const registerAPI = async (formData: Record<string, any>) =>
{
    try {
        const response = await axiosInstance.post("/account/register", formData )
        return response.data
    }
    catch(e){ console.error(e) }
}

export const getDishes = async (filter: any) =>
{
    try {
        const response = await axiosInstance.get(`/dish?${jsonToUrl(filter)}`)
        return response.data
    }
    catch(e){ console.error(e) }
}

export const getDishInfo = async (dish_id: string) =>
{
    try {
        const response = await axiosInstance.get(`/dish/${dish_id}`)
        return response.data
    }
    catch(e){  notFound() }
}

export const checkRateAccess = async (dish_id: string) =>
{
    try {
        const response = await axiosInstance.get(`/dish/${dish_id}/rating/check`)
        return response.data
    }
    catch(e){ console.error(e) }
}

export const setDishRating = async (dish_id: string, score: number) =>
{
    try {
        const response = await axiosInstance.post(`/dish/${dish_id}/rating?ratingScore=${score}`)
        return response.data
    }
    catch(e){ console.error(e) }
}

export const getBasket = async () => 
{
    try {
        const response = await axiosInstance.get(`/basket`)
        return response.data
    }
    catch(e){ console.error(e) }
}

export const addToCart = async (dish_id: string) => 
{
    try {
        const response = await axiosInstance.post(`/basket/dish/${dish_id}`)
        return response.data
    }
    catch(e){ console.error(e) }
}

export const removeFromCart = async (dish_id: string, removeAll: boolean = false) => 
{
    try {
        const response = await axiosInstance.delete(`/basket/dish/${dish_id}?increase=${!removeAll}`)
        return response.data
    }
    catch(e){ console.error(e) }
}

export const getUserProfile = async () =>
{
    try {
        const response = await axiosInstance.get(`/account/profile`)
        return response.data
    }
    catch(e) { console.error(e) }
}

interface OrderData {
    deliveryTime: string,
    address: string
}

export const getOrders = async () => 
{
    try {
        const response = await axiosInstance.get(`/order`)
        return response.data;
    }
    catch (e) { console.error(e) }
}

export const createOrder = async (formData: OrderData) =>
{
    //TODO may be this implementation is wrong because axios doc have it's own way 
    try {
        const request = await axiosInstance.post(`/order`, formData)
        return request
    }
    catch (e: any) {
        return {...e}
    }
   
}

export const getOrder = async (id: string) =>
{
    try {
        const response = await axiosInstance.get(`/order/${id}`)
        return response.data;
    }
    catch(e) { notFound() }
}

export const confirmOrder = async (id: string) =>
{
    try {
        const response = await axiosInstance.post(`/order/${id}/status`)
        return response.data
    }
    catch(e) { console.error(e) }
}

export default axiosInstance;