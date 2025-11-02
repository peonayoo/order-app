# COZY 커피 주문 앱 - 프런트엔드

## 프로젝트 개요
커피 주문 앱의 프런트엔드입니다. React와 바닐라 JavaScript를 함께 사용합니다.

## 기술 스택
- **빌드 도구**: Vite
- **프레임워크**: React 18
- **언어**: JavaScript (ES6+)
- **스타일링**: CSS3

## 설치 및 실행

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 빌드
```bash
npm run build
```

### 빌드 미리보기
```bash
npm run preview
```

## 프로젝트 구조

```
ui/
├── src/
│   ├── components/     # React 컴포넌트
│   ├── pages/          # 페이지 컴포넌트
│   ├── utils/          # 바닐라 JavaScript 유틸리티
│   ├── styles/         # CSS 파일
│   ├── App.jsx         # 메인 App 컴포넌트
│   ├── main.jsx        # 엔트리 포인트
│   └── index.css       # 전역 스타일
├── index.html          # HTML 템플릿
├── vite.config.js      # Vite 설정
└── package.json        # 프로젝트 설정
```

## 주요 기능

### 주문하기 화면
- 메뉴 목록 표시
- 장바구니 기능
- 옵션 선택
- 주문 처리

### 관리자 화면
- 대시보드
- 재고 관리
- 주문 현황 관리
