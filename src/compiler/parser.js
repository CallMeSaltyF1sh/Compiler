import Token from './token';
import Scanner from '../compiler/scanner';
import * as TokenTypes from './tokenType';
import { syntaxError } from './handleError';
import TreeNode from './TreeNode';

function MakeConstNode(value) {
    let node = new TreeNode(TokenTypes.CONST_ID);
    node.value = value;
    return node;
}

function MakeParamNode(param) {
    let node = new TreeNode(TokenTypes.T);
    node.param = param;
    return node;
}

function MakeFuncNode(funcName, childNode) {
    let node = new TreeNode(TokenTypes.FUNC);
    node.funcType = funcName;
    node.funcChild = childNode;
    return node;
}

function MakeOperatorNode(type, left, right) {
    let node = new TreeNode(type);
    node.left = left;
    node.right = right;
    return node;
}

function DeleteTree(root) {
    if (root === null) return;
    switch (root.type) {
        case TokenTypes.PLUS:
        case TokenTypes.MINUS:
        case TokenTypes.MUL:
        case TokenTypes.DIV:
        case TokenTypes.POWER:
            DeleteTree(root.left);
            DeleteTree(root.right);
            break;
        case TokenTypes.FUNC:
            DeleteTree(root.funcChild);
            break;
        default:
            break;
    }
    root = null;
}

Parser.prototype.getNodeValue = function (root) {
    if (root === null) {
        return 0.0;
    }
    switch (root.type) {
        case TokenTypes.PLUS:
            return this.getNodeValue(root.left) + this.getNodeValue(root.right);
        case TokenTypes.MINUS:
            return this.getNodeValue(root.left) + this.getNodeValue(root.right);
        case TokenTypes.MUL:
            return this.getNodeValue(root.left) * this.getNodeValue(root.right);
        case TokenTypes.DIV:
            return this.getNodeValue(root.left) / this.getNodeValue(root.right);
        case TokenTypes.POWER:
            return Math.pow(this.getNodeValue(root.left), this.getNodeValue(root.right));
        case TokenTypes.FUNC:
            switch (root.funcType) {
                case "SIN":
                    return Math.sin(this.getNodeValue(root.funcChild));
                case "COS":
                    return Math.cos(this.getNodeValue(root.funcChild));
                case "TAN":
                    return Math.tan(this.getNodeValue(root.funcChild));
                case "LN":
                    return Math.log(this.getNodeValue(root.funcChild));
                case "EXP":
                    return Math.exp(this.getNodeValue(root.funcChild));
                case "SQRT":
                    return Math.sqrt(this.getNodeValue(root.funcChild));
                default:
                    syntaxError(2, this.scanner, this.token);
                    return;
            }
        case TokenTypes.CONST_ID:
            return root.value;
        case TokenTypes.T:
            return root.param;
        default:
            return 0.0;
    }
}

function PrintTreeNode(root, indent) {
    for (let i = 1; i <= indent; i++) {
        console.log("... ");
    }
    switch (root.type) {
        case TokenTypes.PLUS:
            console.log("+\n");
            break;
        case TokenTypes.MINUS:
            console.log("-\n");
            break;
        case TokenTypes.MUL:
            console.log("*\n");
            break;
        case TokenTypes.DIV:
            console.log("/\n");
            break;
        case TokenTypes.POWER:
            console.log("**\n");
            break;
        case TokenTypes.FUNC:
            console.log(root.funcType + "\n");
            break;
        case TokenTypes.CONST_ID:
            console.log(root.value + "\n");
            break;
        case TokenTypes.T:
            console.log(root.param + "\n");
            break;
        default:
            console.log("Error TreeNode!\n");
    }
    if (root.type === TokenTypes.CONST_ID || root.type === TokenTypes.T) {
        return;
    }
    if (root.type === TokenTypes.FUNC) {
        PrintTreeNode(root.funcChild, indent + 1);
    } else {
        PrintTreeNode(root.left, indent + 1);
        PrintTreeNode(root.right, indent + 1);
    }
}

function Print(root) {
    PrintTreeNode(root, 1);
}

function enter(statement) {
    console.log("enter in " + statement + "\n");
}

function exit(statement) {
    console.log("exit from " + statement + "\n");
}

function match(token) {
    console.log("match " + token + "\n");
}

