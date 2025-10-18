---
layout: page
title: 2단계 학습 프레임워크
permalink: /learning-framework/
---

<div class="max-w-4xl mx-auto">
  <!-- Hero Section -->
  <div class="mb-8 md:mb-12 text-center">
    <h1 class="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      2단계 학습 프레임워크
    </h1>
    <p class="text-lg md:text-xl text-muted-foreground leading-relaxed">
      정보를 효과적으로 소비하고 소화하여 <strong>진짜 내 것</strong>으로 만드는 방법
    </p>
  </div>

  <!-- 핵심 개념 -->
  <div class="card mb-8">
    <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
      <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
      핵심 개념
    </h2>
    <p class="text-lg leading-relaxed mb-4">
      학습의 핵심은 <strong class="text-primary">얼마나 많은 정보를 소비하느냐가 아니라, 얼마나 많은 정보가 뇌에 남아 실제로 활용되느냐</strong>입니다.
    </p>
    <p class="text-muted-foreground">
      이 프레임워크는 정보를 두 단계로 나누어 체계적으로 처리합니다.
    </p>
  </div>

  <!-- 2단계 프로세스 -->
  <div class="grid md:grid-cols-2 gap-6 mb-12">
    <!-- 1단계: 소비 -->
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">📥</span>
        <h3 class="text-xl font-bold">1단계: 소비 (Consumption)</h3>
      </div>
      <p class="text-muted-foreground mb-4">
        문제 해결을 위한 정보를 적극적으로 수집하는 단계
      </p>
      <div class="space-y-2">
        <div class="bg-white dark:bg-background/50 rounded-lg p-3">
          <strong>C1. Color-bath Effect</strong>
          <p class="text-sm text-muted-foreground">해결하려는 문제를 명확히 정의</p>
        </div>
        <div class="bg-white dark:bg-background/50 rounded-lg p-3">
          <strong>C2. Curiosity</strong>
          <p class="text-sm text-muted-foreground">목차를 먼저 보고 궁금증 생성</p>
        </div>
        <div class="bg-white dark:bg-background/50 rounded-lg p-3">
          <strong>C3. Capture</strong>
          <p class="text-sm text-muted-foreground">유용한 정보를 놓치지 않고 수집</p>
        </div>
      </div>
    </div>

    <!-- 2단계: 소화 -->
    <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">🔄</span>
        <h3 class="text-xl font-bold">2단계: 소화 (Digestion)</h3>
      </div>
      <p class="text-muted-foreground mb-4">
        PACER 분류에 따라 정보를 내 지식으로 변환하는 단계
      </p>
      <div class="bg-white dark:bg-background/50 rounded-lg p-3">
        <p class="font-semibold mb-2">PACER 5가지 유형:</p>
        <ul class="space-y-1 text-sm text-muted-foreground">
          <li>🔨 <strong>Procedural</strong> - 연습 (Practice)</li>
          <li>🔗 <strong>Analogous</strong> - 비판 (Critique)</li>
          <li>💡 <strong>Conceptual</strong> - 구조화 (Structuring)</li>
          <li>📊 <strong>Evidence</strong> - 수집 & 활용</li>
          <li>📚 <strong>Reference</strong> - 간격 반복</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- PACER 타입 설명 -->
  <h2 class="text-2xl md:text-3xl font-bold mb-4">PACER 정보 분류</h2>

  <!-- PACER 타입 탭 -->
  <div class="mb-8">
    <div class="flex flex-wrap justify-center gap-2 md:gap-3 p-4 bg-muted/30 rounded-xl border border-border">
      {% assign pacer_types_for_tabs = site.data.learning_framework.pacer_types %}
      {% for pacer in pacer_types_for_tabs %}
      <a href="{{ '/pacer/' | append: pacer.id | append: '/' | relative_url }}"
         class="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg pacer-badge pacer-{{ pacer.id }} no-underline hover:scale-105 transition-all shadow-sm hover:shadow-md font-semibold text-sm">
        <span class="text-base md:text-lg">{{ pacer.symbol }}</span>
        <span class="hidden sm:inline">{{ pacer.name_kr }}</span>
        <span class="sm:hidden">{{ pacer.name_en }}</span>
      </a>
      {% endfor %}
    </div>
  </div>

  {% assign pacer_types = site.data.learning_framework.pacer_types %}

  <div class="space-y-6 mb-12">
    {% for pacer in pacer_types %}
    <a href="{{ '/pacer/' | append: pacer.id | append: '/' | relative_url }}" class="block no-underline group">
      <div class="card hover:shadow-2xl transition-all hover:border-primary cursor-pointer">
        <div class="flex items-start gap-4 mb-4">
          <span class="text-4xl flex-shrink-0">{{ pacer.symbol }}</span>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{{ pacer.name_kr }} ({{ pacer.name_en }})</h3>
              <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold pacer-badge pacer-{{ pacer.id }} group-hover:scale-105 transition-transform">
                포스트 보기 →
              </span>
            </div>
            <p class="text-muted-foreground mb-3">{{ pacer.description }}</p>

            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div class="bg-muted/50 rounded-lg p-3">
                <p class="font-semibold mb-2 text-foreground">📝 예시</p>
                <ul class="space-y-1 text-muted-foreground">
                  {% for example in pacer.examples %}
                  <li>• {{ example }}</li>
                  {% endfor %}
                </ul>
              </div>

              <div class="bg-primary/5 rounded-lg p-3 border border-primary/20">
                <p class="font-semibold mb-2 text-primary">💪 학습 전략: {{ pacer.strategy }}</p>
                <p class="text-muted-foreground">{{ pacer.strategy_description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
    {% endfor %}
  </div>

  <!-- 통계 -->
  <div class="card bg-gradient-to-br from-primary/5 to-secondary/5 mb-12">
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
      블로그 통계
    </h2>

    {% assign total_posts = site.posts | size %}
    {% assign procedural_posts = site.posts | where_exp: "post", "post.learning_framework.pacer_type == 'procedural' or post.learning_framework.pacer_types contains 'procedural'" %}
    {% assign conceptual_posts = site.posts | where_exp: "post", "post.learning_framework.pacer_type == 'conceptual' or post.learning_framework.pacer_types contains 'conceptual'" %}
    {% assign evidence_posts = site.posts | where_exp: "post", "post.learning_framework.pacer_type == 'evidence' or post.learning_framework.pacer_types contains 'evidence'" %}
    {% assign reference_posts = site.posts | where_exp: "post", "post.learning_framework.pacer_type == 'reference' or post.learning_framework.pacer_types contains 'reference'" %}
    {% assign analogous_posts = site.posts | where_exp: "post", "post.learning_framework.pacer_type == 'analogous' or post.learning_framework.pacer_types contains 'analogous'" %}

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-background rounded-lg p-4 text-center border border-border">
        <div class="text-3xl font-bold text-primary">{{ total_posts }}</div>
        <div class="text-sm text-muted-foreground mt-1">총 포스트</div>
      </div>

      <div class="bg-background rounded-lg p-4 text-center border border-border">
        <div class="text-3xl font-bold" style="color: #3498DB;">{{ procedural_posts | size }}</div>
        <div class="text-sm text-muted-foreground mt-1">🔨 절차형</div>
      </div>

      <div class="bg-background rounded-lg p-4 text-center border border-border">
        <div class="text-3xl font-bold" style="color: #F39C12;">{{ conceptual_posts | size }}</div>
        <div class="text-sm text-muted-foreground mt-1">💡 개념형</div>
      </div>

      <div class="bg-background rounded-lg p-4 text-center border border-border">
        <div class="text-3xl font-bold" style="color: #E74C3C;">{{ evidence_posts | size }}</div>
        <div class="text-sm text-muted-foreground mt-1">📊 근거형</div>
      </div>

      <div class="bg-background rounded-lg p-4 text-center border border-border">
        <div class="text-3xl font-bold" style="color: #1ABC9C;">{{ reference_posts | size }}</div>
        <div class="text-sm text-muted-foreground mt-1">📚 참고형</div>
      </div>

      <div class="bg-background rounded-lg p-4 text-center border border-border">
        <div class="text-3xl font-bold" style="color: #9B59B6;">{{ analogous_posts | size }}</div>
        <div class="text-sm text-muted-foreground mt-1">🔗 유사형</div>
      </div>
    </div>

    <p class="text-sm text-center text-muted-foreground">
      각 PACER 타입별 포스트를 확인하려면 위의 "포스트 보기" 버튼을 클릭하세요
    </p>
  </div>

  <!-- 효과적인 활용법 -->
  <div class="card mb-12">
    <h2 class="text-2xl font-bold mb-6">💪 효과적인 활용법</h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">1</span>
          포스트 읽기 전
        </h3>
        <ul class="space-y-2 ml-8 text-muted-foreground">
          <li>✓ 목차 확인으로 궁금증 생성</li>
          <li>✓ PACER 배지 확인으로 정보 유형 파악</li>
          <li>✓ 학습 전략 읽고 계획 세우기</li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">2</span>
          포스트 읽는 중
        </h3>
        <ul class="space-y-2 ml-8 text-muted-foreground">
          <li>🔨 <strong>Procedural</strong>: 코드를 직접 실행해보기</li>
          <li>💡 <strong>Conceptual</strong>: 개념 간 관계를 그림으로 그리기</li>
          <li>📊 <strong>Evidence</strong>: 자신의 경험과 비교하기</li>
          <li>📚 <strong>Reference</strong>: 북마크하거나 암기 카드 만들기</li>
          <li>🔗 <strong>Analogous</strong>: 비유가 적절한지 질문하기</li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">3</span>
          포스트 읽은 후
        </h3>
        <ul class="space-y-2 ml-8 text-muted-foreground">
          <li>✓ 즉시 적용: Procedural 포스트는 바로 실습</li>
          <li>✓ 재구성: Conceptual 포스트는 자신만의 정리</li>
          <li>✓ 수집: Evidence/Reference는 나중에 활용할 수 있게 보관</li>
          <li>✓ 간격 반복: 일정 시간 후 다시 복습</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- CTA -->
  <div class="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 md:p-8 border-2 border-primary/20">
    <h3 class="text-xl md:text-2xl font-bold mb-3">지금 바로 시작하세요!</h3>
    <p class="text-sm md:text-base text-muted-foreground">
      PACER 타입별로 분류된 포스트를 탐색하고, 효과적인 학습을 경험해보세요
    </p>
  </div>
</div>
