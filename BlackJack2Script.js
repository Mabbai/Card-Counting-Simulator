document.addEventListener('DOMContentLoaded', () => { //Load everything first
  
  hitButton.addEventListener('click', () => {
    alertCenter(HANDPOOL.HAND, dealer, 'H')    
    HANDPOOL.HAND.hit()
  });
  document.addEventListener('keypress', (event) => {
    if (HANDPOOL.HAND && (event.key === 'A' || event.key === 'a')) {
      hitButton.click()
    }
  });
  surrenderButton.addEventListener('click', () => {
    alertCenter(HANDPOOL.HAND, dealer, 'U')
    HANDPOOL.HAND.surrender()
  });
  document.addEventListener('keypress', (event) => {
    if (HANDPOOL.HAND && (event.key === 'U' || event.key === 'u')) { 
      surrenderButton.click()
    }
  });
  dubbleButton.addEventListener('click', () => {
    alertCenter(HANDPOOL.HAND, dealer, 'D')
    HANDPOOL.HAND.dubble()
    });
  document.addEventListener('keypress', (event) => {
    if (HANDPOOL.HAND && (event.key === 'D' ||  event.key === 'd')) { 
      dubbleButton.click()
    }
  });
  standButton.addEventListener('click', () => {
    alertCenter(HANDPOOL.HAND, dealer, 'S')

    HANDPOOL.HAND.stand()
    });
  document.addEventListener('keypress', (event) => {
    if (HANDPOOL.HAND && (event.key === 'S' || event.key === 's')) { 
      standButton.click()
    }
  });
  splitButton.addEventListener('click', () => {
    alertCenter(HANDPOOL.HAND, dealer, 'Y')

    HANDPOOL.HAND.split()
    });
  document.addEventListener('keypress', (event) => {
    if (HANDPOOL.HAND && (event.key === 'W' || event.key === 'w')) { 
      splitButton.click()
    }
  });
  document.addEventListener('keypress', (event) => {
    if (event.key === 'x' || event.key === 'X') {
      event.preventDefault()
      goButton.click()
      document.getElementById("goButton").setAttribute("disabled",true)

    }
  })
  document.addEventListener('keypress', (event) => {
    if (event.key === 'c' || event.key === 'C') {
      selectButton.click()
    }
  } )
  
  shoeButt.addEventListener('click', () => {
    if (document.getElementById("shoe").style.display === "none") {
      document.getElementById("shoe").style.display = "flex"
    } 
    else {
      document.getElementById("shoe").style.display = "none"
    }  
  })
  runningButt.addEventListener('click', () => {
    if (document.getElementById("runningCount").style.display === "none") {
      document.getElementById("runningCount").style.display = "flex"
    } 
    else {
      document.getElementById("runningCount").style.display = "none"
    }  
  })
  trueButt.addEventListener('click', () => {
    if (document.getElementById("trueCount").style.display === "none") {
      document.getElementById("trueCount").style.display = "flex"
    } 
    else {
      document.getElementById("trueCount").style.display = "none"
    }  
  })
  





});

function alertCenter(hand, dealer, ans) {
  let basicS = document.getElementById("check1").checked
  let trueDev = document.getElementById("check2").checked
  if (trueDev && basicS) {
    return
  }
  else if (trueDev && !basicS) {
    basicStrategy(hand, dealer, ans)
  }
  else {
    generalDeviations(hand, dealer, ans)
  }

}

