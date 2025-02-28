export type MbtiType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type Answer = {
  text: string;
  type: MbtiType;
  color: string;
};

export type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

export type DetailedMbtiType =
  | 'INTJ'
  | 'INTP'
  | 'INFJ'
  | 'INFP'
  | 'ISTJ'
  | 'ISTP'
  | 'ISFJ'
  | 'ISFP'
  | 'ENTJ'
  | 'ENTP'
  | 'ENFJ'
  | 'ENFP'
  | 'ESTJ'
  | 'ESTP'
  | 'ESFJ'
  | 'ESFP';

export const mbtiMatches: Record<
  DetailedMbtiType,
  { best: DetailedMbtiType; worst: DetailedMbtiType }
> = {
  INTJ: { best: 'ENFP', worst: 'ESFJ' },
  INTP: { best: 'ENTJ', worst: 'ESFP' },
  INFJ: { best: 'ENTP', worst: 'ESTJ' },
  INFP: { best: 'ENFJ', worst: 'ESTP' },
  ISTJ: { best: 'ESFP', worst: 'ENFJ' },
  ISTP: { best: 'ESFJ', worst: 'ENFP' },
  ISFJ: { best: 'ESTP', worst: 'INFP' },
  ISFP: { best: 'ESTJ', worst: 'ENTP' },
  ENTJ: { best: 'INTP', worst: 'INFJ' },
  ENTP: { best: 'INFJ', worst: 'ISFP' },
  ENFJ: { best: 'INFP', worst: 'ISTJ' },
  ENFP: { best: 'INTJ', worst: 'ISTP' },
  ESTJ: { best: 'ISFP', worst: 'INFJ' },
  ESTP: { best: 'ISFJ', worst: 'INFP' },
  ESFJ: { best: 'ISTP', worst: 'ENFP' },
  ESFP: { best: 'ISTJ', worst: 'ENFJ' },
};

export const mbtiPeople: Record<DetailedMbtiType, string[]> = {
  INFP: ['영훈(더보이즈)', '신유(투어스)'],
  INFJ: ['차은우(차은우)', '마크(NCT)'],
  INTJ: ['시온(위시)', '태산(보넥도)'],
  INTP: ['앤톤(라이즈)', '진(방탄)'],
  ENFP: ['사쿠야(위시)', '명재현(보넥도)'],
  ENFJ: ['현재(더보이즈)', '민규(세븐틴)'],
  ENTJ: ['성호(보넥도)', '제이(엔하이픈)'],
  ENTP: ['주연(더보이즈)', '영케이(day6)'],
  ISFP: ['리쿠(위시)', '수빈(투바투)'],
  ISFJ: ['도영(NCT)', '재민(NCT)'],
  ISTJ: ['원빈(라이즈)', '정원(엔하이픈)'],
  ISTP: ['은석(라이즈)', '도훈(투어스)'],
  ESFP: ['쇼타로(라이즈)', '재현(NCT)'],
  ESFJ: ['유우시(위시)', '성훈(엔하이픈)'],
  ESTJ: ['마키(앤팀)', '제이크(엔하이픈)'],
  ESTP: ['성찬(라이즈)', '태현(투바투)'],
};
