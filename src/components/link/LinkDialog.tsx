import { BaseModal } from 'binak-react-components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface LinkDialogProps {
  onClose: () => void;
  link: string;
  dialogTitle: string;
}

const LinkDialog: FC<LinkDialogProps> = ({ onClose, link, dialogTitle }) => {
  const { t } = useTranslation();

  return (
    <BaseModal
      open={!!link}
      onClose={onClose}
      center
      title={dialogTitle}
      content={link}
      baseDialog
      okayButton={t('Okay')}
    />
  );
};

export default LinkDialog;
