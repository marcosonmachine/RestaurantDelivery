"use client";
import { useEffect } from "react";
export function getCookie(name: string) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }

  }
  return undefined;
}

export function deleteCookie(name:string, path:string, domain?:string) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? ";path=" + path : "") +
      ((domain) ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

export function logout () {
  deleteCookie("token", "/"); 
  deleteCookie("email", "/");
}

export function login (email: string, token:string)
{
  document.cookie = `token=${token}; path=/; secure`;
  document.cookie = `email=${email}; path=/; secure`;
}

