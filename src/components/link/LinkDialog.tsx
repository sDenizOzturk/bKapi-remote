import { BaseButton, BaseModal } from 'binak-react-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface LinkDialogProps {
  onClose: () => void;
  link: string;
  dialogTitle: string;
}

const LinkDialog: FC<LinkDialogProps> = ({ onClose, link, dialogTitle }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleNavigate = () => {
    const navigateLink = '/' + link.split('/').slice(3).join('/');
    navigate(navigateLink);
  };

  return (
    <BaseModal
      open={!!link}
      onClose={onClose}
      center
      title={dialogTitle}
      content={link}
      baseDialog
      menuItems={
        <>
          <BaseButton mode="outline" onClick={handleNavigate}>
            {t('Open Link')}
          </BaseButton>
          <BaseButton onClick={onClose}>{t('Okay')}</BaseButton>
        </>
      }
    />
  );
};

export default LinkDialog;
