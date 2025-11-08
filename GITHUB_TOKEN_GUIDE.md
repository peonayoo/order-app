# GitHub Personal Access Token 생성 가이드

## 📍 경로 찾기 (단계별)

### 방법 1: 직접 링크 사용 (가장 빠름)

1. 브라우저에서 다음 링크로 바로 이동:
   **https://github.com/settings/tokens**

2. 또는 다음 링크에서 "Generate new token (classic)" 클릭:
   **https://github.com/settings/tokens?type=beta**

### 방법 2: 수동으로 찾기

#### 1단계: GitHub 프로필 아이콘 클릭
- GitHub 웹사이트 우측 상단에 있는 **프로필 사진** 클릭
- 또는 우측 상단의 **사람 아이콘** 클릭

#### 2단계: Settings 메뉴 선택
- 드롭다운 메뉴에서 **"Settings"** 클릭
- 또는 직접 링크: https://github.com/settings

#### 3단계: 왼쪽 사이드바에서 Developer settings 찾기
- 왼쪽 사이드바를 **맨 아래로 스크롤**
- **"Developer settings"** 클릭 (맨 아래에 있음)
- 또는 직접 링크: https://github.com/settings/apps

#### 4단계: Personal access tokens 선택
- 왼쪽 메뉴에서 **"Personal access tokens"** 클릭
- 그 다음 **"Tokens (classic)"** 클릭
- 또는 직접 링크: https://github.com/settings/tokens

#### 5단계: 새 토큰 생성
- **"Generate new token"** 버튼 클릭
- **"Generate new token (classic)"** 선택

---

## 🔑 토큰 생성 설정

### 1. Note (설명)
- 예: `order-app-push` 또는 `Git Push Token`
- 나중에 이 토큰을 기억하기 위한 설명

### 2. Expiration (만료일)
- `90 days` 또는 `No expiration` 선택
- 무료 계정은 `No expiration` 권장

### 3. Select scopes (권한 선택)
- ✅ **repo** 체크박스 선택
  - 이렇게 하면 하위 항목들이 자동으로 선택됩니다:
    - repo:status
    - repo_deployment
    - public_repo
    - repo:invite
    - security_events

### 4. Generate token 클릭
- 맨 아래로 스크롤하여 **"Generate token"** 버튼 클릭

### 5. 토큰 복사 (중요!)
- 생성된 토큰이 화면에 표시됩니다
- 토큰은 `ghp_`로 시작하는 긴 문자열입니다
- ⚠️ **이 페이지를 벗어나면 다시 볼 수 없습니다!**
- 토큰을 복사하여 안전한 곳에 저장하세요

---

## 💡 빠른 링크 모음

- **Settings 메인**: https://github.com/settings
- **Developer settings**: https://github.com/settings/apps
- **Personal access tokens**: https://github.com/settings/tokens
- **토큰 생성 (classic)**: https://github.com/settings/tokens/new

---

## 🚀 토큰 사용하기

토큰을 생성한 후:

```bash
cd "/Users/peona/Documents/Cursor/Cursor Project/order-app"
git push origin main
```

프롬프트가 나타나면:
- **Username**: `peonayoo` (본인의 GitHub 사용자명)
- **Password**: 생성한 Personal Access Token 붙여넣기

---

## 🔒 보안 주의사항

1. **토큰을 절대 공유하지 마세요**
2. **토큰을 코드나 공개 장소에 올리지 마세요**
3. **토큰이 유출되면 즉시 GitHub에서 삭제하세요**
4. **토큰은 비밀번호처럼 다루세요**

---

## ❓ 문제 해결

### "Developer settings"를 찾을 수 없어요
- Settings 페이지에서 왼쪽 사이드바를 **맨 아래로 스크롤**하세요
- 또는 직접 링크 사용: https://github.com/settings/apps

### "Personal access tokens" 메뉴가 없어요
- GitHub 계정이 확인되지 않았을 수 있습니다
- 이메일 인증을 완료하세요

### 토큰을 잃어버렸어요
- 기존 토큰을 삭제하고 새로 생성하세요
- Settings → Developer settings → Personal access tokens → 기존 토큰 삭제


