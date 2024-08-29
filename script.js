const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

document.addEventListener('DOMContentLoaded', function() {
    loadCalendar();
    
    document.getElementById('prev-month').addEventListener('click', () => {
        changeMonth(-1);
    });

    document.getElementById('next-month').addEventListener('click', () => {
        changeMonth(1);
    });

    document.getElementById('add-event').addEventListener('click', addEvent);
});

function loadCalendar() {
    const monthNameElement = document.getElementById('month-name');
    const calendarDaysElement = document.getElementById('calendar-days');

    monthNameElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    calendarDaysElement.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        calendarDaysElement.innerHTML += '<div></div>';
    }

    for (let day = 1; day <= lastDate; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.addEventListener('click', () => selectDate(day));
        calendarDaysElement.appendChild(dayElement);
    }
}

function changeMonth(direction) {
    currentMonth += direction;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    loadCalendar();
}

function selectDate(day) {
    const selectedElements = document.querySelectorAll('#calendar-days .selected');
    selectedElements.forEach(element => element.classList.remove('selected'));

    const selectedElement = document.querySelector(`#calendar-days div:nth-child(${day + new Date(currentYear, currentMonth, 1).getDay()})`);
    selectedElement.classList.add('selected');

    selectedDate = new Date(currentYear, currentMonth, day);
    document.getElementById('event-date').value = selectedDate.toISOString().split('T')[0];
}

function addEvent() {
    const eventDate = document.getElementById('event-date').value;
    const eventName = document.getElementById('event-name').value;

    if (eventDate && eventName) {
        const eventList = document.getElementById('event-list');
        const eventItem = document.createElement('li');
        eventItem.textContent = `${eventDate}: ${eventName}`;
        eventList.appendChild(eventItem);
    }
}