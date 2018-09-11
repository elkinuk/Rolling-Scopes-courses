module.exports = function check(str, bracketsConfig) {
    if (str.length % 2 != 0) return false;
    let string = str.split('');
    let stack = [];
    for(let i = 0; i < str.length; i++){
        for(let j = 0; j < bracketsConfig.length; j++){
            if (string[i] == bracketsConfig[j][1] && stack[stack.length - 1] == bracketsConfig[j][0])
                    stack.pop();
            else if (string[i] == bracketsConfig[j][0])
                stack.push(string[i]);
        }
    }
    return stack.length == 0 ? true : false;
}
