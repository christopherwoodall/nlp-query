// TODO:
//   - Add more Open AI models to Options page
const OPENAI_API_URL = `https://api.openai.com/v1/chat/completions`  // see: https://platform.openai.com/docs/api-reference/chat
const OPENAI_MODEL = `gpt-3.5-turbo`  // see: https://platform.openai.com/docs/models/model-endpoint-compatibility
const OPENAI_MAX_TOKENS = 500
const OPENAI_TEMPERATURE = 0.3
const OPENAI_TOP_P = 1

const LanguageMap = {
  "lucene": "Lucene Query Language (Elasticsearch)",
  "sql": "SQL (McAfee's Enterprise Security Manager)",
  "spl": "Splunk's Search Processing Language (SPL)",
  "kql": "Azure Log Analytics Query Language (KQL)",
  "cql": "CQL (Cassandra Query Language)",
};

const ResponseElement = document.getElementById("response");


const readLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject();
      } else {
        resolve(result[key]);
      }
    });
  });
};


/**
 * Generate a translation prompt for OpenAI
 * @param{string} target_language
 * @param{string} query
*/
const generatePrompt = (target_language, query) => {
  const language = LanguageMap[target_language];

  return [
    {"role": "system", "content": `As a senior cyber security expert, translate the following natural language query into ${language} for use in a SIEM system. Consider any available knowledge, including CVEs, TTPs, ATPs, etc., to enhance the quality of the translated query. Please respond with only the translated query and do not include any additional information or elaboration. The natural language query will follow.\n`},
    {"role": "user", "content": `${query}`}
  ];
}


const senRequest = async (query) => {
  const OPENAI_API_KEY = await readLocalStorage("openai_api_key")

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "model": OPENAI_MODEL,
      "messages": generatePrompt(document.getElementById("language").value, query),
      "temperature": OPENAI_TEMPERATURE,
    })
  });
  const json = await response.json();

  ResponseElement.value = json['choices'][0]["message"]["content"];
  return json;
}


/**
 * Stream OpenAI completion
 * @param{string} query
 */
const getOpenAIChatResponse = async (query) => {
  senRequest(query).then(response => {
    // pass
  }).catch(error => {
    console.log('Something bad happened ' + error)
  });
}


document.getElementById("submit").addEventListener("click", () => {
  getOpenAIChatResponse(document.getElementById("prompt").value);
});
