import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        {/* 기본 메타 태그 */}
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='author' content='Ganeounghan Team' />
        <meta
          name='description'
          content='나의 MBTI를 알아보고, 최고의 궁합 아이돌과 함께하는 특별한 케이크 이미지를 만들고 저장하세요! 인스타 스토리 레이아웃으로 결과를 확인할 수 있어요.'
        />
        <meta
          name='keywords'
          content='MBTI 테스트, 아이돌 궁합, 인스타 스토리, 케이크 이미지, 성격 유형, 궁합 테스트, 심리 테스트'
        />
        {/* Open Graph (OG) 메타 태그 - SNS 공유 최적화 */}
        <meta
          property='og:title'
          content='나의 MBTI & 아이돌 궁합 테스트 🎂✨'
        />
        <meta
          property='og:description'
          content='내 MBTI를 알아보고, 최고의 궁합 아이돌과 함께하는 특별한 케이크 이미지를 저장하세요! 인스타 스토리 레이아웃으로 결과를 확인할 수 있어요.'
        />
        {/* 수정하기 */}
        <meta property='og:image' content='/images/test-cake-jo.png' />
        <meta property='og:url' content='https://ganeounghan.com' />
        <meta property='og:type' content='website' />
        {/* Twitter Card 메타 태그 */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='MBTI & 아이돌 궁합 테스트 🎂✨' />
        <meta
          name='twitter:description'
          content='내 MBTI를 알아보고, 나와 최고의 궁합 아이돌과 함께하는 특별한 케이크 이미지를 만들어 보세요!'
        />
        {/* 수정하기 */}
        <meta name='twitter:image' content='/images/test-cake-jo.png' />
        <meta name='twitter:site' content='@ganeounghan' />
        {/* Favicon & 애플 아이콘 */}
        {/* 수정하기 */}
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-test-cake-jo.png' // 수정하기
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
