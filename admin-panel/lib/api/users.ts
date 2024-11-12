import { getCsrfToken } from '@/lib/api/account-approvals';

export async function getUsers(): Promise<any> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/users/';

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('An error occurred while fetching user data.');
    });
}

export async function requestUserStatusChange(user_id: number, is_ban: boolean) {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/users/' + user_id + '/';

    return await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCsrfToken() || '',
        },
        credentials: 'include',
        body: JSON.stringify({
            banned: is_ban,
        }),
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('An error occurred while changing user status.');
    });
}