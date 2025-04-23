import { BaseCard, BaseWrapper } from "binak-react-components";
import { FC } from "react";
import { Target } from "../../models/target";
import { HTMLMotionProps } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface TargetItemProps extends HTMLMotionProps<"div"> {
  target: Target;
}

const TargetItem: FC<TargetItemProps> = ({ target, ...props }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    const navigateLink = "/" + target.id;
    navigate(navigateLink);
  };
  return (
    <BaseCard
      {...props}
      style={{
        width: "20rem",
        cursor: "pointer",
        margin: "0",
        background: "var(--color4_7)",
        color: "var(--color2)",
      }}
      onClick={handleNavigate}
    >
      <BaseWrapper mode={[]} style={{ position: "relative" }}>
        <h3 style={{ fontSize: "1.8rem", textAlign: "center" }}>
          {target.name}
        </h3>
      </BaseWrapper>
    </BaseCard>
  );
};

export default TargetItem;
