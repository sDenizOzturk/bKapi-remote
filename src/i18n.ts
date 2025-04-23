import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const common = {
  tr: {
    "Home Page": "Ana Sayfa",
    Create: "Oluştur",
    Okay: "Tamam",
    Yes: "Evet",
    No: "Hayır",
    Add: "Ekle",
    Edit: "Düzenle",
    Delete: "Sil",
    Instructions: "Talimatlar",
    Next: "Sonraki",
    Previous: "Önceki",
    "Open Link": "Bağlantıyı Aç",
    Search: "Ara",
  },
  ru: {
    "Home Page": "Домашняя страница",
    Create: "Создать",
    Okay: "Хорошо",
    Yes: "Да",
    No: "Нет",
    Add: "Добавить",
    Edit: "Изменить",
    Delete: "Удалить",
    Instructions: "Инструкции",
    Next: "Далее",
    Previous: "Назад",
    "Open Link": "Открыть ссылку",
    Search: "Поиск",
  },
};

const error = {
  en: {
    "Failed to fetch": "Failed to connect to server",
    "fetch failed": "Failed to connect to building complex",
  },
  tr: {
    "Failed to fetch": "Sunucuya bağlanılamadı",
    "fetch failed": "Siteye bağlanılamadı",
    "Password is not correct.": "Parola doğru değil",
    "An Error Occurred": "Bir hata alındı",
    "This plate is already added": "Bu plaka numarası daha önce eklenmiş",
    'A key has already been added for this name before. To add multiple records to the same person, you can add a word such as "2"-"3"-"tablet"-"iOS" to the end of the name.':
      'Bu isim için daha önce anahtar eklenmiş. Aynı kişiye birden fazla kayıt ekleyebilmek için ismin sonuna "2"-"3"-"tablet"-"iOS" gibi bir kelime ekleyebilirsiniz.',
    "You can not add more plates": "Daha fazla plaka ekleyemezsiniz",
    "You can not add more keys": "Daha fazla anahtar ekleyemezsiniz",
    "Token Expired": "Token süresi sona ermiş",
    "Key is not verified": "Token'ın süresi aşılmış",
    "Not authenticated": "Eşleştirme hatası",
    "A permanent link has already been created before for this door number!":
      "Bu kapı numarası için daha önce oluşturuluş bir kalıcı bağlantı bulunmaktadır!",
    "Link is not valid!": "Link geçerli değil!",
    "Building complex does not exist!": "Sistemde bu site bulunmuyor!",
    "You cannot perform that operation on the test server!":
      "Bu işlemi test sunucusunda gerçekleştiremezsiniz!",
  },
  ru: {
    "Failed to fetch": "Не удалось подключиться к серверу",
    "fetch failed": "Не удалось подключиться к жилому комплексу",
    "Password is not correct.": "Неверный пароль",
    "An Error Occurred": "Произошла ошибка",
    "This plate is already added": "Этот номер уже добавлен",
    'A key has already been added for this name before. To add multiple records to the same person, you can add a word such as "2"-"3"-"tablet"-"iOS" to the end of the name.':
      'Ключ для этого имени уже был добавлен ранее. Чтобы добавить несколько записей на одного человека, добавьте в конец имени, например, "2", "3", "планшет" или "iOS".',
    "You can not add more plates": "Нельзя добавить больше номерных знаков",
    "You can not add more keys": "Нельзя добавить больше ключей",
    "Token Expired": "Срок действия токена истёк",
    "Key is not verified": "Ключ не подтверждён",
    "Not authenticated": "Не прошла аутентификация",
    "A permanent link has already been created before for this door number!":
      "Для этого номера двери уже создана постоянная ссылка!",
    "Link is not valid!": "Ссылка недействительна!",
    "Building complex does not exist!": "Жилой комплекс не существует!",
    "You cannot perform that operation on the test server!":
      "Эту операцию нельзя выполнить на тестовом сервере!",
  },
};

const validation = {
  tr: {
    "Please enter a valid value": "Lütfen geçerli bir değer giriniz",
    "Please enter a valid door number":
      "Lütfen geçerli bir kapı numarası giriniz",
    "Please enter a valid password": "Lütfen geçerli bir parola giriniz",
    "Please enter a valid fullname": "Lütfen geçerli bir isim soyad giriniz",
    "Please enter a valid plate number":
      "Lütfen geçerli bir plaka numarası giriniz",
    "Please enter a valid application key":
      "Lütfen geçerli uygulama anahtarı giriniz",
  },
  ru: {
    "Please enter a valid value": "Пожалуйста, введите допустимое значение",
    "Please enter a valid door number":
      "Пожалуйста, введите допустимый номер двери",
    "Please enter a valid password": "Пожалуйста, введите допустимый пароль",
    "Please enter a valid fullname": "Пожалуйста, введите полное имя",
    "Please enter a valid plate number":
      "Пожалуйста, введите допустимый номерной знак",
    "Please enter a valid application key":
      "Пожалуйста, введите допустимый ключ приложения",
  },
};

