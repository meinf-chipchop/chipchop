interface AccountApproval {
    user: any,
    info: any,
    state: string,
    created_at: string,
    updated_at: string,
}

export async function getAccountApprovals(pageNumber: number, pageSize: number): Promise<AccountApproval[]> {
    const offset = (pageNumber - 1) * pageSize;

    const limitString = `limit=${pageSize}`;
    const offsetString = offset > 0 ? `offset=${offset}` : ``;

    const url = process.env.NEXT_PUBLIC_API_URL!
        .concat("/api/account-approvals/?")
        .concat(limitString)
        .concat(offsetString);

    const initialResponse = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!initialResponse.ok) {
        throw new Error('An error occurred while fetching account approvals.');
    }

    const initialData = await initialResponse.json();
    const urls = initialData.results;

    const results = await Promise.all(urls.map(async (url: any) => {
        const response = await fetch(url.url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('An error occurred while fetching account approvals.');
        }

        return response.json();
    }));

    return results.flatMap((result: any): AccountApproval => {
        {
            return {
                user: result.user,
                info: result.info,
                state: result.state,
                created_at: result.created_at,
                updated_at: result.updated_at,
            };
        }
    });
}
