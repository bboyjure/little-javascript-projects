const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.ocopiedd)");
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelect = document.getElementById("movie")
let ticketPrize = movieSelect.value;

populateUI()


function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index)> -1){
                seat.classList.add("selected")
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")
    if(selectedMovieIndex){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

function setMovieData(movieIndex, moviePrize){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrize)
}

function updateSelectedCount() {
    const selectedSteats = document.querySelectorAll(".row .seat.selected")
    var selectedSteatsCount = selectedSteats.length
    count.innerText = selectedSteatsCount;
    total.innerHTML = selectedSteatsCount * ticketPrize

    //Copy the selected seats into array and map trough array and return new arra of indexes
    const seatsIndex = [...selectedSteats].map(seat => [...seats].indexOf(seat))

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("ocopiedd")) {
        e.target.classList.toggle("selected")
        setMovieData(e.target.selectedIndex, e.target.value)
        updateSelectedCount()
    }
    cosole.log()
})

movieSelect.addEventListener("change", (e)=>{
    ticketPrize = +e.target.value
    updateSelectedCount()
})


//initalcount total
updateSelectedCount()