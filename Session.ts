'use client';

export const session: any  = localStorage.getItem("user") || null;
console.log(session?.phone)
// const session = localStorage.getItem("user");