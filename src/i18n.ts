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
    Next: 'Sonraki',
    Previous: 'Önceki',
    'Open Link': 'Bağlantıyı Aç',
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
    Next: 'Следующий',
    Previous: 'Предыдущий',
    'Open Link': 'Открыть ссылку',
  },
};

const error = {
  tr: {
    'Failed to fetch': 'Sunucuya bağlanılamadı',
    'Password is not correct.': 'Parola doğru değil',
    'An Error Occurred': 'Bir hata alındı',
    'This plate is already added': 'Bu plaka numarası daha önce eklenmiş',
    'A key has already been added for this name before. To add multiple records to the same person, you can add a word such as "2"-"3"-"tablet"-"iOS" to the end of the name.':
      'Bu isim için daha önce anahtar eklenmiş. Aynı kişiye birden fazla kayıt ekleyebilmek için ismin sonuna "2"-"3"-"tablet"-"iOS" gibi bir kelime ekleyebilirsiniz.',
    'You can not add more plates': 'Daha fazla plaka ekleyemezsiniz',
    'You can not add more keys': 'Daha fazla anahtar ekleyemezsiniz',
    'Token Expired': 'Token süresi sona ermiş',
    'Key is not verified': "Token'ın süresi aşılmış",
    'Not authenticated': 'Eşleştirme hatası',
    'A permanent link has already been created before for this door number!':
      'Bu kapı numarası için daha önce oluşturuluş bir kalıcı bağlantı bulunmaktadır!',
    'Link is not valid!': 'Link geçerli değil!',
  },
  ru: {
    'Failed to fetch': 'Не удалось получить',
    'Password is not correct.': 'Пароль неправильный',
    'An Error Occurred': 'Произошла ошибка',
    'This plate is already added': 'Эта табличка уже добавлена',
    'A key has already been added for this name before. To add multiple records to the same person, you can add a word such as "2"-"3"-"tablet"-"iOS" to the end of the name.':
      'Ключ для этого имени уже был добавлен ранее. Чтобы добавить несколько записей для одного и того же человека, вы можете добавить в конец имени такое слово, как «2»-«3»-«планшет»-«iOS».',
    'You can not add more plates': 'Вы не можете добавить больше тарелок',
    'You can not add more keys': 'Вы не можете добавить больше ключей',
    'Token Expired': 'Срок действия токена истек',
    'Key is not verified': 'Ключ не проверен',
    'Not authenticated': 'Не аутентифицирован',
    'A permanent link has already been created before for this door number!':
      'Для этого номера двери уже была создана постоянная ссылка!',
    'Link is not valid!': 'Ссылка недействительна!',
  },
};

const validation = {
  tr: {
    'Please enter a valid value': 'Lütfen geçerli bir değer giriniz',
    'Please enter a valid door number':
      'Lütfen geçerli bir kapı numarası giriniz',
    'Please enter a valid password': 'Lütfen geçerli bir parola giriniz',
    'Please enter a valid fullname': 'Lütfen geçerli bir isim soyad giriniz',
    'Please enter a valid plate number':
      'Lütfen geçerli bir plaka numarası giriniz',
    'Please enter a valid application key':
      'Lütfen geçerli uygulama anahtarı giriniz',
  },
  ru: {
    'Please enter a valid value': 'Пожалуйста, введите допустимое значение',
    'Please enter a valid door number':
      'Пожалуйста, введите действительный номер двери',
    'Please enter a valid password': 'Пожалуйста, введите правильный пароль',
    'Please enter a valid fullname':
      'Пожалуйста, введите действительное полное имя',
    'Please enter a valid plate number':
      'Пожалуйста, введите действительный номерной знак',
    'Please enter a valid application key':
      'Пожалуйста, введите действительный ключ приложения',
  },
};

const admin = {
  tr: {
    'Log In': 'Giriş',
    'Log Out': 'Çıkış',
    Password: 'Parola',
    'Admin Log In': 'Admin Girişi',
    Links: 'Bağlantılar',
  },
  ru: {
    'Log In': 'Авторизоваться',
    'Log Out': 'Выйти',
    Password: 'Пароль',
    'Admin Log In': 'Вход администратора',
  },
};

