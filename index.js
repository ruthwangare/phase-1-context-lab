function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }

  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord);
  }

  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }

  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(
      event => event.date === date
    );
    const timeOut = employeeRecord.timeOutEvents.find(
      event => event.date === date
    );
    return (timeOut.hour - timeIn.hour) / 100;
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }

  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce(
      (totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date),
      0
    );
  }

  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(
      (totalPayroll, employeeRecord) => totalPayroll + allWagesFor(employeeRecord),
      0
    );
  }

  const employeeArray = ["John", "Doe", "Manager", 25];
  const employeeRecord = createEmployeeRecord(employeeArray);

  console.assert(
    employeeRecord.firstName === "John",
    "First name should be John"
  );

  console.assert(
    employeeRecord.familyName === "Doe",
    "Family name should be Doe"
  );

  console.assert(
    employeeRecord.title === "Manager",
    "Title should be Manager"
  );

  const employeeRecords = [employeeRecord];

  createTimeInEvent(employeeRecord, "2023-04-01 09:00");
  createTimeOutEvent(employeeRecord, "2023-04-01 17:00");

  console.assert(
    hoursWorkedOnDate(employeeRecord, "2023-04-01") === 8,
    "Hours worked on 2023-04-01 should be 8"
  );

  console.assert(
    wagesEarnedOnDate(employeeRecord, "2023-04-01") === 200,
    "Wages earned on 2023-04-01 should be 200"
  );

  console.assert(
    allWagesFor(employeeRecord) === 200,
    "Total wages earned should be 200"
  );

  const payroll = calculatePayroll(employeeRecords);

  console.assert(
    payroll === 200,
    "Total payroll should be 200"
  );

  function createTimeInEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const [hour, minute] = time.split(':');

    const timeInEvent = {
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date,
    };

    this.timeInEvents.push(timeInEvent);
    return timeInEvent;
  }
  createTimeInEvent.call(employeeObject, "2023-04-10 14:30");

