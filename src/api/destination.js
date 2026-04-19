export async function fetchDestinations(query) {
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

export async function fetchDestinationById(id) {
  const res = await fetch(`/api/destinations/${id}`);

  if (!res.ok) {
    throw new Error("상세 조회 실패");
  }

  return res.json();
}