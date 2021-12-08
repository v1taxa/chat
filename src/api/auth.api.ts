interface Credentials {
    username: string;
    password: string;
}

export const login = async (credentials: Credentials) => {

    const URL = 'https://dev.darkstores-backend.dev.huskyjam.com/api/v1/auth/login/username/'

    const method = 'POST'

    const headers = { "Content-Type": "application/json" };

    const data = await fetch(URL, {
        method,
        headers,
        body: JSON.stringify(credentials)
    })
    const response: any = data.json()
    return response
};

export const letRefreshToken = async (refresh: string) => {

    const URL = 'https://dev.darkstores-backend.dev.huskyjam.com/api/v1/auth/token/refresh/';

    const method = 'POST'

    const headers = { "Content-Type": "application/json" }

    const data = await fetch(URL, {
        method,
        headers,
        body: localStorage.getItem('refreshToken')
    })

    const response = data.json()
    return response
}
