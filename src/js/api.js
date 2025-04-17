import axios from "axios";

axios.defaults.withCredentials = true;


export class mimino_API {

  #BASE_URL = 'https://mimino-server-4bkr.onrender.com/';

  confirmHotelBooking = async (credentials, abortCtrl) => {
     return await axios.post(`${this.#BASE_URL}hotel-booking`, credentials, { signal: abortCtrl.signal }); 
  };

  confirmRestaurantBooking = async (credentials, abortCtrl) => {
    return await axios.post(`${this.#BASE_URL}restaurant-booking`, credentials, { signal: abortCtrl.signal }); 
  };
}