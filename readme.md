# Lathund nytt webbutvecklingsprojekt

Denna readme-fil beskriver projektets syfte samt hur jag gått tillväga för att skapa det, främst för min egen skull.

## Automatiseringsprocessens syfte
Automatisering syftar till att underlätta utvecklingsprocessen genom att ta bort repetitiva uppgifter. Detta frigör tid och ger fokus på själva utvecklandet. ([x](https://www.toptal.com/nodejs/an-introduction-to-automation-with-gulp)) I detta projekt har fokus lagts på att minimera filstolekar och antalet filer för snabb laddningstid samt en liveuploader som uppdaterar webbsidan i realtid under utvecklingsfasen.

## Detta behövs
* Atom (eller annan lämplig editor)
* Webbläsare en masse
* FileZilla (eller annant lämpligt FTP-ptogram)
* XAMPP
* node.js
* Git
* Gulp globalt (installeras via node.js med ```npm install gulp-cli --g```)

## Skapa en grundstruktur
Detta projekt har följande grundstruktur
* /pub
* /src
  * /scss
    * design.scss
    * typography.scss
  * /images
  * /js
    * js1.js
    * js2.js
  * index.html
* readme.md

## Initiera ett npm-paket
`npm init` (i rotkatalogen) skapade package.json
> "All npm packages contain a file, usually in the project root, called package.json - this file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies. It can also contain other metadata such as a project description, the version of the project in a particular distribution, license information, even configuration data - all of which can be vital to both npm and to the end users of the package." ([x](https://nodejs.org/en/knowledge/getting-started/npm/what-is-the-file-package-json/))

## Installera Gulp lokalt ([x](https://gulpjs.com/docs/en/getting-started/quick-start))
`npm install --save-dev gulp` (i rotkatalogen) skapade package-lock.json och /node_modules  

Skapade filen gulpfile.js och lade in `const { src, dest, watch, series, parallel} = require("gulp");` Här skrivs all gulp-relaterad kod. (Om flera js-filer behövs, skapa i stället en mapp kallad gulpfile.js och skapa index.js i den. Från denna js-fil kan sedan alla övriga js-filer inkluderas.) ([x](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles))

## Initiera ett Git repository
`git init` (i rotkatalogen) initierade ett repository. _OBS att Git inte indexerar tomma mappar._  
Skapade filen .gitignore och lade där till /node_modules som inte ska versionshanteras.  

## #Installera nödvändiga paket/tillägg
I detta projekt är följande tillägg installerade:
* **browser-sync** ([x](https://www.npmjs.com/package/browser-sync)) Uppdaterar webbläsaren i realtid vilket sparar tid.
* **del** ([x](https://www.npmjs.com/package/del)) Raderar filer och mappar. Bra för att rensa pub-katalogen när man sätter igång för dagen.
* **gulp-sass** ([x](https://www.npmjs.com/package/gulp-sass)) Kompilerar sass till scss.
* **gulp-autoprefixer** ([x](https://www.npmjs.com/package/gulp-autoprefixer)) Lägger till nödvändiga autoprefix i css. Valde detta för att slippa sitta och leta vad i css:en som behöver dessa tillägg.
* **gulp-concat** ([x](https://www.npmjs.com/package/gulp-concat)) Konkatinerar js-filer för att minska antalet filer som måste anropas.
* **gulp-uglify-es** ([x](https://www.npmjs.com/package/gulp-uglify-es)) Minimerar js-filer för att minska filstorlek.
* **gulp-clean-css** ([x](https://www.npmjs.com/package/gulp-clean-css)) Minimerar css-filer för att minska filstorlek.
* **gulp-concat-css** ([x](https://www.npmjs.com/package/gulp-concat-css)) Konkatinerar css-filer för att minska antalet filer som måste anropas.
* **gulp-imagemin** ([x](https://www.npmjs.com/package/gulp-imagemin)) Minimerar bildfiler för att minska filstorlek. (Upplever dock att minskningen i filstolek är i underkant.)

## Skapa automatisering i gulpfile.js
I detta projekt är gulpfile.js först uppbyggd med requires för samtliga tillägg samt nödvändiga sökvägar. Därefter alla tasks och exports. Projektet har 6 tasks:
* **pubCleanup** Rensar pub-katalogen
* **htmlTask** Kopierar html-filer till pub-katalogen.
* **scssTask** Kompilerar scss till css, minifierar och konkatenerar css-filer. Skriver den resulterande filen till pub-katalogen.
* **jsTask** Samma som ovan för js-filer.
* **imageTask** Minifierar och kopierar jpg-, png-, gif- och svg-filer till pub-katalogen.
* **watchTask** Initierar browsersync samt bevakar ändringar för samtliga angivna sökvägar. När någon fil i dessa sökvägar ändras körs samtliga ovanstående tasks förutom pubCleanup.

Kommandot `gulp` startar upp samtliga tasks.

## Förvara projektet
Projektet är upplagt på GitHub, utan mappen node_modules.

Klona projektet från GitHub med `git clone https://github.com/linneahaden/boilerplate-webdev-project.git`  
Kör `npm install` i rotkatalogen för att installera om alla dependencies/paket.  

## Jobba med projektet
![](https://media3.giphy.com/media/FmOV8SCJ5fa8M/giphy.gif)
