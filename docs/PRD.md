# 커피 주문 앱

## 1. 프로젝트 개요

### 1.1 프로젝트명
커피 주문 앱

### 1.2 프로젝트 목적
사용자가 커피 메뉴를 주문하고, 관리자가 주문을 관리할 수 있는 간단한 풀스택 웹 앱

### 1.3 개발 범위
- 주문하기 화면(메뉴 선택 및 장바구니 기능)
- 관리자 화면(재고 관리 및 주문 상태 관리)
- 데이터를 생성/조회/수정/삭제할 수 있는 기능

## 2. 기술 스택
- 프런트엔드: HTML, CSS, 리액트, 자바스크립트
- 백엔드: Node.js, Express
- 데이터베이스: PostgreSQL

## 3. 기본 사항
- 프런트엔드와 백엔드를 따로 개발
- 기본적인 웹 기술만 사용
- 학습 목적이므로 사용자 인증이나 결제 기능은 제외
- 메뉴는 커피 메뉴만 있음

## 4. 주문하기 화면 상세 요구사항

### 4.1 화면 구성
주문하기 화면은 다음과 같이 구성됩니다:

#### 4.1.1 헤더 영역
- **앱 로고**: 왼쪽 상단에 "COZY" 로고 (다크 그린 테두리)
- **네비게이션 버튼**: 
  - "주문하기" 버튼 (현재 활성화된 화면, 테두리 없음)
  - "관리자" 버튼 (테두리 있음)

#### 4.1.2 메뉴 상품 영역
- **레이아웃**: 3개의 상품 카드가 가로로 배치
- **상품 카드 구성**:
  - 상품 이미지 영역 (직사각형 박스, 대각선 교차 표시)
  - 상품명 (예: "아메리카노(ICE)", "아메리카노(HOT)", "카페라떼")
  - 가격 (예: "4,000원", "5,000원")
  - 상품 설명 ("간단한 설명...")
  - 옵션 선택:
    - "샷 추가 (+500원)" 체크박스
    - "시럽 추가 (+0원)" 체크박스
  - "담기" 버튼

#### 4.1.3 장바구니 영역
- **제목**: "장바구니"
- **주문 내역 표시**:
  - 상품명과 옵션 정보
  - 수량 표시 (예: "X 1", "X 2")
  - 개별 상품 가격
- **총 금액**: "총 금액 12,500원" (굵은 글씨, 오른쪽 정렬)
- **주문하기 버튼**: 총 금액 하단에 배치

### 4.2 기능 요구사항

#### 4.2.1 메뉴 표시 기능
- 커피 메뉴 목록을 카드 형태로 표시
- 각 메뉴의 이미지, 이름, 가격, 설명 표시
- 옵션 선택 가능 (샷 추가, 시럽 추가)

#### 4.2.2 장바구니 기능
- 상품을 장바구니에 추가/제거
- 옵션이 포함된 상품명 표시
- 수량 조절 기능
- 실시간 총 금액 계산
- 장바구니 비우기 기능

#### 4.2.3 주문 기능
- 장바구니에 담긴 상품들을 주문 처리
- 주문 완료 후 장바구니 초기화
- 주문 내역을 관리자 화면으로 전송

### 4.3 UI/UX 요구사항

#### 4.3.1 디자인
- 깔끔하고 미니멀한 디자인
- 흰색 배경에 다크 그레이 텍스트/테두리
- COZY 로고는 다크 그린 테두리 사용
- 일관된 색상 팔레트 적용

#### 4.3.2 반응형 디자인
- 데스크톱 환경에 최적화
- 카드 레이아웃이 화면 크기에 따라 조정
- 터치 및 마우스 인터랙션 지원

#### 4.3.3 사용성
- 직관적인 버튼 배치
- 명확한 가격 표시
- 실시간 장바구니 업데이트
- 간단한 옵션 선택 인터페이스

### 4.4 데이터 구조

#### 4.4.1 메뉴 데이터
```javascript
{
  id: number,
  name: string,
  price: number,
  description: string,
  image: string,
  options: [
    {
      name: string,
      price: number
    }
  ]
}
```

#### 4.4.2 장바구니 데이터
```javascript
{
  items: [
    {
      menuId: number,
      name: string,
      price: number,
      options: string[],
      quantity: number
    }
  ],
  totalAmount: number
}
```