function handValue(hand) {
  let j = 0
  let aceCount = 0
  for (i in hand) {
    j += hand[i].getValue()
    if (hand[i].rank === 'A') {
      aceCount += 1
    }
  }
}
function basicStrategy(hand, dealer, ans) {
  if (document.getElementById("check1").checked) {
    return
  }
  let score = handValue(hand.cards)
  let d = dealer.cards[0].getValue()
  
  let show = []
  for (i in hand.cards) {
    show.push(hand.cards[i].rank)
  }
  
  if (hand.cards[0].getValue() === hand.cards[1].getValue() && hand.cards.length === 2) {
    let Pd = d -2
    let Pscore = 11-hand.cards[0].getValue()
    let Pindex = "P"+String(Pd)+String(Pscore)
    let Pcor = document.getElementById(Pindex) ? document.getElementById(Pindex).innerText : false;
    if (Pcor) {
      Pcor = String(Pcor).trim()
    }
    console.log(Pcor, ans)
    if (Pcor) {
      if (Pcor === 'N') {
        if (ans === 'Y') {
          alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
          it is not correct to split according to Basic strategy`)
          return
        }
      }
      if (Pcor === 'Y') {
        if (ans != 'Y') {
          alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
          it is correct to split according to Basic strategy`)
          return
        }
      }
    }
    if (Pcor === ans) {
      return
    }
  }
  
  let k =0
  let p = 0
  for (i in hand.cards) {
    if (hand.cards[i].rank === 'A') {
      k +=1
    }
    p += hand.cards[i].getValue()
  }
  if (k > 0  && p < 21) {
    let Sd = d-2
    let Sscore = 9-(score -11)
    let Sindex = "S"+String(Sd)+String(Sscore)
    let Scor = document.getElementById(Sindex) ? document.getElementById(Sindex).innerText : false;
    if (Scor) {
      Scor = String(Scor).trim()
    }
    console.log(Scor, ans)
    if (Scor === 'Ds') {
      if (document.getElementById("dubbleButton").disabled) {
        Scor = 'S'
      }
      else if (hand.cards.length === 2) {
        Scor = 'D'
      }
    }
    if (Scor === 'D' && document.getElementById("dubbleButton").disabled) {
      Scor = 'H'
    }
    if (Scor && ans != Scor) {
      alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
      ${Scor} is correct according to Basic strategy`)
      return
      
    }
    else if (Scor === ans) {
      return
    }
  }
  if ((hand.placeId === '0' || hand.placeId === '1' || hand.placeId === 'U') && hand.cards.length === 2) {
    let Ud = d-2
    let Uscore = 16-score
    let Uindex = "U"+String(Ud)+String(Uscore)
    let Ucor = document.getElementById(Uindex) ? document.getElementById(Uindex).innerText : false;
    if (Ucor) {
      Ucor = String(Ucor).trim()
    }
    if (Ucor === '<empty string>') {
      Ucor = false
    }
    

    if (Ucor && ans != Ucor.trim()) {
      alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
      ${Ucor} is correct according to Basic strategy`)
      return
    }
    else if (Ucor && Ucor.trim() === ans) {
      return
    }
  }
  
  let Hd = d-2
  let Hscore = 17-score
  let Hindex = "H"+String(Hd)+String(Hscore)
  let Hcor = document.getElementById(Hindex) ? document.getElementById(Hindex).innerText : false;
  if (Hcor) {
    Hcor = String(Hcor).trim()
  }
  console.log(Hcor, ans)
  if (Hcor === 's') {
    if (document.getElementById("dubbleButton").disabled) {
      Hcor = 'S'
    }
    else {
      Hcor = 'D'
    }
  }
  if (Hcor === 'D' && document.getElementById("dubbleButton").disabled) {
    Hcor = 'H'
  }
  if (Hcor && ans != Hcor) {
    alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
    ${Hcor} is correct according to Basic strategy`)
    return
  }
  if (score > 17) {
    if (ans != 'S') {
      alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
      S is correct`)
      return
    }
  }
  if (score < 8) {
    if (ans != 'H') {
      alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
      H is correct`)
      return
    }
  
  }
  
}
function checkS(hand) {
  let k =0
  let p = 0
  for (i in hand.cards) {
    if (hand.cards[i].rank === 'A') {
      k +=1
    }
    p += hand.cards[i].getValue()
  }
  return (k > 0  && p < 21)
}

function generalDeviations(hand, dealer, ans) {
  //Endast en ändring är möjlig per situation, kanske fixa det?
  let list = ["0+","1+","2+","3+","4+","5+","6+","-0-","-1-","-2-"]
  let res = false
  let show = []
  for (i in hand.cards) {
    show.push(hand.cards[i].rank)
  }

  let margin = parseFloat(document.getElementById("failMargin").innerText)
  let count = shoe.trueCount

  for (i in list) {
    let neg = false
    let countId = list[i][0]
    
    if (countId[0] == '-') {
      neg = true
    }
    countId = parseFloat(list[i].slice(0,-1))
    let Ad0i
    let sna
    let id

    let d0
    let Ad0
    
    if (neg) {
      if (count - margin <= countId) {
        d0 = document.getElementById(list[i]).innerText
        Ad0 = d0.split(";")
        
      }
    }    
    else if (!neg) {
      if (count + margin >= countId) {
        d0 = document.getElementById(list[i]).innerText
        Ad0 = d0.split(";")
        
      }
    }
    
    if ((!neg && count + margin >= countId) || (neg && count - margin <= countId)) {
      for (j in Ad0) {
        Ad0i = Ad0[j].trim()[0]
        sna = Ad0[j][Ad0[j].length -1]
        //console.log(Ad0i === 'H')
        console.log(checkS(hand))
        id = Ad0[j].slice(Ad0[j].indexOf('(')+1,Ad0[j].indexOf(')')).split(',')
        //console.log(Ad0i=== 'H')
        if (Ad0i === 'P' && hand.cards[0].getValue() === hand.cards[1].getValue() && hand.cards.length === 2) {
          console.log(id[2])
          if (id[0] === 'T' && id [1] === 'T') {
            id[0] = '10'
            id[1] = '10'
          }
          else if (id[0] === 'A' && id [1] === 'A') {
            id[0] = '11'
            id[1] = '11'
          }
        
          if (hand.cards[0].getValue() == id[0] && dealer.cards[0].getValue() == id[2]) {
            console.log(id)
            res = true
            if (ans != sna) {
              if ((!neg && count - margin <= countId) || (neg && count + margin >= countId)) {
                basicStrategy(hand, dealer, ans)
              }
              
              else {
                alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
                ${sna} is correct according to true count deviations`)
                return
              } 
            }
            if (ans === sna) {
              return
            }
          }
        }
          
        else if (Ad0i === 'S' && checkS(hand)) {
          console.log(sna)

          if (id[1] == handValue(hand.cards) -11 && id[2] == dealer.cards[0].rank) {
            res = true
            if (sna === 's') {
              if (document.getElementById("dubbleButton").disabled) {
                sna = 'S'
              }
              else {
                sna = 'D'
              }
            }
            if (sna === 'D' && document.getElementById("dubbleButton").disabled) {
              sna = 'H'
            }
            
            if (ans != sna) {
              if ((!neg && count - margin <= countId) || (neg && count + margin >= countId)) {
                basicStrategy(hand, dealer, ans)
              }
              else {
                alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
                ${sna} is correct according to true count deviations`)
                return
              }            
            }
            else if (ans === sna) {
              return
            }

          }
        }
        else if (!(hand.cards[0].getValue() == hand.cards[1].getValue()) && Ad0i === 'U' && !checkS(hand) && hand.cards.length == 2 && (hand.placeId === '0' || hand.placeId === '1' || hand.placeId === 'U')) {
          console.log(Ad0i)

          if (id[0] == handValue(hand.cards) && id[1] == dealer.cards[0].rank) {
            res = true
            if (ans != sna) {
              if ((!neg && count - margin <= countId) || (neg && count + margin >= countId)) {
                basicStrategy(hand, dealer, ans)
              }
              else {
                alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
                ${sna} is correct according to true count deviations`)
                return
              }   
            }
            if (ans === sna) {
              return
            }

          }
        }
        else if (Ad0i === 'H') {
          console.log(Ad0i)
          
          if (id[0] == handValue(hand.cards) && id[1] == dealer.cards[0].rank) {
            if (sna === 's') {
              if (document.getElementById("dubbleButton").disabled) {
                sna = 'S'
              }
              else {
                sna = 'D'
              }
            }
            console.log(document.getElementById("dubbleButton").disabled)
            if (sna === 'D' && document.getElementById("dubbleButton").disabled) {
              sna = 'H'
            }
            res = true
            if (ans != sna) {
              if ((!neg && count - margin <= countId) || (neg && count + margin >= countId)) {
                basicStrategy(hand, dealer, ans)
              }
              else {
                alert(`For Hand: ${show} and dealer: ${dealer.cards[0].rank}
                ${sna} is correct according to true count deviations`)
                return

              } 
            }
            if (ans === sna) {
              return
            }
          }
        }  
      }
    }
    
  }
  if (!res) {
    basicStrategy(hand, dealer, ans)
  }
}
function collectBetSpreads() {
  let bets = []
  for (let i = 0; i < 11; i++) {
    bets.push(parseInt(document.getElementById(`B${i}`).innerText)) 
  }
  let uniqueBets = bets.filter((el, ind) => {
    return bets.indexOf(el)=== ind
  })
  
  createButtons(uniqueBets)
}

