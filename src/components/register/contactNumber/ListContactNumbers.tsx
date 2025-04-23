import { FC, useCallback, useEffect, useState } from "react";
import {
  BaseWrapper,
  BaseButton,
  BaseModal,
  BaseCard,
} from "binak-react-components";
import AddOrUpdateContactNumber from "./AddOrUpdateContactNumber";
import { useTranslation } from "react-i18next";
import ContactNumberItem from "./ContactNumberItem";
import useError from "../../../hooks/useError";
import { ContactNumber } from "../../../models/contactNumber";
import { bounce } from "../../../utils/animationVariants";
import { useNavigate, useParams } from "react-router-dom";
import { UserType } from "../../../models/userType";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useUrls from "../../../hooks/useUrls";

interface ListContactNumbersProps {
  numberType: "telegram" | "sms";
  userType: UserType;
  setLoading: (value: boolean) => void;
}

const ListContactNumbers: FC<ListContactNumbersProps> = ({
  numberType,
  userType,
  setLoading,
}) => {
  const { t } = useTranslation();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const { url } = useUrls();

  let token = "";
  let doorNumber = "";
  if (userType === "admin") {
    token = useSelector((state: RootState) => state.auth.token).token;
    doorNumber = useParams().doorNumber as string;
  } else {
    token = useParams().token as string;
  }

  const { setError, setErrors } = useError();
  const [showAddContact, setShowAddContact] = useState(false);
  const [updatingContact, setUpdatingContact] = useState<ContactNumber>();
  const [contacts, setContacts] = useState<ContactNumber[]>([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const _url =
        (numberType === "telegram"
          ? url("listTelegramNumbers")
          : url("listSmsNumbers")) +
        (doorNumber ? "?" + new URLSearchParams({ doorNumber }) : "");
      const response = await fetch(_url, {
        headers: {
          Authorization: "Bearer " + token,
          UserType: userType,
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        setContacts(responseData.numbers);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
      navigate("/");
    }
    setLoading(false);
  }, [numberType, setError, setLoading, token, doorNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [askedForDelete, setAskedForDelete] = useState<
    ContactNumber | undefined
  >(undefined);

  const deleteContact = async () => {
    setLoading(true);
    try {
      const _url =
        (numberType === "telegram"
          ? url("deleteTelegramNumber")
          : url("deleteSmsNumber")) +
        askedForDelete?.number +
        (doorNumber ? "?" + new URLSearchParams({ doorNumber }) : "");
      const response = await fetch(_url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          UserType: userType,
        },
      });
      const responseData = await response.json();
      if (response.status === 200) {
        fetchData();
      } else {
        setErrors(responseData.data);
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message || "Failed, try later.");
    }
    setAskedForDelete(undefined);
    setLoading(false);
  };

  return (
    <>
      <BaseModal
        center
        open={showAddContact}
        onClose={() => setShowAddContact(false)}
      >
        <AddOrUpdateContactNumber
          numberType={numberType}
          refetch={() => {
            setShowAddContact(false);
            fetchData();
          }}
          userType={userType}
        />
      </BaseModal>

      <BaseModal
        center
        open={!!updatingContact}
        onClose={() => setUpdatingContact(undefined)}
      >
        <AddOrUpdateContactNumber
          numberType={numberType}
          update
          targetContact={updatingContact}
          refetch={() => {
            setUpdatingContact(undefined);
            fetchData();
          }}
          userType={userType}
          setAskedForDelete={() => {
            setAskedForDelete(updatingContact);
            setUpdatingContact(undefined);
          }}
        />
      </BaseModal>

      <BaseWrapper mode={["vertical", "center"]}>
        <BaseWrapper mode={["horizontal"]}>
          <h1>
            {numberType === "telegram" ? t("Telegram IDs") : t("SMS Numbers")}
          </h1>
          <BaseButton mode="outline" onClick={() => setShowAddContact(true)}>
            {t("Add")}
          </BaseButton>
        </BaseWrapper>
      </BaseWrapper>

      <BaseWrapper
        mode={["center"]}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "40rem",
        }}
      >
        {contacts.map((contact: ContactNumber) => (
          <ContactNumberItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={contact.number}
            contact={contact}
            onContactClicked={() => setUpdatingContact(contact)}
            onDeleteContactClicked={() => setAskedForDelete(contact)}
          />
        ))}
        {!loading && contacts.length === 0 && (
          <BaseCard style={{ margin: "-0.5rem" }}>
            {numberType === "telegram"
              ? t("No IDs added")
              : t("No numbers added")}
          </BaseCard>
        )}
      </BaseWrapper>

      <BaseModal
        open={!!askedForDelete}
        title={
          numberType === "telegram" ? t("Deleting ID") : t("Deleting Number")
        }
        center
        baseDialog
        onClose={() => setAskedForDelete(undefined)}
        menuItems={
          <>
            <BaseButton
              mode="outline"
              onClick={() => setAskedForDelete(undefined)}
            >
              {t("No")}
            </BaseButton>
            <BaseButton onClick={deleteContact}>{t("Yes")}</BaseButton>
          </>
        }
      >
        <h2>
          {numberType === "telegram"
            ? t("Are you sure you want to delete this ID?")
            : t("Are you sure you want to delete this number?")}
        </h2>
      </BaseModal>
    </>
  );
};

export default ListContactNumbers;
