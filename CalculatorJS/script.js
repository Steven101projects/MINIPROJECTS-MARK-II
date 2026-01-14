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

LoadTheScreen(inputs);

function KeyButtons(){
    const numKeys = document.querySelectorAll('.key');
    numKeys.forEach(n => {
        n.addEventListener('click', function(){
            // console.log(n.textContent);

                if(!operation){
                if(appended){
                    if(operation){
                    if(n.textContent === "X"){
                        rawNumL.pop();
                        inputs.pop();
                        LoadTheScreen(inputs);
                     } else {
                    rawNumL.push(n.textContent);
                    inputs.push(n.textContent);
                    console.log(rawNumL);
                    LoadTheScreen(inputs);
                     }
                    } else {
                    console.log('you need an operator, if you want to reset.. press reset first!');
                    return;
                    }
                } else {
                 if(n.textContent === "X"){
                        rawNumL.pop();
                        inputs.pop();
                        LoadTheScreen(inputs);
                 } else {
                 rawNumL.push(n.textContent);
                 inputs.push(n.textContent);
                 console.log(rawNumL);
                 LoadTheScreen(inputs);
                 }
               
                }
                } else {
                if(n.textContent === "X"){
                        rawNumR.pop();
                        inputs.pop();
                        LoadTheScreen(inputs);
                } else {
                rawNumR.push(n.textContent);
                inputs.push(n.textContent);
                console.log(rawNumR);
                LoadTheScreen(inputs);
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
                LoadTheScreen(inputs);
                Calculate();
                LoadTheScreen(inputs);
            } else {

            if(operation) 
            {
                if(rawNumR.length === 0){
                inputs.pop();
                operation = '';
                operation = o.textContent;
                inputs.push(o.textContent);
                LoadTheScreen(inputs);
                console.log(inputs);
                } else {
                console.log('calculating...');
                Calculate();
                operation = o.textContent;
                inputs.push(o.textContent);
                console.log(operation);
                console.log(inputs);
                LoadTheScreen(inputs);
                }
            }
             else 
            {
            operation = o.textContent;
            inputs.push(o.textContent);
            console.log(operation);
            console.log(inputs);
            LoadTheScreen(inputs);
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

    
function LoadTheScreen(rawData){

    let data = rawData.filter(item => item !== "=");

    let result;

    if(data.length > 8){
        const trimmed = data.slice(-8);

        result = Array.from({length: 8}, (_, i) => {
            if(i === 7) return "...";
            return trimmed[i];
        });
    }else {
        result = Array.from({length: 8}, (_, i) =>
            data[i - (8 - data.length)] ?? 0
        );
    }


    // var example = ["1", "2", "3", "4", "5", "6", "7", "8"];
    // var show = ["0", "0", "0", "0", "0", "0", "0", "0"];
    count = 0;

for (const i in screenNumbers) {
    screenNumbers[i].textContent = result[i];
}

    // var screenShow = setInterval(() =>{
    //     screenNumbers[count].textContent = result[count];
    //     console.log(result[count]);
    //     count++;

    //     if(count >= 8){
    //         clearInterval(screenShow);
    //     }
    // }, 200)
}