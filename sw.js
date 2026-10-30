// Service worker mínimo: permite instalar o app. Sempre busca a versão nova da rede.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
