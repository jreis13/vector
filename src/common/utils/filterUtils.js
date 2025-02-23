export const extractStat = (company, label) => {
  const stat = company.stats?.data?.find((stat) => stat.label === label)
  return stat ? stat.value : ""
}

export const filterCompanies = (companies, filters, fundingAmountRanges) => {
  return companies.filter((company) => {
    const fundingStage = Array.isArray(company.fundingStage)
      ? company.fundingStage[0] || ""
      : company.fundingStage || ""

    const fundingAmountRaw = Array.isArray(company.fundingAmount)
      ? company.fundingAmount[0] || ""
      : company.fundingAmount || ""

    const matchesFundingStage =
      !filters.fundingStage ||
      fundingStage.toLowerCase() === filters.fundingStage.toLowerCase()

    const matchesFundingAmount =
      !filters.fundingAmount ||
      (() => {
        const selectedRange = fundingAmountRanges.find(
          (range) => range.label === filters.fundingAmount
        )
        return (
          selectedRange &&
          Number(fundingAmountRaw) >= selectedRange.min &&
          Number(fundingAmountRaw) <= selectedRange.max
        )
      })()

    return matchesFundingStage && matchesFundingAmount
  })
}
