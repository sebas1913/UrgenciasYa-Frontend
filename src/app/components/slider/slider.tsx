import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';

const SwiperContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  height: 500px;
  position: relative;

  .swiper-button-next,
  .swiper-button-prev {
    display: none; 
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  margin: 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
  text-decoration: none; 
`;

const SliderImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const Slider = () => {
  return (
    <SwiperContainer>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <CardContainer>
            <CardLink href="https://www.epssura.com/" title='Sitio web Sura' target="_blank" rel="noopener noreferrer">
                <SliderImage src="/images/sura.png" alt="Logo Sura" />
            </CardLink>
          </CardContainer>
        </SwiperSlide>
        <SwiperSlide>
          <CardContainer>
            <CardLink href="https://www.mutualser.com/" title='Sitio web Mutualser' target="_blank" rel="noopener noreferrer">
                <SliderImage src="/images/mutualSer.png" alt="Logo MutualSer" />
            </CardLink>
          </CardContainer>
        </SwiperSlide>
        <SwiperSlide>
          <CardContainer>
            <CardLink href="https://www.nuevaeps.com.co/" title='Sitio web Nueva EPS' target="_blank" rel="noopener noreferrer">
                <SliderImage src="/images/nuevaEps.png" alt="Logo NuevaEPS" />
            </CardLink>
          </CardContainer>
        </SwiperSlide>
        <SwiperSlide>
          <CardContainer>
            <CardLink href="https://www.epssanitas.com/" title='Sitio web EPS Sanitas' target="_blank" rel="noopener noreferrer">
                <SliderImage src="/images/sanitas.png" alt="Logo Sanitas" />
            </CardLink>
          </CardContainer>
        </SwiperSlide>
        <SwiperSlide>
          <CardContainer>
            <CardLink href="https://www.saviasaludeps.com/" title='Sitio web Savia Salud' target="_blank" rel="noopener noreferrer">
                <SliderImage src="/images/saviaSalud.png" alt="Logo SaviaSalud" />
            </CardLink>
          </CardContainer>
        </SwiperSlide>
        <SwiperSlide>
          <CardContainer>
            <CardLink href="https://www.sisben.gov.co/" title='Sitio web Sisben' target="_blank" rel="noopener noreferrer">
                <SliderImage src="/images/sisben.png" alt="Logo Sisben" />
            </CardLink>
          </CardContainer>
        </SwiperSlide>
      </Swiper>
    </SwiperContainer>
  );
};

export default Slider;
