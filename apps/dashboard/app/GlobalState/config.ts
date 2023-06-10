// this config can be used with every single request to validate the SignedIn User
export const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
};