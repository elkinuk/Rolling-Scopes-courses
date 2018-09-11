module.exports = function multiply(first, second) {
    let result = [];
    let sum = [];
    let save = 0;
    first = first.split('').reverse();
    second = second.split('').reverse();
    for(let i=0;i<first.length + second.length;i++)
        result[i] = 0;

    for(let i = 0; i < second.length; i++){
        let row = [];
        for(let j = 0; j < first.length; j++)
            row.push(first[j] * second[i]);
        sum[i] = row;
    }

    for (let i = 0; i < second.length; i++)
        for (let j = 0; j < first.length; j++)
            result[i+j] += sum[i][j];

    for (let i = 0; i < result.length; i++) {
        result[i] += save;
        save = Math.floor(result[i] / 10);
        result[i] = result[i] % 10;
    }

    if(result[result.length-1]==0)
        result.pop();

    return result.reverse().join('');
}
