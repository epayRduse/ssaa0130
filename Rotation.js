/**
請寫一個函式讀取一個包含 N 個整數的陣列，並且按照指定的旋轉次數進行右移，讓陣列的最後一個元素被移到第一個位置；目標是將陣列中的元素向右平移 n 次。

例如:
當我的陣列為 [2, 4, 6, 8, 10]，並且指定向右平移 3 次，則函式最後將返回 [6, 8, 10, 2, 4]
因為陣列進行了 3 次旋轉:
[2, 4, 6, 8, 10] -> [10, 2, 4, 6, 8] 1
[10, 2, 4, 6, 8] -> [8, 10, 2, 4, 6] 2
[8, 10, 2, 4, 6] -> [6, 8, 10, 2, 4] 3

vscode指令: node Rotation.js
*/

function Rotation(arr, times) {
    if(arr.length === 0 || times <= 0) {
        console.log("ANS: ", arr);
        return arr;
    }

    let calTimes = arr.length - times;

    // slice two parts before concat
    let rotatedPart1 = arr.slice(0, calTimes);
    let rotatedPart2 = arr.slice(-times);
    let newRotated = rotatedPart2.concat(rotatedPart1);
    console.log("ANS: ", newRotated);

    return newRotated;
}

Rotation([2, 4, 6, 8, 10], 4)