const admin = {
  tr: {
    "Log In": "Giriş",
    "Log Out": "Çıkış",
    Password: "Parola",
    "Admin Log In": "Admin Girişi",
    "Vehicles Inside": "İçerideki Araçlar",
  },
  ru: {
    "Log In": "Вход",
    "Log Out": "Выход",
    Password: "Пароль",
    "Admin Log In": "Вход администратора",
    "Vehicles Inside": "Транспорт внутри",
  },
};

const vehicleInside = {
  tr: {
    "Search Vehicles Inside": "İçerideki Araçlarda Ara",
    "Check In Vehicle": "İçeri Al",
    "Checking Out Vehicle...": "Araç Dışarı Çıkarılıyor...",
    "Are you sure to check out this vehicle?":
      "Bu aracı dışarı çıkarmak istediğinizden emin misiniz?",
    "Plate not found": "Plaka bulunamadı",
    "No vehicles.": "Araç bulunmuyor.",
  },
  ru: {
    "Search Vehicles Inside": "Поиск транспорта внутри",
    "Check In Vehicle": "Запустить внутрь",
    "Checking Out Vehicle...": "Выводим транспорт...",
    "Are you sure to check out this vehicle?":
      "Вы уверены, что хотите вывести этот транспорт?",
    "Plate not found": "Номер не найден",
    "No vehicles.": "Транспорт не найден.",
  },
};

const registryPanel = {
  tr: {
    "Create Temporary Link": "Geçici Bağlantı Oluştur",
    "Copy Permanent Link": "Kalıcı Bağlantıyı Kopyala",
    "Change Permanent Link": "Kalıcı Bağlantıyı Değiştir",
    "Link is created": "Bağlantı oluşturuldu",
    "Link is copied to clipboard": "Bağlantı panoya kopyalandı",
    "Clear Household": "Evi Boşalt",
    "Clearing Household...": "Ev Boşaltılıyor...",
    "Are you sure to clear this household? All the plates and keys under this household will be deleted! Permanent key will be changed!":
      "Bu evin içini boşaltmak istediğinizden emin misiniz? Bu hanenin altındaki tüm plakalar ve anahtarlar silinecek! Kalıcı anahtar değiştirilecek!",
    "Delete Household": "Haneyi Sil",
  },
  ru: {
    "Create Temporary Link": "Создать временную ссылку",
    "Copy Permanent Link": "Скопировать постоянную ссылку",
    "Change Permanent Link": "Изменить постоянную ссылку",
    "Link is created": "Ссылка создана",
    "Link is copied to clipboard": "Ссылка скопирована в буфер обмена",
    "Clear Household": "Очистить домохозяйство",
    "Clearing Household...": "Очистка домохозяйства...",
    "Are you sure to clear this household? All the plates and keys under this household will be deleted! Permanent key will be changed!":
      "Вы уверены, что хотите очистить это домохозяйство? Все номера и ключи будут удалены! Постоянный ключ будет изменён!",
    "Delete Household": "Удалить домохозяйство",
  },
};

const household = {
  tr: {
    Households: "Haneler",
    Create: "Oluştur",
    "Create Household": "Hane Oluştur",
    "No links created": "Link oluşturulmadı",
    "No links found": "Link bulunamadı",
    "Deleting Household...": "Hane Siliniyor...",
    "Are you sure to delete this household? All the plates and keys under this household will be deleted!":
      "Bu haneyi silmek istediğinizden emin misiniz? Bu haneye ait tüm plakalar ve anahtarlar silinecek!",
    "Search Household": "Hane Ara",
    "Please enter a valid filter text":
      "Lütfen geçerli bir filtre metni giriniz",
    "Door Number / Fullname / Plate Number":
      "Kapı Numarası / Adı Soyadı / Plaka Numarası",
    "Door Number": "Kapı Numarası",
  },
  ru: {
    Households: "Домохозяйства",
    Create: "Создать",
    "Create Household": "Создать домохозяйство",
    "No links created": "Ссылки не созданы",
    "No links found": "Ссылки не найдены",
    "Deleting Household...": "Удаление домохозяйства...",
    "Are you sure to delete this household? All the plates and keys under this household will be deleted!":
      "Вы уверены, что хотите удалить это домохозяйство? Все номера и ключи будут удалены!",
    "Search Household": "Поиск домохозяйства",
    "Please enter a valid filter text":
      "Пожалуйста, введите допустимый текст фильтра",
    "Door Number / Fullname / Plate Number":
      "Номер двери / Полное имя / Номерной знак",
    "Door Number": "Номер двери",
  },
};

