# Your Clean Dashboard

Dashboard web statico, distribuibile su Cloudflare Pages. I dati personali (app, cartelle e preferenze) devono risiedere nell'account Google dell'utente; Pages non richiede database, R2 o un server applicativo.

## Architettura prevista

- Pubblicazione dei file statici con Cloudflare Pages.
- Google Identity Services per richiedere l'accesso OAuth nel browser.
- Google Drive API con scope `drive.appdata` per leggere e salvare un singolo file JSON nell'area privata dell'app (`appDataFolder`) del Drive dell'utente.
- Nessun client secret nel frontend: il Client ID OAuth per applicazioni web è pubblico e va limitato per origini autorizzate.
- `localStorage` può contenere solo preferenze locali non sensibili (per esempio il tema); i dati del launcher devono essere caricati da Drive dopo il login.

## Configurazione Google richiesta

1. Crea un progetto in Google Cloud Console, abilita Google Drive API e configura OAuth consent screen.
2. Crea un OAuth Client ID di tipo applicazione web. Aggiungi come origini autorizzate `http://localhost:8000` per sviluppo e l'origine HTTPS di produzione (in futuro `https://apps.ycd-sofware.it`, verificando il nome del dominio).
3. Configura l'app per richiedere gli scope `openid`, `email`, `profile` e `https://www.googleapis.com/auth/drive.appdata`.
4. Imposta il Client ID nell'ambiente statico dell'app. Non inserire client secret nel repository.

Il dominio di produzione indicato finora è `apps.ycd-sofware.it`; prima della pubblicazione va confermata la grafia esatta.

## Stato

Il repository contiene la pagina iniziale del launcher. L'integrazione OAuth e la sincronizzazione Google Drive sono il primo passaggio applicativo da implementare; serviranno il Client ID e le origini autorizzate del progetto Google per poterla verificare end-to-end.
