document.getElementById('year').textContent = new Date().getFullYear();
for (const link of document.querySelectorAll('[data-service]')) {
  link.addEventListener('click', () => { document.getElementById('service').value = link.dataset.service; });
}
document.getElementById('inquiry-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const inquiry = `StowFlow 3PL inquiry\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nService: ${data.get('service')}\n\n${data.get('message')}\n`;
  const url = URL.createObjectURL(new Blob([inquiry], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'stowflow-3pl-inquiry.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById('form-status').textContent = 'Your inquiry is ready to download. This demo has not sent your information.';
});
