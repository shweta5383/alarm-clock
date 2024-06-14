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
    const curr_hrs = now.getHours() % 12 || 12;
    const curr_min = now.getMinutes();
    const curr_sec = now.getSeconds();
    const period = now.getHours() < 12 ? 'AM' : 'PM';

    CurrentTimeEle.textContent = `${curr_hrs}:${curr_min}:${curr_sec} ${period}`;
    checkClockAlarm(`${curr_hrs}:${curr_min}:${curr_sec} ${period}`);
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
    } else {
        alarms.push(alarmTime);
        displayAlarmsList();
    }

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
    alarms.map((alarm, idx) => {
        if (alarm === currentTime) {
            alert('Alarm ringing!');
            alarms.splice(idx, 1);
            displayAlarmsList();
        }
    });
}

// set interval to update time every second
setInterval(displayCurrentTime, 1000);