const record = {
  tr: {
    Records: "Kayıtlar",
    "Search Record": "Kayıt Ara",
    "Fullname or Plate Number": "Adı Soyadı veya Plaka Numarası",
    Date: "Tarih",
    "Please enter a valid date (e.g 01.02.2024)":
      "Lütfen geçerli bir tarih giriniz (örneğin: 01.02.2024)",
    "No records found": "Kayıt bulunamadı",
    Guest: "Misafir",
    Resident: "Site Sakini",
    Application: "Uygulama",
    "Unregistered Plate": "Kayıtsız Araç",
    Unknown: "Bilinmeyen",
    Entrance: "Giriş",
    Exit: "Çıkış",
    Pedestrian: "Yaya",
    "Set the date as today": "Tarihi bugün olarak ayarla",
  },
  ru: {
    Records: "Записи",
    "Search Record": "Поиск записи",
    "Fullname or Plate Number": "Полное имя или номерной знак",
    Date: "Дата",
    "Please enter a valid date (e.g 01.02.2024)":
      "Пожалуйста, введите допустимую дату (например: 01.02.2024)",
    "No records found": "Записей не найдено",
    Guest: "Гость",
    Resident: "Житель",
    Application: "Приложение",
    "Unregistered Plate": "Незарегистрированный номер",
    Unknown: "Неизвестно",
    Entrance: "Вход",
    Exit: "Выход",
    Pedestrian: "Пешеход",
    "Set the date as today": "Установить сегодняшнюю дату",
  },
};

const registry = {
  tr: {
    "Residents' Vehicles": "Site Sakinlerine Ait Araçlar",
    "Guests' Vehicles": "Misafirlere Ait Araçlar",
    "Application Keys": "Uygulama Anahtarları",
    "Drivers Fullname": "Sürücünün Adı Soyadı",
    "Plate Number": "Plaka Numarası",
    "Additional Information": "Ek Bilgi",
    "Mobile Numbers To Send SMS": "SMS Gönderilecek Numaralar",
    "Telegram IDs": "Telegram ID'leri",
    "Telegram ID": "Telegram ID'si",
    "SMS Numbers": "SMS Numaraları",
    "SMS Number": "SMS Numarası",
    "Users Fullname": "Kullanıcının Adı Soyadı",
    "Application Key": "Uygulama Anahtarı",
    "Deleting Plate...": "Plaka Siliniyor...",
    "Deleting Application Key...": "Uygulama Anahtarı Siliniyor...",
    "Are you sure to delete this plate?":
      "Bu plakayı silmek istediğinizden emin misiniz?",
    "Are you sure to delete this application key?":
      "Bu uygulama anahtarını silmek istediğinizden emin misiniz?",
    "Show instructions": "Talimatları göster",
    "Hide instructions": "Talimatları gizle",
    "No vehicles added": "Araç eklenmedi",
    "No keys added": "Anahtar eklenmedi",
    "No IDs added": "ID eklenmedi",
    "No numbers added": "Numara eklenmedi",
    "Please enter a valid ID": "Lütfen geçerli bir ID giriniz",
    "Please enter a valid number": "Lütfen geçerli bir numara giriniz",
  },
  ru: {
    "Residents' Vehicles": "Транспорт жителей",
    "Guests' Vehicles": "Транспорт гостей",
    "Application Keys": "Ключи приложения",
    "Drivers Fullname": "Полное имя водителя",
    "Plate Number": "Номерной знак",
    "Additional Information": "Дополнительная информация",
    "Mobile Numbers To Send SMS": "Номера для отправки SMS",
    "Telegram IDs": "Telegram ID",
    "Telegram ID": "Telegram ID",
    "SMS Numbers": "Номера SMS",
    "SMS Number": "SMS номер",
    "Users Fullname": "Полное имя пользователя",
    "Application Key": "Ключ приложения",
    "Deleting Plate...": "Удаление номерного знака...",
    "Deleting Application Key...": "Удаление ключа приложения...",
    "Are you sure to delete this plate?":
      "Вы уверены, что хотите удалить этот номерной знак?",
    "Are you sure to delete this application key?":
      "Вы уверены, что хотите удалить этот ключ приложения?",
    "Show instructions": "Показать инструкции",
    "Hide instructions": "Скрыть инструкции",
    "No vehicles added": "Транспорт не добавлен",
    "No keys added": "Ключи не добавлены",
    "No IDs added": "ID не добавлены",
    "No numbers added": "Номера не добавлены",
    "Please enter a valid ID": "Пожалуйста, введите допустимый ID",
    "Please enter a valid number": "Пожалуйста, введите допустимый номер",
  },
};

const resources = {
  en: {
    translation: {
      ...error.en,
    },
  },
  tr: {
    translation: {
      ...common.tr,
      ...error.tr,
      ...validation.tr,
      ...admin.tr,
      ...vehicleInside.tr,
      ...registryPanel.tr,
      ...household.tr,
      ...record.tr,
      ...registry.tr,
    },
  },
  ru: {
    translation: {
      ...common.ru,
      ...error.ru,
      ...validation.ru,
      ...admin.ru,
      ...vehicleInside.ru,
      ...registryPanel.ru,
      ...household.ru,
      ...record.ru,
      ...registry.ru,
    },
  },
};

let lng = localStorage.getItem("language");

const userLang = navigator.language;

console.log("userLang", navigator.languages);

if (!lng) {
  if (userLang === "tr" || userLang.startsWith("tr-")) {
    lng = "tr";
    localStorage.setItem("language", "tr");
  } else if (userLang === "ru" || userLang.startsWith("ru-")) {
    lng = "ru";
    localStorage.setItem("language", "ru");
  } else {
    lng = "en";
    localStorage.setItem("language", "en");
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
