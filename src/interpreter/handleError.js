/** 
 * @param lineNo 错误所在行
 * @param desc 错误描述
 * @param lexeme 涉及的符号
 */

const errMsg = (lineNo, desc, lexeme) => {
    const msg = `Line No ${lineNo}: ${desc} ${lexeme}`;  
    console.log(msg); 
}

export const syntaxError = (case_of, scanner, token) => {
    switch(case_of) {
        case 1:
            errMsg(scanner.lineNo, " Error Token ", token.getLexeme());
            break;
        case 2:
            errMsg(scanner.lineNo, " Error Token ", token.getLexeme());
            break;
        default:
            console.log("Error occured!")
    }
}