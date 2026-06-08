import './style.css'

const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c084fc']
const projects = ['artruth', 'blume', 'beans', 'manam chennai', 'southern floorings']
const projectSlugs = ['artruth', 'blume', 'beans', 'manam-chennai', 'southern-floorings']

const app = document.querySelector<HTMLDivElement>('#app')!

function bottomBar(currentPath: string) {
  const isProject = isProjectPath(currentPath)
  const link1 =
    currentPath === '/works' || isProject
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
      ? `<a href="/${projectSlugs[i]}" class="works-row" data-color="${colors[i]}">${p}</a><div class="works-divider"></div>`
      : `<a href="/${projectSlugs[i]}" class="works-row" data-color="${colors[i]}">${p}</a>`
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

interface ProjectSection {
  heading?: string
  text?: string
  images?: 'hero' | 'single' | 'duo' | 'gallery' | 'large'
}

interface ProjectData {
  name: string
  category: string
  year: string
  role: string
  services: string
  sections: ProjectSection[]
}

const projectData: Record<string, ProjectData> = {
  'artruth': {
    name: 'artruth', category: 'brand identity', year: '2024', role: 'lead designer',
    services: 'brand strategy, visual identity, packaging, art direction',
    sections: [
      { heading: 'hero', images: 'hero' },
      { heading: 'overview', text: 'artruth is a contemporary art platform bridging emerging artists with collectors through thoughtful digital and print experiences.', images: 'single' },
      { heading: 'approach', text: 'a flexible system rooted in typographic clarity, muted tones, and generous whitespace — letting the art breathe.', images: 'gallery' },
      { heading: 'outcome', text: 'a brand that feels invisible — the art stays center stage, exactly as intended.', images: 'single' },
    ]
  },
  'blume': {
    name: 'blume', category: 'digital design', year: '2024', role: 'ui/ux designer',
    services: 'ui/ux design, design system, prototyping',
    sections: [
      { heading: 'hero', images: 'hero' },
      { heading: 'overview', text: 'blume is a wellness platform redefining how people discover and engage with holistic health practices.', images: 'single' },
      { heading: 'approach', text: 'organic shapes, warm gradients, and fluid micro-interactions that mirror natural movement.', images: 'gallery' },
      { heading: 'outcome', text: 'a 40% increase in user engagement during beta — users cited the interface as a key reason for return.', images: 'single' },
    ]
  },
  'beans': {
    name: 'beans', category: 'packaging', year: '2023', role: 'art director',
    services: 'packaging design, illustration direction, print production',
    sections: [
      { heading: 'hero', images: 'hero' },
      { heading: 'overview', text: 'beans is a specialty coffee roastery bringing single-origin stories to the everyday cup.', images: 'single' },
      { heading: 'approach', text: 'illustrated varietal maps, tactile paper stocks, and a color-coded origin system.', images: 'gallery' },
      { heading: 'outcome', text: 'a 25% lift in retail velocity; the packaging was featured in a design annual.', images: 'single' },
    ]
  },
  'manam-chennai': {
    name: 'manam chennai', category: 'editorial design', year: '2023', role: 'designer',
    services: 'editorial design, photography direction, production',
    sections: [
      { heading: 'hero', images: 'hero' },
      { heading: 'overview', text: 'manam chennai is a culture magazine documenting the people, spaces, and ideas shaping the city.', images: 'single' },
      { heading: 'approach', text: 'a bold grid system, duotone photography, and a distinctively tactile paper choice.', images: 'gallery' },
      { heading: 'outcome', text: 'sold out two print runs; now stocked in select bookstores across india.', images: 'single' },
    ]
  },
  'southern-floorings': {
    name: 'southern floorings', category: 'brand identity', year: '2022', role: 'brand designer',
    services: 'brand strategy, visual identity, stationery, signage',
    sections: [
      { heading: 'hero', images: 'hero' },
      { heading: 'overview', text: 'southern floorings is a heritage tile manufacturer with decades of craft tradition.', images: 'single' },
      { heading: 'approach', text: 'a mark inspired by tile geometry, paired with warm earth tones and craft-forward photography.', images: 'gallery' },
      { heading: 'outcome', text: 'showroom footfall increased by 60% post-rebrand; the parent company adopted the identity group-wide.', images: 'single' },
    ]
  }
}

function renderSection(section: ProjectSection, color: string) {
  let images = ''
  const c = (i: number) => colors[(colors.indexOf(color) + i) % 5]

  if (section.images === 'hero' || section.images === 'large') {
    images = `<div class="project-img project-img-hero" style="background:${color}"></div>`
  } else if (section.images === 'single') {
    images = `<div class="project-img" style="background:${color}"></div>`
  } else if (section.images === 'duo') {
    images = `<div class="project-images-duo"><div class="project-img" style="background:${c(0)}"></div><div class="project-img" style="background:${c(1)}"></div></div>`
  } else if (section.images === 'gallery') {
    images = `<div class="project-img project-img-hero" style="background:${c(0)}"></div><div class="project-images-duo"><div class="project-img" style="background:${c(1)}"></div><div class="project-img" style="background:${c(2)}"></div></div><div class="project-img project-img-hero" style="background:${c(3)}"></div>`
  }

  const heading = section.heading ? `<p class="project-section-title">${section.heading}</p>` : ''
  const text = section.text ? `<p class="project-section-text">${section.text}</p>` : ''
  return `${heading}${text}${images}`
}

function renderProject(slug: string) {
  const data = projectData[slug]
  if (!data) return

  const sections = data.sections.map((s, i) => renderSection(s, colors[i % 5])).join('')

  const otherProjects = projectSlugs
    .filter(s => s !== slug)
    .map(s => `<a href="/${s}">${projects[projectSlugs.indexOf(s)]}</a>`)
    .join('<span class="proj-nav-sep">/</span>')

  app.innerHTML = `
    <div class="project-content">
      <div class="project-title">${data.name}</div>
      <div class="project-info-bar"><span>${data.category}</span><span>${data.year}</span><span>${data.role}</span></div>
      ${sections}
      <div class="project-info-bottom">
        <div class="project-info-item"><span class="pii-label">year</span><span class="pii-value">${data.year}</span></div>
        <div class="project-info-item"><span class="pii-label">role</span><span class="pii-value">${data.role}</span></div>
        <div class="project-info-item"><span class="pii-label">services</span><span class="pii-value">${data.services}</span></div>
      </div>
      <div class="project-nav">${otherProjects}</div>
    </div>
    ${bottomBar('/' + slug)}
  `
}

function isProjectPath(path: string) {
  return projectSlugs.includes(path.replace('/', ''))
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
  } else if (isProjectPath(path)) {
    renderProject(path.replace('/', ''))
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
