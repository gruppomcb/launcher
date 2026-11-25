# LAYO CLEAN (www.layoclean.it)

Launch Your Clean Dashboard

Launcher web statico con uso locale facoltativo e sincronizzazione Google Drive opzionale. Il deploy usa Cloudflare Pages come hosting statico all’indirizzo stabile [apps.layoclean.it](https://apps.layoclean.it/): nessun database o bucket R2.

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
- La dashboard funziona senza autenticazione e salva app, cartelle e conteggi nelle memorie locali del browser. Le configurazioni locali non sono condivise con altri dispositivi; esportazione/importazione JSON resta disponibile.
- Il pulsante «Sincronizza con Google» è facoltativo e richiede gli scope `openid`, `email`, `profile` e `https://www.googleapis.com/auth/drive.appdata`. App e cartelle vengono salvate come `your-clean-dashboard.json` nell'area app privata su Drive.
- Il token OAuth a breve durata resta nella `sessionStorage` della scheda. L'app prova a ripristinare la sincronizzazione silenziosamente quando il browser e Google lo consentono; in caso contrario la dashboard locale continua a funzionare e l'utente può riconnettere Google manualmente.
- Su Cloudflare Pages imposta build command `npm run build`, output `dist` e variabile di build `VITE_GOOGLE_CLIENT_ID`.

## Common Apps

La raccolta predefinita viene caricata da [`common-apps.json`](common-apps.json) nella root del progetto. Vite la copia automaticamente in `dist`. Le app possono essere organizzate in cartelle e sottocartelle annidando `folders`; ogni cartella può avere `name`, `icon`, `color`, `apps` e altre `folders`. Le app al livello principale restano in `commonApps`, così il formato precedente continua a funzionare. Le cartelle predefinite sono definite dal progetto e appaiono come albero accanto al contenuto selezionato; lo stesso schema ad albero è disponibile nella dashboard. Aggiungendo una Common App alla dashboard, viene ricreato anche il percorso di cartelle corrispondente. L’utente può poi spostare app e cartelle secondo le proprie preferenze.

Ogni app richiede `name` e un URL HTTP/HTTPS. `icon` può essere un'emoji o un URL a un'immagine; `color` è facoltativo. Esempio:

```json
{
  "version": 2,
  "commonApps": [
    { "name": "Notion", "url": "https://notion.so/", "icon": "N", "color": "#111827" }
  ],
  "folders": [
    {
      "name": "Lavoro",
      "icon": "💼",
      "color": "#176b5b",
      "apps": [
        { "name": "Slack", "url": "https://slack.com/", "icon": "S" }
      ],
      "folders": [
        {
          "name": "Documenti",
          "apps": [
            { "name": "Google Docs", "url": "https://docs.google.com/", "icon": "D" }
          ]
        }
      ]
    }
  ]
}
```
## Privacy, cookie e sviluppo

Il progetto è stato realizzato con un approccio di **vibe coding**: codice generato e iterato con assistenti AI, poi integrato nel progetto. L'app non usa un database gestito dagli sviluppatori e non invia i dati della dashboard a un loro server. Senza sincronizzazione, app, cartelle e conteggi di aperture restano nel browser; con la sincronizzazione attiva, una copia viene salvata nell'area privata dell'app (`appDataFolder`) su Google Drive. Il token OAuth è conservato nella `sessionStorage` della scheda; il tema è conservato nella memoria locale del browser.

L'interfaccia mostra un'informativa cookie e, quando viene confermata, salva il cookie tecnico `ycd_cookie_notice` per un anno. Non vengono usati cookie analitici o pubblicitari dall'app. Le funzioni Google sono facoltative e, quando attivate, le chiamate a Drive passano tramite i servizi Google e sono soggette alle tecnologie e alle informative di Google.

## Versione e release note

La versione dell'app è definita in `package.json`. La build pubblica il valore anche all'endpoint testuale `/version`; la pagina `release/index.html` è raggiungibile come `/release` e riepiloga le funzionalità della versione corrente. In alto a destra, il link della versione apre le note in una nuova scheda.

Il badge `PUBLIC PREVIEW` appare sui domini `*.pages.dev`. Alla prima visita del browser viene mostrato un avviso di anteprima, ricordato con una preferenza locale. Cliccando il badge si possono aprire le release note o la versione stabile, disponibile su [apps.layoclean.it](https://apps.layoclean.it/). Il dominio stabile può essere sovrascritto con `VITE_STABLE_APP_URL` nelle variabili Cloudflare Pages.

Le informative pubbliche sono disponibili su `/privacy` e `/terms` e sono collegate dalle impostazioni e dalle release note. Prima della pubblicazione definitiva occorre completare nelle informative il nome e cognome e l'indirizzo postale del titolare, oltre a confermare basi giuridiche e tempi di conservazione applicabili.
