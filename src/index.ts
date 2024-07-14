let body = document.querySelector<HTMLBodyElement>("body");
let rightClickMenu = document.querySelector(
    ".right-click-menu"
) as HTMLDivElement | null;
let gameContainer = document.querySelector<HTMLDivElement>(".game-container");
let newClass = document.querySelectorAll<HTMLDivElement>(".text-box");
let wordForm = document.getElementById(
    "new-word-form"
) as HTMLFormElement | null;
let title = document.getElementById("title") as HTMLInputElement | null;
let category = document.getElementById("category") as HTMLInputElement | null;
let difficulty = document.getElementById(
    "difficulty"
) as HTMLInputElement | null;
let updateWord = document.getElementById(
    "update-word"
) as HTMLDivElement | null;
let deleteWord = document.getElementById(
    "delete-word"
) as HTMLDivElement | null;
// type for word
type Word = {
    title: string;
    category: string;
    difficulty: string;
};
//Array of words, is limited to 16
let currentWords: Word[] = [];
//Counter for how many words are clicked, limited to 4
let clickedWords: number = 0;
//Creating new words
wordForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (title?.value == "" || title?.value == null) return;
    if (category?.value == "" || category?.value == null) return;
    if (difficulty?.value == "" || difficulty?.value == null) return;
    const newWord: Word = {
        title: title.value.toUpperCase(),
        category: category.value.toUpperCase(),
        difficulty: difficulty.value.toUpperCase(),
    };
    currentWords.push(newWord);
    title.value = "";
    category.value = "";
    difficulty.value = "";
    populate(newWord);
});
//Selecting words
newClass.forEach((item) => {
    //Allows for 4 words to be clicked at a time. Changes color once clicked
    item.addEventListener("click", (e) => {
        if (item.classList.contains("clicked")) {
            item.classList.remove("clicked");
            clickedWords -= 1;
        } else if (clickedWords < 4) {
            item.classList.add("clicked");
            clickedWords += 1;
        }
    });
    //Allows menu to appear on right click
    item.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        document.querySelectorAll(".right-clicked").forEach((item) => {
            item.classList.remove("right-clicked");
        });
        item.classList.add("right-clicked");
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        if (rightClickMenu == null) return;
        rightClickMenu.style.top = `${mouseY}px`;
        rightClickMenu.style.left = `${mouseX}px`;
        rightClickMenu?.classList.remove("visible");

        setTimeout(() => {
            rightClickMenu?.classList.add("visible");
        });
    });
});
//Updates words and keeps within same element
updateWord?.addEventListener("click", (e) => {
    rightClickMenu?.classList.remove("visible");
    let clickedItems =
        document.querySelectorAll<HTMLDivElement>(".right-clicked");
    clickedItems.forEach((item) => {
        let newTitle = window.prompt("Enter new title");
        let newCategory = window.prompt("Enter new category");
        let newDifficulty = window.prompt("Enter new difficulty");
        //Update in currentWords array
        let index = currentWords.findIndex(
            (word) => word.title === item.textContent
        );
        if (newTitle !== null) {
            currentWords[index].title = newTitle.toUpperCase();
        }
        if (newCategory !== null) {
            currentWords[index].category = newCategory.toUpperCase();
        }
        if (newDifficulty !== null) {
            currentWords[index].difficulty = newDifficulty.toUpperCase();
        }

        //Updating element
        if (newTitle !== null) {
            item.textContent = newTitle.toUpperCase();
        }
        if (newCategory !== null) {
            item.setAttribute("category", newCategory.toUpperCase());
        }
        if (newDifficulty !== null) {
            item.setAttribute("difficulty", newDifficulty.toUpperCase());
        }
        item.classList.remove("right-clicked");
    });
});

//Deletes words
deleteWord?.addEventListener("click", (e) => {
    rightClickMenu?.classList.remove("visible");
    let clickedItems =
        document.querySelectorAll<HTMLDivElement>(".right-clicked");
    clickedItems.forEach((item) => {
        let index = currentWords.findIndex(
            (word) => word.title === item.textContent
        );
        currentWords.splice(index, 1);
        item.textContent = "";
        item.removeAttribute("category");
        item.removeAttribute("difficulty");
        item.classList.remove("right-clicked");
    });
});

body?.addEventListener("click", (e) => {
    //Context menu disappears when clicking outside of it
    if ((e.target as HTMLElement).offsetParent != rightClickMenu) {
        rightClickMenu?.classList.remove("visible");
        document.querySelectorAll(".right-clicked").forEach((item) => {
            item.classList.remove("right-clicked");
        });
    }
});

//Gets random number to assign new words to random boxes
function getRandomNumber(min: number, max: number) {
    // Generate a random decimal between 0 and 1
    const randomDecimal = Math.random();
    // Scale the random decimal to the desired range
    const randomInRange = randomDecimal * (max - min + 1) + min;
    // Round down to the nearest whole number
    const randomInteger = Math.floor(randomInRange);
    return randomInteger;
}
//Checks if there are too many words, if not assigns new word to random box
function populate(item: Word) {
    if (currentWords.length > 16) {
        window.alert("Cannot add more than 16 words");
    } else {
        let randomIndex = getRandomNumber(0, 15);
        let itemPlaced: boolean = false;
        while (itemPlaced == false) {
            randomIndex = getRandomNumber(0, 15);
            let currentElement: HTMLDivElement = newClass[randomIndex];
            if (currentElement.innerHTML.length < 1) {
                currentElement.textContent = item.title;
                currentElement.setAttribute("category", item.category);
                currentElement.setAttribute("difficulty", item.difficulty);
                itemPlaced = true;
            }
        }
    }
}
