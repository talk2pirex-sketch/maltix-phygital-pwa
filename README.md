# Maltix Phygital Progressive Web App

## Overview

A modern, single Progressive Web App (PWA) for Maltix Limited featuring hierarchical document management with dark/light mode support. Inspired by classic 90s web board systems with 5-level organizational hierarchy.

## Features

### Core Features
- ✅ **Progressive Web App** - Works offline, installable, responsive
- ✅ **Hierarchical Access Control** - 5-level organization (Executive, Department Head, Manager, Staff, Support)
- ✅ **Document Library** - Create, edit, and manage documents
- ✅ **Google Drive Integration** - Link documents directly to Google Drive
- ✅ **External Links** - Support for custom external document links
- ✅ **Dark/Light Mode** - Full theme support with automatic preference detection
- ✅ **Search & Filter** - Find documents by title, description, and access level
- ✅ **Service Worker** - Offline functionality and caching

### Design
- 🎨 **Navy Blue Color Scheme** - Professional branding with primary navy (#001a4d)
- 📱 **Responsive Design** - Mobile-first approach, works on all devices
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🌐 **PWA Support** - Installable on mobile and desktop

## Organization Structure

The hierarchy is designed similar to classic 90s web boards:

```
Executive Level
├── Department Heads
├── Managers
├── Staff Members
└── Support Personnel
```

Each level has access to:
- Their own document library
- Procedures and policies relevant to their role
- Team member information
- Organizational structure

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Install as PWA

1. Open the app in your browser
2. Click the "Install" button (appears in address bar or browser menu)
3. Follow the prompts to add to your home screen

## Usage

### Documents

**View Documents:**
- Navigate to the Documents section
- Search by title or description
- Filter by access level
- Click document cards to see details

**Create Documents:**
1. Click the "Create" tab
2. Fill in document details:
   - Title
   - Description
   - Type (Policy, Procedure, Manual, Template, Report)
   - Access Level
   - Google Drive link (optional)
   - External link (optional)
3. Click "Create Document"

**Edit Documents:**
- Click "Edit" on any document card
- Modify details
- Click "Update Document"

### Team Hierarchy

View the organization structure:
- See all hierarchy levels
- View team members at each level
- Understand role descriptions
- Check team member count per level

### Settings

**Theme:**
- Toggle between Light and Dark modes
- Theme preference is saved automatically

**Cache:**
- Clear cached data to free up space
- Useful when storage is needed

## Technical Stack

- **Framework:** Vue 3
- **Build Tool:** Vite
- **Styling:** CSS3 with CSS Variables
- **PWA:** Service Worker, Web App Manifest
- **Storage:** LocalStorage (theme preference)

## Color Scheme

### Light Mode
- Background: White (#ffffff)
- Primary Text: Dark Gray (#111827)
- Primary Color: Navy Blue (#001a4d)
- Accent: Light Navy (#0052cc)

### Dark Mode
- Background: Dark Slate (#0f172a)
- Primary Text: Light Slate (#f1f5f9)
- Primary Color: Navy Blue (#001a4d)
- Accent: Light Navy (#0052cc)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## File Structure

```
malti-phygital-pwa/
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker
│   └── maltix-icon*.png      # App icons
├── src/
│   ├── main.js               # Entry point
│   ├── App.vue               # Root component
│   └── styles/
│       └── main.css          # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # Documentation
```

## Performance

- **Lazy Loading:** Documents load on demand
- **Caching:** Service worker caches assets
- **Offline Mode:** Full functionality without internet
- **Responsive:** Optimized for all screen sizes

## Future Enhancements

- [ ] User authentication
- [ ] Role-based access control (RBAC)
- [ ] Document version history
- [ ] Collaborative editing
- [ ] Real-time notifications
- [ ] Advanced search with filters
- [ ] Document templates
- [ ] Export to PDF
- [ ] Cloud sync
- [ ] Analytics dashboard

## License

Maltix Limited © 2024

## Support

For issues or questions, contact the development team or submit an issue in the repository.
