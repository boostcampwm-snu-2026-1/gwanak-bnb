const getChosung = (str: string) => {
    const cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    let result = "";

    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i) - 44032;
        if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
        else result += str.charAt(i);
    }
    return result;
};

export const MOCK_PLACES = [
    { id: 1, name: '서울', country: '한국' },
    { id: 2, name: '인천', country: '한국' },
    { id: 3, name: '대구', country: '한국' },
    { id: 4, name: '광주', country: '한국' },
    { id: 5, name: '대전', country: '한국' },
    { id: 6, name: '울산', country: '한국' },
    { id: 7, name: '세종', country: '한국' },
    { id: 8, name: '경주', country: '한국' },
    { id: 9, name: '전주', country: '한국' },
    { id: 10, name: '여수', country: '한국' },
    { id: 11, name: '도쿄', country: '일본' },
    { id: 12, name: '오사카', country: '일본' },
    { id: 13, name: '교토', country: '일본' },
    { id: 14, name: '후쿠오카', country: '일본' },
    { id: 15, name: '삿포로', country: '일본' },
    { id: 16, name: '오픈', country: '일본' },
    { id: 17, name: '파리', country: '프랑스' },
    { id: 18, name: '런던', country: '영국' },
    { id: 19, name: '뉴욕', country: '미국' },
    { id: 20, name: '방콕', country: '태국' },
    { id: 21, name: '다낭', country: '베트남' },
    { id: 22, name: '나트랑', country: '베트남' },
    { id: 23, name: '하노이', country: '베트남' },
    { id: 24, name: '발리', country: '인도네시아' },
    { id: 25, name: '싱가포르', country: '싱가포르' },
    { id: 26, name: '시드니', country: '호주' },
    { id: 27, name: '멜버른', country: '호주' },
    { id: 28, name: '바르셀로나', country: '스페인' },
    { id: 29, name: '마드리드', country: '스페인' },
    { id: 30, name: '로마', country: '이탈리아' },
];

export const DEFAULT_PLACES = [
    { id: 101, name: '근처 체험 찾기', country: '가까운 곳에서 즐길 수 있는 체험을 찾아보세요.' },
    { id: 102, name: '광안리해수욕장', country: '해변으로 인기 있는 곳' },
    { id: 103, name: '경복궁', country: '조선시대의 궁궐' },
    { id: 104, name: '에펠탑', country: '파리의 상징적인 건축물' },
];

export const getFilteredPlaces = (keyword: string) => {
    const trimmedKeyword = keyword.trim().toLowerCase();
    if (!trimmedKeyword) return DEFAULT_PLACES;

    const keywordChosung = getChosung(trimmedKeyword);

    return MOCK_PLACES.filter((place) => {
        const name = place.name.toLowerCase();
        const nameChosung = getChosung(name);

        return name.includes(trimmedKeyword) || nameChosung.includes(keywordChosung);
    });
};