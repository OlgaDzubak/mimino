import { mimino_API } from "./api";
import { Notify } from "notiflix";

const api = new mimino_API();
let abortCtrl1, abortCtrl2;

!function (e) { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;){ if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);

//----------------------------------------
const roomData = [
   {
      room_en: 'double-luxe',
      room_ua: 'Двомісний номер люкс',
      price: 3000,
   },
   {
      room_en: 'double',
      room_ua: 'Двомісний номер',
      price: 2000      
   },
   {
      room_en: 'triple',
      room_ua: 'Трьохмісний номер',
      price: 2500      
   }
]
//----------------------------------------

const disableScroll = () => {
   let pagePosition = window.scrollY;
   document.body.classList.add('block-scroll');
   document.body.dataset.position = pagePosition;
   document.body.style.top = -pagePosition + 'px';
}
const enableScroll = () => {
   let pagePosition = parseInt(document.body.dataset.position, 10);
   document.body.style.top = 'auto';
   document.body.classList.remove('block-scroll');
   window.scroll({ top: pagePosition, left: 0 });
   document.body.removeAttribute('data-position');
}
   
const openModalWindow = (modalWindow) => {
   document.querySelector('.js-overlay-modal').classList.add('active');
   modalWindow.classList.add('active');   
   disableScroll();   
}
const closeModalWindow = (modalWindow) => {
   modalWindow.classList.remove('active');
   document.querySelector('.js-overlay-modal').classList.remove('active');
   enableScroll();   
}

document.addEventListener('DOMContentLoaded', function () {

   const bookHotelModalW = document.querySelector('.modal[data-modal="1"]');
   const bookRestaurantModalW = document.querySelector('.modal[data-modal="2"]');
   const priceModalW = document.querySelector('.modal[data-modal="3"]');

   const modalButtons = document.querySelectorAll('.js-open-modal');
   const modalRoomSelect = document.querySelector('select.room');
   const modalBookSelect = document.querySelector('select.book');
   const overlay = document.querySelector('.js-overlay-modal');
   const closeButtons = document.querySelectorAll('.js-modal-close');
   const inputNights = document.querySelector('input[name="nights"]');
   const inputPrice = document.querySelector('input[name="price"]');
   const bookRoomButtons = document.querySelectorAll('.book-room-btn');
   const hotelBookingForm = document.querySelector('.confirm-hotel-booking');
   const restaurantBookingForm = document.querySelector('.confirm-restaurant-booking');   


   modalButtons.forEach(item => {

      item.addEventListener('click', (e) => {
         
         const modalId = item.getAttribute('data-modal'),
         modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
         const room = roomData.find(item => item.room_en === e.target.dataset.room) || roomData[0];

         switch (e.target.dataset.modal) {
            case '1':
                     for (const option of modalBookSelect.options) { 
                        (option.label === room.room_ua) ? option.selected = true : option.selected = false;
                     }
                     break;
            case '3': 
                     for (const option of modalRoomSelect.options) {
                        (option.label === room.room_ua) ? option.selected = true : option.selected = false;
                     }
                     inputNights.value = 1;
                     inputPrice.value = room.price;
                     break;
            default: break;
         }
         openModalWindow(modalElem);
         item.blur();
      });
   });

   modalRoomSelect && modalRoomSelect.addEventListener('input', function () {
      const { label } = modalRoomSelect.selectedOptions[0];
      const { value: nights } = inputNights;
      const { price } = roomData.find(item => item.room_ua === label);
      inputPrice.value = (nights || 1) * price;
   });

   inputNights && inputNights.addEventListener('input', function () {
      const { label : roomType } = modalRoomSelect.selectedOptions[0];
      const { value : nights } = inputNights;
      const { price } = roomData.find(item => item.room_ua === roomType);
      inputPrice.value = (nights || 1) * price;
   });

   bookRoomButtons.forEach(item => {
      
      item.addEventListener('click', function () {
         if (priceModalW.classList.contains('active')) {

            for (const option of document.querySelector('select.book').options) { 
               (option.label === document.querySelector('select.room').selectedOptions[0].label) ? option.selected = true : option.selected = false;
            }
            closeModalWindow(priceModalW);

         } else {
            document.querySelector('select.book').options[0].selected = true;
         }
         openModalWindow(bookHotelModalW);
         item.blur();
      })
   });
   
   closeButtons.forEach(item => {
      item.addEventListener('click', (e) => {
         const parentModal = item.closest('.modal');
         closeModalWindow(parentModal);
      });
   });      

   document.body.addEventListener('keyup', function (e) {
      if (e.key === 'Escape') {
         closeModalWindow(document.querySelector('.modal.active'));
      };
   }, false);

   overlay.addEventListener('click', function () {
      closeModalWindow(document.querySelector('.modal.active'));
   });

   const checkin_data = document.getElementById('checkin_data');
   const checkout_data = document.getElementById('checkout_data');
   const table_data =  document.getElementById('table_data');

   checkin_data && (checkin_data.valueAsDate = new Date());
   checkout_data && (checkout_data.valueAsDate = new Date());
   table_data && (table_data.valueAsDate = new Date());


   //----------------------------------------------------------------------

   hotelBookingForm && hotelBookingForm.addEventListener('submit', async function (e) {
      
      e.preventDefault();
      
      const formData = new FormData();

      formData.append("name", e.target[0].value);
      formData.append("phone", e.target[1].value);
      formData.append("room", e.target[2].value);
      formData.append("date_start", e.target[3].value);
      formData.append("date_end", e.target[4].value);

      try {
         if (abortCtrl1) {abortCtrl1.abort()}
         abortCtrl1 = new AbortController();
         const {data} = await api.confirmHotelBooking(formData, abortCtrl1);
         data && Notify.success("Номер заброньовано");
      } catch (err) {
         Notify.failure(err.message);
      } finally {
         bookHotelModalW.classList.remove('active');
         overlay.classList.remove('active');
         enableScroll();         
      }      

   });

   restaurantBookingForm && restaurantBookingForm.addEventListener('submit', async function (e) {

      e.preventDefault();

      const formData = new FormData();

      formData.append("name", e.target[0].value);
      formData.append("phone", e.target[1].value);
      formData.append("persons", e.target[2].value);
      formData.append("date", e.target[3].value);
      
      try {
         if (abortCtrl2) {abortCtrl1.abort()}
         abortCtrl2 = new AbortController();
         const {data} = await api.confirmRestaurantBooking(formData, abortCtrl2);
         data && Notify.success("Стіл заброньовано");
      } catch (err) {
         Notify.failure(err.message);
      } finally {
         bookRestaurantModalW.classList.remove('active');
         overlay.classList.remove('active');
         enableScroll();         
      } 
   });

});

