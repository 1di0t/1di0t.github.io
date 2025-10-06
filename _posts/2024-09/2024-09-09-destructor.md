---
layout: post
title: "소멸자-Destructor"
category: cpp
tags: [cpp, destructor, memory-management, object-oriented-programming, virtual]
excerpt: "C++에서 소멸자의 개념과 virtual 키워드의 중요성을 알아봅니다."
---

## 소멸자 개요

소멸자는 다음과 같은 특징을 가진 특수 메서드입니다:

- 객체가 소멸될 때 실행
- 객체가 범위를 벗어나거나 명시적으로 삭제될 때 호출

---

## 핵심 포인트

### virtual 키워드의 중요성

- `virtual` 키워드 없이 상속하면 **부모 클래스의 소멸자만 실행**
- `virtual` 키워드 추가 시 **서브클래스에서 슈퍼클래스로 순서대로 소멸자 실행**

---

## 예제 코드

```cpp
class Pokemon {
public:
    Flyable* flyable;

    Pokemon() {}
    Pokemon(Flyable* flyable) {
        this->flyable = flyable;
    }

    virtual ~Pokemon() {
        cout << "Pokemon destructor" << endl;
        delete flyable;
    }
};

class Pika : public Pokemon {
public:
    ~Pika() {
        cout << "Pika destructor" << endl;
    }
};
```

---

## 중요 개념

### virtual 키워드 사용 시

소멸자가 다음 순서로 호출됩니다:

1. **Subclass 소멸자** (Pika)
2. **Superclass 소멸자** (Pokemon)

이를 통해 적절한 메모리 정리 및 리소스 관리가 가능합니다.

---

## 실행 예제

```cpp
int main() {
    Pokemon* pokemon = new Pika();
    delete pokemon;
    // 출력:
    // Pika destructor
    // Pokemon destructor

    return 0;
}
```

---

## 베스트 프랙티스

1. 상속을 사용하는 베이스 클래스는 항상 **virtual 소멸자** 선언
2. 리소스를 할당하는 클래스는 반드시 **소멸자에서 해제**
3. 스마트 포인터 사용 권장

---

## 참고 자료

- [C++ Destructors](https://en.cppreference.com/w/cpp/language/destructor)
