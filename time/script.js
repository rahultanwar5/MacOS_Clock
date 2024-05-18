function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';

    const hourTens = Math.floor((hours % 12 || 12) / 10);
    const hourUnits = (hours % 12 || 12) % 10;
    const minuteTens = Math.floor(minutes / 10);
    const minuteUnits = minutes % 10;

    updateDigit('am-pm', amPm);
    updateDigit('hour-tens', hourTens);
    updateDigit('hour-units', hourUnits);
    updateDigit('minute-tens', minuteTens);
    updateDigit('minute-units', minuteUnits);

    const dateString = now.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long'
    });
    document.getElementById('date').textContent = dateString;
}

function updateDigit(id, newValue) {
    const digit = document.getElementById(id);
    const currentValue = digit.textContent;

    if (currentValue !== String(newValue)) {
        digit.classList.remove('flip');
        void digit.offsetWidth; // Trigger reflow to restart animation
        digit.classList.add('flip');
        setTimeout(() => {
            digit.textContent = newValue;
        }, 300); // Adjust timing to match the flip animation
    }
}

function updateOnNextMinute() {
    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();
    setTimeout(() => {
        updateTime();
        setInterval(updateTime, 60000);
    }, secondsUntilNextMinute * 1000);
}

updateTime();
updateOnNextMinute();
