// Navigation: mobile toggle and header scroll
const header = document.getElementById('site-header');
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');
if(toggle){
  toggle.addEventListener('click', ()=>{
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
}

// close menu when clicking a link
document.addEventListener('click', (e)=>{
  const link = e.target.closest('.main-nav a');
  if(link && document.body.classList.contains('nav-open')){
    document.body.classList.remove('nav-open');
    toggle && toggle.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
});

// close on Escape
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && document.body.classList.contains('nav-open')){
    document.body.classList.remove('nav-open');
    toggle && toggle.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
});

window.addEventListener('scroll', ()=>{
  if(!header) return;
  if(window.scrollY > 20) header.classList.add('scrolled'); else header.classList.remove('scrolled');
});
