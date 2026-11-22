// Conteúdo do portfólio. Ajuste aqui para atualizar o site inteiro.
// Textos revisados com a skill redigir-texto-portfolio em 2026-11-18 (fontes: currículo, CONTEXTO.md e respostas do autor).
// Itens marcados como pendentes aparecem no site como "a confirmar".

export const LINKS = {
  email: 'jvlabremachado@gmail.com',
  github: 'https://github.com/LabreCoder',
  linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-victor-labre/',
  portfolioRepo: 'https://github.com/LabreCoder/portfolio',
}

export const PROFILE = {
  name: 'João Labre',
  headline: 'Estagiário de TI com foco em forense digital, pentest e blue team',
  role: 'Estagiário de TI · Cibersegurança',
  // Frase do topo, escolhida pelo autor em 2026-11-21.
  tagline: 'Estagiário de TI de dia, CTF à noite. Construindo base em blue team e forense digital, um lab por vez.',
  eyebrow: 'São Gonçalo, RJ · aberto a estágio em segurança',
  meta: [
    { label: 'Formação', value: 'Sistemas de Informação, UFF (prev. jul/2028)' },
    { label: 'Atuação atual', value: 'Estagiário de TI · Monitor de Programação I' },
    { label: 'Base', value: 'São Gonçalo, RJ' },
  ],
}