### 4.5 기술 구현 요구사항
- HTML5, CSS3, JavaScript 사용
- 반응형 CSS Grid/Flexbox 레이아웃
- DOM 조작을 통한 동적 UI 업데이트
- 로컬 스토리지를 활용한 장바구니 데이터 관리
- RESTful API를 통한 메뉴 데이터 조회

## 5. 관리자 화면 상세 요구사항

### 5.1 화면 구성
관리자 화면은 다음과 같이 구성됩니다:

#### 5.1.1 헤더 영역
- **앱 로고**: 왼쪽 상단에 "COZY" 로고 (다크 그린 테두리)
- **네비게이션 버튼**: 
  - "주문하기" 버튼 (테두리 없음)
  - "관리자" 버튼 (현재 활성화된 화면, 다크 그린 테두리)

#### 5.1.2 관리자 대시보드 영역
- **섹션 제목**: "관리자 대시보드"
- **주문 통계 표시**:
  - 총 주문 수
  - 주문 접수 수
  - 제조 중 수
  - 제조 완료 수
- **레이아웃**: 연한 회색 박스로 구분

#### 5.1.3 재고 현황 영역
- **섹션 제목**: "재고 현황"
- **상품별 재고 표시**:
  - 아메리카노(ICE): 현재 재고 수량 표시
  - 아메리카노(HOT): 현재 재고 수량 표시
  - 카페라떼: 현재 재고 수량 표시
- **재고 조절 버튼**: 각 상품마다 "+" 및 "-" 버튼 제공
- **레이아웃**: 연한 회색 박스로 구분, 3개 상품 카드 가로 배치

#### 5.1.4 주문 현황 영역
- **섹션 제목**: "주문 현황"
- **주문 목록 표시**:
  - 주문 시간 (예: "7월 31일 13:00")
  - 주문 상품 및 수량 (예: "아메리카노(ICE) x 1")
  - 주문 금액 (예: "4,000원")
  - 주문 상태 버튼 (예: "주문 접수")
- **레이아웃**: 연한 회색 박스로 구분, 세로 스크롤 가능

### 5.2 기능 요구사항

#### 5.2.1 대시보드 기능
- 실시간 주문 통계 표시
- 주문 상태별 카운트 업데이트
- 전체 주문 현황 한눈에 파악

#### 5.2.2 재고 관리 기능
- 각 메뉴별 현재 재고 수량 표시
- 재고 증가/감소 버튼을 통한 수량 조절
- 재고 부족 시 알림 기능
- 재고 변경 이력 관리

#### 5.2.3 주문 관리 기능
- 새로운 주문 실시간 수신
- 주문 목록 표시 (시간순 정렬)
- 주문 상태 변경 (접수 → 제조중 → 완료)
- 주문 상세 정보 확인
- 주문 취소 기능

#### 5.2.4 데이터 동기화 기능
- 주문하기 화면과 실시간 데이터 연동
- 재고 변경 시 즉시 반영
- 주문 상태 변경 시 주문자에게 알림

### 5.3 UI/UX 요구사항

#### 5.3.1 디자인
- 깔끔하고 직관적인 관리자 인터페이스
- 흰색 배경에 연한 회색 박스로 섹션 구분
- 다크 그린 액센트 컬러 사용
- 명확한 정보 계층 구조

#### 5.3.2 사용성
- 한 화면에서 모든 관리 기능 접근 가능
- 직관적인 버튼 배치와 상태 표시
- 빠른 재고 조절을 위한 +/- 버튼
- 주문 상태 변경을 위한 원클릭 액션

#### 5.3.3 반응형 디자인
- 데스크톱 환경에 최적화
- 태블릿 환경에서도 사용 가능
- 터치 인터페이스 지원

### 5.4 데이터 구조

#### 5.4.1 대시보드 데이터
```javascript
{
  totalOrders: number,
  receivedOrders: number,
  inProgressOrders: number,
  completedOrders: number
}
```

#### 5.4.2 재고 데이터
```javascript
{
  inventory: [
    {
      menuId: number,
      menuName: string,
      currentStock: number,
      minStock: number
    }
  ]
}
```

#### 5.4.3 주문 데이터
```javascript
{
  orders: [
    {
      orderId: number,
      orderTime: string,
      items: [
        {
          menuId: number,
          menuName: string,
          quantity: number,
          price: number,
          options: string[]
        }
      ],
      totalAmount: number,
      status: 'received' | 'inProgress' | 'completed' | 'cancelled'
    }
  ]
}
```

