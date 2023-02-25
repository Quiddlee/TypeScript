// type AddFn = (a: number, b: number) => number;
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number): number => {
    return n1 + n2;
};

interface Named {
    readonly name?: string;
    outputName?: string;
}

interface Greetable extends Named {
    name?: string;
    greet(phrase: string): void;
}

class Person implements Greetable {
    constructor(
        public name?: string,
        public age: number = 18,
        public outputName: string = '...',
    ) {
        if (name) {
            this.name = name;
        }
    }
    
    greet(phrase: string) {
        if (this.name) {
            console.log(`${phrase} ${this.name}`);
        }
        else {
            console.log('Hi!');
        }
    }
}

let user1: Greetable;

user1 = new Person();

user1.greet('Hi there - I am');

console.log(user1);