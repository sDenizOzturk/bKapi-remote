import { FC, useState } from 'react';
import { PermanentLink } from '../../models/permanentLink';
import { HTMLMotionProps } from 'framer-motion';
import {
  BaseButton,
  BaseCard,
  BaseModal,
  BaseWrapper,
} from 'binak-react-components';
import { useTranslation } from 'react-i18next';
import deleteIcon from '../../assets/delete_icon.svg';

import useError from '../../hooks/useError';
import useLoading from '../../hooks/useLoading';
import urls from '../../utils/urls';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface PermanentLinkItemProps extends HTMLMotionProps<'div'> {
  permanentLink: PermanentLink;
  refetch: () => void;
  setDisplayingLink: (link: string, doorNumber: string) => void;
}

const PermanentLinkItem: FC<PermanentLinkItemProps> = ({
  permanentLink,
  refetch,
  setDisplayingLink,
  ...props
}) => {
  const { t } = useTranslation();

  const { setError, setErrors } = useError();
  const { setLoading } = useLoading();

  const [isDeleteIconHovered, setIsDeleteIconHovered] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);

  const [askForDelete, setAskForDelete] = useState(false);
  const deletePermanentLink = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        urls.deleteLink + permanentLink!.doorNumber,
        {
          method: 'DELETE',
          headers: { Authorization: 'Bearer ' + token.token },
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        refetch();
      } else {
        setErrors(responseData.data);
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message || 'Failed, try later.');
    }
    setAskForDelete(false);
    setLoading(false);
  };

  return (
    <>
      <BaseCard
        {...props}
        style={{ width: '14rem', cursor: 'pointer', margin: '0' }}
        onClick={() =>
          setDisplayingLink(permanentLink.link, permanentLink.doorNumber)
        }
      >
        <BaseWrapper mode={[]} style={{ position: 'relative' }}>
          <BaseButton
            style={{
              padding: '0rem 0.5rem',
              margin: '-1.5rem -1rem',
              right: '0',
              top: '0',
              position: 'absolute',
            }}
            mode="text"
            onClick={(e) => {
              e.stopPropagation();
              setAskForDelete(true);
            }}
          >
            <img
              src={deleteIcon}
              alt="delete"
              style={{
                height: isDeleteIconHovered ? '1.1rem' : '1rem',
              }}
              onMouseEnter={() => setIsDeleteIconHovered(true)}
              onMouseLeave={() => setIsDeleteIconHovered(false)}
            />
          </BaseButton>
          <h3 style={{ fontSize: '1.6rem', textAlign: 'center' }}>
            {permanentLink.doorNumber}
          </h3>
        </BaseWrapper>
      </BaseCard>

      <BaseModal
        open={askForDelete}
        title={t('Deleting Permanent Key...')}
        center
        baseDialog
        onClose={() => setAskForDelete(false)}
        menuItems={
          <>
            <BaseButton mode="outline" onClick={() => setAskForDelete(false)}>
              {t('No')}
            </BaseButton>
            <BaseButton onClick={deletePermanentLink}>{t('Yes')}</BaseButton>
          </>
        }
      >
        <h2>{t('Are you sure to delete this permanent key?')}</h2>
        <BaseWrapper mode={['align-right']}></BaseWrapper>
      </BaseModal>
    </>
  );
};

export default PermanentLinkItem;
