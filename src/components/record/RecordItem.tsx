import { FC } from "react";
import { PassRecord } from "../../models/record";
import { HTMLMotionProps } from "framer-motion";
import { BaseCard, BaseWrapper } from "binak-react-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ImageDisplayer from "react-image-displayer";
interface RecordItemProps extends HTMLMotionProps<"div"> {
  record: PassRecord;
  showDate: boolean;
}

const RecordItem: FC<RecordItemProps> = ({ record, showDate, ...props }) => {
  const { t } = useTranslation();

  const token = useSelector((state: RootState) => state.auth.token);

  const texts = [];

  record.fullname && texts.push(record.fullname);
  record.status && texts.push(t(record.status));
  record.plateNumber &&
    record.plateNumber !== "-" &&
    texts.push(record.plateNumber);
  record.direction && texts.push(t(record.direction));

  if (record.time) {
    const [datePart, timePart] = record.time.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    texts.push(`${hour}:${minute}:${second}`);
    texts.push(`${day}.${month}.${year}`);
  }

  record.info && texts.push(record.info);

  return (
    <>
      <BaseCard
        {...props}
        style={{
          width: "90vw",
          maxWidth: "50rem",
          margin: "0",
          padding: "0.5rem",
        }}
      >
        <BaseWrapper
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            borderBottom: "0.2rem solid",
            marginBottom: "0.5rem",
            paddingBottom: "0.3rem",
            rowGap: "0",
          }}
        >
          {texts.map((text, index) => (
            <>
              {index > 0 && (
                <h3
                  style={{
                    fontSize: "1.3rem",
                    textAlign: "left",
                    margin: "0",
                  }}
                >
                  •
                </h3>
              )}
              <h3
                style={{
                  fontSize: "1.3rem",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  margin: "0",
                }}
              >
                {text}
              </h3>
            </>
          ))}
        </BaseWrapper>
        {!!record.imageUrl && (
          <ImageDisplayer
            url={record.imageUrl}
            token={token.token}
            delay={100}
            enterAnimation={["blur", 1]}
            imageStyle={{
              borderBottomLeftRadius: "11px",
              borderBottomRightRadius: "11px",
            }}
            spinner={{
              color: "var(--color2)",
              size: "1rem",
              spinnerType: "BeatLoader",
            }}
          />
        )}
      </BaseCard>
    </>
  );
};

export default RecordItem;
