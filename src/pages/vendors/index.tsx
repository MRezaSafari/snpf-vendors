import {
  API_PATH,
  VendorsModel,
  VendorModel,
  VendorEntity,
  RootState,
} from "../../models";
import React, { FC, useEffect } from "react";
import Vendor from "../../components/vendor-card";
import { useDispatch, useSelector } from "react-redux";

import "./vendors.styles.scss";

const Vendors: FC = () => {
  const dispatch = useDispatch();
  const vendors = useSelector((state: RootState) => state.vendors.data);
  let debounceTimer: any = null;

  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the 2/3 mark of the page height
      // I think it's working smoothly for now, buy maybe we can tweak it even further
      const twoThirdsPageHeight = (2 / 3) * document.body.scrollHeight;

      // Check if the user has reached almost 2/3 of the page
      if (window.innerHeight + window.scrollY >= twoThirdsPageHeight) {
        // Clear the previous timer if it exists
        clearTimeout(debounceTimer);

        // Dispatch the action to fetch the next page after a delay
        debounceTimer = setTimeout(() => {
          dispatch({ type: "FETCH_NEXT_PAGE" });
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceTimer);
    };
  }, [dispatch]);

  if (!vendors || vendors.length === 0) return <>No Result</>;

  const renderVendors = () =>
    vendors
      .filter((x) => x.type === "VENDOR")
      .map((v) => (
        <Vendor
          key={(v.data as VendorEntity).id}
          vendor={v.data as VendorEntity}
        />
      ));

  return (
    <div className="vendors">
      <h3>{vendors.filter((x) => x.type === "TEXT")[0].data.toString()}</h3>
      <div className="vendors__cards">{renderVendors()}</div>
    </div>
  );
};

export default Vendors;
