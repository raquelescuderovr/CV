import generated from './curriculum.generated.json';

export type Language = 'es' | 'en' | 'gl';

type TimelineItem = {
  year: string;
  title: string;
  institution?: string;
  detail: string;
  verified?: boolean;
};

type Work = {
  kind: string;
  title: string;
  detail: string;
  href?: string;
  linkLabel?: string;
};

type CvItem = { title: string; detail: string; status?: 'Acreditado' | 'Declarado' | 'Parcialmente acreditado' };
type CvGroup = { title: string; items: CvItem[] };

export type PageContent = {
  lang: Language;
  locale: string;
  title: string;
  description: string;
  name: string;
  role: string;
  eyebrow: string;
  intro: string;
  heroDetail: string;
  heroCta: string;
  cvLabel: string;
  cvHref?: string;
  languageSelectorLabel: string;
  skipContent: string;
  navigationLabel: string;
  nav: { profile: string; path: string; work: string; skills: string; contact: string };
  profile: { label: string; heading: string; body: string };
  path: { label: string; heading: string; items: TimelineItem[] };
  work: { label: string; heading: string; intro: string; items: Work[] };
  skills: { label: string; heading: string; languages: string; languageItems: string[]; capabilities: string; capabilityItems: string[] };
  completeCv: { label: string; heading: string; note: string; groups: CvGroup[] };
  contact: { label: string; heading: string; body: string; linkedinLabel: string };
  footer: string;
  backToTop: string;
  publicationNote: string;
  linkedinUrl?: string;
};

const shared = {
  name: generated.person.name || 'Raquel Escudero Valcárcel-Ríos',
  photo: '/images/raquel-escudero.jpeg',
  location: generated.person.location || 'A Coruña, España',
  linkedinUrl: generated.person.linkedin_url || 'https://www.linkedin.com/in/raquel-escudero-valcárcel-ríos-046a00217/',
};
const generatedRole = generated.person.role.split('|')[0]?.trim() || 'Graduada en Derecho';
const portfolioIntro = 'Graduada en Derecho y actualmente cursando el Máster de Abogacía y Procura. Me interesa cómo la tecnología transforma el Derecho civil, la protección de los derechos y la investigación jurídica.';
const profileIntro = 'Me interesa el Derecho cuando dialoga con los cambios de la sociedad. Mi perfil combina análisis jurídico, investigación y comunicación, con especial atención al impacto de la tecnología en el ámbito civil. Actualmente curso el Máster de Abogacía y Procura y sigo construyendo una mirada orientada al Derecho digital y la protección de los derechos.';

const generatedGroupTitles: Record<string, string> = {
  TITULACION: 'Formación académica',
  IDIOMA: 'Idiomas, cursos y acreditaciones',
  CURSO: 'Idiomas, cursos y acreditaciones',
  ACREDITACION: 'Idiomas, cursos y acreditaciones',
  PUBLICACION: 'Publicaciones y proyectos',
  PROYECTO: 'Publicaciones y proyectos',
  EXPERIENCIA: 'Experiencia y recorrido personal',
  OTRO: 'Experiencia y recorrido personal',
};

const generatedStatus: Record<string, CvItem['status']> = {
  verified: 'Acreditado',
  partial: 'Parcialmente acreditado',
  declared: 'Declarado',
};

const generatedCompleteCv: CvGroup[] = Object.entries(
  generated.merits.reduce<Record<string, CvItem[]>>((groups, merit) => {
    const groupTitle = generatedGroupTitles[merit.type] || 'Experiencia y recorrido personal';
    const suffix = [merit.entity, merit.location, merit.dates].filter(Boolean).join(' · ');
    const title = suffix ? `${merit.title} · ${suffix}` : merit.title;
    (groups[groupTitle] ??= []).push({
      title,
      detail: merit.description,
      status: generatedStatus[merit.status] || 'Declarado',
    });
    return groups;
  }, {}),
).map(([title, items]) => ({ title, items }));

if (generated.competencies.length) {
  generatedCompleteCv.push({
    title: 'Competencias',
    items: generated.competencies.map((competency) => ({
      title: competency.name,
      detail: competency.description,
      status: 'Declarado',
    })),
  });
}

