let body = document.querySelector<HTMLBodyElement>("body")
let rightClickMenu = document.querySelector(".right-click-menu") as HTMLDivElement | null
let gameContainer = document.querySelector<HTMLDivElement>(".game-container")
let newClass = document.querySelectorAll<HTMLDivElement>(".text-box")
let wordForm = document.getElementById("new-word-form") as HTMLFormElement | null
let title = document.getElementById("title") as HTMLInputElement | null
let category = document.getElementById("category") as HTMLInputElement | null
let difficulty = document.getElementById("difficulty") as HTMLInputElement | null
type Word = {
  title: string
  category: string
  difficulty: string
  clicked: boolean
}
let currentWords: Word[] = []
let clickedWords: number = 0
wordForm?.addEventListener("submit", e => {
  e.preventDefault()
  if (title?.value == "" || title?.value == null) return;
  if (category?.value == "" || category?.value == null) return;
  if (difficulty?.value == "" || difficulty?.value == null) return;
  const newWord: Word = {
    title: title.value,
    category: category.value,
    difficulty: difficulty.value,
    clicked: false
  }
  currentWords.push(newWord)
  title.value = ""
  category.value = ""
  difficulty.value = ""
    populate(newWord)
})
newClass.forEach((item) => {
  item.addEventListener("click", e => {
    if(item.classList.contains("clicked")){
      item.classList.remove("clicked")
      clickedWords -= 1
  } else if(clickedWords < 4){
    item.classList.add("clicked")
    clickedWords += 1
  }
})
})
newClass.forEach((item) => {
  item.addEventListener("contextmenu", e => {
    e.preventDefault()
    console.log("clicked")
    const mouseX = e.clientX
    const mouseY = e.clientY
    console.log(mouseX, mouseY)
    if (rightClickMenu == null) return
      rightClickMenu.style.top = `${mouseY}px`
      rightClickMenu.style.left = `${mouseX}px`
      rightClickMenu.classList.add("visible")
  
  })
})
body?.addEventListener("click", e => {
  if((e.target as HTMLElement).offsetParent != rightClickMenu){
    rightClickMenu?.classList.remove("visible")
  }
})

function getRandomNumber(min: number, max: number) {
  // Generate a random decimal between 0 and 1
  const randomDecimal = Math.random();
  // Scale the random decimal to the desired range
  const randomInRange = randomDecimal * (max - min + 1) + min;
  // Round down to the nearest whole number
  const randomInteger = Math.floor(randomInRange);
  return randomInteger;
}

function populate(item: Word){
if(currentWords.length > 16){
  window.alert("Cannot add more than 16 words")
} else {
  let randomIndex = getRandomNumber(0, 15)
  let itemPlaced: boolean = false
  while(itemPlaced == false){
    randomIndex = getRandomNumber(0, 15)
    let currentElement: HTMLDivElement = newClass[randomIndex]
    if(currentElement.innerHTML.length < 1){
      currentElement.textContent = item.title
      currentElement.setAttribute("category", item.category)
      currentElement.setAttribute("difficulty", item.difficulty)
      itemPlaced = true
    }
  }
}
}



