# Autentisering med NextAuth.js

## Setup

1. **Installera paket:**
   ```bash
   npm install next-auth bcryptjs
   npm install @types/bcryptjs --save-dev
   ```

2. **Skapa miljövariabler:**
   Skapa en `.env.local` fil i projektets rot med följande innehåll:
   ```
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Generera en säker secret:**
   ```bash
   openssl rand -base64 32
   ```

## Test-konton

För att testa autentiseringen, använd följande konton:

- **Vanlig användare:** test@example.com / password
- **Admin:** admin@example.com / password

## Funktioner

### Implementerade funktioner:
- ✅ Email/password inloggning
- ✅ Session management
- ✅ Skyddad routing
- ✅ Användarmeny i header
- ✅ Logga ut funktionalitet
- ✅ Rollbaserad åtkomst (user/admin)

### Kommande funktioner:
- 🔄 Användarregistrering (API endpoint)
- 🔄 Lösenordsåterställning
- 🔄 Email verifiering
- 🔄 Social login (Google, GitHub)

## Databas-integration

När du implementerar en databas, ersätt mock-data i `src/data/mock-users.ts` med riktiga databas-anrop.

### Exempel på databas-schema:
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Användning

### Skydda sidor:
```tsx
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedPage() {
  const { user, isLoading } = useAuth(true); // true = kräver autentisering
  
  if (isLoading) return <div>Laddar...</div>;
  
  return <div>Välkommen {user?.name}!</div>;
}
```

### Kontrollera användarroll:
```tsx
import { useAuth } from '@/hooks/useAuth';

export default function AdminPage() {
  const { user } = useAuth(true);
  
  if (user?.role !== 'admin') {
    return <div>Åtkomst nekad</div>;
  }
  
  return <div>Admin-panel</div>;
}
```

## Säkerhet

- Lösenord hashas med bcrypt
- JWT-tokens för session management
- CSRF-skydd inbyggt i NextAuth
- Säker cookie-hantering
