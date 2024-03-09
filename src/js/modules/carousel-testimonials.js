// import Swiper JS
import Swiper from "swiper/bundle";
// import Swiper styles
import "swiper/css/bundle";
function carouselSwiper() {
    const swiper = new Swiper("#carousel_testimonials",{
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        ally: false,
        speed: 2000,
        autoplay: {
            delay: 5000,
          },
          breakpoints: {
            
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1023: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }
    });
}
export default carouselSwiper;