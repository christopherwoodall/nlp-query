# NLP Query
A Firefox extension to translate natural language queries into search queries for various search engines.

---

## Load the Extension into Firefox
Clone the repository:
```bash
git clone git@github.com:christopherwoodall/nlp-query.git
```

Now you can load the extension into Firefox. Open Firefox and go to `about:debugging#/runtime/this-firefox`. Click "Load Temporary Add-on…" and select the `manifest.json` file located inside the `nlp-query/nlp-query` directory. Now you should see your extension in the list of extensions and in the browser's toolbar.

---

## Supported Query Languages
  - Lucene
  - Kibana Query Language (KQL)
  - Search Processing Language (SPL)

---

# Notes
## [Debugging Firefox Popups](https://extensionworkshop.com/documentation/develop/debugging/)
  1. Enter about:debugging in the URL bar.
  2. In the left-hand menu, click This Firefox (or This Nightly).
  3. Click Inspect next to your extension.
