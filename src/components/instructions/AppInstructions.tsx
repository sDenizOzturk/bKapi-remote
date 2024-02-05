import { BaseWrapper, BaseCard } from 'binak-react-components';
import classes from './Instructions.module.css';

import logo_appstore from '../../assets/logo_appstore.webp';
import logo_playstore from '../../assets/logo_playstore.webp';
import { useTranslation } from 'react-i18next';
import { Instructions } from '../../models/instructions';
import { FC, ReactNode } from 'react';

interface AppInstructionsProps {
  instructions: Instructions;
}

const AppInstructions: FC<AppInstructionsProps> = ({ instructions }) => {
  const { i18n } = useTranslation();

  const mobileAppUrl = instructions ? instructions.mobileAppUrl : 'Error';
  const mobileAppPort = instructions ? instructions.mobileAppPort : 'Error';

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
            <BaseWrapper mode={['horizontal', 'center']}>
              <BaseWrapper mode={['horizontal', 'center']}>
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
    en: (
      <>
        <h1 className={classes.h1}>
          What is the application key and how to get it?
        </h1>
        <ol className={classes.ol}>
          <li className={classes.li}>
            Using bKapı -site mobile application, you can view and open the site
            entrance and exit doors remotely.
          </li>
          <li className={classes.li}>
            A private key for your device must be registered in the system.
          </li>
          <li className={classes.li}>
            Download bKapı -site mobil application to your mobile phone:
            <BaseWrapper mode={['horizontal', 'center']}>
              <BaseWrapper mode={['horizontal', 'center']}>
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
            Open the application and enter the key which is in the &quot;Özel
            Anahtar&quot; section to the &quot;Application Keys&quot; section at
            the top of this website.
          </li>

          <li className={classes.li}>
            In the app, type &quot;{mobileAppUrl}&quot; without quotes to the
            &quot;IP adresi&quot; section.
          </li>

          <li className={classes.li}>
            In the &quot;Port numarası&quot; section, type &quot;{mobileAppPort}
            &quot; without quotes.
          </li>

          <li className={classes.li}>
            The installation is completed, click the &quot;Giriş Yap&quot;
            button to connect to the system.
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
            С помощью мобильного приложения bKapı -site вы можете удаленно
            просматривать и открывать входные и выходные двери объекта.
          </li>
          <li className={classes.li}>
            Приватный ключ вашего устройства должен быть зарегистрирован в
            системе.
          </li>
          <li className={classes.li}>
            Загрузите приложение «bKapı -site mobil» на свой мобильный телефон:
            <BaseWrapper mode={['horizontal', 'center']}>
              <BaseWrapper mode={['horizontal', 'center']}>
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
            Откройте приложение и введите ключ, который находится в разделе
            «Özel Anahtar», в раздел «Ключи приложений» в верхней части этого
            веб-сайта.
          </li>

          <li className={classes.li}>
            В приложении введите «{mobileAppUrl}» без кавычек в раздел «IP
            adresi».
          </li>

          <li className={classes.li}>
            В разделе «Port numarası» введите «{mobileAppPort}» без кавычек.
          </li>

          <li className={classes.li}>
            установка завершена, нажмите кнопку «Giriş Yap» для подключения к
            системе.
          </li>
        </ol>
      </>
    ),
  };

  return (
    <BaseCard>
      <BaseWrapper style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
        {content[i18n.language] ? content[i18n.language] : content.tr}
      </BaseWrapper>
    </BaseCard>
  );
};
export default AppInstructions;
