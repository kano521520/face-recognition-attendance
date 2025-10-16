const locationData = {
    'headquarters': {
        name: 'Headquarters - Main Building',
        address: '123 Tech Street, Innovation District',
        checkins: 156,
        sensors: 4,
        attendanceRate: '94%',
        sensors: [
            { id: 'C1', name: 'Main Entrance', status: 'active', resolution: '1080p', fps: 30 },
            { id: 'C2', name: 'Lobby', status: 'active', resolution: '720p', fps: 25 },
            { id: 'C3', name: 'Conference Room A', status: 'warning', resolution: '1080p', fps: 30 },
            { id: 'C4', name: 'North Wing Entrance', status: 'active', resolution: '4K', fps: 60 }
        ],
        recentCheckins: [
            { employee: 'John Smith', time: '08:45 AM', sensor: 'C1', status: 'on-time' },
            { employee: 'Sarah Johnson', time: '08:52 AM', sensor: 'C1', status: 'on-time' },
            { employee: 'Mike Chen', time: '09:15 AM', sensor: 'C2', status: 'late' },
            { employee: 'Emily Davis', time: '08:30 AM', sensor: 'C4', status: 'on-time' },
            { employee: 'Robert Brown', time: '09:05 AM', sensor: 'C1', status: 'late' }
        ]
    },
    'rd-center': {
        name: 'Research & Development Center',
        address: '456 Science Avenue, Tech Park',
        checkins: 73,
        sensors: 2,
        attendanceRate: '89%',
        sensors: [
            { id: 'C5', name: 'Main Lab Entrance', status: 'active', resolution: '1080p', fps: 30 },
            { id: 'C6', name: 'Server Room', status: 'active', resolution: '720p', fps: 25 }
        ],
        recentCheckins: [
            { employee: 'Lisa Wang', time: '08:40 AM', sensor: 'C5', status: 'on-time' },
            { employee: 'David Kim', time: '09:20 AM', sensor: 'C5', status: 'late' },
            { employee: 'Maria Garcia', time: '08:55 AM', sensor: 'C5', status: 'on-time' }
        ]
    },
    'regional-office': {
        name: 'Regional Office - East',
        address: '789 Business Road, Commerce Zone',
        checkins: 42,
        sensors: 2,
        attendanceRate: '87%',
        sensors: [
            { id: 'C7', name: 'Front Desk', status: 'active', resolution: '1080p', fps: 30 },
            { id: 'C8', name: 'Parking Lot', status: 'active', resolution: '720p', fps: 25 }
        ],
        recentCheckins: [
            { employee: 'Tom Wilson', time: '08:50 AM', sensor: 'C7', status: 'on-time' },
            { employee: 'Anna Taylor', time: '09:10 AM', sensor: 'C7', status: 'late' },
            { employee: 'James Miller', time: '08:35 AM', sensor: 'C7', status: 'on-time' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const locationId = localStorage.getItem('selectedLocation') || 'headquarters';
    loadLocationData(locationId);
    initializeLocationChart();
});

function loadLocationData(locationId) {
    const location = locationData[locationId];

    if (!location) return;

    document.getElementById('location-title').textContent = location.name;
    document.getElementById('location-subtitle').textContent = `${location.name} - Detailed View`;
    document.getElementById('location-address').textContent = location.address;
    document.getElementById('total-checkins').textContent = location.checkins;
    document.getElementById('active-sensors').textContent = location.sensors;
    document.getElementById('attendance-rate').textContent = location.attendanceRate;

    loadSensorDetails(location.sensors);

    loadRecentCheckins(location.recentCheckins);
}

function loadSensorDetails(sensors) {
    const container = document.getElementById('sensor-details');
    container.innerHTML = '';

    sensors.forEach(sensor => {
        const sensorElement = document.createElement('div');
        sensorElement.className = 'sensor-detail-item';
        sensorElement.innerHTML = `
            <div class="sensor-detail-icon">${sensor.id}</div>
            <div class="sensor-detail-info">
                <h4>${sensor.name}</h4>
                <p>Resolution: ${sensor.resolution} | FPS: ${sensor.fps}</p>
                <p>Last Active: ${new Date().toLocaleTimeString()}</p>
            </div>
            <div class="sensor-status status-${sensor.status}">${sensor.status === 'active' ? 'Active' : 'Needs Calibration'}</div>
        `;
        container.appendChild(sensorElement);
    });
}

function loadRecentCheckins(checkins) {
    const container = document.getElementById('recent-checkins');
    container.innerHTML = '';

    checkins.forEach(checkin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${checkin.employee}</td>
            <td>${checkin.time}</td>
            <td>${checkin.sensor}</td>
            <td><span class="status-badge status-${checkin.status}">${checkin.status === 'on-time' ? 'On Time' : 'Late'}</span></td>
        `;
        container.appendChild(row);
    });
}

function initializeLocationChart() {
    const ctx = document.getElementById('locationChart').getContext('2d');
    const locationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Daily Check-ins',
                data: [142, 156, 138, 162, 148, 45, 32],
                backgroundColor: '#1e6fba',
                borderRadius: 5
            }]
        },
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
                        color: 'rgba(0, 0, 0, 0.05)'
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

function goBack() {
    window.location.href = 'index.html';
}