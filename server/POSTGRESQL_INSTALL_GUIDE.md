# PostgreSQL 설치 가이드 (한국어 사용자명 환경)

## 문제 상황
한국어 사용자명(`신영수과장평가팀`)이 포함된 경로에서 PostgreSQL 설치 시 PowerShell 스크립트 실행 오류가 발생합니다.

## 해결 방법: 설치 경로 변경

### 단계별 설치 방법

#### 1단계: PostgreSQL 설치 프로그램 재실행
1. 기존 설치 시도가 있다면 완전히 취소하고 종료
2. PostgreSQL 설치 프로그램을 **관리자 권한**으로 실행
   - 설치 파일을 우클릭 → "관리자 권한으로 실행"

#### 2단계: 설치 옵션 선택
1. 설치 타입 선택 화면에서 **"Custom"** 또는 **"Advanced"** 선택
   - "Typical" 설치를 선택하면 경로 변경 옵션이 없을 수 있음

#### 3단계: 설치 경로 변경
1. **"Installation Directory"** 또는 **"Setup Directory"** 선택 화면에서:
   - 기본 경로: `C:\Program Files\PostgreSQL\15` (또는 설치 버전)
   - **변경할 경로**: `C:\PostgreSQL\15` 입력
   - 또는: `C:\pgdata\15`

2. **"Data Directory"** 선택 화면에서:
   - 기본 경로: `C:\Program Files\PostgreSQL\15\data`
   - **변경할 경로**: `C:\PostgreSQL\15\data` 입력
   - 또는: `C:\pgdata\15\data`

#### 4단계: 추가 설정 확인
- Port: 기본값 5432 유지 (변경하지 않음)
- Superuser (postgres) 비밀번호: 기억할 수 있는 비밀번호 설정

#### 5단계: 설치 완료
- 설치 진행 후 완료 확인

---

## 설치 경로 예시

### 추천 경로 구조:
```
C:\PostgreSQL\15\          (설치 디렉토리)
C:\PostgreSQL\15\data\     (데이터 디렉토리)
```

또는

```
C:\pgdata\15\              (설치 디렉토리)
C:\pgdata\15\data\         (데이터 디렉토리)
```

---

## 설치 확인 방법

설치 완료 후 PowerShell에서 확인:

```powershell
# PostgreSQL 버전 확인
& "C:\PostgreSQL\15\bin\psql.exe" --version

# 또는 환경 변수가 설정되어 있다면
psql --version
```

---

## 환경 변수 설정 (선택사항)

PostgreSQL이 설치된 후 환경 변수를 설정하면 어디서나 `psql` 명령어를 사용할 수 있습니다:

1. Windows 검색에서 "환경 변수" 검색
2. "시스템 환경 변수 편집" 선택
3. "환경 변수" 버튼 클릭
4. "시스템 변수"에서 `Path` 선택 후 "편집"
5. "새로 만들기" 클릭 후 다음 경로 추가:
   - `C:\PostgreSQL\15\bin`
   - `C:\PostgreSQL\15\lib`

---

## 문제 해결

### 여전히 오류가 발생하는 경우:

1. **임시 폴더 정리**
   ```powershell
   # PowerShell 관리자 권한으로 실행
   Remove-Item "$env:LOCALAPPDATA\Temp\postgresql_installer_*" -Recurse -Force
   ```

2. **설치 프로그램 다운로드 재시도**
   - PostgreSQL 공식 사이트에서 최신 버전 재다운로드

3. **Docker 사용 고려**
   - PostgreSQL 설치 대신 Docker를 사용하는 방법도 있습니다.

---

## 다음 단계

PostgreSQL 설치가 완료되면:
1. 데이터베이스 생성
2. 서버의 `config/database.js` 파일에 연결 정보 설정
3. PRD.md의 6.5 섹션에 있는 SQL 스키마 실행

