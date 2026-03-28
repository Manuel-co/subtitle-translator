# Subtitle Translator

A React app for translating `.srt` subtitle files using the [LibreTranslate](https://libretranslate.com/) API. Upload a subtitle file, pick your source and target languages, translate, and download the result.

## UI

### Previous UI
![image](https://user-images.githubusercontent.com/79476502/203831810-64542e34-1e54-4eaf-bd0d-9d3d4474a68a.png)

### Updated UI

<img width="1592" height="909" alt="image" src="https://github.com/user-attachments/assets/49d83f0e-9682-4184-89db-56756ad8444e" />

The updated UI features:
- Dark header and footer with a branded logo
- Card-based layout with a bold editorial style (Syne + DM Mono fonts)
- Step-by-step flow: upload file → select input language → select output language → translate & download
- Language badge that updates live as you select
- Animated fade-in sections
- Fully responsive — stacks to a single column on mobile

## Getting Started

### Prerequisites

- Node.js
- A running [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) instance (or use `https://libretranslate.de`)
- A local backend on `http://localhost:9000` to handle file download

### Install & Run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Upload an `.srt` file
2. Select the source language
3. Select the target language
4. Click Translate — the app sends the file content to LibreTranslate
5. The translated text is posted to the local backend (`localhost:9000`) for download
6. Click Download to grab the translated `.srt`

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds for production |
| `npm test` | Runs the test suite |
