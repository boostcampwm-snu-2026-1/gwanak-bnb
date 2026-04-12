export const LOCATIONS = [
    { id: 1, name: "대한민국", type: "COUNTRY", parentId: null },
    { id: 2, name: "서울특별시", type: "PROVINCE", parentId: 1 },
    { id: 3, name: "부산광역시", type: "PROVINCE", parentId: 1 },
    { id: 4, name: "강서구", type: "CITY", parentId: 2},
    { id: 5, name: "관악구", type: "CITY", parentId: 2},
    { id: 6, name: "해운대구", type: "CITY", parentId: 3},
    { id: 7, name: "서울대학교", type: "PLACE", parentId: 5},
    { id: 8, name: "해운대해수욕장", type: "PLACE", parentId: 6}
];