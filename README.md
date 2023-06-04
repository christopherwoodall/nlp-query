# NLP Query
A [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/nlp-query/) to translate natural language queries into search queries for various search engines.

The project is currently in a 🚧 prototyping 🚧 stage, but if you are interested give it a star ⭐ and follow along!

---

# Demo 💥
![NLP Query Demo](docs/assets/demo.gif)

---

# Setup 🛠️
[Try it now](https://addons.mozilla.org/en-US/firefox/addon/nlp-query/), or follow the steps below to get started locally.

## Pre-requisites
  - [OpenAI API Key](https://openai.com/)

## Install Locally
Clone the repository:
```bash
git clone git@github.com:christopherwoodall/nlp-query.git
```

Now you can load the extension into Firefox.
  1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
  2. Click "Load Temporary Add-on…" and select the `manifest.json` file located inside the `nlp-query/nlp-query` directory.
  3. Now you should see your extension in the list of extensions and in the browser's toolbar.

---

# Directory Structure 📁
```
.
├── docs
│   └── assets
│       └── demo.gif
├── LICENSE
├── Makefile
├── nlp-query
│   ├── assets
│   │   ├── icons
│   │   │   ├── 128x128.png
│   │   │   ├── 16x16.png
│   │   │   ├── 32x32.png
│   │   │   ├── 48x48.png
│   │   │   └── 96x96.png
│   │   └── js
│   ├── background
│   │   ├── background.html
│   │   └── background.js
│   ├── manifest.json
│   ├── options
│   │   ├── options.css
│   │   ├── options.html
│   │   └── options.js
│   └── popup
│       ├── popup.css
│       ├── popup.html
│       └── popup.js
├── README.md
└── tools
    └── resize-icons.sh
```

---

## Supported Query Languages
  - Lucene Query Language (Elasticsearch)",
  - SQL (McAfee's Enterprise Security Manager)",
  - Splunk's Search Processing Language (SPL)",
  - Azure Log Analytics Query Language (KQL)",
  - CQL (Cassandra Query Language)",