### 5.5 기술 구현 요구사항
- HTML5, CSS3, JavaScript 사용
- WebSocket 또는 Server-Sent Events를 통한 실시간 업데이트
- RESTful API를 통한 CRUD 작업
- 로컬 스토리지 또는 세션 스토리지 활용
- 반응형 CSS Grid/Flexbox 레이아웃
- DOM 조작을 통한 동적 UI 업데이트

### 5.6 비즈니스 로직

#### 5.6.1 재고 관리 로직
- 재고가 0 이하로 떨어지면 해당 메뉴 주문 불가
- 재고 변경 시 주문하기 화면에 즉시 반영
- 재고 부족 시 관리자에게 알림

#### 5.6.2 주문 처리 로직
- 새로운 주문 접수 시 대시보드 카운트 증가
- 주문 상태 변경 시 해당 통계 업데이트
- 주문 완료 시 재고 자동 차감
- 주문 취소 시 재고 복구

#### 5.6.3 데이터 일관성
- 주문하기 화면과 관리자 화면 간 실시간 동기화
- 재고 데이터의 정확성 보장
- 주문 상태의 일관성 유지

## 6. 백엔드 개발 상세 요구사항

### 6.1 데이터 모델

백엔드 시스템의 핵심 데이터 모델은 다음과 같이 구성됩니다:

#### 6.1.1 Menus (메뉴 테이블)
커피 메뉴 정보를 저장하는 테이블입니다.

**필드 구조**:
- `id` (PK): 메뉴 고유 식별자 (자동 증가)
- `name` (VARCHAR): 커피 메뉴 이름 (예: "아메리카노(ICE)")
- `description` (TEXT): 메뉴 설명 (예: "시원하고 깔끔한 아이스 아메리카노")
- `price` (INTEGER): 메뉴 기본 가격 (원 단위)
- `image` (VARCHAR): 메뉴 이미지 경로 또는 URL
- `stock` (INTEGER): 재고 수량
- `created_at` (TIMESTAMP): 생성 일시
- `updated_at` (TIMESTAMP): 수정 일시

**제약 조건**:
- `name`: NOT NULL, UNIQUE
- `price`: NOT NULL, >= 0
- `stock`: NOT NULL, >= 0

#### 6.1.2 Options (옵션 테이블)
메뉴에 추가할 수 있는 옵션 정보를 저장하는 테이블입니다.

**필드 구조**:
- `id` (PK): 옵션 고유 식별자 (자동 증가)
- `name` (VARCHAR): 옵션 이름 (예: "샷 추가", "시럽 추가")
- `price` (INTEGER): 옵션 추가 가격 (원 단위, 0 이상)
- `menu_id` (FK): 연결된 메뉴 ID (Menus 테이블 참조)
- `created_at` (TIMESTAMP): 생성 일시
- `updated_at` (TIMESTAMP): 수정 일시

**제약 조건**:
- `name`: NOT NULL
- `price`: NOT NULL, >= 0
- `menu_id`: NOT NULL, Menus 테이블 외래키

#### 6.1.3 Orders (주문 테이블)
주문 정보를 저장하는 테이블입니다.

**필드 구조**:
- `id` (PK): 주문 고유 식별자 (자동 증가)
- `order_time` (TIMESTAMP): 주문 일시
- `total_amount` (INTEGER): 주문 총 금액 (원 단위)
- `status` (VARCHAR): 주문 상태 ('received', 'inProgress', 'completed', 'cancelled')
- `created_at` (TIMESTAMP): 생성 일시
- `updated_at` (TIMESTAMP): 수정 일시

**제약 조건**:
- `order_time`: NOT NULL
- `total_amount`: NOT NULL, >= 0
- `status`: NOT NULL, CHECK (status IN ('received', 'inProgress', 'completed', 'cancelled'))
- 기본 상태: 'received'

#### 6.1.4 OrderItems (주문 항목 테이블)
주문에 포함된 개별 메뉴 항목 정보를 저장하는 테이블입니다.

**필드 구조**:
- `id` (PK): 주문 항목 고유 식별자 (자동 증가)
- `order_id` (FK): 주문 ID (Orders 테이블 참조)
- `menu_id` (FK): 메뉴 ID (Menus 테이블 참조)
- `menu_name` (VARCHAR): 주문 당시 메뉴 이름 (스냅샷)
- `quantity` (INTEGER): 주문 수량
- `price` (INTEGER): 주문 당시 단가 (스냅샷)
- `options` (JSONB 또는 TEXT): 선택한 옵션 목록 (JSON 형식)
- `item_total` (INTEGER): 항목별 총액 (수량 * 단가 + 옵션 가격)
- `created_at` (TIMESTAMP): 생성 일시

