---
title: "2048 게임 클론"
category: 토이프로젝트
tech_stack: [JavaScript, HTML5, Canvas, CSS3]
github: https://github.com/1di0t/2048-clone
demo: https://1di0t.github.io/2048-clone
period: "2024.05"
thumbnail:
excerpt: "순수 JavaScript로 구현한 2048 게임 클론 코딩 프로젝트"
---

## 프로젝트 개요

인기 퍼즐 게임 '2048'을 순수 JavaScript로 클론 코딩한 토이 프로젝트입니다. 프레임워크 없이 바닐라 JavaScript만을 사용하여 게임 로직과 애니메이션을 구현했습니다.

## 주요 기능

### 1. 게임 플레이
- 방향키를 이용한 타일 이동
- 같은 숫자 타일 병합
- 점수 시스템
- 최고 점수 저장 (LocalStorage)

### 2. UI/UX
- 부드러운 타일 이동 애니메이션
- 타일 병합 효과
- 반응형 디자인
- 게임 오버 감지 및 알림

### 3. 게임 제어
- 새 게임 시작
- 실행 취소 기능
- 키보드 및 터치 제스처 지원

## 핵심 구현

### 게임 로직
```javascript
class Game2048 {
  constructor() {
    this.grid = this.createEmptyGrid();
    this.score = 0;
    this.addRandomTile();
    this.addRandomTile();
  }

  move(direction) {
    const moved = this.moveTiles(direction);
    if (moved) {
      this.addRandomTile();
      this.checkGameOver();
    }
  }

  mergeTiles(tiles) {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i].value === tiles[i + 1].value) {
        tiles[i].value *= 2;
        this.score += tiles[i].value;
        tiles.splice(i + 1, 1);
      }
    }
    return tiles;
  }
}
```

### 애니메이션
```javascript
function animateTile(tile, fromPos, toPos) {
  const duration = 150;
  const start = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    tile.style.transform = `translate(
      ${fromPos.x + (toPos.x - fromPos.x) * progress}px,
      ${fromPos.y + (toPos.y - fromPos.y) * progress}px
    )`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
```

## 기술적 도전

### 1. 타일 이동 알고리즘
방향에 따라 타일을 이동시키고 병합하는 로직을 구현하는 것이 핵심 도전 과제였습니다.

**해결 방법**:
- 각 방향별로 그리드를 회전/뒤집기
- 항상 왼쪽 방향으로 이동하도록 정규화
- 이동 후 원래 방향으로 복원

### 2. 부드러운 애니메이션
타일 이동 시 자연스러운 애니메이션 구현이 필요했습니다.

**해결 방법**:
- requestAnimationFrame 활용
- CSS transform을 통한 GPU 가속
- Easing 함수 적용

### 3. 터치 제스처 지원
모바일 환경에서 스와이프 제스처를 감지해야 했습니다.

**해결 방법**:
```javascript
let touchStartX = 0;
let touchStartY = 0;

element.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

element.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;

  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    game.move(dx > 0 ? 'right' : 'left');
  } else {
    game.move(dy > 0 ? 'down' : 'up');
  }
});
```

## 게임 전략 팁

1. **코너 전략**: 가장 큰 타일을 한쪽 코너에 고정
2. **단방향 우선**: 주로 2-3개 방향만 사용
3. **병합 체인**: 연속적인 병합을 유도
4. **빈 공간 확보**: 항상 이동 가능한 공간 유지

## 성과

- GitHub Stars: **50+**
- 데모 사이트 방문자: **1,000+ (월간)**
- 코드 리뷰: **"깔끔한 구조와 주석" 평가**

## 배운 점

- 순수 JavaScript를 통한 DOM 조작
- 게임 상태 관리 패턴
- 애니메이션 최적화 기법
- 모바일 터치 이벤트 처리
- 알고리즘 설계 및 최적화

## 개선 사항

1. ~~실행 취소 기능~~ (완료)
2. 다크모드 지원
3. 리더보드 (온라인 점수 저장)
4. 난이도 설정 (4x4, 5x5, 6x6)
5. PWA 지원 (오프라인 플레이)

## 플레이해보기

[Live Demo에서 직접 플레이해보세요!](https://1di0t.github.io/2048-clone)

**최고 점수를 도전해보세요! 🎮**
