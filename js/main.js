const ctx = document.getElementById('attendanceChart').getContext('2d');
const attendanceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [{
            label: 'Check-ins',
            data: [45, 120, 180, 210, 225, 235, 240, 245, 247],
            borderColor: '#1e6fba',
            backgroundColor: 'rgba(30, 111, 186, 0.1)',
            tension: 0.4,
            fill: true
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
                max: 300,
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

document.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('click', function () {
        document.querySelectorAll('.location-card').forEach(c => {
            c.classList.remove('active');
        });
        this.classList.add('active');
    });
});

document.querySelectorAll('.btn-view').forEach(button => {
    button.addEventListener('click', function (e) {
        e.stopPropagation(); 
        const location = this.getAttribute('data-location');
        viewLocationDetails(location);
    });
});

function viewLocationDetails(locationId) {
    localStorage.setItem('selectedLocation', locationId);
    window.location.href = 'location-details.html';
}

document.getElementById('addLocationBtn').addEventListener('click', function () {
    alert('Add New Location functionality would be implemented here');
});