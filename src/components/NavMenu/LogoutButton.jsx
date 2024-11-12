import Link from "next/link"

function LogoutButton() {
  return (
    <Link href="/api/auth/logout">
      <button>Log Out</button>
    </Link>
  )
}

export default LogoutButton
