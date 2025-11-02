# PostgreSQL 설치 경로 변경 상세 가이드

## ⚠️ 중요: 컴퓨터 세팅 변경 불필요

PostgreSQL 설치 프로그램 내에서 **직접 경로를 변경**할 수 있습니다. 컴퓨터 세팅을 변경할 필요는 없습니다.

## 설치 프로그램에서 경로 변경 방법

### 방법 1: Custom 설치 선택 시

1. **설치 타입 선택 화면**
   - ✅ "Custom" 또는 "Advanced" 선택
   - ❌ "Typical" 선택 시 경로 변경 불가

2. **설정 화면에서 경로 찾기**
   - "Installation Directory" 또는 "Setup Directory" 섹션 찾기
   - "Browse..." 또는 "Change..." 버튼 클릭
   - 또는 경로 입력란을 직접 클릭하여 편집

3. **경로 입력**
   - 기본: `C:\Program Files\PostgreSQL\15`
   - 변경: `C:\PostgreSQL\15` 입력
   - 확인 버튼 클릭

### 방법 2: 설치 프로그램에서 경로 옵션이 보이지 않는 경우

일부 설치 프로그램 버전에서는 경로 변경 옵션이 다른 이름으로 표시될 수 있습니다:

#### 옵션 1: Advanced Options에서 찾기
- 설치 옵션에서 "Advanced" 또는 "Additional Options" 클릭
- "Installation Path" 또는 "Destination Folder" 찾기

#### 옵션 2: Command Line 설치 (고급)
설치 프로그램 대신 명령줄로 설치하여 경로 지정:

```powershell
# 관리자 권한 PowerShell에서 실행
# PostgreSQL 설치 파일이 postgresql-15-x64.exe 라고 가정
.\postgresql-15-x64.exe --mode unattended --unattendedmodeui minimal --prefix "C:\PostgreSQL\15" --datadir "C:\PostgreSQL\15\data" --servicename "postgresql-x64-15" --servicepassword "your_password"
```

### 방법 3: 설치 후 수동 이동 (권장하지 않음)
설치 완료 후 파일을 이동하는 것은 복잡하므로 권장하지 않습니다.

## 📋 체크리스트

설치 프로그램을 실행할 때 확인할 항목:

- [ ] **"Custom" 설치 선택**
- [ ] **"Installation Directory" 또는 "Setup Directory" 섹션 찾기**
- [ ] **"Browse..." 버튼 클릭하여 폴더 선택**
- [ ] **`C:\PostgreSQL\15` 경로 입력**
- [ ] **"Data Directory"도 함께 변경 확인**

## 🔍 경로 변경 옵션을 찾을 수 없는 경우

### 확인할 것:
1. **설치 프로그램 버전**
   - 최신 버전인지 확인
   - PostgreSQL 공식 사이트에서 재다운로드

2. **설치 타입 확인**
   - "Typical"이 아닌 "Custom" 선택했는지 확인

3. **화면 스크롤**
   - 경로 설정이 화면 아래에 있을 수 있음

## 💡 대안: 환경 변수 설정 후 설치

만약 설치 프로그램에서 경로를 변경할 수 없다면:

1. **임시 환경 변수 설정**
   ```powershell
   # 관리자 권한 PowerShell에서 실행
   $env:ProgramFiles = "C:\PostgreSQL"
   $env:ProgramFiles(x86) = "C:\PostgreSQL"
   ```

2. **설치 프로그램 실행**

⚠️ **주의**: 이 방법은 다른 프로그램 설치에 영향을 줄 수 있으므로 권장하지 않습니다.

## ✅ 추천 방법

**가장 확실한 방법**: 설치 프로그램에서 "Custom" 또는 "Advanced" 설치를 선택하고, "Installation Directory" 옵션에서 직접 경로를 변경하는 것입니다.

## 📝 설치 후 확인

설치가 완료되면 다음 명령어로 설치 경로 확인:

```powershell
# PostgreSQL 실행 파일 위치 확인
Get-Command psql | Select-Object -ExpandProperty Source
```

예상 출력: `C:\PostgreSQL\15\bin\psql.exe`

