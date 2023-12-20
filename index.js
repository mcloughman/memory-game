// wrap the whole thing in a function that can be called if user wants to play again

function startGame() {
  const gameContainer = document.getElementById("game-container")

  // Putting this code outside of the playAgain function because I want the gameContainer with divs to remain UNITL the user clicks the play again button
  let gameOver = false

  let cardsChosen = []
  let matches = []
  let numGuesses = 0

  const scoreSpan = document.querySelector("#score-span")
  const scoreDiv = document.querySelector(".score-div")
  const lowestScoreSpan = document.querySelector("#lowest-score")
  console.log(gameContainer)
  gameContainer.innerHTML = ""
  scoreSpan.innerHTML = numGuesses

  let lowestScore = JSON.parse(localStorage.getItem("lowestScore")) || ""
  if (lowestScore) {
    lowestScoreSpan.innerText = `Lowest Score: ${lowestScore}`
  }

  let COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "navy",
    "yellow",
    "magenta",
    "gray",
    "peachpuff",
    "plum",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "navy",
    "yellow",
    "magenta",
    "gray",
    "peachpuff",
    "plum",
  ]

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter)

      // Decrease counter by 1
      counter--

      // And swap the last element with it
      let temp = array[counter]
      array[counter] = array[index]
      array[index] = temp
    }

    return array
  }

  let shuffledColors = shuffle(COLORS)

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  // it also adds a data-it attribute which will be useful to prevent against user getting a positive result from clicking the same card twice
  function createDivsForColors(colorArray) {
    for (let i = 0; i < colorArray.length; i++) {
      // create a new div
      const newDiv = document.createElement("div")
      newDiv.setAttribute("data-id", i)

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(colorArray[i])

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick)

      // append the div to the element with an id of game
      gameContainer.append(newDiv)
    }
  }

  // we will call this function when user has found all
  const playAgain = () => {
    btn = document.createElement("button")
    btn.classList.add("play-again-btn")
    btn.innerText = "Click to Play Again"
    scoreDiv.append(btn)
    btn.addEventListener("click", () => {
      btn.remove()
      startGame()
    })
  }

  function checkForMatch(arr) {
    if (arr.length !== 2) {
      alert("Pick Two Cards")
      return
    }
    if (arr[0].dataset.id === arr[1].dataset.id) {
      alert("You must pick two different cards")
      cardsChosen.pop()
      return
    }
    numGuesses++
    scoreSpan.innerHTML = `${numGuesses}`
    setTimeout(() => {
      if (arr[0].className === arr[1].className) {
        matches.push(arr[0], arr[1])

        if (matches.length === COLORS.length) {
          alert("You Found Them All!")
          gameOver = true
          if (numGuesses < lowestScore || !lowestScore) {
            lowestScore = numGuesses
            console.log(lowestScore)
            localStorage.setItem("lowestScore", JSON.stringify(lowestScore))
          }
          return playAgain()
        }
        alert("You found a match")
        arr[0].removeEventListener("click", handleCardClick)
        arr[1].removeEventListener("click", handleCardClick)

        cardsChosen = []
        return cardsChosen
      } else {
        alert("No Match")
        arr[0].style.backgroundColor = ""
        arr[1].style.backgroundColor = ""
        cardsChosen = []
        return cardsChosen
      }
    }, 1000)
  }

  // TODO: Implement this function!
  function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    console.log(event.target.value)
    const choice = event.target
    const colorDiv = event.target
    choice.style.backgroundColor = colorDiv.className

    cardsChosen.push(colorDiv)

    if (cardsChosen.length === 2) {
      checkForMatch(cardsChosen)
    }
  }

  // when the DOM loads
  createDivsForColors(shuffledColors)
}
startGame()

/* */
