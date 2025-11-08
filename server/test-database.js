// 데이터베이스 연결 테스트 스크립트
import db, { query } from './config/database.js'

console.log('데이터베이스 연결 테스트 중...\n')

try {
  // 연결 테스트
  const test = query('SELECT 1 as test')
  console.log('✓ 데이터베이스 연결 성공!\n')

  // 테이블 목록 확인
  const tables = query(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `)
  
  console.log('생성된 테이블:')
  tables.forEach(table => {
    console.log(`  - ${table.name}`)
  })

  // 메뉴 데이터 확인
  const menus = query('SELECT * FROM menus')
  console.log(`\n메뉴 데이터 (${menus.length}개):`)
  menus.forEach(menu => {
    console.log(`  - ${menu.name}: ${menu.price}원 (재고: ${menu.stock})`)
  })

  // 옵션 데이터 확인
  const options = query('SELECT * FROM options')
  console.log(`\n옵션 데이터 (${options.length}개):`)
  options.forEach(option => {
    console.log(`  - ${option.name}: ${option.price}원 (메뉴 ID: ${option.menu_id})`)
  })

  console.log('\n✓ 모든 테스트 통과!')
  
  db.close()

} catch (error) {
  console.error('✗ 테스트 실패:', error.message)
  db.close()
  process.exit(1)
}


