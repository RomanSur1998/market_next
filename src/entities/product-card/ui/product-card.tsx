import React, { useState } from "react";
import styles from "./style.module.scss";
import classnames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { StarIcon } from "@/shared/ui/icons/star";
import { CardIcon } from "@/shared/ui/icons/card-icon";

export const ProductCard = () => {
  const [isShowFullDescr, setIsShowFullDescr] = useState(false);
  return (
    <div className={classnames(styles.flex, styles.card_container)}>
      <div>
        <div className={(styles.flex, styles.discount)}>
          <span>40%</span> off sale
        </div>
        <div>
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                className={styles.images}
                src="https://i.pinimg.com/564x/d8/37/de/d837dea34066ba80081bfe584b44d24f.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.images}
                src="https://i.pinimg.com/564x/d8/37/de/d837dea34066ba80081bfe584b44d24f.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.images}
                src="https://i.pinimg.com/564x/d8/37/de/d837dea34066ba80081bfe584b44d24f.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.images}
                src="https://i.pinimg.com/564x/d8/37/de/d837dea34066ba80081bfe584b44d24f.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className={styles.images}
                src="https://i.pinimg.com/564x/d8/37/de/d837dea34066ba80081bfe584b44d24f.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div>
        {isShowFullDescr || (
          <div className={styles.rating}>
            <StarIcon />
            <span>4.69</span>
          </div>
        )}
        {isShowFullDescr || (
          <h3 className={styles.title}>
            <span>Apple</span> Iphone
          </h3>
        )}

        {/* {getDescriptinLine()} */}
        <p>
          An apple mobile which is nothing like apple An apple mobile which is{" "}
          <button className={styles.moreButton}>Read more</button>
        </p>
        <div className={styles.priceContainer}>
          <button className={styles.buttonPrice}>
            <CardIcon />
            $500
          </button>
          <span>$400</span>

          {/* <span>${getDiscount(price, discountPercentage)}</span> */}
        </div>
      </div>
    </div>
  );
};
