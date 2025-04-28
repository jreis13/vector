import "src/common/styles/_reset.css"
import FreeReportPopup from "src/components/FreeReportPopup"

import MainLayout from "src/layouts/MainLayout"

export default function Home() {
  return (
    <div>
      <MainLayout />
      <FreeReportPopup />
    </div>
  )
}
