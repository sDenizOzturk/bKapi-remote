import { BaseCard, BaseWrapper } from "binak-react-components";
import { FC, useCallback, useEffect, useState } from "react";
import { VehicleInside } from "../../models/vehicleInside";
import VehiclesInsideItem from "./VehiclesInsideItem";
import { bounce } from "../../utils/animationVariants";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Paginator from "../ui/Paginator";
import CheckInVehicle from "./CheckInVehicle";
import FilterVehiclesInside from "./FilterVehiclesInside";
import { useTranslation } from "react-i18next";
import TabButtons from "../ui/TabButtons";
import useUrls from "../../hooks/useUrls";

const ListVehiclesInside: FC = () => {
  const [vehicleInside, setVehiclesInside] = useState<VehicleInside[]>([]);

  const { t } = useTranslation();
  const loading = useSelector((state: RootState) => state.loading.loading);

  const [mode, setMode] = useState<"checkIn" | "search">("search");

  const modes = [
    { name: "checkIn", buttonText: t("Check In Vehicle") },
    { name: "search", buttonText: t("Search") },
  ];

  const [filter, setFilter] = useState("");

  const { setLoading } = useLoading();
  const { setError } = useError();

  const token = useSelector((state: RootState) => state.auth.token);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [refetchCounter, setRefetchCounter] = useState(0);

  const { url } = useUrls();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        url("listVehiclesInside", {
          filter,
          page: currentPage.toString(),
        }),
        {
          headers: {
            Authorization: "Bearer " + token.token,
          },
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        const vehiclesInsideWithKey = responseData.vehicles.map(
          (vehicle: any, index: number) => ({
            ...vehicle,
            key: `${Date.now()}_${index}`,
          })
        );
        setVehiclesInside(vehiclesInsideWithKey);
        setCurrentPage(responseData.currentPage);
        setTotalPages(responseData.totalPages);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }, [token, filter, refetchCounter]);

  const refetchData = () => {
    setRefetchCounter(refetchCounter + 1);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <BaseCard>
        <TabButtons modes={modes} setMode={setMode} currentMode={mode} />
        <BaseWrapper style={{ minWidth: "20rem" }}>
          <CheckInVehicle
            refetch={refetchData}
            setCurrentPage={setCurrentPage}
            mode={mode}
          />

          {mode === "search" && (
            <FilterVehiclesInside
              setFilter={(val) => {
                setFilter(val);
                setCurrentPage(0);
              }}
            />
          )}
        </BaseWrapper>
      </BaseCard>
      <BaseWrapper
        mode={["center"]}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "60rem",
        }}
      >
        {vehicleInside.map((vehicleInside: VehicleInside) => (
          <VehiclesInsideItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={vehicleInside.key}
            vehicleInside={vehicleInside}
            refetch={refetchData}
          />
        ))}
      </BaseWrapper>
      {!loading && vehicleInside.length === 0 && (
        <BaseCard style={{ marginTop: "-1rem" }}>{t("No vehicles.")}</BaseCard>
      )}

      {totalPages > 1 && (
        <Paginator
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          refetch={refetchData}
        />
      )}
    </>
  );
};

export default ListVehiclesInside;