const link = {
  tr: {
    Links: 'Bağlantılar',
    'Create Temporary': 'Geçici Oluştur',
    'Create Permanent': 'Kalıcı Oluştur',
    'Create Temporary Link': 'Geçici Bağlantı Oluştur',
    'Create Permanent Link': 'Kalıcı Bağlantı Oluştur',
    'Link is created': 'Bağlantı oluşturuldu',
    'Link is copied to clipboard': 'Bağlantı panoya kopyalandı',
    'Door Number': 'Kapı Numarası',
    'Search Permanent Links': 'Kalıcı Bağlantı Ara',
    Search: 'Ara',
    'Deleting Permanent Key...': 'Kalıcı Anahtar Siliniyor...',
    'Are you sure to delete this permanent key?':
      'Bu kalıcı bağlantıyı silmek istediğinizden emin misiniz?',
  },
  ru: {
    Links: 'Ссылки',
    'Create Temporary': 'Создать временный',
    'Create Permanent': 'Создать постоянный',
    'Create Temporary Link': 'Создать временную ссылку',
    'Create Permanent Link': 'Создать постоянную ссылку',
    'Link is created': 'Ссылка создана',
    'Link is copied to clipboard': 'Ссылка скопирована в буфер обмена',
    'Door Number': 'Номер двери',
    'Search Permanent Links': 'Поиск постоянных ссылок',
    Search: 'Поиск',
    'Deleting Permanent Key...': 'Удаление постоянного ключа...',
    'Are you sure to delete this permanent key?':
      'Вы уверены, что удалите этот постоянный ключ?',
  },
};

const household = {
  tr: {
    Households: 'Haneler',
    'Create or Open': 'Oluştur veya Aç',
    'Create or Open Household': 'Hane Oluştur veya Haneyi Aç',
    'No links created': 'Link oluşturulmadı',
    'No links found': 'Link bulunamadı',
    'Deleting Household...': 'Hane Siliniyor...',
    'Are you sure to delete this household? All the plates and keys under this household will be deleted!':
      'Bu haneyi silmek istediğinizden emin misiniz? Bu haneye ait tüm plakalar ve anahtarlar silinecek!',
    'Search Household': 'Hane Ara',
    'Please enter a valid filter text':
      'Lütfen geçerli bir filtre metni giriniz',
  },
  ru: {
    Households: 'Домохозяйства',
    'Create or Open': 'Создать или открыть',
    'Create or Open Household': 'Создать или открыть домохозяйство',
    'No links created': 'Ссылки не созданы',
    'No links found': 'Ссылки не найдены',
    'Deleting Household...': 'Удаление домохозяйства...',
    'Are you sure to delete this household? All the plates and keys under this household will be deleted!':
      'Вы уверены, что хотите удалить это хозяйство? Все номера и ключи в этом хозяйстве будут удалены!',
    'Search Household': 'Поиск по дому',
    'Please enter a valid filter text': 'Введите допустимый текст фильтра.',
  },
};

const record = {
  tr: {
    Records: 'Kayıtlar',
    'Search Record': 'Kayıt Ara',
    'Fullname or Plate Number': 'Adı Soyadı veya Plaka Numarası',
    Date: 'Tarih',
    'Please enter a valid date (e.g 01.02.2024)':
      'Lütfen geçerli bir tarih giriniz (örneğin: 01.02.2024)',
    'No records found': 'Kayıt bulunamadı',
    Guest: 'Misafir',
    Resident: 'Site Sakini',
    Application: 'Uygulama',
    'Unregistered Plate': 'Kayıtsız Araç',
    Unknown: 'Bilinmeyen',
    Entrance: 'Giriş',
    Exit: 'Çıkış',
    Pedestrian: 'Yaya',
  },
  ru: {
    Records: 'Записи',
    'Search Record': 'Поиск записи',
    'Fullname or Plate Number': 'Полное имя или номерной знак',
    Date: 'Дата',
    'Please enter a valid date (e.g 01.02.2024)':
      'Введите допустимую дату (например, 01.02.2024)',
    'No records found': 'записей не найдено',
    Guest: 'Гость',
    Resident: 'Резидент',
    Application: 'Приложение',
    'Unregistered Plate': 'Незарегистрированный номерной знак',
    Unknown: 'Неизвестный',
    Entrance: 'Вход',
    Exit: 'Выход',
    Pedestrian: 'Пешеход',
    'Set Today': 'Bugüne ayarla',
  },
};

const registry = {
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
    'Show instructions': 'Talimatları göster',
    'Hide instructions': 'Talimatları gizle',
    'No vehicles added': 'Araç eklenmedi',
    'No keys added': 'Anahtar eklenmedi',
    'Set the date as today': 'Tarihi bugün olarak ayarla',
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
    'Show instructions': 'Показать инструкции',
    'Hide instructions': 'Скрыть инструкции',
    'No vehicles added': 'Транспортные средства не добавлены',
    'No keys added': 'Ключи не добавлены',
    'Set the date as today': 'Установите дату на сегодня',
  },
};

const resources = {
  en: {},
  tr: {
    translation: {
      ...common.tr,
      ...error.tr,
      ...validation.tr,
      ...admin.tr,
      ...link.tr,
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
      ...link.ru,
      ...household.ru,
      ...record.ru,
      ...registry.ru,
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
