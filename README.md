# Your Clean Dashboard

Launcher web statico con accesso Google e dati personali salvati nell'area privata dell'app (`appDataFolder`) su Drive. Il deploy usa Cloudflare Pages come hosting statico: nessun database o bucket R2.

## Sviluppo locale

1. Installa le dipendenze con `npm install`.
2. Crea `.env.local` nella root del progetto:

   ```dotenv
   VITE_GOOGLE_CLIENT_ID=mioid.apps.googleusercontent.com
   ```

3. Avvia `npm run dev`. Vite legge `.env.local` all'avvio; riavvialo se modifichi il Client ID.

`.env.local` è escluso da Git. Il Client ID OAuth web è pubblico; non inserire un client secret nel frontend.

## Google e Cloudflare Pages

- Abilita Google Drive API e configura la schermata di consenso OAuth.
- Crea un OAuth Client ID web e autorizza `http://localhost:5173` e l'origine HTTPS di produzione.
- L'app richiede `openid`, `email`, `profile` e `https://www.googleapis.com/auth/drive.appdata`. App e cartelle personali vengono salvate come `your-clean-dashboard.json` nell'area nascosta dell'app su Drive.
- Il token OAuth a breve durata resta nella `sessionStorage` della scheda per ripristinare la sessione dopo un aggiornamento; il pulsante Esci lo rimuove.
- Su Cloudflare Pages imposta build command `npm run build`, output `dist` e variabile di build `VITE_GOOGLE_CLIENT_ID`.

## Common Apps

La raccolta è fissa e viene caricata da [`common-apps.json`](common-apps.json) nella root del progetto. Vite la copia automaticamente in `dist` durante la build. Per aggiornarla, modifica questo file e distribuisci una nuova build. L'interfaccia non consente agli utenti di importare o esportare la raccolta; le app aggiunte alla Dashboard personale possono essere modificate lì.

Ogni elemento richiede `name` e un URL HTTP/HTTPS; `icon` può essere un'emoji oppure un URL a un'immagine, mentre `color` è facoltativo:

```json
{
  "version": 1,
  "commonApps": [
    {
      "name": "Gmail",
      "url": "https://mail.google.com/",
      "icon": "https://example.com/gmail.png",
      "color": "#ea4335"
    }
  ]
}
```

L'icona della scheda è il logo statico `logo.svg` e non è modificabile dalle impostazioni.

## Privacy, cookie e sviluppo

Il progetto è stato realizzato con un approccio di **vibe coding**: codice generato e iterato con assistenti AI, poi integrato nel progetto. L'app non usa un database gestito dagli sviluppatori e non invia i dati della dashboard a un loro server. Quando l'utente accede, le app, le cartelle e i conteggi di aperture sono salvati direttamente nell'area privata dell'app (`appDataFolder`) del suo Google Drive. L'app registra quindi i conteggi d'uso richiesti, ma questi restano nell'account Google del cliente. Il token OAuth è conservato nella `sessionStorage` della scheda; il tema è conservato nella memoria locale del browser.

L'interfaccia mostra un'informativa cookie e, quando viene confermata, salva il cookie tecnico `ycd_cookie_notice` per un anno. Non vengono usati cookie analitici o pubblicitari dall'app. L'accesso e le chiamate a Drive passano tramite i servizi Google e sono soggetti alle tecnologie e alle informative di Google.
