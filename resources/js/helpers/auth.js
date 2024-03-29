export function login(credentials) {
    return new Promise((res, rej) => {
        axios.post('/api/auth/login', credentials)
            .then((response) => {
                res(response.data)
            })
            .catch(() => {
                rej('Wrong email or password')
            })
    });
}

export function getLocalUser() {
    const userString = localStorage.getItem('user');

    if (!userString || userString === 'undefined') {
        return null;
    }

    return JSON.parse(userString)
}
