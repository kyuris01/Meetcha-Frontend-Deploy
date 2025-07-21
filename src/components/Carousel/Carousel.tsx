import React from "react";
import styles from "./Carousel.module.scss";
import CarouselContainer from "./CarouselContainer";
import type { IncompleteMeetingData } from "@/types/meeting-data-type";

interface Props {
  dataSet: IncompleteMeetingData[];
  renderItem: (data: IncompleteMeetingData, index: number) => React.ReactNode;
}

const Carousel = ({ dataSet, renderItem }: Props) => {
  return (
    <div className={styles.carousel}>
      <CarouselContainer dataSet={dataSet} renderItem={renderItem} />
    </div>
  );
};

export default Carousel;