**제약 조건**:
- `order_id`: NOT NULL, Orders 테이블 외래키
- `menu_id`: NOT NULL, Menus 테이블 외래키
- `quantity`: NOT NULL, > 0
- `price`: NOT NULL, >= 0

**관계**:
- Orders 1 : N OrderItems (한 주문에 여러 주문 항목)
- Menus 1 : N OrderItems (한 메뉴가 여러 주문에 포함)

### 6.2 데이터 스키마를 위한 사용자 흐름

#### 6.2.1 메뉴 조회 및 표시 흐름
**시나리오**: 사용자가 주문하기 화면에 접속

1. 클라이언트가 `/api/menus` 엔드포인트로 GET 요청
2. 서버는 Menus 테이블에서 모든 메뉴 정보 조회
3. 각 메뉴에 연결된 Options 정보 조회 (JOIN 또는 별도 쿼리)
4. 재고 수량(`stock`)은 응답에 포함하되, 클라이언트에서는 관리자 화면에만 표시
5. 응답 데이터:
   ```javascript
   [
     {
       id: 1,
       name: "아메리카노(ICE)",
       description: "시원하고 깔끔한 아이스 아메리카노",
       price: 4000,
       image: "/images/americano-ice.jpg.jpg",
       stock: 10,  // 관리자 화면에만 표시
       options: [
         { id: 1, name: "샷 추가", price: 500 },
         { id: 2, name: "시럽 추가", price: 0 }
       ]
     },
     ...
   ]
   ```
6. 클라이언트는 받은 데이터를 브라우저 화면에 카드 형태로 표시

#### 6.2.2 장바구니 관리 흐름
**시나리오**: 사용자가 메뉴를 선택하여 장바구니에 추가

1. 사용자가 메뉴 카드에서 옵션을 선택하고 "담기" 버튼 클릭
2. 클라이언트는 선택 정보를 로컬 상태(React State)로 관리
3. 장바구니에는 다음 정보가 저장됨:
   - 메뉴 ID 및 이름
   - 선택한 옵션 목록
   - 수량
   - 계산된 가격 (메뉴 가격 + 옵션 가격)
4. 장바구니 정보는 클라이언트 측에서만 관리하며, 서버 전송은 '주문하기' 버튼 클릭 시 수행

#### 6.2.3 주문 생성 흐름
**시나리오**: 사용자가 장바구니에서 '주문하기' 버튼 클릭

1. 클라이언트가 재고 확인을 위해 `/api/menus/:menuId` 또는 전체 메뉴 정보 재조회
2. 재고 부족 시 에러 메시지 표시 및 주문 중단
3. 재고가 충분한 경우, `/api/orders` 엔드포인트로 POST 요청
4. 요청 본문:
   ```javascript
   {
     items: [
       {
         menuId: 1,
         name: "아메리카노(ICE)",
         quantity: 2,
         price: 4000,
         options: ["샷 추가", "시럽 추가"],
         itemTotal: 9000  // (4000 + 500 + 0) * 2
       }
     ],
     totalAmount: 9000
   }
   ```
5. 서버 처리 과정:
   a. Orders 테이블에 주문 레코드 생성 (`status = 'received'`)
   b. OrderItems 테이블에 각 주문 항목 레코드 생성
   c. 각 주문 항목에 대해 Menus 테이블의 `stock` 필드 차감
   d. 트랜잭션 처리로 데이터 일관성 보장
6. 주문 ID와 함께 응답 반환:
   ```javascript
   {
     orderId: 123,
     message: "주문이 완료되었습니다.",
     totalAmount: 9000
   }
   ```
7. 클라이언트는 주문 성공 메시지를 표시하고 장바구니 초기화

#### 6.2.4 관리자 화면 주문 현황 표시 흐름
**시나리오**: 관리자가 관리자 화면 접속

