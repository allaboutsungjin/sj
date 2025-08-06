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
    item.style.display = "block";  // Show all videos
  });

  // Clear the active class from any tag filters
  const tags = activeTab.querySelectorAll(".tc span");
  tags.forEach(tag => tag.classList.remove('active'));
}


// Calendar
const events = {
    '2025-08-05': `'6DAYS' VIP Screening`,
    '2025-08-13': `'6DAYS' Movie`,
    '2025-08-16': `'6DAYS' Stage Greetings`,
    '2025-08-30': `10th Anniversary Tour <The DECADE> in Goyang`,
    '2025-08-31': `10th Anniversary Tour <The DECADE> in Goyang`,
    '2025-09-07': `4TH FULL ALBUM <The DECADE>`,
    '2025-09-07': `DAY6 10TH ANNIVERSARY 🎉`,
    '2025-09-17': `10th Anniversary Tour <The DECADE> in Bangkok`,
    '2025-10-18': `10th Anniversary Tour <The DECADE> in Ho Chi Minh`,
    '2026-01-17': `10th Anniversary Tour <The DECADE> in Hong Kong`,
    '2026-01-24': `10th Anniversary Tour <The DECADE> in Manila`,
    '2026-01-31': `10th Anniversary Tour <The DECADE> in Kuala Lumpur`,
    // Add more events as needed
};

let currentMonth = new Date().getMonth();  // Current month (0-based index)
let currentYear = new Date().getFullYear();  // Current year
let todayDate = new Date().getDate();
let todayMonth = new Date().getMonth();
let todayYear = new Date().getFullYear();

function generateCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    const calendarMonth = document.getElementById('calendar-month');
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0);
    const firstDay = firstDayOfMonth.getDay(); // Day of the week the month starts on (0-6)
    const lastDay = lastDateOfMonth.getDate(); // Last date of the month

    // Update the header month
    calendarMonth.textContent = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${year}`;

    // Clear the existing calendar body
    calendarBody.innerHTML = '';

    let dayCount = 1;
    for (let i = 0; i < 6; i++) { // 6 weeks (rows)
        let row = document.createElement('tr');

        // Fill each day of the week
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');

            // Skip empty cells before the start of the month
            if (i === 0 && j < firstDay) {
                row.appendChild(cell);
            } else if (dayCount <= lastDay) {
                const dayString = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayCount.toString().padStart(2, '0')}`;

                // Highlight SUNGJIN'S birthday similar to today
                if ((month === 0 && dayCount === 16)) {
                    cell.classList.add('birthday');
                    cell.innerHTML = `${dayCount}<br><br>`;
                    const eventInfo = document.createElement('div');
                    eventInfo.classList.add('event-info');
                    eventInfo.textContent = events[dayString];
                    cell.appendChild(eventInfo);
                } else {
                    cell.textContent = dayCount;

                    // Add event info if the day has an event
                    if (events[dayString]) {
                        const eventInfo = document.createElement('div');
                        eventInfo.classList.add('event-info');
                        eventInfo.textContent = events[dayString];
                        cell.innerHTML = `${dayCount}<br><br>`;
                        cell.appendChild(eventInfo);
                    }

                    // Highlight today's date
                    if (year === todayYear && month === todayMonth && dayCount === todayDate) {
                        cell.classList.add('today');
                        cell.innerHTML = `Today<br><br>${dayCount}<br><br>`;
                        // Attach event text if exists
                        if (events[dayString]) {
                            const eventInfo = document.createElement('div');
                            eventInfo.classList.add('event-info');
                            eventInfo.textContent = events[dayString];
                            cell.appendChild(eventInfo);
                        }
                    }
                }

                row.appendChild(cell);
                dayCount++;
            }
        }

        calendarBody.appendChild(row);
    }

    // Disable the "Prev Month" button if the selected month is the current month
    document.getElementById('prev-month').disabled = (month === todayMonth && year === todayYear);
}

// Load the current month on page load
generateCalendar(currentMonth, currentYear);

// Button listeners for Prev and Next month
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

function updateEventList(month, year) {
    const eventList = document.getElementById('event-items');
    eventList.innerHTML = ''; // Clear existing events

    const monthEvents = Object.entries(events).filter(([date, _]) => {
        const eventDate = new Date(date);
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    if (monthEvents.length === 0) {
        const listItem = document.createElement('li');
        listItem.innerHTML = "No events this month";
        eventList.appendChild(listItem);
    } else {
        monthEvents.forEach(([date, name]) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${date}: ${name}<br><br>`;
            eventList.appendChild(listItem);
        });
    }
}

function listEvents(events, month, year) {
    const eventList = document.getElementById('event-items');
    eventList.innerHTML = '';

    // Filter and sort events by date
    const monthEvents = Object.entries(events)
        .filter(([date]) => {
            const eventDate = new Date(date);
            return eventDate.getMonth() === month && eventDate.getFullYear() === year;
        })
        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));

    // Check if no events are found
    if (monthEvents.length === 0) {
        const listItem = document.createElement('li');
        listItem.innerHTML = "No events this month";
        eventList.appendChild(listItem);
        return;
    }

    // Display events
    monthEvents.forEach(([date, description]) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${new Intl.DateTimeFormat("en-US", { dateStyle: 'long' }).format(new Date(date))}: ${description}<br><br>`;
        eventList.appendChild(listItem);
    });
}

// Call this function inside generateCalendar:
generateCalendar(currentMonth, currentYear);
listEvents(events, currentMonth, currentYear);

