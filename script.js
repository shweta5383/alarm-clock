let alarms = [];
let currentAlarmIndex = 0;

// display current time
function displayTime() {
    const now = new Date();
    const hrs = now.getHours() % 12 || 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const period = now.getHours() < 12 ? 'AM' : 'PM';

    time.textContent = `${hrs}:${min}:${sec} ${period}`;
}

// set interval to update time every second
setInterval(displayTime, 1000);

// set alarm
document.getElementById('set-alarm-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const alarmHours = parseInt(document.getElementById('alarm-hours').value);
    const alarmMinutes = parseInt(document.getElementById('alarm-minutes').value);
    const alarmSeconds = parseInt(document.getElementById('alarm-seconds').value);
    const alarmAmPm = document.getElementById('alarm-am-pm').value;

    const alarmTime = new Date();
    alarmTime.setHours(alarmHours + (alarmAmPm === 'PM' ? 12 : 0));
    alarmTime.setMinutes(alarmMinutes);
    alarmTime.setSeconds(alarmSeconds);

    alarms.push(alarmTime);
    console.log(alarms);
    displayAlarms();
});

// display alarms
function displayAlarms() {
    const alarmsList = document.getElementById('alarms-list');
    alarmsList.innerHTML = '';

    alarms.map((alarm, index) => {
        let alarmDiv = document.createElement("div");
        alarmDiv.classList.add("alarm");
        alarmDiv.innerHTML = `
        	<span>
        	${alarm.toLocaleTimeString()}
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
                    alarms.splice(index, 1);
                }
            });

        alarmsList.appendChild(alarmDiv);
    });
}

// // check for alarms every second
setInterval(() => {
    const now = new Date();
    alarms.forEach((alarm, index) => {
        if (now.getTime() >= alarm.getTime()) {
            alert(`Alarm: ${alarm.toLocaleTimeString()}`);
            alarms.splice(index, 1);
            displayAlarms();
        }
    });
}, 1000);