export const SECTIONS = [
  { id: 'sumario', label: 'Sobre', title: 'Um pouco sobre mim' },
  { id: 'historico', label: 'Experiência', title: 'Onde já trabalhei' },
  { id: 'competencias', label: 'Competências', title: 'Ferramentas e onde usei' },
  { id: 'labs', label: 'Labs', title: 'Prática em ambiente controlado' },
  { id: 'projetos', label: 'Projetos', title: 'No que estou construindo' },
  { id: 'formacao', label: 'Formação', title: 'Graduação e cursos' },
  { id: 'contato', label: 'Contato', title: 'Vamos conversar' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export const SUMMARY = [
  'Sou estudante de Sistemas de Informação na UFF e estagiário de TI. Quero atuar em cibersegurança, com foco em forense digital, pentest e blue team.',
  'No estágio, configuro regras de firewall, crio usuários e controlo permissões no Active Directory, monitoro o ambiente com Zabbix e atendo chamados no GLPi.',
  'Fora dele, pratico em plataformas de CTF (TryHackMe, Solyd e Hackers do Bem) e monto ambientes isolados com Docker para estudar vulnerabilidades sem risco.',
  'Também sou monitor de Programação I na UFF, onde ajudo calouros com lógica e Python.',
]

export type Experience = {
  role: string
  org: string
  period: string
  bullets: string[]
  tags: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Estagiário de TI',
    org: 'Biosys',
    period: 'Maio 2026 – Atual',
    bullets: [
      'Configuração de regras de firewall',
      'Criação de usuários e controle de permissões no Active Directory',
      'Monitoramento do ambiente corporativo com Zabbix',
      'Análise de dashboards no GLPi para apoiar a tomada de decisão',
      'Criação de bases de conhecimento no GLPi para a equipe de TI e demais áreas',
      'Triagem e atendimento inicial de chamados no GLPi, com controle de inventário',
    ],
    tags: ['Firewall', 'Active Directory', 'Zabbix', 'GLPi'],
  },
  {
    role: 'Monitor de Programação I',
    org: 'UFF',
    period: 'Abril 2026 – Atual',
    bullets: [
      'Apoio ao corpo docente no planejamento e na condução das aulas práticas de laboratório',
      'Elaboração de material de apoio em Python para os alunos ingressantes',
      'Atendimento de dúvidas em plantões, sobre lógica de programação e Python',
      'Correção de exercícios e apoio às atividades dos professores',
    ],
    tags: ['Python', 'Lógica de programação'],
  },
  {
    role: 'Jovem Aprendiz em TI',
    org: 'GestQual',
    period: 'Out 2024 – Abr 2026',
    bullets: [
      'Automação de rotinas com Python, integrada a operações em SQL, com redução do trabalho manual',
      'Desenvolvimento de dashboards em Power BI para relatórios gerenciais, apoiando a tomada de decisão',
      'Gestão das atividades da equipe com a metodologia Scrum, no Azure DevOps',
      'Armazenamento e proteção de documentos em nuvem (AWS S3), com rastreabilidade',
      'Resolução de chamados com correções diretas em banco de dados via SQL (consultas, inserções, atualizações e exclusões)',
      'Elaboração de procedimentos operacionais de suporte (POPs), com scripts anexados',
    ],
    tags: ['Python', 'SQL', 'Power BI', 'Scrum', 'Azure DevOps', 'AWS S3'],
  },
  {
    role: 'Jovem Aprendiz',
    org: 'Kovalent',
    period: 'Jul 2023 – Set 2024',
    bullets: ['Apoio à equipe em tarefas operacionais, no primeiro contato com o ambiente corporativo'],
    tags: [],
  },
]

// Matriz de competências: onde cada ferramenta já foi usada, sem nível autodeclarado.
// context vazio = contexto ainda não confirmado; pending = evidência ainda não confirmada.
export type Context = 'trabalho' | 'lab' | 'ensino' | 'projeto' | 'estudo'
export type Skill = { name: string; context: Context[]; evidence: string; pending?: boolean }

export const SKILL_GROUPS: { title: string; skills: Skill[] }[] = [
  {
    title: 'Segurança',
    skills: [
      { name: 'Pentest e exploração de vulnerabilidades', context: ['lab'], evidence: 'Testes em ambientes controlados (Labs)' },
      { name: 'Enumeração de redes', context: ['lab'], evidence: 'CTFs (Labs)' },
      { name: 'Nmap', context: ['lab'], evidence: 'Enumeração de redes nos CTFs (Labs)' },
      { name: 'Burp Suite', context: ['lab'], evidence: 'Sala ou writeup', pending: true },
      { name: 'Metasploit', context: ['lab'], evidence: 'Sala ou writeup', pending: true },
      { name: 'Wireshark', context: ['lab'], evidence: 'Sala ou writeup', pending: true },
      { name: 'Forense digital', context: ['estudo'], evidence: 'Curso, sala ou caso', pending: true },
    ],
  },
  {
    title: 'Infraestrutura',
    skills: [
      { name: 'Active Directory', context: ['trabalho'], evidence: 'Estágio de TI (Experiência)' },
      { name: 'Firewall', context: ['trabalho'], evidence: 'Configuração de regras no estágio (Experiência)' },
      { name: 'Zabbix', context: ['trabalho'], evidence: 'Monitoramento do ambiente no estágio (Experiência)' },
      { name: 'GLPi', context: ['trabalho'], evidence: 'Chamados, inventário, dashboards e bases de conhecimento (Experiência)' },
      { name: 'Linux', context: ['lab'], evidence: 'Ambiente pessoal e labs' },
      { name: 'Docker', context: ['lab'], evidence: 'Ambientes isolados para estudar vulnerabilidades' },
      { name: 'AWS S3', context: ['trabalho'], evidence: 'Jovem Aprendiz em TI (Experiência)' },
      { name: 'Redes de computadores', context: ['estudo'], evidence: 'Curso ou disciplina', pending: true },
    ],
  },
  {
    title: 'Desenvolvimento e dados',
    skills: [
      { name: 'Python', context: ['trabalho', 'ensino'], evidence: 'Scripts de automação (Experiência); monitoria na UFF' },
      { name: 'SQL (SQL Server, MySQL)', context: ['trabalho'], evidence: 'Operações e correções em banco (Experiência)' },
      { name: 'Power BI', context: ['trabalho'], evidence: 'Dashboards gerenciais (Experiência)' },
      { name: 'Scrum (Azure DevOps)', context: ['trabalho'], evidence: 'Gestão das atividades da equipe (Experiência)' },
      { name: 'Bash', context: ['trabalho', 'lab', 'projeto', 'estudo'], evidence: 'Script ou repositório', pending: true },
      { name: 'Git', context: ['trabalho', 'lab', 'projeto', 'estudo'], evidence: 'Repositórios no GitHub (Projetos)' },
      { name: 'JavaScript', context: ['estudo'], evidence: 'Disciplina ou projeto', pending: true },
      { name: 'C', context: ['estudo'], evidence: 'Disciplina ou projeto', pending: true },
    ],
  },
]

export const LABS_INTRO = 'Prática em ambientes controlados desde janeiro de 2026. Mantenho anotações pessoais dos CTFs.'

export type Lab = { name: string; focus: string; status: string; pending?: string }

export const LABS: Lab[] = [
  { name: 'TryHackMe', focus: 'Testes de invasão, exploração de vulnerabilidades e enumeração de redes.', status: 'Em andamento' },
  { name: 'Solyd', focus: 'Curso Introdução ao Hacking e Pentest 2.0.', status: 'Concluído' },
  {
    name: 'Hackers do Bem',
    focus: 'Nivelamento em Cibersegurança (RNP/MCTI): fundamentos de segurança, redes e sistemas operacionais.',
    status: 'Concluído',
  },
  { name: 'Labs próprios', focus: 'Ambientes isolados com Docker para estudar vulnerabilidades.', status: 'Contínuo' },
]

// Seção 5: repositórios do GitHub. Descrições tiradas dos README públicos de cada repositório.
// Estudo de caso: só fatos do README/código e das respostas do autor (sem métricas inventadas).
export type CaseStudy = { problem: string; built: string[]; decisions: string[]; result: string }
export type Project = { name: string; desc: string; href: string; stack: string[]; status: string; caseStudy?: CaseStudy }
export const PROJECTS: Project[] = [
  {
    name: 'Bank of Ideas',
    desc: 'Sistema para planejar conteúdo, da ideia ao post agendado: ideias, planejamentos com checklist, ciclos e painel com calendário de prazos. Sobe inteiro com um comando, via Docker Compose.',
    href: 'https://github.com/LabreCoder/Bank_of_ideas',
    stack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    status: 'em andamento',
    caseStudy: {
      problem:
        'Minhas ideias de conteúdo se perdiam entre aplicativos de notas e planilhas desatualizadas, e eu não tinha uma visão clara do que precisava publicar em cada semana.',
      built: [
        'Ideias: cadastro, edição e ativação das ideias à medida que surgem',
        'Planejamento: cada ideia vira um plano com datas, status e checklist com prazo por item',
        'Ciclos: vários planejamentos agrupados num mesmo período, com status calculado automaticamente',
        'Painel: indicadores de andamento e calendário com os próximos prazos',
      ],
      decisions: [
        'API em FastAPI com PostgreSQL e interface em React, tudo em Docker Compose: o sistema sobe com um comando',
        'Banco, API e interface publicados só em 127.0.0.1, porque a API ainda não tem autenticação',
        'Migrações com Alembic e testes com pytest num banco separado, sem tocar nos dados reais',
        'Perfil de produção próprio, com a interface servida pelo nginx',
      ],
      result:
        'Desenvolvi sozinho e uso o sistema para planejar o meu próprio conteúdo. No momento, estou reformulando a identidade visual.',
    },
  },
  {
    name: 'Ambiente universitário (UFF)',
    desc: 'Exercícios, trabalhos e projetos das disciplinas da graduação, organizados por matéria, e códigos de apoio da monitoria.',
    href: 'https://github.com/LabreCoder/UFF',
    stack: ['C', 'Python', 'Java', 'SQL'],
    status: 'em andamento',
  },
]
// Espaços reservados para projetos que ainda estão sendo finalizados.
export const PROJECT_FREE_SLOTS = 2

export type Course = { name: string; org?: string; pending?: string }

export const EDUCATION = {
  degree: { title: 'Bacharelado em Sistemas de Informação', org: 'Universidade Federal Fluminense — UFF', period: 'Conclusão prevista: julho de 2028' },
  courses: [
    { org: 'DIO', name: 'Bootcamp Cyber Security' },
    { org: 'Hackers do Bem', name: 'Nivelamento em Cibersegurança' },
    { org: 'Cisco Networking Academy', name: 'Introduction to Cybersecurity' },
    { org: 'TryHackMe', name: 'Pre Security' },
    { org: 'Solyd', name: 'Introdução ao Hacking e Pentest 2.0' },
    { org: 'Alura', name: 'Python Essentials' },
    { org: 'Alura', name: 'Linux Fundamentals' },
  ] as Course[],
}

export const CONTACT_TEXT = 'Procuro estágio em cibersegurança e topo formar time em CTFs. O jeito mais rápido de falar comigo é por e-mail.'

// Bloco "Agora" (seção Sobre). Atualizar quando mudar; a data mostra que a informação é recente.
export const NOW = {
  updated: 'novembro de 2026',
  items: [
    { label: 'Nos labs', value: 'Salas variadas no TryHackMe, sem trilha fixa', live: true },
    { label: 'Construindo', value: 'Bank of Ideas (nova identidade visual) e este portfólio' },
    { label: 'Estudando', value: 'Redes de computadores, além da graduação na UFF' },
  ],
}

// Painel de status do topo. Só fatos já confirmados nas seções abaixo.
export const STATUS = {
  focus: 'Forense digital · pentest · blue team',
  ongoing: 'Labs no TryHackMe',
  done: 'Solyd e Hackers do Bem',
  seeking: 'Estágio em cibersegurança',
  timezone: 'America/Sao_Paulo',
  place: 'São Gonçalo, RJ',
}

// Writeups de labs e CTFs (Labs). Vazio = a seção mostra só a tabela de plataformas.
// Antes de publicar: só máquinas/salas autorizadas e já liberadas para writeup pela plataforma
// (salas ativas costumam proibir solução pública). Estrutura de relatório de pentest:
export type Writeup = {
  title: string
  platform: string
  date: string // ex.: 'mar 2027'
  scope: string // alvo e regras do lab
  recon: string // enumeração e o que foi encontrado
  finding: string // vulnerabilidade e como foi explorada
  impact: string // o que um atacante conseguiria
  remediation: string // como corrigir
  href?: string // writeup completo (repositório ou post)
  tools: string[]
}
export const WRITEUPS: Writeup[] = []
