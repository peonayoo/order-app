# Mac에서 개발 환경 설정 가이드

이 문서는 Windows PC에서 작업한 프로젝트를 Mac에서 이어서 개발하기 위한 가이드입니다.

## 📋 사전 준비

### 1. GitHub에 코드 푸시 확인
Windows PC에서 다음 명령어로 푸시했는지 확인:
```bash
git push origin main
```

### 2. 필수 도구 설치 확인
- Node.js (v18 이상)
- npm 또는 yarn
- Git

## 🚀 Mac에서 프로젝트 설정

### 1단계: 프로젝트 클론

```bash
# 원하는 위치로 이동
cd ~/projects  # 또는 원하는 디렉토리

# GitHub에서 클론
git clone <repository-url>
cd order-app
```

### 2단계: 프런트엔드 설정

```bash
cd ui
npm install
```

### 3단계: 백엔드 설정

```bash
cd ../server
npm install
```

### 4단계: 환경 변수 설정

`server/.env` 파일 생성:
```bash
cd server
touch .env
```

`.env` 파일 내용:
```env
PORT=3001
NODE_ENV=development
```

### 5단계: 개발 서버 실행

#### 프런트엔드
```bash
cd ui
npm run dev
```
→ `http://localhost:5173`에서 확인

#### 백엔드
```bash
cd server
npm run dev
```
→ `http://localhost:3001`에서 확인

## ✅ 확인 체크리스트

- [ ] Node.js 설치 확인 (`node --version`)
- [ ] `.env` 파일 생성 및 설정
- [ ] 프런트엔드 서버 정상 실행
- [ ] 백엔드 서버 정상 실행

## 🐛 문제 해결

### 포트 충돌
```bash
# 포트 사용 중인 프로세스 확인
lsof -i :3001  # 백엔드
lsof -i :5173  # 프런트엔드

# 프로세스 종료 (PID 확인 후)
kill -9 <PID>
```

### 의존성 설치 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

## 📝 다음 단계

1. 백엔드 API 구현 (`server/routes/` 폴더의 파일 구현)
2. 프런트엔드와 백엔드 연동

자세한 내용은 `docs/PRD.md`를 참고하세요.

