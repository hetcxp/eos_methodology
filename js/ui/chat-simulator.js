/**
 * Chat Simulator - Componente UI para Simulación de Sesión y Debate IDS (EOS®)
 * Simula el tratamiento de asuntos críticos en el equipo de liderazgo (Apex Logistics)
 * siguiendo la disciplina de la Vía IDS: Identificar la causa raíz, Discutir con apertura y Resolver con To-Dos.
 *
 * Objetivo pedagógico:
 * Entrenar al líder en distinguir síntomas superficiales de la causa raíz real,
 * neutralizando ataques personales o consensos ambiguos, y cerrando compromisos a 7 días.
 *
 * Layer: UI (DOM Controller)
 */

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export class ChatSimulator {
  /**
   * @param {Object} [options]
   * @param {Object} [options.store] - Store opcional
   */
  constructor(options = {}) {
    this.store = options.store || null;
    this.lang = options.lang === 'en' ? 'en' : 'es';
    this.container = null;
    this.scenarioData = null;
    this.onFinished = null;

    this.currentTurnIndex = 0;
    this.score = 0;
    this.correctProbes = 0;
    this.history = [];
    this.isFinished = false;

    this.rootEl = null;
    this.conversationEl = null;
    this.controlsEl = null;
    this._abortController = null;
  }

  /**
   * Destruye el simulador, abortando listeners registrados
   */
  destroy() {
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
    this.rootEl = null;
    this.conversationEl = null;
    this.controlsEl = null;
    this.container = null;
  }

  /**
   * Actualiza el idioma activo del simulador de chat
   * @param {'es'|'en'} lang
   */
  setLanguage(lang) {
    this.lang = lang === 'en' ? 'en' : 'es';
  }

  /**
   * Inicializa y monta el simulador en el contenedor DOM
   * @param {HTMLElement|string} container 
   * @param {Object} scenarioData 
   * @param {Function} [onFinished] 
   * @returns {ChatSimulator}
   */
  init(container, scenarioData, onFinished = null) {
    if (!scenarioData || typeof scenarioData !== 'object') {
      throw new Error('ChatSimulator: scenarioData is required');
    }

    this.scenarioData = JSON.parse(JSON.stringify(scenarioData));
    this.onFinished = typeof onFinished === 'function' ? onFinished : null;
    this.currentTurnIndex = 0;
    this.score = 0;
    this.correctProbes = 0;
    this.history = [];
    this.isFinished = false;

    if (typeof document === 'undefined') {
      return this;
    }

    this.container = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!this.container) {
      throw new Error('ChatSimulator: Target container element is required');
    }

    this._renderShell();
    return this;
  }

  /**
   * Renderiza el marco general del simulador
   */
  _renderShell() {
    const isEn = this.lang === 'en';
    const candidate = this.scenarioData.candidate || {
      name: isEn ? 'Simulated Candidate' : 'Candidato Simulado',
      role: isEn ? 'Job Applicant' : 'Postulante al puesto',
      avatarText: 'CS'
    };

    const badgeText = isEn ? 'EOS IDS Session' : 'Sesión de Resolución IDS';
    const logAria = isEn ? 'Conversation history' : 'Historial de conversación';
    const probingLabel = isEn ? 'Select your leadership intervention:' : 'Selecciona tu intervención de liderazgo (Vía IDS):';

    const block = document.createElement('div');
    block.className = 'rise-chat-simulator';

    block.innerHTML = `
      <header class="rise-chat-header">
        <div class="rise-candidate-info">
          <div class="rise-candidate-avatar" aria-hidden="true">${escapeHtml(candidate.avatarText || 'CS')}</div>
          <div class="rise-candidate-details">
            <h4>${escapeHtml(candidate.name)}</h4>
            <span>${escapeHtml(candidate.role)}</span>
          </div>
        </div>
        <div class="rise-chat-status">
          <span class="rise-scenario-badge" style="background: rgba(255,255,255,0.15); color: #FFF; border: none;">
            ${escapeHtml(badgeText)}
          </span>
        </div>
      </header>

      <div class="rise-chat-conversation" role="log" aria-label="${escapeHtml(logAria)}" tabindex="0">
      </div>

      <div class="rise-chat-controls">
        <div class="rise-probing-label" id="probing-label-id">${escapeHtml(probingLabel)}</div>
        <div class="rise-probing-options" role="group" aria-labelledby="probing-label-id"></div>
      </div>
    `;

    this.container.innerHTML = '';
    this.container.appendChild(block);
    this.rootEl = block;

    this.conversationEl = block.querySelector('.rise-chat-conversation');
    this.controlsEl = block.querySelector('.rise-probing-options');

    // Carga el diálogo inicial del candidato si existe
    if (this.scenarioData.initialDialogue) {
      this._appendBubble({
        speaker: 'candidate',
        text: this.scenarioData.initialDialogue.text || this.scenarioData.initialDialogue
      });
    }

    this._renderCurrentTurn();
  }

  /**
   * Renderiza el turno actual y sus opciones de sondeo
   */
  _renderCurrentTurn() {
    if (!this.controlsEl) return;
    this.controlsEl.innerHTML = '';

    const turns = this.scenarioData.turns || [];
    if (this.currentTurnIndex >= turns.length) {
      this._finishInterview();
      return;
    }

    const currentTurn = turns[this.currentTurnIndex];
    const isEn = this.lang === 'en';
    const labelEl = this.rootEl.querySelector('#probing-label-id');
    if (labelEl) {
      labelEl.textContent = currentTurn.prompt || (isEn
        ? `Turn ${this.currentTurnIndex + 1}: Select your Probing Question:`
        : `Turno ${this.currentTurnIndex + 1}: Selecciona tu Pregunta de Sondeo:`);
    }

    const optionsList = document.createElement('div');
    optionsList.style.display = 'flex';
    optionsList.style.flexDirection = 'column';
    optionsList.style.gap = '0.75rem';

    if (this._abortController) {
      this._abortController.abort();
    }
    this._abortController = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const signal = this._abortController ? this._abortController.signal : undefined;

    (currentTurn.options || []).forEach((opt, idx) => {
      const keyLetter = opt.key || String.fromCharCode(65 + idx);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'rise-choice-btn';
      btn.setAttribute('data-option-id', opt.id);

      btn.innerHTML = `
        <span class="rise-choice-key">${escapeHtml(keyLetter)}</span>
        <span class="rise-choice-text">${escapeHtml(opt.text)}</span>
      `;

      btn.addEventListener('click', () => {
        this.selectProbingQuestion(opt.id);
      }, { signal });

      optionsList.appendChild(btn);
    });

    this.controlsEl.appendChild(optionsList);
  }

  /**
   * Procesa la selección de una pregunta de sondeo
   * @param {string} optionId 
   */
  selectProbingQuestion(optionId) {
    if (this.isFinished) return;

    const turns = this.scenarioData.turns || [];
    const currentTurn = turns[this.currentTurnIndex];
    if (!currentTurn) return;

    const option = (currentTurn.options || []).find(o => o.id === optionId);
    if (!option) return;

    // Deshabilita botones en el contenedor para evitar dobles clics
    if (this.controlsEl) {
      this.controlsEl.querySelectorAll('button').forEach(b => b.setAttribute('disabled', 'true'));
    }

    const isEffective = Boolean(option.isEffective ?? option.isCorrect);
    if (isEffective) {
      this.correctProbes += 1;
    }

    // 1. Burbuja del entrevistador (usuario)
    this._appendBubble({
      speaker: 'interviewer',
      text: option.text
    });

    // 2. Tarjeta de Coaching / Feedback metodológico
    this._appendCoachFeedback({
      isEffective,
      feedback: option.feedback
    });

    // 3. Respuesta subsiguiente del candidato
    if (option.candidateResponse) {
      setTimeout(() => {
        this._appendBubble({
          speaker: 'candidate',
          text: option.candidateResponse
        });

        // 4. Botón de avance al siguiente turno
        this._renderNextButton();
      }, 400);
    } else {
      this._renderNextButton();
    }

    this.history.push({
      turnIndex: this.currentTurnIndex,
      turnId: currentTurn.id,
      selectedOptionId: option.id,
      selectedText: option.text,
      isEffective,
      feedback: option.feedback
    });
  }

  /**
   * Muestra el botón para avanzar al siguiente turno o finalizar
   */
  _renderNextButton() {
    if (!this.controlsEl) return;
    this.controlsEl.innerHTML = '';

    const turns = this.scenarioData.turns || [];
    const isLastTurn = this.currentTurnIndex >= turns.length - 1;
    const isEn = this.lang === 'en';
    const btnLabel = isLastTurn
      ? (isEn ? 'Finish Interview and View Diagnosis' : 'Finalizar Entrevista y Ver Diagnóstico')
      : (isEn ? 'Next Probing Question →' : 'Siguiente Pregunta de Sondeo →');

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'rise-btn rise-btn-primary';
    nextBtn.style.marginTop = '0.5rem';
    nextBtn.textContent = btnLabel;

    const signal = this._abortController ? this._abortController.signal : undefined;
    nextBtn.addEventListener('click', () => {
      this.currentTurnIndex += 1;
      this._renderCurrentTurn();
    }, { signal });

    this.controlsEl.appendChild(nextBtn);
  }

  /**
   * Agrega una burbuja al contenedor de chat
   */
  _appendBubble({ speaker, text }) {
    if (!this.conversationEl) return;

    const bubble = document.createElement('div');
    const isInterviewer = speaker === 'interviewer';
    bubble.className = `rise-dialogue-bubble ${isInterviewer ? 'rise-dialogue-bubble--interviewer' : 'rise-dialogue-bubble--candidate'}`;
    bubble.innerHTML = escapeHtml(text);

    this.conversationEl.appendChild(bubble);
    this.conversationEl.scrollTop = this.conversationEl.scrollHeight;
  }

  /**
   * Agrega una nota de coaching tras seleccionar la pregunta
   */
  _appendCoachFeedback({ isEffective, feedback }) {
    if (!this.conversationEl || !feedback) return;

    const isEn = this.lang === 'en';
    const card = document.createElement('div');
    card.style.margin = '0.5rem 0';
    card.style.padding = '0.85rem 1rem';
    card.style.borderRadius = 'var(--radius-md)';
    card.style.fontSize = '0.88rem';
    card.style.lineHeight = '1.5';

    if (isEffective) {
      const effectiveTag = isEn ? '✓ Effective IDS Intervention:' : '✓ Intervención IDS Eficaz:';
      card.style.background = 'var(--golden-green-light)';
      card.style.border = '1px solid var(--golden-green-border)';
      card.style.color = 'var(--golden-green-dark)';
      card.innerHTML = `<strong>${effectiveTag}</strong> ${escapeHtml(feedback)}`;
    } else {
      const antipatternTag = isEn ? '⚠ Methodological Anti-pattern:' : '⚠ Antipatrón Metodológico:';
      card.style.background = 'var(--alert-red-light)';
      card.style.border = '1px solid var(--alert-red-border)';
      card.style.color = 'var(--alert-red-dark)';
      card.innerHTML = `<strong>${antipatternTag}</strong> ${escapeHtml(feedback)}`;
    }

    this.conversationEl.appendChild(card);
    this.conversationEl.scrollTop = this.conversationEl.scrollHeight;
  }

  /**
   * Concluye la simulación de entrevista y genera el reporte final
   */
  _finishInterview() {
    this.isFinished = true;
    const totalTurns = (this.scenarioData.turns || []).length;
    const successRate = totalTurns > 0 ? Math.round((this.correctProbes / totalTurns) * 100) : 100;
    this.score = successRate;
    const isEn = this.lang === 'en';

    if (this.rootEl) {
      const labelEl = this.rootEl.querySelector('#probing-label-id');
      if (labelEl) {
        labelEl.textContent = isEn
          ? 'Final IDS Debate Diagnosis:'
          : 'Diagnóstico Final del Debate IDS:';
      }
    }

    if (this.controlsEl) {
      const titleText = isEn
        ? `IDS Leadership Effectiveness: ${this.correctProbes} of ${totalTurns} (${successRate}%)`
        : `Efectividad en Resolución IDS: ${this.correctProbes} de ${totalTurns} (${successRate}%)`;
      const descText = successRate >= 80
        ? (isEn
            ? 'You demonstrated high expertise in navigating the IDS process: identifying the root cause without blaming personalities, discussing openly, and solving with clear To-Dos.'
            : 'Has demostrado alta pericia para aplicar la Vía IDS: identificar la causa raíz sin atacar personas, debatir abiertamente y resolver con pendientes (To-Dos) claros.')
        : (isEn
            ? 'Remember: In EOS IDS, never treat symptoms or accept vague consensus. Dig down to the root issue and assign a single owner with a 7-day To-Do deadline.'
            : 'Recuerda: en la Vía IDS de EOS nunca ataques los síntomas ni aceptes acuerdos ambiguos. Llega a la causa raíz y asigna un único responsable con compromiso a 7 días.');

      this.controlsEl.innerHTML = `
        <div class="rise-feedback-card ${successRate >= 80 ? 'rise-feedback-card--success' : 'rise-feedback-card--failure'}">
          <div class="rise-feedback-header">
            <span class="rise-feedback-icon" aria-hidden="true">${successRate >= 80 ? '✓' : 'ℹ'}</span>
            <h4 class="rise-feedback-title">
              ${escapeHtml(titleText)}
            </h4>
          </div>
          <div class="rise-feedback-desc">
            ${escapeHtml(descText)}
          </div>
        </div>
      `;
    }

    if (this.onFinished) {
      this.onFinished({
        score: this.score,
        totalTurns,
        correctProbes: this.correctProbes,
        completed: true,
        history: this.history
      });
    }
  }

  /**
   * Reinicia la entrevista
   */
  reset() {
    if (!this.scenarioData) return;
    this.currentTurnIndex = 0;
    this.score = 0;
    this.correctProbes = 0;
    this.history = [];
    this.isFinished = false;

    if (this.container) {
      this._renderShell();
    }
  }

  /**
   * Retorna el estado actual del simulador
   * @returns {Object}
   */
  getState() {
    return {
      currentTurnIndex: this.currentTurnIndex,
      score: this.score,
      correctProbes: this.correctProbes,
      totalTurns: (this.scenarioData?.turns || []).length,
      isFinished: this.isFinished,
      history: [...this.history]
    };
  }
}
