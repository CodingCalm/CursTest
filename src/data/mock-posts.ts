import { Post } from '@/types/post';

// Mock data for development and testing
export const mockPostsData: Post[] = [
  {
    id: 1,
    title: 'Kollektivtrafiken i Stockholm behöver förbättras',
    content:
      'Jag pendlar varje dag med tunnelbanan och bussen i Stockholm och det är verkligen frustrerande hur ofta det blir förseningar och inställda avgångar. Igår var det kaos på röda linjen i över en timme och idag var bussen 20 minuter försenad. Detta påverkar många människors vardag och gör det svårt att planera sin tid. Jag tycker att vi behöver investera mer i underhåll och modernisering av kollektivtrafiken. Särskilt signaler och spår behöver upprustas. Det skulle också vara bra med fler avgångar under rusningstid och bättre integration mellan olika transportslag. Vad tycker ni andra som också använder kollektivtrafiken? Har ni samma upplevelser? Jag tror att detta är en viktig samhällsfråga som påverkar många människors liv.',
    summary:
      'En diskussion om de utmaningar som Stockholmspendlare möter dagligen med förseningar och inställda avgångar, och förslag på förbättringar av kollektivtrafiken.',
    author: 'stockholmspendlare',
    upvotes: 342,
    comments: 89,
    timeAgo: '2 timmar sedan',
    nominations: 15,
  },
  {
    id: 2,
    title: 'Digitalisering av sjukvården - varför går det så långsamt?',
    content:
      'Min mormor behövde gå till läkaren förra veckan och det var helt otroligt hur mycket pappersarbete som fortfarande behöver göras. Hon fick fylla i samma formulär tre gånger på olika ställen och ingen kunde se hennes tidigare journaler. Detta är 2024 och vi har fortfarande inte digitaliserat sjukvården ordentligt. Det skulle göra så mycket skillnad för både patienter och vårdpersonal. Tänk om alla journaler var digitala och kunde delas mellan olika vårdgivare. Det skulle minska risken för medicinfel och göra det lättare för patienter att ta kontroll över sin egen hälsa. Jag har hört att andra länder är mycket längre fram på detta område. Varför går det så långsamt i Sverige? Är det pengar, byråkrati eller något annat som hindrar utvecklingen?',
    summary:
      'En kritisk diskussion om varför svensk sjukvård fortfarande använder pappersarbete istället för digitala system, och hur detta påverkar både patienter och vårdpersonal.',
    author: 'hälsovårdskritiker',
    upvotes: 567,
    comments: 156,
    timeAgo: '5 timmar sedan',
    nominations: 23,
  },
  {
    id: 3,
    title: 'Medborgarlön - en lösning på framtidens arbetsmarknad?',
    content:
      'Med all automatisering och AI som utvecklas snabbt, vad kommer att hända med alla jobb som riskerar att försvinna? Jag har funderat mycket på medborgarlön som en möjlig lösning. Det skulle ge människor ekonomisk trygghet och frihet att välja meningsfullt arbete istället för att ta vilket jobb som helst bara för att överleva. Det skulle också minska byråkratin kring bidrag och socialförsäkringar. Jag har läst att det har testats i Finland med positiva resultat. Människor blev inte lata, utan kunde fokusera på att utbilda sig eller starta egna företag. Vad tycker ni om idén? Finns det några nackdelar jag missar? Jag tror att vi behöver börja diskutera detta mer seriöst eftersom arbetsmarknaden förändras så snabbt.',
    summary:
      'En diskussion om medborgarlön som en potentiell lösning på framtidens arbetsmarknadsutmaningar med automatisering och AI.',
    author: 'framtidstänkare',
    upvotes: 789,
    comments: 234,
    timeAgo: '1 dag sedan',
    nominations: 31,
  },
  {
    id: 4,
    title: 'Skolan behöver anpassas för framtiden',
    content:
      'Min dotter går i högstadiet och jag är orolig för att skolan inte förbereder barnen för framtiden. De lär sig fortfarande samma saker som jag gjorde för 30 år sedan, men världen har förändrats helt. Barn behöver lära sig kritiskt tänkande, digital kompetens och hur man navigerar i en värld med AI och automatisering. Jag tycker att vi behöver omforma skolan för att fokusera mer på problemlösning och kreativitet istället för att bara memorera fakta. Det skulle också vara bra med mer praktisk kunskap om ekonomi, medborgarskap och hållbarhet. Vad tycker andra föräldrar? Känner ni att era barn får rätt förberedelse för framtiden? Jag tror att detta är en av de viktigaste samhällsfrågorna vi behöver ta itu med.',
    summary:
      'En diskussion om hur skolan behöver moderniseras för att förbereda barn för framtidens utmaningar med AI och automatisering.',
    author: 'engagerad_förälder',
    upvotes: 445,
    comments: 123,
    timeAgo: '3 dagar sedan',
    nominations: 18,
  },
  {
    id: 5,
    title: 'Bostadsbristen - varför bygger vi inte mer?',
    content:
      'Jag har försökt hitta en hyresrätt i Stockholm i över två år utan framgång. Köerna är kilometerlånga och de få lägenheter som finns kräver 15-20 års kötid. Detta är helt orimligt för unga människor som vill flytta hemifrån. Jag tycker att vi behöver bygga mycket mer bostäder, särskilt hyresrätter. Det finns gott om mark som kan användas, men byggprocessen är så komplicerad och tar så lång tid. Varför kan vi inte förenkla byggregler och ge fler tillstånd? Det skulle också vara bra med fler studentbostäder eftersom många unga människor inte kan studera på grund av bostadsbrist. Vad tycker ni andra som också har problem med bostäder? Finns det några lösningar jag missar?',
    summary:
      'En diskussion om bostadsbristen i Stockholm och förslag på hur man kan förenkla byggprocessen för att öka bostadsutbudet.',
    author: 'bostadssökande',
    upvotes: 623,
    comments: 189,
    timeAgo: '1 vecka sedan',
    nominations: 27,
  },
  {
    id: 6,
    title: 'Klimatkrisen - vad kan vi göra lokalt?',
    content:
      'Med alla rapporter om klimatförändringar känner jag mig maktlös och undrar vad jag och andra vanliga människor kan göra. Jag har redan börjat återvinna mer, cyklar istället för bil när möjligt och köper lokalt producerad mat. Men jag känner att det behövs mer systematiskt arbete från samhället. Vad tycker ni om att införa fler miljözoner i städerna? Eller kanske subventioner för solpaneler och elbilar? Jag har också funderat på om vi borde ha fler kollektivtrafiklinjer för att minska bilberoendet. Det skulle också vara bra med mer information om vad varje person kan göra för att minska sin klimatpåverkan. Vad gör ni för att bidra till en mer hållbar framtid?',
    summary:
      'En diskussion om vad vanliga människor kan göra för att bekämpa klimatkrisen och vilka systematiska åtgärder som behövs från samhället.',
    author: 'klimatengagerad',
    upvotes: 456,
    comments: 145,
    timeAgo: '2 dagar sedan',
    nominations: 19,
  },
  {
    id: 7,
    title: 'Äldrevården behöver förbättras',
    content:
      'Min farfar bor på ett äldreboende och jag är chockad över hur underbemannat det är. Personalen gör sitt bästa men det finns helt enkelt för få människor för att ge den omsorg som behövs. Det är inte ovanligt att han får vänta över en timme för hjälp med att gå på toaletten. Detta är inte acceptabelt för våra äldre som har byggt upp samhället. Jag tycker att vi behöver investera mycket mer i äldrevården och se till att det finns tillräckligt med personal. Det skulle också vara bra med bättre utbildning för vårdpersonal och högre löner för att locka fler att arbeta inom äldrevården. Vad tycker ni andra som har erfarenhet av äldrevården?',
    summary:
      'En diskussion om underbemanning i äldrevården och förslag på hur man kan förbättra vården för våra äldre.',
    author: 'barnbarn_till_äldre',
    upvotes: 678,
    comments: 203,
    timeAgo: '4 dagar sedan',
    nominations: 25,
  },
  {
    id: 8,
    title: 'Digital säkerhet - varför är vi så sårbara?',
    content:
      'Med alla nyheter om dataintrång och cyberattacker känner jag mig orolig för hur sårbara vi är digitalt. Jag har hört att många myndigheter och företag använder föråldrade system som inte är säkra. Detta är en säkerhetsrisk för hela samhället. Jag tycker att vi behöver investera mer i digital säkerhet och se till att alla offentliga system är uppdaterade och säkra. Det skulle också vara bra med mer utbildning för vanliga människor om hur man skyddar sig digitalt. Vad tycker ni om den digitala säkerheten i Sverige? Känner ni er trygga med att era personuppgifter är säkra? Jag tror att detta kommer att bli en allt viktigare fråga framöver.',
    summary:
      'En diskussion om Sveriges digitala sårbarhet och behovet av förbättrad cybersäkerhet för både myndigheter och medborgare.',
    author: 'digital_säkerhet',
    upvotes: 334,
    comments: 98,
    timeAgo: '6 dagar sedan',
    nominations: 12,
  },
  {
    id: 9,
    title: 'Integration och invandring - hur kan vi göra det bättre?',
    content:
      'Jag bor i ett område med många nyanlända och ser både positiva och negativa sidor av integrationen. Det är fantastiskt att se hur många som verkligen försöker lära sig svenska och anpassa sig till samhället. Men jag ser också att många har svårt att hitta jobb trots att de är välutbildade. Jag tycker att vi behöver bättre system för att erkänna utländska examina och kompetenser. Det skulle också vara bra med fler möjligheter för språkutbildning och praktikplatser. Vad tycker ni andra som också har erfarenhet av integration? Hur kan vi göra det lättare för nyanlända att bli en del av samhället?',
    summary:
      'En diskussion om utmaningar och möjligheter inom integration, med fokus på hur man kan förbättra systemen för nyanlända.',
    author: 'integrationstänkare',
    upvotes: 289,
    comments: 167,
    timeAgo: '1 vecka sedan',
    nominations: 14,
  },
  {
    id: 10,
    title: 'Psykiatrin behöver mer resurser',
    content:
      'Jag har en vän som har kämpat med psykisk ohälsa i flera år och det är otroligt svårt att få hjälp. Köerna är långa och när man väl får träffa någon är det ofta bara för en kort konsultation. Detta är inte acceptabelt för människor som verkligen behöver hjälp. Jag tycker att vi behöver investera mycket mer i psykiatrin och se till att det finns tillräckligt med personal. Det skulle också vara bra med fler preventiva åtgärder och tidig insats. Många problem skulle kunna undvikas om man fick hjälp tidigare. Vad tycker ni andra som har erfarenhet av psykiatrin? Hur kan vi förbättra vården för människor med psykisk ohälsa?',
    summary:
      'En diskussion om resursbrist i psykiatrin och behovet av fler preventiva åtgärder och tidig insats för psykisk hälsa.',
    author: 'psykisk_hälsa',
    upvotes: 512,
    comments: 178,
    timeAgo: '5 dagar sedan',
    nominations: 21,
  },
  {
    id: 11,
    title: 'Landsbygden dör ut - vad kan vi göra?',
    content:
      'Jag bor i en mindre kommun och ser hur svårt det är att hålla liv i samhället. Skolor stängs, affärer försvinner och unga människor flyttar till städerna. Detta är tråkigt eftersom landsbygden har så mycket att erbjuda. Jag tycker att vi behöver investera mer i infrastruktur på landsbygden, särskilt bredband och kollektivtrafik. Det skulle också vara bra med fler möjligheter för distansarbete så att människor kan bo på landsbygden men arbeta för företag i städerna. Vad tycker ni andra som bor på landsbygden? Hur kan vi göra det mer attraktivt att bo utanför storstäderna?',
    summary:
      'En diskussion om utmaningarna för landsbygden och förslag på hur man kan göra det mer attraktivt att bo utanför storstäderna.',
    author: 'landsbygdskämpe',
    upvotes: 234,
    comments: 89,
    timeAgo: '3 dagar sedan',
    nominations: 9,
  },
  {
    id: 12,
    title: 'Demokratin behöver förnyas',
    content:
      'Jag känner att många människor, särskilt unga, känner sig utanför demokratin och inte tror att deras röst spelar roll. Detta är farligt för samhället. Jag tycker att vi behöver hitta nya sätt att engagera människor i demokratin, kanske genom digitala plattformar eller medborgarpaneler. Det skulle också vara bra med mer transparens i politiken och bättre information om vad som händer i riksdagen. Jag har också funderat på om vi borde sänka rösträttsåldern till 16 år för att engagera unga tidigare. Vad tycker ni om demokratin i Sverige? Hur kan vi göra den mer inkluderande och engagerande?',
    summary:
      'En diskussion om hur man kan förnya demokratin och engagera fler människor, särskilt unga, i det demokratiska samhället.',
    author: 'demokratiengagerad',
    upvotes: 445,
    comments: 156,
    timeAgo: '2 dagar sedan',
    nominations: 28,
  },
];
