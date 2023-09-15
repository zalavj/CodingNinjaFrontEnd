const clockFace = document.getElementById('time');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const ampmInput = document.getElementById('ampm');
const setAlarmButton = document.getElementById('setAlarm');
const alarmList = document.getElementById('alarmList');
const alarms = [];


function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedTime = `${hours % 12}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;
    clockFace.textContent = formattedTime;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

// Update the clock every second
setInterval(updateClock, 1000);


setAlarmButton.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    const ampm = ampmInput.value;

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert('Invalid time. Please enter valid numbers.');
        return;
    }

    // Convert time to 24-hour format
    const alarmTime = convertTo24HourFormat(hours, minutes, seconds, ampm);

    // Add the alarm to the alarms array
    alarms.push(alarmTime);

    // Display the updated alarms list
    displayAlarms();
});

function convertTo24HourFormat(hours, minutes, seconds, ampm) {
    if (ampm === 'PM' && hours !== 12) {
        hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
    }
    return { hours, minutes, seconds };
}



function displayAlarms() {
    alarmList.innerHTML = ''; // Clear the existing list

    alarms.forEach((alarm, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${padZero(alarm.hours)}:${padZero(alarm.minutes)}:${padZero(alarm.seconds)} 
                            <button class="delete-button" data-index="${index}">Delete</button>`;
        alarmList.appendChild(listItem);

        // Attach a click event listener to each delete button
        const deleteButton = listItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteAlarm(index);
        });
    });
}


function deleteAlarm(index) {
    alarms.splice(index, 1);
    displayAlarms();
}


function checkAlarms() {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();

    alarms.forEach((alarm, index) => {
        if (
            alarm.hours === currentHours &&
            alarm.minutes === currentMinutes &&
            alarm.seconds === currentSeconds
        ) {
            alert(`Alarm triggered at ${padZero(currentHours)}:${padZero(currentMinutes)}:${padZero(currentSeconds)}`);
            deleteAlarm(index); // Remove the triggered alarm
        }
    });
}

// Check for alarms every second
setInterval(checkAlarms, 1000);
