
# Biblioteca BE — Setup PostgreSQL (da zero, senza Docker)

Questa guida spiega come installare PostgreSQL su Windows e creare **da zero** il database necessario all’app Spring Boot `biblioteca`, usando **DBeaver**.

---

## Prerequisiti

- Windows 10/11
- Java 25
- Maven
- DBeaver (già installato)
- (Da installare) PostgreSQL Server

---

## 1) Installare PostgreSQL Server

1. Scarica PostgreSQL per Windows dal sito ufficiale:
    - https://www.postgresql.org/download/windows/

2. Avvia l’installer e segui i passaggi.
    - **Porta**: lascia `5432`
    - **Password utente `postgres`**: scegli una password e **salvala** (serve per amministrare il DB)
    - **Locale**: lascia `DEFAULT`
    - **Stack Builder**: NON serve, puoi chiudere/cancellare (è opzionale)

3. Verifica che il servizio sia attivo:
    - Premi `Win + R` → scrivi `services.msc`
    - Cerca un servizio tipo `postgresql-x64-XX`
    - Deve essere **Running**

> Se il servizio non è running, avvialo da lì (tasto destro → Start).

---

## 2) Connettersi a PostgreSQL con DBeaver

1. Apri DBeaver
2. Clicca **New Database Connection**
3. Seleziona **PostgreSQL**
4. Inserisci i parametri:

| Campo     | Valore |
|----------|--------|
| Host     | `localhost` |
| Port     | `5432` |
| Database | `postgres` |
| Username | `postgres` |
| Password | (quella impostata durante l’installazione) |

5. Premi **Test Connection** → deve risultare OK.
6. Premi **Finish**

---

## 3) Abilitare “Show all databases” (se non riesci a creare DB)

Se durante la creazione del database DBeaver mostra l’errore:

> Cannot create a database when multi-database mode is disabled.

Allora:

1. Click destro sulla connessione → **Edit Connection**
2. Nella tab **Principale** (o “Main”) spunta:
    - ✅ **Show all databases**
3. Salva
4. Disconnect / Connect

---

## 4) Creare il database `libri_db`

1. Nel Navigator a sinistra espandi la connessione
2. Trova la sezione **Databases**
3. Click destro su **Databases** → **Create → Database**
4. Nome: `libri_db`
5. Owner: `postgres`
6. OK

---

## 5) Creare un utente applicativo (opzionale ma consigliato)

> Se vuoi puoi usare direttamente l’utente `postgres` anche nell’app.  
> Best practice: creare un utente dedicato, es. `libri_user`.

Apri un editor SQL in DBeaver:
- Click destro sulla connessione → **SQL Editor → New SQL Script**

Esegui:

```sql
CREATE USER libri_user WITH PASSWORD 'libri_pass';
GRANT ALL PRIVILEGES ON DATABASE libri_db TO libri_user;

Ora apri un SQL script connesso al database libri_db (selettore database in alto) ed esegui:

GRANT USAGE, CREATE ON SCHEMA public TO libri_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO libri_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO libri_user;