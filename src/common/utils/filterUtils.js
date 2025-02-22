export const parseFundingAmount = (amount) => {
  if (!amount) return 0

  const numericPart = parseFloat(amount.replace(/[^0-9.]/g, ""))
  const isBillion = amount.toLowerCase().includes("b")
  const isMillion = amount.toLowerCase().includes("m")

  if (isBillion) {
    return numericPart * 1e9
  } else if (isMillion) {
    return numericPart * 1e6
  }

  return numericPart
}

export const extractStat = (company, label) => {
  const stat = company.stats?.data?.find((stat) => stat.label === label)
  return stat ? stat.value : ""
}

export const filterCompanies = (companies, filters, fundingAmountRanges) => {
  return companies.filter((company) => {
    const industry = company.industry || []
    const fundingStage = (company.fundingStage || "").toLowerCase()
    const fundingAmountRaw = company.fundingAmount || ""
    const fundingAmount = parseFundingAmount(fundingAmountRaw)

    const matchesIndustry =
      !filters.industry ||
      (Array.isArray(industry) &&
        industry.some(
          (ind) => ind.toLowerCase() === filters.industry.toLowerCase()
        ))

    const matchesFundingStage =
      !filters.fundingStage ||
      fundingStage.includes(filters.fundingStage.toLowerCase())

    const matchesFundingAmount =
      !filters.fundingAmount ||
      (() => {
        const selectedRange = fundingAmountRanges.find(
          (range) => range.label === filters.fundingAmount
        )
        return (
          selectedRange &&
          fundingAmount >= selectedRange.min &&
          fundingAmount <= selectedRange.max
        )
      })()

    return matchesIndustry && matchesFundingStage && matchesFundingAmount
  })
}
