function normalizeSearchValue(value) {
  return value.trim().toLowerCase()
}

export function filterDestinations(query, destinations) {
  const normalizedQuery = normalizeSearchValue(query)

  if (!normalizedQuery) {
    return destinations
  }

  return destinations.filter((destination) => {
    const searchableValues = [
      destination.title,
      destination.address,
      destination.placeType,
      ...(destination.searchTokens ?? []),
    ]

    return searchableValues.some((value) =>
      normalizeSearchValue(value).includes(normalizedQuery),
    )
  })
}

export default filterDestinations
