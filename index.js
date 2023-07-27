// Creates a new employee record object based on the input array.
// The array must contain [firstName, familyName, title, payPerHour].
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],  // Array to store TimeIn events
      timeOutEvents: []  // Array to store TimeOut events
    };
  }
  
  // Creates an array of employee records using the provided array of arrays.
  // Each sub-array should represents an employee's data [firstName, familyName, title, payPerHour].
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
  }
  
  // Adds a Time-In event to an employee's record.
  // dateStamp is a string with the format "YYYY-MM-DD HH:MM".
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({ type: "TimeIn", date: date, hour: parseInt(hour, 10) })
    return employee
  }
  
  // Adds a Time-Out event to an employee's record.
  // dateStamp is a string with the format "YYYY-MM-DD HH:MM".
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({ type: "TimeOut", date: date, hour: parseInt(hour, 10) })
    return employee
  }
  
  // Calculates the hours worked by an employee on a specific date.
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date).hour
    const timeOut = employee.timeOutEvents.find(event => event.date === date).hour
    return (timeOut - timeIn) / 100 // The hour is stored as a 24-hour integer (e.g., 800, 1700)
  }
  
  // Calculates the wages earned by an employee on a specific date.
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour
  }
  
  // Calculates the total wages earned by an employee for all dates worked.
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date)
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
  }
  
  // Calculates the total payroll cost for all employees in the provided array.
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
  }
  