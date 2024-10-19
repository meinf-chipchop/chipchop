import * as dotenv from 'dotenv';

dotenv.config();


export async function login(formData: { email: string, password: string }) {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/login/';

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('An error occurred while logging in.');
        }
    });
}