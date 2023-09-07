// Your code here

const createEmployeeRecord = (employeeInformation) => {
    return ({
        firstName: employeeInformation[0],
        familyName: employeeInformation[1],
        title: employeeInformation[2],
        payPerHour: employeeInformation[3],
        timeInEvents: [],
        timeOutEvents: [],
    })
};

const createEmployeeRecords = (listOfEmplyees) => {
    return listOfEmplyees.map(employeeInformation => createEmployeeRecord(employeeInformation));
};

const createTimeInEvent = (employeeRecord, dateStamp) => {
    const [day, time] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push ({
        type: "TimeIn",
        hour: parseInt(time),
        date: day,
    });

    return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {
    const [day, time] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push ({
        type: "TimeOut",
        hour: parseInt(time),
        date: day,
    });

    return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, givenDay) => {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === givenDay);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === givenDay);

    return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = (employeeRecord, givenDay) => 
hoursWorkedOnDate(employeeRecord, givenDay) * employeeRecord.payPerHour;

const allWagesFor = (employeeRecord) => {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    return dates.reduce((accumulator, date) => accumulator + wagesEarnedOnDate(employeeRecord, date), 0)
};

const calculatePayroll = employeeRecords => 
    employeeRecords.reduce((accumulator, employeeRecord) => 
    accumulator + allWagesFor(employeeRecord), 0)