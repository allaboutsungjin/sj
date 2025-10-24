// Toggle menu for mobile
function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const tab = event.target.getAttribute('data-tab');

        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        event.target.classList.add('active');

        // Hide all tab contents
        tabContents.forEach(content => content.classList.remove('active'));

        // Show the clicked tab content
        document.getElementById(tab).classList.add('active');

        // Clear filters when changing tabs
        resetFilters(tab);
    });
});

// Video - Filter via tag cloud
function resetFilters(tabId) {
    const activeTab = document.getElementById(tabId);
    const videoItems = activeTab.querySelectorAll(".video-item");
    videoItems.forEach(item => {
        item.style.display = "block"; // Show all videos
    });

    // Clear the active class from any tag filters
    const tags = activeTab.querySelectorAll(".tc span");
    tags.forEach(tag => tag.classList.remove('active'));
}

// Calendar data
const events = {
    '2025-09-01': [
        `DAY6 is 10 Teaser`,
        `10th Anniversary Medley Live`,
        `DAY6.zip : The Home of Our Decade`
    ],
    '2025-09-02': [
        `DAY6 10th Anniversary Documentary Teaser`,
        `DAY6.zip : The Home of Our Decade`
    ],
    '2025-09-03': [
        `DAY6 4TH FULL ALBUM The DECADE Album Sampler`,
        `DAY6.zip : The Home of Our Decade`
    ],
    '2025-09-04': [
        `DAY6 4TH FULL ALBUM The DECADE Track 2 MV Teaser 2`,
        `DAY6.zip : The Home of Our Decade`
    ],
    '2025-09-05': [
        `DAY6 4TH FULL ALBUM The DECADE Release`,
        `DAY6 4TH FULL ALBUM The DECADE Comeback Live`,
        `DAY6 4TH FULL ALBUM The DECADE Track 2 MV`,
        `DAY6.zip : The Home of Our Decade`
    ],
    '2025-09-06': [
        `DAY6 4TH FULL ALBUM The DECADE Track 1 MV`,
        `DAY6.zip : The Home of Our Decade`
    ],
    '2025-09-07': [
        `DAY6 10TH ANNIVERSARY 🎉`,
        `10th Anniversary Special Live`,
        `DAY6 is 10 EP.1`,
        `DAY6.zip : The Home of Our Decade`
    ],
    '2025-09-08': `DAY6 4TH FULL ALBUM The DECADE Track 2 Live Clip`,
    '2025-09-09': `10th Anniversary Documentary`,
    '2025-09-10': `DAY6 4TH FULL ALBUM The DECADE Track 1 Live Clip`,
    '2025-09-12': `DAY6 4TH FULL ALBUM The DECADE Track 10 MV`,
    '2025-09-14': `DAY6 is 10 EP.2`,
    '2025-09-15': `LIVE CLIP with My Day 1`,
    '2025-09-16': `LIVE CLIP with My Day 2`,
    '2025-09-17': [
        `LIVE CLIP with My Day 3`,
        `10th Anniversary Tour <The DECADE> in Bangkok`
    ],
    '2025-09-18': `LIVE CLIP with My Day 4`,
    '2025-09-19': `LIVE CLIP with My Day 5`,
    '2025-10-18': `10th Anniversary Tour <The DECADE> in Ho Chi Minh`,
    '2025-10-22': `The Game Caterers X JYP EP.1 TVN`,
    '2025-10-23': `The Game Caterers X JYP EP.1 Full Version YouTube`,
    '2025-10-29': `The Game Caterers X JYP EP.2 TVN`,
    '2025-10-30': `The Game Caterers X JYP EP.2 Full Version YouTube`,
    '2025-11-01': `Johnnie Walker X DAY6 Pop Up Store`,
    '2025-11-02': `Johnnie Walker X DAY6 Pop Up Store`,
    '2026-01-17': `10th Anniversary Tour <The DECADE> in Hong Kong`,
    '2026-01-18': `10th Anniversary Tour <The DECADE> in Hong Kong`,
    '2026-01-24': `10th Anniversary Tour <The DECADE> in Manila`,
    '2026-01-31': `10th Anniversary Tour <The DECADE> in Kuala Lumpur`
};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let todayDate = new Date().getDate();
let todayMonth = new Date().getMonth();
let todayYear = new Date().getFullYear();

function generateCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    const calendarMonth = document.getElementById('calendar-month');
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0);
    const firstDay = firstDayOfMonth.getDay();
    const lastDay = lastDateOfMonth.getDate();

    calendarMonth.textContent = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${year}`;
    calendarBody.innerHTML = '';

    let dayCount = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                row.appendChild(cell);
            } else if (dayCount <= lastDay) {
                const dayString = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayCount.toString().padStart(2, '0')}`;
                cell.innerHTML = dayCount;

                if (events[dayString]) {
                    cell.innerHTML = `${dayCount}<br><br>`;
                    let eventArray = Array.isArray(events[dayString]) ? events[dayString] : [events[dayString]];
                    eventArray.forEach(ev => {
                        const eventInfo = document.createElement('div');
                        eventInfo.classList.add('event-info');
                        eventInfo.textContent = ev;
                        cell.appendChild(eventInfo);
                    });
                }

                if (year === todayYear && month === todayMonth && dayCount === todayDate) {
                    cell.classList.add('today');
                }

                row.appendChild(cell);
                dayCount++;
            }
        }

        calendarBody.appendChild(row);
    }

    document.getElementById('prev-month').disabled = (month === todayMonth && year === todayYear);
}

function listEvents(events, month, year) {
    const eventList = document.getElementById('event-items');
    eventList.innerHTML = '';

    const monthEvents = Object.entries(events)
        .filter(([date]) => {
            const eventDate = new Date(date);
            return eventDate.getMonth() === month && eventDate.getFullYear() === year;
        })
        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));

    if (monthEvents.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = "No events this month";
        eventList.appendChild(listItem);
        return;
    }

    monthEvents.forEach(([date, descriptions]) => {
        let eventArray = Array.isArray(descriptions) ? descriptions : [descriptions];
        eventArray.forEach(desc => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${new Intl.DateTimeFormat("en-US", { dateStyle: 'long' }).format(new Date(date))}: ${desc}<br><br>`;
            eventList.appendChild(listItem);
        });
    });
}

// Initial load
generateCalendar(currentMonth, currentYear);
listEvents(events, currentMonth, currentYear);

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
    listEvents(events, currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
    listEvents(events, currentMonth, currentYear);
});



