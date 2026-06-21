(function() {
    "use strict";

    var date = document.getElementById("scm-date");
    var form = document.getElementById("scm-search-form");
    var query = document.getElementById("scm-query");
    var feedList = document.getElementById("scm-feed-list");
    var feedStatus = document.getElementById("scm-feed-status");
    var feedSection = document.querySelector(".infosec-feed");
    var parser = new DOMParser();

    var searchDomains = [
        "dagenslogistik.se",
        "transportnytt.se",
        "logistiknorden.se",
        "sceffect.se",
        "supplychaindive.com",
        "plan.se",
        "ascm.org",
        "chalmers.se",
        "lth.se"
    ];

    // Lägg till fler RSS-flöden här. Sidan använder bara färdiga flödes-URL:er.
    var feedSources = [
        { name: "Dagens Logistik", url: "https://dagenslogistik.se/feed/" },
        { name: "Transportnytt", url: "https://transportnytt.se/feed/" },
        { name: "Logistiknorden", url: "https://www.logistiknorden.se/rss" },
        { name: "SC Effect", url: "https://sceffect.se/feed/" },
        { name: "Supply Chain Dive", url: "https://www.supplychaindive.com/feeds/news/" }
    ];

    function encode(value) {
        return encodeURIComponent(value);
    }

    function cleanText(value, maxLength) {
        var div = document.createElement("div");
        div.innerHTML = value || "";
        var text = (div.textContent || div.innerText || "").replace(/\s+/g, " ").trim();

        if (text.length > maxLength) {
            return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
        }

        return text;
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
            return rssLink.textContent.trim();
        }

        return feedUrl;
    }

    function dateFrom(item) {
        return textFrom(item, "pubDate") || textFrom(item, "updated") || textFrom(item, "published");
    }

    function readXmlFeed(xmlText, source) {
        var doc = parser.parseFromString(xmlText, "text/xml");
        var items = Array.prototype.slice.call(doc.querySelectorAll("item, entry"));

        return items.slice(0, 5).map(function(item) {
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

        return items.slice(0, 5).map(function(item) {
            var rawDate = item.pubDate || item.published || item.date || "";
            var parsedDate = rawDate ? new Date(rawDate) : new Date(0);

            return {
                source: source.name,
                title: cleanText(item.title, 120),
                link: item.link || item.guid || source.url,
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
        }).slice(0, 15);

        feedList.innerHTML = "";

        if (!uniqueItems.length) {
            feedStatus.textContent = "Kunde inte läsa in logistikflöden just nu. Käll-länkarna ovan fungerar fortfarande.";
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
})();
