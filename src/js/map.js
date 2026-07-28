document.addEventListener('DOMContentLoaded', function () {
  const mapEl = document.getElementById('world-map');
  if (!mapEl || typeof L === 'undefined') return;

  const DATA = window.__MAP_DATA__ || { countries: {}, trails: [] };

  // Public, CORS-enabled mirror of a world country-borders GeoJSON file.
  // Properties use ISO 3166-1 alpha-3 codes in `id`, which is what the
  // keys in src/_data/visitedCountries.json are expected to match.
  const COUNTRIES_GEOJSON_URL =
    'https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json';

  // ---- Theme helpers -------------------------------------------------
  // Colors are read from the site's CSS variables at call time (rather
  // than hardcoded) so the map matches whichever theme (light/dark) is
  // currently active, and updates when the user toggles it.
  function themeColors() {
    const css = getComputedStyle(document.documentElement);
    return {
      primary: css.getPropertyValue('--primary').trim() || '#379ea5',
      secondary: css.getPropertyValue('--secondary').trim() || '#065392',
      accent: css.getPropertyValue('--accent').trim() || '#e28894',
      text: css.getPropertyValue('--text').trim() || '#4A4A4A',
    };
  }

  function isDark() {
    return document.body.classList.contains('dark-theme');
  }

  // Darkens a "#rrggbb" color by the given amount (0-1). Used to derive
  // the "visited many times" shade from --primary at runtime, instead of
  // hardcoding a second color that could drift out of sync with the theme.
  function darken(hex, amount) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return hex;
    const [r, g, b] = [m[1], m[2], m[3]].map((h) => Math.round(parseInt(h, 16) * (1 - amount)));
    return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  }

  // ---- Map setup -------------------------------------------------
  const map = L.map(mapEl, {
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 14,
  }).setView([25, 15], 2);

  const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  const TILE_ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>';

  let tileLayer = L.tileLayer(isDark() ? DARK_TILES : LIGHT_TILES, {
    attribution: TILE_ATTRIBUTION,
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  function swapTiles() {
    map.removeLayer(tileLayer);
    tileLayer = L.tileLayer(isDark() ? DARK_TILES : LIGHT_TILES, {
      attribution: TILE_ATTRIBUTION,
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);
    tileLayer.bringToBack();
  }

  // ---- Countries (choropleth) -------------------------------------------------
  let countriesLayer = null;

  function countryEntry(feature) {
    const byId = DATA.countries[feature.id];
    if (byId) return byId;
    const name = (feature.properties && feature.properties.name || '').toLowerCase();
    const match = Object.values(DATA.countries).find(
      (c) => c && typeof c === 'object' && c.name && c.name.toLowerCase() === name
    );
    return match || null;
  }

  function countryFillColor(entry) {
    const colors = themeColors();
    if (!entry) return 'transparent';
    if (entry.home) return colors.accent;
    if (entry.manyTimes) return darken(colors.primary, 0.35);
    if (entry.years && entry.years.length > 0) return colors.primary;
    return 'transparent';
  }

  function isVisited(entry) {
    return !!entry && (entry.home || entry.manyTimes || (entry.years && entry.years.length > 0));
  }

  function countryStyle(feature) {
    const entry = countryEntry(feature);
    const visited = isVisited(entry);
    return {
      fillColor: countryFillColor(entry),
      fillOpacity: visited ? 0.7 : 0,
      color: themeColors().text,
      weight: visited ? 1 : 0.5,
      opacity: visited ? 0.6 : 0.25,
    };
  }

  function buildCountryPopup(feature) {
    const entry = countryEntry(feature);
    const name = (entry && entry.name) || (feature.properties && feature.properties.name) || 'Unknown';
    let html = `<div class="popup-title">${name}</div>`;

    if (!isVisited(entry)) {
      html += `<div class="popup-empty">Not visited yet</div>`;
      return html;
    }

    if (entry.home) {
      html += `<div class="popup-badge popup-badge-home">${entry.homeLabel || 'Home'}</div>`;
    }
    if (entry.manyTimes) {
      html += `<div class="popup-badge">${entry.manyTimesLabel || 'Visited many times'}</div>`;
    }

    if (entry.years && entry.years.length > 0) {
      const sorted = [...entry.years].sort((a, b) => a - b);
      html += `<div class="popup-count">Visited ${sorted.length} time${sorted.length === 1 ? '' : 's'}</div>`;
      html += `<div class="popup-years">${sorted.map((y) => `<span class="year-chip">${y}</span>`).join('')}</div>`;
    }

    return html;
  }

  function restyleCountries() {
    if (countriesLayer) countriesLayer.setStyle(countryStyle);
  }

  fetch(COUNTRIES_GEOJSON_URL)
    .then((res) => res.json())
    .then((geojson) => {
      countriesLayer = L.geoJSON(geojson, {
        style: countryStyle,
        onEachFeature: (feature, layer) => {
          layer.bindPopup(buildCountryPopup(feature));
          layer.on('mouseover', () => {
            if (isVisited(countryEntry(feature))) layer.setStyle({ weight: 2, opacity: 0.9 });
          });
          layer.on('mouseout', () => layer.setStyle(countryStyle(feature)));
        },
      }).addTo(map);
      countriesLayer.bringToBack();
      tileLayer.bringToBack();
      updateStats(geojson);
    })
    .catch((err) => {
      console.error('Could not load country borders for the map:', err);
    });

  function updateStats(geojson) {
    const statsEl = document.getElementById('map-stats');
    if (!statsEl) return;
    const total = geojson.features.length;
    let visitedCount = 0;
    geojson.features.forEach((f) => {
      if (isVisited(countryEntry(f))) visitedCount++;
    });
    statsEl.textContent = `${visitedCount} / ${total} countries visited`;
  }

  // ---- Trails (GPX lines) -------------------------------------------------
  const trailGroups = { bike: L.layerGroup(), hike: L.layerGroup() };
  trailGroups.bike.addTo(map);
  trailGroups.hike.addTo(map);

  function parseGpxPoints(gpxText) {
    const xml = new DOMParser().parseFromString(gpxText, 'application/xml');
    if (xml.querySelector('parsererror')) return [];
    return Array.from(xml.querySelectorAll('trkpt, rtept')).map((pt) => [
      parseFloat(pt.getAttribute('lat')),
      parseFloat(pt.getAttribute('lon')),
    ]);
  }

  function buildTrailPopup(trail) {
    let html = `<div class="popup-title">${trail.name}</div>`;
    if (trail.date) html += `<div class="popup-trail-date">${trail.date}</div>`;
    if (trail.description) html += `<div class="popup-trail-desc">${trail.description}</div>`;
    if (trail.mapyUrl) {
      html += `<a class="popup-trail-link" href="${trail.mapyUrl}" target="_blank" rel="noopener">Open in Mapy.com &rarr;</a>`;
    }
    return html;
  }

  function trailColor(type) {
    const colors = themeColors();
    return type === 'bike' ? colors.secondary : colors.primary;
  }

  // A colored line alone can vanish when it crosses a country fill of a
  // similar color (this is what was happening to hiking trails over
  // visited countries). A wider white/black "halo" underneath the
  // colored line guarantees contrast against any fill or basemap tile.
  function haloColor() {
    return isDark() ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.9)';
  }

  const trails = Array.isArray(DATA.trails) ? DATA.trails : [];
  trails
    .filter((t) => t && t.gpx && t.type)
    .forEach((trail) => {
      fetch(trail.gpx)
        .then((res) => res.text())
        .then((gpxText) => {
          const points = parseGpxPoints(gpxText);
          if (points.length < 2) return;

          const halo = L.polyline(points, {
            color: haloColor(),
            weight: 7,
            opacity: 1,
            interactive: false,
          });
          const line = L.polyline(points, {
            color: trailColor(trail.type),
            weight: 3.5,
            opacity: 1,
          });
          line.bindPopup(buildTrailPopup(trail));
          line.on('mouseover', () => line.setStyle({ weight: 5.5 }));
          line.on('mouseout', () => line.setStyle({ weight: 3.5 }));

          const group = trailGroups[trail.type];
          if (group) {
            halo.addTo(group);
            line.addTo(group);
          }
        })
        .catch((err) => {
          console.error(`Could not load trail "${trail.name}" (${trail.gpx}):`, err);
        });
    });

  function restyleTrails() {
    Object.keys(trailGroups).forEach((type) => {
      trailGroups[type].eachLayer((layer) => {
        // Halo lines are non-interactive and have no popup; real trail
        // lines do. Use that to tell them apart when re-theming.
        if (layer.getPopup()) {
          layer.setStyle({ color: trailColor(type) });
        } else {
          layer.setStyle({ color: haloColor() });
        }
      });
    });
  }

  // ---- Trail type filter toggle -------------------------------------------------
  const toggle = document.getElementById('trail-type-toggle');
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.trail-type-btn');
      if (!btn) return;
      const type = btn.dataset.type;

      toggle.querySelectorAll('.trail-type-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      toggle.dataset.active = type;

      if (type === 'all') {
        if (!map.hasLayer(trailGroups.bike)) trailGroups.bike.addTo(map);
        if (!map.hasLayer(trailGroups.hike)) trailGroups.hike.addTo(map);
      } else {
        Object.keys(trailGroups).forEach((t) => {
          if (t === type) {
            if (!map.hasLayer(trailGroups[t])) trailGroups[t].addTo(map);
          } else if (map.hasLayer(trailGroups[t])) {
            map.removeLayer(trailGroups[t]);
          }
        });
      }
    });
  }

  // ---- React to the site's existing dark/light theme toggle -------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      swapTiles();
      restyleCountries();
      restyleTrails();
    });
  }
});
