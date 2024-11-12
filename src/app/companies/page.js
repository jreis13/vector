import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import "../../common/styles/_reset.css"
import CompaniesLayout from "src/layouts/CompaniesLayout"

function CompaniesPage() {
  return (
    <div>
      <CompaniesLayout />
    </div>
  )
}

export default withPageAuthRequired(CompaniesPage)
