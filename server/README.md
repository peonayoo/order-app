# 커피 주문 앱 백엔드 서버

## 기술 스택
- Node.js
- Express.js
- SQLite (better-sqlite3)

## 설치 방법

1. 의존성 설치
```bash
npm install
```

2. 환경 변수 설정
`.env` 파일을 생성하고 서버 설정을 입력하세요.

`.env` 파일 편집:
```
PORT=3001
NODE_ENV=development
```

3. 데이터베이스 초기화
```bash
npm run init-db
```

또는 수동으로:
```bash
node init-database.js
```

4. 서버 실행

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
│   └── database.js      # SQLite 데이터베이스 연결 설정
├── routes/
│   ├── index.js         # 기본 라우트
│   ├── menus.js         # 메뉴 관련 라우트
│   └── orders.js        # 주문 관련 라우트
├── controllers/         # 컨트롤러 (추후 구현)
├── models/             # 데이터 모델 (추후 구현)
├── middleware/         # 미들웨어 (추후 구현)
├── database.sqlite     # SQLite 데이터베이스 파일 (자동 생성)
├── init-database.js    # 데이터베이스 초기화 스크립트
├── test-database.js    # 데이터베이스 연결 테스트 스크립트
├── .gitignore
├── package.json
├── server.js           # 서버 진입점
└── README.md
```

## 데이터베이스 관리

### 데이터베이스 초기화
```bash
npm run init-db
```

### 데이터베이스 연결 테스트
```bash
npm run test-db
```

### 데이터베이스 파일
- 위치: `server/database.sqlite`
- SQLite는 파일 기반 데이터베이스입니다
- 백업하려면 `database.sqlite` 파일을 복사하면 됩니다
