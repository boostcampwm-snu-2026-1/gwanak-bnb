export const LOCATIONS = [
    { id: 1, title: "대한민국", type: "COUNTRY", parentId: null },
    { id: 2, title: "서울특별시", type: "PROVINCE", parentId: 1 },
    { id: 3, title: "부산광역시", type: "PROVINCE", parentId: 1 },
    { id: 4, title: "강서구", type: "CITY", parentId: 2},
    { id: 5, title: "관악구", type: "CITY", parentId: 2},
    { id: 6, title: "해운대구", type: "CITY", parentId: 3},
    { id: 7, title: "서울대학교", type: "PLACE", parentId: 5},
    { id: 8, title: "해운대해수욕장", type: "PLACE", parentId: 6}
];