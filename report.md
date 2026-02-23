# Raport analizy: conceptfab.com/timeflow

## Konwersja i główne CTA

Strona ma poważny problem z hierarchią CTA. Jedynym przyciskiem działania jest „Dołącz do testów" w nawigacji i „Zgłoś się do bety" w środku strony — **brakuje przycisku pobrania aplikacji** w sekcji hero. Użytkownik, który jest gotowy do działania od razu, musi przewijać całą stronę do formularza na dole. Warto rozważyć dodanie dwóch CTA: „Pobierz beta" (jeśli jest dostępne) + „Zgłoś się" jako fallback.

## Hero Section

Sekcja powitalna ma dwa konkurujące ze sobą nagłówki:
- `ZAJMIJ SIĘ TWORZENIEM, MY ZAJMIEMY SIĘ CZASEM.` (all-caps, podnagłówek)
- `Kontroluj czas pracy bez zabijania flow.` (H1)

Poza tym zaraz pod H1 pojawia się długi tekst: *„Dziś: tracking + analityka + AI sugestie + import/export + sync MVP. Jutro: pełny menedżer projektów..."* — to zbyt wiele informacji w jednym zdaniu i psuje pierwsze wrażenie. Powinien być jeden mocny subheadline (max 1–2 zdania).

## Powtarzalność treści

To największy problem strukturalny strony. Te same funkcje pojawiają się w minimum 4 różnych miejscach:

| Sekcja | Co zawiera |
|---|---|
| Hero | krótkie wyliczenie funkcji |
| „MODUŁY W APLIKACJI" | 9+ modułów z opisami |
| „Co TimeFlow robi już teraz" | Te same 8 modułów powtórzone |
| Roadmapa „Teraz / Beta" | Znowu te same funkcje |

Warto scalić sekcję „Moduły" i „Co TimeFlow robi" w jedną lub wyraźnie zróżnicować ich perspektywę.

## Brak social proof

Strona nie zawiera żadnych elementów budujących zaufanie:
- Brak testimoniali (nawet ze wczesnych testerów)
- Brak liczby zapisanych użytkowników
- Brak gwiazdek / ocen
- Brak informacji o założycielu/twórcy

Dla produktu w becie szczególnie ważne jest powiedzenie „kto za tym stoi" — warto dodać chociaż krótką sekcję „O projekcie" z twarzą i imieniem autora.

## Problemy z formularzem beta

Formularz zgłoszeniowy ma kilka UX-owych błędów:

- **Placeholder = Label**: pole `<textarea>` ma placeholder „Na czym najbardziej Ci zależy?" — identyczny z etykietą. Gdy użytkownik kliknie, tekst znika i nie wie co wpisać
- **Brak walidacji inline** — widać `aria-invalid="true"` na polu select z domyślną opcją „Wybierz..."
- **Brak potwierdzenia po wysłaniu** — nie wiadomo co się stanie po kliknięciu „Wyślij zgłoszenie"
- **Brak polityki prywatności** — formularz zbiera email i imię, a **RODO wymaga** linku do privacy policy przy checkboxie zgody

## RODO / Zgodność prawna

Strona zbiera adresy e-mail bez widocznego linku do polityki prywatności ani regulaminu. To naruszenie RODO (GDPR) — jako polska firma musisz mieć ten link widoczny przy formularzu. Warto też dodać go w stopce.

## SEO i metadane

- Brak sekcji FAQ, która znacząco pomogłaby w long-tail SEO (np. „jak działa time tracker dla freelancerów", „Toggl alternatywa")
- Nagłówki sekcji (`CORE DESKTOP`, `DATA LAYER`, `UI DASHBOARD`) są napisane ALL CAPS i używane jako etykiety, a nie jako HTML headings — wyszukiwarki mogą je gorzej interpretować
- Brak strukturalnych danych (Schema.org `SoftwareApplication`) — dodanie ich wzmocniłoby wyniki w Google

## Animowane liczniki

W sekcji statystyk widoczne są wartości `0 +` i `0` przy modułach i platformach — to liczniki JS animowane od zera. Jeśli skrypt się nie załaduje lub użytkownik ma słabe połączenie, widzi „0 modułów" i „0 platform" co jest dezorientujące i podważa wiarygodność. Warto ustawić wartości fallback w HTML.

## Brak demo wideo

Produkt desktopowy z rozbudowanym interfejsem nie ma żadnego wideo demo. Kilka statycznych screenów to za mało — krótkie (30–60 sek.) video z przebiegu workflow znacząco zwiększa konwersję na tego typu stronach, szczególnie przy aplikacjach B2B.

## Drobne poprawki Copy

- Mieszanie języków: `auto_safe`, `rollback`, `daemon`, `auto-import`, `snapshot sync` bez wyjaśnień mogą być niezrozumiałe dla non-developerów (a target to graficy i designerzy)
- Tytuł zakładki zawiera `(beta)` — warto rozważyć czy to nie odstraszy część użytkowników, którzy obawiają się niestabilności

---

## Priorytety naprawy

| Priorytet | Problem | Wpływ |
|---|---|---|
| 🔴 Krytyczny | Brak polityki prywatności / RODO | Prawny |
| 🔴 Krytyczny | Brak wyraźnego CTA w hero | Konwersja |
| 🟠 Wysoki | Powtarzalność treści | UX + SEO |
| 🟠 Wysoki | Brak social proof | Zaufanie |
| 🟠 Wysoki | Błędy w formularzu (placeholder, walidacja) | Konwersja |
| 🟡 Średni | Brak wideo demo | Konwersja |
| 🟡 Średni | Liczniki JS bez fallbacków | UX |
| 🟢 Niski | Żargon techniczny w opisach | Czytelność |
| 🟢 Niski | ALL CAPS headings | SEO |