export default function TreeNode(type) {
    this.type = type;   //语法树节点类型
    this.left = null;
    this.right = null;
    this.funcType = null;
    this.const = null;  //常数
    this.param = null;  //参数
}

