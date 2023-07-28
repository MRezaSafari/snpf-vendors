import {
  API_PATH,
  VendorsModel,
  VendorModel,
  VendorEntity,
  RootState,
} from "../../models";
import React, { FC, useEffect, useRef, useState } from "react";
import Vendor from "../../components/vendor-card";
import { useDispatch, useSelector } from "react-redux";

import "./vendors.styles.scss";

const Vendors: FC = () => {
  const dispatch = useDispatch();
  const vendors = useSelector((state: RootState) => state.vendors.data);
  const CardsRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [visibleItems, setVisibleItems] = useState<VendorModel[]>([]);

  let debounceTimer: any = null;

  useEffect(() => {
    // First list call
    dispatch({ type: "FETCH_VENDORS" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!CardsRef.current) return;

      setScrollTop(CardsRef.current.scrollTop);
      // Calculate the 2/3 mark of the CardsRef height
      const twoThirdsCardsHeight = (2 / 3) * CardsRef.current.scrollHeight;
      // Check if the user has reached almost 2/3 of the CardsRef
      if (
        CardsRef.current.scrollTop + CardsRef.current.clientHeight >=
        twoThirdsCardsHeight
      ) {
        clearTimeout(debounceTimer);

        // Dispatch the action to fetch the next page after a delay so we don't call the request many times
        debounceTimer = setTimeout(() => {
          dispatch({ type: "FETCH_NEXT_PAGE" });
        }, 100);
      }
    };
    // Attach the scroll event listener to the CardsRef element
    if (CardsRef.current) {
      CardsRef.current.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (CardsRef.current) {
        CardsRef.current.removeEventListener("scroll", handleScroll);
      }
      clearTimeout(debounceTimer);
    };
  }, [CardsRef.current]);

  useEffect(() => {
    const itemHeight = 260;
    if (!CardsRef.current) return;
    const containerHeight = vendors.length * itemHeight;
    const startIdx = Math.floor(scrollTop / itemHeight);
    const endIdx = Math.min(
      startIdx + Math.ceil(containerHeight / itemHeight) + 1,
      vendors.length
    );

    setVisibleItems(vendors.slice(startIdx, endIdx));
  }, [vendors, scrollTop]);

  const renderVendors = () =>
    visibleItems &&
    visibleItems
      .filter((x) => x.type === "VENDOR")
      .map((v, i) => (
        <div
          style={{
            position: "absolute",
            top:
              // find the real index of our vendor inside the vendors state
              (vendors.findIndex(
                (x) =>
                  (x.data as VendorEntity).id === (v.data as VendorEntity).id
              ) -
                1) *
              260,
            width: "100%",
          }}
        >
          <Vendor
            key={(v.data as VendorEntity).id}
            vendor={v.data as VendorEntity}
          />
        </div>
      ));

  return (
    <div className="vendors">
      <div className="vendors__cards" ref={CardsRef}>
        {!vendors && <div>Loading ...</div>}
        {vendors && (
          <div style={{ height: vendors.length * 255 + "px" }}>
            {renderVendors()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;
