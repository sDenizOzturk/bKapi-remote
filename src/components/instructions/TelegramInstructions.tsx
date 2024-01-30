import BaseCard from '../ui/BaseCard';
import BaseWrapper from '../ui/BaseWrapper';
import classes from './Instructions.module.css';

import logo_appstore from '../../assets/logo_appstore.webp';
import logo_playstore from '../../assets/logo_playstore.webp';
import { useTranslation } from 'react-i18next';
import { FC, ReactNode } from 'react';
import { Instructions } from '../../models/instructions';

interface TelegramInstructionsProps {
  instructions: Instructions;
}

const TelegramInstructions: FC<TelegramInstructionsProps> = ({
  instructions,
}) => {
  const { i18n } = useTranslation();

  const telegramBotName = instructions ? instructions.telegramBotName : 'Error';

  const content: Record<string, ReactNode> = {
    tr: (
      <>
        <h1 className={classes.h1}>Telegram ID&apos;si nedir, nasıl alınır?</h1>
        <ol className={classes.ol}>
          <li className={classes.li}>
            Araç geçişi sırasında, Telegram uygulaması üzerinden aracın
            görüntüsü ile birlikte bir bilgilendirme mesajı
            gönderilebilmektedir.
          </li>
          <li className={classes.li}>
            Bunun için cihazınıza özel bir ID&apos;nin sisteme kaydedilmiş
            olması gerekmektedir.
          </li>
          <li className={classes.li}>
            Telegram uygulamasını telefonunuza indiriniz:
            <BaseWrapper mode="horizontal center">
              <BaseWrapper mode="horizontal center">
                <a
                  className={classes.a}
                  href="https://apps.apple.com/us/app/telegram-messenger/id686449807"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_appstore} alt="" />
                </a>
                <a
                  className={classes.a}
                  href="https://play.google.com/store/apps/details?id=org.telegram.messenger"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_playstore} alt="" />
                </a>
              </BaseWrapper>
            </BaseWrapper>
          </li>
          <li className={classes.li}>
            Uygulamayı açınız. Arama bölümüne &quot;{telegramBotName}&quot;
            yazınız, ardından bu isimdeki kullanıcı ekranda belirecektir,
            üzerine tıklayarak mesajlaşma ekranını açınız.
          </li>

          <li className={classes.li}>
            Ekranın altında bulunan &quot;BAŞLAT&quot; butonuna tıklayıp botu
            aktif hale getiriniz.
          </li>

          <li className={classes.li}>
            Tırnak işaretleri olmadan &quot;id&quot; yazıp gönderiniz. Bot size
            özel ID&apos;nizi cevap olarak gönderecektir. Bu ID&apos;yi, üstte
            bulunan bölümlerde plaka eklerken ilgili bölümlere giriniz.
          </li>

          <li className={classes.li}>
            Aynı plaka numarası için birden fazla ID ekleyecekseniz
            ID&apos;lerin aralarına virgül (&apos;,&apos;) koyunuz.
          </li>
        </ol>
      </>
    ),
    en: (
      <>
        <h1 className={classes.h1}>What is Telegram ID and how to get it?</h1>
        <ol className={classes.ol}>
          <li className={classes.li}>
            While the vehicle is passing, an informational message can be sent
            with the image of the vehicle via Telegram application.
          </li>
          <li className={classes.li}>
            For this, a unique ID for your device must be registered in the
            system.
          </li>
          <li className={classes.li}>
            Download the Telegram application to your mobile phone:
            <BaseWrapper mode="horizontal center">
              <BaseWrapper mode="horizontal center">
                <a
                  className={classes.a}
                  href="https://apps.apple.com/us/app/telegram-messenger/id686449807"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_appstore} alt="" />
                </a>
                <a
                  className={classes.a}
                  href="https://play.google.com/store/apps/details?id=org.telegram.messenger"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_playstore} alt="" />
                </a>
              </BaseWrapper>
            </BaseWrapper>
          </li>
          <li className={classes.li}>
            Open the application. Type &quot;{telegramBotName}&quot; in the
            search field, then the user with this name will appear on the
            screen, click on it to open the messaging screen.
          </li>

          <li className={classes.li}>
            Click the START button at the bottom of the screen and activate the
            bot.
          </li>

          <li className={classes.li}>
            Type &quot;id&quot; without quotes and send. The bot will send you
            your unique ID as a reply. Enter this ID in the relevant sections
            when adding a license plate in the sections above.
          </li>

          <li className={classes.li}>
            If you are going to add more than one ID for the same license plate
            number, type a comma (&quot;,&quot;) between the IDs.
          </li>
        </ol>
      </>
    ),
    ru: (
      <>
        <h1 className={classes.h1}>
          Что такое Telegram ID и как его получить?
        </h1>
        <ol className={classes.ol}>
          <li className={classes.li}>
            Во время проезда транспортного средства можно отправить
            информационное сообщение с изображением транспортного средства через
            приложение Telegram.
          </li>
          <li className={classes.li}>
            Для этого в системе должен быть зарегистрирован уникальный
            идентификатор вашего устройства.
          </li>
          <li className={classes.li}>
            Загрузите приложение Telegram на свой мобильный телефон:
            <BaseWrapper mode="horizontal center">
              <BaseWrapper mode="horizontal center">
                <a
                  className={classes.a}
                  href="https://apps.apple.com/us/app/telegram-messenger/id686449807"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_appstore} alt="" />
                </a>
                <a
                  className={classes.a}
                  href="https://play.google.com/store/apps/details?id=org.telegram.messenger"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.img} src={logo_playstore} alt="" />
                </a>
              </BaseWrapper>
            </BaseWrapper>
          </li>
          <li className={classes.li}>
            Откройте приложение. Введите «{telegramBotName}» в поле поиска,
            после чего на экране появится пользователь с этим именем, нажмите на
            него, чтобы открыть экран сообщений.
          </li>

          <li className={classes.li}>
            Нажмите кнопку СТАРТ внизу экрана и активируйте бота.
          </li>

          <li className={classes.li}>
            Введите «id» без кавычек и отправьте. В ответ бот отправит вам ваш
            уникальный идентификатор. Введите этот идентификатор в
            соответствующие разделы при добавлении номерного знака в разделах
            выше.
          </li>

          <li className={classes.li}>
            Если вы собираетесь добавить более одного идентификатора для одного
            и того же номерного знака, введите запятую («,») между
            идентификаторами.
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
export default TelegramInstructions;
