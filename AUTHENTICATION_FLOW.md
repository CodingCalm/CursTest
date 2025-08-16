# 🔐 NextAuth.js Autentiseringsflöde

## 📊 Diagram Struktur

### **1. Användarflöde (User Flow)**
```
[Användare] → [Logga in] → [Email/Password] → [NextAuth] → [Databas] → [Session] → [Skyddad Sida]
```

### **2. Teknisk Arkitektur**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   NextAuth.js   │    │   Backend       │
│   (React)       │    │   (API Route)   │    │   (Mock Data)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Sign In Form       │                       │
         │──────────────────────▶│                       │
         │                       │ 2. Validate Credentials│
         │                       │──────────────────────▶│
         │                       │                       │ 3. Check User
         │                       │                       │    Database
         │                       │ 4. User Data          │
         │                       │◀──────────────────────│
         │ 5. JWT Token          │                       │
         │◀──────────────────────│                       │
         │ 6. Session Cookie     │                       │
         │◀──────────────────────│                       │
```

## 🔄 Detaljerat Flöde

### **Steg 1: Användare öppnar inloggningssidan**
- **URL**: `/auth/signin`
- **Komponent**: `SignInForm.tsx`
- **Funktion**: Visar inloggningsformulär

### **Steg 2: Användare fyller i credentials**
- **Email**: `test@example.com`
- **Password**: `password`
- **Validering**: Client-side validering

### **Steg 3: Formulär skickas**
- **Metod**: `signIn('credentials', { email, password })`
- **API Route**: `/api/auth/callback/credentials`
- **Handler**: NextAuth.js Credentials Provider

### **Steg 4: NextAuth.js bearbetar request**
```typescript
// src/app/api/auth/[...nextauth]/route.ts
async authorize(credentials) {
  // 1. Validera input
  if (!credentials?.email || !credentials?.password) {
    return null;
  }
  
  // 2. Anropa AuthenticationService
  const result = await authService.authenticateUser({
    email: credentials.email,
    password: credentials.password
  });
  
  // 3. Returnera användardata eller null
  return result.success ? result.user : null;
}
```

### **Steg 5: AuthenticationService verifierar**
```typescript
// src/services/auth/AuthenticationService.ts
public async authenticateUser(credentials: Credentials) {
  // 1. Hitta användare i mock data
  const user = findUserByEmail(credentials.email);
  
  // 2. Verifiera lösenord med bcrypt
  const isValid = await verifyPassword(credentials.password, user.password);
  
  // 3. Returnera resultat
  return {
    success: isValid,
    user: isValid ? user : undefined
  };
}
```

### **Steg 6: Mock Data Verifiering**
```typescript
// src/data/mock-users.ts
export const mockUsers = [
  {
    id: '1',
    email: 'test@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    name: 'Test User',
    role: 'user'
  }
];
```

### **Steg 7: JWT Token Skapas**
```typescript
// NextAuth JWT Callback
async jwt({ token, user }) {
  if (user) {
    token.role = user.role;
    token.id = user.id;
  }
  return token;
}
```

### **Steg 8: Session Skapas**
```typescript
// NextAuth Session Callback
async session({ session, token }) {
  if (token) {
    session.user.id = token.id;
    session.user.role = token.role;
  }
  return session;
}
```

### **Steg 9: Användare omdirigeras**
- **Success**: Omdirigeras till `/` (startsidan)
- **Error**: Stannar på `/auth/signin` med felmeddelande

## 🔧 Komponenter i Flödet

### **Frontend Komponenter**
```
┌─────────────────────────────────────────────────────────┐
│                    SignInForm.tsx                       │
├─────────────────────────────────────────────────────────┤
│ • Email input field                                     │
│ • Password input field                                  │
│ • Submit button                                         │
│ • Error handling                                        │
│ • Loading states                                        │
└─────────────────────────────────────────────────────────┘
```

### **Backend Services**
```
┌─────────────────────────────────────────────────────────┐
│                AuthenticationService.ts                 │
├─────────────────────────────────────────────────────────┤
│ • authenticateUser()                                    │
│ • validateCredentials()                                 │
│ • sanitizeInput()                                       │
│ • createErrorMessage()                                  │
└─────────────────────────────────────────────────────────┘
```

### **Data Layer**
```
┌─────────────────────────────────────────────────────────┐
│                   mock-users.ts                         │
├─────────────────────────────────────────────────────────┤
│ • findUserByEmail()                                     │
│ • findUserById()                                        │
│ • verifyPassword()                                      │
│ • hashPassword()                                        │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Säkerhetsfunktioner

### **1. Lösenordshantering**
- **Hashing**: bcrypt med salt
- **Verifiering**: Säker jämförelse
- **Validering**: Styrkekrav

### **2. Session Management**
- **JWT Tokens**: Säker token-baserad autentisering
- **Cookies**: HttpOnly, Secure, SameSite
- **Expiration**: Automatisk utgång

### **3. Input Validering**
- **Sanitization**: XSS-skydd
- **Validation**: Email-format, lösenordskrav
- **Error Handling**: Säker felhantering

## 📱 Användargränssnitt

### **Inloggningssidan**
```
┌─────────────────────────────────────────────────────────┐
│                    LOGGA IN                             │
├─────────────────────────────────────────────────────────┤
│ Email: [________________]                               │
│ Lösenord: [________________]                            │
│                                                         │
│ [        LOGGA IN        ]                              │
│                                                         │
│ Test-konton:                                            │
│ • Vanlig användare: test@example.com / password        │
│ • Admin: admin@example.com / password                   │
└─────────────────────────────────────────────────────────┘
```

### **Användarmenyn (efter inloggning)**
```
┌─────────────────────────────────────────────────────────┐
│ [👤] Test User ▼                                        │
├─────────────────────────────────────────────────────────┤
│ Test User                                               │
│ test@example.com                                        │
│ Roll: Användare                                         │
│                                                         │
│ [Logga ut]                                              │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Test-konton

### **Vanlig Användare**
- **Email**: `test@example.com`
- **Lösenord**: `password`
- **Roll**: `user`

### **Administratör**
- **Email**: `admin@example.com`
- **Lösenord**: `password`
- **Roll**: `admin`

## 🔄 Logout Flöde

### **Steg 1: Användare klickar "Logga ut"**
- **Komponent**: `UserMenu.tsx`
- **Funktion**: `signOut()`

### **Steg 2: NextAuth.js rensar session**
- **Rensar JWT token**
- **Rensar session cookie**
- **Loggar ut event**

### **Steg 3: Omdirigering**
- **URL**: `/` (startsidan)
- **Status**: Ej inloggad

## 📊 Prestandaoptimeringar

### **1. Caching**
- **Session cache**: 5 minuter
- **User data cache**: Per request
- **JWT cache**: In-memory

### **2. Lazy Loading**
- **Auth components**: Laddas endast vid behov
- **Protected routes**: Dynamisk import

### **3. Error Handling**
- **Graceful degradation**: Fungerar utan auth
- **User-friendly errors**: Tydliga felmeddelanden

---

**Detta flöde säkerställer säker, snabb och användarvänlig autentisering! 🔐**
