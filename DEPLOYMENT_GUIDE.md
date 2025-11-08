# Render.com 배포 가이드

이 문서는 커피 주문 앱을 Render.com에 배포하는 방법을 안내합니다.

## 📋 사전 준비

### 1. GitHub 저장소 확인
- 모든 코드가 GitHub에 푸시되어 있어야 합니다
- `.env` 파일은 `.gitignore`에 포함되어 있어야 합니다

### 2. Render.com 계정 생성
- https://render.com 에서 계정 생성
- GitHub 계정 연동

---

## 🚀 배포 순서

### 1단계: 백엔드 서버 배포

#### 1-1. 새 Web Service 생성
1. Render.com 대시보드에서 **"New +"** 클릭
2. **"Web Service"** 선택
3. GitHub 저장소 연결 및 선택

#### 1-2. 서비스 설정
- **Name**: `coffee-order-app-server` (또는 원하는 이름)
- **Region**: 가장 가까운 지역 선택 (예: Singapore)
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run init-db`
- **Start Command**: `npm start`

#### 1-3. 환경 변수 설정
**Environment Variables** 섹션에서 추가:
```
NODE_ENV=production
PORT=10000
```

⚠️ **중요**: Render.com은 자동으로 `PORT` 환경 변수를 제공하므로, 서버 코드에서 이를 사용해야 합니다.

#### 1-4. 고급 설정
- **Auto-Deploy**: `Yes` (GitHub 푸시 시 자동 배포)
- **Health Check Path**: `/api/health`

#### 1-5. 데이터베이스 파일 처리
SQLite는 파일 기반이므로 Render.com의 영구 디스크를 사용해야 합니다.

**방법 1: 영구 디스크 사용 (권장)**
- Render.com의 **Disk** 서비스를 사용하여 데이터베이스 파일 저장
- 또는 환경 변수로 데이터베이스 경로 설정

**방법 2: PostgreSQL로 마이그레이션 (장기적 권장)**
- Render.com의 PostgreSQL 서비스 사용
- 더 안정적이고 확장 가능

---

### 2단계: 프런트엔드 배포

#### 2-1. 새 Static Site 생성
1. Render.com 대시보드에서 **"New +"** 클릭
2. **"Static Site"** 선택
3. GitHub 저장소 연결 및 선택

#### 2-2. 빌드 설정
- **Name**: `coffee-order-app-ui`
- **Branch**: `main`
- **Root Directory**: `ui`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `ui/dist`

#### 2-3. 환경 변수 설정
프런트엔드에서 백엔드 API URL을 설정해야 합니다.

**방법 1: 빌드 시 환경 변수 사용**
`ui/vite.config.js` 수정:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'http://localhost:3001'
    )
  }
})
```

`ui/src/utils/api.js` 수정:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
```

**방법 2: Runtime 환경 변수 (더 나은 방법)**
Render.com Static Site는 환경 변수를 빌드 시에만 사용할 수 있으므로, 백엔드 URL을 하드코딩하거나 설정 파일로 관리해야 합니다.

---

### 3단계: 서버 코드 수정 (Render.com 호환)

#### 3-1. server.js 수정
Render.com은 자동으로 PORT를 제공하므로 확인:

```javascript
const PORT = process.env.PORT || 3001
```

#### 3-2. 데이터베이스 경로 수정
`server/config/database.js` 수정:

```javascript
// Render.com 환경에서는 /tmp 또는 영구 디스크 사용
const dbPath = process.env.DATABASE_PATH || join(__dirname, '..', 'database.sqlite')
```

#### 3-3. CORS 설정 확인
`server/server.js`에서 프런트엔드 도메인 허용:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
```

---

### 4단계: package.json 스크립트 확인

#### server/package.json
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "init-db": "node init-database.js"
  }
}
```

#### ui/package.json
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## ⚠️ 중요 사항

### SQLite 제한사항
1. **파일 기반**: 여러 인스턴스에서 공유 불가
2. **영구 저장**: Render.com의 무료 플랜은 재시작 시 파일이 삭제될 수 있음
3. **권장**: 프로덕션에서는 PostgreSQL 사용 권장

### 해결 방법
1. **Render.com PostgreSQL 사용** (권장)
   - Render.com에서 PostgreSQL 서비스 생성
   - `better-sqlite3` 대신 `pg` 패키지 사용
   - 데이터베이스 연결 정보를 환경 변수로 설정

2. **영구 디스크 사용**
   - Render.com Pro 플랜 필요
   - 데이터베이스 파일을 영구 디스크에 저장

---

## 🔧 배포 후 확인 사항

### 1. 백엔드 확인
```bash
curl https://your-backend.onrender.com/api/health
```

### 2. 프런트엔드 확인
- 브라우저에서 프런트엔드 URL 접속
- API 호출이 정상 작동하는지 확인

### 3. 데이터베이스 초기화
- 첫 배포 시 `init-db` 명령어가 실행되어야 함
- 또는 수동으로 데이터베이스 초기화 필요

---

## 📝 체크리스트

### 배포 전
- [ ] 모든 코드가 GitHub에 푸시됨
- [ ] `.env` 파일이 `.gitignore`에 포함됨
- [ ] `package.json`의 스크립트 확인
- [ ] CORS 설정 확인
- [ ] 환경 변수 목록 정리

### 배포 중
- [ ] 백엔드 Web Service 생성
- [ ] 프런트엔드 Static Site 생성
- [ ] 환경 변수 설정
- [ ] 빌드 로그 확인

### 배포 후
- [ ] 백엔드 API 동작 확인
- [ ] 프런트엔드 접속 확인
- [ ] 데이터베이스 초기화 확인
- [ ] 주문 생성 테스트
- [ ] 관리자 화면 테스트

---

## 🐛 문제 해결

### 빌드 실패
- 빌드 로그 확인
- `package.json`의 의존성 확인
- Node.js 버전 확인

### API 연결 실패
- CORS 설정 확인
- 환경 변수 확인
- 백엔드 URL 확인

### 데이터베이스 오류
- 데이터베이스 파일 경로 확인
- 초기화 스크립트 실행 확인
- 권한 문제 확인

---

## 💡 추가 권장사항

1. **PostgreSQL 마이그레이션**: 프로덕션 환경에서는 PostgreSQL 사용 권장
2. **환경 변수 관리**: 민감한 정보는 환경 변수로 관리
3. **로깅**: 에러 로깅 서비스 연동 (예: Sentry)
4. **모니터링**: Render.com의 모니터링 기능 활용
5. **백업**: 정기적인 데이터베이스 백업

