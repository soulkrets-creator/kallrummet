(function () {
    "use strict";

    var deepCuts = [
        { id: "cesar-futebol", artist: "Cesar Camargo Mariano", title: "Futebol De Bar", album: "Sao Paulo Brasil", year: "1977", label: "RCA Victor", city: "Sao Paulo", genres: ["Brazilian", "Jazz-Funk"], markers: ["Brazilian Fusion", "Warm Rhodes", "Analog Textures"], note: "Tight Brazilian jazz-funk where the rhythm section does the heavy thinking." },
        { id: "azymuth-jazz-carnival", artist: "Azymuth", title: "Jazz Carnival", album: "Light As A Feather", year: "1979", label: "Milestone", city: "Rio de Janeiro", genres: ["Brazilian", "Jazz-Funk"], markers: ["Brazilian Fusion", "Analog Textures", "Dancefloor Function"], note: "Cosmic Rio studio craft with enough lift to turn a room without raising its voice." },
        { id: "arthur-verocai", artist: "Arthur Verocai", title: "Na Boca Do Sol", album: "Arthur Verocai", year: "1972", label: "Continental", city: "Rio de Janeiro", genres: ["Brazilian", "Soul-Jazz"], markers: ["Orchestral Soul", "Brazilian Fusion", "Analog Textures"], note: "Arranged like a small weather system: strings, rhythm and saudade in balance." },
        { id: "marcos-valle-estrelar", artist: "Marcos Valle", title: "Estrelar", album: "Marcos Valle", year: "1983", label: "Som Livre", city: "Rio de Janeiro", genres: ["Brazilian", "Jazz-Funk"], markers: ["Brazilian Fusion", "Solar Harmonics", "Boogie"], note: "Brazilian boogie with pop brightness and serious low-end discipline." },
        { id: "nuyorican-nervous", artist: "Nuyorican Soul", title: "The Nervous Track", album: "Nuyorican Soul", year: "1993", label: "Nervous", city: "New York", genres: ["House", "Latin", "Jazz-Funk"], markers: ["Loft Pressure", "Latin Pulse", "House Discipline"], note: "Masters At Work turn jazz musicianship into a club system." },
        { id: "maw-to-be-in-love", artist: "Masters At Work", title: "To Be In Love", album: "Single", year: "1997", label: "MAW Records", city: "New York", genres: ["House", "Soul"], markers: ["House Discipline", "Vocal Soul", "Loft Pressure"], note: "A lesson in how swing, vocal grace and club architecture can share one frame." },
        { id: "roy-ayers-sunshine", artist: "Roy Ayers Ubiquity", title: "Everybody Loves The Sunshine", album: "Everybody Loves The Sunshine", year: "1976", label: "Polydor", city: "Los Angeles", genres: ["Soul-Jazz", "Jazz-Funk"], markers: ["Warm Rhodes", "Solar Harmonics", "Soul-Jazz"], note: "The obvious classic still works because the restraint is the hook." },
        { id: "weldon-morning", artist: "Weldon Irvine", title: "Morning Sunrise", album: "The Sisters", year: "1979", label: "Nodlew", city: "New York", genres: ["Soul-Jazz", "Jazz-Funk"], markers: ["Warm Rhodes", "Spiritual Soul", "Analog Textures"], note: "Private-press feeling with a chorus that seems to open a window." },
        { id: "patrice-remind-me", artist: "Patrice Rushen", title: "Remind Me", album: "Straight From The Heart", year: "1982", label: "Elektra", city: "Los Angeles", genres: ["Soul", "Boogie", "Jazz-Funk"], markers: ["Polished Fusion", "Vocal Soul", "Warm Keys"], note: "Immaculate songwriting and studio detail without losing the human pulse." },
        { id: "donald-think-twice", artist: "Donald Byrd", title: "Think Twice", album: "Stepping Into Tomorrow", year: "1975", label: "Blue Note", city: "New York", genres: ["Soul-Jazz", "Jazz-Funk"], markers: ["Warm Rhodes", "Mizell Brothers", "Soul-Jazz"], note: "Blue Note moving into future-soul territory with calm authority." },
        { id: "lonnie-expansions", artist: "Lonnie Liston Smith", title: "Expansions", album: "Expansions", year: "1975", label: "Flying Dutchman", city: "New York", genres: ["Soul-Jazz", "Spiritual Jazz"], markers: ["Modal Harmonics", "Spiritual Soul", "Warm Rhodes"], note: "A spiritual-jazz anthem that still feels like a useful instruction." },
        { id: "gary-sanctuary", artist: "Gary Bartz", title: "Music Is My Sanctuary", album: "Music Is My Sanctuary", year: "1977", label: "Capitol", city: "New York", genres: ["Soul-Jazz", "Jazz-Funk"], markers: ["Spiritual Soul", "Jazz Dance", "Vocal Soul"], note: "The title says the thing plainly and the groove proves it." },
        { id: "galliano-circles", artist: "Galliano", title: "Circles Going Round The Sun", album: "Halfway Somewhere", year: "2024", label: "Brownswood", city: "London", genres: ["Broken Beat", "Soul-Jazz"], markers: ["London Pressure", "Broken Beat Swing", "Warm Rhodes"], note: "Acid-jazz lineage updated with a present-tense London pulse." },
        { id: "4hero-hold", artist: "4hero", title: "Hold It Down", album: "Two Pages", year: "1998", label: "Talkin' Loud", city: "London", genres: ["Broken Beat", "Drum & Bass", "Soul"], markers: ["Broken Beat Swing", "London Pressure", "Future Soul"], note: "A bridge between drum programming, jazz arrangement and soul feeling." },
        { id: "kaidi-betcha", artist: "Kaidi Tatham", title: "Betcha Did", album: "In Search Of Hope", year: "2008", label: "Freedom School", city: "London", genres: ["Broken Beat", "Jazz-Funk"], markers: ["Broken Beat Swing", "Warm Rhodes", "London Pressure"], note: "Keys-led broken beat with the harmonic nerve left exposed." },
        { id: "dego-kaidi-ankle", artist: "Dego & Kaidi", title: "Ankle Injury", album: "A So We Gwarn", year: "2017", label: "Sound Signature", city: "London", genres: ["Broken Beat", "House"], markers: ["Broken Beat Swing", "House Discipline", "London Pressure"], note: "Loose and exact at the same time, which is the whole trick." },
        { id: "jazzanova-fedime", artist: "Jazzanova", title: "Fedime's Flight", album: "Single", year: "1997", label: "JCR", city: "Berlin", genres: ["Broken Beat", "Jazz-Funk"], markers: ["Club Jazz", "Broken Beat Swing", "Analog Textures"], note: "The late-90s club-jazz blueprint in clean, restless motion." },
        { id: "rainer-festa", artist: "Truby Trio", title: "A Festa", album: "Elevator Music", year: "2003", label: "Compost", city: "Freiburg", genres: ["Brazilian", "Broken Beat", "House"], markers: ["Brazilian Fusion", "Club Jazz", "Latin Pulse"], note: "A European club route back into Brazil without flattening the source." },
        { id: "kyoto-eclipse", artist: "Kyoto Jazz Massive", title: "Eclipse", album: "Spirit Of The Sun", year: "2002", label: "Compost", city: "Tokyo", genres: ["Broken Beat", "Jazz-Funk"], markers: ["Kissaten Detail", "Club Jazz", "Polished Fusion"], note: "Tokyo precision, club momentum and a serious record-shelf memory." },
        { id: "ufo-loud-minority", artist: "United Future Organization", title: "Loud Minority", album: "United Future Organization", year: "1992", label: "Talkin' Loud", city: "Tokyo", genres: ["Acid Jazz", "Jazz-Funk"], markers: ["Jazz Dance", "Kissaten Detail", "Club Jazz"], note: "A manifesto record for acid jazz as international language." },
        { id: "nicola-bossa", artist: "Nicola Conte", title: "Bossa Per Due", album: "Jet Sounds", year: "2000", label: "Schema", city: "Bari", genres: ["Brazilian", "Jazz-Funk"], markers: ["Cinematic Swing", "Latin Pulse", "Club Jazz"], note: "Library music, bossa and club culture arranged with Italian sharpness." },
        { id: "theo-heal", artist: "Theo Parrish", title: "Heal Yourself And Move", album: "Sound Sculptures Vol. 1", year: "2007", label: "Sound Signature", city: "Detroit", genres: ["House", "Soul"], markers: ["Loft Pressure", "Analog Textures", "House Discipline"], note: "Raw, spiritual house with the seams deliberately left audible." },
        { id: "floating-nuits", artist: "Floating Points", title: "Nuits Sonores", album: "Single", year: "2014", label: "Eglo", city: "London", genres: ["House", "Jazz-Funk"], markers: ["Warm Rhodes", "House Discipline", "London Pressure"], note: "A patient build where synth, keys and drums keep negotiating." },
        { id: "nubya-pace", artist: "Nubya Garcia", title: "Pace", album: "Source", year: "2020", label: "Concord Jazz", city: "London", genres: ["Jazz", "Soul-Jazz"], markers: ["London Pressure", "Modal Harmonics", "Spiritual Soul"], note: "London jazz as movement: generous, grounded and forward-facing." },
        { id: "yussef-strings", artist: "Yussef Kamaal", title: "Strings Of Light", album: "Black Focus", year: "2016", label: "Brownswood", city: "London", genres: ["Jazz-Funk", "Broken Beat"], markers: ["London Pressure", "Broken Beat Swing", "Warm Rhodes"], note: "Modern UK jazz with club reflexes and a keyboard engine." },
        { id: "emma-green", artist: "Emma-Jean Thackray", title: "Green Funk", album: "Yellow", year: "2021", label: "Movementt", city: "London", genres: ["Jazz-Funk", "Soul"], markers: ["Future Soul", "Jazz Dance", "London Pressure"], note: "Big-colour jazz-funk that knows the dance floor is part of the arrangement." },
        { id: "sven-magnolia", artist: "Sven Wunder", title: "Magnolia", album: "Dogu Cicekleri", year: "2019", label: "Piano Piano", city: "Stockholm", genres: ["Jazz-Funk", "Nordic"], markers: ["Nordic Restraint", "Cinematic Swing", "Analog Textures"], note: "Swedish studio imagination through Anatolian colour and library restraint." },
        { id: "koop-summer", artist: "Koop", title: "Summer Sun", album: "Waltz For Koop", year: "2001", label: "JCR", city: "Stockholm", genres: ["Nordic", "Jazz"], markers: ["Nordic Restraint", "Vocal Soul", "Polished Fusion"], note: "A Stockholm take on jazz memory: elegant, clear and quietly strange." }
    ];

    var archiveTracks = deepCuts.slice();
    var archiveLoaded = false;
    var archiveDataLoadPromise = null;

    var urbanNodes = [
        { name: "London", cities: ["London"], aliases: ["uk", "broken", "brownswood", "talkin loud", "eglo"], markers: ["Broken Beat Swing", "London Pressure", "Warm Rhodes"], notes: "London is the pressure point where jazz dance, broken beat, rare groove and independent radio keep feeding each other." },
        { name: "Rio / Sao Paulo", cities: ["Rio de Janeiro", "Sao Paulo"], aliases: ["brazil", "brazilian", "rio", "sao paulo", "som livre"], markers: ["Brazilian Fusion", "Solar Harmonics", "Analog Textures"], notes: "Brazil carries the archive through fusion, MPB, samba-jazz and electric studio craft." },
        { name: "New York", cities: ["New York"], aliases: ["nyc", "nuyorican", "maw", "blue note", "flying dutchman"], markers: ["Loft Pressure", "Latin Pulse", "Soul-Jazz"], notes: "New York keeps the archive close to loft sessions, Latin soul, jazz harmony and house function." },
        { name: "Tokyo", cities: ["Tokyo"], aliases: ["japan", "japanese", "kyoto", "ufo"], markers: ["Kissaten Detail", "Polished Fusion", "Jazz Dance"], notes: "Tokyo enters as listening culture: kissaten patience, club precision and serious catalogue memory." },
        { name: "Stockholm", cities: ["Stockholm"], aliases: ["sweden", "swedish", "nordic", "scandinavian"], markers: ["Nordic Restraint", "Cinematic Swing", "Melodic Space"], notes: "Stockholm acts as a northern relay between record collecting, studio restraint and club culture." },
        { name: "Berlin / Freiburg", cities: ["Berlin", "Freiburg"], aliases: ["compost", "jcr", "germany", "club jazz"], markers: ["Club Jazz", "Broken Beat Swing", "Analog Textures"], notes: "The German node gathers the late-90s club-jazz habit of treating records as maps." }
    ];

    var textureNodes = [
        { name: "Warm Rhodes", terms: ["warm rhodes", "rhodes", "keys", "warm keys"], markers: ["Warm Rhodes", "Soul-Jazz", "Solar Harmonics"] },
        { name: "Brazilian Fusion", terms: ["brazil", "brazilian", "rio", "samba", "mpb"], markers: ["Brazilian Fusion", "Latin Pulse", "Solar Harmonics"] },
        { name: "Broken Beat Swing", terms: ["broken", "bruk", "syncopated", "talkin loud"], markers: ["Broken Beat Swing", "London Pressure", "Future Soul"] },
        { name: "Loft Pressure", terms: ["loft", "house", "nervous", "maw", "sound signature"], markers: ["Loft Pressure", "House Discipline", "Analog Textures"] },
        { name: "Kissaten Detail", terms: ["tokyo", "japan", "kyoto", "kissaten"], markers: ["Kissaten Detail", "Polished Fusion", "Jazz Dance"] },
        { name: "Nordic Restraint", terms: ["stockholm", "sweden", "nordic", "scandinavian"], markers: ["Nordic Restraint", "Melodic Space", "Cinematic Swing"] },
        { name: "Modal Harmonics", terms: ["modal", "spiritual", "harmonics", "expansions"], markers: ["Modal Harmonics", "Spiritual Soul", "Soul-Jazz"] },
        { name: "Analog Textures", terms: ["analog", "analogue", "tape", "library", "dusty"], markers: ["Analog Textures", "Cinematic Swing", "Crate Memory"] }
    ];

    var feedSources = [
        { name: "Higher Ground with Jason Palma", shortName: "Jason Palma", url: "https://feed.podbean.com/ciuthigherground/feed.xml", home: "https://ciut.fm/higherground/" },
        { name: "Colin Curtis", shortName: "Colin Curtis", url: "https://colincurtis.podomatic.com/rss2.xml", home: "https://colincurtis.podomatic.com/" },
        { name: "UK Vibe", shortName: "UK Vibe", url: "https://ukvibe.org/feed/", home: "https://ukvibe.org/" },
        { name: "Blue-in-Green:RADIO", shortName: "Blue-in-Green", url: "http://www.blueingreenradio.com/feeds/posts/default?alt=rss", home: "http://www.blueingreenradio.com/" },
        { name: "Proper Mag", shortName: "Proper Mag", url: "https://www.propermag.com/?feed=rss2", home: "https://www.propermag.com/" },
        { name: "Uncrate", shortName: "Uncrate", url: "https://feeds.feedburner.com/uncrate", home: "https://uncrate.com/" }
    ];

    var fallbackFeedItems = feedSources.map(function (feed) {
        var descriptions = {
            "Jason Palma": "Öppna Higher Ground-arkivet för soul, jazz, house och långa radioresor.",
            "Colin Curtis": "DJ-mixar och arkivspår från jazz dance, soul och broken beat-historien.",
            "UK Vibe": "Recensioner och intervjuer runt jazz, soul och global musik.",
            "Blue-in-Green": "Radio, intervjuer och features från Blue-in-Green:RADIO.",
            "Proper Mag": "Stil, outdoor, design och vardagskultur från Proper Mag.",
            "Uncrate": "Design, gear, objekt och stilla konsumtionsfantasier från Uncrate."
        };

        return {
            source: feed.shortName,
            title: feed.name,
            description: descriptions[feed.shortName] || "Öppna källan direkt.",
            link: feed.home,
            timestamp: 0,
            fallback: true
        };
    });

    var state = {
        deepFilter: "all",
        deepLimit: getDeepLimitStep(),
        feedFilter: "all",
        liveFeedItems: []
    };

    var elements = {
        deepSearch: document.getElementById("deepCutsSearch"),
        deepCount: document.getElementById("deepCutsCount"),
        deepResults: document.getElementById("deepCutsResults"),
        archiveFacets: document.getElementById("archiveFacets"),
        navigatorSearch: document.getElementById("navigatorSearch"),
        navigatorCount: document.getElementById("navigatorCount"),
        labelNodes: document.getElementById("labelNodes"),
        lineageNodes: document.getElementById("lineageNodes"),
        urbanNodes: document.getElementById("urbanNodes"),
        textureNodes: document.getElementById("textureNodes"),
        labelCount: document.getElementById("labelCount"),
        lineageCount: document.getElementById("lineageCount"),
        selectedTitle: document.getElementById("selectedTitle"),
        archivalNotes: document.getElementById("archivalNotes"),
        markerStrip: document.getElementById("markerStrip"),
        resultsLabel: document.getElementById("resultsLabel"),
        navigatorResults: document.getElementById("navigatorResults"),
        feedControls: document.getElementById("feedControls"),
        feedStatus: document.getElementById("feedStatus"),
        feedResults: document.getElementById("feedResults")
    };

    function normalise(value) {
        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9 ]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function escapeHTML(value) {
        return String(value || "").replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "\"": "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    function recordText(record) {
        return normalise([
            record.artist,
            record.title,
            record.album,
            record.label,
            record.city,
            record.genres.join(" "),
            record.markers.join(" "),
            record.note
        ].join(" "));
    }

    function tokenise(query) {
        return normalise(query).split(" ").filter(function (term) {
            return term.length > 1;
        });
    }

    function getDeepLimitStep() {
        return window.matchMedia && window.matchMedia("(max-width: 680px)").matches ? 40 : 80;
    }

    function matchesTerms(record, terms) {
        if (!terms.length) {
            return true;
        }

        var text = recordText(record);
        return terms.every(function (term) {
            return text.indexOf(term) !== -1;
        });
    }

    function matchesFilter(record, filter) {
        if (filter === "all") {
            return true;
        }

        var wanted = normalise(filter);
        var aliases = {
            "brazilian": ["brazilian", "brasiliansk", "bossa", "samba", "mpb", "brazil"],
            "broken beat": ["broken beat", "bruk", "nu jazz", "acid jazz"],
            "soul jazz": ["soul jazz", "soul-jazz"],
            "jazz funk": ["jazz funk", "jazz-funk", "jazzfunk"],
            "jazz fusion": ["jazz fusion", "jazzfusion", "fusion"],
            "house": ["house", "disco house", "jazz house", "deep house"],
            "nordic": ["nordic", "scandinavian", "swedish", "stockholm"]
        };
        var terms = aliases[wanted] || [wanted];
        var text = normalise(record.genres.join(" ") + " " + record.markers.join(" ") + " " + record.label + " " + record.artist + " " + record.title);

        return terms.some(function (term) {
            return text.indexOf(term) !== -1;
        });
    }

    function scoreRecords(records, query) {
        var terms = tokenise(query);

        return records
            .map(function (record) {
                var text = recordText(record);
                var score = terms.reduce(function (sum, term) {
                    return sum + (text.indexOf(term) !== -1 ? 1 : 0);
                }, 0);
                return { record: record, score: score };
            })
            .filter(function (item) {
                return !terms.length || item.score > 0;
            })
            .sort(function (a, b) {
                return b.score - a.score || Number(b.record.year) - Number(a.record.year);
            })
            .map(function (item) {
                return item.record;
            });
    }

    function renderRecordRows(records, options) {
        var settings = options || {};
        var limit = settings.limit || state.deepLimit;

        if (!records.length) {
            return '<p class="ah-status-note">No matching records in this branch of the archive yet.</p>';
        }

        var rows = records.slice(0, limit).map(function (record) {
            var note = record.note || [record.album, record.genres.slice(0, 3).join(" // ")].filter(Boolean).join(" // ");
            return [
                '<article class="ah-record-row">',
                '<div class="ah-record-year">' + escapeHTML(record.year) + '</div>',
                '<div class="ah-record-title"><strong>' + escapeHTML(record.artist) + '</strong><span>' + escapeHTML(record.title) + '</span></div>',
                '<div class="ah-record-label">' + escapeHTML(record.label) + '</div>',
                '<div class="ah-record-texture">' + escapeHTML(record.markers.slice(0, 2).join(" // ")) + '</div>',
                '<p class="ah-record-note">' + escapeHTML(note) + '</p>',
                '</article>'
            ].join("");
        }).join("");

        if (settings.showMore && records.length > limit) {
            rows += '<button class="ah-show-more" type="button" data-show-more-records>Show more // ' + escapeHTML(String(records.length - limit)) + ' remaining</button>';
        }

        return rows;
    }

    function applyTheme(tokens) {
        var text = normalise(tokens.join(" "));
        var theme = "nocturnal";
        var mode = "precision";
        var texture = "clean";

        if (/spiritual|modal|sanctuary|expansions|narrative/.test(text)) {
            mode = "narrative";
        }

        if (/analog|tape|library|dusty|private|verocai|wunder/.test(text)) {
            texture = "analog";
        }

        document.body.dataset.theme = theme;
        document.body.dataset.mode = mode;
        document.body.dataset.texture = texture;
    }

    function renderArchiveFacets() {
        if (!elements.archiveFacets) {
            return;
        }

        var artistCount = new Set();
        var labelCount = new Set();
        var genreCount = new Set();

        archiveTracks.forEach(function (record) {
            (Array.isArray(record.artists) && record.artists.length ? record.artists : [record.artist]).forEach(function (artist) {
                if (artist) {
                    artistCount.add(artist);
                }
            });
            if (record.label) {
                labelCount.add(record.label);
            }
            record.genres.forEach(function (genre) {
                if (genre) {
                    genreCount.add(genre);
                }
            });
        });

        function facetColumn(title, count, items) {
            return [
                '<section class="ah-facet-column">',
                '<div class="ah-facet-head"><h3>' + escapeHTML(title) + '</h3><span>' + escapeHTML(String(count)) + '</span></div>',
                '<div class="ah-facet-list">',
                items.map(function (item) {
                    return '<button type="button" data-facet-query="' + escapeHTML(item.name) + '"><strong>' + escapeHTML(item.name) + '</strong><span>' + escapeHTML(String(item.count)) + '</span></button>';
                }).join(""),
                '</div>',
                '</section>'
            ].join("");
        }

        elements.archiveFacets.innerHTML = [
            facetColumn("Artists / Groups", artistCount.size, topValues(function (record) {
                return Array.isArray(record.artists) && record.artists.length ? record.artists : [record.artist];
            }, 12)),
            facetColumn("Labels", labelCount.size, topValues(function (record) {
                return [record.label];
            }, 12)),
            facetColumn("Genres", genreCount.size, topValues(function (record) {
                return record.genres;
            }, 16))
        ].join("");
    }

    function renderDeepCuts() {
        var query = elements.deepSearch ? elements.deepSearch.value : "";
        var terms = tokenise(query);
        var matches = scoreRecords(archiveTracks, query).filter(function (record) {
            return matchesFilter(record, state.deepFilter) && matchesTerms(record, terms);
        });

        elements.deepCount.textContent = matches.length + " / " + archiveTracks.length + " cuts";
        elements.deepResults.innerHTML = renderRecordRows(matches, { showMore: true });
        renderArchiveFacets();

        if (query || state.deepFilter !== "all") {
            applyTheme([query, state.deepFilter].concat(matches.slice(0, 6).map(function (record) {
                return record.markers.join(" ") + " " + record.city;
            })));
        }
    }

    function topValues(getter, limit) {
        var counts = new Map();
        archiveTracks.forEach(function (record) {
            getter(record).forEach(function (value) {
                if (!value) {
                    return;
                }
                counts.set(value, (counts.get(value) || 0) + 1);
            });
        });

        return Array.from(counts, function (entry) {
            return { name: entry[0], count: entry[1] };
        }).sort(function (a, b) {
            return b.count - a.count || a.name.localeCompare(b.name);
        }).slice(0, limit);
    }

    function renderNodeList(container, nodes, type) {
        container.innerHTML = nodes.map(function (node) {
            var count = String(node.count || (node.markers ? node.markers.length : 0) || 0).padStart(2, "0");
            return '<button class="ah-node-button" type="button" data-node-type="' + escapeHTML(type) + '" data-node-name="' + escapeHTML(node.name) + '" aria-pressed="false"><strong>' + escapeHTML(node.name) + '</strong><span>' + escapeHTML(count) + '</span></button>';
        }).join("");
    }

    function setActiveNode(type, name) {
        document.querySelectorAll(".ah-node-button").forEach(function (button) {
            var isActive = button.dataset.nodeType === type && button.dataset.nodeName === name;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    }

    function renderContext(title, notes, markers) {
        elements.selectedTitle.textContent = title;
        elements.archivalNotes.textContent = notes;
        elements.markerStrip.innerHTML = (markers || []).map(function (marker) {
            return '<span>' + escapeHTML(marker) + '</span>';
        }).join("");
    }

    function renderNavigatorResults(records, label) {
        elements.navigatorCount.textContent = records.length + " rows";
        elements.resultsLabel.textContent = label + " // " + String(records.length).padStart(2, "0") + " Rows";
        elements.navigatorResults.innerHTML = renderRecordRows(records, { limit: 80 });
    }

    function selectNode(type, name) {
        var matches = [];
        var markers = [];
        var notes = "";

        setActiveNode(type, name);
        elements.navigatorSearch.value = "";

        if (type === "label") {
            matches = archiveTracks.filter(function (record) { return record.label === name; });
            markers = ["Label Frequency", "Catalogue Memory"];
            notes = "A label node collects catalogue pressure: recurring producers, sleeve memory and the decisions that make an imprint recognisable.";
        }

        if (type === "lineage") {
            matches = archiveTracks.filter(function (record) {
                return (Array.isArray(record.artists) && record.artists.indexOf(name) !== -1) || record.artist === name;
            });
            markers = ["Artist Lineage", "Collaborative Trace"];
            notes = "A lineage node follows the artist as an index point: aliases, collaborators, scenes and records that keep opening adjacent shelves.";
        }

        if (type === "urban") {
            var urban = urbanNodes.find(function (node) { return node.name === name; });
            matches = archiveTracks.filter(function (record) {
                var text = recordText(record);
                return urban.cities.indexOf(record.city) !== -1 || urban.aliases.some(function (alias) { return text.indexOf(normalise(alias)) !== -1; });
            });
            markers = urban.markers;
            notes = urban.notes;
        }

        if (type === "texture") {
            var texture = textureNodes.find(function (node) { return node.name === name; });
            matches = archiveTracks.filter(function (record) {
                var text = recordText(record);
                return texture.terms.concat(texture.markers).some(function (term) { return text.indexOf(normalise(term)) !== -1; });
            });
            markers = texture.markers;
            notes = "A texture node is deliberately qualitative: it groups records by feel, instrument colour, rhythm behaviour and room temperature rather than by genre alone.";
        }

        renderContext(name, notes, markers);
        renderNavigatorResults(matches, name);
        applyTheme([name].concat(markers).concat(matches.slice(0, 6).map(function (record) { return record.city + " " + record.markers.join(" "); })));
    }

    function renderNavigatorSearch() {
        var query = elements.navigatorSearch.value;
        document.querySelectorAll(".ah-node-button").forEach(function (button) {
            button.classList.remove("is-active");
            button.setAttribute("aria-pressed", "false");
        });

        if (!query.trim()) {
            renderContext("Start Point", "Choose a label, artist, city or texture. The result list updates without a page reload and draws from the full static playlist archive.", []);
            renderNavigatorResults(archiveTracks.slice(0, 24), "Opening Selection");
            applyTheme(["opening selection"]);
            return;
        }

        var matches = scoreRecords(archiveTracks, query).slice(0, 80);
        renderContext("Mood Search", 'Natural language pass: "' + query + '". Matching artist names, labels, city aliases, genres and qualitative markers across the archive.', ["Natural Language", "Mood Index"]);
        renderNavigatorResults(matches, "Mood Search");
        applyTheme([query].concat(matches.slice(0, 6).map(function (record) { return record.city + " " + record.markers.join(" "); })));
    }

    function initNavigator() {
        var labels = topValues(function (record) { return [record.label]; }, 80);
        var lineage = topValues(function (record) {
            return Array.isArray(record.artists) && record.artists.length ? record.artists : [record.artist];
        }, 80);

        elements.labelCount.textContent = labels.length + " Nodes";
        elements.lineageCount.textContent = lineage.length + " Nodes";
        renderNodeList(elements.labelNodes, labels, "label");
        renderNodeList(elements.lineageNodes, lineage, "lineage");
        renderNodeList(elements.urbanNodes, urbanNodes.map(function (node) { return Object.assign({ count: node.cities.length }, node); }), "urban");
        renderNodeList(elements.textureNodes, textureNodes.map(function (node) { return Object.assign({ count: node.markers.length }, node); }), "texture");
        renderNavigatorResults(archiveTracks.slice(0, 24), "Opening Selection");
    }

    function normalizeArchiveRecord(record, index) {
        var artists = Array.isArray(record.artists) && record.artists.length ? record.artists : (record.artist ? String(record.artist).split(", ") : []);
        var genres = Array.isArray(record.genres) ? record.genres : (record.genre ? [record.genre] : []);
        var markers = Array.isArray(record.markers) && record.markers.length ? record.markers : ["Archive Cut"];

        return {
            id: record.id || "archive-" + index,
            artist: artists.join(", ") || record.artist || "Unknown artist",
            artists: artists,
            title: record.title || record.song_title || record.track || "Untitled",
            album: record.album || "",
            year: record.year || (record.releaseDate ? String(record.releaseDate).slice(0, 4) : ""),
            label: record.label || "Unlabelled",
            city: record.city || "",
            genres: genres.map(function (genre) { return String(genre).trim(); }).filter(Boolean),
            markers: markers,
            note: record.note || ""
        };
    }

    function applyArchiveRows(rows) {
        if (!Array.isArray(rows) || !rows.length) {
            throw new Error("Archive file is empty");
        }

        archiveTracks = rows.map(normalizeArchiveRecord).filter(function (record) {
            return record.title && record.artist;
        });
        archiveLoaded = true;
        state.deepLimit = getDeepLimitStep();
        renderDeepCuts();
        initNavigator();
    }

    function loadArchiveDataScript() {
        if (Array.isArray(window.NATTARKIVET_TRACKS) && window.NATTARKIVET_TRACKS.length) {
            return Promise.resolve(window.NATTARKIVET_TRACKS);
        }

        if (archiveDataLoadPromise) {
            return archiveDataLoadPromise;
        }

        archiveDataLoadPromise = new Promise(function (resolve, reject) {
            var script = document.createElement("script");
            script.src = "nattarkivet-data.js?v=2026-05-23-4";
            script.async = true;
            script.onload = function () {
                if (Array.isArray(window.NATTARKIVET_TRACKS) && window.NATTARKIVET_TRACKS.length) {
                    resolve(window.NATTARKIVET_TRACKS);
                } else {
                    reject(new Error("Archive data script loaded without rows"));
                }
            };
            script.onerror = function () {
                reject(new Error("Archive data script failed"));
            };
            document.head.appendChild(script);
        });

        return archiveDataLoadPromise;
    }

    function loadFullArchive() {
        if (Array.isArray(window.NATTARKIVET_TRACKS) && window.NATTARKIVET_TRACKS.length) {
            try {
                applyArchiveRows(window.NATTARKIVET_TRACKS);
                return Promise.resolve(archiveTracks);
            } catch (error) {
                if (window.console && console.warn) {
                    console.warn("Nattarkivet inline archive skipped, trying JSON fallback:", error.message);
                }
            }
        }

        return fetchWithTimeout("nattarkivet-tracks.json?v=2026-05-23-4", 12000)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Archive HTTP " + response.status);
                }
                return response.json();
            })
            .then(function (rows) {
                applyArchiveRows(rows);
            })
            .catch(function (error) {
                if (window.console && console.warn) {
                    console.warn("Nattarkivet JSON archive skipped, trying data script fallback:", error.message);
                }
                return loadArchiveDataScript()
                    .then(function (rows) {
                        applyArchiveRows(rows);
                    })
                    .catch(function (scriptError) {
                        archiveLoaded = false;
                        renderArchiveFacets();
                        if (window.console && console.warn) {
                            console.warn("Nattarkivet full archive skipped, using curated fallback:", scriptError.message);
                        }
                    });
            });
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

    function textFrom(node, names) {
        for (var i = 0; i < names.length; i += 1) {
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
        var enclosure = item.querySelector("enclosure[url]");

        if (atomLink) {
            return atomLink.getAttribute("href");
        }

        if (rssLink) {
            return rssLink;
        }

        if (enclosure) {
            return enclosure.getAttribute("url");
        }

        return feed.home;
    }

    function readXmlFeed(xmlText, feed) {
        var doc = new DOMParser().parseFromString(xmlText, "text/xml");
        var items = Array.from(doc.querySelectorAll("item, entry"));

        return items.slice(0, 5).map(function (item) {
            var rawDate = textFrom(item, ["pubDate", "updated", "published", "dc:date"]);
            var date = rawDate ? new Date(rawDate) : new Date(0);
            var description = textFrom(item, ["description", "summary", "content", "content:encoded"]);

            return {
                source: feed.shortName,
                title: cleanText(textFrom(item, ["title"]), 120),
                description: cleanText(description, 180),
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
                title: cleanText(item.title, 120),
                description: cleanText(item.description || item.content || item.content_text || "", 180),
                link: item.link || item.guid || feed.home,
                timestamp: isNaN(date.getTime()) ? 0 : date.getTime()
            };
        }).filter(function (item) {
            return item.title && item.link;
        });
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

    function fetchFeed(feed) {
        var encoded = encodeURIComponent(feed.url);
        var endpoints = [
            { type: "json", url: "https://api.rss2json.com/v1/api.json?rss_url=" + encoded },
            { type: "xml", url: "https://api.allorigins.win/raw?url=" + encoded },
            { type: "allorigins", url: "https://api.allorigins.win/get?url=" + encoded },
            { type: "xml", url: "https://api.codetabs.com/v1/proxy?quest=" + encoded }
        ];

        function tryEndpoint(index) {
            if (index >= endpoints.length) {
                throw new Error("Feed unavailable: " + feed.shortName);
            }

            return fetchWithTimeout(endpoints[index].url, 6000)
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
        }).slice(0, 30);
    }

    function renderFeedControls() {
        var buttons = [{ name: "Alla", value: "all" }].concat(feedSources.map(function (feed) {
            return { name: feed.shortName, value: feed.shortName };
        }));

        elements.feedControls.innerHTML = buttons.map(function (button) {
            var active = button.value === state.feedFilter;
            return '<button class="ah-pill-button' + (active ? ' is-active' : '') + '" type="button" data-feed-filter="' + escapeHTML(button.value) + '" aria-pressed="' + (active ? 'true' : 'false') + '">' + escapeHTML(button.name) + '</button>';
        }).join("");
    }

    function formatDate(timestamp) {
        if (!timestamp) {
            return "Fast länk";
        }

        try {
            return new Intl.DateTimeFormat("sv-SE", { month: "short", day: "numeric" }).format(new Date(timestamp));
        } catch (error) {
            return "Aktuellt";
        }
    }

    function renderFeeds(items, message) {
        var filtered = state.feedFilter === "all" ? items : items.filter(function (item) {
            return item.source === state.feedFilter;
        });

        renderFeedControls();
        elements.feedStatus.textContent = message || (items.some(function (item) { return item.fallback; }) ? "Visar fasta länkar eftersom liveflödena inte svarade snabbt." : "Visar de senaste posterna som svarade inom tidsgränsen.");

        if (!filtered.length) {
            elements.feedResults.innerHTML = '<p class="ah-status-note">Inget matchande flöde svarade just nu.</p>';
            return;
        }

        elements.feedResults.innerHTML = filtered.map(function (item) {
            return [
                '<article class="ah-feed-item">',
                '<a href="' + escapeHTML(item.link) + '" target="_blank" rel="noopener noreferrer">',
                '<span class="ah-feed-source">' + escapeHTML(item.source) + ' // ' + escapeHTML(formatDate(item.timestamp)) + '</span>',
                '<h3>' + escapeHTML(item.title) + '</h3>',
                item.description ? '<p>' + escapeHTML(item.description) + '</p>' : '',
                '</a>',
                '</article>'
            ].join("");
        }).join("");
    }

    function saveFeedCache(items) {
        try {
            localStorage.setItem("nattarkivet-feed-cache-v1", JSON.stringify({ savedAt: Date.now(), items: items }));
        } catch (error) {
            return null;
        }

        return null;
    }

    function loadFeedCache() {
        try {
            var cache = JSON.parse(localStorage.getItem("nattarkivet-feed-cache-v1") || "null");
            if (cache && Array.isArray(cache.items) && Date.now() - cache.savedAt < 6 * 60 * 60 * 1000) {
                return cache.items;
            }
        } catch (error) {
            return null;
        }

        return null;
    }

    function initFeeds() {
        var cached = loadFeedCache();
        var settled = 0;
        var fallbackTimer = null;

        renderFeedControls();

        if (cached && cached.length) {
            state.liveFeedItems = cached;
            renderFeeds(cached, "Visar sparad cache medan liveflödena uppdateras.");
        } else {
            elements.feedStatus.textContent = "Läser in flöden med kort timeout...";
        }

        fallbackTimer = setTimeout(function () {
            if (!state.liveFeedItems.length) {
                renderFeeds(fallbackFeedItems, "Liveflödena svarade inte snabbt, visar fasta länkar.");
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
                        console.warn("Nattarkivet feed skipped:", feed.shortName, error.message);
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
                            renderFeeds(fallbackFeedItems, "Inga liveflöden svarade just nu, visar fasta länkar.");
                        }
                    }
                });
        });
    }

    document.addEventListener("click", function (event) {
        var deepFilter = event.target.closest("[data-deep-filter]");
        if (deepFilter) {
            state.deepFilter = deepFilter.dataset.deepFilter;
            state.deepLimit = getDeepLimitStep();
            document.querySelectorAll("[data-deep-filter]").forEach(function (button) {
                var active = button === deepFilter;
                button.classList.toggle("is-active", active);
                button.setAttribute("aria-pressed", active ? "true" : "false");
            });
            renderDeepCuts();
            return;
        }

        var facetButton = event.target.closest("[data-facet-query]");
        if (facetButton) {
            state.deepFilter = "all";
            state.deepLimit = getDeepLimitStep();
            if (elements.deepSearch) {
                elements.deepSearch.value = facetButton.dataset.facetQuery;
            }
            document.querySelectorAll("[data-deep-filter]").forEach(function (button) {
                var active = button.dataset.deepFilter === "all";
                button.classList.toggle("is-active", active);
                button.setAttribute("aria-pressed", active ? "true" : "false");
            });
            renderDeepCuts();
            return;
        }

        if (event.target.closest("[data-show-more-records]")) {
            state.deepLimit += getDeepLimitStep();
            renderDeepCuts();
            return;
        }

        var nodeButton = event.target.closest(".ah-node-button");
        if (nodeButton) {
            selectNode(nodeButton.dataset.nodeType, nodeButton.dataset.nodeName);
            return;
        }

        var feedFilter = event.target.closest("[data-feed-filter]");
        if (feedFilter) {
            state.feedFilter = feedFilter.dataset.feedFilter;
            renderFeeds(state.liveFeedItems.length ? state.liveFeedItems : fallbackFeedItems);
        }
    });

    if (elements.deepSearch) {
        elements.deepSearch.addEventListener("input", function () {
            state.deepLimit = getDeepLimitStep();
            renderDeepCuts();
        });
    }

    if (elements.navigatorSearch) {
        elements.navigatorSearch.addEventListener("input", renderNavigatorSearch);
    }

    renderDeepCuts();
    initNavigator();
    loadFullArchive();
    initFeeds();
})();
