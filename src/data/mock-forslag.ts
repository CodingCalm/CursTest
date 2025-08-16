export interface Forslag {
  id: number;
  title: string;
  introduction: string;
  summary: string;
  background: string;
  arguments: string[];
  conclusion: string;
  originalPostId: number;
  created_at?: string;
  updated_at?: string;
}

export const mockForslagData: Forslag[] = [
  {
    id: 1,
    title: "Förbättra kollektivtrafiken i Stockholm",
    introduction: "Hej! Jag heter Anna Andersson och bor på Storgatan 15, 12345 Stockholm. Som daglig pendlare i Stockholm upplever jag varje dag hur kollektivtrafiken sviker oss. Igår var det kaos på röda linjen i över en timme och idag var bussen 20 minuter försenad. Detta påverkar inte bara mig utan hundratusentals andra pendlare som försöker ta sig till jobb, skola eller andra viktiga ärenden.",
    summary: "Ett förslag för att modernisera Stockholms kollektivtrafik genom upprustning av signaler, ökad frekvens under rusningstid och bättre integration mellan transportslag.",
    background: "Stockholm är Sveriges huvudstad och en av Europas snabbast växande städer. Trots detta har kollektivtrafiken inte hängt med i utvecklingen. Medan staden växer och fler människor väljer att bo här, blir kollektivtrafiken alltmer opålitlig. Detta skapar frustration, stress och gör det svårt att planera sin vardag. En fungerande kollektivtrafik är avgörande för en hållbar stad och för att Stockholm ska vara en attraktiv plats att bo och arbeta på.",
    arguments: [
      "Varje dag upplever tusentals pendlare förseningar och inställda avgångar som påverkar deras livskvalitet och produktivitet. Detta skapar stress och frustration för människor som försöker ta sig till jobb, skola eller andra viktiga ärenden.",
      "En förbättrad kollektivtrafik skulle minska bilberoendet och bidra till en mer hållbar stad. Fler människor skulle välja kollektivtrafik om den var pålitlig och effektiv.",
      "Stockholm konkurrerar med andra europeiska städer om talang och investeringar. En modern och effektiv kollektivtrafik är avgörande för att locka företag och människor till staden.",
      "De nuvarande signalerna och spåren är föråldrade och behöver moderniseras. Detta är grundorsaken till många av förseningarna och inställda avgångarna.",
      "Under rusningstid är frekvensen för låg för att hantera antalet resenärer. Detta skapar överfulla vagnar och bussar som gör resan obekväm och stressig.",
      "Integrationen mellan olika transportslag (tunnelbana, buss, pendeltåg) fungerar inte optimalt. Resenärer förlorar tid på övergångar och informationen är ofta otydlig."
    ],
    conclusion: "Jag föreslår att Stockholms läns landsting och regeringen tillsammans genomför en omfattande upprustning av kollektivtrafiken i Stockholm. Detta bör inkludera modernisering av signaler och spår, ökad frekvens under rusningstid, och bättre integration mellan olika transportslag. Vi behöver också investera i elbussar för att minska utsläppen och göra staden mer hållbar. Genom att investera i kollektivtrafiken skapar vi en mer attraktiv och hållbar stad som gynnar alla som bor och arbeta här. Låt oss göra Stockholm till en föregångare inom modern kollektivtrafik!",
    originalPostId: 1,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Digitalisera sjukvårdens patientjournaler",
    introduction: "Hej! Jag heter Erik Eriksson och bor på Sjukhusgatan 8, 54321 Göteborg. Förra veckan behövde min mormor gå till läkaren och det var helt otroligt hur mycket pappersarbete som fortfarande behöver göras. Hon fick fylla i samma formulär tre gånger på olika ställen och ingen kunde se hennes tidigare journaler. Detta är 2024 och vi har fortfarande inte digitaliserat sjukvården ordentligt.",
    summary: "Ett förslag för att införa ett nationellt digitalt system för patientjournaler som förbättrar patientsäkerhet och minskar medicinfel.",
    background: "Svensk sjukvård är av hög kvalitet men lider av omfattande pappersarbete och bristande informationsdelning mellan olika vårdgivare. Patienter får ofta fylla i samma formulär flera gånger och vårdpersonal kan inte se tidigare journaler från andra vårdgivare. Detta ökar risken för medicinfel, minskar effektiviteten i vården och skapar frustration för både patienter och vårdpersonal. I en tid när digitalisering är standard i de flesta andra branscher, ligger sjukvården efter.",
    arguments: [
      "Patienter får ofta fylla i samma information flera gånger på olika vårdgivare, vilket är tidskrävande och frustrerande. Detta skapar onödiga barriärer för vård.",
      "Vårdpersonal kan inte se tidigare journaler från andra vårdgivare, vilket ökar risken för medicinfel och minskar kvaliteten på vården.",
      "Pappersarbete tar upp värdefull tid som skulle kunna användas för att vårda patienter. Vårdpersonal spenderar en stor del av sin tid på administration istället för patientvård.",
      "Digitala journaler skulle möjliggöra bättre forskning och kvalitetssäkring inom sjukvården. Data skulle kunna analyseras för att förbättra vården.",
      "Patienter skulle få större kontroll över sin egen hälsodata och kunna dela information säkert med olika vårdgivare.",
      "Sverige ligger efter andra länder när det gäller digitalisering av sjukvården. Vi behöver komma ikapp för att behålla vår position som ett av världens bästa sjukvårdssystem."
    ],
    conclusion: "Jag föreslår att regeringen genomför en nationell digitalisering av patientjournaler. Detta skulle innebära att alla vårdgivare använder samma digitala system för att dela patientinformation säkert och effektivt. Systemet ska vara användarvänligt, följa strikta sekretessregler och ge patienter kontroll över sin egen hälsodata. Genom att digitalisera sjukvården kan vi förbättra patientsäkerheten, minska medicinfel och göra vården mer effektiv. Låt oss modernisera svensk sjukvård för framtiden!",
    originalPostId: 2,
    created_at: "2024-01-16T14:20:00Z",
    updated_at: "2024-01-16T14:20:00Z"
  },
  {
    id: 3,
    title: "Inför medborgarlön för ekonomisk trygghet",
    introduction: "Hej! Jag heter Maria Nilsson och bor på Framtidsgatan 22, 98765 Malmö. Med all automatisering och AI som utvecklas snabbt, oroar jag mig för vad som kommer att hända med alla jobb som riskerar att försvinna. Jag har funderat mycket på medborgarlön som en möjlig lösning för att säkerställa ekonomisk trygghet för alla medborgare.",
    summary: "Ett förslag för att införa medborgarlön som en säkerhetsnät för framtidens arbetsmarknad och för att minska ekonomiska klyftor.",
    background: "Världen genomgår en teknologisk revolution som kommer att förändra arbetsmarknaden radikalt. Automatisering och AI kommer att ersätta många jobb, samtidigt som nya typer av arbete skapas. Detta skapar oro för framtidens ekonomiska trygghet och hur vi ska hantera övergången till en ny arbetsmarknad. Medborgarlön är en idé som har testats i flera länder med positiva resultat och kan vara en lösning på framtidens utmaningar.",
    arguments: [
      "Med den snabba utvecklingen av automatisering och AI riskerar många jobb att försvinna. Vi behöver en säkerhetsnät som fungerar oavsett vad som händer på arbetsmarknaden.",
      "Medborgarlön skulle ge människor frihet att välja meningsfullt arbete istället för att ta vilket jobb som helst bara för att överleva. Detta skulle öka livskvaliteten för många.",
      "Det skulle minska byråkratin kring bidrag och socialförsäkringar. Istället för komplicerade system med olika typer av bidrag skulle alla få en grundinkomst.",
      "Pilotprojekt i Finland visade att människor inte blev lata, utan kunde fokusera på att utbilda sig eller starta egna företag. Detta stärker samhället.",
      "Medborgarlön skulle skapa en mer jämlik samhällsstruktur och minska ekonomiska klyftor. Alla skulle ha en grundläggande ekonomisk trygghet.",
      "Sverige kan bli en föregångare inom framtidens sociala säkerhetssystem. Genom att testa medborgarlön kan vi lära oss vad som fungerar och vad som behöver justeras."
    ],
    conclusion: "Jag föreslår att regeringen genomför en utredning av medborgarlön och börjar med pilotprojekt i mindre kommuner. Detta skulle ge oss kunskap om hur medborgarlön fungerar i svensk kontext och vilka effekter det har på arbetsmarknad, välbefinnande och samhällsekonomi. Genom att börja med pilotprojekt kan vi lära oss vad som fungerar innan vi eventuellt implementerar det nationellt. Låt oss vara modiga och testa nya lösningar för framtidens utmaningar!",
    originalPostId: 3,
    created_at: "2024-01-17T09:15:00Z",
    updated_at: "2024-01-17T09:15:00Z"
  }
];

export const mockForslag = mockForslagData;