betUpdate.addEventListener('click', () => {
  collectBetSpreads()
})
//checkBetStrategy(250)
function checkBetStrategy(ans) {
  let res = false
  let ser = false
  let bets = []
  for (let i = 0; i < 11; i++) {
    let k = parseInt(document.getElementById(`B${i}`).innerText)
    let j = parseInt(document.getElementById(`H${i}`).innerText)
    
    bets.push([k,j]) 
  }
  let count = shoe.trueCount
  let margin = document.getElementById("failMargin").innerText
  
  
  margin = parseFloat(margin)
  count = parseFloat(count)


  let q = bets[5]
  bets.splice(5,0,q)
  
  for (let i = -5; i<7; i++) {
    if (i === -5) {
      if (count-margin <= -5) {
        if (ans === bets[i+5][0]) {
          res = true
        }
        if (douce && bets[i+5][1] === 2) {
          ser = true
        }
        if (!douce && bets[i+5][1] === 1) {
          ser = true
        }
        
      }
    }
    else if (i === 5) {
      if (count+margin >= 5) {
        if (ans === bets[i+5][0]) {
          res = true
        }
        if (douce && bets[i+5][1] === 2) {
          ser = true
        }
        if (!douce && bets[i+5][1] === 1) {
          ser = true
        }
      }
    }
    else if (count+margin >= i-1 && count-margin <= i) {
      
      if (ans === bets[i+5][0]) {
        
        res = true
      }
      if (douce && bets[i+5][1] === 2) {
        ser = true
      }
      if (!douce && bets[i+5][1] === 1) {
        ser = true
      }
    }
  }
  if (!res && !ser) {
    alert("Wrong bet size and number of hands according to bet spread strategy")
  }
  else if (!res) {
    alert(`Wrong bet size according to bet spread strategy`)
  }
  else if (!ser) {
    alert("Wrong number of hands according to bet spread strategy")
  }
}

