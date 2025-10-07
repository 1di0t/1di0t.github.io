---
title: "포트폴리오 웹사이트"
category: 웹개발
tech_stack: [React, Next.js, TypeScript, Tailwind CSS, Vercel]
github: https://github.com/1di0t/portfolio
demo: https://portfolio.example.com
period: "2024.01 - 2024.02"
thumbnail:
excerpt: "Next.js와 Tailwind CSS를 활용한 반응형 포트폴리오 웹사이트 개발"
---

## 프로젝트 개요

개인 포트폴리오를 효과적으로 전시하기 위한 현대적인 웹사이트를 구축했습니다. Next.js의 SSG(Static Site Generation) 기능을 활용하여 빠른 로딩 속도와 SEO 최적화를 달성했습니다.

## 주요 기능

### 1. 반응형 디자인
- Mobile-first 접근 방식
- 다크모드 지원
- 부드러운 애니메이션 효과

### 2. 프로젝트 갤러리
- 필터링 및 정렬 기능
- 상세 페이지 동적 라우팅
- 이미지 최적화 (Next.js Image)

### 3. 블로그 시스템
- MDX 기반 콘텐츠 관리
- 코드 하이라이팅
- 읽기 시간 계산

### 4. 연락 폼
- 클라이언트 측 유효성 검증
- Nodemailer를 통한 이메일 전송
- reCAPTCHA 스팸 방지

## 기술적 특징

### 성능 최적화
```typescript
// Image 최적화
<Image
  src={project.thumbnail}
  alt={project.title}
  width={600}
  height={400}
  placeholder="blur"
  loading="lazy"
/>

// Code Splitting
const ProjectDetail = dynamic(() => import('@/components/ProjectDetail'), {
  loading: () => <Skeleton />,
})
```

### SEO 최적화
- Open Graph 메타 태그
- 구조화된 데이터 (JSON-LD)
- Sitemap 자동 생성
- robots.txt 설정

### 접근성
- WCAG 2.1 AA 준수
- 키보드 네비게이션 지원
- ARIA 레이블 적용
- 대비 비율 최적화

## 성과

- Lighthouse 성능 점수: **98/100**
- First Contentful Paint: **0.8s**
- Time to Interactive: **1.2s**
- 월간 방문자: **500+**

## 기술적 도전

### 다크모드 구현
초기 렌더링 시 플리커(깜빡임) 현상을 해결하기 위해 `next-themes` 라이브러리를 사용하고, localStorage를 활용한 사용자 설정 저장을 구현했습니다.

### 이미지 최적화
다양한 디바이스에서 최적의 이미지를 제공하기 위해 Next.js의 Image 컴포넌트와 Cloudinary를 연동하여 자동 리사이징 및 포맷 변환을 구현했습니다.

## 배운 점

- Next.js의 SSG와 ISR의 차이점과 활용 방법
- 웹 성능 최적화의 중요성
- 사용자 중심의 디자인 사고
- CI/CD 파이프라인 구축 경험
