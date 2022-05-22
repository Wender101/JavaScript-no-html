function numero(x) {
    let tres = x / 3
    let cinco = x / 5

    if(Number.isInteger(tres) == true && Number.isInteger(cinco) == false) {
        return 'Fizz'

    } else if(Number.isInteger(tres) == false && Number.isInteger(cinco) == true) {
        return 'Buzz'

    } else if(Number.isInteger(tres) == true && Number.isInteger(cinco) == true) {
        return 'FizzBuzz'

    } else {
        return x
    }
}

for(let c = 0; c <= 100; c++) {
    console.log(c, numero(c));
}