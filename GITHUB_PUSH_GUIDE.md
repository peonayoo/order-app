# GitHub 푸시 가이드 - Personal Access Token 사용

## 📋 Personal Access Token 생성하기

### 1단계: GitHub 웹사이트 접속
1. 브라우저에서 https://github.com 에 접속
2. 로그인합니다

### 2단계: Settings로 이동
1. 우측 상단 프로필 사진 클릭
2. 드롭다운 메뉴에서 **Settings** 클릭

### 3단계: Developer settings 접속
1. 왼쪽 사이드바 맨 아래로 스크롤
2. **Developer settings** 클릭

### 4단계: Personal access tokens 메뉴
1. 왼쪽 메뉴에서 **Personal access tokens** 클릭
2. **Tokens (classic)** 클릭

### 5단계: 새 토큰 생성
1. **Generate new token** 버튼 클릭
2. **Generate new token (classic)** 클릭

### 6단계: 토큰 설정
1. **Note** (설명): `order-app-push` 또는 원하는 이름 입력
2. **Expiration** (만료일): 원하는 기간 선택 (예: 90 days, No expiration)
3. **Select scopes** (권한 선택):
   - ✅ **repo** 체크박스 선택 (모든 하위 항목 자동 선택됨)
     - repo:status
     - repo_deployment
     - public_repo
     - repo:invite
     - security_events
4. 맨 아래로 스크롤하여 **Generate token** 버튼 클릭

### 7단계: 토큰 복사 (중요!)
1. 생성된 토큰이 화면에 표시됩니다
2. **⚠️ 이 페이지를 벗어나면 다시 볼 수 없습니다!**
3. 토큰을 복사하여 안전한 곳에 저장하세요
   - 예: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 🚀 푸시하기

### 방법 A: 명령어로 직접 입력

터미널에서 다음 명령어를 실행하세요:

```bash
cd "/Users/peona/Documents/Cursor/Cursor Project/order-app"
git push origin main
```

프롬프트가 나타나면:
- **Username**: GitHub 사용자명 입력 (예: `peonayoo`)
- **Password**: Personal Access Token 붙여넣기 (토큰이 비밀번호처럼 작동)

### 방법 B: Git Credential Helper 사용 (한 번만 입력)

토큰을 저장하여 다음부터 자동으로 사용:

```bash
# macOS Keychain에 저장
git config --global credential.helper osxkeychain

# 푸시 시도
git push origin main
```

첫 푸시 시:
- Username: GitHub 사용자명
- Password: Personal Access Token

이후부터는 자동으로 사용됩니다.

### 방법 C: URL에 토큰 포함 (임시)

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/peonayoo/order-app.git
git push origin main
```

⚠️ 이 방법은 보안상 권장하지 않습니다.

---

## ✅ 확인하기

푸시가 성공하면:

```bash
git status
```

다음과 같이 표시됩니다:
```
On branch main
Your branch is up to date with 'origin/main'.
```

GitHub 웹사이트에서도 확인할 수 있습니다:
https://github.com/peonayoo/order-app

---

## 🔒 보안 주의사항

1. **토큰을 절대 공유하지 마세요**
2. **토큰을 코드나 공개 장소에 올리지 마세요**
3. **토큰이 유출되면 즉시 GitHub에서 삭제하세요**
4. **토큰은 비밀번호처럼 다루세요**

---

## 🐛 문제 해결

### "fatal: could not read Username"
- 토큰이 올바르게 입력되었는지 확인
- 사용자명이 정확한지 확인

### "remote: Invalid username or password"
- 토큰이 만료되었을 수 있음 → 새 토큰 생성
- 토큰 권한에 `repo`가 포함되어 있는지 확인

### "Permission denied"
- 토큰에 `repo` 권한이 있는지 확인
- 저장소에 대한 접근 권한이 있는지 확인

