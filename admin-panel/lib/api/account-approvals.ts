interface AccountApproval {
  user: any;
  info: any;
  state: string;
  created_at: string;
  updated_at: string;
}

export async function getAccountApprovals(
  pageNumber: number,
  pageSize: number
): Promise<AccountApproval[]> {
  const offset = (pageNumber - 1) * pageSize;

  const limitString = `limit=${pageSize}`;
  const offsetString = offset > 0 ? `offset=${offset}` : ``;

  const url = process.env
    .NEXT_PUBLIC_API_URL!.concat("/api/account-approvals/?")
    .concat(limitString)
    .concat(offsetString);

  const initialResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!initialResponse.ok) {
    throw new Error("An error occurred while fetching account approvals.");
  }

  const initialData = await initialResponse.json();
  const urls = initialData.results;

  const results = await Promise.all(
    urls.map(async (url: any) => {
      const response = await fetch(url.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("An error occurred while fetching account approvals.");
      }

      return response.json();
    })
  );

  return results.flatMap((result): AccountApproval => {
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

export function getCsrfToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken"))
    ?.split("=")[1];
}

// Enum with states (PENDING, APPROVED, REJECTED)
export enum AccountApprovalState {
  PENDING = "P",
  APPROVED = "A",
  REJECTED = "R",
}

export async function setStateAccountApproval(
  id: number,
  status: AccountApprovalState
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/account-approvals/${id}/`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken() || "",
    },
    credentials: "include",
    body: JSON.stringify({
      state: status,
    }),
  });

  if (!response.ok) {
    throw new Error("An error occurred while updating account approval.");
  }
}
