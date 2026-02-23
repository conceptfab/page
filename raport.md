Przeanalizowałem obie wersje językowe Twojego landing page'a pod kątem grupy docelowej (freelancerów i designerów) oraz spójności przekazu. Poniżej znajduje się gotowy raport w formacie Markdown, z którego usunąłem deweloperski żargon, skupiając się na realnych korzyściach dla użytkowników. Możesz go skopiować i zapisać bezpośrednio jako plik `.md`. [conceptfab](https://conceptfab.com/timeflow/)

```markdown
# Raport Audytu Landing Page'a: TIMEFLOW (PL / EN)
**Data:** 23 Luty 2026
**Cel:** Optymalizacja pod kątem freelancerów (design/3D/video), eliminacja żargonu technologicznego i "bełkotu AI", ujednolicenie wersji językowych.

---

## 1. Niezgodności między wersją PL i ENG

| Element | Wersja PL | Wersja ENG | Komentarz / Rekomendacja |
| :--- | :--- | :--- | :--- |
| **Główny target** | "Najlepiej działa dla: małych studiów" [page:1] | "Works best for: designers" [page:1] | Rozjazd w komunikacji. Skoro narzędzie to "tracker dla freelancerów", trzymaj się wersji ENG i celuj bezpośrednio w designerów. |
| **Opis funkcji** | "import/export + sync MVP" [page:1] | "import/export + online sync" [page:1] | "Sync MVP" to hermetyczny żargon startupowy. Wersja ENG ("online sync") jest znacznie lepsza i zrozumiała z punktu widzenia użytkownika. |
| **Słownictwo** | "wyceny, daemon" [page:1] | "estimates, daemon" [page:1] | Słowo "daemon" dla nietechnicznego grafika brzmi obco i przypomina błędy systemowe. Zamień na "proces w tle" lub "niewidoczny asystent". |
| **Formularz Beta** | Opcja: "Inna branża" [page:1] | Opcja: "Other" [page:1] | Drobna różnica, ale konsekwentnie trzymasz się selektorów UI/UX i Video. Warto to ujednolicić wizualnie zresztą strony. |

---

## 2. Klątwa Wiedzy: Za dużo "Dev", za mało "Design"

Strona ma komunikować produkt dla UI/UX, grafików i montażystów, ale w sekcji "Tech Stack" brzmi jak narzędzie dla innych programistów [page:1]. Jako projektant 3D doskonale wiesz, jak cenny jest każdy gigabajt RAM-u podczas pracy w Blenderze czy Plasticity. To jest Twoja główna karta przetargowa do freelancerów, którą zakopujesz pod żargonem technicznym!

**Co powinieneś zwinąć lub ukryć:**
* Wymienianie z nazwy bibliotek: `Serde`, `Chrono`, `Tokio`, `Zustand`, `Radix` czy `rusqlite` [page:1]. Dla projektanta graficznego to absolutna abstrakcja, która tworzy szum informacyjny.

**Na co zamienić (Język korzyści):**
* Zamiast pisać o potędze *Rust + Tauri 2* [page:1], napisz: **"Zjada tylko ułamek RAM-u. Twój komputer nie będzie wył, a Figma i Photoshop nie zaczną klatkować."**
* Zamiast o *SQLite w trybie bundled* [page:1], napisz: **"Działa natychmiast po instalacji, w 100% offline. Zero opóźnień z chmury i pełna prywatność plików."**

---

## 3. Komunikacja AI – Jak uniknąć "bełkotu"

Twoje obecne zdanie: *"Lokalny model uczy się na twoich korektach — bez wysyłania danych na zewnątrz i bez obciążania sprzętu"* [page:1] jest **rewelacyjne**. Trafia w dwa największe bóle freelancera: restrykcyjne NDA z klientami (prywatność) i zasobożerność programów. Problem pojawia się w resztkach nazewnictwa inżynieryjnego.

**Obecne sformułowania do zmiany:**
* **"rollback ostatniej paczki"** [page:1] $\rightarrow$ "szybkie cofnięcie przypisań" (słowo "paczka" z ang. *batch* kojarzy się z developmentem).
* **"konfigurowalne progi pewności"** [page:1] $\rightarrow$ "Ty decydujesz, kiedy AI ma działać samo, a kiedy tylko sugerować czas".
* **"tryb auto_safe"** [page:1] $\rightarrow$ "bezpieczna automatyzacja".

---

## 4. Analiza UX i Copywritingu

* **Hero Section:** *"ZAJMIJ SIĘ TWORZENIEM, MY ZAJMIEMY SIĘ CZASEM"* [page:1] – doskonałe hasło. Idealnie rezonuje z problemem ręcznego zliczania godzin.
* **Brak Social Proof:** Aplikacja mocno zyska, jeśli dodasz krótką notkę autorską pod formularzem bety: *"Stworzyłem TIMEFLOW, bo jako freelancer miałem dość trackerów, które zabijały mój workflow."* To uwiarygadnia aplikację w oczach testerów.
* **Projekty oparte o foldery:** Wyciągnij tę funkcję wyżej [page:1]. Automatyczne przypisywanie czasu do klienta na podstawie otwartego folderu z plikami to "killer feature" dla każdego, kto skacze między trzema zleceniami dziennie.

---

## 5. Checklista Poprawek (Action Items)

- [ ] Popraw tłumaczenia PL, aby odpowiadały wersjom ENG (zmiana "małych studiów" na "designerów", wyrzucenie "MVP").
- [ ] Przetłumacz techniczny stack (Rust, Tokio) na język korzyści (niskie zużycie RAM/CPU, prywatność w offline).
- [ ] Usuń z sekcji AI słowa zaczerpnięte z gita i backendu (rollback, daemon, threshold).
- [ ] Dodaj element ludzki – notatkę założycielską pokazującą, że soft tworzy praktyk rozwiązujący własny problem.
```
