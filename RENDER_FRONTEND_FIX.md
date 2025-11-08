# Render.com 프런트엔드 "Not Found" 오류 해결

## 🔍 문제 원인

프런트엔드에서 "Not Found"가 나오는 주요 원인:

1. **Publish Directory 설정 오류**
   - Root Directory가 `ui`로 설정된 경우
   - Publish Directory는 `dist` 또는 `ui/dist`로 설정해야 함

2. **빌드 실패**
   - 빌드 로그에서 에러 확인 필요

3. **빌드된 파일이 없음**
   - `dist` 디렉토리가 생성되지 않음

---

## ✅ 해결 방법

### 방법 1: Publish Directory 수정 (가장 가능성 높음)

Render.com Static Site 설정에서:

**현재 설정 확인:**
- Root Directory: `ui`
- Publish Directory: `dist` 또는 `ui/dist`

**수정 방법:**
1. Render.com 대시보드에서 Static Site 서비스 클릭
2. **"Settings"** 탭 클릭
3. **"Publish Directory"** 확인
4. 다음 중 하나로 설정:
   - `dist` (Root Directory가 `ui`인 경우)
   - 또는 `ui/dist` (Root Directory가 빈 값인 경우)

**권장 설정:**
- Root Directory: `ui`
- Publish Directory: `dist`

### 방법 2: 빌드 로그 확인

1. Render.com 대시보드에서 Static Site 서비스 클릭
2. **"Logs"** 탭 클릭
3. 빌드 로그 확인:
   - "Build completed successfully" 메시지 확인
   - 에러 메시지가 있는지 확인

### 방법 3: 재배포

설정을 수정한 후:
1. **"Manual Deploy"** → **"Deploy latest commit"** 클릭
2. 또는 GitHub에 새로운 커밋 푸시 (Auto-Deploy 활성화된 경우)

---

## 📋 정확한 설정 값

### Static Site 설정 체크리스트

- [ ] **Name**: `coffee-order-app-ui`
- [ ] **Branch**: `main`
- [ ] **Root Directory**: `ui` ⚠️ 중요!
- [ ] **Build Command**: `npm install && npm run build`
- [ ] **Publish Directory**: `dist` ⚠️ 중요!

### 환경 변수

- [ ] **VITE_API_URL**: `https://coffee-order-app-server.onrender.com`

---

## 🐛 일반적인 오류

### "Publish Directory" 오류

**증상**: Not Found 또는 빈 페이지

**원인**: Publish Directory가 잘못 설정됨

**해결**: 
- Root Directory가 `ui`이면 Publish Directory는 `dist`
- Root Directory가 빈 값이면 Publish Directory는 `ui/dist`

### 빌드 실패

**증상**: 빌드 로그에 에러 메시지

**원인**: 
- 의존성 설치 실패
- 빌드 스크립트 오류

**해결**:
- 로그에서 에러 메시지 확인
- 로컬에서 `npm run build` 테스트

---

## 🔧 빠른 수정 방법

1. **Render.com 대시보드 접속**
2. **Static Site 서비스 클릭**
3. **"Settings" 탭 클릭**
4. **"Publish Directory" 확인 및 수정**
5. **"Save Changes" 클릭**
6. **"Manual Deploy" → "Deploy latest commit" 클릭**

---

## ✅ 확인 방법

수정 후:
1. 브라우저에서 프런트엔드 URL 접속
2. 페이지가 정상적으로 로드되는지 확인
3. 브라우저 개발자 도구(F12)에서 콘솔 에러 확인

