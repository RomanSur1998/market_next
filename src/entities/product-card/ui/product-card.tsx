import React, { useState } from "react";
import styles from "./style.module.scss";
import classnames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { StarIcon } from "@/shared/ui/icons/star";
import { CartIcon } from "@/shared/ui/icons/card-icon";
import { IProduct } from "@/shared/types/props-types";
import { addProductToLoaclStorage, getDiscount } from "@/shared/lib/functions";

export const ProductCard = ({ elem }: { elem: IProduct }) => {
  function getDescriptinLine(description: string) {
    if (description?.length > 20 && !isShowFullDescr) {
      return (
        <p className={styles.description}>
          {`${description.slice(0, 40)}... `}
          <button
            className={styles.moreButton}
            onClick={() => {
              setIsShowFullDescr(true);
            }}
          >
            Read more
          </button>
        </p>
      );
    }
  }

  const [isShowFullDescr, setIsShowFullDescr] = useState(false);
  return (
    <div className={classnames(styles.flex, styles.card_container)}>
      {isShowFullDescr ? (
        <>
          <div className={styles.rating}>
            <StarIcon />
            <span>{elem.rating}</span>
          </div>
          <h3 className={styles.title}>
            <span>{elem.brand}</span> {elem.title}
          </h3>
          <div className={styles.descriptionAct}>
            {elem.description}
            <div>
              <button
                className={styles.moreButton}
                onClick={() => {
                  setIsShowFullDescr(false);
                }}
              >
                Hide description
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className={(styles.flex, styles.discount)}>
            <span>{elem.discountPercentage}% </span> off sale
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
              {elem.images.map((image: string) => {
                return (
                  <SwiperSlide key={image}>
                    <img className={styles.images} src={image} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}

      <div>
        {isShowFullDescr || (
          <div className={styles.rating}>
            <StarIcon />
            <span>{elem.rating}</span>
          </div>
        )}
        {isShowFullDescr || (
          <h3 className={styles.title}>
            <span>{elem.brand}</span> {elem.title}
          </h3>
        )}

        {getDescriptinLine(elem.description)}

        <div className={styles.priceContainer}>
          <button
            className={styles.buttonPrice}
            onClick={() => addProductToLoaclStorage(elem)}
          >
            <CartIcon color="white" />${elem.price}
          </button>

          <span>${getDiscount(elem.price, elem.discountPercentage)}</span>
        </div>
      </div>
    </div>
  );
};
