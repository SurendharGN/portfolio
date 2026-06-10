import './style.css'

const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c084fc']
const projects = ['artruth', 'blume', 'beans', 'ikaiva studio', 'southern floorings']
const projectSlugs = ['artruth', 'blume', 'beans', 'ikaiva', 'southern-floorings']

const covers = ['/ikaiva/cover2.png']

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
    <div class="center-rect-wrap">
      <div class="center-rect" style="background-image:url(${covers[0]})"></div>
    </div>
    ${bottomBar('/')}
  `
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
      { heading: 'overview', text: 'artruth is a premium dark chocolate brand built around craftsmanship, authenticity, and intentional consumption. the project explored how these ideas could be translated into a distinctive identity and packaging system that felt personal and genuine.', images: 'single' },
      { heading: 'approach', text: 'every visual decision was guided by the philosophy behind the brand. typography, color, packaging, and layout systems were designed to reflect the character of the product and the values it represented. the founder\u2019s handwritten wordmark was preserved and refined as the logo, allowing the identity to retain a sense of personality and authenticity.', images: 'gallery' },
      { heading: 'outcome', text: 'the project resulted in a cohesive brand system that connected the product, packaging, and philosophy into a unified experience. the identity established a strong visual presence while remaining rooted in the story and values that inspired the brand.', images: 'single' },
    ]
  },
  'blume': {
    name: 'blume', category: 'brand identity', year: '2024', role: 'lead designer',
    services: 'brand strategy, visual identity, packaging, art direction',
    sections: [
      { heading: 'hero', images: 'hero' },
      { heading: 'overview', text: 'blume is a conceptual perfume brand created for a design competition. the project explored how branding and packaging could shape the perception of a fragrance through a distinctive visual identity.', images: 'single' },
      { heading: 'approach', text: 'the identity was designed to create a memorable and cohesive brand experience across every touchpoint. from the logo system to the packaging applications, each element was developed to express the character of the brand and establish a strong visual presence.', images: 'gallery' },
      { heading: 'outcome', text: 'the project received positive feedback from designers and industry professionals, demonstrating how a clear identity system can strengthen the perception of a product even within a conceptual context.', images: 'single' },
    ]
  },
  'beans': {
    name: 'beans', category: 'brand identity', year: '2024', role: 'lead designer',
    services: 'brand strategy, visual identity, packaging, art direction',
    sections: [
      { heading: 'hero', images: 'hero' },
      { heading: 'overview', text: 'beans is a conceptual bakery and caf\u00e9 centered on handmade, freshly prepared goods. the project explored how the warmth, care, and individuality behind handmade products could be expressed through a visual identity that felt approachable and authentic.', images: 'single' },
      { heading: 'approach', text: 'the identity was built around the idea that imperfections are a natural part of making things by hand. organic forms, expressive details, and human-centered visual elements were used throughout the system to reflect the freshness and craftsmanship behind the brand.', images: 'gallery' },
      { heading: 'outcome', text: 'the result was a distinctive identity that captured the character of the brand while reinforcing its focus on handmade quality. the system created a consistent visual language that could be applied across packaging, communication, and future brand touchpoints.', images: 'single' },
    ]
  },
  'ikaiva': {
    name: 'ikaiva studio', category: 'multidisciplinary studio', year: '2024', role: 'creative director',
    services: 'brand strategy, visual identity, website, communication',
    sections: [
      { heading: 'hero', images: 'hero' },
      { heading: 'overview', text: 'ikaiva is a multidisciplinary studio building work across design, technology, writing, and art. the project involved shaping the studio from its earliest foundations, defining not only how it looks, but also what it stands for and how it communicates its ideas.', images: 'single' },
      { heading: 'approach', text: 'the identity was built around a simple belief: every work should be guided by purpose. this idea became the foundation for the studio\u2019s positioning, visual identity, communication, website, and social presence. rather than treating these as separate outputs, they were developed as parts of a single system that could grow alongside the studio.', images: 'gallery' },
      { heading: 'outcome', text: 'the result was a cohesive identity that gave ikaiva a clear voice and direction. from its visual language to its digital presence, the studio was equipped with a framework that could support work across multiple disciplines while remaining consistent to its core belief.', images: 'single' },
    ]
  },
  'southern-floorings': {
    name: 'southern floorings', category: 'digital presence', year: '2024', role: 'designer',
    services: 'website design, content strategy, art direction',
    sections: [
      { heading: 'hero', images: 'hero' },
      { heading: 'overview', text: 'southern floorings is a tile manufacturing company specializing in handcrafted flooring solutions. the project focused on establishing a digital presence that could communicate the company\u2019s craftsmanship, story, and values beyond its physical products.', images: 'single' },
      { heading: 'approach', text: 'rather than functioning as a traditional product catalogue, the website was designed as a storytelling platform. through careful use of imagery, content structure, and visual hierarchy, the experience was built to showcase the people, process, and craftsmanship behind the work while making information accessible and engaging.', images: 'gallery' },
      { heading: 'outcome', text: 'the result was a digital presence that strengthened the company\u2019s credibility and visibility online. by providing a clearer way to communicate its story and showcase its work, the website became a valuable touchpoint for referrals, discovery, and brand awareness.', images: 'single' },
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
