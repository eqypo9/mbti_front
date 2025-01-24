import { Question } from '@/constants/mbti';

export const questions: Question[] = [
  {
    id: 1,
    question: '친구가 내 숙제를 도와주고 있을 때, 더 화가나는 상황은?',
    answers: [
      {
        text: '도와주다가 숙제를 다 날려버린 친구',
        type: 'T',
        color: 'bg-red-500',
      },
      {
        text: '내가 없는 사이 숙제를 다 베껴간 친구',
        type: 'F',
        color: 'bg-yellow-500',
      },
    ],
  },
  {
    id: 2,
    question:
      '친구와 만나기로 한 날, 친구가 모르는 친구를 데려왔다. 내 반응은?',
    answers: [
      {
        text: '아싸~ 친구 한명 더 생겼다!',
        type: 'E',
        color: 'bg-green-500',
      },
      {
        text: '왜 나한테 말도 안하고 데려오지? 서운하다😢',
        type: 'I',
        color: 'bg-blue-500',
      },
    ],
  },
  // Mock Data
  {
    id: 3,
    question: '어떤 여행을 선호하나요?',
    answers: [
      { text: '계획적으로 짜인 여행', type: 'J', color: 'bg-purple-500' },
      { text: '즉흥적인 자유여행', type: 'P', color: 'bg-orange-500' },
    ],
  },
  {
    id: 4,
    question: '문제가 생겼을 때 나는?',
    answers: [
      { text: '논리적으로 해결하려고 한다', type: 'T', color: 'bg-teal-500' },
      { text: '감정적으로 공감하려고 한다', type: 'F', color: 'bg-pink-500' },
    ],
  },
  {
    id: 5,
    question: '파티에 초대받았을 때, 나는?',
    answers: [
      {
        text: '새로운 사람들과 어울리는 것이 기대된다!',
        type: 'E',
        color: 'bg-green-400',
      },
      {
        text: '가까운 친구들과만 조용히 이야기하고 싶다.',
        type: 'I',
        color: 'bg-blue-400',
      },
    ],
  },
  {
    id: 6,
    question: '어떤 정보를 더 신뢰하나요?',
    answers: [
      { text: '직접 경험한 구체적인 사실', type: 'S', color: 'bg-yellow-400' },
      {
        text: '아이디어와 가능성을 상상하는 것',
        type: 'N',
        color: 'bg-indigo-400',
      },
    ],
  },
  {
    id: 7,
    question: '결정을 내릴 때 나는?',
    answers: [
      {
        text: '논리와 사실에 기반한 결정을 내린다.',
        type: 'T',
        color: 'bg-red-400',
      },
      {
        text: '사람들의 감정과 상황을 고려한다.',
        type: 'F',
        color: 'bg-pink-400',
      },
    ],
  },
  {
    id: 8,
    question: '주말에 할 일을 계획할 때 나는?',
    answers: [
      { text: '미리 철저히 계획을 세운다.', type: 'J', color: 'bg-purple-400' },
      {
        text: '그때그때 상황에 따라 즐기고 싶다.',
        type: 'P',
        color: 'bg-orange-400',
      },
    ],
  },
  {
    id: 9,
    question: '새로운 프로젝트를 시작할 때 나는?',
    answers: [
      {
        text: '팀원들과 함께 아이디어를 나누며 시작한다.',
        type: 'E',
        color: 'bg-green-500',
      },
      {
        text: '혼자 조용히 계획을 세우고 준비한다.',
        type: 'I',
        color: 'bg-blue-500',
      },
    ],
  },
  {
    id: 10,
    question: '대화를 나눌 때 나는?',
    answers: [
      {
        text: '구체적이고 현실적인 이야기 위주로 한다.',
        type: 'S',
        color: 'bg-yellow-500',
      },
      {
        text: '추상적이고 창의적인 아이디어를 논의한다.',
        type: 'N',
        color: 'bg-indigo-500',
      },
    ],
  },
  {
    id: 11,
    question: '갈등 상황에서 나는?',
    answers: [
      {
        text: '갈등을 해결하기 위해 객관적인 방법을 찾는다.',
        type: 'T',
        color: 'bg-red-500',
      },
      {
        text: '모두가 만족할 수 있는 감정적 해결책을 찾는다.',
        type: 'F',
        color: 'bg-pink-500',
      },
    ],
  },
  {
    id: 12,
    question: '마감 기한이 있는 일을 할 때 나는?',
    answers: [
      {
        text: '일정에 맞춰 계획적으로 진행한다.',
        type: 'J',
        color: 'bg-purple-500',
      },
      {
        text: '마감 직전에 몰아서 끝내는 경우가 많다.',
        type: 'P',
        color: 'bg-orange-500',
      },
    ],
  },
];
