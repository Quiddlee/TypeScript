abstract class Department {
    static fiscalYear = 2023;
    // private reaonly id: string;
    // private name: string;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        // this.id = 'd2';
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartmant extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');    
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`)
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }

        throw new Error('No report found.');
    }
    
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        
        this.addReports(value);
    }
        
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
        console.log(Department.fiscalYear);
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }

        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }

    addEmployee(name: string) {
        if (name === 'Bogdan') {
            return;
        }

        this.employees.push(name); 
    }

    addReports(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee('Bogdan');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartmant('id', ['Bogdan']);

it.addEmployee('Bogdan');
it.addEmployee('Menu');

// it.employees[2] = 'Anna'; 

it.describe();
it.name = 'New name';
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);

accounting.mostRecentReport = 'Year End Report';
accounting.addReports('Something went wrong...');
console.log(accounting.mostRecentReport);

accounting.addEmployee('Bogdan');
accounting.addEmployee('Menu');

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name: 's', describe: accounting.describe };

// accountingCopy.describe();