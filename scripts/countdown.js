
function updateCountdown() {
    const now = new Date();
    const eventDate = new Date(now.getFullYear(), 11, 24, 23, 59, 59);

    if (now.getMonth() === 11 && now.getDate() > 24) {
        eventDate.setFullYear(eventDate.getFullYear() + 1);
    }

    const remainingTime = eventDate - now;
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCountdown, 1000);