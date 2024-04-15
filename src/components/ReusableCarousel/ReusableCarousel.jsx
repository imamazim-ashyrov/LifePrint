import { useCallback, useRef } from "react";
import Slider from "react-slick";
import useSWRImmutable from "swr/immutable";
import styles from "./ReusableCarousel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import prevArrowIcon from "../../assets/icons/arrowIcons/leftArrow.png";
import nextArrowIcon from "../../assets/icons/arrowIcons/rightArrow.png";
import { getAchievements } from "../../api/getAchievements";
import PageBlock from "../PageBlock/PageBlock";

const ReusableCarousel = () => {
  const sliderRef = useRef(null);
  const { data } = useSWRImmutable("/achievements", getAchievements);
  const carouselContent = data?.slice(0, 10) || [];

  const dotsFn = useCallback(
    (dots) => (
      <>
        <div className={styles.controls}>
          <button
            className={styles.arrowButton}
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <img src={prevArrowIcon} alt="show previous" />
          </button>
          <ul> {dots} </ul>
          <button
            className={styles.arrowButton}
            onClick={() => sliderRef.current?.slickNext()}
          >
            <img src={nextArrowIcon} alt="show next" />
          </button>
        </div>
      </>
    ),
    [sliderRef.current]
  );

  return (
    <PageBlock>
      <Slider
        ref={sliderRef}
        autoplay={true}
        autoplaySpeed={5000}
        arrows={false}
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={4}
        slidesToScroll={4}
        appendDots={dotsFn}
        customPaging={() => <button className={styles.dotButton} />}
        responsive={[
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ]}
      >
        {carouselContent.map((el) => (
          <div key={el.id} className={styles.cardWrapper}>
            <img src={el.image} alt="Card" className={styles.cardImage} />
          </div>
        ))}
      </Slider>
    </PageBlock>
  );
};

export default ReusableCarousel;
