(function() {
    "use strict";

    var placeFilters = [
        "",
        "Stockholm",
        "Sörmland",
        "Nyköping",
        "Oxelösund",
        "Björkvik",
        "Tunaberg",
        "Kila",
        "Bergslagen",
        "Ljusnarsberg",
        "Finnskogarna",
        "Grangärde",
        "Södra Dalarna",
        "Virsbo",
        "Västmanland",
        "Norra Österbotten",
        "Kajanaland",
        "Karelen",
        "Uleåborg",
        "Helsingfors",
        "Åbo",
        "British Columbia",
        "Ontario",
        "Michigan",
        "Wisconsin",
        "Stralsund",
        "Lübeck",
        "Vallonien"
    ];

    var fallbackSearchSources = [
        { id: "runeberg", label: "Projekt Runeberg", searchSite: "runeberg.org", search: { type: "site", site: "runeberg.org" } },
        { id: "stf", label: "STF-årsskriften", searchSite: "runeberg.org/stf/", search: { type: "site", site: "runeberg.org/stf/" } },
        { id: "litteraturbanken", label: "Litteraturbanken", searchSite: "litteraturbanken.se", search: { type: "site", site: "litteraturbanken.se" } },
        { id: "europeana", label: "Europeana", searchSite: "europeana.eu", search: { type: "template", url: "https://www.europeana.eu/sv/search?query={query}" } },
        { id: "alvin", label: "Alvin", searchSite: "alvin-portal.org", search: { type: "template", url: "https://www.alvin-portal.org/alvin/resultList.jsf?query={query}" } },
        { id: "antikvariat", label: "Antikvariat.net", searchSite: "antikvariat.net", search: { type: "template", url: "https://www.antikvariat.net/sv/actions/biblio-search/default/search?currency=SEK&all_text={query}" } },
        { id: "bokborsen", label: "Bokbörsen", searchSite: "bokborsen.se", search: { type: "template", url: "https://www.bokborsen.se/?f=1&qt={query}" } },
        { id: "arkivkopia", label: "Arkivkopia", searchSite: "arkivkopia.se", search: { type: "site", site: "arkivkopia.se" } },
        { id: "lantmateriet", label: "Historiska kartor", searchSite: "historiskakartor.lantmateriet.se", search: { type: "site", site: "historiskakartor.lantmateriet.se" } },
        { id: "digi", label: "Nationalbiblioteket i Finland", searchSite: "digi.kansalliskirjasto.fi", search: { type: "template", url: "https://digi.kansalliskirjasto.fi/search?query={query}&set_language=sv" } },
        { id: "kb-digitalt", label: "KB Digitalt", searchSite: "digitalt.kb.se", search: { type: "template", url: "https://digitalt.kb.se/search?q={query}" } },
        { id: "svenska-tidningar", label: "Svenska tidningar", searchSite: "tidningar.kb.se", search: { type: "template", url: "https://tidningar.kb.se/search?q={query}&searchGranularity=part&_sort=datePublished" } },
        { id: "riksdagstryck", label: "Digitalt riksdagstryck", searchSite: "riksdagstryck.kb.se", search: { type: "site", site: "riksdagstryck.kb.se" } },
        { id: "slaktingar", label: "Släktingar-bloggen", searchSite: "blogg.slaktingar.se", search: { type: "template", url: "https://blogg.slaktingar.se/?s={query}" } },
        { id: "slakthistoria", label: "Släkthistoria", searchSite: "slakthistoria.se", search: { type: "site", site: "slakthistoria.se" } },
        { id: "popularhistoria", label: "Populär Historia", searchSite: "popularhistoria.se", search: { type: "site", site: "popularhistoria.se" } },
        { id: "varldenshistoria", label: "Världens Historia", searchSite: "varldenshistoria.se", search: { type: "site", site: "varldenshistoria.se" } },
        { id: "historianu", label: "Historia.nu", searchSite: "historia.nu", search: { type: "site", site: "historia.nu" } },
        { id: "vetenskapsradion", label: "Vetenskapsradion Historia", searchSite: "sverigesradio.se", search: { type: "site", site: "sverigesradio.se/vetenskapsradionhistoria" } },
        { id: "abo", label: "Åbo Akademis historiablogg", searchSite: "blogs.abo.fi/historia", search: { type: "template", url: "https://blogs.abo.fi/historia/?s={query}" } },
        { id: "spottinghistory", label: "SpottingHistory", searchSite: "spottinghistory.com", search: { type: "site", site: "spottinghistory.com" } },
        { id: "riksarkivet", label: "Riksarkivet", searchSite: "sok.riksarkivet.se", search: { type: "site", site: "sok.riksarkivet.se" } },
        { id: "raa-arkivsok", label: "Arkivsök, RAÄ", searchSite: "arkivsok.raa.se", search: { type: "site", site: "arkivsok.raa.se" } },
        { id: "shm-samlingar", label: "SHM samlingar", searchSite: "samlingar.shm.se", search: { type: "site", site: "samlingar.shm.se" } },
        { id: "tabellverket", label: "Tabellverket", searchSite: "tabellverket.ddb.umu.se", search: { type: "site", site: "tabellverket.ddb.umu.se" } },
        { id: "nordiskamuseet", label: "Nordiska museet", searchSite: "nordiskamuseet.se", search: { type: "site", site: "nordiskamuseet.se" } },
        { id: "finna", label: "Finna", searchSite: "finna.fi", search: { type: "template", url: "https://www.finna.fi/Search/Results?lookfor={query}&lng=sv" } },
        { id: "museovirasto", label: "Museiverket", searchSite: "museovirasto.fi", search: { type: "site", site: "museovirasto.fi" } },
        { id: "kansallisarkisto", label: "Kansallisarkisto", searchSite: "kansallisarkisto.fi", search: { type: "site", site: "kansallisarkisto.fi" } },
        { id: "astia", label: "Astia", searchSite: "astia.narc.fi/uusiastia", search: { type: "site", site: "astia.narc.fi/uusiastia" } },
        { id: "genealogia-fi", label: "Genealogiska Samf. Finland", searchSite: "genealogia.fi", search: { type: "site", site: "genealogia.fi" } },
        { id: "sukuhistoria", label: "Sukuhistoria", searchSite: "sukuhistoria.fi/sshy", search: { type: "site", site: "sukuhistoria.fi/sshy" } },
        { id: "sotasurmasampo", label: "Sotasurmasampo", searchSite: "sotasurmat.narc.fi", search: { type: "site", site: "sotasurmat.narc.fi" } },
        { id: "sotasampo", label: "Sotasampo", searchSite: "sotasampo.fi", search: { type: "site", site: "sotasampo.fi" } },
        { id: "lac", label: "Library & Archives Canada", searchSite: "canada.ca/en/library-archives.html", search: { type: "site", site: "canada.ca/en/library-archives.html" } },
        { id: "arkivdigital", label: "ArkivDigital", searchSite: "arkivdigital.se", search: { type: "site", site: "arkivdigital.se" } },
        { id: "soldatreg", label: "Soldatregistret", searchSite: "soldatreg.se", search: { type: "site", site: "soldatreg.se" } },
        { id: "rotter", label: "Rötter", searchSite: "rotter.se", search: { type: "site", site: "rotter.se" } },
        { id: "finnsam", label: "Finnsam", searchSite: "finnsam.org", search: { type: "site", site: "finnsam.org" } },
        { id: "skogsfinsk-bibliografi", label: "Skogsfinsk bibliografi", searchSite: "finnsam.org/bibliografi", search: { type: "site", site: "finnsam.org/bibliografi" } },
        { id: "vallon", label: "Vallonättlingar", searchSite: "vallon.se", search: { type: "site", site: "vallon.se" } },
        { id: "stockholmskallan", label: "Stockholmskällan", searchSite: "stockholmskallan.stockholm.se", search: { type: "site", site: "stockholmskallan.stockholm.se" } },
        { id: "stadsarkivet-stockholm", label: "Stadsarkivet Sthlm", searchSite: "stadsarkivet.stockholm", search: { type: "site", site: "stadsarkivet.stockholm" } },
        { id: "doria", label: "Doria.fi", searchSite: "doria.fi", search: { type: "site", site: "doria.fi" } },
        { id: "finlit", label: "Finska Litteratursällskapet", searchSite: "finlit.fi", search: { type: "site", site: "finlit.fi" } },
        { id: "sprakinstitutet", label: "Språkinstitutet", searchSite: "sprakinstitutet.fi", search: { type: "site", site: "sprakinstitutet.fi" } },
        { id: "isof", label: "Isof", searchSite: "isof.se", search: { type: "site", site: "isof.se" } },
        { id: "migrationsinstitutet", label: "Migrationsinstitutet", searchSite: "siirtolaisuusinstituutti.fi", search: { type: "site", site: "siirtolaisuusinstituutti.fi" } },
        { id: "finlandia-foundation", label: "Finlandia Foundation", searchSite: "finlandiafoundation.org", search: { type: "site", site: "finlandiafoundation.org" } },
        { id: "ekomuseum", label: "Ekomuseum", searchSite: "ekomuseum.se", search: { type: "site", site: "ekomuseum.se" } },
        { id: "jernkontoret", label: "Jernkontoret", searchSite: "jernkontoret.se", search: { type: "site", site: "jernkontoret.se" } },
        { id: "kalevalaseura", label: "Kalevalaseura", searchSite: "kalevalaseura.fi", search: { type: "site", site: "kalevalaseura.fi" } },
        { id: "sormlandsmuseum", label: "Sörmlands museum", searchSite: "sormlandsmuseum.se", search: { type: "site", site: "sormlandsmuseum.se" } },
        { id: "dalarnasmuseum", label: "Dalarnas museum", searchSite: "dalarnasmuseum.se", search: { type: "site", site: "dalarnasmuseum.se" } },
        { id: "vastmanlandsmuseum", label: "Västmanlands museum", searchSite: "vastmanlandslansmuseum.se", search: { type: "site", site: "vastmanlandslansmuseum.se" } },
        { id: "sbl", label: "Svenskt biografiskt lexikon", searchSite: "sok.riksarkivet.se/sbl", search: { type: "site", site: "sok.riksarkivet.se/sbl" } },
        { id: "blf", label: "Biografiskt lexikon Finland", searchSite: "blf.fi", search: { type: "site", site: "blf.fi" } },
        { id: "biografiasampo", label: "Biografiasampo", searchSite: "biografiasampo.fi", search: { type: "site", site: "biografiasampo.fi" } },
        { id: "personhistoriska", label: "Personhistoriska samfundet", searchSite: "personhistoriskasamfundet.org", search: { type: "site", site: "personhistoriskasamfundet.org" } }
    ];

    function encode(value) {
        return encodeURIComponent(value);
    }

    function fetchJson(url) {
        return fetch(url).then(function(response) {
            if (!response.ok) {
                throw new Error("Kunde inte läsa " + url);
            }

            return response.json();
        });
    }

    function initMetaSearch() {
        var form = document.getElementById("history-search-form");
        var queryInput = document.getElementById("history-search-query");
        var placeButton = document.getElementById("history-search-place-button");
        var placeContainer = document.getElementById("history-place-filters");
        var sourceContainer = document.getElementById("history-source-filters");
        var selectAllButton = document.getElementById("history-select-all-sources");
        var clearButton = document.getElementById("history-clear-sources");
        var queryPreview = document.getElementById("history-query-preview");
        var status = document.getElementById("history-search-status");
        var sources = [];
        var directSearchLimit = 3;

        if (!form || !queryInput || !placeButton || !placeContainer || !sourceContainer || !status) {
            return;
        }

        function googleSiteSearch(site, query) {
            return "https://www.google.com/search?q=" + encode("site:" + site + " " + query);
        }

        function googleSourcesSearch(selectedSources, query) {
            var siteFilters = selectedSources
                .map(function(source) {
                    return source.searchSite;
                })
                .filter(Boolean)
                .map(function(site) {
                    return "site:" + site;
                });

            if (!siteFilters.length) {
                return "https://www.google.com/search?q=" + encode(query);
            }

            return "https://www.google.com/search?q=" + encode(query + " (" + siteFilters.join(" OR ") + ")");
        }

        function sourceSearchUrl(source, query) {
            if (!source.search) {
                return googleSourcesSearch([source], query);
            }

            if (source.search.type === "site") {
                return googleSiteSearch(source.search.site || source.searchSite, query);
            }

            if (source.search.type === "template") {
                return source.search.url.replace("{query}", encode(query));
            }

            return googleSourcesSearch([source], query);
        }

        function createChoiceLabel(input, text) {
            var label = document.createElement("label");
            label.appendChild(input);
            label.appendChild(document.createTextNode(" " + text));
            return label;
        }

        function renderPlaces() {
            placeContainer.innerHTML = "";

            placeFilters.forEach(function(place, index) {
                var input = document.createElement("input");
                input.type = "radio";
                input.name = "place";
                input.value = place;
                input.checked = index === 0;
                placeContainer.appendChild(createChoiceLabel(input, place || "Inget platsfilter"));
            });
        }

        function renderSources(nextSources) {
            sources = nextSources;
            sourceContainer.innerHTML = "";

            sources.forEach(function(source) {
                var input = document.createElement("input");
                input.type = "checkbox";
                input.name = "source";
                input.value = source.id;
                input.checked = source.checked !== false;
                sourceContainer.appendChild(createChoiceLabel(input, source.label));
            });

            updatePreview(false);
        }

        function getSelectedPlace() {
            var selected = form.querySelector("input[name='place']:checked");
            return selected ? selected.value.trim() : "";
        }

        function getSelectedSources() {
            return Array.prototype.slice.call(form.querySelectorAll("input[name='source']:checked"))
                .map(function(input) {
                    return sources.find(function(source) {
                        return source.id === input.value;
                    });
                })
                .filter(Boolean);
        }

        function getSearchText(usePlaceFilter) {
            var parts = [queryInput.value.trim()];
            var place = usePlaceFilter ? getSelectedPlace() : "";

            if (place) {
                parts.push(place);
            }

            return parts.filter(Boolean).join(" ");
        }

        function updatePreview(usePlaceFilter) {
            var searchText = getSearchText(usePlaceFilter);

            if (queryPreview) {
                queryPreview.textContent = searchText ? "Sökningen blir: " + searchText : "";
            }

            return searchText;
        }

        function setAllSources(checked) {
            Array.prototype.slice.call(form.querySelectorAll("input[name='source']")).forEach(function(input) {
                input.checked = checked;
            });
            updatePreview(false);
            status.textContent = checked ? "Alla källor är valda." : "Alla källor är avmarkerade.";
        }

        function runSearch(usePlaceFilter) {
            var searchText = updatePreview(usePlaceFilter);
            var selectedSources = getSelectedSources();
            var started = 0;

            if (!searchText) {
                status.textContent = "Skriv ett sökord eller välj ett platsfilter.";
                queryInput.focus();
                return;
            }

            if (!selectedSources.length) {
                status.textContent = "Välj minst en källa.";
                return;
            }

            if (selectedSources.length > directSearchLimit) {
                window.open(googleSourcesSearch(selectedSources, searchText), "_blank", "noopener,noreferrer");
                status.textContent = "Öppnade en samlad sökning i valda källor för: " + searchText;
                return;
            }

            selectedSources.forEach(function(source) {
                window.open(sourceSearchUrl(source, searchText), "_blank", "noopener,noreferrer");
                started += 1;
            });

            status.textContent = "Startade " + started + " sökningar för: " + searchText;
        }

        renderPlaces();

        fetchJson("search-sources.json")
            .then(renderSources)
            .catch(function() {
                renderSources(fallbackSearchSources);
                status.textContent = "";
            });

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            runSearch(false);
        });

        placeButton.addEventListener("click", function() {
            runSearch(true);
        });

        queryInput.addEventListener("input", function() {
            updatePreview(false);
        });

        form.addEventListener("change", function(event) {
            updatePreview(event.target && event.target.name === "place");
        });

        if (selectAllButton) {
            selectAllButton.addEventListener("click", function() {
                setAllSources(true);
            });
        }

        if (clearButton) {
            clearButton.addEventListener("click", function() {
                setAllSources(false);
            });
        }
    }

    initMetaSearch();
})();
