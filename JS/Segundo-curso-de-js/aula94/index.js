const objA = {
    chaveA: 'A'
}

const objB = {
    chaveB: 'B'
}

const objC = new Object()
objC.chaveC = 'C'

Object.setPrototypeOf(objB, objA)
Object.setPrototypeOf(objC, objB)
console.log(objC.chaveA)