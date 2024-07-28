import { BaseButton, BaseWrapper } from 'binak-react-components';
import { FC } from 'react';

interface TabButtonsProps {
  modes: { name: string; buttonText: string }[];
  currentMode: string;
  setMode: (arg0: any) => void;
}

const TabButtons: FC<TabButtonsProps> = ({ modes, currentMode, setMode }) => {
  const tabButtonStyle = (target: string): React.CSSProperties => {
    const common = {
      background: 'none',
      color: 'var(--color2)',
      border: 'none',
      borderRadius: '0',
      padding: '0.5rem',
      paddingBottom: '0.2rem',
      marginBottom: '0rem',
    };
    if (currentMode === target) {
      return {
        ...common,
        borderBottom: '0.1rem solid var(--color2)',
        fontWeight: '600',
      };
    } else {
      return {
        ...common,
        borderBottom: 'none',
        fontWeight: '400',
      };
    }
  };
  return (
    <BaseWrapper
      style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
    >
      {modes.map((mode) => (
        <BaseButton
          style={tabButtonStyle(mode.name)}
          onClick={() => setMode(mode.name)}
        >
          {mode.buttonText}
        </BaseButton>
      ))}
    </BaseWrapper>
  );
};

export default TabButtons;
