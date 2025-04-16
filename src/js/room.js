const bookModalWindow = document.querySelector(".room-booking-button");
const seePriceBtn = document.querySelector(".hotel-btn");

console.log("bookModalWindow=", bookModalWindow);
console.log("seePriceBtn", seePriceBtn);

const handleBookRoom = (e) => {
   console.dir("target=", e.target);
}

const handleSeePrice = (e)=> {
   console.dir("target=", e.target);
}



bookModalWindow.addEventListener('click', handleBookRoom);
seePriceBtn.addEventListener('click', handleSeePrice);
