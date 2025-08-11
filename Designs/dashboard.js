// Dashboard JavaScript
class Dashboard {
    constructor() {
        this.charts = {};
        this.realTimeInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.animateCounters();
        this.startRealTimeUpdates();
        this.populateTransactionTable();
    }

    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');

        sidebarToggle.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.toggle('show');
            } else {
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('expanded');
            }
        });

        // Close sidebar on mobile when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        });

        // Responsive sidebar handling
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                sidebar.classList.remove('show');
            }
        });
    }

    initializeCharts() {
        this.createLineChart();
        this.createBarChart();
        this.createPieChart();
    }

    createLineChart() {
        const ctx = document.getElementById('lineChart').getContext('2d');
        
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Revenue',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        };

        this.charts.lineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e2e8f0'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 6,
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    createBarChart() {
        const ctx = document.getElementById('barChart').getContext('2d');
        
        const data = {
            labels: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'],
            datasets: [{
                label: 'Sales',
                data: [45000, 32000, 18000, 25000, 15000],
                backgroundColor: [
                    '#2563eb',
                    '#10b981',
                    '#f59e0b',
                    '#8b5cf6',
                    '#ef4444'
                ],
                borderRadius: 8,
                borderSkipped: false
            }]
        };

        this.charts.barChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e2e8f0'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    createPieChart() {
        const ctx = document.getElementById('pieChart').getContext('2d');
        
        const data = {
            labels: ['Direct', 'Social Media', 'Email', 'Referral', 'Organic Search'],
            datasets: [{
                data: [35, 25, 20, 12, 8],
                backgroundColor: [
                    '#2563eb',
                    '#10b981',
                    '#f59e0b',
                    '#8b5cf6',
                    '#ef4444'
                ],
                borderWidth: 0
            }]
        };

        this.charts.pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                cutout: '60%'
            }
        });

        // Create custom legend
        this.createPieChartLegend(data);
    }

    createPieChartLegend(data) {
        const legendContainer = document.getElementById('pieChartLegend');
        const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
        
        let legendHTML = '<div class="pie-legend">';
        data.labels.forEach((label, index) => {
            const value = data.datasets[0].data[index];
            const percentage = ((value / total) * 100).toFixed(1);
            const color = data.datasets[0].backgroundColor[index];
            
            legendHTML += `
                <div class="legend-item">
                    <span class="legend-color" style="background-color: ${color}"></span>
                    <span class="legend-label">${label}</span>
                    <span class="legend-value">${percentage}%</span>
                </div>
            `;
        });
        legendHTML += '</div>';
        
        legendContainer.innerHTML = legendHTML;
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-value');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
    }

    startRealTimeUpdates() {
        this.updateRealTimeActivity();
        
        this.realTimeInterval = setInterval(() => {
            this.updateRealTimeActivity();
            this.updateChartData();
        }, 5000);
    }

    updateRealTimeActivity() {
        const activities = [
            { icon: 'fas fa-user-plus', color: '#10b981', title: 'New user registered', time: 'Just now' },
            { icon: 'fas fa-shopping-cart', color: '#2563eb', title: 'Order #1234 completed', time: '2 min ago' },
            { icon: 'fas fa-credit-card', color: '#f59e0b', title: 'Payment received', time: '5 min ago' },
            { icon: 'fas fa-bell', color: '#8b5cf6', title: 'System notification', time: '8 min ago' },
            { icon: 'fas fa-download', color: '#ef4444', title: 'Report generated', time: '12 min ago' }
        ];

        const activityList = document.getElementById('activityList');
        const randomActivities = activities.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        let activityHTML = '';
        randomActivities.forEach(activity => {
            activityHTML += `
                <div class="activity-item">
                    <div class="activity-icon" style="background-color: ${activity.color}">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                </div>
            `;
        });
        
        activityList.innerHTML = activityHTML;
    }

    updateChartData() {
        // Update line chart with new data point
        const lineChart = this.charts.lineChart;
        const newValue = Math.floor(Math.random() * 10000) + 20000;
        
        lineChart.data.datasets[0].data.push(newValue);
        lineChart.data.labels.push('New');
        
        if (lineChart.data.labels.length > 7) {
            lineChart.data.datasets[0].data.shift();
            lineChart.data.labels.shift();
        }
        
        lineChart.update('none');
    }

    populateTransactionTable() {
        const transactions = [
            { id: '#1001', customer: 'John Doe', amount: '$1,234', status: 'success', date: '2024-01-15' },
            { id: '#1002', customer: 'Jane Smith', amount: '$856', status: 'pending', date: '2024-01-15' },
            { id: '#1003', customer: 'Bob Johnson', amount: '$2,100', status: 'success', date: '2024-01-14' },
            { id: '#1004', customer: 'Alice Brown', amount: '$445', status: 'failed', date: '2024-01-14' },
            { id: '#1005', customer: 'Charlie Wilson', amount: '$1,789', status: 'success', date: '2024-01-13' }
        ];

        const tableBody = document.getElementById('transactionTable');
        let tableHTML = '';
        
        transactions.forEach(transaction => {
            const statusClass = `status-${transaction.status}`;
            const statusText = transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1);
            
            tableHTML += `
                <tr>
                    <td>${transaction.id}</td>
                    <td>${transaction.customer}</td>
                    <td>${transaction.amount}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>${transaction.date}</td>
                    <td>
                        <button class="action-btn" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = tableHTML;
    }
}

// Utility functions
function refreshBarChart() {
    const dashboard = window.dashboardInstance;
    if (dashboard && dashboard.charts.barChart) {
        const chart = dashboard.charts.barChart;
        chart.data.datasets[0].data = chart.data.datasets[0].data.map(() => 
            Math.floor(Math.random() * 40000) + 10000
        );
        chart.update();
    }
}

// Add CSS for pie chart legend
const legendStyles = `
<style>
.pie-legend {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
}

.legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    flex-shrink: 0;
}

.legend-label {
    flex: 1;
}

.legend-value {
    font-weight: 600;
    color: var(--dark-color);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', legendStyles);

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardInstance = new Dashboard();
});