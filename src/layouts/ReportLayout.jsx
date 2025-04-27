import Report from "src/components/Report"

export default function ReportLayout({ reportId }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow flex-col">
        <div id="Reports" className="flex-grow">
          <Report reportId={reportId} />
        </div>
      </div>
    </div>
  )
}
