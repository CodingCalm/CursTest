# Mock Data Directory

Denna mapp innehåller all mock-data och mock-services som backup om databasen skulle vara otillgänglig.

## Innehåll

### Mock Data

- `mock-posts.ts` - Mock data för posts/inlägg
- `mock-forslag.ts` - Mock data för förslag/propositions
- `mock-users.ts` - Mock data för användare

### Mock Services

- `mock-post-service.ts` - Mock service för posts
- `mock-forslag-service.ts` - Mock service för förslag

## Användning

**VIKTIGT:** Dessa filer används INTE i produktion. De finns endast som backup.

För att använda mock-data i nödfall:

1. Uppdatera `src/services/index.ts` för att importera från `../mockdata/`
2. Ändra service-initialiseringen till att använda mock-services
3. Kom ihåg att byta tillbaka till databas-services när problemet är löst

## Exempel på nödanvändning

```typescript
// I src/services/index.ts
import { MockPostService } from '../mockdata/mock-post-service';
import { MockForslagService } from '../mockdata/mock-forslag-service';

// Använd mock-services istället för Prisma
const postService: PostService = new MockPostService();
const forslagService: ForslagService = new MockForslagService();
```

## Underhåll

- Uppdatera mock-data regelbundet för att matcha databasens struktur
- Se till att alla required fields finns med
- Testa mock-services för att säkerställa att de fungerar korrekt
