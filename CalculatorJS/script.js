const screenNumbers = document.querySelectorAll('.number p');

KeyButtons();

var inputs = [];

var num = 0;

var operation = '';

var result = 0;

var rawNumL = [];
var rawNumR = [];

const operators = ['+', '-', 'x', '÷', '='];
var operation = "";

var appended = false;

var calculatedNum = 0;

LoadTheScreen(num);

function KeyButtons(){
    const numKeys = document.querySelectorAll('.key');
    numKeys.forEach(n => {
        n.addEventListener('click', function(){
            // console.log(n.textContent);

                if(!operation){
                if(appended){
                    if(operation){
                    if(n.textContent === "x"){
                        rawNumL.pop();
                        inputs.pop();
                     } else {
                    rawNumL.push(n.textContent);
                    inputs.push(n.textContent);
                    console.log(rawNumL);
                     }
                    } else {
                    console.log('you need an operator, if you want to reset.. press reset first!');
                    return;
                    }
                } else {
                 if(n.textContent === "x"){
                        rawNumL.pop();
                        inputs.pop();
                 } else {
                 rawNumL.push(n.textContent);
                 inputs.push(n.textContent);
                 console.log(rawNumL);
                 }
               
                }
                } else {
                if(n.textContent === "x"){
                        rawNumR.pop();
                        inputs.pop();
                } else {
                rawNumR.push(n.textContent);
                inputs.push(n.textContent);
                console.log(rawNumR);
                }
                }

            console.log(inputs);
        })
    })
    
    const optKeys = document.querySelectorAll('.operator');
    optKeys.forEach(o => {
        o.addEventListener('click', function(){
            // console.log(o.textContent);

            if(o.textContent === "="){
                console.log('calculating...');
                inputs.push(o.textContent);
                console.log(operation);
                console.log(inputs);

                Calculate();
            } else {

            if(operation) 
            {
                if(rawNumR.length === 0){
                inputs.pop();
                operation = '';
                operation = o.textContent;
                inputs.push(o.textContent);
                console.log(inputs);
                } else {
                console.log('calculating...');
                Calculate();
                operation = o.textContent;
                inputs.push(o.textContent);
                console.log(operation);
                console.log(inputs);
                }
            }
             else 
            {
            operation = o.textContent;
            inputs.push(o.textContent);
            console.log(operation);
            console.log(inputs);
            }
            }
        })
    })
}

function Calculate(){
    appended = true;
     switch(operation)
                {
                    case '+':
                        calculatedNum = Number(rawNumL.join("")) + Number(rawNumR.join(""));
                        console.log(calculatedNum);
                    break;
                    case '-':
                        calculatedNum = Number(rawNumL.join("")) - Number(rawNumR.join(""));
                        console.log(calculatedNum);
                    break;
                    case 'x':
                        calculatedNum = Number(rawNumL.join("")) * Number(rawNumR.join(""));
                        console.log(calculatedNum);
                    break;
                    case '÷':
                        calculatedNum = Number(rawNumL.join("")) / Number(rawNumR.join(""));
                        console.log(calculatedNum);
                    break;
                }
                inputs = [];
                rawNumL = [];
                rawNumL = [...String(calculatedNum)];
                inputs = [...String(calculatedNum)];
                rawNumR = [];
                operation = '';
    }

    
function LoadTheScreen(result){

    var converted = [];

    var example = ["1", "2", "3", "4", "5", "6", "7", "8"];
    var show = ["0", "0", "0", "0", "0", "0", "0", "0"];
    count = 0;

    var screenShow = setInterval(() =>{
        screenNumbers[count].textContent = show[count];
        console.log(example[count]);
        count++;

        if(count >= 8){
            clearInterval(screenShow);
        }
    }, 200)
}