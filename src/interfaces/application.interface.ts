export type ApplicationId = 'mobile-app' | 'web-frontend' | 'web-backend';

export interface Application {
  id: ApplicationId;
  name: string;
  apiKey: string;
  active: boolean;
}
