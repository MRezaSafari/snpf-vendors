import {
  API_PATH,
  VendorsModel,
  VendorModel,
  VendorEntity,
} from "../../models";
import React, { FC, useEffect, useMemo, useState } from "react";
import { fetcher } from "../../utilities";
import { stringify } from "querystring";
import Vendor from "../../components/vendor-card";
import "./vendors.styles.scss";

const Vendors: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<VendorModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchVendors(page);
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  const fetchVendors = async (page: number) => {
    const baseUrl = API_PATH.GET_VENDORS;
    const params = {
      page: page,
      page_size: 10,
      lat: 35.774,
      long: 51.418,
    };

    const url = [baseUrl, stringify(params)].join("");

    const vendorsResponse = await fetcher<VendorsModel>("GET", url);

    if (vendorsResponse && vendorsResponse.data.finalResult.length > 0) {
      setData([...data, ...vendorsResponse.data.finalResult]);
    }
  };

  if (isLoading) return <>Loading</>;

  if (!data) return <>No Result</>;

  const renderVendors = () =>
    data
      .filter((x) => x.type === "VENDOR")
      .map((v) => (
        <Vendor
          key={(v.data as VendorEntity).id}
          vendor={v.data as VendorEntity}
        />
      ));

  return (
    <div className="vendors">
      <h3>{data.filter((x) => x.type === "TEXT")[0].data.toString()}</h3>
      <div className="vendors__cards">{renderVendors()}</div>
    </div>
  );
};

export default Vendors;
