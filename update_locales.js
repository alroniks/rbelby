const fs = require('fs');

function updateLocale(file, newKeys) {
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));
  const updatedContent = { ...content, ...newKeys };
  fs.writeFileSync(file, JSON.stringify(updatedContent, null, 2) + '\n');
}

updateLocale('src/i18n/locales/en.json', {
  'footer.about': 'About project',
  'footer.faq': 'FAQ',
});
updateLocale('src/i18n/locales/be.json', {
  'footer.about': 'Пра праект',
  'footer.faq': 'FAQ',
});
updateLocale('src/i18n/locales/ru.json', {
  'footer.about': 'О проекте',
  'footer.faq': 'FAQ',
});
