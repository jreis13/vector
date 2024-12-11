function CompanyScore({ vectorScore }) {
  return (
    <div className="my-4 flex flex-col items-center font-bold">
      <div>
        v/<span className="caret">^</span> Score
      </div>
      <div className="my-2 flex h-16 w-16 items-center justify-center rounded-full border bg-[#7032ff] px-4 py-4">
        {vectorScore}
      </div>
    </div>
  )
}

export default CompanyScore
