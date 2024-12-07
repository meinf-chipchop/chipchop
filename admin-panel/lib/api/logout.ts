export async function logout() {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/logout/';

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('An error occurred while logging out.');
        }
    });
}