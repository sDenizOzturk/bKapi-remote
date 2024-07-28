import { FC, useState } from 'react';
import { PassRecord } from '../../models/record';
import { HTMLMotionProps } from 'framer-motion';
import { BaseCard, BaseSpinner, BaseWrapper } from 'binak-react-components';
import { useTranslation } from 'react-i18next';

interface RecordItemProps extends HTMLMotionProps<'div'> {
  record: PassRecord;
  showDate: boolean;
}

const RecordItem: FC<RecordItemProps> = ({ record, showDate, ...props }) => {
  const { t } = useTranslation();

  const [loaded, setLoaded] = useState(false);

  const texts = [];

  record.fullname && texts.push(record.fullname);
  record.status && texts.push(t(record.status));
  record.plateNumber && texts.push(record.plateNumber);
  record.direction && texts.push(t(record.direction));
  record.time && texts.push(record.time);
  showDate && record.date && texts.push(record.date);
  record.info && texts.push(record.info);

  return (
    <>
      <BaseCard
        {...props}
        style={{
          width: '90vw',
          maxWidth: '50rem',
          margin: '0',
          padding: '0.5rem',
        }}
      >
        <BaseWrapper
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            borderBottom: '0.2rem solid',
            marginBottom: '0.5rem',
            paddingBottom: '0.3rem',
            rowGap: '0',
          }}
        >
          {texts.map((text, index) => (
            <>
              {index > 0 && (
                <h3
                  style={{
                    fontSize: '1.3rem',
                    textAlign: 'left',
                    margin: '0',
                  }}
                >
                  •
                </h3>
              )}
              <h3
                style={{
                  fontSize: '1.3rem',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  margin: '0',
                }}
              >
                {text}
              </h3>
            </>
          ))}
        </BaseWrapper>

        <BaseWrapper style={{ position: 'relative' }}>
          <img
            src={record.imageUrl}
            style={{
              visibility: loaded ? 'visible' : 'hidden',
              width: '100%',
              height: 'auto',
              borderBottomLeftRadius: '11px',
              borderBottomRightRadius: '11px',
              margin: 0,
            }}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
          {!loaded && (
            <BaseWrapper
              mode={['vertical-center']}
              style={{ width: '100%', height: '10rem' }}
            >
              <BaseSpinner></BaseSpinner>
            </BaseWrapper>
          )}
        </BaseWrapper>
      </BaseCard>
    </>
  );
};

export default RecordItem;
