# 커피 주문 앱 (Coffee Order App)

## 프로젝트 개요

React와 Express.js를 사용한 커피 주문 관리 애플리케이션입니다.

## 프로젝트 구조

```
order-app/
├── docs/
│   └── PRD.md              # 제품 요구사항 문서
├── ui/                      # 프런트엔드 (React + Vite)
├── server/                  # 백엔드 (Express.js)
└── README.md               # 이 파일
```

## 현재 상태

### ✅ 완료
- 프런트엔드 개발 환경 구성 (React + Vite)
- 주문하기 화면 구현
- 관리자 화면 구현
- 백엔드 개발 환경 구성 (Express.js)
- PRD 문서 작성 (프런트엔드 + 백엔드)


## 빠른 시작 가이드

### 프런트엔드 실행

```bash
cd ui
npm install
npm run dev
```

### 백엔드 실행

```bash
cd server
npm install
npm run dev
```

## 환경 변수 설정

### 백엔드 (.env)

`server/.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
PORT=3001
NODE_ENV=development
```

## 기술 스택

### 프런트엔드
- React
- Vite
- CSS Modules

### 백엔드
- Node.js
- Express.js

## 문서

자세한 요구사항은 `docs/PRD.md`를 참고하세요.

