import { useTranslation } from 'react-i18next';
import BaseCard from '../ui/BaseCard';
import BaseWrapper from '../ui/BaseWrapper';

import parse from 'html-react-parser';
import { FC } from 'react';
import { Instructions } from '../../models/instructions';

interface RulesProps {
  instructions: Instructions;
}

const Rules: FC<RulesProps> = ({ instructions }) => {
  const { i18n } = useTranslation();

  const language = i18n.language;
  const rules = instructions.rules[language]
    ? instructions.rules[i18n.language]
    : instructions.rules.tr;

  if (!rules) return null;

  return (
    <BaseCard>
      <BaseWrapper style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
        <div style={{ textAlign: 'justify' }}>{parse(rules)}</div>
      </BaseWrapper>
    </BaseCard>
  );
};
export default Rules;