export default function Parser(code, parameter = 0, Origin_x = 0, Origin_y = 0, Scale_x = 1, Scale_y = 1, Rot_angle = 0) {
    this.scanner = new Scanner(code);
    this.dotList = [];
    this.token = new Token(TokenTypes.ERRTOKEN, "", 0);

    this.parameter = parameter;
    this.Origin_x = Origin_x;
    this.Origin_y = Origin_y;
    this.Scale_x = Scale_x;
    this.Scale_y = Scale_y;
    this.Rot_angle = Rot_angle;
}

Parser.prototype.fetchToken = function () {
    this.token = this.scanner.getToken();
    if (this.token.getType() === TokenTypes.ERRTOKEN) {
        syntaxError(1, this.scanner, this.token);
    }
}

Parser.prototype.matchToken = function (tokenType) {
    if (this.token.getType() !== tokenType) {
        syntaxError(2, this.scanner, this.token);
        console.log("match error")
    }
    this.fetchToken();
}

Parser.prototype.program = function () {
    while (this.token.getType() !== TokenTypes.NONTOKEN) {
        this.Statement();
        this.matchToken(TokenTypes.SEMICO);
    }
}

Parser.prototype.Statement = function () {
    switch (this.token.getType()) {
        case TokenTypes.ORIGIN:
            this.OriginStatement();
            break;
        case TokenTypes.SCALE:
            this.ScaleStatement();
            break;
        case TokenTypes.ROT:
            this.RotStatement();
            break;
        case TokenTypes.FOR:
            this.ForStatement();
            break;
        default:
            syntaxError(2, this.scanner, this.token);
            console.log("statement error")
    }
}

Parser.prototype.OriginStatement = function () {
    let node = null;
    enter("OriginStatement");
    this.matchToken(TokenTypes.ORIGIN);
    this.matchToken(TokenTypes.IS);
    this.matchToken(TokenTypes.L_BRACKET);
    node = this.Expression();
    this.Origin_x = this.getNodeValue(node);
    DeleteTree(node);
    this.matchToken(TokenTypes.COMMA);
    node = this.Expression();
    this.Origin_y = this.getNodeValue(node);
    DeleteTree(node);
    this.matchToken(TokenTypes.R_BRACKET);
    exit("OriginStatement");
}

Parser.prototype.ScaleStatement = function () {
    let node = null;
    enter("ScaleStatement");
    this.matchToken(TokenTypes.SCALE);
    this.matchToken(TokenTypes.IS);
    this.matchToken(TokenTypes.L_BRACKET);
    node = this.Expression();
    this.Scale_x = this.getNodeValue(node);
    DeleteTree(node);
    this.matchToken(TokenTypes.COMMA);
    node = this.Expression();
    this.Scale_y = this.getNodeValue(node);
    DeleteTree(node);
    this.matchToken(TokenTypes.R_BRACKET);
    exit("ScaleStatement");
}

Parser.prototype.RotStatement = function () {
    let node = null;
    enter("RotStatement");
    this.matchToken(TokenTypes.ROT);
    this.matchToken(TokenTypes.IS);
    node = this.Expression();
    this.Rot_angle = this.getNodeValue(node);
    DeleteTree(node);
    exit("RotStatement");
}

Parser.prototype.CalcCoord = function (xnode, ynode) {
    let tmp1, tmp2, tmp3;
    tmp1 = this.getNodeValue(xnode);
    tmp2 = this.getNodeValue(ynode);
    tmp1 *= this.Scale_x;
    tmp2 *= this.Scale_y;
    console.log(tmp1)
    console.log(tmp2)
    tmp3 = tmp1 * Math.cos(this.Rot_angle) + tmp2 * Math.sin(this.Rot_angle);
    tmp2 = tmp2 * Math.cos(this.Rot_angle) - tmp1 * Math.sin(this.Rot_angle);
    tmp1 = tmp3;
    tmp1 += this.Origin_x;
    tmp2 += this.Origin_y;
    return { x: tmp1, y: tmp2 };
}

