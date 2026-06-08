import './style.css'

const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c084fc']
const projects = ['artruth', 'blume', 'beans', 'manam chennai', 'southern floorings']

const app = document.querySelector<HTMLDivElement>('#app')!

function bottomBar(currentPath: string) {
  const link1 =
    currentPath === '/works'
      ? '<a href="/">home</a>'
      : '<a href="/works">works</a>'
  const link2 =
    currentPath === '/about'
      ? '<a href="/">home</a>'
      : '<a href="/about">about</a>'
  const link3 =
    currentPath === '/contact'
      ? '<a href="/">home</a>'
      : '<a href="/contact">contact</a>'
  return `
    <div class="bottom-text">
      <span>surendhar</span>
      <div class="group">
        ${link1}
        ${link2}
        ${link3}
      </div>
    </div>
  `
}

function renderHome() {
  app.innerHTML = `
    <div class="center-rect" id="rect" style="background:${colors[0]}"></div>
    ${bottomBar('/')}
  `

  let index = 0
  const rect = document.querySelector<HTMLDivElement>('#rect')!
  const interval = setInterval(() => {
    index = (index + 1) % colors.length
    rect.style.background = colors[index]
  }, 1000)

  ;(app as any).__interval = interval
}

function renderWorks() {
  const rows = projects.map((p, i) =>
    i < projects.length - 1
      ? `<div class="works-row" data-color="${colors[i]}">${p}</div><div class="works-divider"></div>`
      : `<div class="works-row" data-color="${colors[i]}">${p}</div>`
  ).join('')

  app.innerHTML = `
    <div class="works-content">
      <div class="works-rows">${rows}</div>
      <div class="works-rect" id="works-rect"></div>
    </div>
    ${bottomBar('/works')}
  `

  const rowsList = document.querySelectorAll<HTMLElement>('.works-row')
  const rect = document.querySelector<HTMLDivElement>('#works-rect')!

  rowsList.forEach(row => {
    row.addEventListener('mouseenter', () => {
      rect.style.background = row.dataset.color || colors[0]
      rect.classList.add('visible')
    })
    row.addEventListener('mouseleave', () => {
      rect.classList.remove('visible')
    })
  })
}

function renderAbout() {
  app.innerHTML = `
    <div class="about-content">
      <div class="about-title">surendhar<br>designer, based in bangalore</div>
      <div class="about-columns">
        <div class="about-col">
          <p>about</p>
          <p class="break">i design brands and interfaces with its purpose.</p>
          <p>My work spans brand identity, packaging, and digital interfaces. I approach each project with the belief that design should be shaped by purpose.</p>
          <p class="break">A clothing store should help sell clothing.</p>
          <p>An art studio should tell a story.</p>
          <p>A research institution should communicate knowledge.</p>
          <p class="break">the design may be quiet, expressive, commercial, or functional, but it always feels true to its purpose</p>
        </div>
        <div class="about-col">
          <p>Practice</p>
          <p>Branding<br>Digital Interfaces</p>
        </div>
        <div class="about-col">
          <p>Currently</p>
          <p>Building Ikaiva</p>
        </div>
      </div>
    </div>
    ${bottomBar('/about')}
  `
}

const contactLinks = ['e-mail', 'linkedin', 'resume']

function renderContact() {
  const rows = contactLinks.map((link, i) =>
    i < contactLinks.length - 1
      ? `<a href="#" class="contact-row">${link}</a><div class="works-divider"></div>`
      : `<a href="#" class="contact-row">${link}</a>`
  ).join('')

  app.innerHTML = `
    <div class="works-content">
      <div class="works-rows">${rows}</div>
    </div>
    ${bottomBar('/contact')}
  `
}

function route(path: string) {
  if ((app as any).__interval) {
    clearInterval((app as any).__interval)
  }

  if (path === '/works') {
    renderWorks()
  } else if (path === '/about') {
    renderAbout()
  } else if (path === '/contact') {
    renderContact()
  } else {
    renderHome()
  }
}

document.addEventListener('click', (e) => {
  const link = (e.target as HTMLElement).closest('a')
  if (!link || !link.href) return
  const url = new URL(link.href)
  if (url.origin !== location.origin) return
  if (link.getAttribute('href') === '#') return

  e.preventDefault()
  history.pushState({}, '', url.pathname)
  route(url.pathname)
})

window.addEventListener('popstate', () => {
  route(location.pathname)
})

route(location.pathname)
