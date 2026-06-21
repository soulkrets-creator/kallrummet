(function () {
    "use strict";

    var state = {
        feedFilter: "all",
        liveFeedItems: []
    };

    var elements = {
        feedControls: document.getElementById("icFeedControls"),
        feedStatus: document.getElementById("icFeedStatus"),
        feedResults: document.getElementById("icFeedResults"),
        youtubeStatus: document.getElementById("spursYoutubeStatus"),
        youtubeResults: document.getElementById("spursYoutubeResults")
    };

    var youtubeSources = [
        { name: "Last Word On Spurs", shortName: "Last Word On Spurs", group: "YouTube", url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCbqK092y4W290g_C3tuKEbg", home: "https://www.youtube.com/@LastWordOnSpurs", directFirst: true },
        { name: "Harry Hotspur", shortName: "Harry Hotspur", group: "YouTube", url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCObGvDVuclUn12bjpaylunw", home: "https://www.youtube.com/@HarryHotspurDotCom", directFirst: true },
        { name: "SpotliteOnSpurs", shortName: "SpotliteOnSpurs", group: "YouTube", url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCiexKnvpyZ0E__UA5AEsMug", home: "https://www.youtube.com/@SpotliteOnSpurs", directFirst: true },
        { name: "DANalyst", shortName: "DANalyst", group: "YouTube", url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC-tsZO1o5wAnUeFTZLN2GJQ", home: "https://www.youtube.com/@DANalystTV", directFirst: true },
        { name: "The Two Marks Show", shortName: "The Two Marks Show", group: "YouTube", url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCPqoU9jKmCbcSEvoxCTXJXw", home: "https://www.youtube.com/channel/UCPqoU9jKmCbcSEvoxCTXJXw", directFirst: true },
        { name: "Rule the Roost", shortName: "Rule the Roost", group: "YouTube", url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCLR1P3I2mBtV_QfPL0ppx-w", home: "https://www.youtube.com/@tehTrunk", directFirst: true }
    ];

    var feedSources = [
        { name: "Hammarby Fotboll Herr", shortName: "Hammarby", group: "Svenskt", url: "https://www.hammarbyfotboll.se/feed/herrarrss.xml", home: "https://www.hammarbyfotboll.se/herr/", directFirst: true },
        { name: "Fotbollskanalen", shortName: "Fotbollskanalen", group: "Svenskt", url: "https://www.fotbollskanalen.se/", home: "https://www.fotbollskanalen.se/", readerFirst: true, readerFallback: true, readerTimeout: 14000 },
        { name: "Nästa år då jävlar", shortName: "Nästa år", group: "Bajen", url: "https://anchor.fm/s/10f1db48c/podcast/rss", home: "https://anchor.fm/s/10f1db48c/podcast/rss", directFirst: true, readerFallback: true },
        { name: "Här va de livat", shortName: "Här va de livat", group: "Bajen", url: "https://anchor.fm/s/10f759c10/podcast/rss", home: "https://anchor.fm/s/10f759c10/podcast/rss", directFirst: true, readerFallback: true },
        { name: "Bajenpodden", shortName: "Bajenpodden", group: "Bajen", url: "https://feeds.acast.com/public/shows/8c1b32bb-9cf1-4624-9c24-01b80b8aadfd", home: "https://feeds.acast.com/public/shows/8c1b32bb-9cf1-4624-9c24-01b80b8aadfd", directFirst: true, readerFallback: true },
        { name: "Bajen Idag!", shortName: "Bajen Idag", group: "Bajen", url: "https://feed.pod.space/bajenidag", home: "https://feed.pod.space/bajenidag", directFirst: true, readerFallback: true },
        { name: "Sky Sports Football", shortName: "Sky Football", group: "Nyheter", url: "https://www.skysports.com/rss/11095", home: "https://www.skysports.com/football/news" },
        { name: "BBC Sport Football", shortName: "BBC Football", group: "Nyheter", url: "https://feeds.bbci.co.uk/sport/football/rss.xml", home: "https://www.bbc.com/sport/football", directFirst: true, readerFallback: true },
        { name: "Aftonbladet Fotboll", shortName: "Aftonbladet Fotboll", group: "Nyheter", url: "https://rss.aftonbladet.se/rss2/small/pages/sections/sportbladet/fotboll", home: "https://www.aftonbladet.se/sportbladet/fotboll", directFirst: true, readerFallback: true },
        { name: "Expressen Fotboll", shortName: "Expressen Fotboll", group: "Nyheter", url: "https://feeds.expressen.se/fotboll/", home: "https://www.expressen.se/sport/fotboll/", directFirst: true, readerFallback: true },
        { name: "The Totally Football Show with James Richardson", shortName: "Totally Football", group: "Analys", url: "https://feeds.acast.com/public/shows/6818cd43eb146d8e35d312c7", home: "https://shows.acast.com/6818cd43eb146d8e35d312c7", directFirst: true, readerFallback: true },
        { name: "Football Weekly", shortName: "Football Weekly", group: "Analys", url: "https://www.theguardian.com/football/series/footballweekly/podcast.xml", home: "https://www.theguardian.com/football/series/footballweekly", directFirst: true, readerFallback: true },
        { name: "Fotbollsmorgon", shortName: "Fotbollsmorgon", group: "Poddar", url: "https://feeds.acast.com/public/shows/677d65131f00b28b23b9d6c6", home: "https://feeds.acast.com/public/shows/677d65131f00b28b23b9d6c6", directFirst: true, readerFallback: true },
        { name: "Second Tier - The Championship Football Podcast", shortName: "Second Tier", group: "Poddar", url: "https://feeds.acast.com/public/shows/64c13018dc471e0011153d21", home: "https://feeds.acast.com/public/shows/64c13018dc471e0011153d21", directFirst: true, readerFallback: true },
        { name: "Stryktipspodden", shortName: "Stryktipspodden", group: "Stryktipset", url: "https://feed.podbean.com/stryktipspodden/feed.xml", home: "https://feed.podbean.com/stryktipspodden/feed.xml", directFirst: true, readerFallback: true },
        { name: "Stryket - Din genväg till 13 rätt på Stryktipset", shortName: "Stryket", group: "Stryktipset", url: "https://anchor.fm/s/108e54b84/podcast/rss", home: "https://anchor.fm/s/108e54b84/podcast/rss", directFirst: true, readerFallback: true },
        { name: "Football Cliches", shortName: "Football Cliches", group: "Poddar", url: "https://feeds.megaphone.fm/GLT7974369854", home: "https://feeds.megaphone.fm/GLT7974369854", directFirst: true, readerFallback: true },
        { name: "The Rest Is Football", shortName: "Rest Is Football", group: "Poddar", url: "https://feeds.megaphone.fm/GLT8847082992", home: "https://feeds.megaphone.fm/GLT8847082992", directFirst: true, readerFallback: true },
        { name: "Fotbollsmagasinet Offside", shortName: "Offside", group: "Poddar", url: "https://feed.pod.space/offsidespodcast", home: "https://feed.pod.space/offsidespodcast", directFirst: true, readerFallback: true },
        { name: "That Peter Crouch Podcast", shortName: "Peter Crouch", group: "Poddar", url: "https://feeds.acast.com/public/shows/6242e9f71c8beb00139400a6", home: "https://shows.acast.com/6242e9f71c8beb00139400a6", directFirst: true, readerFallback: true },
        { name: "Revista de la Liga with Graham Hunter", shortName: "Revista de la Liga", group: "Poddar", url: "https://api.substack.com/feed/podcast/2777468.rss", home: "https://www.revistadelaliga.com/", directFirst: true, readerFallback: true },
        { name: "The Football Boardroom", shortName: "Football Boardroom", group: "Ekonomi", url: "https://feeds.megaphone.fm/thefootballboardroom", home: "https://feeds.megaphone.fm/thefootballboardroom", directFirst: true, readerFallback: true },
        { name: "The Price of Football", shortName: "Price of Football", group: "Ekonomi", url: "https://feeds.megaphone.fm/thepriceoffootball", home: "https://priceoffootball.com/", directFirst: true, readerFallback: true },
        { name: "Last Word On Spurs", shortName: "Last Word On Spurs", group: "England", url: "https://feeds.megaphone.fm/COMG6410538070", home: "https://feeds.megaphone.fm/COMG6410538070", directFirst: true, readerFallback: true },
        { name: "Football Insider", shortName: "Football Insider", group: "England", url: "https://www.footballinsider247.com/feed", home: "https://www.footballinsider247.com/", directFirst: true, readerFallback: true },
        { name: "Football London", shortName: "Football London", group: "England", url: "https://www.football.london/?service=rss", home: "https://www.football.london/", directFirst: true, readerFallback: true },
        { name: "The Guardian Football", shortName: "Guardian Football", group: "England", url: "https://www.theguardian.com/football/rss", home: "https://www.theguardian.com/football", directFirst: true, readerFallback: true },
        { name: "The Independent Football", shortName: "Independent Football", group: "England", url: "https://www.independent.co.uk/sport/football/rss", home: "https://www.independent.co.uk/sport/football", directFirst: true, readerFallback: true },
        { name: "talkSPORT", shortName: "talkSPORT", group: "England", url: "https://talksport.com/feed/", home: "https://talksport.com/football/", directFirst: true, readerFallback: true },
        { name: "Martin Lipton", shortName: "Martin Lipton", group: "England", url: "https://www.thesun.co.uk/author/martin-lipton/feed/", home: "https://www.thesun.co.uk/author/martin-lipton/", directFirst: true, readerFallback: true },
        { name: "Tom Barclay", shortName: "Tom Barclay", group: "England", url: "https://www.thesun.co.uk/author/tom-barclay/feed/", home: "https://www.thesun.co.uk/author/tom-barclay/", directFirst: true, readerFallback: true },
        { name: "Marca Football", shortName: "Marca", group: "Internationellt", url: "https://www.marca.com/en/rss/googlenews/football.xml", home: "https://www.marca.com/en/football.html", directFirst: true, readerFallback: true },
        { name: "El Periodico Barca", shortName: "El Periodico Barca", group: "Internationellt", url: "https://www.elperiodico.com/es/rss/barca/rss.xml", home: "https://www.elperiodico.com/es/barca/", directFirst: true, readerFallback: true },
        { name: "SPORT La Liga", shortName: "SPORT La Liga", group: "Internationellt", url: "https://www.sport.es/es/rss/la-liga/rss.xml", home: "https://www.sport.es/es/la-liga/", directFirst: true, readerFallback: true },
        { name: "France 24 Football", shortName: "France 24", group: "Internationellt", url: "https://www.france24.com/en/tag/football/rss", home: "https://www.france24.com/en/tag/football/", directFirst: true, readerFallback: true }
    ];

    var feedFilters = [
        { name: "Alla", value: "all" },
        { name: "Nyheter", value: "news", groups: ["Nyheter"], sources: ["Fotbollskanalen", "Guardian Football", "Independent Football", "El Periodico Barca", "SPORT La Liga", "France 24"] },
        { name: "Poddar", value: "podcasts", groups: ["Poddar", "Analys", "Stryktipset", "Bajen"] },
        { name: "Bajen", value: "bajen", groups: ["Bajen"], sources: ["Hammarby"] },
        { name: "Stryktipset", value: "stryktipset", groups: ["Stryktipset"] },
        { name: "Ekonomi", value: "business", groups: ["Ekonomi"] },
        { name: "Svenskt", value: "sweden", groups: ["Svenskt", "Bajen"], sources: ["Aftonbladet Fotboll", "Expressen Fotboll", "Offside"] },
        { name: "England", value: "england", groups: ["England"], sources: ["Sky Football", "BBC Football", "Football Weekly", "Football Cliches", "Rest Is Football", "Peter Crouch", "Totally Football", "Second Tier", "Last Word On Spurs", "Football Insider", "Football London", "Guardian Football", "Independent Football", "talkSPORT", "Martin Lipton", "Tom Barclay"] },
        { name: "Internationellt", value: "international", groups: ["Internationellt"] }
    ];

    var fallbackFeedItems = feedSources.reduce(function (items, feed) {
        if (Array.isArray(feed.fallbackItems) && feed.fallbackItems.length) {
            return items.concat(feed.fallbackItems.map(function (fallbackItem) {
                var date = fallbackItem.date ? new Date(fallbackItem.date) : new Date(0);

                return {
                    source: feed.shortName,
                    group: feed.group,
                    title: fallbackItem.title,
                    description: "Källans RSS svarar inte just nu, men listan visar en fast ingång till källan.",
                    link: fallbackItem.link,
                    timestamp: isNaN(date.getTime()) ? 0 : date.getTime(),
                    fallback: true
                };
            }));
        }

        items.push({
            source: feed.shortName,
            group: feed.group,
            title: feed.name,
            description: "Öppna fotbollskällan direkt medan liveflödena uppdateras.",
            link: feed.home,
            timestamp: 0,
            fallback: true
        });

        return items;
    }, []);

    function escapeHTML(value) {
        return String(value || "").replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
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
        var text = decodeHTMLText(value)
            .replace(/\s*Hosted on Acast\. See acast\.com\/privacy for more information\.?/gi, " ")
            .replace(/\s+/g, " ")
            .trim();

        if (text.length > maxLength) {
            return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
        }

        return text;
    }

    function correctedReaderTitle(title, feed) {
        var corrections = {
            "ingredienserna|magnus nilsson sa var aren med faviken": "Magnus Nilsson: Så var åren med Fäviken"
        };
        var key = String(feed.shortName || feed.name || "").toLowerCase() + "|" + String(title || "").toLowerCase();
        var corrected = corrections[key] || title;

        if ((feed.shortName || feed.name) === "Ingredienserna") {
            corrected = corrected
                .replace(/\bSa\b/g, "Så")
                .replace(/\bAren\b/g, "Åren")
                .replace(/\bFaviken\b/g, "Fäviken")
                .replace(/\bFran\b/g, "Från");
        }

        if ((feed.shortName || feed.name) === "Fotbollskanalen") {
            corrected = corrected.replace(/\s+Datum\s+.*$/i, "");
        }

        return corrected;
    }

    function textFrom(node, names) {
        var i;

        for (i = 0; i < names.length; i += 1) {
            var direct = null;
            var selector = names[i].replace(/:/g, "\\:");

            try {
                direct = node.querySelector(selector);
            } catch (error) {
                direct = null;
            }

            if (direct && direct.textContent) {
                return direct.textContent.trim();
            }

            var namespaced = node.getElementsByTagName(names[i])[0];
            if (namespaced && namespaced.textContent) {
                return namespaced.textContent.trim();
            }
        }

        return "";
    }

    function linkFrom(item, feed) {
        var atomLink = item.querySelector("link[href]");
        var rssLink = textFrom(item, ["link"]);
        var guid = textFrom(item, ["guid", "id"]);

        if (atomLink) {
            return atomLink.getAttribute("href");
        }

        if (rssLink) {
            return rssLink;
        }

        if (guid && /^https?:\/\//i.test(guid)) {
            return guid;
        }

        return feed.home;
    }

    function readXmlFeed(xmlText, feed) {
        var doc = new DOMParser().parseFromString(xmlText, "text/xml");
        var items = Array.from(doc.querySelectorAll("item, entry"));

        if (!items.length) {
            items = Array.from(doc.querySelectorAll("url"));

            return items.slice(0, 5).map(function (item) {
                var rawDate = textFrom(item, ["news:publication_date", "lastmod"]);
                var date = rawDate ? new Date(rawDate) : new Date(0);
                var link = textFrom(item, ["loc"]);
                var title = textFrom(item, ["news:title"]);

                if (!title && link) {
                    title = decodeURIComponent(link.split("/").filter(Boolean).pop() || feed.name).replace(/[-_]+/g, " ");
                }

                return {
                    source: feed.shortName,
                    group: feed.group,
                    title: cleanText(title || feed.name, 118),
                    description: "Senaste fotbollslänk från sitemap-flödet.",
                    link: link || feed.home,
                    timestamp: isNaN(date.getTime()) ? 0 : date.getTime()
                };
            }).filter(function (item) {
                return item.title && item.link;
            });
        }

        return items.slice(0, 5).map(function (item) {
            var rawDate = textFrom(item, ["pubDate", "updated", "published", "dc:date"]);
            var date = rawDate ? new Date(rawDate) : new Date(0);
            var description = textFrom(item, ["description", "summary", "content", "content:encoded", "media:description"]);

            return {
                source: feed.shortName,
                group: feed.group,
                title: cleanText(textFrom(item, ["title"]), 118),
                description: cleanText(description, 170),
                link: linkFrom(item, feed),
                timestamp: isNaN(date.getTime()) ? 0 : date.getTime()
            };
        }).filter(function (item) {
            return item.title && item.link;
        });
    }

    function readJsonFeed(data, feed) {
        var items = Array.isArray(data.items) ? data.items : [];

        return items.slice(0, 5).map(function (item) {
            var rawDate = item.pubDate || item.published || item.date || "";
            var date = rawDate ? new Date(rawDate) : new Date(0);

            return {
                source: feed.shortName,
                group: feed.group,
                title: cleanText(item.title, 118),
                description: cleanText(item.description || item.content || item.content_text || "", 170),
                link: item.link || item.guid || feed.home,
                timestamp: isNaN(date.getTime()) ? 0 : date.getTime()
            };
        }).filter(function (item) {
            return item.title && item.link;
        });
    }

    function absoluteUrl(value, baseUrl) {
        try {
            return new URL(value, baseUrl).href;
        } catch (error) {
            return "";
        }
    }

    function matchesHtmlSource(href, feed) {
        if (!Array.isArray(feed.htmlMatches) || !feed.htmlMatches.length) {
            return true;
        }

        return feed.htmlMatches.some(function (match) {
            return href.indexOf(match) !== -1;
        });
    }

    function readHtmlFeed(htmlText, feed) {
        var doc = new DOMParser().parseFromString(htmlText, "text/html");
        var seen = new Set();
        var nodes = Array.from(doc.querySelectorAll(feed.htmlSelector || "a[href]"));

        return nodes.map(function (node, index) {
            var anchor = node.matches && node.matches("a[href]") ? node : node.querySelector("a[href]");
            var titleNode = feed.htmlTitleSelector ? node.querySelector(feed.htmlTitleSelector) : null;
            var titleSource;

            if (!anchor) {
                return null;
            }

            var link = absoluteUrl(anchor.getAttribute("href"), feed.htmlUrl || feed.home);
            titleSource = titleNode ? titleNode.textContent : anchor.textContent || anchor.getAttribute("aria-label") || "";

            var title = cleanText(titleSource, 118);

            if (!link || !matchesHtmlSource(link, feed) || !title || title.length < 4 || /^open\b/i.test(title)) {
                return null;
            }

            if (seen.has(link)) {
                return null;
            }

            seen.add(link);

            return {
                source: feed.shortName,
                group: feed.group,
                title: title,
                description: "Aktuell länk från källans webbsida, hämtad eftersom RSS-flödet för tillfället är tomt.",
                link: link,
                timestamp: Date.now() - index,
                syntheticDate: true
            };
        }).filter(Boolean).slice(0, 5);
    }

    function titleFromUrl(link) {
        var slug = "";

        try {
            slug = new URL(link).pathname.split("/").filter(Boolean).pop() || "";
        } catch (error) {
            slug = "";
        }

        return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
    }

    function readReaderFeed(text, feed) {
        var lines = String(text || "").split(/\r?\n/);
        var items = [];
        var seen = new Set();

        lines.forEach(function (line, index) {
            var match = line.match(/^(?:\*\s+)?### \[([^\]]*)\]\((https?:\/\/[^)]+)\)/);
            var rawDate;
            var date;
            var hasDate;
            var title;

            if (!match || seen.has(match[2])) {
                return;
            }

            rawDate = (lines.slice(index + 1, index + 6).find(function (candidate) {
                return /^[A-Z][a-z]{2}, \d{1,2} [A-Z][a-z]{2} \d{4}/.test(candidate);
            }) || "").trim();
            hasDate = Boolean(rawDate);
            date = hasDate ? new Date(rawDate) : new Date(0);
            title = cleanText(match[1] || titleFromUrl(match[2]), 118);
            title = correctedReaderTitle(title, feed);

            if (!title || title.length < 4) {
                return;
            }

            seen.add(match[2]);
            items.push({
                source: feed.shortName,
                group: feed.group,
                title: title,
                description: "H\u00e4mtat via reservl\u00e4sare eftersom de vanliga proxyerna svarade med tomma h\u00e4nder.",
                link: match[2],
                timestamp: hasDate && !isNaN(date.getTime()) ? date.getTime() : Date.now() - index,
                syntheticDate: !hasDate || isNaN(date.getTime())
            });
        });

        return items.slice(0, 5);
    }

    function fetchWithTimeout(url, timeout) {
        var controller = new AbortController();
        var timer = setTimeout(function () {
            controller.abort();
        }, timeout);

        return fetch(url, { signal: controller.signal }).finally(function () {
            clearTimeout(timer);
        });
    }

    function fetchHtmlFeed(feed) {
        var encoded = encodeURIComponent(feed.htmlUrl);
        var endpoints = [
            { url: "https://api.codetabs.com/v1/proxy?quest=" + encoded }
        ];

        function tryEndpoint(index) {
            if (index >= endpoints.length) {
                throw new Error("HTML feed unavailable: " + feed.shortName);
            }

            return fetchWithTimeout(endpoints[index].url, 7500)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("HTTP " + response.status);
                    }

                    return response.text();
                })
                .then(function (htmlText) {
                    var items = readHtmlFeed(htmlText, feed);
                    if (!items.length) {
                        throw new Error("Empty HTML feed");
                    }
                    return items;
                })
                .catch(function () {
                    return tryEndpoint(index + 1);
                });
        }

        return tryEndpoint(0);
    }

    function fetchReaderFeed(feed) {
        return fetchWithTimeout("https://r.jina.ai/" + feed.url, feed.readerTimeout || 7500)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP " + response.status);
                }

                return response.text();
            })
            .then(function (text) {
                var items = readReaderFeed(text, feed);
                if (!items.length) {
                    throw new Error("Empty reader feed");
                }
                return items;
            });
    }

    function fetchFeed(feed) {
        var encoded = encodeURIComponent(feed.url);
        var endpoints = [];

        if (feed.directFirst) {
            endpoints.push({ type: "xml", url: feed.url });
        }

        endpoints = endpoints.concat([
            { type: "json", url: "https://api.rss2json.com/v1/api.json?rss_url=" + encoded },
            { type: "xml", url: "https://api.allorigins.win/raw?url=" + encoded },
            { type: "allorigins", url: "https://api.allorigins.win/get?url=" + encoded },
            { type: "xml", url: "https://api.codetabs.com/v1/proxy?quest=" + encoded }
        ]);

        function tryEndpoint(index) {
            if (index >= endpoints.length) {
                if (feed.htmlUrl) {
                    return fetchHtmlFeed(feed);
                }
                if (feed.readerFallback || feed.readerFirst) {
                    return fetchReaderFeed(feed);
                }
                throw new Error("Feed unavailable: " + feed.shortName);
            }

            return fetchWithTimeout(endpoints[index].url, 6500)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("HTTP " + response.status);
                    }

                    return endpoints[index].type === "xml" ? response.text() : response.json();
                })
                .then(function (payload) {
                    if (endpoints[index].type === "json") {
                        return readJsonFeed(payload, feed);
                    }

                    if (endpoints[index].type === "allorigins") {
                        return readXmlFeed(payload.contents || "", feed);
                    }

                    return readXmlFeed(payload, feed);
                })
                .then(function (items) {
                    if (!items.length) {
                        throw new Error("Empty feed");
                    }
                    return items;
                })
                .catch(function () {
                    return tryEndpoint(index + 1);
                });
        }

        if (feed.readerFirst) {
            return fetchReaderFeed(feed).catch(function () {
                return tryEndpoint(0);
            });
        }

        return tryEndpoint(0);
    }

    function uniqueFeedItems(items) {
        var seen = new Set();
        return items.filter(function (item) {
            var key = item.link || item.source + item.title;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        }).sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });
    }

    function sourceButtons() {
        return feedFilters;
    }

    function selectedFeedFilter() {
        var i;

        for (i = 0; i < feedFilters.length; i += 1) {
            if (feedFilters[i].value === state.feedFilter) {
                return feedFilters[i];
            }
        }

        return feedFilters[0];
    }

    function itemMatchesFeedFilter(item) {
        var filter = selectedFeedFilter();
        var groups = filter.groups || [];
        var sources = filter.sources || [];

        if (filter.value === "all") {
            return true;
        }

        return groups.indexOf(item.group) !== -1 || sources.indexOf(item.source) !== -1;
    }

    function renderFeedControls() {
        if (!elements.feedControls) {
            return;
        }

        elements.feedControls.innerHTML = sourceButtons().map(function (button) {
            var active = button.value === state.feedFilter;
            return '<button class="ic-feed-button' + (active ? ' is-active' : '') + '" type="button" data-ic-feed-filter="' + escapeHTML(button.value) + '" aria-pressed="' + (active ? "true" : "false") + '">' + escapeHTML(button.name) + '</button>';
        }).join("");
    }

    function formatDate(item) {
        if (!item.timestamp) {
            return "Fast länk";
        }

        if (item.syntheticDate) {
            return "Aktuellt";
        }

        try {
            return new Intl.DateTimeFormat("sv-SE", { month: "short", day: "numeric" }).format(new Date(item.timestamp));
        } catch (error) {
            return "Aktuellt";
        }
    }

    function renderFeeds(items, message) {
        var filtered = state.feedFilter === "all" ? items : items.filter(itemMatchesFeedFilter);
        var visibleItems;
        message = message || "";

        if (!filtered.length && state.feedFilter !== "all") {
            filtered = fallbackFeedItems.filter(itemMatchesFeedFilter);
            message = message || "Inget liveflöde svarade för det valda spåret. Visar fasta käll-länkar tills vidare.";
        }

        visibleItems = state.feedFilter === "all" ? filtered.slice(0, 40) : filtered.slice(0, 16);

        renderFeedControls();

        if (elements.feedStatus) {
            elements.feedStatus.textContent = message || (visibleItems.some(function (item) { return item.fallback; }) ? "Visar fasta käll-länkar eftersom liveflödena inte svarade snabbt." : "Senaste posterna från fotbollsrummets bevakade källor.");
        }

        if (!elements.feedResults) {
            return;
        }

        if (!visibleItems.length) {
            elements.feedResults.innerHTML = '<p class="ic-feed-empty">Inget matchande flöde svarade just nu. Prova ett annat spår eller öppna källorna direkt.</p>';
            return;
        }

        elements.feedResults.innerHTML = visibleItems.map(function (item, index) {
            return [
                '<article class="ic-feed-item' + (index === 0 && state.feedFilter === "all" ? ' ic-feed-item-featured' : '') + '">',
                '<a href="' + escapeHTML(item.link) + '" target="_blank" rel="noopener noreferrer">',
                '<span class="ic-feed-source">' + escapeHTML(item.source) + ' // ' + escapeHTML(item.group) + ' // ' + escapeHTML(formatDate(item)) + '</span>',
                '<h3>' + escapeHTML(item.title) + '</h3>',
                item.description ? '<p>' + escapeHTML(item.description) + '</p>' : '',
                '</a>',
                '</article>'
            ].join("");
        }).join("");
    }

    function saveFeedCache(items) {
        try {
            localStorage.setItem("fotboll-feed-cache-v1", JSON.stringify({ savedAt: Date.now(), items: items }));
        } catch (error) {
            return;
        }
    }

    function loadFeedCache() {
        try {
            var cache = JSON.parse(localStorage.getItem("fotboll-feed-cache-v1") || "null");
            if (cache && Array.isArray(cache.items) && Date.now() - cache.savedAt < 6 * 60 * 60 * 1000) {
                return cache.items;
            }
        } catch (error) {
            return null;
        }

        return null;
    }

    function selectYoutubeItems(items) {
        var grouped = {};
        var selected = [];

        youtubeSources.forEach(function (source) {
            grouped[source.shortName] = [];
        });

        uniqueFeedItems(items).forEach(function (item) {
            if (grouped[item.source] && grouped[item.source].length < 2) {
                grouped[item.source].push(item);
            }
        });

        for (var round = 0; round < 2; round += 1) {
            youtubeSources.forEach(function (source) {
                if (grouped[source.shortName][round]) {
                    selected.push(grouped[source.shortName][round]);
                }
            });
        }

        return selected;
    }

    function renderYoutubeItems(items, message) {
        var selected = selectYoutubeItems(items);

        if (!elements.youtubeResults || !selected.length) {
            if (elements.youtubeStatus && !selected.length) {
                elements.youtubeStatus.textContent = "De senaste videorna kunde inte hämtas. Kanallänkarna nedan fungerar fortfarande.";
            }
            return;
        }

        elements.youtubeResults.innerHTML = selected.map(function (item) {
            return [
                '<article class="ic-channel-card">',
                '<a href="' + escapeHTML(item.link) + '" target="_blank" rel="noopener noreferrer">',
                '<span>YouTube // ' + escapeHTML(item.source) + ' // ' + escapeHTML(formatDate(item)) + '</span>',
                '<h3>' + escapeHTML(item.title) + '</h3>',
                item.description ? '<p>' + escapeHTML(cleanText(item.description, 170)) + '</p>' : '<p>Öppna videon på YouTube.</p>',
                '</a>',
                '</article>'
            ].join("");
        }).join("");

        if (elements.youtubeStatus) {
            elements.youtubeStatus.textContent = message || "De två senaste videorna från varje Spurs-kanal.";
        }
    }

    function initYoutubeFeeds() {
        var embedded = window.SPURS_YOUTUBE_CACHE;
        var collected = embedded && Array.isArray(embedded.items) ? embedded.items.slice() : [];

        if (!elements.youtubeResults) {
            return;
        }

        if (collected.length) {
            renderYoutubeItems(collected, "Visar senaste sparade videor medan YouTube-flödena uppdateras.");
        }

        Promise.all(youtubeSources.map(function (source) {
            return fetchFeed(source).catch(function () {
                return [];
            });
        })).then(function (results) {
            results.forEach(function (items) {
                collected = collected.concat(items);
            });

            renderYoutubeItems(collected, results.some(function (items) {
                return items.length;
            }) ? "YouTube-flödena är uppdaterade." : "Visar den sparade YouTube-cachen.");
        });
    }

    function initFeeds() {
        var cached;
        var settled = 0;
        var fallbackTimer;

        if (!elements.feedControls || !elements.feedStatus || !elements.feedResults) {
            return;
        }

        renderFeedControls();
        cached = loadFeedCache();

        if (cached && cached.length) {
            state.liveFeedItems = cached;
            renderFeeds(cached, "Visar sparad cache medan liveflödena uppdateras.");
        } else {
            elements.feedStatus.textContent = "Läser in fotbollsflöden med kort timeout...";
        }

        fallbackTimer = setTimeout(function () {
            if (!state.liveFeedItems.length) {
                renderFeeds(fallbackFeedItems, "Liveflödena svarade inte snabbt. Visar fasta käll-länkar under tiden.");
            }
        }, 9000);

        feedSources.forEach(function (feed) {
            fetchFeed(feed)
                .then(function (items) {
                    state.liveFeedItems = uniqueFeedItems(state.liveFeedItems.concat(items));
                    renderFeeds(state.liveFeedItems);
                    if (state.liveFeedItems.length >= 4) {
                        saveFeedCache(state.liveFeedItems);
                    }
                })
                .catch(function (error) {
                    if (window.console && console.warn) {
                        console.warn("Fotbollsflöde hoppades över:", feed.shortName, error.message);
                    }
                })
                .finally(function () {
                    settled += 1;
                    if (settled === feedSources.length) {
                        clearTimeout(fallbackTimer);
                        if (state.liveFeedItems.length) {
                            saveFeedCache(state.liveFeedItems);
                            renderFeeds(state.liveFeedItems, "Flöden uppdaterade. Källorna öppnas i nya flikar.");
                        } else if (!cached) {
                            renderFeeds(fallbackFeedItems, "Inga liveflöden svarade just nu. Fasta käll-länkar visas som reserv.");
                        }
                    }
                });
        });
    }

    document.addEventListener("click", function (event) {
        var feedFilter = event.target.closest("[data-ic-feed-filter]");

        if (feedFilter) {
            state.feedFilter = feedFilter.dataset.icFeedFilter;
            renderFeeds(state.liveFeedItems.length ? state.liveFeedItems : fallbackFeedItems);
        }
    });

    initFeeds();
    initYoutubeFeeds();
})();
