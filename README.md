# Channa Zorin Hybrid Android V2

This is an expanded development build of the language app.

## Included
- Sentence-level SOV ordering with token classification
- Pronouns, time/place, adjectives, questions, conjunctions
- Rule-based common-noun formation for unlisted Latin-script tokens (marked inferred)
- Known verb forms and a number composer (0–900,000)
- Word-by-word breakdown with grammatical category
- Learning guide and searchable starter dictionary
- Capacitor Android configuration

## Important limitations
This is **not yet a 100%-accurate universal translator**. A language cannot reliably translate every Sinhala word from grammar rules alone: vocabulary, word senses, inflections, spelling variants, sentence context, names, compounds, and idioms require a large validated dictionary and tests. Unknown words are highlighted. The current Sinhala input support is primarily via Singlish transliteration and curated entries; automatic Sinhala-script transliteration and a production AI service are not yet included.

The guide itself contains a few example/form inconsistencies (for example fixed pronoun/verb forms and some verb roots). The engine uses explicit mappings in `src/rules.js`; have the language creator validate any disputed forms before expanding.

## Build Android APK
Requires Node.js LTS and Android Studio:
```bash
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android
```
If `android/` already exists, skip `npx cap add android` and run `npx cap sync android`.
In Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s).

## Next
- Add a validated Sinhala↔Singlish transliteration module
- Build a large creator-reviewed Sinhala/Singlish lexicon with parts of speech and inflections
- Implement full proper-name endings and verb parsing with disambiguation
- Add safe online AI via server-side API (never embed API keys in the APK)
- Add voice input/output and test on OPPO hardware
