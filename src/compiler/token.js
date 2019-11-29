/**
 * @param type 记号类型
 * @param lexeme 构成记号的字符串
 * @param value 记号为常数时的值 
 */
export default function Token(type, lexeme, value) {
    this.type = type;
    this.lexeme = lexeme;
    this.value = value;
}

Token.prototype.setType = function(type) {
    this.type = type;
}

Token.prototype.getType = function() {
    return this.type;
}

Token.prototype.setLexeme = function(lexeme) {
    this.lexeme = lexeme;
}

Token.prototype.getLexeme = function() {
    return this.lexeme;
}

Token.prototype.setValue = function(value) {
    this.value = value;
}

Token.prototype.getValue = function() {
    return this.value;
}