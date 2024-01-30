interface Rules {
  [key: string]: string | undefined;
  tr?: string;
  en?: string;
  ru?: string;
}

export interface Instructions {
  mobileAppEnabled: boolean;
  mobileAppUrl: string;
  mobileAppPort: string;
  telegramEnabled: boolean;
  telegramBotName: string;
  rules: Rules;
}