const container = document.getElementById('container'); // Get the container element
const dealerContainer = document.getElementById('dealer-container')

async function newDisplayCard(card, place, hand) {
  //await sleep(500)

  let sort = card.rank + card.suit[0]
  if (sort[0] === '1') {
    sort = sort.slice(1,3)
  }
  startAnimation((place[0]),(place[1]), TIME/2000, hand)
  
  const theCard = document.createElement("img")

  theCard.src = `${sort}.png`
  //theCard.className = "card2"
  theCard.id = card.worldOrder
  theCard.style.position = "absolute"
  //theCard.style.display = "block"
  //theCard.style.boxShadow = "0 0 3px rgba(0,0,45)"
  theCard.style.transform = "translate(-50%,-50%)"
  theCard.style.width = "6vw" 
  theCard.style.left =`${place[0]+3}%`
  theCard.style.top = `${place[1]-110}%`

  //theCard.style.marginTop = placeId[0]
  //theCard.style.marginLeft = placeId[1]

  container.appendChild(theCard);
  
 
}

async function newDealerCard(card) {
  let sort = card.rank + card.suit[0]
  if (sort[0] === '1') {
    sort = sort.slice(1,3)
  }
  startAnimation(50, -350, TIME/2000)
  //await sleep(500)
  const theCard = document.createElement("img")
  theCard.src = `${sort}.png`
  dealerContainer.appendChild(theCard)
}

async function hiddenCard() {
  startAnimation(50, -350, TIME/2000)
  //await sleep(TIME/2)
  let hiddenCard = document.createElement("img")
  hiddenCard.id = "hiddenCard"
  hiddenCard.src = "back.png"
  dealerContainer.appendChild(hiddenCard)
}

