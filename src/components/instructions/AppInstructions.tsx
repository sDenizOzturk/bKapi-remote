import { BaseWrapper, BaseCard } from "binak-react-components";
import classes from "./Instructions.module.css";

import logo_appstore from "../../assets/logo_appstore.webp";
import logo_playstore from "../../assets/logo_playstore.webp";
import { useTranslation } from "react-i18next";
import { Instructions } from "../../models/instructions";
import { FC, ReactNode } from "react";

interface AppInstructionsProps {
  instructions: Instructions;
}

const AppInstructions: FC<AppInstructionsProps> = ({ instructions }) => {
  const { i18n } = useTranslation();

  const mobileAppUrl = instructions ? instructions.mobileAppUrl : "Error";
  const mobileAppPort = instructions ? instructions.mobileAppPort : "Error";

  const content: Record<string, ReactNode> = {
    tr: (
      <>
        <h1 className={classes.h1}>Uygulama anahtarı nedir, nasıl alınır?</h1>
        <ol className={classes.ol}>
          <li className={classes.li}>
            bKapı -site mobil uygulamasını kullanarak uzaktan site giriş çıkış
            kapılarını görüntüleyebilirsiniz ve açabilirsiniz.
          </li>
          <li className={classes.li}>
            Bunun için cihazınıza özel bir anahtarın sisteme kaydedilmiş olması
            gerekmektedir.
          </li>
          <li className={classes.li}>
            bKapı -site mobil uygulamasını telefonunuza indiriniz:
            <BaseWrapper mode={["horizontal", "center"]}>
              <BaseWrapper mode={["horizontal", "center"]}>
                <a
                  className={classes.a}
                  href="https://apps.apple.com/tr/app/bkapi-site-mobil/id1576908443"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_appstore} alt="" />
                </a>
                <a
                  className={classes.a}
                  href="https://play.google.com/store/apps/details?id=binak.bKapi.site"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_playstore} alt="" />
                </a>
              </BaseWrapper>
            </BaseWrapper>
          </li>
          <li className={classes.li}>
            Uygulamayı açınız. &quot;Özel anahtar&quot; bölümünde yazan
            anahtarı, üstte bulunan &quot;Uygulama Anahtarları&quot; bölmününe
            kaydediniz.
          </li>

          <li className={classes.li}>
            Uygulamada, &quot;IP adresi&quot; bölümüne tırnak işaretleri olmadan
            &quot;
            {mobileAppUrl}&quot; yazınız.
          </li>

          <li className={classes.li}>
            Port numarası bölümüne tırnak işaretleri olmadan &quot;
            {mobileAppPort}&quot; yazınız.
          </li>

          <li className={classes.li}>
            Kurulum tamamlanmıştır, sisteme bağlanmak için &quot;Giriş Yap&quot;
            butonuna tıklayınız.
          </li>
        </ol>
      </>
    ),
    ru: (
      <>
        <h1 className={classes.h1}>
          Что такое ключ приложения и как его получить?
        </h1>
        <ol className={classes.ol}>
          <li className={classes.li}>
            С помощью мобильного приложения bKapı -site вы можете удалённо
            просматривать и открывать входные и выходные двери жилого комплекса.
          </li>
          <li className={classes.li}>
            Для этого необходимо зарегистрировать приватный ключ вашего
            устройства в системе.
          </li>
          <li className={classes.li}>
            Скачайте мобильное приложение bKapı -site на свой телефон:
            <BaseWrapper mode={["horizontal", "center"]}>
              <BaseWrapper mode={["horizontal", "center"]}>
                <a
                  className={classes.a}
                  href="https://apps.apple.com/tr/app/bkapi-site-mobil/id1576908443"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_appstore} alt="" />
                </a>
                <a
                  className={classes.a}
                  href="https://play.google.com/store/apps/details?id=binak.bKapi.site"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_playstore} alt="" />
                </a>
              </BaseWrapper>
            </BaseWrapper>
          </li>
          <li className={classes.li}>
            Откройте приложение и введите ключ из раздела &quot;Özel
            Anahtar&quot; в раздел &quot;Application Keys&quot; в верхней части
            этого сайта.
          </li>
          <li className={classes.li}>
            В приложении в разделе &quot;IP adresi&quot; введите &quot;
            {mobileAppUrl}&quot; (без кавычек).
          </li>
          <li className={classes.li}>
            В разделе &quot;Port numarası&quot; введите &quot;{mobileAppPort}
            &quot; (без кавычек).
          </li>
          <li className={classes.li}>
            Установка завершена. Нажмите кнопку &quot;Giriş Yap&quot;, чтобы
            подключиться к системе.
          </li>
        </ol>
      </>
    ),
  };

  return (
    <BaseCard>
      <BaseWrapper style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
        {content[i18n.language] ? content[i18n.language] : content.tr}
      </BaseWrapper>
    </BaseCard>
  );
};
export default AppInstructions;
