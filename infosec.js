(function() {
    "use strict";

    var date = document.getElementById("infosec-date");
    var form = document.getElementById("infosec-search-form");
    var query = document.getElementById("infosec-query");
    var feedList = document.getElementById("infosec-feed-list");
    var feedStatus = document.getElementById("infosec-feed-status");
    var feedSection = document.querySelector(".infosec-feed");
    var checklistItems = Array.prototype.slice.call(document.querySelectorAll("[data-infosec-check]"));
    var parser = new DOMParser();
    var checklistStorageKey = "infosec-home-checklist";

    // Metasöken hålls fokuserad på standarder, ramverk och sårbarhetsdatabaser.
    var searchDomains = [
        "iso.org",
        "nist.gov",
        "csrc.nist.gov",
        "nvd.nist.gov",
        "cve.org",
        "cisa.gov",
        "mitre.org",
        "attack.mitre.org",
        "thebci.org"
    ];

    // Lägg till fler RSS-flöden här. Sidan använder bara färdiga flödes-URL:er.
    var feedSources = [
        { name: "CERT-SE", url: "https://www.cert.se/feed/atom.xml" },
        { name: "Aktuell Säkerhet", url: "https://www.aktuellsakerhet.se/feed" },
        { name: "SecurityWorldMarket SE", url: "https://www.securityworldmarket.com/se/rss" },
        { name: "SecurityWorldMarket INT", url: "https://www.securityworldmarket.com/int/rss" },
        { name: "CISA Advisories", url: "https://www.cisa.gov/cybersecurity-advisories/all.xml" },
        { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/" },
        { name: "Infosecurity Magazine", url: "https://www.infosecurity-magazine.com/rss/news/" },
        { name: "Cybersecurity Dive", url: "https://www.cybersecuritydive.com/feeds/news/" },
        { name: "WIRED Security", url: "https://www.wired.com/feed/category/security/latest/rss" },
        { name: "The Register Security", url: "https://www.theregister.com/security/headlines.atom" },
        { name: "Information Security Buzz", url: "https://informationsecuritybuzz.com/feed/" },
        { name: "Computer Sweden", url: "https://computersweden.se/feed/" },
        { name: "Security Now", url: "https://feeds.twit.tv/sn.xml" },
        { name: "Smashing Security", url: "https://www.smashingsecurity.com/feed/" },
        { name: "Bli säker-podden", url: "https://podcast.nikkasystems.com/@blisaker/feed.xml" },
        { name: "SecurityWeek", url: "https://www.securityweek.com/feed/" },
        { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
        { name: "NIST NVD", url: "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml" }
    ];

    function encode(value) {
        return encodeURIComponent(value);
    }

    function decodeHTMLText(value) {
        var div = document.createElement("div");
        var text = String(value || "");

        for (var index = 0; index < 3; index += 1) {
            div.innerHTML = text;
            var decoded = div.textContent || div.innerText || "";

            if (decoded === text) {
                break;
            }

            text = decoded;
        }

        return text;
    }

    function cleanText(value, maxLength) {
        var text = decodeHTMLText(value).replace(/\s+/g, " ").trim();

        if (text.length > maxLength) {
            return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
        }

        return text;
    }

    function cleanLink(value) {
        return decodeHTMLText(value).replace(/\s+/g, "").trim();
    }

    function textFrom(node, selector) {
        var match = node.querySelector(selector);
        return match ? match.textContent.trim() : "";
    }

    function linkFrom(item, feedUrl) {
        var atomLink = item.querySelector("link[href]");
        var rssLink = item.querySelector("link");

        if (atomLink) {
            return atomLink.getAttribute("href");
        }

        if (rssLink && rssLink.textContent.trim()) {
            return cleanLink(rssLink.textContent);
        }

        return feedUrl;
    }

    function dateFrom(item) {
        return textFrom(item, "pubDate") || textFrom(item, "updated") || textFrom(item, "published");
    }

    function readXmlFeed(xmlText, source) {
        var doc = parser.parseFromString(xmlText, "text/xml");
        var items = Array.prototype.slice.call(doc.querySelectorAll("item, entry"));

        return items.slice(0, 4).map(function(item) {
            var rawDate = dateFrom(item);
            var parsedDate = rawDate ? new Date(rawDate) : new Date(0);

            return {
                source: source.name,
                title: cleanText(textFrom(item, "title"), 120),
                link: linkFrom(item, source.url),
                timestamp: isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime()
            };
        }).filter(function(item) {
            return item.title && item.link;
        });
    }

    function readJsonFeed(data, source) {
        var items = Array.isArray(data.items) ? data.items : [];

        return items.slice(0, 4).map(function(item) {
            var rawDate = item.pubDate || item.published || item.date || "";
            var parsedDate = rawDate ? new Date(rawDate) : new Date(0);

            return {
                source: source.name,
                title: cleanText(item.title, 120),
                link: cleanLink(item.link || item.guid || source.url),
                timestamp: isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime()
            };
        }).filter(function(item) {
            return item.title && item.link;
        });
    }

    function fetchWithTimeout(url, timeout) {
        var controller = new AbortController();
        var timer = setTimeout(function() {
            controller.abort();
        }, timeout);

        return fetch(url, { signal: controller.signal })
            .finally(function() {
                clearTimeout(timer);
            });
    }

    function fetchFeed(source) {
        var proxyUrls = [
            { type: "xml", url: "https://api.allorigins.win/raw?url=" + encode(source.url) },
            { type: "allorigins-json", url: "https://api.allorigins.win/get?url=" + encode(source.url) },
            { type: "rss-json", url: "https://api.rss2json.com/v1/api.json?rss_url=" + encode(source.url) },
            { type: "xml", url: "https://api.codetabs.com/v1/proxy?quest=" + encode(source.url) }
        ];

        function tryProxy(index) {
            if (index >= proxyUrls.length) {
                return [];
            }

            return fetchWithTimeout(proxyUrls[index].url, 9000)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error("Kunde inte hämta " + source.name);
                    }

                    return proxyUrls[index].type === "xml" ? response.text() : response.json();
                })
                .then(function(result) {
                    if (proxyUrls[index].type === "allorigins-json") {
                        return readXmlFeed(result.contents || "", source);
                    }

                    if (proxyUrls[index].type === "rss-json") {
                        return readJsonFeed(result, source);
                    }

                    return readXmlFeed(result, source);
                })
                .then(function(items) {
                    if (!items.length) {
                        throw new Error("Tomt flöde");
                    }

                    return items;
                })
                .catch(function() {
                    return tryProxy(index + 1);
                });
        }

        return tryProxy(0);
    }

    function createFeedItem(item) {
        var entry = document.createElement("li");
        var link = document.createElement("a");
        var source = document.createElement("span");

        source.className = "infosec-feed-source";
        source.textContent = item.source;

        link.href = item.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = item.title;

        entry.appendChild(source);
        entry.appendChild(link);

        return entry;
    }

    function renderFeeds(items) {
        var seen = {};
        var uniqueItems = items.filter(function(item) {
            var key = item.link || item.title;

            if (seen[key]) {
                return false;
            }

            seen[key] = true;
            return true;
        }).sort(function(a, b) {
            return b.timestamp - a.timestamp;
        }).slice(0, 14);

        feedList.innerHTML = "";

        if (!uniqueItems.length) {
            feedStatus.textContent = "Kunde inte läsa in säkerhetsflöden just nu. Käll-länkarna ovan fungerar fortfarande.";
            feedSection.setAttribute("aria-busy", "false");
            return;
        }

        uniqueItems.forEach(function(item) {
            feedList.appendChild(createFeedItem(item));
        });

        feedStatus.textContent = "";
        feedSection.setAttribute("aria-busy", "false");
    }

    function loadFeeds() {
        if (!feedList || !feedStatus || !feedSection) {
            return;
        }

        Promise.all(feedSources.map(fetchFeed)).then(function(results) {
            renderFeeds([].concat.apply([], results));
        }).catch(function() {
            renderFeeds([]);
        });
    }

    function loadChecklistState() {
        if (!checklistItems.length) {
            return {};
        }

        try {
            return JSON.parse(localStorage.getItem(checklistStorageKey) || "{}");
        } catch (error) {
            return {};
        }
    }

    function saveChecklistState(state) {
        try {
            localStorage.setItem(checklistStorageKey, JSON.stringify(state));
        } catch (error) {
            // Checklistan fungerar fortfarande även om webbläsaren blockerar lagring.
        }
    }

    function setupChecklist() {
        var state = loadChecklistState();

        checklistItems.forEach(function(item) {
            var key = item.getAttribute("data-infosec-check");

            item.checked = Boolean(state[key]);

            item.addEventListener("change", function() {
                state[key] = item.checked;
                saveChecklistState(state);
            });
        });
    }

    if (date) {
        date.textContent = new Date().toLocaleDateString("sv-SE");
    }

    if (form && query) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            var searchText = query.value.trim();

            if (!searchText) {
                query.focus();
                return;
            }

            var domainQuery = searchDomains.map(function(domain) {
                return "site:" + domain;
            }).join(" OR ");

            window.open("https://www.google.com/search?q=" + encode("(" + domainQuery + ") " + searchText), "_blank", "noopener");
        });
    }

    loadFeeds();
    setupChecklist();
})();
