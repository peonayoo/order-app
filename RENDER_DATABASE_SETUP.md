# Render.com 데이터베이스 설정 가이드

## 🎯 선택지: SQLite vs PostgreSQL

### 현재 상황
- 프로젝트는 SQLite를 사용 중
- Render.com에서는 두 가지 옵션이 있습니다

---

## 옵션 1: PostgreSQL 사용 (권장) ⭐

Render.com의 PostgreSQL 서비스를 사용하는 것이 가장 안정적입니다.

### 1단계: PostgreSQL 데이터베이스 생성

1. **Render.com 대시보드에서 "Add new" 클릭**
2. **"Postgres" 선택** (데이터베이스 아이콘)
3. **설정 입력:**
   - **Name**: `coffee-order-db` (원하는 이름)
   - **Database**: `coffee_order_db` (자동 생성됨)
   - **User**: 자동 생성됨
   - **Region**: `Singapore` (또는 가장 가까운 지역)
   - **PostgreSQL Version**: `15` (또는 최신 버전)
   - **Plan**: `Free` (무료 플랜) 또는 `Starter` ($7/월)

4. **"Create Database" 클릭**
5. **생성 완료 후 연결 정보 확인:**
   - **Internal Database URL**: 다른 Render 서비스에서 사용
   - **External Database URL**: 외부에서 접속 시 사용
   - **Host, Port, Database, User, Password** 정보 확인

### 2단계: 환경 변수 설정

PostgreSQL 연결 정보를 환경 변수로 설정합니다.

**백엔드 Web Service의 Environment Variables에 추가:**

| Key | Value | 설명 |
|-----|-------|------|
| `DB_HOST` | PostgreSQL 호스트 주소 | Internal Database URL에서 추출 |
| `DB_PORT` | `5432` | PostgreSQL 기본 포트 |
| `DB_NAME` | `coffee_order_db` | 데이터베이스 이름 |
| `DB_USER` | PostgreSQL 사용자명 | Internal Database URL에서 추출 |
| `DB_PASSWORD` | PostgreSQL 비밀번호 | Internal Database URL에서 추출 |

**Internal Database URL 형식:**
```
postgres://user:password@host:5432/database
```

이 URL을 파싱하여 각 환경 변수에 설정하세요.

### 3단계: 코드 수정 필요

PostgreSQL을 사용하려면 코드를 수정해야 합니다:
- `better-sqlite3` → `pg` 패키지로 변경
- SQL 쿼리 문법 조정 (SQLite와 PostgreSQL 차이)

---

## 옵션 2: SQLite 계속 사용 (간단하지만 제한적)

SQLite를 계속 사용할 수도 있지만, Render.com에서는 제한이 있습니다.

### 제한사항
- ❌ 무료 플랜: 서비스가 sleep 모드로 전환되면 데이터베이스 파일이 삭제될 수 있음
- ❌ 여러 인스턴스에서 공유 불가
- ❌ 영구 저장소가 보장되지 않음

### 설정 방법
1. **"Add new" → "Web Service" 선택** (데이터베이스 서비스가 아님)
2. 백엔드 서버 배포 시 SQLite 파일이 함께 배포됨
3. 별도의 데이터베이스 서비스 생성 불필요

---

## 💡 권장사항

### 프로덕션 환경: PostgreSQL 사용 ⭐

**이유:**
- ✅ 안정적인 데이터 저장
- ✅ 여러 인스턴스에서 공유 가능
- ✅ Render.com에서 완전 지원
- ✅ 무료 플랜 제공

**필요한 작업:**
1. PostgreSQL 서비스 생성
2. 코드를 PostgreSQL용으로 수정
3. 환경 변수 설정

### 개발/테스트: SQLite 유지

**이유:**
- ✅ 코드 수정 최소화
- ✅ 빠른 배포
- ⚠️ 단, 데이터 손실 위험 있음

---

## 🚀 빠른 시작: PostgreSQL 선택 시

1. **"Add new" → "Postgres" 클릭**
2. 이름 입력 후 생성
3. 연결 정보 복사
4. 백엔드 서비스의 환경 변수에 추가
5. 코드 수정 (SQLite → PostgreSQL)

---

## 📝 다음 단계

PostgreSQL을 선택하시면, 코드를 PostgreSQL용으로 수정하는 작업을 도와드리겠습니다.

어떤 옵션을 선택하시겠습니까?
1. PostgreSQL 사용 (권장) - 코드 수정 필요
2. SQLite 계속 사용 - 제한적이지만 빠름

