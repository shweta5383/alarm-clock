let alarms = [];
const CurrentTimeEle = document.getElementById("time");
const alarmHrsEle = document.getElementById('alarm-hrs');
const alarmMinEle = document.getElementById('alarm-min');
const alarmSecEle = document.getElementById('alarm-sec');
const alarmPeriodEle = document.getElementById('alarm-period');
const alarmsListEle = document.getElementById('alarms-list');

// display current time
function displayCurrentTime() {
    const now = new Date();
    const currHrs = now.getHours() % 12 || 12;
    const currMin = now.getMinutes();
    const currSec = now.getSeconds();
    const period = now.getHours() < 12 ? 'AM' : 'PM';

    CurrentTimeEle.textContent = `${currHrs}:${currMin}:${currSec} ${period}`;
    checkClockAlarm(`${currHrs}:${currMin}:${currSec} ${period}`);
}

// set alarm
document.getElementById('set-alarm-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const alarmHrs = parseInt(alarmHrsEle.value);
    const alarmMin = parseInt(alarmMinEle.value);
    const alarmSec = parseInt(alarmSecEle.value);
    const alarmPeriod = alarmPeriodEle.value;

    const alarmTime = `${alarmHrs}:${alarmMin.toString().padStart(2, '0')}:${alarmSec.toString().padStart(2, '0')} ${alarmPeriod}`;

    if (isNaN(alarmHrs) || isNaN(alarmMin) || isNaN(alarmSec)) {
        alert('Please enter valid time.');
        return;
    }

    if (alarms.includes(alarmTime)) {
        alert(`Alarm already set for this time ${alarmTime}`);
        return;
    }

    alarms.push(alarmTime);
    displayAlarmsList();


});

// display alarms
function displayAlarmsList() {
    alarmsListEle.innerHTML = '';

    alarms.map((alarm, idx) => {
        let alarmDivEle = document.createElement("div");
        alarmDivEle.classList.add("alarm");
        alarmDivEle.innerHTML = `
        	<span>
        	${alarm}
        	</span>
        	<button class="delete-alarm">
        	Delete
        	</button>
        `;

        alarmDivEle
            .querySelector(".delete-alarm")
            .addEventListener("click", () => {
                alarmDivEle.remove();
                if (idx !== -1) {
                    alarms.splice(idx, 1);
                }
            });

        alarmsListEle.appendChild(alarmDivEle);
    });
}

//display alarm alert
function checkClockAlarm(currentTime) {
    console.log();
    alarms.map((alarm, idx) => {
        if (alarm === currentTime) {
            alert('Alarm ringing!');
            displayAlarmsList();
        }
    });
}

// set interval to update time every second
setInterval(displayCurrentTime, 1000);
