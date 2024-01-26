/**
請寫一個函式並輸入一個數字，此數字為指定等待的秒數，抵達秒數時才返回結果 "Success"，請搭配使用 Promise 或是 async/await 來撰寫此函數。如果指定的數字小於或等於 0，則函數會返回 "Invalid Time"。

vscode指令: node DelayByTime.js
*/ 

// wait time
function delayByTimeFn(seconds) {
    return new Promise((resolve, reject) => {
        if (seconds <= 0) {
            reject("Invalid Time");
        }
        else {
            setTimeout(() => {
                resolve("Success")
            },seconds * 1000);
        }
    });
}

// wait delayByTimeFn method result
async function DelayByTime() {
    try {
        let result = await delayByTimeFn(3);
        console.log("Result: " ,result);
        return result;
    }
    catch (error) {
        console.error("Error: ", error);
        return error;
    }
}

DelayByTime();