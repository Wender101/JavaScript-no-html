// Funções recursivas, são funções que se chamam de volta. OBS: ela tem que ter um final ou vai dar ruim.
function recursiva(max) {
    if(max >= 10) return;
    max++;
    console.log(max);
    recursiva(max)
}
recursiva(-10)