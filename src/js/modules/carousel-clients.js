// import Swiper JS
import Swiper from "swiper/bundle";
// import Swiper styles
import "swiper/css/bundle";
function carouselClients() {
    const swiper = new Swiper("#carousel-clients",{
        loop: true,
        slidesPerView: 2,
        spaceBetween: 50,
        ally: false,
        speed: 2000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
          },
          breakpoints: {
            425: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
          }
          
    });
}
export default carouselClients;