import { useRef, useEffect, FC, ReactNode, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import BaseButton from './BaseButton';

import classes from './BaseModal.module.css';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';
import { duration } from '../../utils/animationVariants';

interface BaseModalProps {
  open: boolean;
  children?: ReactNode;
  onClose: () => any;
  center?: boolean;
  title?: string;
  content?: ReactNode;
  baseDialog?: boolean;
  okayButton?: boolean;
  menuItems?: ReactNode;
  backdropStyle?: CSSProperties;
  dialogStyle?: CSSProperties;
}

const BaseModal: FC<BaseModalProps> = ({
  open,
  children,
  onClose,
  center,
  title,
  content,
  baseDialog,
  okayButton,
  menuItems,
  backdropStyle,
  dialogStyle,
  ...props
}) => {
  const { t } = useTranslation();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current!.show();
    } else {
      dialog.current!.close();
    }
  }, [open]);

  function tryClose(event: { stopPropagation: () => void }) {
    event.stopPropagation();
    onClose();
  }

  const baseDialogContent = (
    <>
      <header>
        <h2>{title}</h2>
      </header>
      <section>
        <p style={{ wordWrap: 'break-word' }}>{content}</p>
        {open ? children : null}
      </section>
      <menu>
        {okayButton && <BaseButton onClick={onClose}>{t('Okay')}</BaseButton>}
        {menuItems}
      </menu>
    </>
  );
  return createPortal(
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={duration.m}
            onClick={tryClose}
            className={classes.backdrop}
            style={backdropStyle}
          ></motion.div>
        )}

        <motion.dialog
          //key={'dialog' + Date.now()}
          initial={{ opacity: 1, scale: 0.6, y: 200 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={duration.m}
          className={center ? classes.center : ''}
          ref={dialog}
          onClose={onClose}
          style={
            !center
              ? { top: +window.top!.scrollY + 20 + 'px', ...dialogStyle }
              : dialogStyle
          }
          {...props}
        >
          {baseDialog && baseDialogContent}
          {!baseDialog && open ? children : null}
        </motion.dialog>
      </AnimatePresence>
    </>,
    document.getElementById('modal')!
  );
};

export default BaseModal;
