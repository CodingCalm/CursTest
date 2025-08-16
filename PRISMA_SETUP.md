# 🗄️ Prisma & PostgreSQL Setup Guide

## 📋 Översikt

Detta projekt använder Prisma ORM med PostgreSQL för databasen. Konfigurationen är förberedd för att enkelt växla mellan mock data och riktig databas.

## 🚀 Snabbstart

### 1. Installera PostgreSQL

**Windows:**

- Ladda ner från [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)
- Installera med standardinställningar
- Notera lösenordet för `postgres` användaren

**macOS:**

```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu):**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Skapa databas

```bash
# Logga in som postgres användare
sudo -u postgres psql

# Skapa databas och användare
CREATE DATABASE curs_test;
CREATE USER curs_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE curs_test TO curs_user;
\q
```

### 3. Konfigurera miljövariabler

Skapa `.env.local` fil i projektets rot:

```env
# Database
DATABASE_URL="postgresql://curs_user:your_password@localhost:5432/curs_test"

# NextAuth
NEXTAUTH_SECRET=001d861c33f9d79a558db7035cada2f8e672bccb9304c97314ac332052a8019f
NEXTAUTH_URL=http://localhost:3000

# Service Mode (mock eller prisma)
SERVICE_MODE=prisma
```

### 4. Generera Prisma Client

```bash
npm run db:generate
```

### 5. Skapa databastabeller

```bash
npm run db:push
```

### 6. Seeda databasen med testdata

```bash
npm run db:seed
```

## 🔧 Kommandon

### Databas-hantering

```bash
# Generera Prisma Client
npm run db:generate

# Push schema till databas
npm run db:push

# Seeda databasen
npm run db:seed

# Öppna Prisma Studio (GUI)
npm run db:studio
```

### Utveckling

```bash
# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build
```

## 🏗️ Databasschema

### Tabeller

#### `users`

- `id` - Unikt ID (CUID)
- `email` - E-postadress (unik)
- `name` - Användarnamn
- `password` - Hashat lösenord
- `role` - Användarroll (USER/ADMIN)
- `createdAt` - Skapandedatum
- `updatedAt` - Uppdateringsdatum

#### `posts`

- `id` - Unikt ID (auto-increment)
- `title` - Inläggstitel
- `content` - Inläggsinnehåll
- `summary` - Sammanfattning
- `authorId` - Författarens ID (foreign key)
- `upvotes` - Antal uppröstningar
- `comments` - Antal kommentarer
- `nominations` - Antal nomineringar
- `createdAt` - Skapandedatum
- `updatedAt` - Uppdateringsdatum

#### `votes`

- `id` - Unikt ID (auto-increment)
- `postId` - Inläggs-ID (foreign key)
- `userId` - Användar-ID (foreign key)
- `direction` - Röstriktning (UP/DOWN)
- `createdAt` - Skapandedatum

#### `comments`

- `id` - Unikt ID (auto-increment)
- `content` - Kommentarstext
- `postId` - Inläggs-ID (foreign key)
- `userId` - Användar-ID (foreign key)
- `createdAt` - Skapandedatum
- `updatedAt` - Uppdateringsdatum

#### `nominations`

- `id` - Unikt ID (auto-increment)
- `postId` - Inläggs-ID (foreign key)
- `userId` - Användar-ID (foreign key)
- `createdAt` - Skapandedatum

#### `forslag`

- `id` - Unikt ID (auto-increment)
- `title` - Förslagstitel
- `introduction` - Introduktion
- `summary` - Sammanfattning
- `background` - Bakgrund
- `arguments` - Argument (PostgreSQL array)
- `conclusion` - Slutsats
- `originalPostId` - Originalinläggs-ID (foreign key)
- `createdAt` - Skapandedatum
- `updatedAt` - Uppdateringsdatum

## 🔄 Växla mellan Mock och Database

### Använd Mock Data (standard)

```env
SERVICE_MODE=mock
```

### Använd PostgreSQL Database

```env
SERVICE_MODE=prisma
```

## 🧪 Testdata

Seed-scriptet skapar följande testdata:

### Användare

- **test@example.com** / password (USER)
- **admin@example.com** / password (ADMIN)

### Inlägg

- 3 exempel-inlägg med olika ämnen
- 1 förslag kopplat till första inlägget

## 🔍 Felsökning

### Vanliga problem

#### 1. "Connection refused"

- Kontrollera att PostgreSQL körs
- Verifiera DATABASE_URL i .env.local
- Kontrollera användarnamn/lösenord

#### 2. "Table does not exist"

- Kör `npm run db:push` för att skapa tabeller
- Kontrollera att schema.prisma är korrekt

#### 3. "Prisma Client not generated"

- Kör `npm run db:generate`
- Starta om utvecklingsservern

#### 4. "Permission denied"

- Kontrollera databasanvändarens rättigheter
- Verifiera att användaren har CREATE, INSERT, UPDATE, DELETE rättigheter

### Loggar

```bash
# Visa Prisma loggar
DEBUG=prisma:* npm run dev

# Visa databasanslutning
DEBUG=prisma:client npm run dev
```

## 📊 Prisma Studio

Öppna Prisma Studio för att hantera data via GUI:

```bash
npm run db:studio
```

Öppna http://localhost:5555 i webbläsaren.

## 🔐 Säkerhet

### Produktionsmiljö

- Använd starka lösenord för databasen
- Begränsa databasåtkomst till applikationsservern
- Använd SSL-anslutning för databasen
- Rotera lösenord regelbundet

### Miljövariabler

- Lägg aldrig till .env.local i git
- Använd olika databaser för utveckling och produktion
- Använd secrets management i produktion

## 📈 Prestanda

### Indexering

Prisma skapar automatiskt index för:

- Primary keys
- Foreign keys
- Unique constraints

### Optimering

- Använd `select` för att begränsa fält
- Använd `include` för att ladda relationer
- Implementera pagination för stora datasets

## 🔄 Migrationer

### Skapa migration

```bash
npx prisma migrate dev --name migration_name
```

### Applicera migrationer

```bash
npx prisma migrate deploy
```

### Återställ databas

```bash
npx prisma migrate reset
```

---

**Nu är du redo att använda PostgreSQL med Prisma! 🎉**
