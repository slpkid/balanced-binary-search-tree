

function CerealBox(num) {
  let nameOfCereal = num
  const eatCereal = function() { root  = "Fuck you"};

  let root = num

  const increaseNumber = () => {
    root++
  }

  const returnNumber = () => {
    return root
  }

  const setNumberTo69 = () => {
    root = null
    root = {name:"fruity pebbles", forks: 9}
  }

  const fuckYou = () => {
    root = null
}

  return { nameOfCereal, eatCereal, increaseNumber, returnNumber, setNumberTo69, fuckYou };
}

// let captainCrunch = new CerealBox({name:"captain crunch", spatulas: 27});

// console.log(captainCrunch.returnNumber())
// // captainCrunch.increaseNumber()
// // console.log(`increasing number`)
// console.log(captainCrunch.returnNumber())
// captainCrunch.setNumberTo69()
// console.log(`setting number to 69`)
// console.log(captainCrunch.returnNumber())
// captainCrunch.eatCereal()
// console.log('setting root to \'fuck you\'')
// console.log(captainCrunch.returnNumber())
// captainCrunch.fuckYou()
// console.log('setting root to null')
// console.log(captainCrunch.returnNumber())

// console.log(captainCrunch.nameOfCereal);
// captainCrunch.eatCereal()
// console.log(captainCrunch.nameOfCereal);

// captainCrunch.nameOfCereal = null
// console.log(captainCrunch.nameOfCereal);
