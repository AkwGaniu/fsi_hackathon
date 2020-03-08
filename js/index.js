const msg = document.querySelector(".msg")
const base_url = "https://sandboxapi.fsi.ng/nibss"


//Print Error message
const printError = (elementId, msg) => {
    document.querySelector(elementId).innerHTML = msg
}

