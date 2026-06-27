import { RecentProject } from '../models/project.model';

export const RECENT_PROJECTS: RecentProject[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    tagline: 'Modern storefront experience',
    status: 'in-progress',
    statusLabel: 'In development',
    currentFocus: 'Checkout flow, product filters, and admin inventory dashboard',
    description:
      'A full-stack e-commerce platform with cart persistence, secure Stripe payments, order tracking, and a responsive product catalog built for conversion.',
    image: '/images/projects/ecommerce-store.webp',
    imageAlt: 'E-commerce storefront with product grid and shopping cart',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    accent: 'primary',
    icon: 'bi-bag-heart-fill',
    caseStudy: {
      problem: 'Personal projects often stop at UI mockups without real checkout, inventory, or order flows.',
      approach:
        'Designing a modular storefront with server actions, Stripe webhooks, and an admin layer for catalog and stock management.',
      outcome: 'End-to-end purchase path from browse to payment confirmation with persistent carts across sessions.',
      highlights: ['Stripe checkout integration', 'Filterable product catalog', 'Admin inventory dashboard'],
    },
  },
  {
    id: 'netflix-clone',
    title: 'Netflix Clone',
    tagline: 'Streaming-style media app',
    status: 'active',
    statusLabel: 'Active build',
    currentFocus: 'Hero banners, category rows, profiles, and watchlist sync',
    description:
      'A Netflix-inspired streaming UI with browse rails, search, authentication, and media detail pages — tuned for smooth scrolling and cinematic layout.',
    image: '/images/projects/netflix-clone.webp',
    imageAlt: 'Streaming app homepage with hero banner and movie rows',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Framer Motion'],
    accent: 'secondary',
    icon: 'bi-collection-play-fill',
    caseStudy: {
      problem: 'Streaming UIs need fast browse patterns, profile switching, and media detail without janky scroll.',
      approach:
        'Componentized rails with lazy media loading, JWT auth, S3-backed assets, and motion tuned for 60fps interactions.',
      outcome: 'Cinematic homepage with category rows, search, profiles, and detail pages that feel production-grade.',
      highlights: ['Hero + browse rails', 'Profile-based watchlists', 'S3 media delivery'],
    },
  },
  {
    id: 'realtime-chat',
    title: 'Real-Time Chat',
    tagline: 'Live messaging platform',
    status: 'polishing',
    statusLabel: 'Polishing UX',
    currentFocus: 'Socket rooms, typing indicators, read receipts, and online presence',
    description:
      'A real-time chat app with instant delivery, group channels, message history, and a clean messenger interface designed for low-latency conversations.',
    image: '/images/projects/realtime-chat.webp',
    imageAlt: 'Real-time chat interface with message bubbles and online presence',
    tech: ['Angular', 'NestJS', 'Socket.io', 'Redis', 'PostgreSQL'],
    accent: 'accent',
    icon: 'bi-chat-dots-fill',
    caseStudy: {
      problem: 'Chat apps fail when message delivery, presence, and history feel inconsistent under load.',
      approach:
        'Socket.io rooms with Redis pub/sub for scale, persisted threads in PostgreSQL, and optimistic UI for send states.',
      outcome: 'Sub-second message delivery with typing indicators, read receipts, and reliable history replay.',
      highlights: ['Room-based messaging', 'Typing + read receipts', 'Redis-backed presence'],
    },
  },
  {
    id: 'spotify-clone',
    title: 'Spotify Clone',
    tagline: 'Music streaming experience',
    status: 'in-progress',
    statusLabel: 'In development',
    currentFocus: 'Playback controls, playlists, search, and album detail views',
    description:
      'A Spotify-inspired music app with browse and search, queue management, playlist creation, and a responsive player UI tuned for smooth audio transitions.',
    image: '/images/projects/spotify-clone.webp',
    imageAlt: 'Music streaming app with album art, playlist sidebar, and playback bar',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    accent: 'primary',
    icon: 'bi-music-note-beamed',
    caseStudy: {
      problem: 'Music apps require seamless playback, queue control, and discovery without breaking layout on mobile.',
      approach:
        'Global player state, playlist CRUD APIs, search indexing, and a responsive shell with persistent playback bar.',
      outcome: 'Unified browse, search, and playlist flows with continuous playback across navigation.',
      highlights: ['Persistent player bar', 'Playlist management', 'Album detail views'],
    },
  },
  {
    id: 'activity-dashboard',
    title: 'System Activity Tracking Dashboard',
    tagline: 'Real-time ops visibility',
    status: 'active',
    statusLabel: 'Active build',
    currentFocus: 'Live metrics, event timelines, alerts, and user session analytics',
    description:
      'An observability dashboard for tracking system activity — CPU and memory trends, API latency, error rates, and audit trails in a single operational view.',
    image: '/images/projects/activity-dashboard.webp',
    imageAlt: 'System activity dashboard with charts, metrics cards, and event timeline',
    tech: ['Angular', 'Node.js', 'WebSockets', 'Redis', 'Grafana'],
    accent: 'secondary',
    icon: 'bi-activity',
    caseStudy: {
      problem: 'Ops teams need one pane of glass for latency spikes, errors, and session anomalies.',
      approach:
        'WebSocket metric streams, time-series cards, alert thresholds, and an auditable event timeline.',
      outcome: 'Live operational dashboard surfacing API health, resource trends, and actionable alerts.',
      highlights: ['Live metric streams', 'Alert thresholds', 'Session analytics'],
    },
  },
  {
    id: 'jibe-qhse-task-manager',
    title: 'Jibe ERP QHSE | Task Manager',
    tagline: 'Enterprise compliance workflows',
    status: 'active',
    statusLabel: 'Active build',
    currentFocus: 'Task assignment, audit trails, offline sync, and QHSE workflow automation',
    description:
      'A QHSE task manager module inside JiBe ERP — incident follow-ups, corrective actions, permit workflows, and compliance tracking for distributed maritime teams.',
    image: '/images/projects/jibe-qhse-task-manager.webp',
    imageAlt: 'QHSE task manager with task board, status filters, and compliance checklist',
    tech: ['Angular 19', 'Node.js', 'SQL Server', 'RabbitMQ', 'PrimeNG'],
    accent: 'accent',
    icon: 'bi-clipboard-check-fill',
    caseStudy: {
      problem:
        'Maritime QHSE teams across 50+ sites needed traceable corrective actions, permits, and audit-ready workflows inside ERP.',
      approach:
        'Built Angular 19 task boards with RabbitMQ-driven sync, SQL Server audit trails, and offline-tolerant assignment flows.',
      outcome:
        'Compliance tasks ship inside JiBe ERP with assignment, status tracking, and audit history for distributed crews.',
      highlights: ['50+ site workflows', 'RabbitMQ event sync', 'Audit-ready task history'],
    },
  },
];
