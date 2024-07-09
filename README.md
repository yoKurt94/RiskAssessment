# Risikobewertung Demo App

## Features

- **Express.js Backend**: Ermöglicht eine schnelle und effiziente Server-Implementierung.
- **Postgres Datenbank**: Bietet eine robuste und skalierbare Lösung für die Datenhaltung.
- **MUI Custom Theme**: Ein individuell angepasstes Design sorgt für eine ansprechende Benutzeroberfläche.
- **useFetch Custom Hook**: Vereinfacht Datenabfragen in React durch einen benutzerdefinierten Hook.
- **Persistente Formulardaten**: Das Formular speichert die zuvor ausgewählte Antwort, um die Benutzerfreundlichkeit zu erhöhen.
- **Zwei Varianten der Ergebnisseite**: Bietet Flexibilität in der Darstellung der Ergebnisse.
- **Responsive Stepper**: Unterschiedliche Stepper-Komponenten für Mobile und Desktop verbessern die Benutzererfahrung auf verschiedenen Geräten.

## Vorgehen

1. **Designwahl**: Inspiriert durch ein MUI-Projekt mit einer links/rechts Aufteilung ([MUI Checkout Template](https://mui.com/material-ui/getting-started/templates/checkout/)), wurde das Design auf Papier skizziert.
2. **API-Integration**: Übernahme der Typen aus dem Swagger UI und Implementierung der API-Aufrufe.
3. **UI-Entwicklung**: Gestaltung des User Interfaces unter Zuhilfenahme von ChatGPT für die Texterstellung.

## Voraussetzungen

- **Postgres**: Für die Datenhaltung.
- **Nodemon**: Für ein effizientes Backend-Development durch automatisches Neuladen.

## Installation

1. **Datenbank einrichten**: Führen Sie die Befehle in `database.sql` aus, um die Datenbank zu erstellen. Tragen Sie die Zugangsdaten für Ihre lokale Postgres-Installation in `db.js` ein.
2. **Client starten**: Im Client-Verzeichnis `npm run dev` ausführen.
3. **Backend starten**: Im Backend-Verzeichnis `npm run start` ausführen.

## Verbesserungsmöglichkeiten

- **Bugfix**: Aktuell wird bei mehrmaliger falscher ID-Suche ein inkorrektes Ergebnis angezeigt.
- **useFetch Hook**: Optimierung der Nutzung oder des Hooks selbst.
- **Right Side Komponente**: Vereinfachung der komplex gewordenen Komponente, insbesondere im Umgang mit parallelen useFetch Hooks.
- **Datentypen**: Vereinfachung ähnlicher Datentypen wie `RiskRateResponse` und `RiskRateResponseAndID`.
- **Conditional Renderings**: Verbesserung der Lesbarkeit und Vereinfachung.
- **Komponentenzerlegung**: Weitere Aufteilung großer Komponenten könnte die Übersichtlichkeit verbessern.
- **Projektstruktur**: Bei weiterem Wachstum des Projekts könnte eine Anpassung der Struktur nach [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) sinnvoll sein.