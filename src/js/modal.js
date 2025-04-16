!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

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


document.addEventListener('DOMContentLoaded', function () {
   
   const modalButtons = document.querySelectorAll('.js-open-modal');
   const modalRoomSelect = document.querySelector('select.room');
   const modalBookSelect = document.querySelector('select.book');
   const overlay = document.querySelector('.js-overlay-modal');
   const closeButtons = document.querySelectorAll('.js-modal-close');
   const inputNights = document.querySelector('input[name="nights"]');
   const inputPrice = document.querySelector('input[name="price"]');
   const bookRoomButtons = document.querySelectorAll('.book-room-btn');

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

   modalButtons.forEach(item => {

      item.addEventListener('click', (e) => {
         
         const modalId = item.getAttribute('data-modal'),
         
         modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

         modalElem.classList.add('active');
         overlay.classList.add('active');
         disableScroll();
         
         const room = roomData.find(item => item.room_en === e.target.dataset.room);
         
         switch (e.target.dataset.modal) {
            case '1':
                     for (const option of modalBookSelect.options) { 
                        (option.label === room.room_ua) ? option.selected = true : option.selected = false;
                     }
            case '3': 
                     for (const option of modalRoomSelect.options) {
                        (option.label === room.room_ua) ? option.selected = true : option.selected = false;
                     }
                     inputNights.value = 1;
                     inputPrice.value = room.price;
                     break;
            default: break;
         }
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
         
         const priceModal = document.querySelector('.modal[data-modal="3"]');
         
         if (priceModal.classList.contains('active')) {

            for (const option of document.querySelector('select.book').options) { 
               (option.label === document.querySelector('select.room').selectedOptions[0].label) ? option.selected = true : option.selected = false;
            }
            
            priceModal.classList.remove('active');
         } else {
            document.querySelector('select.book').options[0].selected = true;
         }

         document.querySelector('.modal[data-modal="1"]').classList.add('active');
      })
   });
   

   closeButtons.forEach(item => {
      item.addEventListener('click', (e) => {
         const parentModal = item.closest('.modal');
         parentModal.classList.remove('active');
         overlay.classList.remove('active');
         enableScroll();
      });
   });      

   document.body.addEventListener('keyup', function (e) {
      if (e.key === 'Escape') {
         
         const modalActive = document.querySelector('.modal.active');
         const overlay = document.querySelector('.overlay');
         
         modalActive && modalActive.classList.remove('active');
         overlay && overlay.classList.remove('active');
         enableScroll();

         };
   }, false);

   overlay.addEventListener('click', function() {
      document.querySelector('.modal.active').classList.remove('active');
      this.classList.remove('active');
      enableScroll();
   });

   const checkin_data = document.getElementById('checkin_data');
   const checkout_data = document.getElementById('checkout_data');
   const table_data =  document.getElementById('table_data');

   checkin_data && (checkin_data.valueAsDate = new Date());
   checkout_data && (checkout_data.valueAsDate = new Date());
   table_data && (table_data.valueAsDate = new Date());

});