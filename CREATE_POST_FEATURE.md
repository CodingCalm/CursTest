# 📝 Skapa Inlägg Funktionalitet

## 🎯 Översikt

Denna funktionalitet låter inloggade användare skapa nya inlägg i "Öppet Samtal". Endast autentiserade användare kan se "Skapa inlägg" knappen och komma åt skapa inlägg-sidan.

## 🔐 Autentiseringskrav

- **Inloggning krävs**: Endast inloggade användare kan skapa inlägg
- **Middleware skydd**: `/posts/create` är skyddad av NextAuth middleware
- **Session validering**: Komponenter kontrollerar session-status

## 🚀 Funktioner

### **1. "Skapa inlägg" Knapp**

- **Placering**: Öppet Samtal sidan, bredvid sorteringsknappen
- **Visas endast för**: Inloggade användare
- **Styling**: Blå knapp med hover-effekt
- **WCAG-kompatibel**: Proper aria-label och focus states

### **2. Skapa Inlägg Sida**

- **URL**: `/posts/create`
- **Skydd**: Middleware + komponent-validering
- **Formulär**: Titel och innehåll (obligatoriska)
- **Förhandsvisning**: Automatisk sammanfattning

### **3. Formulärfunktioner**

- **Titel**: Textfält för inläggets titel
- **Innehåll**: Stort textområde för inläggets innehåll
- **Sammanfattning**: Genereras automatiskt från innehållet
- **Validering**: Client-side och server-side validering
- **Loading states**: Visar laddningsindikator under skapande

## 📁 Filstruktur

```
src/
├── app/
│   ├── posts/
│   │   └── create/
│   │       └── page.tsx              # Skapa inlägg sida
│   └── api/
│       └── posts/
│           └── route.ts              # API för att skapa inlägg
├── components/
│   ├── posts/
│   │   ├── CreatePostForm.tsx        # Formulärkomponent
│   │   └── index.ts                  # Exports
│   └── torget/
│       └── Torget.tsx                # Uppdaterad med "Skapa inlägg" knapp
└── middleware.ts                     # Skydd för /posts/create
```

## 🔧 Teknisk Implementation

### **Frontend Komponenter**

#### **Torget.tsx (Uppdaterad)**

```typescript
// Lägger till "Skapa inlägg" knapp för inloggade användare
{session && (
  <Link
    href="/posts/create"
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-opacity-50"
    aria-label="Skapa nytt inlägg"
  >
    Skapa inlägg
  </Link>
)}
```

#### **CreatePostForm.tsx**

```typescript
// Huvudformulärkomponent med:
- Session validering
- Formulärhantering
- API-anrop
- Felhantering
- Loading states
- WCAG-kompatibilitet
```

### **Backend API**

#### **/api/posts (POST)**

```typescript
// API-route som:
- Validerar autentisering
- Validerar input
- Skapar sammanfattning
- Returnerar nytt inlägg
- Hanterar fel
```

### **Middleware**

```typescript
// Skyddar /posts/create med NextAuth
export const config = {
  matcher: ['/posts/create'],
};
```

## 🎨 Användargränssnitt

### **Öppet Samtal Sidan**

```
┌─────────────────────────────────────────────────────────┐
│ Öppet Samtal                    [Skapa inlägg] [Sortera]│
├─────────────────────────────────────────────────────────┤
│ [Inlägg 1]                                            │
│ [Inlägg 2]                                            │
│ [Inlägg 3]                                            │
└─────────────────────────────────────────────────────────┘
```

### **Skapa Inlägg Sida**

```
┌─────────────────────────────────────────────────────────┐
│                    Skapa nytt inlägg                    │
│              Dela dina tankar och idéer                 │
├─────────────────────────────────────────────────────────┤
│ Titel: [________________________]                      │
│                                                         │
│ Innehåll:                                              │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                                                     │ │
│ │ [Stort textområde för inläggets innehåll]          │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Förhandsvisning av sammanfattning:                     │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Automatiskt genererad sammanfattning...]          │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [Avbryt]                                    [Skapa inlägg]│
└─────────────────────────────────────────────────────────┘
```

## 🔄 Användarflöde

### **1. Inloggad användare**

1. Besöker Öppet Samtal sidan
2. Ser "Skapa inlägg" knappen
3. Klickar på knappen

### **2. Skapa inlägg**

1. Fyller i titel och innehåll
2. Ser förhandsvisning av sammanfattning
3. Klickar "Skapa inlägg"

### **3. Efter skapande**

1. Omdirigeras till Öppet Samtal
2. Ser sitt nya inlägg i listan
3. Kan interagera med inlägget

### **4. Ej inloggad användare**

1. Ser inte "Skapa inlägg" knappen
2. Om de försöker besöka `/posts/create` direkt:
   - Middleware blockerar åtkomst
   - Omdirigeras till inloggningssidan

## 🛡️ Säkerhet

### **Autentiseringsskydd**

- **Middleware**: Skyddar `/posts/create` på server-nivå
- **Komponent-validering**: Kontrollerar session i komponenter
- **API-skydd**: Validerar session i API-route

### **Input Validering**

- **Client-side**: Realtidsvalidering i formuläret
- **Server-side**: Validering i API-route
- **Sanitization**: Rensar input från skadlig kod

### **Felhantering**

- **Användarvänliga felmeddelanden**
- **Proper HTTP status codes**
- **Logging av fel**

## 🎯 WCAG-åtkomstbarhet

### **Formuläråtkomstbarhet**

- **Labels**: Alla fält har proper labels
- **Aria-describedby**: Hjälptext kopplad till fält
- **Focus management**: Proper focus states
- **Error handling**: Aria-live för felmeddelanden

### **Knappåtkomstbarhet**

- **Aria-label**: Beskrivande labels
- **Focus-visible**: Synliga focus rings
- **Keyboard navigation**: Fullständig tangentbordsstöd

### **Semantisk HTML**

- **Proper headings**: H1, H2 struktur
- **Form elements**: Semantic form markup
- **Landmarks**: Proper ARIA landmarks

## 🚀 Framtida Förbättringar

### **Planerade Features**

1. **Rich text editor**: Formatering av innehåll
2. **Bilduppladdning**: Bilder i inlägg
3. **Draft saving**: Spara utkast
4. **Preview mode**: Förhandsvisning av inlägg
5. **Categories/tags**: Kategorisering av inlägg

### **Tekniska Förbättringar**

1. **Real-time validation**: Live validering
2. **Auto-save**: Automatisk sparande
3. **Image optimization**: Optimerade bilder
4. **SEO optimization**: Meta tags och struktur

---

**Denna funktionalitet ger inloggade användare möjlighet att bidra till samtalet på ett säkert och användarvänligt sätt! 🎉**