const generatedMerit = (id: string) => generated.merits.find((merit) => merit.id === id);
const generatedPath = ['MER-0026', 'MER-0004', 'MER-0018', 'MER-0001', 'MER-0002']
  .map(generatedMerit)
  .filter((merit): merit is NonNullable<typeof merit> => Boolean(merit))
  .map((merit) => ({
    year: merit.dates,
    title: merit.title,
    institution: [merit.entity, merit.location].filter(Boolean).join(' · '),
    detail: merit.description,
    verified: merit.status === 'verified',
  }));
const generatedWork = ['MER-0010', 'MER-0018']
  .map(generatedMerit)
  .filter((merit): merit is NonNullable<typeof merit> => Boolean(merit))
  .map((merit) => ({
    kind: `${merit.type === 'PUBLICACION' ? 'Publicación' : 'Proyecto académico'}${merit.dates ? ` · ${merit.dates}` : ''}`,
    title: merit.title,
    detail: merit.description,
    href: merit.doi || undefined,
    linkLabel: merit.doi ? 'Consultar publicación' : undefined,
  }));

export const content: Record<Language, PageContent> = {
  es: {
    lang: 'es',
    locale: 'es-ES',
    title: 'Raquel Escudero Valcárcel-Ríos — Portfolio jurídico',
    description: 'Portfolio y currículum de Raquel Escudero Valcárcel-Ríos, graduada en Derecho con interés en Derecho digital, propiedad intelectual y contratación civil.',
    name: shared.name,
    role: generatedRole,
    eyebrow: 'Portfolio jurídico · A Coruña',
    intro: portfolioIntro,
    heroDetail: 'A Coruña · Derecho civil y cultura digital · ES / GL / EN',
    heroCta: 'Explorar trayectoria',
    cvLabel: 'Descargar CV · ES',
    languageSelectorLabel: 'Cambiar idioma',
    skipContent: 'Saltar al contenido',
    navigationLabel: 'Navegación principal',
    nav: { profile: 'Perfil', path: 'Trayectoria', work: 'Trabajo', skills: 'Competencias', contact: 'Contacto' },
    profile: {
      label: '01 · Perfil',
      heading: 'Derecho, investigación y cultura digital.',
      body: profileIntro,
    },
    path: {
      label: '02 · Trayectoria',
      heading: 'Formación y experiencias que sostienen el perfil.',
      items: generatedPath,
    },
    work: {
      label: '03 · Publicaciones y proyectos',
      heading: 'Investigar lo que cambia.',
      intro: 'Una selección de trabajos académicos y proyectos con información verificable.',
      items: generatedWork,
    },
    skills: {
      label: '04 · Competencias',
      heading: 'Herramientas para analizar, comunicar y avanzar.',
      languages: 'Idiomas',
      languageItems: ['Español', 'Gallego · CELGA 4', 'Inglés · B2 (Trinity ISE II)'],
      capabilities: 'Competencias',
      capabilityItems: ['Análisis jurídico y pensamiento crítico', 'Oratoria y argumentación jurídica', 'Trabajo en equipo y liderazgo', 'Resolución de problemas', 'Adaptabilidad intercultural', 'Creatividad e innovación', 'Mediación y representación estudiantil', 'Organización de eventos', 'Canva', 'IA generativa aplicada al ámbito jurídico', 'Búsqueda e investigación jurídica', 'Herramientas colaborativas y de productividad', 'Disciplina, constancia y precisión', 'Redacción argumentativa y disertación', 'Mediación escolar'],
    },
    completeCv: { label: '05 · Currículum completo', heading: 'Currículum completo.', note: 'Abre cada bloque para consultar el detalle y su estado de acreditación.', groups: generatedCompleteCv },
    contact: {
      label: '06 · Contacto',
      heading: 'Hablemos.',
      body: 'Para oportunidades profesionales, colaboraciones o conversaciones sobre Derecho y tecnología, puedes encontrarme en LinkedIn.',
      linkedinLabel: 'Conectar en LinkedIn',
    },
    footer: 'Portfolio profesional',
    backToTop: 'Volver arriba',
    publicationNote: 'Los documentos acreditativos no se publican en este sitio.',
    linkedinUrl: shared.linkedinUrl,
  },
  en: {
    lang: 'en',
    locale: 'en-GB',
    title: 'Raquel Escudero Valcárcel-Ríos — Legal portfolio',
    description: 'Portfolio and CV of Raquel Escudero Valcárcel-Ríos, a Law graduate interested in digital law, intellectual property and civil contracting.',
    name: shared.name,
    role: 'Law graduate',
    eyebrow: 'Legal portfolio · A Coruña, Spain',
    intro: 'An analytical profile interested in the impact of new technologies on civil law, legal research and communication.',
    heroDetail: 'A Coruña · Civil law and digital culture · ES / GL / EN',
    heroCta: 'Explore background',
    cvLabel: '',
    languageSelectorLabel: 'Change language',
    skipContent: 'Skip to content',
    navigationLabel: 'Main navigation',
    nav: { profile: 'Profile', path: 'Background', work: 'Work', skills: 'Skills', contact: 'Contact' },
    profile: {
      label: '01 · Profile',
      heading: 'Law, research and digital culture.',
      body: 'Law graduate from the Universidade da Coruña. My interests focus on how technological change reframes the protection of personal rights, intellectual property and civil relationships.',
    },
    path: {
      label: '02 · Background',
      heading: 'Education and experience that underpin the profile.',
      items: [
        { year: '2021—2026', title: 'Degree in Law', institution: 'Universidade da Coruña', detail: '240 ECTS credits completed. Academic record closed because the degree has been requested.' },
        { year: '2026', title: 'Undergraduate dissertation: Euthanasia and pre-trial detention', institution: 'Universidade da Coruña', detail: 'Recorded grade: 9.5/10 (Outstanding).', verified: false },
        { year: '2021', title: 'Upper Secondary Education in Humanities and Social Sciences', institution: 'IES Rafael Dieste · A Coruña', detail: 'Final grade: 8.52/10.' },
        { year: '2021', title: 'School Mediation Team Mediator', institution: 'IES Rafael Dieste · A Coruña', detail: 'Awarded a diploma for school mediation work.' },
      ],
    },
    work: {
      label: '03 · Publications and projects',
      heading: 'Researching what changes.',
      intro: 'A selection of academic work and projects supported by verifiable information.',
      items: [
        {
          kind: 'Publication · 2026',
          title: 'Civil law responses to deepfakes: honour, privacy and one’s own image in the digital age',
          detail: 'An article inspired by an undergraduate dissertation, published open access on Zenodo.',
          href: 'https://doi.org/10.5281/zenodo.18386692',
          linkLabel: 'Read publication',
        },
        {
          kind: 'Academic project · 2026',
          title: 'Euthanasia and pre-trial detention',
          detail: 'Undergraduate dissertation completed at the Universidade da Coruña. Recorded grade: 9.5/10 (Outstanding).',
        },
      ],
    },
    skills: {
      label: '04 · Skills',
      heading: 'Tools to analyse, communicate and move work forward.',
      languages: 'Languages',
      languageItems: ['Spanish', 'Galician · CELGA 4', 'English · B2 (Trinity ISE II)'],
      capabilities: 'Capabilities',
      capabilityItems: ['Legal analysis and critical thinking', 'Legal public speaking and argumentation', 'Teamwork and leadership', 'Problem solving', 'Intercultural adaptability', 'Creativity and innovation', 'Student mediation and representation', 'Event organisation', 'Canva', 'Generative AI applied to legal work', 'Legal research', 'Collaboration and productivity tools', 'Discipline, consistency and precision', 'Argumentative writing and essay writing', 'School mediation'],
    },
    completeCv: { label: '05 · Full CV', heading: 'Full CV.', note: 'Open each section to view the detailed entry and its evidence status.', groups: generatedCompleteCv },
    contact: {
      label: '06 · Contact',
      heading: 'Let’s talk.',
      body: 'For professional opportunities, collaborations or conversations about law and technology, you can find me on LinkedIn.',
      linkedinLabel: 'Connect on LinkedIn',
    },
    footer: 'Professional portfolio',
    backToTop: 'Back to top',
    publicationNote: 'Supporting documents are not published on this website.',
    linkedinUrl: shared.linkedinUrl,
  },
  gl: {
    lang: 'gl',
    locale: 'gl-ES',
    title: 'Raquel Escudero Valcárcel-Ríos — Portfolio xurídico',
    description: 'Portfolio e currículo de Raquel Escudero Valcárcel-Ríos, graduada en Dereito con interese no dereito dixital, a propiedade intelectual e a contratación civil.',
    name: shared.name,
    role: 'Graduada en Dereito',
    eyebrow: 'Portfolio xurídico · A Coruña',
    intro: 'Perfil analítico con interese no impacto das novas tecnoloxías no ámbito civil, na investigación xurídica e na comunicación.',
    heroDetail: 'A Coruña · Dereito civil e cultura dixital · ES / GL / EN',
    heroCta: 'Explorar traxectoria',
    cvLabel: 'Descargar CV · ES',
    languageSelectorLabel: 'Cambiar idioma',
    skipContent: 'Saltar ao contido',
    navigationLabel: 'Navegación principal',
    nav: { profile: 'Perfil', path: 'Traxectoria', work: 'Traballo', skills: 'Competencias', contact: 'Contacto' },
    profile: {
      label: '01 · Perfil',
      heading: 'Dereito, investigación e cultura dixital.',
      body: 'Graduada en Dereito pola Universidade da Coruña. O meu interese céntrase en como os cambios tecnolóxicos reformulan a protección dos dereitos persoais, a propiedade intelectual e as relacións civís.',
    },
    path: {
      label: '02 · Traxectoria',
      heading: 'Formación e experiencias que sosteñen o perfil.',
      items: [
        { year: '2021—2026', title: 'Grao en Dereito', institution: 'Universidade da Coruña', detail: '240 créditos ECTS superados. Expediente pechado por estar en posesión do título solicitado.' },
        { year: '2026', title: 'Traballo de Fin de Grao: Eutanasia e prisión provisional', institution: 'Universidade da Coruña', detail: 'Cualificación: 9,5/10 (Sobresaliente).', verified: false },
        { year: '2021', title: 'Bacharelato en Humanidades e Ciencias Sociais', institution: 'IES Rafael Dieste · A Coruña', detail: 'Cualificación final: 8,52/10.' },
        { year: '2021', title: 'Mediadora do Equipo de Convivencia', institution: 'IES Rafael Dieste · A Coruña', detail: 'Diploma polo labor de mediación escolar.' },
      ],
    },
    work: {
      label: '03 · Publicacións e proxectos',
      heading: 'Investigar o que cambia.',
      intro: 'Unha selección de traballos académicos e proxectos con información verificable.',
      items: [
        {
          kind: 'Publicación · 2026',
          title: 'La respuesta del Derecho Civil a los deepfakes: el honor, la intimidad y la propia imagen en la era digital',
          detail: 'Artigo inspirado nun Traballo de Fin de Grao, publicado en acceso aberto en Zenodo.',
          href: 'https://doi.org/10.5281/zenodo.18386692',
          linkLabel: 'Consultar publicación',
        },
        {
          kind: 'Proxecto académico · 2026',
          title: 'Eutanasia e prisión provisional',
          detail: 'Traballo de Fin de Grao realizado na Universidade da Coruña. Cualificación rexistrada: 9,5/10 (Sobresaliente).',
        },
      ],
    },
    skills: {
      label: '04 · Competencias',
      heading: 'Ferramentas para analizar, comunicar e avanzar.',
      languages: 'Idiomas',
      languageItems: ['Castelán', 'Galego · CELGA 4', 'Inglés · B2 (Trinity ISE II)'],
      capabilities: 'Competencias',
      capabilityItems: ['Análise xurídica e pensamento crítico', 'Oratoria e argumentación xurídica', 'Traballo en equipo e liderado', 'Resolución de problemas', 'Adaptabilidade intercultural', 'Creatividade e innovación', 'Mediación e representación estudantil', 'Organización de eventos', 'Canva', 'IA xerativa aplicada ao ámbito xurídico', 'Busca e investigación xurídica', 'Ferramentas colaborativas e de produtividade', 'Disciplina, constancia e precisión', 'Redacción argumentativa e disertación', 'Mediación escolar'],
    },
    completeCv: { label: '05 · Currículo completo', heading: 'Currículo completo.', note: 'Abre cada bloque para consultar o detalle e o seu estado de acreditación.', groups: generatedCompleteCv },
    contact: {
      label: '06 · Contacto',
      heading: 'Falemos.',
      body: 'Para oportunidades profesionais, colaboracións ou conversas sobre Dereito e tecnoloxía, podes atoparme en LinkedIn.',
      linkedinLabel: 'Conectar en LinkedIn',
    },
    footer: 'Portfolio profesional',
    backToTop: 'Volver arriba',
    publicationNote: 'Os documentos acreditativos non se publican neste sitio.',
    linkedinUrl: shared.linkedinUrl,
  },
};

export { shared };
