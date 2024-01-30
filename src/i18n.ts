import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const common = {
  tr: {
    Create: 'Oluştur',
    Okay: 'Tamam',
    Yes: 'Evet',
    No: 'Hayır',
    Add: 'Ekle',
    Edit: 'Düzenle',
    Delete: 'Sil',
    Instructions: 'Talimatlar',
  },
  ru: {
    Create: 'Создавать',
    Okay: 'Хорошо',
    Yes: 'Да',
    No: 'Нет',
    Add: 'Добавлять',
    Edit: 'Редактировать',
    Delete: 'Удалить',
    Instructions: 'инструкции',
  },
};

const error = {
  tr: {
    'Please enter a valid value.': 'Lütfen geçerli bir değer giriniz',
    'Failed to fetch': 'Sunucuya bağlanılamadı',
    'Password is not correct': 'Parola doğru değil',
    'An Error Occurred': 'Bir hata alındı',
    'This plate is already added': 'Bu plaka numarası daha önce eklenmiş',
    'A key has already been added for this name before. To add multiple records to the same person, you can add a word such as "2"-"3"-"tablet"-"iOS" to the end of the name.':
      'Bu isim için daha önce anahtar eklenmiş. Aynı kişiye birden fazla kayıt ekleyebilmek için ismin sonuna "2"-"3"-"tablet"-"iOS" gibi bir kelime ekleyebilirsiniz.',
    'You can not add more plates': 'Daha fazla plaka ekleyemezsiniz',
    'You can not add more keys': 'Daha fazla anahtar ekleyemezsiniz',
    'Token Expired': 'Token süresi sona ermiş',
    'Key is not verified': "Token'ın süresi aşılmış",
    'Not authenticated': 'Eşleştirme hatası',
  },
  ru: {
    'Please enter a valid value': 'Пожалуйста, введите допустимое значение',
    'Failed to fetch': 'Не удалось получить',
    'Password is not correct': 'Пароль неправильный',
    'An Error Occurred': 'Произошла ошибка',
    'This plate is already added': 'Эта табличка уже добавлена',
    'A key has already been added for this name before. To add multiple records to the same person, you can add a word such as "2"-"3"-"tablet"-"iOS" to the end of the name.':
      'Ключ для этого имени уже был добавлен ранее. Чтобы добавить несколько записей для одного и того же человека, вы можете добавить в конец имени такое слово, как «2»-«3»-«планшет»-«iOS».',
    'You can not add more plates': 'Вы не можете добавить больше тарелок',
    'You can not add more keys': 'Вы не можете добавить больше ключей',
    'Token Expired': 'Срок действия токена истек',
    'Key is not verified': 'Ключ не проверен',
    'Not authenticated': 'Не аутентифицирован',
  },
};

const admin = {
  tr: {
    'Log In': 'Giriş',
    'Log Out': 'Çıkış',
    Password: 'Parola',
    'Admin Log In': 'Admin Girişi',
    'Create Link': 'Bağlantı Oluştur',
    'Link is created': 'Bağlantı oluşturuldu',
    'Link is copied to clipboard': 'Bağlantı panoya kopyalandı',
    'Door Number': 'Kapı Numarası',
  },
  ru: {
    'Log In': 'Авторизоваться',
    'Log Out': 'Выйти',
    Password: 'Пароль',
    'Admin Log In': 'Вход администратора',
    'Create Link': 'Создать ссылку',
    'Link is created': 'Ссылка создана',
    'Link is copied to clipboard': 'Ссылка скопирована в буфер обмена',
    'Door Number': 'Номер двери',
  },
};

const resident = {
  tr: {
    "Residents' Vehicles": 'Site Sakinlerine Ait Araçlar',
    "Guests' Vehicles": 'Misafirlere Ait Araçlar',
    'Application Keys': 'Uygulama Anahtarları',

    'Drivers Fullname': 'Sürücünün Adı Soyadı',
    'Plate Number': 'Plaka Numarası',
    'Vehicle Information': 'Araç Bilgisi',
    'Contact Number': 'İrtibat Numarası',
    'Mobile Numbers To Send SMS': 'SMS Gönderilecek Numaralar',
    'Telegram IDs': "Telegram ID'leri",
    "If there is more than one value, put commas (',') between the numbers.":
      "Birden fazla ise değerlerin aralarına virgül (',') koyunuz.",

    'Users Fullname': 'Kullanıcının Adı Soyadı',
    'Application Key': 'Uygulama Anahtarı',

    'Deleting Plate...': 'Plaka Siliniyor...',
    'Deleting Application Key...': 'Uygulama Anahtarı Siliniyor...',
    'Are you sure to delete this plate?':
      'Bu plakayı silmek istediğinizden emin misiniz?',
    'Are you sure to delete this application key?':
      'Bu uygulama anahtarını silmek istediğinizden emin misiniz?',
  },
  ru: {
    "Residents' Vehicles": 'Транспортные средства жителей',
    "Guests' Vehicles": 'Транспортные средства гостей',
    'Application Keys': 'Ключи приложения',

    'Drivers Fullname': 'Полное имя драйвера',
    'Plate Number': 'Номерной знак',
    'Vehicle Information': 'Информация об автомобиле',
    'Contact Number': 'Контактный номер',
    'Mobile Numbers To Send SMS': 'Мобильные номера для отправки SMS',
    'Telegram IDs': 'Идентификаторы телеграмм',
    "If there is more than one value, put commas (',') between the numbers.":
      'Если значений несколько, поставьте запятые («,») между числами.',

    'Users Fullname': 'Полное имя пользователя',
    'Application Key': 'Ключ приложения',

    'Deleting Plate...': 'Удаление номерного знака...',
    'Deleting Application Key...': 'Удаление ключа приложения...',
    'Are you sure to delete this plate?':
      'Вы уверены, что удалите этот номерной знак?',
    'Are you sure to delete this application key?':
      'Вы уверены, что удалите этот ключ приложения?',
  },
};

const resources = {
  en: {},
  tr: {
    translation: {
      ...common.tr,
      ...error.tr,
      ...admin.tr,
      ...resident.tr,
    },
  },
  ru: {
    translation: {
      ...common.ru,
      ...error.ru,
      ...admin.ru,
      ...resident.ru,
    },
  },
};

let lng = localStorage.getItem('language');
if (!lng) {
  lng = 'tr';
  localStorage.setItem('language', 'tr');
}

i18n.use(initReactI18next).init({
  resources,
  lng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
