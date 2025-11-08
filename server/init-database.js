// 데이터베이스 초기화 스크립트
import db from './config/database.js'

console.log('데이터베이스 스키마 생성 중...\n')

try {
  // Menus 테이블
  db.exec(`
    CREATE TABLE IF NOT EXISTS menus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      price INTEGER NOT NULL CHECK (price >= 0),
      image TEXT,
      stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('✓ menus 테이블 생성 완료')

  // Options 테이블
  db.exec(`
    CREATE TABLE IF NOT EXISTS options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL CHECK (price >= 0),
      menu_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE
    )
  `)
  console.log('✓ options 테이블 생성 완료')

  // Orders 테이블
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      total_amount INTEGER NOT NULL CHECK (total_amount >= 0),
      status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'inProgress', 'completed', 'cancelled')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('✓ orders 테이블 생성 완료')

  // OrderItems 테이블
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      menu_id INTEGER NOT NULL,
      menu_name TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      price INTEGER NOT NULL CHECK (price >= 0),
      options TEXT,
      item_total INTEGER NOT NULL CHECK (item_total >= 0),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (menu_id) REFERENCES menus(id)
    )
  `)
  console.log('✓ order_items 테이블 생성 완료\n')

  // 인덱스 생성
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_order_time ON orders(order_time DESC);
    CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
    CREATE INDEX IF NOT EXISTS idx_order_items_menu_id ON order_items(menu_id);
    CREATE INDEX IF NOT EXISTS idx_options_menu_id ON options(menu_id);
  `)
  console.log('✓ 인덱스 생성 완료\n')

  // 초기 데이터 확인 및 삽입
  const menuCount = db.prepare('SELECT COUNT(*) as count FROM menus').get()
  
  if (menuCount.count === 0) {
    console.log('초기 데이터 삽입 중...')
    
    // 메뉴 데이터 삽입
    const insertMenu = db.prepare(`
      INSERT INTO menus (name, description, price, image, stock)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    const menus = [
      ['아메리카노(ICE)', '시원하고 깔끔한 아이스 아메리카노', 4000, '/images/americano-ice.jpg.jpg', 10],
      ['아메리카노(HOT)', '따뜻하고 진한 핫 아메리카노', 4000, '/images/americano-hot.jpg.jpg', 10],
      ['카페라떼', '부드러운 우유와 에스프레소의 조화', 5000, '/images/latte.jpg.jpg', 10]
    ]
    
    const insertOption = db.prepare(`
      INSERT INTO options (name, price, menu_id)
      VALUES (?, ?, ?)
    `)
    
    const insertManyMenus = db.transaction((menus) => {
      for (const menu of menus) {
        const result = insertMenu.run(...menu)
        const menuId = result.lastInsertRowid
        
        // 옵션 데이터 삽입
        insertOption.run('샷 추가', 500, menuId)
        insertOption.run('시럽 추가', 0, menuId)
      }
    })
    
    insertManyMenus(menus)
    console.log('✓ 초기 데이터 삽입 완료\n')
  } else {
    console.log('기존 데이터가 있습니다. 초기 데이터를 건너뜁니다.\n')
  }

  // 테이블 목록 확인
  const tables = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `).all()

  console.log('생성된 테이블:')
  tables.forEach(table => {
    console.log(`  - ${table.name}`)
  })

  // 데이터 확인
  const menuCountFinal = db.prepare('SELECT COUNT(*) as count FROM menus').get()
  const optionCount = db.prepare('SELECT COUNT(*) as count FROM options').get()
  
  console.log(`\n데이터 확인:`)
  console.log(`  - 메뉴: ${menuCountFinal.count}개`)
  console.log(`  - 옵션: ${optionCount.count}개`)

  console.log('\n✓ 데이터베이스 초기화가 완료되었습니다!')
  
  db.close()

} catch (error) {
  console.error('✗ 오류 발생:', error.message)
  db.close()
  process.exit(1)
}


