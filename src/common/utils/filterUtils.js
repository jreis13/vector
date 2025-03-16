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

    const region = Array.isArray(company.region)
      ? company.region[0] || ""
      : company.region || ""

    const type = Array.isArray(company.type)
      ? company.type[0] || ""
      : company.type || ""

    const industry = Array.isArray(company.industry)
      ? company.industry[0] || ""
      : company.industry || ""

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

    const matchesRegion =
      !filters.region || region.toLowerCase() === filters.region.toLowerCase()

    const matchesType =
      !filters.type || type.toLowerCase() === filters.type.toLowerCase()

    const matchesIndustry =
      !filters.industry ||
      industry.toLowerCase() === filters.industry.toLowerCase()

    return (
      matchesFundingStage &&
      matchesFundingAmount &&
      matchesRegion &&
      matchesType &&
      matchesIndustry
    )
  })
}
