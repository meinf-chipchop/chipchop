interface UserEmailProps {
  email: string
}


export function UserEmailDisplay({ email }: Readonly<UserEmailProps>) {
  return (
    <div className="mb-4">
      <p className="font-bold text-gray-900">{email}</p>
    </div>
  )
}