async function showHiddenCard(dealerHand) {
  //await sleep(500)
  let hiddenCard = document.getElementById("hiddenCard")
  let card = dealerHand[1]
  let sort = card.rank + card.suit[0]

  shoe.runningCount += shoe.stack
  shoe.stack = 0
  shoe.trueCount = shoe.runningCount/(shoe.cards.length/52)

  document.getElementById("runningCount").innerText = `Running Count: ${shoe.runningCount}`
  document.getElementById("trueCount").innerText = `True Count: ${shoe.trueCount.toFixed(2)}`
  
  if (sort[0] === '1') {
    sort = sort.slice(1,3)
  }
  
  hiddenCard.src = `${sort}.png`
}

function flipCard(card) {
  let theCard = document.getElementById(`${card.worldOrder}`)
  theCard.style.transform = "rotate(90deg)"
  theCard.style.marginTop= "-6%"
  theCard.style.marginLeft= "-1%"

}

function createButtons(Buttons) {
  const container = document.getElementById('buttonContainer'); // Get the container element
  container.innerHTML = ''; // Clear existing content

  for (let i = 0; i < Buttons.length; i++) {
    const button = document.createElement('button'); // Create a new button element
    button.innerText = `${Buttons[i]}`;
    
    button.style.backgroundColor = "lightgreen"
  
    button.style.fontSize ="0.9vw"
    button.style.padding = "0.2vw 0.4vw"
    button.id = `button${i}`; // Optional: Assign an ID to each button

    container.appendChild(button); // Append the button to the container
    button.addEventListener('click', () => {
      document.getElementById("goButton").innerText = `Bet: ${button.innerText}`;
      activeBet = Buttons[i];
  });
  document.addEventListener('keypress', (event) => {
    const buttonIndex = parseInt(event.key, 10) - 1; // Convert key to index
    if (buttonIndex >= 0 && buttonIndex < Buttons.length) {
      let buttonID = `button${buttonIndex}`
      let buttonToClick = document.getElementById(buttonID)
      if (buttonToClick) {
        buttonToClick.click()
      }
      
    }
  });
  }
}



const selectButton = document.getElementById("handSelector")
selectButton.addEventListener('click', () => {
  if (douce) {
    douce = false
    selectButton.innerHTML = "Hands: 1" 
  }
  else if (!douce) {
    douce = true
    selectButton.innerHTML = "Hands: 2" 
  }
});

let activeBet = 500
let douce = true

function startAnimation(targetX, targetY, time, hand) {
  const entity = document.getElementById('movingEntity');
  entity.style.animation = "none"
  void entity.offsetWidth;
  const rootStyle = document.documentElement.style;
  // Set CSS variables to target positions
  
  if (hand) {
    rootStyle.setProperty('--move-to-x', (3+targetX) + '%');
    rootStyle.setProperty('--move-to-y', (targetY-150) + '%')
    console.log(targetY*(3.2**(hand.placeId.length-1)))
  }
  else {
    rootStyle.setProperty('--move-to-x', targetX + '%');
    rootStyle.setProperty('--move-to-y', targetY + '%');
  }

  // Apply the animation
  entity.style.animation = `moveAndDisappear ${time}s`;
  
}

function moveCard(targetX, targetY, card) {
  const entity = document.getElementById(card);
  
  const rootStyle = document.documentElement.style;
  
  // Set CSS variables to target positions
  rootStyle.setProperty('--move-to-y', targetX + '%');

  rootStyle.setProperty('--move-to-y', targetY + '%');

  // Apply the animation
  entity.style.animation = `cardMove 0.5s`;
  
}
let res = 0

goButton.addEventListener('click', () => {
  if (!document.getElementById("check3").checked) {
    checkBetStrategy(activeBet)
  }
  TIME = document.getElementById("speed").innerText
  
  updateShoe()
  document.getElementById("container").innerHTML = ''
  document.getElementById("dealer-container").innerHTML =''
  res = bankroll.cash
  
  runGame(douce, activeBet)
  document.getElementById("popup").style.display = "none"
  dealer.empty()
  localStorage.setItem("Bank", bankroll.cash)

 
})

let DAS = true
let S17 = true

let deckPen = document.getElementById("deckPen").innerText

let amountDecks = document.getElementById("decksInShoe").innerText

let money = document.getElementById("setBankroll").innerText

bankReset.addEventListener('click', () => {
  bankroll.cash = money
  localStorage.setItem('Bank', money)
  document.getElementById("bankroll").innerText = `Bankroll: ${money}`
})


