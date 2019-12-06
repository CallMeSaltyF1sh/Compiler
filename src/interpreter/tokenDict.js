import * as TokenTypes from './tokenType';
import Token from './token';

export const tokenDict = [
    new Token(TokenTypes.CONST_ID, "PI", 3.1415926),
    new Token(TokenTypes.CONST_ID, "E", 2.71828),
    new Token(TokenTypes.T, "T", 0),
    new Token(TokenTypes.FUNC, "SIN", 0),
    new Token(TokenTypes.FUNC, "COS", 0),
    new Token(TokenTypes.FUNC, "TAN", 0),
    new Token(TokenTypes.FUNC, "LN", 0),
    new Token(TokenTypes.FUNC, "EXP", 0),
    new Token(TokenTypes.FUNC, "SQRT", 0),
    new Token(TokenTypes.ORIGIN, "ORIGIN", 0),
    new Token(TokenTypes.SCALE, "SCALE", 0),
    new Token(TokenTypes.ROT, "ROT", 0),
    new Token(TokenTypes.IS, "IS", 0),
    new Token(TokenTypes.FOR, "FOR", 0),
    new Token(TokenTypes.FROM, "FROM", 0),
    new Token(TokenTypes.TO, "TO", 0),
    new Token(TokenTypes.STEP, "STEP", 0),
    new Token(TokenTypes.DRAW, "DRAW", 0)
];