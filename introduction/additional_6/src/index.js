module.exports = function zeros(expression) {
    console.log('---'+expression+'---');
    let arr = [];
    let count5 = 0, count2 = 0;
    for(let i=0;i<3;i++) arr[i]=[];
    expression = expression.split('*');

    for(let i=0;i<expression.length;i++){
        if (expression[i].search(/!!$/) != -1){
            expression[i] = Number(expression[i].replace('!!',''));
            if(expression[i]%2==0) arr[1].push(expression[i]);
            else arr[2].push(expression[i]);
        }
        else arr[0].push(Number(expression[i].replace('!','')));
    }

    for(let i=0;i < Math.max(arr[2].length,arr[1].length,arr[0].length);i++){
    	if(i<arr[0].length){//простой
    		count5 += Math.floor(arr[0][i]/5)+Math.floor(arr[0][i]/25);
    		count2 += Math.floor(arr[0][i]/2);
    	}
    	if(i<arr[1].length){//четный
    		count5 +=Math.floor(arr[1][i]/10)+Math.floor(arr[1][i]/50);
    		count2 += arr[1][i]/2;

    	}
    	if(i<arr[2].length){//нечетный
    		count5 += Math.floor(arr[2][i]/5)-Math.floor(arr[2][i]/10);
    	    if(arr[2][i]>=25) count5++;
            if(arr[2][i]>=75) count5++;
    	}
    }
    return Math.min(count5,count2);
}
