(function () {
    "use strict";

    const list = document.getElementById("rss-list");
    const panel = document.querySelector(".rss-panel");
    const status = document.getElementById("rss-status");
    const toggle = document.getElementById("rss-toggle");
    const itemCount = document.getElementById("rss-item-count");
    const activeCount = document.getElementById("rss-active-feed-count");
    const feedCount = document.getElementById("rss-feed-count");

    if (!list || !panel || !status) return;

    function clean(value, maxLength) {
        const text = String(value || "").replace(/\s+/g, " ").trim();
        return text.length > maxLength
            ? text.slice(0, maxLength).replace(/\s+\S*$/, "") + "..."
            : text;
    }

    function prepare(items) {
        const seen = new Set();

        return (Array.isArray(items) ? items : [])
            .map((item) => ({
                title: clean(item.title, 120),
                source: clean(item.source, 42) || "RSS",
                timestamp: Number(item.timestamp) || 0,
                description: clean(item.description, 180),
                image: String(item.image || "").trim(),
                link: String(item.link || "").trim(),
                guid: String(item.guid || "").trim(),
                sourceKey: item.sourceKey || item.source || "RSS"
            }))
            .filter((item) => item.title && item.link)
            .sort((a, b) => b.timestamp - a.timestamp)
            .filter((item) => {
                const keys = [item.link, item.guid, item.title]
                    .filter(Boolean)
                    .map((value) => value.toLowerCase());

                if (keys.some((key) => seen.has(key))) return false;
                keys.forEach((key) => seen.add(key));
                return true;
            });
    }

    function createArticle(item) {
        const article = document.createElement("a");
        article.className = "rss-item";
        article.href = item.link;
        article.target = "_blank";
        article.rel = "noopener noreferrer";

        if (item.image) {
            const image = document.createElement("img");
            article.classList.add("has-image");
            image.className = "rss-image";
            image.src = item.image;
            image.alt = "";
            image.loading = "lazy";
            image.addEventListener("error", () => {
                image.remove();
                article.classList.remove("has-image");
            });
            article.appendChild(image);
        }

        const meta = document.createElement("div");
        meta.className = "rss-meta";

        const source = document.createElement("span");
        source.className = "rss-source";
        source.textContent = item.source;
        meta.appendChild(source);

        if (item.timestamp) {
            const date = document.createElement("time");
            date.className = "rss-date";
            date.dateTime = new Date(item.timestamp).toISOString();
            date.textContent = new Intl.DateTimeFormat("sv-SE", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit"
            }).format(item.timestamp);
            meta.appendChild(date);
        }

        const title = document.createElement("div");
        title.className = "rss-title";
        title.textContent = item.title;
        article.append(meta, title);

        if (item.description) {
            const description = document.createElement("div");
            description.className = "rss-description";
            description.textContent = item.description;
            article.appendChild(description);
        }

        return article;
    }

    function render(items) {
        list.replaceChildren();

        for (let copy = 0; copy < 2; copy += 1) {
            const sequence = document.createElement("div");
            sequence.className = "rss-sequence";
            sequence.setAttribute("aria-hidden", copy ? "true" : "false");
            items.forEach((item) => sequence.appendChild(createArticle(item)));
            list.appendChild(sequence);
        }

        const speed = matchMedia("(max-width: 600px)").matches ? 16 : 20;
        const distance = list.firstElementChild.scrollHeight;
        list.style.setProperty("--rss-duration", Math.max(90, distance / speed) + "s");
        list.classList.add("is-scrolling");
    }

    async function loadCache() {
        try {
            const response = await fetch(
  "https://soulkrets-creator.github.io/kallrummet-news/news.json",
  { cache: "no-store" }
);
            if (response.ok) return await response.json();
        } catch (error) {
            // The embedded cache below still works when JSON cannot be read.
        }

        return window.KALLRUMMET_NEWS_CACHE || { items: [] };
    }

    async function start() {
        const cache = await loadCache();
        const items = prepare(cache.items);

        if (!items.length) {
            status.textContent = "Inga nyheter kunde läsas in just nu.";
            panel.setAttribute("aria-busy", "false");
            return;
        }

        render(items);
        status.hidden = true;
        panel.setAttribute("aria-busy", "false");

        const sources = new Set(items.map((item) => item.sourceKey));
        if (itemCount) itemCount.textContent = String(items.length);
        if (activeCount) activeCount.textContent = String(cache.sourceCount || sources.size);
        if (feedCount) feedCount.textContent = String(cache.feedCount || sources.size);
    }

    if (toggle) {
        toggle.addEventListener("click", () => {
            const paused = list.classList.toggle("is-paused");
            toggle.textContent = paused ? "Fortsätt flödet" : "Pausa flödet";
            toggle.setAttribute("aria-pressed", String(paused));
        });
    }

    start();
})();
