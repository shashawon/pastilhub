// ========== CALENDAR FUNCTIONS ==========

console.log("CALENDAR JS LOADED");

let calendarViewMode = 'day';
let currentCalendarDate = new Date();
let selectedCalendarDate = new Date().toISOString().split('T')[0];

// function getOrdersByDate(dateStr) {
//   return (orders || []).filter(order => {
//     if (!order || !order.timestamp) return false;

//     const d = new Date(order.timestamp);
//     if (isNaN(d.getTime())) return false;

//     return d.toISOString().split("T")[0] === dateStr;
//   });
// }

function getOrdersByDate(dateStr) {
  return (orders || []).filter(order => {
    if (!order.timestamp) return false;

    const d = new Date(Number(order.timestamp));
    if (isNaN(d.getTime())) return false;

    return d.toISOString().split("T")[0] === dateStr;
  });
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let calendarDays = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(`<div class="calendar-day"></div>`);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasOrders = getOrdersByDate(dateStr).length > 0;
        const isSelected = selectedCalendarDate === dateStr;
        calendarDays.push(`<div class="calendar-day ${hasOrders ? 'has-orders' : ''} ${isSelected ? 'selected' : ''}" onclick="selectCalendarDate('${dateStr}')">${day}</div>`);
    }
    
    return `
        <div class="calendar-container">
            <div class="calendar-header">
                <div class="calendar-nav">
                    <button onclick="changeCalendarMonth(-1)">◀</button>
                    <button onclick="changeCalendarMonth(1)">▶</button>
                </div>
                <div class="calendar-month-year">${firstDayOfMonth.toLocaleString('default', { month: 'short' })} ${year}</div>
                <button onclick="resetCalendarToToday()" style="font-size:8px;padding:2px 6px;">Today</button>
            </div>
            <div class="calendar-weekdays">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div class="calendar-days">${calendarDays.join('')}</div>
        </div>
    `;
}

function renderOrdersBySelectedDate() {
    const ordersOnDate = getOrdersByDate(selectedCalendarDate);
    if (ordersOnDate.length === 0) {
        return `<div><p style="text-align:center;font-size:11px;padding:10px;">No orders on ${selectedCalendarDate}</p></div>`;
    }
    return `
        <div>
            <h4 style="font-size:11px;margin-bottom:5px;">Orders for ${selectedCalendarDate}</h4>
            <table class="admin-table">
                <thead><tr><th>Order</th><th>Customer</th><th>Total</th></tr></thead>
                <tbody>${ordersOnDate.map(o => `<tr><td style="font-size:10px">${o.orderNumber}</td><td style="font-size:10px">${o.customer}</td><td style="font-size:10px">₱${o.total}</td></tr>`).join('')}</tbody>
            </table>
        </div>
    `;
}

window.changeCalendarMonth = (delta) => { 
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta); 
    currentCalendarDate = new Date(currentCalendarDate); 
    render(); 
};

window.resetCalendarToToday = () => { 
    currentCalendarDate = new Date(); 
    selectedCalendarDate = currentCalendarDate.toISOString().split('T')[0]; 
    render(); 
};

window.selectCalendarDate = (dateStr) => { 
    selectedCalendarDate = dateStr; 
    render(); 
};

window.setCalendarView = (mode) => { 
    calendarViewMode = mode; 
    render(); 
};