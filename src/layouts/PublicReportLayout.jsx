import PublicReport from "src/components/PublicReport"

export default function PublicReportLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow flex-col">
        <div id="Reports" className="flex-grow">
          <PublicReport />
        </div>
      </div>
    </div>
  )
}
