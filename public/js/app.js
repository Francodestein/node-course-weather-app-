console.log("Client side javascript file is loaded!")


const weatherForm = document.querySelector("form")
const search = $("input")

const messageOne = $("#message-1")
const messageTwo = $("#message-2")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.val()

    messageOne.html("Loading...")
    messageTwo.html("")

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.html("")
                messageTwo.html(data.error)
            } else {
                messageOne.html("")
                messageTwo.html(data.location + " is " + data.forecast + " and " + data.temperature + "C degrees.")
            }
        })
    })
})