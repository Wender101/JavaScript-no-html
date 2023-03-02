// Como ordenar a chegada das informações

function rand(min = 1000, max = 3000) {
    const num = Math.random() * (max - min) + min;
    return Math.floor(num);
}

function f1(callback) {
    setTimeout(function() {
        console.log('f1');
        if (callback) callback();
    }, rand());
}

function f2(callback) {
    setTimeout(function() {
        console.log('f2');
        if (callback) callback();
    }, rand());
}

function f3(callback) {
    setTimeout(function() {
        console.log('f3');
        if (callback) callback();
    }, rand());
}

function f4(callback) {
    setTimeout(function() {
        console.log('f4');
        if (callback) callback();
    }, rand());
}

function f5(callback) {
    setTimeout(function() {
        console.log('f5');
        if (callback) callback();
    }, rand());
}

function f6(callback) {
    setTimeout(function() {
        console.log('f6');
        if (callback) callback();
    }, rand());
}
 
// Callback, ordenando o código
// 1º forma
f1(function() {
    f2(function() {
        // 2º forma
        f3(f3Callback);
        function f3Callback() {
            f4(f4Callback);
        }

        function f4Callback() {
            f5(f5Callback);
        }

        function f5Callback() {
            f6(f6Callback);
        }

        function f6Callback() {
            console.log('Olá Mundo!');
        }
    });
});

