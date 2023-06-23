"use client";
const token: any = localStorage.getItem("token");
console.log(token)
// this config can be used with every single request to validate the SignedIn User
export const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true
};