import { Application } from './interfaces/application.interface.js';

export const applications: Application[] = [
  {
    id: 'mobile-app',
    name: 'Mobile App Público',
    apiKey: process.env.MOBILE_APP_KEY ?? '',
    active: true,
  },
  {
    id: 'web-frontend',
    name: 'Website Front (direto)',
    apiKey: process.env.WEB_FRONTEND_KEY ?? '',
    active: true,
  },
  {
    id: 'web-backend',
    name: 'Website Backend',
    apiKey: process.env.WEB_BACKEND_KEY ?? '',
    active: true,
  },
];

export function findApplicationByKey(
  key: string | undefined,
): Application | null {
  if (!key) return null;
  return (
    applications.find(
      (app) => app.active && app.apiKey && app.apiKey === key,
    ) ?? null
  );
}
