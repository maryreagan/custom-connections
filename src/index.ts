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
  populate()
})
function populate(){
  if(currentWords.length >= 16){
    newClass.forEach((item) => {
      let randomIndex = getRandomNumber(1, currentWords.length) - 1
      console.log(randomIndex, currentWords.length)
      console.log(currentWords[randomIndex].title)
      item.textContent = currentWords[randomIndex].title
      // let itemWord = currentWords[randomIndex]
      currentWords.splice(randomIndex, 1)
      item.addEventListener("click", () => {
        item.classList.add("clicked")
      })
    })
  }

}
function getRandomNumber(min: number, max: number) {
  // Generate a random decimal between 0 and 1
  const randomDecimal = Math.random();
  console.log(randomDecimal)
  // Scale the random decimal to the desired range
  const randomInRange = randomDecimal * (max - min + 1) + min;
  // Round down to the nearest whole number
  const randomInteger = Math.floor(randomInRange);
  console.log(randomInteger)
  return randomInteger;
}





