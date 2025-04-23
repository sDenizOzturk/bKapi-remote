import { BaseWrapper } from "binak-react-components";
import { FC, useCallback, useEffect, useState } from "react";
import { Target } from "../../models/target";

import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";
import useUrls from "../../hooks/useUrls";
import TargetItem from "./TargetItem";
import { bounce } from "../../utils/animationVariants";

const ListTargets: FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);

  const { setLoading } = useLoading();
  const { setError } = useError();

  const { url } = useUrls();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(url("listTargets"));
      const responseData = await response.json();

      if (response.status === 200) {
        setTargets(responseData);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <BaseWrapper
        mode={["center"]}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          maxWidth: "60rem",
          height: "100%",
        }}
      >
        {targets.map((target: Target) => (
          <TargetItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={target.id}
            target={target}
          />
        ))}
      </BaseWrapper>
    </>
  );
};

export default ListTargets;
