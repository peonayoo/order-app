# Render.com 무료 플랜 제한사항

## ⚠️ 무료 플랜의 주요 제한사항

### 1. Sleep 모드 (Spin Down)

**메시지:**
> "Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more."

**의미:**
- 서비스가 **15분간 비활성화**되면 자동으로 sleep 모드로 전환됩니다
- Sleep 모드에서 깨어날 때 **50초 이상** 걸릴 수 있습니다
- 첫 요청이 느릴 수 있습니다

### 2. SQLite 데이터베이스 제한

- Sleep 모드에서 깨어날 때 **데이터베이스 파일이 초기화**될 수 있습니다
- 데이터 손실 위험이 있습니다

---

## 💡 해결 방법

### 옵션 1: Pro 플랜 사용 (권장)

**비용**: $7/월 (Web Service 1개)

**장점:**
- ✅ 항상 활성 상태 (Sleep 모드 없음)
- ✅ 즉시 응답 (50초 지연 없음)
- ✅ 안정적인 데이터 저장
- ✅ 더 많은 리소스

**업그레이드 방법:**
1. Render.com 대시보드에서 서비스 선택
2. **"Settings"** 탭 클릭
3. **"Plan"** 섹션에서 **"Starter"** 선택
4. 결제 정보 입력

### 옵션 2: 무료 플랜 유지 (제한적)

**현재 상태:**
- 첫 요청이 느릴 수 있음 (50초 지연)
- 15분 비활성 시 sleep 모드
- 데이터 손실 위험

**개선 방법:**
- **Uptime Robot** 같은 무료 모니터링 서비스 사용
- 5분마다 헬스 체크 요청으로 서비스를 활성 상태로 유지

---

## 🔄 Sleep 모드 대응 방법

### 1. Uptime Robot 설정 (무료)

1. https://uptimerobot.com 에서 계정 생성
2. **"Add New Monitor"** 클릭
3. 설정:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Coffee Order App
   - **URL**: `https://coffee-order-app-server.onrender.com/api/health`
   - **Monitoring Interval**: 5 minutes
4. **"Create Monitor"** 클릭

이렇게 하면 5분마다 요청이 가서 서비스가 sleep 모드로 전환되지 않습니다.

### 2. Keep-Alive 스크립트 (선택사항)

간단한 스크립트로 주기적으로 요청 보내기:
```bash
# 5분마다 헬스 체크
while true; do
  curl https://coffee-order-app-server.onrender.com/api/health
  sleep 300  # 5분
done
```

---

## 📊 무료 vs Pro 플랜 비교

| 항목 | 무료 플랜 | Pro 플랜 ($7/월) |
|------|----------|-----------------|
| **Sleep 모드** | 15분 비활성 시 | 없음 (항상 활성) |
| **첫 요청 지연** | 50초 이상 | 없음 (즉시) |
| **데이터 저장** | 불안정 | 안정적 |
| **리소스** | 제한적 | 더 많음 |

---

## 🎯 권장사항

### 개발/테스트 단계
- 무료 플랜 사용 가능
- Uptime Robot으로 sleep 모드 방지

### 프로덕션 환경
- **Pro 플랜 사용 권장**
- 안정적인 서비스 제공
- 데이터 손실 방지

---

## ⚠️ 현재 상태

현재 메시지는 **정상적인 무료 플랜 경고**입니다.

**의미:**
- 서비스는 정상 작동합니다
- 다만 15분 비활성 시 sleep 모드로 전환됩니다
- 첫 요청이 느릴 수 있습니다

**해결:**
- Uptime Robot 설정 (무료)
- 또는 Pro 플랜 업그레이드 ($7/월)

