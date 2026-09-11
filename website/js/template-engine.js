/*
   template-engine.js
   Loads a partial file and fills in {{variable}},
   {{#each}} loops and {{#if}} conditions.
   */

class SimpleTemplateEngine {
  constructor(templateUrl) {
    this.templateUrl = templateUrl;
  }

  loadTemplate() {
    // used by the functions below
    const engine = this;

    return fetch(this.templateUrl)
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        engine.template = text;
      });
  }

  renderTemplate(tagId, data) {
    const engine = this;
    const tag = document.getElementById(tagId);
    let output = this.template;

    // each loops
    output = output.replace(/{{#each (\w+)}}([\s\S]*?){{\/each}}/g, function (match, arrayName, templateFragment) {
      const listOfThings = data[arrayName];

      if (!Array.isArray(listOfThings)) {
        return "";
      }
      return listOfThings.map(function (item) {
        return engine.replaceVariablesInFragment(templateFragment, item);
      }).join("");
    });

    output = this.replaceVariablesInFragment(output, data);

    tag.innerHTML = output;
  }

  replaceVariablesInFragment(templateFragment, data) {
    let output = templateFragment;

    // if-else conditions
    output = output.replace(/{{#if (\w+)}}([\s\S]*?){{else}}([\s\S]*?){{\/if}}/g, function (match, condition, ifContent, elseContent) {
      return data[condition] ? ifContent : elseContent;
    });

    // if conditions without else
    output = output.replace(/{{#if (\w+)}}([\s\S]*?){{\/if}}/g, function (match, condition, ifContent) {
      return data[condition] ? ifContent : "";
    });

    // variable swapping, escaped first
    output = output.replace(/{{(\w+)}}/g, function (match, dataKey) {
      return escapeHtml(data[dataKey]);
    });

    return output;
  }
}

// replaces the HTML characters with entities
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
