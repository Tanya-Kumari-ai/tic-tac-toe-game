let boxes=document.querySelectorAll(".box");
// querySelector selects only first matching element but querySelectorAll selects all the matching element 
let resetbtn=document.querySelector("#reset-btn");
let newgamebtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true;  // playerX , playerO
let count=0; //to track draw

const winPatterns=[
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
//   this is a 2D array to store multiple arrays;

const resetgame=()=>{
    turnO=true; //again start the game with the turn O
    count=0; //reset the move count
    enableboxes();
    msgcontainer.classList.add("hide"); //winner is not decided in starting
};



boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){ //playerO
            box.innerText="O";
            turnO=false; // for next player
        }
        else{ //playerX
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
         //prevent changing the buttons
        count++; // Increase the move count on every move
        let isWinner=checkwinner();
        // DRAW LOGIC: If there is NO winner and 9 moves have been made, it's a draw.
         if (!isWinner && count == 9) {
         showDraw(); // call function to handle Draw
    }
});
});


const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""; //remove all the previous value
    } //for new game 
};


const showWinner=(winner)=>{
    msg.innerText=`congratulations,winner is ${winner}`;
    msgcontainer.classList.remove("hide"); //now it will show the winner
    disableboxes(); 
};

const showDraw=()=>{
    msg.innerText="it's a draw";
    msgcontainer.classList.remove("hide"); //now it will show the winner
    disableboxes(); 
}



const checkwinner=()=>{
    for( let pattern of winPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;  //there are 3 boxes to select to win so there are 3 no like 0 1 2 , 0 3 6 so to select these we write pattern[0] for 1st no. and so on...

        if(pos1val !="" && pos2val !="" &&pos3val !=""){ // neither positions to be empty
            if(pos1val==pos2val && pos2val==pos3val){  // must have same sign 0 OR X
               
                showWinner(pos1val);
                return true;  //winner found

            }
        }
    }
    return false; //no winner found

};

newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);



//for draw,we need to ensure that there must be all boxes filled and there is no winner.
// How to Implement Draw Detection
// Use your count variable to track the number of moves made.

// Increment count every time a box is clicked.

// After calling checkwinner() in the click handler, if:

// checkwinner() did not find a winner

// And count reaches 9 (since board has 9 boxes)
// then declare a draw.
