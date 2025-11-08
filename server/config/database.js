import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 데이터베이스 파일 경로
const dbPath = join(__dirname, '..', 'database.sqlite')

// SQLite 데이터베이스 연결
const db = new Database(dbPath)

// 외래키 제약 조건 활성화
db.pragma('foreign_keys = ON')

// 데이터베이스 연결 테스트
try {
  db.prepare('SELECT 1').get()
  console.log('✓ SQLite 데이터베이스 연결 성공')
  console.log(`데이터베이스 파일: ${dbPath}`)
} catch (error) {
  console.error('✗ 데이터베이스 연결 실패:', error.message)
  throw error
}

// 쿼리 실행 함수
export const query = (sql, params = []) => {
  try {
    const stmt = db.prepare(sql)
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      return stmt.all(params)
    } else {
      const result = stmt.run(params)
      return {
        lastInsertRowid: result.lastInsertRowid,
        changes: result.changes
      }
    }
  } catch (error) {
    console.error('쿼리 실행 오류:', error.message)
    console.error('SQL:', sql)
    throw error
  }
}

// 트랜잭션 헬퍼 함수
export const transaction = (callback) => {
  const transaction = db.transaction(callback)
  return transaction()
}

// 데이터베이스 연결 종료
export const close = () => {
  db.close()
}

export default db


