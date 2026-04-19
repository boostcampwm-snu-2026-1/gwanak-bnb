export async function fetchDestinationSuggestions(query) {
  const trimmed = query.trim();

  const url = !trimmed
    ? "/api/destinations"
    : `/api/destinations/autocomplete?q=${encodeURIComponent(trimmed)}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("검색 요청 실패");
  }

  return res.json();
}

export async function fetchDestinations({ query = "", capacity }) {
    const params = new URLSearchParams();

    if (query.trim()) {
        params.append("q", query);
    }

    if (capacity) {
        params.append("capacity", capacity);
    }

    const url = query.trim()
        ? `/api/destinations/autocomplete?${params}`
        : `/api/destinations?${params}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("검색 요청 실패");
    }

    return res.json();
}

export async function fetchDestinationById(id) {
  const res = await fetch(`/api/destinations/${id}`);

  if (!res.ok) {
    throw new Error("상세 조회 실패");
  }

  return res.json();
}