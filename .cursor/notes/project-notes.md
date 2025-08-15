# Projektanteckningar

## ✅ Slutförda uppgifter
- [x] Fixa mobilanpassning
- [x] Nominera ska bevara state true eller false när man går in på post sidan och vice verse
- [x] lägg till rule för oop
- [x] gör så att uppvotes räknas
- [x] Standardisera focus-hantering för alla knappar

## 🎯 Framtida uppgifter
- [ ] Implementera SQL-databas
- [ ] Lägg till användarautentisering
- [ ] Implementera kommentarsystem

## 📋 Kodstandarder

### Focus-hantering för knappar
Alla knappar i projektet ska använda denna standardiserade focus-hantering:

```tsx
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
```

**Fördelar:**
- ✅ Ingen focus-ring vid mus-klick
- ✅ Subtila grå ring vid keyboard-navigering (Tab)
- ✅ Full tillgänglighet för skärmläsare
- ✅ WCAG 2.1 Success Criterion 2.4.7 compliant

**Komponenter som redan använder denna standard:**
- `VoteButton` - Röstningsknappar
- `NominationButton` - Nomineringsknapp
- `Button` (ui) - Standardknapp-komponent
- `ActionButton` (ui) - Åtgärdsknapp

**För framtida knappar:**
1. Använd `Button`-komponenten från `@/components/ui/Button` när möjligt
2. För custom knappar, kopiera focus-klasserna ovan
3. Behåll alltid `aria-label` och `aria-pressed` för tillgänglighet

### Färgschema
- **Grön:** Positiv åtgärd (uppåtröstning, nominering)
- **Röd:** Negativ åtgärd (neråtröstning)
- **Grå:** Neutral/inaktiv
- **Svart:** Primär text och bakgrunder


## 📝 Privata anteckningar

### Todo:
- [x] Fixa mobilanpassning
- [x] Nominera ska bevara state true eller false när man går in på post sidan och vice verse
- [x] lägg till rule för oop
- [x] gör så att uppvotes räknas




### 💡 Idéer

### 🔧 Tekniska anteckningar

### 📚 Resurser


## 🔐 Privat