Parser.prototype.ForStatement = function () {
    let start, end, step, xnode, ynode;
    let node = null;
    let str = '';
    let pos = {};

    enter("ForStatement");
    this.matchToken(TokenTypes.FOR);
    match("FOR");
    this.matchToken(TokenTypes.T);
    match("T");
    this.matchToken(TokenTypes.FROM);
    match("FROM");
    node = this.Expression();
    start = this.getNodeValue(node);
    DeleteTree(node);

    this.matchToken(TokenTypes.TO);
    match("TO");
    node = this.Expression();
    end = this.getNodeValue(node);
    DeleteTree(node);

    this.matchToken(TokenTypes.STEP);
    match("STEP");
    node = this.Expression();
    step = this.getNodeValue(node);
    DeleteTree(node);
    //console.log(this.scanner.tempBuffer);
   // console.log(this.scanner.code);

    for (this.parameter = start; this.parameter <= end; this.parameter += step) {
        this.matchToken(TokenTypes.DRAW);
        match("DRAW");
        this.matchToken(TokenTypes.L_BRACKET);
        match("(");
        xnode = this.Expression();
        this.matchToken(TokenTypes.COMMA);
        match(",");
        ynode = this.Expression();
        if (this.parameter === start) {
            str = this.scanner.tempBuffer;
           // console.log(str);
            //console.log(this.scanner.code);
            str = str.substring(str.lastIndexOf('DRAW'), str.length)
           // console.log(str);
        }
        if(this.parameter + step <= end) {
            this.scanner.code = str + this.scanner.code;
        }
       // console.log(this.scanner.code)
        this.matchToken(TokenTypes.R_BRACKET);
        match(")");
        pos = this.CalcCoord(xnode, ynode);
        this.dotList.push(pos);
        DeleteTree(xnode);
        DeleteTree(ynode);
    }

    exit("ForStatement");
    this.parameter = 0;
    console.log(this.dotList)
}

Parser.prototype.Expression = function () {
    let left = null,
        right = null,
        type;

    left = this.Term();
    while (this.token.getType() === TokenTypes.PLUS || this.token.getType() === TokenTypes.MINUS) {
        type = this.token.getType();
        this.matchToken(type);
        right = this.Term();
        left = MakeOperatorNode(type, left, right);
    }
    Print(left);
    return left;  //返回最终表达式的语法树
}

//若干个因子以乘除号连接而成
Parser.prototype.Term = function () {
    let left = null,
        right = null,
        type;

    left = this.Factor();
    while (this.token.getType() === TokenTypes.MUL || this.token.getType() === TokenTypes.DIV) {
        type = this.token.getType();
        this.matchToken(type);
        right = this.Factor();
        left = MakeOperatorNode(type, left, right);
    }
    return left;
}

//因子可能是标识符、数字或者一个用括号括起来的表达式
Parser.prototype.Factor = function () {
    let left = null,
        right = null;
    if (this.token.getType() === TokenTypes.PLUS) {  //一元加
        this.matchToken(TokenTypes.PLUS);
        right = this.Factor();
    }
    else if (this.token.getType() === TokenTypes.MINUS) {  //0-x
        this.matchToken(TokenTypes.MINUS);
        right = this.Factor();
        left = MakeConstNode(0.0);
        right = MakeOperatorNode(TokenTypes.MINUS, left, right);
    }
    else {
        right = this.Component();
    }

    return right;
}

//幂
Parser.prototype.Component = function () {
    let left = null,
        right = null;
    left = this.Atom();
    if (this.token.getType() === TokenTypes.POWER) {
        this.matchToken(TokenTypes.POWER);
        right = this.Component();
        left = MakeOperatorNode(TokenTypes.POWER, left, right);
    }
    return left;
}

//常数、参数T、函数、分隔符
Parser.prototype.Atom = function () {
    let tmp = null,
        node = null,
        lexeme;
    switch (this.token.getType()) {
        case TokenTypes.CONST_ID:
            node = MakeConstNode(this.token.getValue());
            this.matchToken(TokenTypes.CONST_ID);
            break;
        case TokenTypes.T:
            node = MakeParamNode(this.parameter);
            this.matchToken(TokenTypes.T);
            break;
        case TokenTypes.FUNC:
            lexeme = this.token.getLexeme();
            this.matchToken(TokenTypes.FUNC);
            this.matchToken(TokenTypes.L_BRACKET);
            tmp = this.Expression();
            node = MakeFuncNode(lexeme, tmp);
            this.matchToken(TokenTypes.R_BRACKET);
            break;
        case TokenTypes.L_BRACKET:
            this.matchToken(TokenTypes.L_BRACKET);
            node = this.Expression();
            this.matchToken(TokenTypes.R_BRACKET);
            break;
        default:
            syntaxError(2, this.scanner, this.token);
            console.log("Atom error")
    }
    return node;
}

Parser.prototype.run = function () {
    enter("Parser");
    this.fetchToken();
    this.program();
    exit("Parser");
}