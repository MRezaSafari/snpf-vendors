import clsx from "clsx";
import React, { FC } from "react";
import "./vendor-rate.styles.scss";
import { convertToPersianNumber } from "../../utilities";
interface Props {
  rate: number;
}

const VendorRate: FC<Props> = ({ rate }) => {
  const colorClass = clsx({
    "rating__color--full-green": rate >= 4.5,
    "rating__color--medium-green": rate < 4.5 && rate >= 4,
    "rating__color--red": rate <= 4,
  });
  return (
    <div className={clsx("rating", colorClass)}>
      <span>{convertToPersianNumber(rate)}</span>
      <span>★</span>
    </div>
  );
};

export default VendorRate;
