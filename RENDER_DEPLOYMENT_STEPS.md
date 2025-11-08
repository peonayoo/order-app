# Render.com 배포 단계별 가이드

## 🎯 빠른 배포 체크리스트

### 배포 전 준비
- [x] CORS 설정 완료 (프런트엔드 URL 허용)
- [x] API URL 환경 변수 지원 추가
- [x] 데이터베이스 경로 환경 변수 지원 추가
- [ ] GitHub에 모든 코드 푸시 완료

---

## 📦 1단계: 백엔드 서버 배포

### 1-1. Render.com에서 Web Service 생성

1. **Render.com 대시보드 접속**
   - https://dashboard.render.com
   - 로그인 후 **"New +"** 버튼 클릭

2. **Web Service 선택**
   - **"Web Service"** 클릭

3. **GitHub 저장소 연결**
   - 저장소를 선택하거나 새로 연결
   - 저장소: `peonayoo/order-app` (또는 본인의 저장소)

### 1-2. 서비스 설정 입력

**기본 설정:**
- **Name**: `coffee-order-app-server`
- **Region**: `Singapore` (또는 가장 가까운 지역)
- **Branch**: `main`
- **Root Directory**: `server` ⚠️ 중요!

**빌드 및 시작 명령:**
- **Runtime**: `Node`
- **Build Command**: 
  ```bash
  npm install && npm run init-db
  ```
- **Start Command**: 
  ```bash
  npm start
  ```

### 1-3. 환경 변수 설정

**Environment Variables** 섹션에서 추가:

| Key | Value | 설명 |
|-----|-------|------|
| `NODE_ENV` | `production` | 프로덕션 환경 |
| `FRONTEND_URL` | `https://your-frontend.onrender.com` | 프런트엔드 URL (나중에 업데이트) |
| `DATABASE_PATH` | (비워두기) | 기본 경로 사용 |

⚠️ **참고**: `PORT`는 Render.com이 자동으로 제공하므로 설정하지 않습니다.

### 1-4. 고급 설정 (선택사항)

- **Auto-Deploy**: `Yes` (GitHub 푸시 시 자동 배포)
- **Health Check Path**: `/api/health`

### 1-5. 서비스 생성

- **"Create Web Service"** 클릭
- 빌드 및 배포 시작 (약 2-3분 소요)
- 배포 완료 후 URL 확인: `https://coffee-order-app-server.onrender.com`

---

## 🎨 2단계: 프런트엔드 배포

### 2-1. Render.com에서 Static Site 생성

1. **Render.com 대시보드 접속**
   - **"New +"** 버튼 클릭
   - **"Static Site"** 선택

2. **GitHub 저장소 연결**
   - 같은 저장소 선택: `peonayoo/order-app`

### 2-2. 빌드 설정 입력

**기본 설정:**
- **Name**: `coffee-order-app-ui`
- **Branch**: `main`
- **Root Directory**: `ui` ⚠️ 중요!

**빌드 명령:**
- **Build Command**: 
  ```bash
  npm install && npm run build
  ```
- **Publish Directory**: `dist` ⚠️ 중요!

### 2-3. 환경 변수 설정

**Environment Variables** 섹션에서 추가:

| Key | Value | 설명 |
|-----|-------|------|
| `VITE_API_URL` | `https://coffee-order-app-server.onrender.com` | 백엔드 API URL |

⚠️ **중요**: 백엔드 URL은 1단계에서 받은 URL을 사용합니다.

### 2-4. 서비스 생성

- **"Create Static Site"** 클릭
- 빌드 및 배포 시작 (약 1-2분 소요)
- 배포 완료 후 URL 확인: `https://coffee-order-app-ui.onrender.com`

---

## 🔄 3단계: 백엔드 환경 변수 업데이트

프런트엔드 URL을 받은 후, 백엔드의 `FRONTEND_URL` 환경 변수를 업데이트합니다.

1. **백엔드 서비스 설정 페이지로 이동**
2. **Environment Variables** 섹션에서 `FRONTEND_URL` 수정
3. **Value**: `https://coffee-order-app-ui.onrender.com` (실제 프런트엔드 URL)
4. **"Save Changes"** 클릭
5. 서비스 자동 재배포 시작

---

## ✅ 4단계: 배포 확인

### 4-1. 백엔드 확인

```bash
# 헬스 체크
curl https://coffee-order-app-server.onrender.com/api/health

# 메뉴 목록 확인
curl https://coffee-order-app-server.onrender.com/api/menus
```

### 4-2. 프런트엔드 확인

1. 브라우저에서 프런트엔드 URL 접속
2. 메뉴 목록이 표시되는지 확인
3. 주문하기 기능 테스트
4. 관리자 화면 테스트

---

## 🐛 문제 해결

### 빌드 실패

**문제**: Build Command 실행 실패
**해결**:
- 빌드 로그 확인
- `package.json`의 스크립트 확인
- Node.js 버전 확인 (Render.com은 최신 LTS 사용)

### API 연결 실패

**문제**: 프런트엔드에서 API 호출 실패
**해결**:
1. 브라우저 개발자 도구 콘솔 확인
2. `VITE_API_URL` 환경 변수 확인
3. CORS 설정 확인
4. 백엔드 URL이 올바른지 확인

### 데이터베이스 오류

**문제**: SQLite 파일 접근 오류
**해결**:
- Render.com 무료 플랜은 재시작 시 파일이 삭제될 수 있음
- 첫 배포 시 `init-db` 명령어가 실행되어야 함
- 필요시 수동으로 데이터베이스 초기화

---

## 📝 배포 후 작업

### 1. 커스텀 도메인 설정 (선택사항)

Render.com에서 커스텀 도메인을 연결할 수 있습니다.

### 2. SSL 인증서

Render.com은 자동으로 SSL 인증서를 제공합니다 (HTTPS).

### 3. 모니터링

- Render.com 대시보드에서 로그 확인
- 메트릭 모니터링 활용

---

## ⚠️ 중요 주의사항

### SQLite 제한사항

1. **무료 플랜**: 서비스가 15분간 비활성화되면 자동으로 sleep 모드로 전환
2. **데이터 손실**: Sleep 모드에서 깨어날 때 데이터베이스 파일이 초기화될 수 있음
3. **해결책**: 
   - Render.com Pro 플랜 사용 (항상 활성)
   - PostgreSQL로 마이그레이션 (권장)

### 비용

- **무료 플랜**: 
  - Web Service: Sleep 모드 (15분 비활성 시)
  - Static Site: 무료
- **Pro 플랜**: 월 $7부터 (항상 활성)

---

## 🚀 다음 단계

1. **PostgreSQL 마이그레이션** (장기적 권장)
2. **로깅 서비스 연동** (예: Sentry)
3. **CI/CD 파이프라인 구축**
4. **성능 모니터링 설정**

---

## 📞 지원

문제가 발생하면:
1. Render.com 문서: https://render.com/docs
2. 빌드 로그 확인
3. 서비스 로그 확인

