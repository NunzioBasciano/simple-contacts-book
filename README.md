# Simple Contacts Book

Simple Contacts Book è un'applicazione web sviluppata con Next.js e TypeScript che consente agli utenti di gestire una rubrica di contatti. È stata progettata per essere semplice e intuitiva, con funzionalità di visualizzazione, aggiunta, modifica e cancellazione di contatti.

## Caratteristiche

- **Visualizzazione dei Contatti**: visualizza un elenco di contatti salvati.
- **Aggiunta di un Nuovo Contatto**: consente agli utenti di aggiungere contatti con informazioni dettagliate.
- **Modifica e Cancellazione**: possibilità di aggiornare o eliminare contatti esistenti.
- **Modal di Conferma**: mostra un messaggio di conferma prima della cancellazione di un contatto.

## Demo

Puoi provare l'applicazione live su Vercel:
[Simple Contacts Book - Demo](https://simple-contacts-book.vercel.app/)

## Tecnologie Utilizzate

- **Next.js**: framework React per l'applicazione lato server e client.
- **TypeScript**: linguaggio di programmazione utilizzato per una tipizzazione rigorosa.
- **MongoDB**: database per la memorizzazione delle informazioni sui contatti.
- **Tailwind CSS**: utilizzato per una gestione rapida e modulare degli stili.
- **Vercel**: piattaforma di hosting per il deployment dell'applicazione.

## Struttura del Progetto

- **components/**: contiene i componenti React dell'app, inclusi i pulsanti e le modali.
- **pages/**: include le pagine Next.js per le route dell'app.
- **(models)/**: contiene i modelli TypeScript per i dati, come IContact.
- **api/**: directory per le route API Next.js, per operazioni CRUD sui contatti.

## API Endpoints

- **GET** /api/contacts: ottiene tutti i contatti.
- **POST** /api/contacts: crea un nuovo contatto.
- **PUT** /api/contacts/: aggiorna un contatto esistente.
- **DELETE** /api/contacts/: elimina un contatto.

## Contributi

I contributi sono benvenuti! Sentiti libero di aprire un'issue o una pull request per suggerimenti, bug fix, o nuove funzionalità.

## Licenza

Questo progetto è distribuito sotto la licenza MIT. Consulta il file LICENSE per ulteriori dettagli.
