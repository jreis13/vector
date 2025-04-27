import "src/common/styles/_reset.css"
import ReportLayout from "src/layouts/ReportLayout"

export default function Reports({ params }) {
  return (
    <div>
      <ReportLayout reportId={params.reportId} />
    </div>
  )
}
