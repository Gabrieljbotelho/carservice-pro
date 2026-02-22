/**
 * CarService Pro - Estilos
 * Tema Dark Moderno
 */

:root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --bg-dark: #0f0f0f;
    --bg-card: #1a1a1a;
    --bg-sidebar: #111111;
    --text-primary: #ffffff;
    --text-secondary: #9ca3af;
    --border-color: #2a2a2a;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --info: #3b82f6;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-primary);
    overflow-x: hidden;
}

.container {
    display: flex;
    min-height: 100vh;
}

/* Loading Overlay */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-dark);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.3s;
    gap: 20px;
}

.loading-overlay.hidden {
    opacity: 0;
    pointer-events: none;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 3px solid var(--border-color);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Connection Bar */
.connection-bar {
    position: fixed;
    top: 0;
    left: 260px;
    right: 0;
    height: 4px;
    z-index: 9998;
    transition: all 0.3s;
}

.connection-bar.connected {
    background: linear-gradient(90deg, var(--success), #34d399);
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

.connection-bar.connecting {
    background: linear-gradient(90deg, var(--warning), #fbbf24);
    animation: pulse 1.5s infinite;
}

.connection-bar.error {
    background: linear-gradient(90deg, var(--danger), #f87171);
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* Toast Notifications */
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 300px;
    animation: slideIn 0.3s ease;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
}

.toast.success { border-left: 4px solid var(--success); }
.toast.error { border-left: 4px solid var(--danger); }
.toast.warning { border-left: 4px solid var(--warning); }
.toast.info { border-left: 4px solid var(--info); }

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

/* Sidebar */
.sidebar {
    width: 260px;
    background: var(--bg-sidebar);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 100;
}

.logo {
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid var(--border-color);
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: var(--primary);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.logo-text h1 {
    font-size: 18px;
    font-weight: 700;
}

.logo-text span {
    font-size: 12px;
    color: var(--text-secondary);
}

.connection-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    margin-top: 8px;
}

.connection-badge.connected {
    background: rgba(16, 185, 129, 0.2);
    color: var(--success);
}

.connection-badge.offline {
    background: rgba(245, 158, 11, 0.2);
    color: var(--warning);
}

.nav-menu {
    padding: 16px 12px;
    flex: 1;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    margin-bottom: 4px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--text-secondary);
    text-decoration: none;
    border: none;
    background: none;
    width: 100%;
    font-size: 14px;
    font-family: inherit;
}

.nav-item:hover {
    background: rgba(255,255,255,0.05);
    color: var(--text-primary);
}

.nav-item.active {
    background: var(--primary);
    color: white;
}

.nav-item i {
    width: 20px;
    text-align: center;
}

.sidebar-footer {
    padding: 20px;
    border-top: 1px solid var(--border-color);
}

.help-box {
    background: rgba(37, 99, 235, 0.1);
    border: 1px solid rgba(37, 99, 235, 0.2);
    border-radius: 12px;
    padding: 16px;
}

.help-box h4 {
    font-size: 14px;
    margin-bottom: 4px;
}

.help-box p {
    font-size: 12px;
    color: var(--text-secondary);
}

/* Main Content */
.main-content {
    flex: 1;
    margin-left: 260px;
    padding: 24px 32px;
    padding-top: 28px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.welcome h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 4px;
}

.welcome p {
    color: var(--text-secondary);
    font-size: 14px;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.date-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 14px;
}

.icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
}

.icon-btn:hover {
    background: var(--primary);
    border-color: var(--primary);
}

.badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: var(--primary);
    color: white;
    font-size: 10px;
    font-weight: 600;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dashboard-title {
    margin-bottom: 24px;
}

.dashboard-title h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.dashboard-title p {
    color: var(--text-secondary);
}

.sync-badge {
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.sync-badge.synced {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
}

.sync-badge.syncing {
    background: rgba(59, 130, 246, 0.1);
    color: var(--info);
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 24px;
}

.stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.stat-label {
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
}

.stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.stat-icon.blue { background: rgba(37, 99, 235, 0.1); color: var(--primary); }
.stat-icon.green { background: rgba(16, 185, 129, 0.1); color: var(--success); }
.stat-icon.orange { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
.stat-icon.emerald { background: rgba(52, 211, 153, 0.1); color: #34d399; }

.stat-value {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
}

.stat-change {
    font-size: 12px;
    font-weight: 500;
}

.stat-change.positive { color: var(--success); }
.stat-change.negative { color: var(--danger); }

/* Quick Actions */
.quick-actions {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
}

.section-header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section-header h3 {
    font-size: 18px;
    font-weight: 600;
}

.actions-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

.action-btn {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--text-primary);
    font-family: inherit;
}

.action-btn:hover {
    background: rgba(37, 99, 235, 0.1);
    border-color: var(--primary);
    transform: translateY(-2px);
}

.action-btn i {
    font-size: 24px;
    margin-bottom: 12px;
    display: block;
    color: var(--text-secondary);
}

.action-btn:hover i {
    color: var(--primary);
}

.action-btn span {
    font-size: 14px;
    font-weight: 500;
    display: block;
}

/* Content Grid */
.content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.panel {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 24px;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.panel-header h3 {
    font-size: 16px;
    font-weight: 600;
}

.view-all {
    color: var(--primary);
    font-size: 13px;
    text-decoration: none;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
}

/* Service List */
.service-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.service-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: rgba(255,255,255,0.02);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.service-item:hover {
    background: rgba(255,255,255,0.04);
    transform: translateX(4px);
}

.service-icon {
    width: 48px;
    height: 48px;
    background: rgba(37, 99, 235, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 20px;
}

.service-info {
    flex: 1;
}

.service-info h4 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
}

.service-info p {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.4;
}

.service-meta {
    text-align: right;
}

.service-time {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 6px;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
}

.status-badge.completed {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
}

.status-badge.progress {
    background: rgba(59, 130, 246, 0.1);
    color: var(--info);
}

.status-badge.pending {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning);
}

/* Appointment List */
.appointment-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.appointment-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: rgba(255,255,255,0.02);
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.appointment-time {
    text-align: center;
    min-width: 50px;
}

.appointment-time .day {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary);
    display: block;
}

.appointment-time .month {
    font-size: 11px;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.appointment-info {
    flex: 1;
}

.appointment-info h4 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
}

.appointment-info p {
    font-size: 13px;
    color: var(--text-secondary);
}

.btn-details {
    padding: 8px 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
}

.btn-details:hover {
    background: var(--primary);
    border-color: var(--primary);
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    backdrop-filter: blur(5px);
}

.modal-overlay.active {
    display: flex;
}

.modal {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalIn 0.3s ease;
}

@keyframes modalIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.modal-header {
    padding: 24px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    font-size: 20px;
    font-weight: 600;
}

.modal-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.modal-close:hover {
    color: var(--text-primary);
}

.modal-body {
    padding: 24px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    color: var(--text-primary);
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.modal-footer {
    padding: 20px 24px;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.btn-secondary {
    padding: 12px 24px;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
}

.btn-secondary:hover {
    background: rgba(255,255,255,0.05);
}

.btn-primary {
    padding: 12px 24px;
    background: var(--primary);
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
}

/* Section Content */
.section-content {
    display: none;
}

.section-content.active {
    display: block;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Data Table */
.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th,
.data-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

.data-table th {
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
}

.data-table td {
    font-size: 14px;
}

.data-table tr:hover td {
    background: rgba(255,255,255,0.02);
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
}

.empty-state i {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
}

/* Responsive */
@media (max-width: 1200px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .actions-grid { grid-template-columns: repeat(2, 1fr); }
    .connection-bar { left: 0; }
}

@media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .main-content { margin-left: 0; padding: 16px; padding-top: 20px; }
    .stats-grid { grid-template-columns: 1fr; }
    .content-grid { grid-template-columns: 1fr; }
    .actions-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
}
/* ==========================================
   WHATSAPP INTEGRATION
   ========================================== */

:root {
    --whatsapp: #25d366;
    --whatsapp-dark: #128c7e;
}

/* WhatsApp Header */
.whatsapp-header {
    background: linear-gradient(135deg, rgba(37, 211, 102, 0.1), rgba(18, 140, 126, 0.1));
    border: 1px solid rgba(37, 211, 102, 0.2);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
}

.whatsapp-icon-large {
    width: 60px;
    height: 60px;
    background: var(--whatsapp);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: white;
    flex-shrink: 0;
}

.whatsapp-info h3 {
    font-size: 20px;
    margin-bottom: 4px;
}

.whatsapp-info p {
    color: var(--text-secondary);
    font-size: 14px;
}

.whatsapp-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 8px;
    background: rgba(37, 211, 102, 0.2);
    color: var(--whatsapp);
}

.btn-whatsapp {
    background: var(--whatsapp) !important;
    margin-left: auto;
}

.btn-whatsapp:hover {
    background: var(--whatsapp-dark) !important;
}

/* Templates */
.templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    margin-top: 20px;
}

.template-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.3s;
}

.template-card:hover {
    border-color: var(--whatsapp);
    transform: translateY(-2px);
    background: rgba(37, 211, 102, 0.05);
}

.template-card h4 {
    font-size: 14px;
    margin-bottom: 8px;
    color: var(--whatsapp);
    display: flex;
    align-items: center;
    gap: 8px;
}

.template-card p {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
}

/* Chat Layout */
.chat-container {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 24px;
    height: calc(100vh - 400px);
    min-height: 500px;
}

.chat-sidebar {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-search {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
}

.chat-search input {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    color: var(--text-primary);
    font-size: 14px;
}

.chat-search input:focus {
    outline: none;
    border-color: var(--whatsapp);
}

.chat-list {
    flex: 1;
    overflow-y: auto;
}

.chat-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.3s;
    border-bottom: 1px solid var(--border-color);
}

.chat-item:hover {
    background: rgba(255,255,255,0.02);
}

.chat-item.active {
    background: rgba(37, 211, 102, 0.1);
    border-left: 3px solid var(--whatsapp);
}

.chat-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--whatsapp), var(--whatsapp-dark));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
    flex-shrink: 0;
}

