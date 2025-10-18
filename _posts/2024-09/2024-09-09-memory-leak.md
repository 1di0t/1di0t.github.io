---
layout: post
title: 메모리 누수-Memory Leak
category: C++
tags:
  - cpp
  - memory-management
  - memory-leak
  - pointer
  - debugging
excerpt: C++에서 메모리 누수를 방지하는 방법을 알아봅니다.
parent_category: study
learning_framework:
  stage: digestion
  pacer_type: procedural
---

## 개요

C++에서 메모리 누수는 생성한 객체들의 할당된 메모리를 적절히 삭제하지 않을 때 발생합니다.

---

## 메모리 누수 방지 예제

```cpp
int main() {
    Pika* pika = new Pika();
    pika->attack();
    delete pika;
    pika = nullptr;

    Pokemon* pika2 = new Pika();
    pika2->attack();
    delete pika2;
    pika2 = nullptr;

    return 0;
}
```

---

## 메모리 관리 핵심 포인트

### 1. delete 키워드 사용

객체를 삭제하여 메모리 해제

```cpp
delete pika;
```

### 2. nullptr 할당

포인터 변수에 `nullptr`을 할당하여 남은 주소값 제거

```cpp
pika = nullptr;
```

---

## 스마트 포인터 사용 (권장)

C++11 이후에는 스마트 포인터를 사용하여 자동 메모리 관리:

```cpp
#include <memory>

int main() {
    // unique_ptr 사용
    std::unique_ptr<Pika> pika = std::make_unique<Pika>();
    pika->attack();
    // 자동으로 메모리 해제

    // shared_ptr 사용
    std::shared_ptr<Pokemon> pika2 = std::make_shared<Pika>();
    pika2->attack();
    // 참조 카운트가 0이 되면 자동 해제

    return 0;
}
```

---

## 메모리 누수 탐지 도구

- **Valgrind**: Linux
- **AddressSanitizer**: GCC/Clang
- **Visual Studio Memory Profiler**: Windows

---

## 참고 자료

- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/)
