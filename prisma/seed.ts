import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test users
  const hashedPassword = await bcrypt.hash('password', 10);

  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'USER',
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Users created:', {
    testUser: testUser.email,
    adminUser: adminUser.email,
  });

  // Create sample posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: 'Kollektivtrafiken i Stockholm behöver förbättras',
        content:
          'Jag pendlar varje dag med tunnelbanan och bussen i Stockholm och det är verkligen frustrerande hur ofta det blir förseningar och inställda avgångar. Igår var det kaos på röda linjen i över en timme och idag var bussen 20 minuter försenad. Detta påverkar många människors vardag och gör det svårt att planera sin tid. Jag tycker att vi behöver investera mer i underhåll och modernisering av kollektivtrafiken. Särskilt signaler och spår behöver upprustas. Det skulle också vara bra med fler avgångar under rusningstid och bättre integration mellan olika transportslag. Vad tycker ni andra som också använder kollektivtrafiken? Har ni samma upplevelser? Jag tror att detta är en viktig samhällsfråga som påverkar många människors liv.',
        summary:
          'En diskussion om de utmaningar som Stockholmspendlare möter dagligen med förseningar och inställda avgångar, och förslag på förbättringar av kollektivtrafiken.',
        authorId: testUser.id,
        upvotes: 342,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Digitalisering av sjukvården - varför går det så långsamt?',
        content:
          'Min mormor behövde gå till läkaren förra veckan och det var helt otroligt hur mycket pappersarbete som fortfarande behöver göras. Hon fick fylla i samma formulär tre gånger på olika ställen och ingen kunde se hennes tidigare journaler. Detta är 2024 och vi har fortfarande inte digitaliserat sjukvården ordentligt. Det skulle göra så mycket skillnad för både patienter och vårdpersonal. Tänk om alla journaler var digitala och kunde delas mellan olika vårdgivare. Det skulle minska risken för medicinfel och göra det lättare för patienter att ta kontroll över sin egen hälsa. Jag har hört att andra länder är mycket längre fram på detta område. Varför går det så långsamt i Sverige? Är det pengar, byråkrati eller något annat som hindrar utvecklingen?',
        summary:
          'En kritisk diskussion om varför svensk sjukvård fortfarande använder pappersarbete istället för digitala system, och hur detta påverkar både patienter och vårdpersonal.',
        authorId: testUser.id,
        upvotes: 567,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Medborgarlön - en lösning på framtidens arbetsmarknad?',
        content:
          'Med all automatisering och AI som utvecklas snabbt, vad kommer att hända med alla jobb som riskerar att försvinna? Jag har funderat mycket på medborgarlön som en möjlig lösning. Det skulle ge människor ekonomisk trygghet och frihet att välja meningsfullt arbete istället för att ta vilket jobb som helst bara för att överleva. Det skulle också minska byråkratin kring bidrag och socialförsäkringar. Jag har läst att det har testats i Finland med positiva resultat. Människor blev inte lata, utan kunde fokusera på att utbilda sig eller starta egna företag. Vad tycker ni om idén? Finns det några nackdelar jag missar? Jag tror att vi behöver börja diskutera detta mer seriöst eftersom arbetsmarknaden förändras så snabbt.',
        summary:
          'En diskussion om medborgarlön som en potentiell lösning på framtidens arbetsmarknadsutmaningar med automatisering och AI.',
        authorId: testUser.id,
        upvotes: 789,
      },
    }),
  ]);

  console.log('✅ Posts created:', posts.length);

  // Create sample forslag
  const forslag = await Promise.all([
    prisma.forslag.create({
      data: {
        title: 'Förbättra kollektivtrafiken i Stockholm',
        introduction:
          'Hej! Jag heter Anna Andersson och bor på Storgatan 15, 12345 Stockholm. Som daglig pendlare i Stockholm upplever jag varje dag hur kollektivtrafiken sviker oss. Igår var det kaos på röda linjen i över en timme och idag var bussen 20 minuter försenad. Detta påverkar inte bara mig utan hundratusentals andra pendlare som försöker ta sig till jobb, skola eller andra viktiga ärenden.',
        summary:
          'Ett förslag för att modernisera Stockholms kollektivtrafik genom upprustning av signaler, ökad frekvens under rusningstid och bättre integration mellan transportslag.',
        background:
          'Stockholm är Sveriges huvudstad och en av Europas snabbast växande städer. Trots detta har kollektivtrafiken inte hängt med i utvecklingen. Medan staden växer och fler människor väljer att bo här, blir kollektivtrafiken alltmer opålitlig. Detta skapar frustration, stress och gör det svårt att planera sin vardag. En fungerande kollektivtrafik är avgörande för en hållbar stad och för att Stockholm ska vara en attraktiv plats att bo och arbeta på.',
        arguments: [
          'Varje dag upplever tusentals pendlare förseningar och inställda avgångar som påverkar deras livskvalitet och produktivitet. Detta skapar stress och frustration för människor som försöker ta sig till jobb, skola eller andra viktiga ärenden.',
          'En förbättrad kollektivtrafik skulle minska bilberoendet och bidra till en mer hållbar stad. Fler människor skulle välja kollektivtrafik om den var pålitlig och effektiv.',
          'Stockholm konkurrerar med andra europeiska städer om talang och investeringar. En modern och effektiv kollektivtrafik är avgörande för att locka företag och människor till staden.',
          'De nuvarande signalerna och spåren är föråldrade och behöver moderniseras. Detta är grundorsaken till många av förseningarna och inställda avgångarna.',
          'Under rusningstid är frekvensen för låg för att hantera antalet resenärer. Detta skapar överfulla vagnar och bussar som gör resan obekväm och stressig.',
          'Integrationen mellan olika transportslag (tunnelbana, buss, pendeltåg) fungerar inte optimalt. Resenärer förlorar tid på övergångar och informationen är ofta otydlig.',
        ],
        conclusion:
          'Jag föreslår att Stockholms läns landsting och regeringen tillsammans genomför en omfattande upprustning av kollektivtrafiken i Stockholm. Detta bör inkludera modernisering av signaler och spår, ökad frekvens under rusningstid, och bättre integration mellan olika transportslag. Vi behöver också investera i elbussar för att minska utsläppen och göra staden mer hållbar. Genom att investera i kollektivtrafiken skapar vi en mer attraktiv och hållbar stad som gynnar alla som bor och arbeta här. Låt oss göra Stockholm till en föregångare inom modern kollektivtrafik!',
        originalPostId: posts[0].id,
      },
    }),
  ]);

  console.log('✅ Forslag created:', forslag.length);

  console.log('🎉 Database seeding completed!');
}

main()
  .catch(e => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
