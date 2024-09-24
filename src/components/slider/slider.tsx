
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import styles from './slider.module.scss';

const Slider = () => {
	return (
		<div className={styles.swiperContainer}>

			<h2 className={styles.title}>Entidades aliadas</h2>

			<Swiper
				spaceBetween={30}
				slidesPerView={4}
				centeredSlides={false}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={false}
				modules={[Autoplay, Pagination, Navigation]}
				breakpoints={{
					320: { slidesPerView: 1 },
					640: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
					1440: { slidesPerView: 4 },
				}}
			>
				<SwiperSlide>
					<div className={styles.cardContainer}>
						<a className={styles.cardLink} href="https://www.epssura.com/" title='Sitio web Sura' target="_blank" rel="noopener noreferrer">
							<img className={styles.sliderImage} src="/images/sura.png" alt="Logo Sura" />
						</a>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.cardContainer}>
						<a className={styles.cardLink} href="https://www.mutualser.com/" title='Sitio web Mutualser' target="_blank" rel="noopener noreferrer">
							<img className={styles.sliderImage} src="/images/mutualSer.png" alt="Logo MutualSer" />
						</a>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.cardContainer}>
						<a className={styles.cardLink} href="https://www.nuevaeps.com.co/" title='Sitio web Nueva EPS' target="_blank" rel="noopener noreferrer">
							<img className={styles.sliderImage} src="/images/nuevaEps.png" alt="Logo NuevaEPS" />
						</a>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.cardContainer}>
						<a className={styles.cardLink} href="https://www.epssanitas.com/" title='Sitio web EPS Sanitas' target="_blank" rel="noopener noreferrer">
							<img className={styles.sliderImage} src="/images/sanitas.png" alt="Logo Sanitas" />
						</a>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.cardContainer}>
						<a className={styles.cardLink} href="https://www.saviasaludeps.com/" title='Sitio web Savia Salud' target="_blank" rel="noopener noreferrer">
							<img className={styles.sliderImage} src="/images/saviaSalud.png" alt="Logo SaviaSalud" />
						</a>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.cardContainer}>
						<a className={styles.cardLink} href="https://www.sisben.gov.co/" title='Sitio web Sisben' target="_blank" rel="noopener noreferrer">
							<img className={styles.sliderImage} src="/images/sisben.png" alt="Logo Sisben" />
						</a>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Slider;