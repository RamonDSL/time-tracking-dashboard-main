const buttons = document.querySelectorAll('button')
const cards = document.querySelectorAll('.card')
const activities = ["Work", "Play", "Study", "Exercise", "Social", "Self Care"]

for (const button of buttons) {
    button.addEventListener('click', () => {
        if (button.classList.contains("active")) {
            return
        }
        
        selectButton(button)

        switch (button.innerText) {
            case "Daily":
                handleButtonClick("daily")
                break;
            case "Weekly":
                handleButtonClick("weekly");
                break

            default:
                handleButtonClick("monthly");
                break;
        }
    })
}

for (const card of cards) {
    card.addEventListener('mouseover', () => cardFocus(card)) 
    card.addEventListener('mouseout', () => cardBlur(card))
}


function cardFocus(card) {
    const tela = card.querySelector('.tela')
    tela.style.display = "block"
}

function cardBlur(card) {
    const tela = card.querySelector('.tela')
    tela.style.display = "none"
}


function selectButton(button) {    

    const selectedButton = document.querySelector('button.active')
    selectedButton.classList.remove("active")


    button.classList.add("active")
}

async function handleButtonClick(time) {
    const current = document.querySelectorAll('.current') 
    const previous = document.querySelectorAll('.previous')
     
    const data = await timeFrames()


    for (const activity in activities) {
        if (time === "daily") {
            current[activity].innerHTML = `${data[activity]["timeframes"][time]["current"]}${data[activity]["timeframes"][time]["current"] > 1? "hrs": "hr"}`            
        } else if (time === "weekly") {
            current[activity].innerHTML = `${data[activity]["timeframes"][time]["current"]}
            ${data[activity]["timeframes"][time]["current"] > 1? "hrs": "hr"}`            
        } else {
            current[activity].innerHTML = `${data[activity]["timeframes"][time]["current"]}${data[activity]["timeframes"][time]["current"] > 1? "hrs": "hr"}`            
        }
        if (time === "daily") {
            previous[activity].innerHTML = `Last Day - ${data[activity]["timeframes"][time]["previous"]}${data[activity]["timeframes"][time]["previous"] > 1? "hrs": "hr"}`            
        } else if (time === "weekly") {
            previous[activity].innerHTML = `Last Week - ${data[activity]["timeframes"][time]["previous"]}
            ${data[activity]["timeframes"][time]["previous"] > 1? "hrs": "hr"}`
        } else {
            previous[activity].innerHTML = `Last Month - ${data[activity]["timeframes"][time]["previous"]}${data[activity]["timeframes"][time]["previous"] > 1? "hrs": "hr"}`
        }
    }
}

async function pegaTitulos() {
    const titles = document.querySelectorAll('div.activity>h2')
    const data = await timeFrames()

    titles.forEach((title, i) => {
        title.innerHTML = data[i]["title"]
    })
}

async function timeFrames() {
    const response = await fetch("data.json")
    const data = await response.json()

    return data
}

pegaTitulos()
handleButtonClick("daily")