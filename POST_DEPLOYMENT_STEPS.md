# 배포 후 다음 단계 가이드

## ✅ 1단계: 백엔드 서버 확인

### 1-1. 서비스 상태 확인
1. Render.com 대시보드에서 배포한 서비스 확인
2. 상태가 **"Live"** 또는 **"Running"**인지 확인
3. 서비스 URL 확인 (예: `https://coffee-order-app-server.onrender.com`)

### 1-2. API 동작 테스트

브라우저나 터미널에서 테스트:

**기본 엔드포인트:**
```
https://your-backend-url.onrender.com/
```
응답: `{"message":"커피 주문 앱 API 서버","version":"1.0.0"}`

**헬스 체크:**
```
https://your-backend-url.onrender.com/api/health
```

**메뉴 목록:**
```
https://your-backend-url.onrender.com/api/menus
```

### 1-3. 빌드 로그 확인
- Render.com 대시보드에서 **"Logs"** 탭 클릭
- "데이터베이스 초기화가 완료되었습니다" 메시지 확인
- 에러가 없는지 확인

---

## 🎨 2단계: 프런트엔드 배포

### 2-1. Static Site 생성

1. **Render.com 대시보드에서 "New +" 클릭**
2. **"Static Site" 선택**

### 2-2. GitHub 저장소 연결
- 같은 저장소 선택: `peonayoo/order-app`
- 또는 이미 연결되어 있다면 선택

### 2-3. 프런트엔드 설정

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

### 2-4. 환경 변수 설정

**Environment Variables** 섹션에서 추가:

| Key | Value | 설명 |
|-----|-------|------|
| `VITE_API_URL` | `https://coffee-order-app-server.onrender.com` | 백엔드 API URL |

⚠️ **중요**: 백엔드 URL은 1단계에서 확인한 실제 URL을 사용하세요!

### 2-5. Static Site 생성
- **"Create Static Site"** 클릭
- 빌드 및 배포 시작 (약 1-2분 소요)

---

## 🔄 3단계: 백엔드 환경 변수 업데이트

프런트엔드 URL을 받은 후, 백엔드의 CORS 설정을 업데이트합니다.

### 3-1. 백엔드 서비스 설정 페이지로 이동
1. Render.com 대시보드에서 백엔드 서비스 클릭
2. **"Environment"** 탭 클릭

### 3-2. FRONTEND_URL 업데이트
1. `FRONTEND_URL` 환경 변수 찾기
2. **Value**를 프런트엔드 URL로 변경:
   ```
   https://coffee-order-app-ui.onrender.com
   ```
3. **"Save Changes"** 클릭
4. 서비스가 자동으로 재배포됩니다

---

## ✅ 4단계: 전체 시스템 테스트

### 4-1. 프런트엔드 접속
1. 브라우저에서 프런트엔드 URL 접속
2. 메뉴 목록이 표시되는지 확인

### 4-2. 기능 테스트

**주문하기 페이지:**
- [ ] 메뉴 목록이 표시되는가?
- [ ] 메뉴를 장바구니에 추가할 수 있는가?
- [ ] 주문하기 버튼이 작동하는가?
- [ ] 주문이 성공적으로 생성되는가?

**관리자 페이지:**
- [ ] 주문 현황이 표시되는가?
- [ ] 재고 관리가 작동하는가?
- [ ] 주문 상태 변경이 작동하는가?

### 4-3. 브라우저 개발자 도구 확인
- **F12** 또는 **우클릭 → 검사** 클릭
- **Console** 탭에서 에러 확인
- **Network** 탭에서 API 호출 확인

---

## 🐛 문제 해결

### 백엔드 API가 응답하지 않음
1. Render.com 대시보드에서 서비스 상태 확인
2. 로그에서 에러 메시지 확인
3. 환경 변수 확인

### 프런트엔드에서 API 호출 실패
1. 브라우저 콘솔에서 에러 확인
2. `VITE_API_URL` 환경 변수 확인
3. CORS 에러인지 확인 (백엔드의 `FRONTEND_URL` 확인)

### 데이터베이스 오류
1. 빌드 로그에서 `npm run init-db` 실행 확인
2. "데이터베이스 초기화가 완료되었습니다" 메시지 확인
3. 필요시 수동으로 데이터베이스 초기화

---

## 📝 체크리스트

### 백엔드 확인
- [ ] 서비스가 "Live" 상태
- [ ] API 엔드포인트 응답 확인
- [ ] 데이터베이스 초기화 확인
- [ ] 로그에 에러 없음

### 프런트엔드 확인
- [ ] Static Site 배포 완료
- [ ] `VITE_API_URL` 환경 변수 설정
- [ ] 빌드 성공 확인

### 환경 변수 확인
- [ ] 백엔드: `NODE_ENV=production`
- [ ] 백엔드: `FRONTEND_URL` (프런트엔드 URL)
- [ ] 프런트엔드: `VITE_API_URL` (백엔드 URL)

### 기능 테스트
- [ ] 메뉴 조회 작동
- [ ] 주문 생성 작동
- [ ] 주문 목록 조회 작동
- [ ] 관리자 기능 작동

---

## 🎉 배포 완료!

모든 단계가 완료되면:
- ✅ 백엔드: `https://coffee-order-app-server.onrender.com`
- ✅ 프런트엔드: `https://coffee-order-app-ui.onrender.com`

이제 어디서든 접속 가능합니다!

