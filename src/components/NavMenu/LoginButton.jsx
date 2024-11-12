import Link from "next/link"

function LoginButton() {
  return (
    <Link href="/api/auth/login">
      <button>Log In</button>
    </Link>
  )
}

export default LoginButton
