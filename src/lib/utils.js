// 유틸리티 함수 모음
// shadcn/ui가 자동 생성한 파일로, Tailwind 클래스 조합에 사용된다

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// cn(...inputs): 여러 className을 조건부로 합치는 헬퍼 함수
// - clsx: 조건부 클래스 문자열 생성 (예: cn('a', isActive && 'b'))
// - twMerge: 중복/충돌하는 Tailwind 클래스를 마지막 것으로 병합
//   (예: cn('px-2 px-4') → 'px-4')
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
