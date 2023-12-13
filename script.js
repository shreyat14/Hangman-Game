const homePage = document.getElementById('home-page');
const letterValues = document.getElementById('alphabets-container');
const optionsValues = document.getElementById('options-container');
const inputWord = document.getElementById('word-container');
const hangMan = document.getElementById('hangman-container');
const resultValues = document.getElementById('results-container');
const result = document.getElementById('actual-result-container');
const gameContainer = document.getElementById('game-container');
const newGameButton = document.getElementById('new-game');

var options = {
  Movies: [
    "Inception",
    "Jurassic Park",
    "The Matrix",
    "Avatar",
    "Casablanca",
    "Titanic",
    "Star Wars",
    "The Godfather",
    "Pulp Fiction",
    "The Shawshank Redemption",
    "Forrest Gump",
    "The Dark Knight",
    "A Space Odyssey",
    "Fight Club",
    "The Lord of the Rings"
  ],
  Animals: [
    "Elephant",
    "Giraffe",
    "Kangaroo",
    "Penguin",
    "Cheetah",
    "Dolphin",
    "Lion",
    "Tiger",
    "Zebra",
    "Hippopotamus",
    "Panda",
    "Koala",
    "Ostrich",
    "Gorilla",
    "Squirrel"
  ],
  Countries: [
    "Brazil",
    "Japan",
    "Australia",
    "Canada",
    "Mexico",
    "Germany",
    "India",
    "South Africa",
    "Italy",
    "France",
    "Argentina",
    "China",
    "Russia",
    "United Kingdom",
    "United States"
  ]
};

let selected_word;
let correct_guess_letter;
let incorrect_guesses;
let ctx;
let categorySelected;


select_options = () => {
    optionsValues.innerHTML = '<p id="select-category">Select a Category!</p>';
    let optionButtons = document.createElement("div");
    for (option in options) {
      optionButtons.innerHTML += `<button class="optionvalue" onclick="generateWord('${option}')">${option}</button>`;
    }
    optionsValues.appendChild(optionButtons);
  }



generateWord = (optionvalue) => {
    if(categorySelected === true){
        return;
    }
    let all_options = document.querySelectorAll(".optionvalue");
    all_options.forEach((button) =>{
        if(button.innerText.toLowerCase() === optionvalue.toLowerCase()){
            button.classList.add('active');
        }
        else{
            button.disabled = true;
        }
         });
    let len = options[optionvalue].length;
    let index_choice = Math.floor(Math.random() * len);
    inputWord.classList.remove('hidden');
    inputWord.innerText = "";
    selected_word = options[optionvalue][index_choice];
    selected_word = selected_word.toUpperCase();
    for( let i=0 ;i< selected_word.length;i++){
        const chosen_letter = document.createElement("span");
        chosen_letter.className = "letter_chosen_word"
        if(selected_word[i] === " "){
            chosen_letter.textContent = " "
        }
        else{
             chosen_letter.textContent = "_";
        }
        inputWord.appendChild(chosen_letter);
    }
    letterValues.classList.remove('hidden')
        //Creatng alphabet pad
        for(let i=65; i<=90; i++){
            let button = document.createElement("button");
            let value = String.fromCharCode(i);
            button.textContent = value;
            button.className = "alphabet-buttons"
            button.addEventListener("click",() => checkLetter(button));
            letterValues.appendChild(button);
    }
    baseHangman();
    categorySelected = true;
  }


drawLine = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
drawCircle = (x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

baseHangman = () =>{
    hangMan.classList.remove('hidden');
    let canvas= document.createElement('canvas');
    canvas.id = "hangman-canvas";
    canvas.width = "400";
    canvas.height= "350";
    hangMan.appendChild(canvas);

    const canva = document.getElementById('hangman-canvas');
    ctx = canva.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

    // Draw the vertical line
    drawLine(120, 60, 120, 320);

    // Draw the small vertical line
    drawLine(280, 60, 280, 120);

    // Draw the base
    drawLine(40, 320, 360, 320);

    // Draw the top horizontal line
    drawLine(120, 60, 280, 60);

}



startGame = () =>{

    //Change all the value to its initial values
    letterValues.innerHTML = "";
    letterValues.classList.add('hidden');
    inputWord.innerHTML = "";
    optionsValues.innerHTML = "";
    resultValues.classList.add('hidden');
    homePage.classList.remove('hidden');
    hangMan.innerHTML="";
    //resultValues.innerHTML="";
    result.innerHTML="";
    selected_word = "";
    correct_guess_letter = 0;
    incorrect_guesses=0;
    categorySelected = false;
    select_options();
}



checkLetter = (button) =>{
    let current_letter = button.textContent;
    //let chosen_word = selected_word;
    let nonSpaceChars = selected_word.replace(/ /g, '').length;
    if(selected_word.includes(current_letter)){
        for(let i=0; i<selected_word.length; i++){
            if(selected_word[i] === current_letter){
                document.querySelectorAll('.letter_chosen_word')[i].textContent = current_letter;
                correct_guess_letter+=1;
            }
        }
        if (correct_guess_letter === nonSpaceChars) {
            resultsTab(1);
        }
        button.disabled = true;

    }
    else{
        incorrect_guesses+=1;
        button.disabled = true;
        draw_hangman(incorrect_guesses);
    }
}



draw_hangman = (incorrect_guesses) =>{
    const canva = document.getElementById('hangman-canvas');
    ctx = canva.getContext('2d');
    
    if(incorrect_guesses === 1){
        //draw head
        drawCircle(280, 140, 20);

    }
    else if(incorrect_guesses === 2){
        // Draw the body
        drawLine(280, 160, 280, 240);
    }
    else if(incorrect_guesses === 3){
        // Draw the left arm
        drawLine(280, 180, 240, 220);
    }
    else if(incorrect_guesses === 4){
        // Draw the right arm
        drawLine(280, 180, 320, 220);
    }
    else if(incorrect_guesses === 5){
        // Draw the left leg
        drawLine(280, 240, 240, 280);
    }
    else if(incorrect_guesses === 6){
        // Draw the right leg
        drawLine(280, 240, 320, 280);
        resultsTab(0);
    }
}


resultsTab = (result_val) => {
    blockall();
    resultValues.classList.remove('hidden');
    let resultText = document.createElement('h2');
    resultText.className = "result";
    if(result_val === 1){
        resultText.innerHTML = "YOU WIN !!";
        resultText.classList.add('win'); 
    }
    else{
        resultText.innerHTML = "YOU LOSE";
        resultText.classList.add('lose'); 
    }
    result.appendChild(resultText);

    let word = document.createElement("h3");
    word.className = "word";
    word.innerHTML = "The word is : "+selected_word;
    result.appendChild(word);

    newGameButton.addEventListener("click", () => startGame());
    
    homePage.classList.add('hidden');


}

blockall = () =>{
    //disable all buttons
    let options = document.querySelectorAll(".optionvalue");
    options.forEach((button) => {
            button.disabled=true;
    });

    //diable letter pad

    let letters = document.querySelectorAll(".alphabet-buttons");
    letters.forEach((button) => {
        button.disabled = true;
    });


}

startGame();
  