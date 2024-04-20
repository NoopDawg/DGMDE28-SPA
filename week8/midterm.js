
const randomNumbers = [1, 1, 1, 1, 1, 1].map(function(one) { return Math.floor(Math.random()*50) + one})

console.log(randomNumbers)

const max = randomNumbers.reduce((a,b)=> {return a>b ? a: b})

console.log(max)


class Student {
    constructor(name, grade){
        this.name = name;
        this.grade = grade;
    }

    gradeAverage(){
        const sum = this.grade.reduce(function(a,b){return a+b})
        return sum/this.grade.length
    }

    show(){
        return `The student, ${this.name}, has a grade average of:` + this.gradeAverage()
    }
}