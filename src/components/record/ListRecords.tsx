import { BaseCard, BaseWrapper } from "binak-react-components";
import { FC, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { PassRecord } from "../../models/record";
import { bounce } from "../../utils/animationVariants";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Paginator from "../ui/Paginator";
import { useTranslation } from "react-i18next";
import RecordItem from "./RecordItem";
import FilterRecords from "./FilterRecords";
import useUrls from "../../hooks/useUrls";

const ListRecords: FC = () => {
  const [records, setRecords] = useState<PassRecord[]>([]);
  const [showDate, setShowDate] = useState(true);

  const scroollTargetRef = useRef(null);

  const { t } = useTranslation();
  const loading = useSelector((state: RootState) => state.loading.loading);

  const [filter, setFilter] = useState("");
  const [date, setDate] = useState("");

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
        url("listRecords", {
          filter,
          date,
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
        const recordsWithKey = responseData.records.map(
          (record: any, index: number) => ({
            ...record,
            key: `${Date.now()}_${index}`,
          })
        );

        setRecords(recordsWithKey);
        setCurrentPage(responseData.currentPage);
        setTotalPages(responseData.totalPages);
        setShowDate(!date);
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
    const top = (scroollTargetRef as RefObject<any>).current.offsetTop || 0;
    window.scrollTo({
      top: top,
      behavior: "auto",
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <BaseCard>
        <BaseWrapper style={{ minWidth: "20rem" }}>
          <FilterRecords
            initialDate={date}
            setFilter={(data) => {
              setFilter(data.filter);
              setDate(data.date);
              setCurrentPage(0);
              refetchData();
            }}
          />
        </BaseWrapper>
      </BaseCard>

      <div ref={scroollTargetRef}></div>

      <BaseWrapper
        mode={["center"]}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "60rem",
        }}
      >
        {records.map((record: PassRecord) => (
          <RecordItem
            transition={bounce.m.transition}
            key={record.key}
            record={record}
            showDate={showDate}
          />
        ))}
      </BaseWrapper>
      {!loading && records.length === 0 && (
        <BaseCard style={{ marginTop: "-1rem" }}>
          {t("No records found")}
        </BaseCard>
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

export default ListRecords;
