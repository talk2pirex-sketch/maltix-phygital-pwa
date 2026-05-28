<template>
  <div :class="['app-container', { 'dark-mode': isDarkMode }]">
    <!-- Header -->
    <header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <svg class="maltix-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- M with rays -->
            <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round">
              <!-- Top ray -->
              <line x1="100" y1="10" x2="100" y2="30"/>
              <!-- Top-left ray -->
              <line x1="50" y1="20" x2="65" y2="35"/>
              <!-- Top-right ray -->
              <line x1="150" y1="20" x2="135" y2="35"/>
              <!-- Left horizontal -->
              <line x1="20" y1="60" x2="40" y2="60"/>
              <!-- Right horizontal -->
              <line x1="160" y1="60" x2="180" y2="60"/>
              <!-- M letter -->
              <path d="M 60 100 L 70 70 L 85 85 L 100 65 L 115 85 L 130 70 L 140 100"/>
            </g>
          </svg>
          <h1>Maltix Phygital</h1>
        </div>
        <div class="header-controls">
          <button @click="toggleTheme" class="theme-toggle" :title="isDarkMode ? 'Light Mode' : 'Dark Mode'">
            <span v-if="isDarkMode">☀️</span>
            <span v-else>🌙</span>
          </button>
          <div class="user-info">
            <span class="user-level">{{ userLevels[currentUserLevel] }}</span>
            <span class="user-name">{{ currentUser }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Navigation -->
    <nav class="main-nav">
      <button 
        v-for="item in navItems" 
        :key="item.id"
        @click="activeSection = item.id"
        :class="['nav-item', { active: activeSection === item.id }]"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Documents Section -->
      <section v-if="activeSection === 'documents'" class="section-documents">
        <h2>Document Library</h2>
        <div class="documents-header">
          <div class="filter-group">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search documents..."
              class="search-input"
            >
            <select v-model="filterLevel" class="level-filter">
              <option value="">All Levels</option>
              <option v-for="(label, idx) in userLevels" :key="idx" :value="idx">
                {{ label }}
              </option>
            </select>
          </div>
          <button @click="showCreateForm = true" class="btn-primary">+ New Document</button>
        </div>

        <!-- Document Grid -->
        <div class="documents-grid">
          <div 
            v-for="doc in filteredDocuments" 
            :key="doc.id"
            class="document-card"
          >
            <div class="doc-header">
              <h3>{{ doc.title }}</h3>
              <span class="doc-level">{{ userLevels[doc.level] }}</span>
            </div>
            <p class="doc-description">{{ doc.description }}</p>
            <div class="doc-meta">
              <span class="doc-date">{{ formatDate(doc.createdAt) }}</span>
              <span class="doc-type">{{ doc.type }}</span>
            </div>
            <div class="doc-links">
              <a v-if="doc.googleDriveUrl" :href="doc.googleDriveUrl" target="_blank" class="doc-link">
                <span class="link-icon">📄</span> Google Drive
              </a>
              <a v-if="doc.externalUrl" :href="doc.externalUrl" target="_blank" class="doc-link">
                <span class="link-icon">🔗</span> External Link
              </a>
            </div>
            <button @click="editDocument(doc)" class="btn-edit">Edit</button>
          </div>
        </div>
      </section>

      <!-- Create/Edit Document Section -->
      <section v-if="activeSection === 'create' || showCreateForm" class="section-create">
        <h2>{{ editingDoc ? 'Edit Document' : 'Create New Document' }}</h2>
        <form @submit.prevent="saveDocument" class="document-form">
          <div class="form-group">
            <label>Document Title *</label>
            <input v-model="form.title" type="text" required placeholder="Enter document title">
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="form.description" placeholder="Enter document description" rows="4"></textarea>
          </div>

          <div class="form-group">
            <label>Document Type *</label>
            <select v-model="form.type" required>
              <option value="">Select type</option>
              <option value="Policy">Policy</option>
              <option value="Procedure">Procedure</option>
              <option value="Manual">Manual</option>
              <option value="Template">Template</option>
              <option value="Report">Report</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label>Access Level *</label>
            <select v-model="form.level" required>
              <option v-for="(label, idx) in userLevels" :key="idx" :value="idx">
                {{ label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Google Drive Link</label>
            <input v-model="form.googleDriveUrl" type="url" placeholder="https://drive.google.com/...">
          </div>

          <div class="form-group">
            <label>External Link</label>
            <input v-model="form.externalUrl" type="url" placeholder="https://example.com/document">
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary">{{ editingDoc ? 'Update Document' : 'Create Document' }}</button>
            <button type="button" @click="resetForm" class="btn-secondary">Cancel</button>
          </div>
        </form>
      </section>

      <!-- Team/Hierarchy Section -->
      <section v-if="activeSection === 'hierarchy'" class="section-hierarchy">
        <h2>Organization Hierarchy</h2>
        <div class="hierarchy-container">
          <div v-for="(level, idx) in userLevels" :key="idx" class="hierarchy-level">
            <div class="level-header">
              <h3>{{ level }}</h3>
              <span class="level-count">{{ getTeamCount(idx) }} members</span>
            </div>
            <div class="level-content">
              <p class="level-description">{{ getLevelDescription(idx) }}</p>
              <ul class="team-list">
                <li v-for="member in getTeamMembers(idx)" :key="member">
                  <span class="member-icon">👤</span>
                  <span>{{ member }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Settings Section -->
      <section v-if="activeSection === 'settings'" class="section-settings">
        <h2>Settings</h2>
        <div class="settings-container">
          <div class="setting-item">
            <h3>Appearance</h3>
            <div class="setting-option">
              <label>Dark Mode</label>
              <button @click="toggleTheme" class="toggle-switch" :class="{ active: isDarkMode }"></button>
            </div>
          </div>

          <div class="setting-item">
            <h3>Sync & Cache</h3>
            <button @click="clearCache" class="btn-secondary">Clear Cache</button>
            <p class="setting-desc">Clear stored data to free up space</p>
          </div>

          <div class="setting-item">
            <h3>About</h3>
            <p class="setting-desc">Maltix Phygital v1.0.0</p>
            <p class="setting-desc">Progressive Web App for Hierarchical Document Management</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: this.getThemePreference(),
      activeSection: 'documents',
      showCreateForm: false,
      currentUser: 'John Manager',
      currentUserLevel: 2, // Manager level
      searchQuery: '',
      filterLevel: '',
      editingDoc: null,
      form: {
        title: '',
        description: '',
        type: '',
        level: 0,
        googleDriveUrl: '',
        externalUrl: ''
      },
      userLevels: ['Executive', 'Department Head', 'Manager', 'Staff', 'Support'],
      documents: [
        {
          id: 1,
          title: 'Company Policy',
          description: 'Main company operational policies',
          type: 'Policy',
          level: 0,
          createdAt: new Date('2024-01-15'),
          googleDriveUrl: 'https://drive.google.com/file/d/example1',
          externalUrl: ''
        },
        {
          id: 2,
          title: 'Department Procedures',
          description: 'Standard operating procedures for all departments',
          type: 'Procedure',
          level: 1,
          createdAt: new Date('2024-01-20'),
          googleDriveUrl: 'https://drive.google.com/file/d/example2',
          externalUrl: ''
        },
        {
          id: 3,
          title: 'Employee Handbook',
          description: 'Guidelines and benefits information',
          type: 'Manual',
          level: 2,
          createdAt: new Date('2024-01-22'),
          googleDriveUrl: '',
          externalUrl: 'https://example.com/handbook'
        }
      ],
      teamMembers: {
        0: ['Sarah CEO', 'James COO'],
        1: ['Maria IT', 'David HR', 'Lisa Finance'],
        2: ['John Manager', 'Emma Manager', 'Tom Manager'],
        3: ['Staff Member 1', 'Staff Member 2', 'Staff Member 3', 'Staff Member 4'],
        4: ['Support Staff 1', 'Support Staff 2']
      },
      navItems: [
        { id: 'documents', icon: '📚', label: 'Documents' },
        { id: 'create', icon: '✏️', label: 'Create' },
        { id: 'hierarchy', icon: '👥', label: 'Team' },
        { id: 'settings', icon: '⚙️', label: 'Settings' }
      ]
    }
  },
  computed: {
    filteredDocuments() {
      return this.documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                             doc.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesLevel = this.filterLevel === '' || doc.level === parseInt(this.filterLevel);
        return matchesSearch && matchesLevel;
      });
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('maltix-theme', this.isDarkMode ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    },
    getThemePreference() {
      const saved = localStorage.getItem('maltix-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    saveDocument() {
      if (this.editingDoc) {
        Object.assign(this.editingDoc, {
          ...this.form,
          level: parseInt(this.form.level)
        });
        this.editingDoc = null;
      } else {
        const newDoc = {
          id: Math.max(...this.documents.map(d => d.id), 0) + 1,
          ...this.form,
          level: parseInt(this.form.level),
          createdAt: new Date()
        };
        this.documents.push(newDoc);
      }
      this.resetForm();
      this.activeSection = 'documents';
    },
    editDocument(doc) {
      this.editingDoc = doc;
      this.form = { ...doc };
      this.activeSection = 'create';
      this.showCreateForm = true;
    },
    resetForm() {
      this.form = {
        title: '',
        description: '',
        type: '',
        level: 0,
        googleDriveUrl: '',
        externalUrl: ''
      };
      this.editingDoc = null;
      this.showCreateForm = false;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    },
    getTeamCount(level) {
      return this.teamMembers[level]?.length || 0;
    },
    getTeamMembers(level) {
      return this.teamMembers[level] || [];
    },
    getLevelDescription(level) {
      const descriptions = {
        0: 'Executive leadership and strategic decision makers',
        1: 'Department heads managing specific functions',
        2: 'Managers overseeing teams and operations',
        3: 'Staff members executing core responsibilities',
        4: 'Support personnel assisting with daily operations'
      };
      return descriptions[level] || '';
    },
    clearCache() {
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
          alert('Cache cleared successfully');
        });
      }
    }
  },
  mounted() {
    // Apply theme on mount
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
</script>

<style scoped>
/* Already handled in main.css */
</style>
