# Your Clean Dashboard

Launcher web statico con accesso Google e dati personali salvati nel Drive dell'utente. Il deploy usa Cloudflare Pages come hosting statico: nessun database o bucket R2.

## Sviluppo locale

1. Installa Node.js e le dipendenze con `npm install`.
2. Crea `.env.local` nella root del progetto e inserisci il Client ID OAuth web:

   ```dotenv
   VITE_GOOGLE_CLIENT_ID=mioid.apps.googleusercontent.com
   ```

3. Avvia `npm run dev` e apri l'URL mostrato da Vite (di solito `http://localhost:5173`). Vite carica `.env.local` all'avvio; riavvialo se cambi il Client ID.

## Google e deploy

- In Google Cloud abilita Google Drive API e configura la schermata di consenso OAuth.
- Crea un OAuth Client ID di tipo applicazione web e autorizza l'origine locale `http://localhost:5173` e l'origine HTTPS scelta per la produzione.
- L'app richiede `openid`, `email`, `profile` e `https://www.googleapis.com/auth/drive.appdata`. La configurazione viene conservata come `your-clean-dashboard.json` nell'area privata dell'app dell'utente (`appDataFolder`).
- Su Cloudflare Pages imposta il comando di build `npm run build` e la directory di output `dist`. Aggiungi `VITE_GOOGLE_CLIENT_ID` nelle variabili di build del progetto Pages.

Il dominio citato finora è `apps.ycd-sofware.it`; controlla che la grafia sia quella desiderata prima di registrarlo come origine OAuth e collegarlo a Pages.

## Common Apps

La sezione “Common Apps” è una raccolta condivisa con la configurazione dell'utente su Drive. Da Impostazioni puoi importarla o esportarla separatamente, senza sostituire app e cartelle personali. L'import accetta un array JSON oppure un oggetto con la proprietà `commonApps`:

```json
{
  "version": 1,
  "commonApps": [
    {
      "name": "Gmail",
      "url": "https://mail.google.com/",
      "icon": "✉",
      "color": "#ea4335"
    }
  ]
}
```

Ogni elemento richiede `name` e un `url` HTTP/HTTPS; `icon` e `color` sono facoltativi. L'esportazione completa del launcher include anche `commonApps`.
