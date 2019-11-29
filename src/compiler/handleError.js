/** 
 * @param lineNo 错误所在行
 * @param desc 错误描述
 * @param lexeme 涉及的符号
 */
const errMsg = (lineNo, desc, lexeme) => {
    const msg = `Line No ${lineNo}: ${desc} ${lexeme}`;   
}