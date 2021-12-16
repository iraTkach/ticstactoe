const arrayWins = [[0,1,2],[10,11,12],[20,21,22],[0,11,22],[2,11,20],[0,10,20],[1,11,21],[2,12,22]]
const dimension = 3
const idTab = "tab"
var xoPlayer = true     // X player for first time
var currentPlayer = 'x' 
var endGame = false
var record = 0
var steps = {x:[],o:[]}      
var saveGameSteps


function checkIfWins(){
    
    if (steps[currentPlayer].length > 2){

        stepsByPlayer = steps[currentPlayer];
        let isWinner = false;
        for (let i = 0; i < arrayWins.length; i++) {
            
            const winArray = arrayWins[i];
            isWinner = winArray.every(j => {
                const includes = stepsByPlayer.includes(j);
                return includes;
            });

            if(isWinner) {
                if( record > 0 ){
                    if( stepsByPlayer.length < record )
                        record = stepsByPlayer.length - 1
                    }
                else
                    record = stepsByPlayer.length 
                
                document.getElementById("record").disabled = false;
                    
                return true;
            }
        }
        return false;
    }
    else
        return false
}

function selectCell(idx, player){

    if( !endGame ){
        var imgElem = document.createElement('img');
        
        if (player === ''){
            currentPlayer = xoPlayer ? 'x' : 'o'
            document.getElementById("back").disabled = false;
            document.getElementById("save").disabled = false;
        }
        else
            currentPlayer = player
        
        steps[currentPlayer].push(Number(idx))
        
        imgElem.src = `./picture/${currentPlayer}.png`
        imgElem.alt = idx;
        imgElem.id = 'img' + idx;


        var tdElem = document.getElementById('td' + idx);
        tdElem.append(imgElem);
        tdElem.onclick = "";

        if( checkIfWins() ){
            setTimeout(()=>{
                endGame = true;
                alert(`Congratulation! ${currentPlayer.toUpperCase()} player wins! `);
            }, 0)
        } 

        xoPlayer = !xoPlayer;
    }
}

function recordGame(){
    alert(`The record game has ${record} times`);
}

function toStr(num){
    if ( num >=0 && num < 9 ) return `0${num}`;
    return num.toString()
}

function back(){
    
    xoPlayer = !xoPlayer;
    currentPlayer = xoPlayer ? 'x' : 'o'

    const idx = toStr(steps[currentPlayer][steps[currentPlayer].length-1]);

    var img = document.getElementById("img" + idx);   
    img.remove();

    var tdElem = document.getElementById('td' + idx);
            
    tdElem.onclick = function() {
            selectCell(idx, '');
        }

    steps[currentPlayer].pop();
    endGame = false;

    if( steps['x'].length === 0 && steps['o'].length === 0){
        document.getElementById("back").disabled = true;
        document.getElementById("save").disabled = true;  
    }
        
}

function newGame(){
    
    for (const key in steps) 
        while( steps[key].length >0 ){

            const idx = toStr(steps[key][0]);
           
            var img = document.getElementById("img" + idx);
            img.remove()
            
            var tdElem = document.getElementById('td' + idx);
            
            tdElem.onclick = function() {
                    selectCell(idx, '');
                }

            steps[key].shift() ;           
        
        }
    
    xoPlayer = true;
    currentPlayer = 'x';
    endGame = false;
    document.getElementById("back").disabled = true;
    document.getElementById("save").disabled = true;  
      
}

function saveGame(){

    //saveGameSteps = [...steps];    
    saveGameSteps = {x:[],o:[]}

    for (const key in steps) 
        for( let i = 0; i < steps[key].length; i++ ){
            saveGameSteps[key][i] = steps[key][i];
        }
    
    document.getElementById("load").disabled = false;
    
}

function loadGame(){

    newGame();

    for (const key in saveGameSteps) {
        for( let i = 0; i < saveGameSteps[key].length; i++ ){

            const idx = toStr(saveGameSteps[key][i]); 
            selectCell(idx, key);
        }
    }
    document.getElementById("back").disabled = false;  
    document.getElementById("save").disabled = false;  

}

function creatTable( ifDebug ){
        var tableElem = document.getElementById(idTab);
        for (let i = 0; i < dimension; i++) {
        
            var trElem = document.createElement('tr');
            trElem.id = 'tr' + i;
            for (let j = 0; j < dimension; j++) {
                var tdElem = document.createElement('td');
                tdElem.id = `td${i}${j}`;
                tdElem.onclick = function() {
                    selectCell(`${i}${j}`, '');
                }
                if( ifDebug )   tdElem.innerText = i + '' +j
                trElem.append(tdElem);
            }

            tableElem.append(trElem);
        }    
}

creatTable( false );
