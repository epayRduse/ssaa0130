/**
請將陣列 [[2,2],[2,2],[],[1,2],[]] 重組成 [4,4,1,3,1]

vscode指令: node Reassemble.js
note: reduce方法會跳過空數組因此在陣列時預先判斷陣列長度。
*/
let arr = [[2,2],[2,2],[],[1,2],[]];

function Reassemble (arr) {
    let resultArr = arr.map((n) => {
        return n.length > 0 ? n.reduce((s, v) => {
            return s + v;
        },0):1;
    });

    console.log("ANS：", resultArr);
}

Reassemble(arr);