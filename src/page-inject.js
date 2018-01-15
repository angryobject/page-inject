(function() {
  function inject() {
    var elems = document.querySelectorAll('[data-page-inject]');

    for (var i = 0; i < elems.length; i += 1) {
      processElement(elems[i]);
    }
  }

  function processElement(elem) {
    injectHTML(elem.getAttribute('data-page-inject'), elem);
  }

  function injectHTML(path, elem) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
      insertAndExecute(elem, this.responseText);
    };

    xhr.open('GET', path);
    xhr.send();
  }

  function insertAndExecute(elem, text) {
    elem.innerHTML = text;

    var scripts = [].slice.call(elem.querySelectorAll('script'));
    var execIndex = 0;

    function executeSingleScript() {
      var elem = scripts[execIndex];

      if (!elem) {
        return;
      }

      if (elem.hasAttribute('src')) {
        loadScript(elem, continueExecution);
      } else {
        evalScript(elem, continueExecution);
      }
    }

    function continueExecution(err) {
      if (err) {
        throw err;
      }

      scripts[execIndex].parentNode.removeChild(scripts[execIndex]);
      execIndex += 1;

      executeSingleScript();
    }

    executeSingleScript();
  }

  function isScript(elem) {
    return (
      nodeNameIs(elem, 'script') &&
      (!elem.type ||
        elem.type.toLowerCase() === 'text/javascript' ||
        elem.type.toLowerCase() === 'module')
    );
  }

  function nodeNameIs(elem, name) {
    return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
  }

  function loadScript(elem, cb) {
    var script = document.createElement('script');
    var src = elem.getAttribute('src');

    function onError(err) {
      cb(err);
    }

    function onLoad() {
      cb(null);
    }

    script.onerror = onError;
    script.onload = onLoad;
    script.src = src;
    elem.parentNode.insertBefore(script, elem);
  }

  function evalScript(elem, cb) {
    var script = document.createElement('script');
    var code = elem.text || elem.textContent || elem.innerHTML || '';

    script.appendChild(document.createTextNode(code));
    elem.parentNode.insertBefore(script, elem);
    cb(null);
  }

  inject();
})();
