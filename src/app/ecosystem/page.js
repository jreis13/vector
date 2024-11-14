import { getSession } from "@auth0/nextjs-auth0"
import "../../common/styles/_reset.css"
import EcosystemLayout from "src/layouts/EcosystemLayout"

export default async function EcosystemPage() {
  const session = await getSession()

  return (
    <div>
      <EcosystemLayout user={session?.user || null} />
    </div>
  )
}
