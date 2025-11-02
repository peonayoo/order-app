# 커피 주문 앱 백엔드 서버

## 기술 스택
- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL 클라이언트)

## 설치 방법

1. 의존성 설치
```bash
npm install
```

2. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 데이터베이스 정보를 입력하세요.

```bash
cp .env.example .env
```

`.env` 파일 편집:
```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=coffee_order_db
DB_USER=your_username
DB_PASSWORD=your_password
NODE_ENV=development
```

3. 서버 실행

개발 모드 (파일 변경 시 자동 재시작):
```bash
npm run dev
```

프로덕션 모드:
```bash
npm start
```

## API 엔드포인트

### 메뉴 관련
- `GET /api/menus` - 메뉴 목록 조회
- `GET /api/menus/:menuId` - 메뉴 상세 조회
- `PATCH /api/menus/:menuId/stock` - 재고 수정

### 주문 관련
- `POST /api/orders` - 주문 생성
- `GET /api/orders` - 주문 목록 조회
- `GET /api/orders/:orderId` - 주문 상세 조회
- `PATCH /api/orders/:orderId/status` - 주문 상태 변경

### 기타
- `GET /` - 서버 상태 확인
- `GET /api/health` - API 헬스 체크

## 프로젝트 구조

```
server/
├── config/
│   └── database.js      # 데이터베이스 연결 설정
├── routes/
│   ├── index.js         # 기본 라우트
│   ├── menus.js         # 메뉴 관련 라우트
│   └── orders.js        # 주문 관련 라우트
├── controllers/         # 컨트롤러 (추후 구현)
├── models/             # 데이터 모델 (추후 구현)
├── middleware/         # 미들웨어 (추후 구현)
├── .env.example        # 환경 변수 예시
├── .gitignore
├── package.json
├── server.js           # 서버 진입점
└── README.md
```

## 데이터베이스 설정

PostgreSQL 데이터베이스를 생성하고, PRD.md의 6.5 섹션에 있는 스키마를 실행하세요.

