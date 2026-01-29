import { Application } from './interfaces/application.interface.js';

function getApplications(): Application[] {
  return [
    {
      id: 'mobile-app',
      name: 'Mobile App Público',
      apiKey: process.env.MOBILE_APP_KEY ?? '',
      secret: process.env.MOBILE_APP_SECRET ?? '',
      active: true,
    },
    {
      id: 'web-frontend',
      name: 'Website Front (direto)',
      apiKey: process.env.WEB_FRONTEND_KEY ?? '',
      secret: process.env.WEB_FRONTEND_SECRET ?? '',
      active: true,
    },
    {
      id: 'web-backend',
      name: 'Website Backend',
      apiKey: process.env.WEB_BACKEND_KEY ?? '',
      secret: process.env.WEB_BACKEND_SECRET ?? '',
      active: true,
    },
  ];
}

export function findApplicationByKey(
  key: string | undefined,
): Application | undefined | null {
  if (!key) return null;

  const applications = getApplications();

  const res = applications.find(
    (app) => app.active && app.apiKey && app.apiKey === key,
  );

  return res;
}
