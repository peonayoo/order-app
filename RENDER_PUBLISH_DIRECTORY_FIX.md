# Render.com Publish Directory 설정 해결 방법

## 🔍 문제 상황

Render.com에서 Publish Directory에 `ui/`가 기본으로 박혀있어서 삭제가 안 되는 경우

## ✅ 해결 방법

### 방법 1: Root Directory를 빈 값으로 변경 (권장)

1. **Render.com 대시보드에서 Static Site 서비스 클릭**
2. **"Settings" 탭 클릭**
3. **"Root Directory"를 빈 값으로 변경**
   - 현재: `ui`
   - 변경: (비워두기)
4. **"Publish Directory"를 `ui/dist`로 설정**
   - `ui/` 부분은 그대로 두고
   - 뒤에 `dist` 추가: `ui/dist`
5. **"Save Changes" 클릭**
6. **"Manual Deploy" → "Deploy latest commit" 클릭**

### 방법 2: Publish Directory에 `dist`만 입력

1. **"Publish Directory" 필드에서**
2. **`ui/` 뒤에 `dist`만 입력**
   - 결과: `ui/dist`
3. **"Save Changes" 클릭**

### 방법 3: Root Directory를 프로젝트 루트로 변경

1. **"Root Directory"를 빈 값으로 변경**
2. **"Publish Directory"를 `ui/dist`로 설정**
3. **"Build Command"를 수정:**
   ```bash
   cd ui && npm install && npm run build
   ```

---

## 📋 권장 설정 (방법 1)

### Static Site 설정

| 항목 | 값 |
|------|-----|
| **Root Directory** | (비워두기) |
| **Build Command** | `cd ui && npm install && npm run build` |
| **Publish Directory** | `ui/dist` |

또는

| 항목 | 값 |
|------|-----|
| **Root Directory** | `ui` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` (ui/는 자동으로 붙음) |

---

## 🔧 단계별 수정 방법

### 옵션 A: Root Directory 비우기

1. **Settings 페이지로 이동**
2. **"Root Directory" 필드 찾기**
3. **값을 삭제 (비워두기)**
4. **"Publish Directory"를 `ui/dist`로 설정**
5. **"Build Command"를 수정:**
   ```
   cd ui && npm install && npm run build
   ```
6. **저장 및 재배포**

### 옵션 B: Publish Directory만 수정

1. **"Publish Directory" 필드에서**
2. **`ui/` 뒤에 커서를 두고**
3. **`dist` 입력**
4. **최종 값: `ui/dist`**
5. **저장 및 재배포**

---

## ✅ 확인 방법

설정 수정 후:
1. **"Manual Deploy" 클릭**
2. **빌드 로그 확인**
3. **"Build completed successfully" 메시지 확인**
4. **프런트엔드 URL 접속하여 페이지 확인**

---

## 💡 참고

Render.com의 Static Site는:
- Root Directory가 설정되면, Publish Directory는 상대 경로로 해석됩니다
- Root Directory가 `ui`이면, Publish Directory는 `ui` 기준으로 상대 경로입니다
- 따라서 `dist`만 입력하면 `ui/dist`로 해석됩니다

