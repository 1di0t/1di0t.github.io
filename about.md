---
layout: default
title: About
permalink: /about/
---

# About AutoBlog

AutoBlog은 옵시디언으로 작성하고, Claude로 정리하고, Cloudflare로 발행하는 **95% 자동화 블로그 시스템**입니다.

## 만든 이유

GitHub Pages에 블로그를 운영하면서 느낀 불편함들:
- 모바일에서 작성하기 어려움
- 매번 수동으로 커밋/푸시 해야 함
- 러프한 메모를 정리하는데 시간이 오래 걸림

이 모든 것을 자동화하고 싶었습니다.

## 핵심 아이디어

**"메모는 언제 어디서나, 정리는 AI가, 배포는 자동으로"**

1. **모든 기기에서 작성**: iOS, Windows, Mac, Ubuntu 어디서나 옵시디언으로 작성
2. **자동 동기화**: Dropbox로 5분마다 모든 기기 동기화
3. **AI 자동 정리**: Claude Desktop (MCP)으로 러프한 메모를 블로그 포스트로 변환
4. **자동 배포**: Git 커밋 → Cloudflare Pages로 자동 배포

## 기술 스택

- **작성**: [Obsidian](https://obsidian.md/)
- **동기화**: [Remotely Save](https://github.com/remotely-save/remotely-save) + Dropbox
- **AI 정리**: [Claude Desktop](https://claude.ai/download) + [MCP](https://docs.anthropic.com/claude/docs/model-context-protocol)
- **버전 관리**: [Obsidian Git](https://github.com/Vinzent03/obsidian-git)
- **정적 사이트**: [Jekyll](https://jekyllrb.com/)
- **호스팅**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 비용

**월 0원** - 완전 무료로 운영

| 항목 | 서비스 | 월 비용 |
|------|--------|---------|
| 작성 | Obsidian | 0원 |
| 동기화 | Dropbox Free (2GB) | 0원 |
| 정리 | Claude Desktop (MCP) | 0원 |
| 저장소 | GitHub | 0원 |
| 호스팅 | Cloudflare Pages | 0원 |

## 자동화 비율

**95% 자동화**

- ✅ 모든 기기 동기화 (자동)
- ✅ Git 커밋/푸시 (자동)
- ✅ Jekyll 빌드 (자동)
- ✅ Cloudflare 배포 (자동)
- ⚠️ Claude 정리 명령 (수동 1회)

## 일반적인 워크플로우

### 출근길 (iOS)
```
지하철에서 iOS 옵시디언 열기
→ 새로운 아이디어 러프하게 메모
→ 저장 (5분 후 자동 동기화)
```

### 퇴근 후 (PC)
```
PC 옵시디언 열기 (자동으로 iOS 메모 동기화됨)
→ Claude Desktop 열기 (Alt+Space)
→ "최근 노트 'XXX' 블로그 포스트로 정리해줘" 입력
→ "/save _posts/2025-10-18-제목.md로 저장" 입력
→ 10분 후 자동 커밋 → 자동 배포 완료!
```

**수동 작업**: Claude 명령 2번만 입력 (나머지 전부 자동)

## GitHub Pages와의 비교

| 항목 | GitHub Pages | AutoBlog |
|------|--------------|----------|
| 작성 | PC 로컬만 | 모든 기기 |
| 동기화 | 수동 git push | 자동 (5분마다) |
| 정리 | 수동 | Claude MCP |
| 커밋 | 수동 | 자동 (10분마다) |
| 속도 | 보통 | 빠름 (300+ CDN) |
| Bandwidth | 100GB/월 | 무제한 |
| 자동화 | 30% | 95% |

## 완전 자동화 옵션

GitHub Actions를 사용하면 **100% 자동화**도 가능합니다:
- `_drafts` 폴더에 저장하면 자동으로 정리 후 발행
- 비용: 월 300원 (Claude API 사용)

## 오픈소스

이 프로젝트는 MIT 라이선스로 공개되어 있습니다.

- GitHub: https://github.com/1di0t/autoblog
- 이슈/제안: https://github.com/1di0t/autoblog/issues

## 시작하기

AutoBlog를 직접 사용해보고 싶으신가요?

1. [SETUP.md](https://github.com/1di0t/autoblog/blob/main/SETUP.md) - 상세 설치 가이드
2. [Plan.md](https://github.com/1di0t/autoblog/blob/main/Plan.md) - 전체 구현 계획
3. [README.md](https://github.com/1di0t/autoblog/blob/main/README.md) - 빠른 시작

---

**Made with ❤️ by 1di0t**

*"The best blog is the one you actually write."*