1. 클라이언트가 `/api/orders` 엔드포인트로 GET 요청
2. 서버는 Orders 테이블과 OrderItems 테이블을 JOIN하여 조회
3. 주문 시간(`order_time`) 기준 내림차순 정렬
4. 응답 데이터:
   ```javascript
   [
     {
       id: 123,
       orderTime: "2024-11-02T09:15:30Z",
       totalAmount: 9000,
       status: "received",
       items: [
         {
           menuId: 1,
           menuName: "아메리카노(ICE)",
           quantity: 2,
           price: 4000,
           options: ["샷 추가", "시럽 추가"],
           itemTotal: 9000
         }
       ]
     },
     ...
   ]
   ```
5. 클라이언트는 받은 데이터를 '주문 현황' 섹션에 표시
6. 각 주문의 상태에 따라 다른 버튼 표시:
   - 'received' → "제조 시작" 버튼
   - 'inProgress' → "제조 완료" 버튼
   - 'completed' → "제조 완료" 버튼 (비활성화)

#### 6.2.5 주문 상태 변경 흐름
**시나리오**: 관리자가 주문 상태 변경 버튼 클릭

1. 클라이언트가 `/api/orders/:orderId/status` 엔드포인트로 PATCH 요청
2. 요청 본문:
   ```javascript
   {
     status: "inProgress"  // 또는 "completed"
   }
   ```
3. 서버 처리:
   a. Orders 테이블에서 해당 주문의 `status` 필드 업데이트
   b. 상태가 'completed'로 변경되는 경우:
      - OrderItems를 조회하여 각 항목의 메뉴 ID와 수량 확인
      - Menus 테이블에서 해당 메뉴들의 재고 차감 (이미 주문 시 차감되었으므로 중복 차감 방지 로직 필요)
   c. 상태 변경 성공 응답 반환
4. 클라이언트는 주문 목록을 다시 조회하여 업데이트된 상태 반영

### 6.3 API 설계

#### 6.3.1 메뉴 관련 API

##### GET `/api/menus`
주문하기 화면에 커피 메뉴 목록을 조회합니다.

**요청**:
- Method: GET
- Headers: None
- Body: None

**응답** (200 OK):
```javascript
[
  {
    id: 1,
    name: "아메리카노(ICE)",
    description: "시원하고 깔끔한 아이스 아메리카노",
    price: 4000,
    image: "/images/americano-ice.jpg.jpg",
    stock: 10,
    options: [
      { id: 1, name: "샷 추가", price: 500 },
      { id: 2, name: "시럽 추가", price: 0 }
    ]
  },
  {
    id: 2,
    name: "아메리카노(HOT)",
    description: "따뜻하고 진한 핫 아메리카노",
    price: 4000,
    image: "/images/americano-hot.jpg.jpg",
    stock: 10,
    options: [
      { id: 3, name: "샷 추가", price: 500 },
      { id: 4, name: "시럽 추가", price: 0 }
    ]
  },
  {
    id: 3,
    name: "카페라떼",
    description: "부드러운 우유와 에스프레소의 조화",
    price: 5000,
    image: "/images/latte.jpg.jpg",
    stock: 10,
    options: [
      { id: 5, name: "샷 추가", price: 500 },
      { id: 6, name: "시럽 추가", price: 0 }
    ]
  }
]
```

**에러 응답**:
- 500 Internal Server Error: 서버 오류

##### GET `/api/menus/:menuId`
특정 메뉴의 상세 정보를 조회합니다.

**요청**:
- Method: GET
- Path Parameter: `menuId` (메뉴 ID)

**응답** (200 OK):
```javascript
{
  id: 1,
  name: "아메리카노(ICE)",
  description: "시원하고 깔끔한 아이스 아메리카노",
  price: 4000,
  image: "/images/americano-ice.jpg.jpg",
  stock: 10,
  options: [
    { id: 1, name: "샷 추가", price: 500 },
    { id: 2, name: "시럽 추가", price: 0 }
  ]
}
```

**에러 응답**:
- 404 Not Found: 메뉴를 찾을 수 없음
- 500 Internal Server Error: 서버 오류

##### PATCH `/api/menus/:menuId/stock`
특정 메뉴의 재고 수량을 수정합니다 (관리자 화면용).

**요청**:
- Method: PATCH
- Path Parameter: `menuId` (메뉴 ID)
- Body:
  ```javascript
  {
    stock: 15  // 변경할 재고 수량
  }
  ```

**응답** (200 OK):
```javascript
{
  id: 1,
  name: "아메리카노(ICE)",
  stock: 15,
  message: "재고가 업데이트되었습니다."
}
```

