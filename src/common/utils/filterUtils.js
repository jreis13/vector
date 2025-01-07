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

export const filterCompanies = (companies, filters, options) => {
  const { industryOptions, fundingStageOptions, fundingAmountRanges } = options

  return companies.filter((company) => {
    const industry = extractStat(company, "Industry") || ""
    const fundingStage = extractStat(company, "Funding Stage") || ""
    const fundingAmountRaw = extractStat(company, "Funding Amount") || ""
    const fundingAmount = parseFundingAmount(fundingAmountRaw)

    const matchesIndustry =
      !filters.industry ||
      industryOptions
        .find((option) => option.label === filters.industry)
        ?.keywords.some((keyword) =>
          industry.toLowerCase().includes(keyword.toLowerCase())
        )

    const matchesFundingStage =
      !filters.fundingStage ||
      fundingStageOptions
        .find((option) => option.label === filters.fundingStage)
        ?.keywords.some((keyword) =>
          fundingStage.toLowerCase().includes(keyword.toLowerCase())
        )

    const matchesFundingAmount =
      !filters.fundingAmount ||
      fundingAmountRanges.some(
        (range) =>
          range.label === filters.fundingAmount &&
          fundingAmount >= range.min &&
          fundingAmount <= range.max
      )

    return matchesIndustry && matchesFundingStage && matchesFundingAmount
  })
}
