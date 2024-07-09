# Risikobewertung Code Challenge

## Features

1. Express.js backend
2. Postgres Datenbank
3. MUI Custom Theme
4. `useFetch` Custom Hook
5. Das Form erinnert sich an die Antwort, die man im vorherigen Step ausgewählt hat
6. 2 Varianten für die Result Page
7. Unterschiedliche Stepper für Mobile und Desktop

## Vorgehen

1. Zunächst habe ich nach einem Design gesucht, welches zu der Aufgabe passen könnte. Ich habe mich für eine links/rechts Aufteilung aus einem MUI Projekt entschieden: [MUI Checkout Template](https://mui.com/material-ui/getting-started/templates/checkout/). Mein daraus entstandenes Design habe ich auf Papier skizziert.
2. Als nächstes habe ich die Typen aus dem Swagger UI übernommen und API calls gemacht und zum Schluss das UI entworfen. Ich habe mir mit Hilfe von ChatGPT einige Texte schreiben lassen, die ich als Konstante gespeichert habe.

## Voraussetzungen

- Postgres
- Nodemon

## Installation

1. Um die Datenbank zu erstellen, müssen die Befehle in `database.sql` ausgeführt werden, um die Datenbank anzulegen. `db.js` dient als Verbindung zwischen Datenbank und Server und hier müssen die Zugangsdaten für die lokale Postgres Installation eingetragen werden. Normalerweise würde ich sensible Informationen als environment variables speichern, habe dies jedoch der Einfachheit halber weggelassen.
2. Der Client wird aus dem Client directory über `npm run dev` gestartet.
3. Das Backend wird über `npm run start` aus dem backend directory gestartet.

## Verbesserungen

- Bug: Wenn man mehrmals hintereinander eine falsche ID sucht, wird ein falsches Ergebnis angezeigt. Auch wenn der express.js Server offline ist, treten noch einige Bugs auf. Beispielsweise sollte dann keine ID angezeigt werden, da kein Datenbank Eintrag stattgefunden hat. 
- Ich hätte gerne den `useFetch` hook oder die Nutzung des `useFetch` hooks verbessert.
- Die Right Side Komponente ist kompliziert geworden. Das Problem ist, dass ich die beiden `useFetch` Hooks parallel benutze.
- Die Nutzung der Datentypen kann vereinfacht werden. Beispielsweise habe ich einige Datentypen, die sehr ähnlich sind (`RiskRateResponse` und `RiskRateResponseAndID` z.B.).
- Ich glaube, dass auch einige conditional renderings unverständlich sind und einfacher gemacht werden könnten.
- Eventuell hätte ich auch andere große Komponenten noch weiter verkleinern können.
- Das Projekt ist noch recht klein. Würde es weiter wachsen, würde ich die Aufteilung erneut ändern: [Bulletproof React Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
