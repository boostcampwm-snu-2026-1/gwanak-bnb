//api/location.ts
const API_URL = import.meta.env.VITE_API_BASE_URL;

export type LocationItem = {
    display_name: string;
    sub_title: string;
    id: string;
}

export async function fetchLocations(search: string): Promise<LocationItem[]> {
    const response = await fetch(`${API_URL}/locations?search=${search}`);

    if (response.status === 404) return [];

    return await response.json()
};