**에러 응답**:
- 400 Bad Request: 잘못된 재고 수량 (음수 등)
- 404 Not Found: 메뉴를 찾을 수 없음
- 500 Internal Server Error: 서버 오류

#### 6.3.2 주문 관련 API

##### POST `/api/orders`
새로운 주문을 생성합니다.

**요청**:
- Method: POST
- Body:
  ```javascript
  {
    items: [
      {
        menuId: 1,
        name: "아메리카노(ICE)",
        quantity: 2,
        price: 4000,
        options: ["샷 추가", "시럽 추가"],
        itemTotal: 9000
      },
      {
        menuId: 2,
        name: "아메리카노(HOT)",
        quantity: 1,
        price: 4000,
        options: [],
        itemTotal: 4000
      }
    ],
    totalAmount: 13000
  }
  ```

**응답** (201 Created):
```javascript
{
  orderId: 123,
  orderTime: "2024-11-02T09:15:30Z",
  totalAmount: 13000,
  message: "주문이 완료되었습니다."
}
```

**에러 응답**:
- 400 Bad Request: 잘못된 요청 데이터 (재고 부족, 유효하지 않은 메뉴 ID 등)
- 500 Internal Server Error: 서버 오류

**비즈니스 로직**:
1. 요청 본문의 각 주문 항목에 대해 재고 확인
2. 재고가 부족한 경우 에러 응답 반환
3. 모든 항목의 재고가 충분한 경우:
   - Orders 테이블에 주문 레코드 생성
   - OrderItems 테이블에 각 주문 항목 레코드 생성
   - Menus 테이블의 해당 메뉴들 재고 차감
   - 트랜잭션으로 모든 작업 원자성 보장

##### GET `/api/orders`
모든 주문 목록을 조회합니다 (관리자 화면용).

**요청**:
- Method: GET
- Query Parameters:
  - `status` (optional): 주문 상태 필터 ('received', 'inProgress', 'completed', 'cancelled')
  - `limit` (optional): 반환할 주문 개수 제한
  - `offset` (optional): 페이징 오프셋

**응답** (200 OK):
```javascript
[
  {
    id: 123,
    orderTime: "2024-11-02T09:15:30Z",
    totalAmount: 13000,
    status: "received",
    items: [
      {
        menuId: 1,
        menuName: "아메리카노(ICE)",
        quantity: 2,
        price: 4000,
        options: ["샷 추가", "시럽 추가"],
        itemTotal: 9000
      },
      {
        menuId: 2,
        menuName: "아메리카노(HOT)",
        quantity: 1,
        price: 4000,
        options: [],
        itemTotal: 4000
      }
    ]
  },
  ...
]
```

**에러 응답**:
- 500 Internal Server Error: 서버 오류

##### GET `/api/orders/:orderId`
특정 주문의 상세 정보를 조회합니다.

**요청**:
- Method: GET
- Path Parameter: `orderId` (주문 ID)

**응답** (200 OK):
```javascript
{
  id: 123,
  orderTime: "2024-11-02T09:15:30Z",
  totalAmount: 13000,
  status: "received",
  items: [
    {
      menuId: 1,
      menuName: "아메리카노(ICE)",
      quantity: 2,
      price: 4000,
      options: ["샷 추가", "시럽 추가"],
      itemTotal: 9000
    },
    {
      menuId: 2,
      menuName: "아메리카노(HOT)",
      quantity: 1,
      price: 4000,
      options: [],
      itemTotal: 4000
    }
  ]
}
```

**에러 응답**:
- 404 Not Found: 주문을 찾을 수 없음
- 500 Internal Server Error: 서버 오류

##### PATCH `/api/orders/:orderId/status`
주문 상태를 변경합니다 (관리자 화면용).

**요청**:
- Method: PATCH
- Path Parameter: `orderId` (주문 ID)
- Body:
  ```javascript
  {
    status: "inProgress"  // 또는 "completed"
  }
  ```

**응답** (200 OK):
```javascript
{
  orderId: 123,
  status: "inProgress",
  message: "주문 상태가 변경되었습니다."
}
```

**에러 응답**:
- 400 Bad Request: 잘못된 상태 값 또는 상태 전이 규칙 위반
- 404 Not Found: 주문을 찾을 수 없음
- 500 Internal Server Error: 서버 오류

