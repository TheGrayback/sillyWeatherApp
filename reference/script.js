// Элементы
const settingsBtn = document.querySelector('.settings-btn');
const modal = document.getElementById('settingsModal');
const closeBtn = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const saveBtn = document.querySelector('.save-btn');

// Открытие модального окна
settingsBtn.addEventListener('click', () => {
  modal.classList.add('open');
});

// Закрытие модального окна
function closeModal() {
  modal.classList.remove('open');
}

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Закрытие при клике вне окна
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Сохранение настроек
saveBtn.addEventListener('click', () => {
  closeModal();
});

// Загрузка сохранённых настроек при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  const savedUnit = localStorage.getItem('temperatureUnit');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedUnit) {
    document.querySelector(`input[value="${savedUnit}"]`).checked = true;
  }
  
  if (savedTheme) {
    document.querySelector('.theme-select').value = savedTheme;
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }
});