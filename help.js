(() => {
  const HELP_TABS = [
    'quickstart',
    'dashboard',
    'sessions',
    'projects',
    'estimates',
    'apps',
    'analysis',
    'ai',
    'data',
    'daemon',
    'settings',
  ];

  const navButtons = Array.from(document.querySelectorAll('[data-help-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-help-panel]'));
  const helpView = document.getElementById('helpMainView');
  const quickstartView = document.getElementById('quickstartTutorial');
  const openActiveBtn = document.getElementById('openActiveSectionBtn');
  const quickstartBackBtn = document.getElementById('quickstartBackBtn');
  const quickstartLaunchButtons = Array.from(
    document.querySelectorAll('[data-open-quickstart]'),
  );

  if (!navButtons.length || !panels.length || !helpView || !quickstartView) return;

  let activeTab = 'quickstart';

  const normalizeTab = (tab) =>
    HELP_TABS.includes(tab || '') ? tab : 'quickstart';

  const setOpenButtonLabel = () => {
    if (!openActiveBtn) return;
    const moduleLabel = openActiveBtn.getAttribute('data-label-module') || '';
    const tutorialLabel =
      openActiveBtn.getAttribute('data-label-tutorial') || moduleLabel;
    openActiveBtn.textContent =
      activeTab === 'quickstart' ? tutorialLabel : moduleLabel;
  };

  const updateQuery = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', activeTab);

    if (quickstartView.classList.contains('is-visible')) {
      params.set('view', 'quickstart');
    } else {
      params.delete('view');
    }

    const next = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', next);
  };

  const setActiveTab = (tab, shouldUpdateQuery = true) => {
    activeTab = normalizeTab(tab);

    navButtons.forEach((btn) => {
      const isActive = btn.getAttribute('data-help-tab') === activeTab;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach((panel) => {
      const isActive = panel.getAttribute('data-help-panel') === activeTab;
      panel.classList.toggle('is-active', isActive);
      panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    setOpenButtonLabel();
    if (shouldUpdateQuery) updateQuery();
  };

  const showHelp = (shouldUpdateQuery = true) => {
    helpView.style.display = 'block';
    quickstartView.classList.remove('is-visible');
    if (shouldUpdateQuery) updateQuery();
  };

  const showQuickstart = (shouldUpdateQuery = true) => {
    helpView.style.display = 'none';
    quickstartView.classList.add('is-visible');
    if (shouldUpdateQuery) updateQuery();
  };

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setActiveTab(btn.getAttribute('data-help-tab') || 'quickstart');
      showHelp();
    });
  });

  quickstartLaunchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setActiveTab('quickstart');
      showQuickstart();
    });
  });

  if (quickstartBackBtn) {
    quickstartBackBtn.addEventListener('click', () => {
      showHelp();
    });
  }

  if (openActiveBtn) {
    openActiveBtn.addEventListener('click', () => {
      if (activeTab === 'quickstart') {
        showQuickstart();
        return;
      }

      const source = navButtons.find(
        (btn) => btn.getAttribute('data-help-tab') === activeTab,
      );
      const targetUrl = source?.getAttribute('data-target-url');

      if (targetUrl) {
        window.location.href = targetUrl;
      }
    });
  }

  const params = new URLSearchParams(window.location.search);
  const initialTab = normalizeTab(params.get('tab'));
  const isQuickstartView = params.get('view') === 'quickstart';

  setActiveTab(initialTab, false);
  if (isQuickstartView) {
    showQuickstart(false);
  } else {
    showHelp(false);
  }
})();
