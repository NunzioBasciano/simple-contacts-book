# Simple Contacts Book

Simple Contacts Book è un'applicazione web sviluppata con Next.js e TypeScript che consente agli utenti di gestire una rubrica di contatti. È stata progettata per essere semplice e intuitiva, con funzionalità di visualizzazione, aggiunta, modifica e cancellazione di contatti.

## Caratteristiche

- **Visualizzazione dei Contatti**: Un elenco interattivo dei contatti salvati, con la possibilità di vedere i dettagli di ogni contatto.
- **Aggiunta di un Nuovo Contatto**: Un modulo per aggiungere contatti con informazioni come nome, cognome, email e numero di telefono.
- **Modifica e Aggiornamento**: Modifica i dettagli di un contatto esistente in modo semplice e veloce.
- **Cancellazione Sicura**: Possibilità di eliminare contatti con una conferma tramite un modal per evitare cancellazioni accidentali.
- **Aggiunta a preferiti**: Gestione dei contatti preferiti, con la possibilità di aggiungere o rimuovere un contatto dai preferiti.
- **Ricerca e filtri**: Filtra i contatti per nome, cognome o email e ordina in ordine alfabetico o cronologico.
- **Responsive Design**: L'app è completamente responsiva e si adatta a qualsiasi dispositivo, desktop o mobile.

## Demo

Puoi provare l'applicazione live su Vercel:
[Simple Contacts Book - Demo](https://simple-contacts-book.vercel.app/)

## Tecnologie Utilizzate

Questo progetto è costruito utilizzando tecnologie moderne per garantire prestazioni elevate e una facile manutenzione:

- **Next.js**: Framework React per lo sviluppo di applicazioni web, con supporto per il rendering lato server (SSR) e la generazione statica (SSG).
- **TypeScript**: Un superset di JavaScript che aggiunge la tipizzazione statica, migliorando la sicurezza e la manutenzione del codice.
- **MongoDB**: Database NoSQL utilizzato per memorizzare e gestire i contatti.
- **Tailwind CSS**: Framework CSS per un design rapido e modulare, con supporto per la creazione di interfacce utente reattive e moderne.
- **Vercel**: Piattaforma di hosting per il deployment e la gestione delle versioni di produzione.

## Struttura del Progetto

- **components/**: Contiene i componenti React riutilizzabili, come i pulsanti, le card dei contatti, e le modali di conferma.
- **pages/**: Contiene le pagine dell'applicazione, inclusi i percorsi per la visualizzazione dei contatti, l'aggiunta, la modifica e la cancellazione.
- **(models)/**: Contiene i modelli TypeScript per strutturare i dati, come IContact per i contatti.
- **api/**: Directory per le API Next.js per gestire le operazioni CRUD sui contatti.
- **public**: Contiene le immagini, le icone e altri asset pubblici.

## API Endpoints

- **GET** /api/contacts: ottiene tutti i contatti.
- **GET** /api/contacts/:id: ottiene il dettaglio di un contatto.
- **POST** /api/contacts: crea un nuovo contatto.
- **PUT** /api/contacts/:id: aggiorna un contatto esistente.
- **DELETE** /api/contacts/:id: elimina un contatto.

## Contributi

I contributi sono benvenuti! Sentiti libero di aprire un'issue o una pull request per suggerimenti, bug fix, o nuove funzionalità.

- Fai un fork del repository.
- Crea un nuovo branch (git checkout -b feature-nome-caratteristica).
- Fai le modifiche necessarie.
- Esegui i test per assicurarti che tutto funzioni correttamente.
- Fai un commit con i tuoi cambiamenti (git commit -am 'Aggiunta funzionalità X').
- Pusha il branch e apri una pull request.

## Licenza

Questo progetto è distribuito sotto la licenza MIT. Consulta il file LICENSE per ulteriori dettagli.