function updateShoe() {
  console.log(deckPen)
  if (shoe.shuffleCheck()) {
    shoe = new Shoe(amountDecks, deckPen)
    shoe.shuffle()
  }
  if (deckPen != document.getElementById("deckPen").innerText ||
  amountDecks != document.getElementById("decksInShoe").innerText
  ) {
    amountDecks = document.getElementById("decksInShoe").innerText
    deckPen = document.getElementById("deckPen").innerText
    shoe = new Shoe(amountDecks, deckPen)
    shoe.shuffle()
  }
  
}

const cell = document.getElementsByClassName("cell")


createButtons([250,500,750,1000])

function generateGridsU() {
 
  let container = ""
  let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T','A'];
  for (let p = 0; p < 3; p++) {
    for (let q = 0; q < 11; q++) {
      if (q=== 0) {
        container += `<div class="cell"style="background-color: rgb(219, 60, 60)">${16-p}</div>`
      }
      else {
        container += `<div id=U${String(q-1)+String(p)} contenteditable="true" class="cell"></div>`
      }     

    }
  }
  return container
}
function generateGridsP() {
 
  let container = ""
  let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T','A'];
  for (let p = 0; p < 10; p++) {
    for (let q = 0; q < 11; q++) {
      if (q=== 0) {
        container += `<div class="cell"style="background-color: rgb(219, 60, 60)">${ranks[9-p]},${ranks[9-p]}</div>`
      }
      else {
        container += `<div id=P${String(q-1)+String(p)} contenteditable="true" class="cell"></div>`
      }     

    }
  }
  return container
}
function generateGridsS() {
 
  let container = ""
  let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T','A'];
  for (let p = 0; p < 8; p++) {
    for (let q = 0; q < 11; q++) {
      if (q=== 0) {
        container += `<div class="cell"style="background-color: rgb(219, 60, 60)">A,${9-p}</div>`
      }
      else {
        container += `<div id=S${String(q-1)+String(p)} contenteditable="true" class="cell"></div>`
      }     

    }
  }
  return container
}
function generateGridsH() {
 
  let container = ""
  let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T','A'];
  for (let p = 0; p < 10; p++) {
    for (let q = 0; q < 11; q++) {
      if (q=== 0) {
        container += `<div class="cell"style="background-color: rgb(219, 60, 60)">${17-p}</div>`
      }
      else {
        container += `<div id=H${String(q-1)+String(p)} contenteditable="true" class="cell"></div>`
      }     

    }
  }
  return container
}


function storer() {
  let list = ["0+","1+","2+","3+","4+","5+","6+","-0-","-1-","-2-"]
  let list2 = ['2','3','4','5','6','7','8','9','10','A']
  for (let i = 0; i<10; i++) {
    for (let j = 0; j<10; j++) {
      localStorage.setItem(`H${j}${i}`, document.getElementById(`H${j}${i}`).innerText)
      if (i < 8) {
        localStorage.setItem(`S${j}${i}`, document.getElementById(`S${j}${i}`).innerText)
      }
      localStorage.setItem(`P${j}${i}`, document.getElementById(`P${j}${i}`).innerText)
      if (i < 3) {
        localStorage.setItem(`U${j}${i}`, document.getElementById(`U${j}${i}`).innerText)
      }
    }
    localStorage.setItem(`${list[i]}`, document.getElementById(`${list[i]}`).innerText)
    localStorage.setItem(`${list2[i]}S`, document.getElementById(`${list2[i]}S`).innerText)
  }

  for (let k = 0; k<11; k++) {
    localStorage.setItem(`B${k}`, document.getElementById(`B${k}`).innerText)
    localStorage.setItem(`H${k}`, document.getElementById(`H${k}`).innerText)
  }
  localStorage.setItem('failMargin', document.getElementById('failMargin').innerText)
  localStorage.setItem('DASD', DAS)
  localStorage.setItem('S17D', S17)

  localStorage.setItem('decksInShoe', document.getElementById('decksInShoe').innerText)
  localStorage.setItem('deckPen', document.getElementById('deckPen').innerText)
  localStorage.setItem('speed', document.getElementById('speed').innerText)
  localStorage.setItem('setBankroll', document.getElementById('setBankroll').innerText)

  
}






