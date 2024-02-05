import { BaseErrorModal } from 'binak-react-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFoundView: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <BaseErrorModal
        title={t('An Error Occurred')}
        error={' '}
        onClose={() => navigate(-1)}
      />
    </>
  );
};
export default NotFoundView;
