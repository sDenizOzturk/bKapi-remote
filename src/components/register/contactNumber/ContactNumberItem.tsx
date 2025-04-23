import { FC } from "react";
import { ContactNumber } from "../../../models/contactNumber";
import { BaseWrapper, BaseCard } from "binak-react-components";
import { HTMLMotionProps } from "framer-motion";
import DeleteIcon from "../../ui/DeleteIcon";

interface ContactItemProps extends HTMLMotionProps<"div"> {
  contact: ContactNumber;
  onContactClicked: () => void;
  onDeleteContactClicked: () => void;
}

const ContactItem: FC<ContactItemProps> = ({
  contact,
  onContactClicked,
  onDeleteContactClicked,
  ...props
}) => {
  return (
    <BaseCard
      {...props}
      style={{ width: "14rem", cursor: "pointer", margin: "0" }}
      onClick={onContactClicked}
    >
      <BaseWrapper
        mode={["center", "align-text-center"]}
        style={{ position: "relative" }}
      >
        <DeleteIcon onClick={() => onDeleteContactClicked()} />
        <h3 style={{ fontSize: "1.6rem" }}>{contact.number}</h3>
        <p style={{ fontSize: "1.3rem" }}>{contact.fullname}</p>
      </BaseWrapper>
    </BaseCard>
  );
};

export default ContactItem;
