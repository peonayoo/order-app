import '../styles/Dashboard.css'

function Dashboard({ data }) {
  return (
    <div className="dashboard-section">
      <h2 className="section-title">관리자 대시보드</h2>
      <div className="dashboard-grid">
        <div className="dashboard-item">
          <div className="dashboard-label">총 주문</div>
          <div className="dashboard-value">{data.totalOrders}</div>
        </div>
        <div className="dashboard-item">
          <div className="dashboard-label">주문 접수</div>
          <div className="dashboard-value">{data.receivedOrders}</div>
        </div>
        <div className="dashboard-item">
          <div className="dashboard-label">제조 중</div>
          <div className="dashboard-value">{data.inProgressOrders}</div>
        </div>
        <div className="dashboard-item">
          <div className="dashboard-label">제조 완료</div>
          <div className="dashboard-value">{data.completedOrders}</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

