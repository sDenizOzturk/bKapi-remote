import { FC, useCallback, useEffect, useState } from "react";
import useLoading from "../../../hooks/useLoading";
import useError from "../../../hooks/useError";
import useUrls from "../../../hooks/useUrls";
import { useParams } from "react-router-dom";
import { UserType } from "../../../models/userType";
import { HTMLMotionProps } from "framer-motion";

interface DoorNumberProps extends HTMLMotionProps<"div"> {
  userType: UserType;
}

const DoorNumber: FC<DoorNumberProps> = ({ userType }) => {
  const { setLoading } = useLoading();
  const { setError } = useError();
  const { url } = useUrls();

  const token = useParams().token as string;

  const [doorNumber, setDoorNumber] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        url("getDoorNumber", {
          doorNumber,
        }),
        {
          headers: {
            Authorization: "Bearer " + token,
            UserType: userType,
          },
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        setDoorNumber(responseData.doorNumber);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }, [doorNumber, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <h1
      style={{
        margin: "auto",
        color: "var(--color3)",
        background: "var(--color2_9)",
        borderRadius: "1rem",
        padding: "0.3rem 2rem",
        minWidth: "30.5rem",
        textAlign: "center",
      }}
    >
      {doorNumber}
    </h1>
  );
};
export default DoorNumber;
