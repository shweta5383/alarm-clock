let alarms = [];
const current_time = document.getElementById("time");

// display current time
function displayCurrentTime() {
    const now = new Date();
    const hrs = now.getHours() % 12 || 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const period = now.getHours() < 12 ? 'AM' : 'PM';

    current_time.textContent = `${hrs}:${min}:${sec} ${period}`;
}

// set alarm
document.getElementById('set-alarm-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const alarmHrs = parseInt(document.getElementById('alarm-hrs').value);
    const alarmMin = parseInt(document.getElementById('alarm-min').value);
    const alarmSec = parseInt(document.getElementById('alarm-sec').value);
    const alarmPeriod = document.getElementById('alarm-period').value;

    const alarmTime = new Date();
    alarmTime.setHours(alarmHrs + (alarmPeriod === 'PM' ? 12 : 0));
    alarmTime.setMinutes(alarmMin);
    alarmTime.setSeconds(alarmSec);

    alarms.push(alarmTime);
    displayAlarmsList();
});

// display alarms
function displayAlarmsList() {
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
                if (index !== -1) {
                    alarms.splice(index, 1);
                }
            });

        alarmsList.appendChild(alarmDiv);
    });
}

// set interval to update time every second
setInterval(displayCurrentTime, 1000);

//check for alarms every second
setInterval(() => {
    const now = new Date();
    alarms.map((alarm, index) => {
        if (now.getTime() >= alarm.getTime()) {
            alert(`Alarm Ringing!`);
            alarms.splice(index, 1);
            displayAlarmsList();
        }
    });
}, 1000);