.chat-preview {
    flex: 1;
    min-width: 0;
}

.chat-preview h4 {
    font-size: 14px;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.chat-preview p {
    font-size: 13px;
    color: var(--text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.chat-meta {
    text-align: right;
}

.chat-time {
    font-size: 11px;
    color: var(--text-secondary);
    margin-bottom: 4px;
}

/* Chat Main */
.chat-main {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2325d366' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.chat-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chat-header-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.chat-header-actions {
    display: flex;
    gap: 8px;
}

.icon-btn.whatsapp {
    background: rgba(37, 211, 102, 0.1);
    border-color: var(--whatsapp);
    color: var(--whatsapp);
}

.icon-btn.whatsapp:hover {
    background: var(--whatsapp);
    color: white;
}

/* Messages */
.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.message {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.4;
    position: relative;
    animation: messageIn 0.3s ease;
}

@keyframes messageIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.message.received {
    background: rgba(255,255,255,0.05);
    align-self: flex-start;
    border-bottom-left-radius: 4px;
}

.message.sent {
    background: rgba(37, 211, 102, 0.2);
    border: 1px solid rgba(37, 211, 102, 0.3);
    align-self: flex-end;
    border-bottom-right-radius: 4px;
}

.message-time {
    font-size: 11px;
    color: var(--text-secondary);
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: flex-end;
}

.message-status {
    color: var(--whatsapp);
}

/* Input Area */
.chat-input-area {
    padding: 16px 20px;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 12px;
    align-items: center;
}

.chat-input {
    flex: 1;
    padding: 12px 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    color: var(--text-primary);
    font-size: 14px;
    font-family: inherit;
}

.chat-input:focus {
    outline: none;
    border-color: var(--whatsapp);
}

.chat-send-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--whatsapp);
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.chat-send-btn:hover {
    background: var(--whatsapp-dark);
    transform: scale(1.05);
}

/* Responsive */
@media (max-width: 1200px) {
    .chat-container { grid-template-columns: 1fr; }
    .chat-sidebar { display: none; }
    .chat-sidebar.active { 
        display: block; 
        position: fixed;
        left: 0;
        top: 0;
        width: 300px;
        height: 100vh;
        z-index: 1000;
    }
}

@media (max-width: 768px) {
    .templates-grid { grid-template-columns: 1fr; }
    .whatsapp-header { flex-direction: column; text-align: center; }
}
