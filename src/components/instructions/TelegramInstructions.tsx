import { BaseWrapper, BaseCard } from "binak-react-components";
import classes from "./Instructions.module.css";

import logo_appstore from "../../assets/logo_appstore.webp";
import logo_playstore from "../../assets/logo_playstore.webp";
import { useTranslation } from "react-i18next";
import { FC, ReactNode } from "react";
import { Instructions } from "../../models/instructions";

interface TelegramInstructionsProps {
  instructions: Instructions;
}

const TelegramInstructions: FC<TelegramInstructionsProps> = ({
  instructions,
}) => {
  const { i18n } = useTranslation();

  const telegramBotName = instructions ? instructions.telegramBotName : "Error";

  const content: Record<string, ReactNode> = {
    tr: (
      <>
        <h1 className={classes.h1}>Telegram ID nedir ve nasıl alınır?</h1>
        <ol className={classes.ol}>
          <li className={classes.li}>
            Aracınız geçtiğinde, görseliyle birlikte bir mesaj yalnızca kayıtlı
            Telegram numaralarınıza gönderilir.
          </li>
          <li className={classes.li}>
            Bunun için, cihazınıza ait benzersiz bir ID sistemde
            kaydedilmelidir.
          </li>
          <li className={classes.li}>
            Telegram uygulamasını cep telefonunuza indirin:
            <BaseWrapper mode={["horizontal", "center"]}>
              <BaseWrapper mode={["horizontal", "center"]}>
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
            Uygulamayı açın. Arama alanına &quot;{telegramBotName}&quot; yazın.
            Bot sonuçlarda görünecektir — üzerine tıklayarak mesajlaşma ekranını
            açın.
          </li>
          <li className={classes.li}>
            Ekranın altındaki <strong>Başlat</strong> butonuna tıklayarak botu
            aktif edin.
          </li>
          <li className={classes.li}>
            Tırnaksız olarak &quot;id&quot; yazıp gönderin. Bot size benzersiz
            ID’nizi cevap olarak gönderecektir.
          </li>
          <li className={classes.li}>
            Bu ID’yi yukarıdaki Telegram ID alanına girin.
          </li>
        </ol>
      </>
    ),
    en: (
      <>
        <h1 className={classes.h1}>What is Telegram ID and how to get it?</h1>
        <ol className={classes.ol}>
          <li className={classes.li}>
            When your vehicle passes, a notification with its image is sent via
            Telegram only to your registered Telegram numbers.
          </li>
          <li className={classes.li}>
            To do this, you must register a unique ID for your device in the
            system.
          </li>
          <li className={classes.li}>
            Download the Telegram application to your mobile phone:
            <BaseWrapper mode={["horizontal", "center"]}>
              <BaseWrapper mode={["horizontal", "center"]}>
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
            search field. You’ll see the bot in the results — click on it to
            open the messaging screen.
          </li>
          <li className={classes.li}>
            Click the <strong>Start</strong> button at the bottom of the screen
            to activate the bot.
          </li>
          <li className={classes.li}>
            Type &quot;id&quot; (without quotes) and send it. The bot will reply
            with your unique ID.
          </li>
          <li className={classes.li}>
            Enter this ID in the Telegram ID section above.
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
            Когда ваш автомобиль проезжает, уведомление с его изображением
            отправляется через Telegram только на ваши зарегистрированные номера
            Telegram.
          </li>
          <li className={classes.li}>
            Для этого необходимо зарегистрировать уникальный ID вашего
            устройства в системе.
          </li>
          <li className={classes.li}>
            Скачайте приложение Telegram на свой мобильный телефон:
            <BaseWrapper mode={["horizontal", "center"]}>
              <BaseWrapper mode={["horizontal", "center"]}>
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
            Откройте приложение. Введите &quot;{telegramBotName}&quot; в поле
            поиска. Вы увидите бота в результатах — нажмите на него, чтобы
            открыть экран сообщений.
          </li>
          <li className={classes.li}>
            Нажмите кнопку <strong>Start</strong> внизу экрана, чтобы
            активировать бота.
          </li>
          <li className={classes.li}>
            Напишите &quot;id&quot; (без кавычек) и отправьте. Бот ответит вам
            вашим уникальным ID.
          </li>
          <li className={classes.li}>
            Введите этот ID в поле Telegram ID выше.
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
export default TelegramInstructions;
