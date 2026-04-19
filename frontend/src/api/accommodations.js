const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function searchAccommodations({ destination, guests }) {
  const params = new URLSearchParams({
    destination,
    guests: String(guests),
  });

  const response = await fetch(
    `${API_BASE_URL}/api/accommodations/search?${params.toString()}`
  );
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || '숙소 검색에 실패했습니다.');
  }

  return body;
}

export { searchAccommodations };