**상태 전이 규칙**:
- 'received' → 'inProgress' 또는 'cancelled'
- 'inProgress' → 'completed' 또는 'cancelled'
- 'completed' → 변경 불가
- 'cancelled' → 변경 불가

##### PATCH `/api/orders/:orderId`
주문 정보를 수정합니다 (일반적으로 사용하지 않으나 확장성을 위해 정의).

**요청**:
- Method: PATCH
- Path Parameter: `orderId` (주문 ID)
- Body:
  ```javascript
  {
    // 수정 가능한 필드만 포함
  }
  ```

**응답** (200 OK):
```javascript
{
  orderId: 123,
  message: "주문 정보가 업데이트되었습니다."
}
```

### 6.4 기술 구현 요구사항

#### 6.4.1 백엔드 기술 스택
- **서버 프레임워크**: Node.js, Express.js
- **데이터베이스**: PostgreSQL
- **ORM/쿼리 빌더**: 선택 사항 (Prisma, Sequelize, pg 등)
- **환경 변수 관리**: dotenv

#### 6.4.2 데이터베이스 연결
- PostgreSQL 데이터베이스 연결 풀 관리
- 연결 오류 처리 및 재연결 로직
- 환경 변수를 통한 데이터베이스 접속 정보 관리

#### 6.4.3 API 미들웨어
- CORS 설정 (프런트엔드와의 통신 허용)
- JSON 파싱 미들웨어
- 에러 핸들링 미들웨어
- 요청 로깅 미들웨어 (선택 사항)

#### 6.4.4 에러 처리
- 일관된 에러 응답 형식:
  ```javascript
  {
    error: true,
    message: "에러 메시지",
    code: "ERROR_CODE"  // 선택 사항
  }
  ```
- HTTP 상태 코드 적절히 사용:
  - 200 OK: 성공
  - 201 Created: 리소스 생성 성공
  - 400 Bad Request: 잘못된 요청
  - 404 Not Found: 리소스를 찾을 수 없음
  - 500 Internal Server Error: 서버 오류

#### 6.4.5 데이터 검증
- 요청 본문 데이터 유효성 검사
- 데이터베이스 제약 조건 준수
- 비즈니스 로직 검증 (재고 확인, 상태 전이 규칙 등)

#### 6.4.6 트랜잭션 처리
- 주문 생성 시 Orders, OrderItems, Menus 테이블 업데이트를 트랜잭션으로 처리
- 트랜잭션 실패 시 롤백 처리
- 데이터 일관성 보장

#### 6.4.7 보안 고려사항
- SQL Injection 방지 (파라미터화된 쿼리 사용)
- 입력 데이터 검증 및 sanitization
- 환경 변수를 통한 민감 정보 관리

### 6.5 데이터베이스 스키마 예시

```sql
-- Menus 테이블
CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price INTEGER NOT NULL CHECK (price >= 0),
  image VARCHAR(500),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Options 테이블
CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  menu_id INTEGER NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders 테이블
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_amount INTEGER NOT NULL CHECK (total_amount >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'received' 
    CHECK (status IN ('received', 'inProgress', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OrderItems 테이블
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_id INTEGER NOT NULL REFERENCES menus(id),
  menu_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price INTEGER NOT NULL CHECK (price >= 0),
  options JSONB,
  item_total INTEGER NOT NULL CHECK (item_total >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_time ON orders(order_time DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_menu_id ON order_items(menu_id);
CREATE INDEX idx_options_menu_id ON options(menu_id);
```

### 6.6 초기 데이터 (Seed Data)

개발 및 테스트를 위한 초기 데이터 예시:

```sql
-- 메뉴 초기 데이터
INSERT INTO menus (name, description, price, image, stock) VALUES
  ('아메리카노(ICE)', '시원하고 깔끔한 아이스 아메리카노', 4000, '/images/americano-ice.jpg.jpg', 10),
  ('아메리카노(HOT)', '따뜻하고 진한 핫 아메리카노', 4000, '/images/americano-hot.jpg.jpg', 10),
  ('카페라떼', '부드러운 우유와 에스프레소의 조화', 5000, '/images/latte.jpg.jpg', 10);

-- 옵션 초기 데이터
INSERT INTO options (name, price, menu_id) VALUES
  ('샷 추가', 500, 1),
  ('시럽 추가', 0, 1),
  ('샷 추가', 500, 2),
  ('시럽 추가', 0, 2),
  ('샷 추가', 500, 3),
  ('시럽 추가', 0, 3);
```