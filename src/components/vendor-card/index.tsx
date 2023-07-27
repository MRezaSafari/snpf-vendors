import React, { FC } from "react";

import "./vendor-card.styles.scss";
import { VendorEntity } from "../../models/vendors.model";
import VendorRate from "../vendor-rate";
import { ConvertToPersianCurrency, convertToPersianNumber } from "../../utilities";

interface Props {
  vendor: VendorEntity;
}

const Vendor: FC<Props> = ({ vendor }) => {
  const renderCourierType = () =>
    vendor.isZFExpress ? "اسنپ اکسپرس" : "پیک فروشنده";

  return (
    <div className="vendor">
      <header>
        <img src={vendor.backgroundImage} alt={vendor.title} />
        <div className="vendor__logo">
          <img src={vendor.logo} alt={`${vendor.title} Logo`} />
        </div>
      </header>
      <div className="vendor__details">
        <div className="vendor__title">
          <p>{vendor.title}</p>
          <div className="vendor__title__rating-container">
            <span>({convertToPersianNumber(vendor.voteCount)})</span>
            <VendorRate rate={vendor.rate} />
          </div>
        </div>
        <p className="vendor__description">
          {vendor.description.replace(/,/g, " ")}
        </p>
        <p className="vendor__courier-details">
          <span>{renderCourierType()}</span>
          <span>{ConvertToPersianCurrency(vendor.deliveryFee)} تومان</span>
        </p>
      </div>
    </div>
  );
};

export default Vendor;
