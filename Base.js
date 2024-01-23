/** 針對以下條列在 console.log 結尾標示出應該印出的結果
* example:
* console.log(1 === 1) // 您的答案寫在此處
*/

// 1. 每個console.log的結果為何，請試說明為什麼
console.log(3 == "3");
console.log(0 == false);
console.log(undefined == null);
console.log(+0 === -0;) 
console.log(NaN === NaN) 
console.log((0.1 + 0.2).toFixed(1)); 


// 2. callName 執行時會因出什麼
const name = "presco";
function callName() {
  console.log(this);
  console.log(this.name);
}
callName(); 

// 3. console.log的結果為何
let getThis = () => this;
console.log(getThis() === window);
