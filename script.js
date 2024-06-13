let alarms = [];
const current_time = document.getElementById("time");

// display current time
function displayCurrentTime() {
    const now = new Date();
    const curr_hrs = now.getHours() % 12 || 12;
    const curr_min = now.getMinutes();
    const curr_sec = now.getSeconds();
    const period = now.getHours() < 12 ? 'AM' : 'PM';

    current_time.textContent = `${curr_hrs}:${curr_min}:${curr_sec} ${period}`;
    checkClockAlarm(`${curr_hrs}:${curr_min}:${curr_sec} ${period}`);
}

// set alarm
document.getElementById('set-alarm-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const alarmHrs = parseInt(document.getElementById('alarm-hrs').value);
    const alarmMin = parseInt(document.getElementById('alarm-min').value);
    const alarmSec = parseInt(document.getElementById('alarm-sec').value);
    const alarmPeriod = document.getElementById('alarm-period').value;

    if (isNaN(alarmHrs) || isNaN(alarmMin) || isNaN(alarmSec)) {
        alert('Please enter valid time.');
        return;
    }

    const alarmTime = `${alarmHrs}:${alarmMin.toString().padStart(2, '0')}:${alarmSec.toString().padStart(2, '0')} ${alarmPeriod}`;

    alarms.push(alarmTime);
    displayAlarmsList();
});

// display alarms
function displayAlarmsList() {
    const alarmsList = document.getElementById('alarms-list');
    alarmsList.innerHTML = '';

    alarms.map((alarm, idx) => {
        let alarmDiv = document.createElement("div");
        alarmDiv.classList.add("alarm");
        alarmDiv.innerHTML = `
        	<span>
        	${alarm}
        	</span>
        	<button class="delete-alarm">
        	Delete
        	</button>
        `;

        alarmDiv
            .querySelector(".delete-alarm")
            .addEventListener("click", () => {
                alarmDiv.remove();
                if (idx !== -1) {
                    alarms.splice(idx, 1);
                }
            });

        alarmsList.appendChild(alarmDiv);
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
