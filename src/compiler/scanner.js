import * as TokenDict from './tokenDict';
import Token from './token';
import * as TokenTypes from './tokenType';
import { LETTER, NUMBER, EMPTYSPACE } from './charLibrary';

export default function Scanner(code) {
    this.code = code;  //源程序代码
    this.lineNo = 1;  //行号
    this.tokenBuffer = "";  //字符缓冲区
    //this.bufferSize = 100;
}

Scanner.prototype.getChar = function () {
    if (!this.code.length) {
        return "";
    }
    const char = this.code.charAt(0);
    this.code = this.code.slice(1);
    return char;
}

Scanner.prototype.backChar = function (char) {
    this.code = char + this.code;
}

Scanner.prototype.addToBuffer = function (char) {
    this.tokenBuffer += char;
}

Scanner.prototype.clearBuffer = function () {
    this.tokenBuffer = "";
};

Scanner.prototype.checkKeyToken = function (lexeme) {
    const tokenDict = TokenDict.tokenDict;
    for (let i = 0, len = tokenDict.length; i < len; i++) {
        if (lexeme === tokenDict[i].getLexeme()) {
            return tokenDict[i];
        }
    }
    return new Token(TokenTypes.ERRTOKEN, "", 0);
}

Scanner.prototype.getToken = function () {
    this.clearBuffer();
    let token = new Token(TokenTypes.ERRTOKEN, "", 0),
        char = "";

    while (true) {
        char = this.getChar();
        if (char === "") {
            token.setType(TokenTypes.NONTOKEN);
            return token;
        }
        if (char === "\n") {
            this.lineNo++;
        }
        if (!EMPTYSPACE.includes(char)) {
            break;
        }
    }
    this.addToBuffer(char);
    if (LETTER.includes(char)) {
        while (true) {
            char = this.getChar();
            if (char && (LETTER.includes(char) || NUMBER.includes(char))) {
                this.addToBuffer(char);
            } else {
                break;
            }
        }
        this.backChar(char);
        token = this.checkKeyToken(this.tokenBuffer);
        token.setLexeme(this.tokenBuffer);  
        return token;
    }
    else if (NUMBER.includes(char)) {
        while (true) {
            char = this.getChar();
            if (char && NUMBER.includes(char)) {
                this.addToBuffer(char);
            } else {
                break;
            }
        }
        if (char === ".") {
            this.addToBuffer(char);
            while (true) {
                char = this.getChar();
                if (char && NUMBER.includes(char)) {
                    this.addToBuffer(char);
                } else {
                    break;
                }
            }
        }
        this.backChar(char);
        
        token.setType(TokenTypes.CONST_ID);
        token.setValue(Number(this.tokenBuffer));
        token.setLexeme(this.tokenBuffer);
        return token;
    }
    else {
        switch (char) {
            case ';':
                token.setType(TokenTypes.SEMICO);
                token.setLexeme(";");
                break;
            case '(':
                token.setType(TokenTypes.L_BRACKET);
                token.setLexeme("(");
                break;
            case ')':
                token.setType(TokenTypes.R_BRACKET);
                token.setLexeme(")");
                break;
            case ',':
                token.setType(TokenTypes.COMMA);
                token.setLexeme(",");
                break;
            case '+':
                token.setType(TokenTypes.PLUS);
                token.setLexeme("+");
                break;
            case '-':
                char = this.getChar();
                if(char === "-") {
                    while(char && char !== "\n") {
                        char = this.getChar();
                    }
                    this.backChar(char);
                    return this.getToken();
                }
                else {
                    this.backChar(char);
                    token.setType(TokenTypes.MINUS);
                    token.setLexeme("-");
                    break;
                }
            case '/':
                char = this.getChar();
                if(char === '/') {
                    while(char && char !== "\n") {
                        char = this.getChar();
                    }
                    this.backChar(char);
                    return this.getToken();
                }
                else {
                    this.backChar(char);
                    token.setType(TokenTypes.DIV);
                    token.setLexeme("/");
                    break;
                }
            case '*':
                char = this.getChar();
                if(char === '*') {
                    this.addToBuffer(char);
                    token.setType(TokenTypes.POWER);
                    token.setLexeme("**");
                    break;
                }
                else {
                    this.backChar(char);
                    token.setType(TokenTypes.MUL);
                    token.setLexeme("*");
                    break;
                }
            default:
                token.setType(TokenTypes.ERRTOKEN);
                break;
        }
    }
    token.setLexeme(this.tokenBuffer);
    return token;
}

Scanner.prototype.backToken = function() {

}

Scanner.prototype.printTokens = function() {
    let token = this.getToken();
    while(token.getType() !== TokenTypes.NONTOKEN) {
        if(token.getType() === TokenTypes.ERRTOKEN) {
            console.log(`Line No ${this.lineNo}: Error token ${token.getLexeme()}`);
            break;
        }
        console.log(`${token.getType()}  ${token.getLexeme()}  ${token.getValue()}`);
        token = this.getToken();
    }
}