interface GeneralAccountApproval {
  user_id: number;
  url: string;
  email: string;
  state: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export async function getAccountApprovals(
  pageNumber: number,
  pageSize: number
): Promise<GeneralAccountApproval[]> {
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

  const data = await initialResponse.json();
  return data.results;
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
      "X-CSRFToken": getCsrfToken() ?? "",
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
