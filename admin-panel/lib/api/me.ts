export async function me(): Promise<any> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/users/me/';

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('An error occurred while fetching user data.');
        }
    });
}
