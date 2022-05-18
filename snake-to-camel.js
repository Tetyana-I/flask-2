// Function snakeToCamel()  takes a string (variable name) in snake_case
//  and returns a string with that variable name written in camelCase

function snakeToCamel(str) {
    let res = str.split('_');
    let camelStr = res[0];
    for (let i=1; i<res.length; i++) {
        camelStr = camelStr + res[i][0].toUpperCase()+ res[i].slice(1);
    }
    return camelStr;
}


