import { FC, useCallback, useState } from "react";
import { BaseButton } from "binak-react-components";
import { HTMLMotionProps } from "framer-motion";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLoading from "../../../hooks/useLoading";
import useError from "../../../hooks/useError";
import useUrls from "../../../hooks/useUrls";
import LinkDialog from "./LinkDialog";
import { useCopyToClipboard } from "usehooks-ts";
import routes from "../../../utils/routes";

interface CreateTemporaryLinkProps extends HTMLMotionProps<"div"> {
  doorNumber: String;
  token: String;
}

const CreateTemporaryLink: FC<CreateTemporaryLinkProps> = ({
  doorNumber,
  token,
}) => {
  const { t } = useTranslation();

  const { setLoading } = useLoading();
  const { setError } = useError();
  const { url } = useUrls();

  const [link, setLink] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  const { target } = useParams();

  const [_copiedText, copyToClipboard] = useCopyToClipboard();

  const displayLink = async (link: string, doorNumber: string) => {
    const targetUrl =
      window.location.origin +
      routes.temporaryLinks
        .replace(":target", target as string)
        .replace(":token", link as string);
    setLink(targetUrl);

    try {
      await copyToClipboard(targetUrl);
      setDialogTitle(t("Link is copied to clipboard") + " - " + doorNumber);
    } catch (err) {
      console.log("Link can not be copied to clipboard", err);
      setDialogTitle(t("Link is created") + " - " + doorNumber);
    }
  };

  const closeLinkDialog = () => {
    setLink("");
    setDialogTitle("");
  };

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(url("createTemporaryLink"), {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doorNumber,
        }),
      });
      const responseData = await response.json();

      if (response.status === 200) {
        displayLink(responseData.temporaryLink, responseData.doorNumber);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }, [doorNumber, token]);

  return (
    <>
      <BaseButton
        onClick={fetchData}
        mode="outline"
        style={{ minWidth: "15rem" }}
      >
        {t("Create Temporary Link")}
      </BaseButton>
      <LinkDialog
        onClose={closeLinkDialog}
        link={link}
        dialogTitle={dialogTitle}
      />
    </>
  );
};
export default CreateTemporaryLink;
