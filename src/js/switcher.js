import refs from './refs';

  document.body.classList.add('theme-light');
  
  refs.switcher.addEventListener('click', toggleTheme);

  function toggleTheme() {
    document.body.classList.toggle("theme-dark");
    document.body.classList.toggle("theme-light");
    
    setToLocalStorageTheme()
}

function setToLocalStorageTheme(){
    if (document.body.classList.contains('theme-light')) {
        document.getElementById('slider').checked = false;
        localStorage.setItem('active-theme', '.theme-light');
      } else if (document.body.classList.contains('theme-dark')) {
       document.getElementById('slider').checked = true;
        localStorage.setItem('active-theme', '.theme-dark');
      }
}

infoFromLS();

function infoFromLS() {
  if (localStorage.getItem('active-theme') === '.theme-dark') {
    toggleTheme();
  }
}