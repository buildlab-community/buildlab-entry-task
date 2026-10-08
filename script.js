:root {
  --bg: #f3f7ff;
  --panel: #ffffff;
  --panel-alt: #eef4ff;
  --primary: #3b82f6;
  --primary-dark: #1d4ed8;
  --success: #16a34a;
  --success-soft: #dcfce7;
  --text: #1f2937;
  --muted: #6b7280;
  --line: #dfeafc;
  --danger: #ef4444;
  --danger-soft: #fee2e2;
  --warning: #f59e0b;
  --shadow: 0 18px 45px rgba(59, 130, 246, 0.12);
}

* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #eff6ff 0%, #dfeafe 100%);
  color: var(--text);
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  width: min(960px, calc(100% - 2rem));
  margin: 2rem auto;
}

.topbar {
  margin-bottom: 1rem;
}

.eyebrow {
  margin: 0 0 0.35rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary-dark);
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.app-card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 24px;
  box-shadow: var(--shadow);
  padding: 1.5rem;
}

.task-form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
}

.task-form input,
.search-wrap input {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  background: #fff;
  color: var(--text);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.task-form input:focus,
.search-wrap input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
}

.task-form button {
  border: none;
  border-radius: 12px;
  background: var(--primary);
  color: #fff;
  font-weight: 700;
  padding: 0.9rem 1.2rem;
  transition: transform 0.2s ease, background 0.2s ease;
}

.task-form button:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.feedback {
  min-height: 1.5rem;
  margin-top: 0.75rem;
  font-size: 0.92rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.feedback.show {
  opacity: 1;
  transform: translateY(0);
}

.feedback.error {
  color: var(--danger);
}

.feedback.success {
  color: var(--success);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1.25rem;
  flex-wrap: wrap;
}

.search-wrap {
  flex: 1 1 240px;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  border: 1px solid var(--line);
  background: var(--panel-alt);
  color: var(--text);
  padding: 0.7rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.filter-btn.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.summary-card {
  background: var(--panel-alt);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.summary-card span {
  color: var(--muted);
  font-weight: 600;
}

.summary-card strong {
  font-size: clamp(1.4rem, 2vw, 2rem);
}

.summary-card.total strong {
  color: var(--primary-dark);
}

.summary-card.pending strong {
  color: var(--warning);
}

.summary-card.completed strong {
  color: var(--success);
}

.task-section {
  margin-top: 1.5rem;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.85rem;
}

.task-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.9rem;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 0.9rem 1rem;
}

.task-item.is-complete {
  background: #f4fff7;
  border-color: rgba(22, 163, 74, 0.35);
}

.task-check {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.task-check input {
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid var(--primary);
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
}

.task-check input:checked {
  background: var(--success);
  border-color: var(--success);
}

.task-check input:checked::after {
  content: "";
  position: absolute;
  left: 0.28rem;
  top: 0.04rem;
  width: 0.18rem;
  height: 0.52rem;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.task-content {
  min-width: 0;
}

.task-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.task-status {
  display: inline-flex;
  margin-top: 0.25rem;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  background: #e0f2fe;
  color: #0369a1;
}

.task-item.is-complete .task-title {
  text-decoration: line-through;
  color: var(--muted);
}

.task-item.is-complete .task-status {
  background: var(--success-soft);
  color: var(--success);
}

.delete-btn {
  border: none;
  border-radius: 10px;
  background: var(--danger-soft);
  color: var(--danger);
  font-weight: 700;
  padding: 0.7rem 0.9rem;
}

.delete-btn:hover {
  background: #fecaca;
}

.empty-state {
  display: none;
  background: var(--panel-alt);
  border: 1px dashed var(--line);
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
  color: var(--muted);
  font-weight: 600;
}

.empty-state.visible {
  display: block;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 640px) {
  .app-card {
    padding: 1rem;
  }

  .task-form {
    grid-template-columns: 1fr;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    width: 100%;
  }

  .filter-btn {
    flex: 1;
  }

  .summary {
    grid-template-columns: 1fr;
  }

  .task-item {
    grid-template-columns: auto 1fr;
  }

  .delete-btn {
    grid-column: 1 / -1;
    width: 100%;
  }
}
