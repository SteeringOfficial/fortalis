const STORAGE_KEY = 'suivi_financier_manuel_v1';
const tbody = document.getElementById('tbody');

function createRow(data = {}) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="mois" value="${data.mois || ''}"></td>
    <td><input type="text" class="cdi" value="${data.cdi || ''}"></td>
    <td><input type="text" class="steering" value="${data.steering || ''}"></td>
    <td><input type="text" class="autres" value="${data.autres || ''}"></td>
    <td><input type="text" class="depenses" value="${data.depenses || ''}"></td>
    <td><input type="text" class="epargne" value="${data.epargne || ''}"></td>
    <td><input type="text" class="capital" value="${data.capital || ''}"></td>
    <td style="text-align:center;"><button class="btn btn-reset remove">❌</button></td>
  `;
  tr.querySelectorAll('input').forEach(inp => inp.addEventListener('input', saveData));
  tr.querySelector('.remove').addEventListener('click', () => {
    tr.remove();
    saveData();
  });
  return tr;
}

function addRow(data) {
  tbody.appendChild(createRow(data));
  saveData();
}

function saveData() {
  const rows = Array.from(tbody.querySelectorAll('tr')).map(tr => ({
    mois: tr.querySelector('.mois').value,
    cdi: tr.querySelector('.cdi').value,
    steering: tr.querySelector('.steering').value,
    autres: tr.querySelector('.autres').value,
    depenses: tr.querySelector('.depenses').value,
    epargne: tr.querySelector('.epargne').value,
    capital: tr.querySelector('.capital').value
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  const rows = JSON.parse(data);
  tbody.innerHTML = '';
  rows.forEach(row => addRow(row));
}

function resetData() {
  if (!confirm('Réinitialiser le tableau et supprimer la sauvegarde ?')) return;
  localStorage.removeItem(STORAGE_KEY);
  tbody.innerHTML = '';
  addRow();
}

// événements
document.getElementById('addRow').addEventListener('click', () => addRow());
document.getElementById('saveBtn').addEventListener('click', () => {
  saveData();
  alert('Tableau sauvegardé localement ✅');
});
document.getElementById('resetBtn').addEventListener('click', resetData);

// initialisation
loadData();
if (tbody.children.length === 0) addRow();