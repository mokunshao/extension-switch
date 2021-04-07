var container = document.getElementById('container');
chrome.management.getAll(function (gettingAll) {
  renderList(gettingAll);
});

function getIcon(info) {
  var r = info && info.icons && info.icons[0] && info.icons[0].url;
  if (r) {
    return `<img height="16" width="16" src="${r}">`;
  } else {
    return '';
  }
}

function template(info) {
  return `
  <div class="item">
        <span>${info.name}</span>
        <label class="switch">
          <input type="checkbox" id="${info.id}" ${info.enabled && 'checked'}/>
          <span class="slider round"></span>
        </label>
  </div>
  <hr />
  `;
}

function renderList(infoArray) {
  var html = '';
  for (info of infoArray) {
    if (info.type == 'extension') {
      html += template(info);
    }
  }
  container.innerHTML = html;
}

container.onclick = function (e) {
  var id = e.target.id;
  if (id) {
    toggleEnabled(id);
  }
};

function toggleEnabled(id) {
  chrome.management.get(id, function (info) {
    chrome.management.setEnabled(id, !info.enabled);
  });
}
