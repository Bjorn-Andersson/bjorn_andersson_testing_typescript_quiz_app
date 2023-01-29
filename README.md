# Slutprojekt för kursen Testing och Typescript - en quiz app

## Att starta webbappen:

Borde inte vara något mer än `npm install` för att få alla libraries som behövs, och en simpel `npm start` för att få igång appen, och en `npm run test` för att köra testerna.

## Presentation:

### Vilka tester som har använts:

I denna appen har jag använt enhetstester och BDD ett test enligt kraven för godkänt. Enhetstesterna har testat funktionalitet som t.ex. att välja kategorier eller användarnamn, och BDD testet testade en spelrunda.

### Teststrategier som har använts:

För testningen har bestämde jag mig för att köra så basiskt jag kunde, och använde därför reacts testing library och jest för mina enhetstester, samt cucumber.js för mitt BDD-test. För mina enhetstester följde jag `arrange-act-assert` mönstret, och för mitt BDD-test följde jag naturligtvis `given-when-then` mönstret. Detta projektet följde inte direkt TDD principerna, men jag var ändå glad när jag faktoriserade om min kod att testerna (vilket jag redan hade programmerat klart i detta skede) fortfarande funkade korrekt, vilket bevisade för mig att faktoreringen var lyckad.

Generellt sett så strävade jag i mina enhetstester att testa kärnan i funktionaliteten, att spelaren kunde välja något, eller att resultatet av ett val visades korrekt. Detta manifesterade sig lite olika i de olika testen, men detta var min motivering designen av testerna.

### Vart UML-Diagramen finns:

Finns i foldern "UML-diagram", som ligger i root foldern.

### Designprinciper jag använt:

Jag strävar alltid efter att min kod ska vara så "DRY" som möjligt. Vilket betyder att jag strävar efter att flyta ut saker i funktioner och mindre komponenter för att lätt kunna använda funktioner i flera ställen i applikationen utan att behöva repetera massa kod. Jag strävar också efter att ha komponenterna mindre, och dela upp appens funktionalitet i komponenter och funktioner. Jag lyckades lagom med GameComponent, känner att det högst troligt går att bryta ut mer delar ut ur den om man verkligen vill. Jag använder kodformaterare (eslint och prettier) som hjälper min kod att vara enhetlig och lättläst. För att öka lättläshet så har jag försökt att använda namn på komponenter och funktioner som klart förklarar deras mening och funktion. Jag hoppas att min kod är tillräckligt "KISS", jag tror inte heller att att jag är en tillräckligt kapabel programmerare till att försöka göra komplexa lösningar på problem. Angående "YAGNI", man kan argumentera att visa funktioner kan vara onödiga om man bara vill att appen ska fungera och uppfylla grundkraven för godkänt, men jag ville endå ha med några "fluff-funktioner" eller vad man ska kalla dom, som förbättrar upplevelsen för spelarna. För det mesta har jag försökt importera på föräldrakomponenterna Home och GameComponent, för att förhindra att barnkomponenter ska vara beroende av varandra. Även ifall det gjorde mina föräldrakomponenter lite större så tror jag endå att det skulle vara visare om man senare skulle vilja bygga på appen eller potentiellt göra den till en del av ett annat program eller så.
