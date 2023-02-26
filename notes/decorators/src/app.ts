function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function<T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template');
                const hookEl = document.querySelector(`#${hookId}`);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

// @Logger('LOGGIN - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Max';

    constructor() {
        console.log('Creating person object...');
    }
}

// const pers = new Person();

// console.log(pers);

// ---

function Log(target: any, propertyName: string | symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessors decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor); 
}

function Log4(target: any, name: string | symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position); 
}

class Product {
    @Log
    title: string;

    constructor(title: string, private _price: number) {
        this.title = title;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
    
    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - should be positive!');
        }
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };  
    return adjustedDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button') as HTMLButtonElement;
button.addEventListener('click', p.showMessage);

// ---

interface ValidatorConfig {
    [Property: string]: {
        [validatebleProp: string]: string[]; // ['required', 'positive']
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    }; 
}   

function Validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }

    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch(validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break
            }
        }
    }

    return isValid;
}   

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }
}

const courseForm = document.querySelector('form') as HTMLFormElement;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.querySelector('#title') as HTMLInputElement;
    const priceEl = document.querySelector('#price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!Validate(createdCourse)) {
        alert('Invalid inptu, please try again!');
        return;
    }
    console.log(createdCourse);
});
