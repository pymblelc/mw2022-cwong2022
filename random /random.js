var rNum= [];
var arr = []; 

function randArray(min, max, num){
    for (let i= 0; i<max-min; i++){
        rNum[i] = i + min; 
    }
    for (let i=0; i< num-1; i++){
        r= Math.floor(Math.random() * max-min); 
        arr[i]= rNum[r];
        rNum[r]= rNum[i];
    }
    return arr; 
}
console.log(randArray(0, 30, 11));