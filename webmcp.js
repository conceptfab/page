(function () {
  'use strict';

  if (typeof navigator === 'undefined') return;
  var mc = navigator.modelContext;
  if (!mc || typeof mc.provideContext !== 'function') return;

  var path = (window.location && window.location.pathname) || '/';
  var isEN = path.indexOf('/en/') === 0 || path.indexOf('/en') === 0;
  var t = function (pl, en) { return isEN ? en : pl; };

  var SECTION_MAP = {
    features: '#funkcje',
    workflow: '#workflow',
    faq: '#faq',
    beta: '#beta',
    stack: '#stack',
    roadmap: '#roadmap'
  };

  function scrollToHash(hash) {
    var el = document.querySelector(hash);
    if (!el) return false;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (history && history.replaceState) history.replaceState(null, '', hash);
    return true;
  }

  function go(url) {
    window.location.href = url;
    return { ok: true, url: url };
  }

  var tools = [
    {
      name: 'goto_section',
      description: t(
        'Przewiń stronę do wskazanej sekcji landing page TIMEFLOW.',
        'Scroll the TIMEFLOW landing page to a specified section.'
      ),
      inputSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          section: {
            type: 'string',
            enum: ['features', 'workflow', 'faq', 'beta', 'stack', 'roadmap'],
            description: t('Identyfikator sekcji.', 'Section identifier.')
          }
        },
        required: ['section']
      },
      execute: function (input) {
        var hash = SECTION_MAP[input && input.section];
        if (!hash) return { ok: false, error: 'unknown section' };
        var ok = scrollToHash(hash);
        return ok ? { ok: true, hash: hash } : { ok: false, error: 'section not in DOM' };
      }
    },

    {
      name: 'open_help',
      description: t(
        'Otwórz centrum pomocy TIMEFLOW (quick start, dashboard, sesje, projekty, AI, dane, daemon, ustawienia).',
        'Open the TIMEFLOW help center (quick start, dashboard, sessions, projects, AI, data, daemon, settings).'
      ),
      inputSchema: { type: 'object', additionalProperties: false, properties: {} },
      execute: function () { return go(isEN ? '/en/help.html' : '/pomoc.html'); }
    },

    {
      name: 'open_changelog',
      description: t(
        'Otwórz pełny changelog TIMEFLOW (aktualna wersja i archiwum).',
        'Open the full TIMEFLOW changelog (current version and archive).'
      ),
      inputSchema: { type: 'object', additionalProperties: false, properties: {} },
      execute: function () { return go(isEN ? '/en/updates.html' : '/aktualizacje.html'); }
    },

    {
      name: 'open_privacy_policy',
      description: t(
        'Otwórz politykę prywatności TIMEFLOW (informacje o przetwarzaniu danych formularza beta).',
        'Open the TIMEFLOW privacy policy (information about beta form data processing).'
      ),
      inputSchema: { type: 'object', additionalProperties: false, properties: {} },
      execute: function () { return go(isEN ? '/en/privacy-policy.html' : '/polityka-prywatnosci.html'); }
    },

    {
      name: 'switch_language',
      description: t(
        'Przełącz język strony TIMEFLOW między polskim (pl) a angielskim (en).',
        'Switch the TIMEFLOW site language between Polish (pl) and English (en).'
      ),
      inputSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          lang: { type: 'string', enum: ['pl', 'en'] }
        },
        required: ['lang']
      },
      execute: function (input) {
        var lang = input && input.lang;
        if (lang === 'en') return go('/en/');
        if (lang === 'pl') return go('/');
        return { ok: false, error: 'unsupported lang' };
      }
    },

    {
      name: 'prefill_beta_form',
      description: t(
        'Wypełnij pola formularza zgłoszenia do testów beta TIMEFLOW. NIE wysyła formularza — użytkownik musi sam zaakceptować zgodę i kliknąć przycisk wysyłki.',
        'Pre-fill the TIMEFLOW beta signup form fields. Does NOT submit — the user must check the consent box and click submit themselves.'
      ),
      inputSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string', maxLength: 120, description: t('Imię lub nick.', 'Name or nickname.') },
          email: { type: 'string', format: 'email', maxLength: 200 },
          role: {
            type: 'string',
            description: t(
              'Branża; jedna z opcji listy w formularzu (np. "Developer", "UI/UX / Product Designer").',
              'Industry; one of the form select options (e.g. "Developer", "UI/UX / Product Designer").'
            )
          },
          needs: { type: 'string', maxLength: 2000, description: t('Opis workflow / potrzeb.', 'Workflow / needs description.') }
        },
        required: ['email']
      },
      execute: function (input) {
        var form = document.getElementById('betaForm');
        if (!form) return { ok: false, error: 'beta form not on this page' };

        var setVal = function (id, val) {
          if (val === undefined || val === null) return false;
          var el = document.getElementById(id);
          if (!el) return false;
          el.value = String(val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        };

        var filled = {
          name: setVal('betaName', input.name),
          email: setVal('betaEmail', input.email),
          role: setVal('betaRole', input.role),
          needs: setVal('betaNeeds', input.needs)
        };

        var beta = document.querySelector('#beta');
        if (beta) beta.scrollIntoView({ behavior: 'smooth', block: 'start' });

        return {
          ok: true,
          filled: filled,
          notice: t(
            'Pola wypełnione. Zaznacz zgodę i kliknij wysłanie ręcznie — formularz nie został wysłany automatycznie.',
            'Fields filled. Check the consent box and click submit manually — the form was not submitted automatically.'
          )
        };
      }
    },

    {
      name: 'get_agent_resources',
      description: t(
        'Zwróć listę zasobów dla agentów AI dostępnych na stronie (llms.txt, llms-full.txt, agent-skills index, sitemap, api-catalog).',
        'Return the list of AI agent resources available on this site (llms.txt, llms-full.txt, agent-skills index, sitemap, api-catalog).'
      ),
      inputSchema: { type: 'object', additionalProperties: false, properties: {} },
      execute: function () {
        var base = window.location.origin;
        var langPrefix = isEN ? '/en' : '';
        return {
          ok: true,
          resources: {
            llms_summary: base + langPrefix + '/llms.txt',
            llms_full: base + langPrefix + '/llms-full.txt',
            agent_skills_index: base + '/.well-known/agent-skills/index.json',
            api_catalog: base + '/.well-known/api-catalog',
            sitemap: base + '/sitemap.xml'
          }
        };
      }
    }
  ];

  try {
    mc.provideContext({ tools: tools });
  } catch (e) {
    if (window.console && console.warn) console.warn('[webmcp] provideContext failed:', e);
  }
})();
