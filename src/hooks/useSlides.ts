export function useSlides(username: string, mbti: string, best: string[], worst: string[]) {
  return [
    { type: 'image', src: '/images/test-cake-jo.png' },
    {
      type: 'text',
      title: `${username}님의 MBTI 결과`,
      description: `당신의 MBTI는 ${mbti} 입니다. 이 유형의 특징은...`,
    },
    {
      type: 'text',
      title: '최고의 궁합',
      description: best.length ? `당신과 가장 잘 맞는 MBTI는 ${best.join(', ')} 입니다!` : '데이터 없음',
    },
    {
      type: 'text',
      title: '최악의 궁합',
      description: worst.length ? `가장 안 맞는 MBTI는 ${worst.join(', ')} 입니다!` : '데이터 없음',
    },
  ];
}
