---
layout: post
title: "TroubleShooting: 답변 줄 정리"
category: troubleshooting
tags: [react, css, web-development, white-space, text-formatting]
excerpt: "React 웹앱에서 Llama 답변의 줄바꿈 문자가 표시되지 않는 문제를 해결합니다."
---

## 문제 설명

Llama의 답변 내에서 줄바꿈 문자(`\n`)가 포함되어 있는데, React 웹앱에서 줄바꿈이 제대로 표시되지 않는 문제가 발생했습니다.

---

## 해결 방법

`App.css`의 `.App` 스타일에 `white-space: pre-wrap` 속성을 추가하여 해결했습니다.

### CSS 수정

```css
.App {
  white-space: pre-wrap;
}
```

---

## white-space 속성 설명

### white-space 값 비교

| 값 | 공백 병합 | 줄바꿈 문자 | 자동 줄바꿈 |
|----|-----------|-------------|-------------|
| `normal` | O | X | O |
| `nowrap` | O | X | X |
| `pre` | X | O | X |
| `pre-wrap` | X | O | O |
| `pre-line` | O | O | O |
| `break-spaces` | X | O | O |

---

## 상세 비교

### 1. normal (기본값)

```css
white-space: normal;
```

- 연속된 공백을 하나로 병합
- `\n` 무시
- 자동 줄바꿈 적용

### 2. pre

```css
white-space: pre;
```

- 공백과 줄바꿈 그대로 유지
- 자동 줄바꿈 안 함 (가로 스크롤 발생 가능)

### 3. pre-wrap (권장)

```css
white-space: pre-wrap;
```

- 공백과 줄바꿈 유지
- 자동 줄바꿈 적용
- 반응형 디자인에 적합

### 4. pre-line

```css
white-space: pre-line;
```

- 연속 공백은 병합
- 줄바꿈 문자는 유지
- 자동 줄바꿈 적용

---

## React 컴포넌트 예시

### 기본 구현

```jsx
import './App.css';

function App() {
  const llamaResponse = "첫 번째 줄입니다.\n두 번째 줄입니다.\n세 번째 줄입니다.";

  return (
    <div className="App">
      <p>{llamaResponse}</p>
    </div>
  );
}

export default App;
```

### CSS 파일

```css
/* App.css */
.App {
  white-space: pre-wrap;
  padding: 20px;
}
```

---

## 대안 방법

### 1. dangerouslySetInnerHTML 사용

```jsx
function App() {
  const llamaResponse = "첫 번째 줄<br/>두 번째 줄<br/>세 번째 줄";

  return (
    <div className="App">
      <div dangerouslySetInnerHTML={{ __html: llamaResponse }} />
    </div>
  );
}
```

**주의**: XSS 공격에 취약할 수 있으므로 신뢰할 수 있는 데이터에만 사용

### 2. split()과 map() 사용

```jsx
function App() {
  const llamaResponse = "첫 번째 줄\n두 번째 줄\n세 번째 줄";
  const lines = llamaResponse.split('\n');

  return (
    <div className="App">
      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}
```

### 3. <pre> 태그 사용

```jsx
function App() {
  const llamaResponse = "첫 번째 줄\n두 번째 줄\n세 번째 줄";

  return (
    <div className="App">
      <pre>{llamaResponse}</pre>
    </div>
  );
}
```

---

## 전체 예제 코드

### App.js

```jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState(
    "안녕하세요!\n\nLlama 모델의 응답입니다.\n\n줄바꿈이 잘 표시됩니다."
  );

  return (
    <div className="App">
      <h1>Llama 응답</h1>
      <div className="response-container">
        {response}
      </div>
    </div>
  );
}

export default App;
```

### App.css

```css
.App {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.response-container {
  white-space: pre-wrap;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
}
```

---

## 모바일 반응형 고려

```css
.response-container {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}
```

---

## 참고 자료

- [MDN - white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
- [React 공식 문서](https://react.dev/)
