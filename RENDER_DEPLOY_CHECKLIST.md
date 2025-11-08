# Render.com 배포 전 체크리스트

## ✅ Deploy 버튼 클릭 전 확인사항

### 1. 기본 설정 확인

- [ ] **Name**: `coffee-order-app-server` (또는 원하는 이름)
- [ ] **Region**: `Singapore` 또는 가장 가까운 지역 선택
- [ ] **Branch**: `main` (또는 사용하는 브랜치)
- [ ] **Root Directory**: `server` ⚠️ **반드시 확인!**

### 2. 빌드 및 시작 명령 확인

- [ ] **Runtime**: `Node`
- [ ] **Build Command**: 
  ```bash
  npm install && npm run init-db
  ```
- [ ] **Start Command**: 
  ```bash
  npm start
  ```

### 3. 환경 변수 확인

**Environment Variables** 섹션에서 다음 변수들이 설정되어 있는지 확인:

- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL` (나중에 프런트엔드 URL로 업데이트 가능, 일단 비워두어도 됨)

### 4. 고급 설정 (선택사항)

- [ ] **Auto-Deploy**: `Yes` (GitHub 푸시 시 자동 배포)
- [ ] **Health Check Path**: `/api/health` (선택사항)

---

## 🚀 Deploy 버튼 클릭 후

1. **빌드 시작**: 약 2-3분 소요
2. **로그 확인**: 빌드 및 배포 로그를 실시간으로 확인 가능
3. **배포 완료**: 성공 시 서비스 URL이 표시됨
   - 예: `https://coffee-order-app-server.onrender.com`

---

## ⚠️ 주의사항

### Root Directory 확인
- **반드시 `server`로 설정되어 있어야 합니다**
- 잘못 설정하면 빌드 실패할 수 있습니다

### Build Command 확인
- `npm run init-db`가 포함되어 있어야 데이터베이스가 초기화됩니다
- 이 명령어가 없으면 데이터베이스가 생성되지 않습니다

---

## 🐛 문제 발생 시

### 빌드 실패
- 빌드 로그를 확인하세요
- `Root Directory`가 `server`인지 확인
- `package.json`이 `server/` 디렉토리에 있는지 확인

### 데이터베이스 오류
- `npm run init-db` 명령어가 실행되었는지 확인
- 빌드 로그에서 "데이터베이스 초기화가 완료되었습니다" 메시지 확인

---

## ✅ 모든 설정이 완료되었다면

**"Create Web Service"** 또는 **"Deploy"** 버튼을 클릭하세요!