function keepStored() {
  let list = ["0+","1+","2+","3+","4+","5+","6+","-0-","-1-","-2-"]
  let list2 = ['2','3','4','5','6','7','8','9','10','A']
  for (let i = 0; i<10; i++) {
    for (let j = 0; j<10; j++) {
      if (localStorage.getItem(`H${j}${i}`)) {
        document.getElementById(`H${j}${i}`).innerText = localStorage.getItem(`H${j}${i}`)
      }
      if (i < 8 && localStorage.getItem(`S${j}${i}`)) {
        document.getElementById(`S${j}${i}`).innerText = localStorage.getItem(`S${j}${i}`)
      }
      if (localStorage.getItem(`P${j}${i}`)) {
        document.getElementById(`P${j}${i}`).innerText = localStorage.getItem(`P${j}${i}`)
      }
      if (i < 3 && localStorage.getItem(`U${j}${i}`)) {
        document.getElementById(`U${j}${i}`).innerText = localStorage.getItem(`U${j}${i}`)
      }
      console.log(localStorage.getItem(`H${j}${i}`))
    }
    if (localStorage.getItem(`${list[i]}`)) {
      document.getElementById(`${list[i]}`).innerText = localStorage.getItem(`${list[i]}`)
    }
    if (localStorage.getItem(`${list2[i]}S`)) {
      document.getElementById(`${list2[i]}S`).innerText = localStorage.getItem(`${list2[i]}S`)
    }
  }
  for (let k = 0; k<11; k++) {
    if (localStorage.getItem(`B${k}`)) {
      document.getElementById(`B${k}`).innerText = localStorage.getItem(`B${k}`)
    } 
    if (localStorage.getItem(`H${k}`)) {
      document.getElementById(`H${k}`).innerText = localStorage.getItem(`H${k}`)
    } 
  }
  if (localStorage.getItem('failMargin')) {
    document.getElementById('failMargin').innerText = localStorage.getItem('failMargin')
  }
  if (localStorage.getItem('DASD') !== undefined) {
    if (localStorage.getItem('DASD') == 'false') {
      DAS = false
    }

    if (!DAS) {
      console.log(DAS)
      document.getElementById('buttonDAS').innerText = "DAS not allowed"
    }
  }

  if (localStorage.getItem('S17D') !== undefined) {
    if (localStorage.getItem('S17D') == 'false') {
      S17 = false
    }
    if (!S17) {
      document.getElementById("buttonS17").innerText = 'H17'
    }
  }
  if (localStorage.getItem('decksInShoe')) {
    document.getElementById('decksInShoe').innerText = localStorage.getItem('decksInShoe')
  }
  if (localStorage.getItem('deckPen')) {
    document.getElementById('deckPen').innerText = localStorage.getItem('deckPen')
  }
  if (localStorage.getItem('speed')) {
    document.getElementById('speed').innerText = localStorage.getItem('speed')
  }
  if (localStorage.getItem('setBankroll')) {
    document.getElementById('setBankroll').innerText = localStorage.getItem('setBankroll')
  }

  

}

keepStored()


saveChanges.addEventListener('click', () => {
  storer()
})
discardChanges.addEventListener('click', () => {
  localStorage.clear()
  
})





buttonS17.addEventListener('click', () => {
  
  if (S17) {
    document.getElementById("buttonS17").innerText = 'H17'
    S17 = false
  }
  else {
    document.getElementById("buttonS17").innerText = 'S17'
    S17 = true
  }
  console.log(S17)
})

buttonDAS.addEventListener('click', () => {

  if (DAS) {
    document.getElementById("buttonDAS").innerText = 'DAS not allowed'
    DAS = false
  }
  else {
    document.getElementById("buttonDAS").innerText = 'DAS allowed'
    DAS = true
  }
  console.log(DAS)
})
//shoe.cards = [new Card('Hearts', '10'),new Card('Hearts', '10'),new Card('Hearts', '10'),new Card('Hearts', '10'),new Card('Hearts', '10'),new Card('Hearts', '10'),new Card('Hearts', '10'),new Card('Hearts', '10'),new Card('Hearts', '10')]
