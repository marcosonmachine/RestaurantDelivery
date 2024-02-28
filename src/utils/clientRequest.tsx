"use client";
import axios from 'axios'
import { notFound } from 'next/navigation';

import { getCookie, logout } from './clientUtils';

//TODO: These function just return the data which decreases their usability on front end side code, refactor?? maybe

const axiosInstance = axios.create({
    baseURL: "https://food-delivery.kreosoft.ru/api",
    timeout: 1000,
    headers: {
        'Accept' : 'text/plain',
        'Content-Type' : 'application/json',
    }
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${ getCookie("token") }`;
    return config
  }
)
axiosInstance.interceptors.response.use(undefined,  (error) => {
    if(error.response.status==401)
        logout()
})

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

export const getDishes = async (filter: string) =>
{
    //TODO: to be written

}

export const getDishInfo = async (dish_id: string) =>
{
    try {
        const response = await axiosInstance.get(`/dish/${dish_id}`)
        return response.data
    }
    catch(e){  console.error(e) }
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
    try {
        const response = await axiosInstance.post(`/order`, formData)
        return response.data
    }
    catch(e) { console.error(e) }
}

export const getOrder = async (id: string) =>
{
    try {
        const response = await axiosInstance.get(`/order/${id}`)
        return response.data;
    }
    catch(e) { console.error(e) }
}

export const confirmOrder = async (id: string) =>
{
    try {
        const response = await axiosInstance.post(`/order/${id}/status`)
        return response.data
    }
    catch(e) { console.error(e) }
}

export const getProfile = async () =>
{
    try {
        const response = await axiosInstance.get(`/account/profile`)
        return response.data;
    }
    catch(e) { notFound() }
}

export const editProfile = async (profile: any) =>
{
    try {
        const response = await axiosInstance.put(`/account/profile`, profile)
        return response.data
    }
    catch(e) { console.error(e) }
}


export default axiosInstance;
