import { FC } from 'react';
import BaseErrorModal from '../components/ui/BaseErrorModal';
import { useNavigate } from 'react-router-dom';

const NotFoundView: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <BaseErrorModal error={' '} onClose={() => navigate(-1)} />
    </>
  );
};
export default NotFoundView;
