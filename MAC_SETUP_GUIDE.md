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
- PostgreSQL

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

### 4단계: PostgreSQL 설치 및 설정

#### Homebrew를 사용한 설치 (권장)
```bash
# Homebrew가 없다면 먼저 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# PostgreSQL 설치
brew install postgresql@15

# PostgreSQL 서비스 시작
brew services start postgresql@15
```

#### PostgreSQL 설정
```bash
# PostgreSQL에 접속
psql postgres

# 데이터베이스 생성
CREATE DATABASE coffee_order_db;

# 사용자 생성 (선택사항)
CREATE USER coffee_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE coffee_order_db TO coffee_user;

# 종료
\q
```

### 5단계: 환경 변수 설정

`server/.env` 파일 생성:
```bash
cd server
touch .env
```

`.env` 파일 내용:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=coffee_order_db
DB_USER=postgres
DB_PASSWORD=your_password
```

**⚠️ 주의**: 실제 사용하는 비밀번호로 변경하세요.

### 6단계: 데이터베이스 스키마 생성

PRD 문서(`docs/PRD.md`)의 `6.5 데이터베이스 스키마 예시` 섹션에 있는 SQL을 실행:

```bash
# PostgreSQL 접속
psql -d coffee_order_db

# 또는
psql -U postgres -d coffee_order_db
```

PostgreSQL 쉘에서:
```sql
-- PRD.md의 6.5 섹션에 있는 SQL DDL 복사하여 실행
-- Menus 테이블 생성
CREATE TABLE menus (...);
-- Options 테이블 생성
CREATE TABLE options (...);
-- Orders 테이블 생성
CREATE TABLE orders (...);
-- OrderItems 테이블 생성
CREATE TABLE order_items (...);

-- 초기 데이터 삽입 (PRD.md의 6.6 섹션 참고)
INSERT INTO menus ...;
INSERT INTO options ...;
```

### 7단계: 개발 서버 실행

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
- [ ] PostgreSQL 설치 확인 (`psql --version`)
- [ ] 데이터베이스 생성 완료
- [ ] `.env` 파일 생성 및 설정
- [ ] 데이터베이스 스키마 생성 완료
- [ ] 초기 데이터 삽입 완료
- [ ] 프런트엔드 서버 정상 실행
- [ ] 백엔드 서버 정상 실행
- [ ] API 연결 테스트

## 🐛 문제 해결

### PostgreSQL 연결 오류
```bash
# PostgreSQL 서비스 상태 확인
brew services list

# 서비스 재시작
brew services restart postgresql@15
```

### 포트 충돌
```bash
# 포트 사용 중인 프로세스 확인
lsof -i :3001  # 백엔드
lsof -i :5173  # 프런트엔드
lsof -i :5432  # PostgreSQL

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
2. 데이터베이스 연결 설정 (`server/config/database.js`)
3. 프런트엔드와 백엔드 연동

자세한 내용은 `docs/PRD.md`를 참고하세요.

