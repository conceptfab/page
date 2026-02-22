Katalog na zapisy formularza beta (hosting PHP).

Plik tworzony automatycznie:
- beta-signups.csv

Wymagania:
- katalog musi byc zapisywalny przez PHP (na hostingu ustaw prawa, np. 775/755 zalezne od konfiguracji)
- .htaccess blokuje publiczny dostep do danych

Opcjonalny mail:
- ustaw zmienna srodowiskowa TIMEFLOW_BETA_EMAIL, aby wysylac powiadomienia e-mail o nowych zgloszeniach
- opcjonalnie ustaw TIMEFLOW_BETA_EMAIL_FROM (np. no-reply@twojadomena.pl) dla lepszej dostarczalnosci
- opcjonalnie ustaw TIMEFLOW_BETA_EMAIL_FROM_NAME (np. TimeFlow Beta)
- opcjonalnie ustaw TIMEFLOW_BETA_EMAIL_BCC (kopia powiadomien)
- na hostingu Apache mozesz uzyc np. w glownym .htaccess:
  SetEnv TIMEFLOW_BETA_EMAIL twoj-adres@example.com
  SetEnv TIMEFLOW_BETA_EMAIL_FROM no-reply@twojadomena.pl
  SetEnv TIMEFLOW_BETA_EMAIL_FROM_NAME "TimeFlow Beta"
