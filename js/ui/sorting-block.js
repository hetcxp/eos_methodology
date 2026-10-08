/**
 * Sorting Block - Componente UI Clasificador Cuatridimensional A-B-C-D
 * Permite clasificar colaboradores en los 4 cuadrantes del Analizador de Personas y GWC de EOS:
 * - Cuadrante A: Persona Correcta en Puesto Correcto (Cultura + / GWC Sí, Sí, Sí)
 * - Cuadrante B: Persona Correcta en Puesto Incorrecto (Cultura + / GWC No)
 * - Cuadrante C: Persona Incorrecta en Puesto Correcto (Terrorista Productivo)
 * - Cuadrante D: Persona Incorrecta en Puesto Incorrecto (Salida Inmediata en 30 días)
 *
 * Soporte Dual de Interacción:
 * - Drag & Drop nativo HTML5 (táctil y cursor)
 * - Selección por Click / Tap y Teclado accesible con anuncios aria-live
 * - Micro-feedback ante confusiones clásicas EOS
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

export const DEFAULT_SLOTS = Object.freeze([
  { id: 'slot-a', level: 'A', title: 'Nivel A - Estratégico / Alto', badgeClass: 'rise-level-badge--a' },
  { id: 'slot-b', level: 'B', title: 'Nivel B - Táctico / Bueno', badgeClass: 'rise-level-badge--b' },
  { id: 'slot-c', level: 'C', title: 'Nivel C - Operativo / Aceptable', badgeClass: 'rise-level-badge--c' },
  { id: 'slot-d', level: 'D', title: 'Nivel D - Inicial / Insatisfecho', badgeClass: 'rise-level-badge--d' }
]);

export const DEFAULT_SLOTS_EN = Object.freeze([
  { id: 'slot-a', level: 'A', title: 'Level A - Strategic / High', badgeClass: 'rise-level-badge--a' },
  { id: 'slot-b', level: 'B', title: 'Level B - Tactical / Good', badgeClass: 'rise-level-badge--b' },
  { id: 'slot-c', level: 'C', title: 'Level C - Operational / Acceptable', badgeClass: 'rise-level-badge--c' },
  { id: 'slot-d', level: 'D', title: 'Level D - Initial / Unsatisfactory', badgeClass: 'rise-level-badge--d' }
]);

export class SortingBlock {
  constructor(options = {}) {
    this.store = options.store || null;
    this.lang = options.lang === 'en' ? 'en' : 'es';
    this.container = null;
    this.items = [];
    this.slots = [];
    this.onComplete = null;

    // Estado reactivo interno
    this.placements = new Map(); // itemId -> slotId
    this.selectedItemId = null;   // itemId actualmente en foco/selección
    this.attempts = 0;
    this.allCorrect = false;

    this.rootEl = null;
    this.poolEl = null;
    this.slotEls = new Map();
    this.feedbackEl = null;
    this._abortController = null;
  }

  /**
   * Destruye el clasificador, abortando todos los listeners DOM
   */
  destroy() {
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
    this.slotEls.clear();
    this.placements.clear();
    this.rootEl = null;
    this.poolEl = null;
    this.feedbackEl = null;
    this.container = null;
  }

  /**
   * Actualiza el idioma activo del clasificador
   * @param {'es'|'en'} lang
   */
  setLanguage(lang) {
    this.lang = lang === 'en' ? 'en' : 'es';
  }

  /**
   * Renderiza el bloque interactivo de ordenamiento
   * @param {HTMLElement|string} container - Elemento o selector CSS
   * @param {Array<Object>} items - Descriptores conductuales a clasificar
   * @param {Array<Object>} [slots] - Cuadrantes de destino (A-B-C-D)
   * @param {Function} [onComplete] - Callback al validar con 100% de aciertos
   * @returns {HTMLElement|null}
   */
  render(container, items, slots = null, onComplete = null) {
    if (typeof document === 'undefined') {
      return null;
    }

    this.container = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!this.container) {
      throw new Error('SortingBlock: Target container element is required');
    }

    const defaultSlots = this.lang === 'en' ? DEFAULT_SLOTS_EN : DEFAULT_SLOTS;
    const resolvedSlots = Array.isArray(slots) && slots.length > 0 ? slots : defaultSlots;

    // Invariante de arquitectura: clonado defensivo (cero mutación de datos maestros)
    this.items = Array.isArray(items) ? JSON.parse(JSON.stringify(items)) : [];
    this.slots = JSON.parse(JSON.stringify(resolvedSlots));
    this.onComplete = typeof onComplete === 'function' ? onComplete : null;
    this.placements.clear();
    this.selectedItemId = null;
    this.attempts = 0;
    this.allCorrect = false;

    const isEn = this.lang === 'en';
    const leadTitle = isEn
      ? 'People Analyzer & GWC Quadrants Classifier'
      : 'Analizador de Personas & Calibrador de Cuadrantes GWC';
    const leadDesc = isEn
      ? 'Drag each collaborator or click to select, then click the corresponding quadrant according to culture (+/-) and GWC (Get it, Want it, Capacity).'
      : 'Arrastra cada colaborador o haz clic para seleccionarlo y luego haz clic en el cuadrante correspondiente según sus Valores Medulares (+/-) y GWC.';
    const poolAria = isEn
      ? 'Pending collaborators bank. Press Enter or Space to return the selected card here.'
      : 'Banco de colaboradores pendientes. Presiona Enter o Espacio para devolver aquí la tarjeta seleccionada.';
    const poolTitle = isEn ? 'Collaborators to Calibrate' : 'Colaboradores por Calibrar';
    const regionAria = isEn ? 'People Analyzer quadrants' : 'Cuadrantes del Analizador de Personas';
    const validateBtnText = isEn ? 'Check Classification' : 'Comprobar Clasificación';
    const resetBtnText = isEn ? 'Reset' : 'Reiniciar';

    const block = document.createElement('section');
    block.className = 'rise-block-sorting';

    block.innerHTML = `
      <div class="rise-sorting-lead">
        <h3>${escapeHtml(leadTitle)}</h3>
        <p class="rise-feedback-desc">${escapeHtml(leadDesc)}</p>
      </div>

      <div class="rise-sorting-items-pool" id="sorting-pool" aria-label="${escapeHtml(poolAria)}" tabindex="0" role="button">
        <span class="rise-pool-title">${escapeHtml(poolTitle)}</span>
        <div class="rise-pool-target" style="display: flex; flex-direction: column; gap: 0.75rem;"></div>
      </div>

      <div class="rise-slot-grid" role="region" aria-label="${escapeHtml(regionAria)}">
        ${this.slots.map(slot => {
          const slotTitle = slot.title || slot.name || '';
          const slotLevel = slot.level || (slot.id ? slot.id.replace('slot-', '').toUpperCase() : '');
          const badgeClass = slot.badgeClass || (slotLevel ? `rise-level-badge--${slotLevel.toLowerCase()}` : '');
          const slotAria = isEn
            ? `Quadrant Level ${escapeHtml(slotLevel)}: ${escapeHtml(slotTitle)}. Press Enter or Space to assign the selected descriptor here.`
            : `Cuadrante Nivel ${escapeHtml(slotLevel)}: ${escapeHtml(slotTitle)}. Presiona Enter o Espacio para asignar aquí el descriptor seleccionado.`;
          return `
            <div class="rise-slot-card" data-slot-id="${escapeHtml(slot.id)}" data-level="${escapeHtml(slotLevel)}" tabindex="0" role="button" aria-label="${escapeHtml(slotAria)}">
              <div class="rise-slot-header">
                <span class="rise-level-badge ${badgeClass}">${escapeHtml(slotLevel)}</span>
                <strong style="font-size: 0.88rem; color: var(--slate-800);">${escapeHtml(slotTitle)}</strong>
              </div>
              <div class="rise-slot-target" data-slot-id="${escapeHtml(slot.id)}" aria-dropeffect="move"></div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="rise-sorting-controls" style="display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
        <button type="button" class="rise-btn rise-btn-primary" id="btn-validate-sorting">
          ${escapeHtml(validateBtnText)}
        </button>
        <button type="button" class="rise-btn rise-btn-secondary" id="btn-reset-sorting">
          ${escapeHtml(resetBtnText)}
        </button>
      </div>

      <div class="rise-sorting-feedback" aria-live="polite" style="margin-top: 1.5rem;"></div>
      <div id="sorting-live-announcer" aria-live="polite" aria-atomic="true" class="sr-only" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;"></div>
    `;

    this.container.innerHTML = '';
    this.container.appendChild(block);
    this.rootEl = block;

    this.poolEl = block.querySelector('.rise-pool-target');
    this.feedbackEl = block.querySelector('.rise-sorting-feedback');

    this.slotEls.clear();
    block.querySelectorAll('.rise-slot-card').forEach(slotCard => {
      const slotId = slotCard.getAttribute('data-slot-id');
      const targetArea = slotCard.querySelector('.rise-slot-target');
      this.slotEls.set(slotId, { card: slotCard, target: targetArea });
    });

    this._renderItemsInPool();
    this._bindInteractions();

    return block;
  }

  /**
   * Renderiza los items dentro del pool inicial
   */
  _renderItemsInPool() {
    if (!this.poolEl) return;
    this.poolEl.innerHTML = '';

    this.items.forEach(item => {
      const pill = this._createItemPill(item);
      this.poolEl.appendChild(pill);
    });
  }

  /**
   * Crea el elemento DOM para un descriptor conductual
   * @param {Object} item 
   * @returns {HTMLElement}
   */
  _createItemPill(item) {
    const pill = document.createElement('div');
    pill.className = 'rise-item-pill';
    pill.id = `item-pill-${item.id}`;
    pill.setAttribute('data-item-id', item.id);
    pill.setAttribute('draggable', 'true');
    pill.setAttribute('tabindex', '0');
    pill.setAttribute('role', 'button');
    pill.setAttribute('aria-grabbed', 'false');
    pill.setAttribute('aria-pressed', 'false');
    pill.textContent = item.text;

    return pill;
  }

  /**
   * Vincula interacciones de Drag & Drop y Click/Keyboard
   */
  _bindInteractions() {
    if (!this.rootEl) return;

    if (this._abortController) {
      this._abortController.abort();
    }
    this._abortController = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const signal = this._abortController ? this._abortController.signal : undefined;

    // 1. Drag & Drop events en elementos
    this.rootEl.addEventListener('dragstart', (e) => {
      if (this.allCorrect) return;
      const pill = e.target.closest('.rise-item-pill');
      if (pill) {
        const itemId = pill.getAttribute('data-item-id');
        e.dataTransfer.setData('text/plain', itemId);
        e.dataTransfer.effectAllowed = 'move';
        pill.classList.add('is-dragging');
        pill.setAttribute('aria-grabbed', 'true');
      }
    }, { signal });

    this.rootEl.addEventListener('dragend', (e) => {
      const pill = e.target.closest('.rise-item-pill');
      if (pill) {
        pill.classList.remove('is-dragging');
        pill.setAttribute('aria-grabbed', 'false');
      }
      this.rootEl.querySelectorAll('.rise-slot-card').forEach(c => c.classList.remove('is-drag-over'));
    }, { signal });

    // 2. Drag & Drop drop zones (Slots y Pool)
    const registerDropZone = (element, onDropHandler) => {
      element.addEventListener('dragover', (e) => {
        if (this.allCorrect) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const card = element.closest('.rise-slot-card');
        if (card) card.classList.add('is-drag-over');
      }, { signal });

      element.addEventListener('dragleave', () => {
        const card = element.closest('.rise-slot-card');
        if (card) card.classList.remove('is-drag-over');
      }, { signal });

      element.addEventListener('drop', (e) => {
        if (this.allCorrect) return;
        e.preventDefault();
        const card = element.closest('.rise-slot-card');
        if (card) card.classList.remove('is-drag-over');

        const itemId = e.dataTransfer.getData('text/plain');
        if (itemId) {
          onDropHandler(itemId);
        }
      }, { signal });
    };

    // Slots drop zones
    this.slotEls.forEach(({ card, target }, slotId) => {
      registerDropZone(card, (itemId) => this.placeItem(itemId, slotId));
    });

    // Pool drop zone (devolver al pool)
    const poolContainer = this.rootEl.querySelector('.rise-sorting-items-pool');
    if (poolContainer) {
      registerDropZone(poolContainer, (itemId) => this.placeItem(itemId, null));
    }

    // 3. Click / Tap & Keyboard interactions
    const handleInteraction = (target) => {
      if (this.allCorrect || !target) return;

      const pill = target.closest('.rise-item-pill');
      const slotCard = target.closest('.rise-slot-card');
      const pool = target.closest('.rise-sorting-items-pool');

      if (pill) {
        const itemId = pill.getAttribute('data-item-id');
        this._handleItemClick(itemId, pill);
        return;
      }

      if (slotCard && this.selectedItemId) {
        const slotId = slotCard.getAttribute('data-slot-id');
        this.placeItem(this.selectedItemId, slotId);
        this._clearItemSelection();
        return;
      }

      if (pool && this.selectedItemId) {
        this.placeItem(this.selectedItemId, null);
        this._clearItemSelection();
      }
    };

    this.rootEl.addEventListener('click', (e) => {
      handleInteraction(e.target);
    }, { signal });

    this.rootEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        if (target && (target.matches('.rise-item-pill, .rise-slot-card, .rise-sorting-items-pool') ||
            target.closest('.rise-item-pill, .rise-slot-card, .rise-sorting-items-pool'))) {
          e.preventDefault();
          handleInteraction(target);
        }
      }
    }, { signal });

    // 4. Botones de acción
    const btnValidate = this.rootEl.querySelector('#btn-validate-sorting');
    if (btnValidate) {
      btnValidate.addEventListener('click', () => this.validate(), { signal });
    }

    const btnReset = this.rootEl.querySelector('#btn-reset-sorting');
    if (btnReset) {
      btnReset.addEventListener('click', () => this.reset(), { signal });
    }
  }

  /**
   * Emite un anuncio audible para tecnologías asistivas
   * @param {string} message
   */
  _announce(message) {
    if (!this.rootEl) return;
    const announcer = this.rootEl.querySelector('#sorting-live-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  }

  /**
   * Maneja el clic en un descriptor
   * @param {string} itemId 
   * @param {HTMLElement} pillEl 
   */
  _handleItemClick(itemId, pillEl) {
    if (this.selectedItemId === itemId) {
      this._clearItemSelection();
      this._announce(this.lang === 'en' ? 'Item deselected.' : 'Elemento deseleccionado.');
      return;
    }

    this._clearItemSelection();
    this.selectedItemId = itemId;
    pillEl.classList.add('is-selected');
    pillEl.setAttribute('aria-pressed', 'true');
    pillEl.style.outline = '2px solid var(--mint-primary)';
    
    const textSnippet = (pillEl.textContent || '').trim().slice(0, 45);
    this._announce(this.lang === 'en'
      ? `Selected: ${textSnippet}. Choose a quadrant or pool to place it.`
      : `Seleccionado: ${textSnippet}. Elige un cuadrante o banco para ubicarlo.`);
  }

  /**
   * Limpia la selección activa de items
   */
  _clearItemSelection() {
    this.selectedItemId = null;
    if (this.rootEl) {
      this.rootEl.querySelectorAll('.rise-item-pill').forEach(p => {
        p.classList.remove('is-selected');
        p.setAttribute('aria-pressed', 'false');
        p.style.outline = '';
      });
    }
  }

  /**
   * Asigna un descriptor a un cuadrante específico o al pool
   * @param {string} itemId 
   * @param {string|null} slotId 
   */
  placeItem(itemId, slotId = null) {
    if (!this.rootEl) return;
    const pill = this.rootEl.querySelector(`[data-item-id="${itemId}"]`);
    if (!pill) return;

    // Limpia feedback previo al interactuar
    pill.classList.remove('is-correct', 'is-incorrect');

    if (slotId && this.slotEls.has(slotId)) {
      const { target } = this.slotEls.get(slotId);
      target.appendChild(pill);
      this.placements.set(itemId, slotId);
      const slotObj = this.slots.find(s => s.id === slotId);
      const slotName = slotObj ? (slotObj.title || slotObj.level) : slotId;
      this._announce(this.lang === 'en'
        ? `Collaborator placed in ${slotName}.`
        : `Colaborador ubicado en ${slotName}.`);
    } else {
      if (this.poolEl) {
        this.poolEl.appendChild(pill);
      }
      this.placements.delete(itemId);
      this._announce(this.lang === 'en'
        ? 'Collaborator returned to bank.'
        : 'Colaborador devuelto al banco de pendientes.');
    }
  }

  /**
   * Valida la clasificación completa de los descriptores y genera micro-feedback
   * @returns {Object} Resultado de la validación
   */
  validate() {
    this.attempts += 1;
    const unplacedCount = this.items.length - this.placements.size;

    if (unplacedCount > 0) {
      const isEn = this.lang === 'en';
      this._renderFeedbackCard({
        isSuccess: false,
        title: isEn ? 'Incomplete Classification' : 'Clasificación Incompleta',
        message: isEn
          ? `There are still ${unplacedCount} descriptors to place in the destination quadrants.`
          : `Aún restan ${unplacedCount} descriptores por ubicar en los cuadrantes de destino.`,
        confusions: []
      });
      return { allCorrect: false, incomplete: true, attempts: this.attempts };
    }

    const confusions = [];
    let correctCount = 0;

    this.items.forEach(item => {
      const placedSlotId = this.placements.get(item.id);
      const placedSlot = this.slots.find(s => s.id === placedSlotId);
      const placedLevel = placedSlot ? placedSlot.level : '';
      const targetLevel = item.targetLevel || (this.slots.find(s => s.id === item.targetSlot)?.level) || '';

      const isMatch = placedLevel === targetLevel || placedSlotId === item.targetSlot;
      const pill = this.rootEl ? this.rootEl.querySelector(`[data-item-id="${item.id}"]`) : null;

      if (isMatch) {
        correctCount += 1;
        if (pill) {
          pill.classList.remove('is-incorrect');
          pill.classList.add('is-correct');
        }
      } else {
        if (pill) {
          pill.classList.remove('is-correct');
          pill.classList.add('is-incorrect');
        }

        // Detección de micro-feedback específico
        const specificFeedback = (item.confusions && item.confusions[placedLevel])
          || this._generateTaxonomyConfusionFeedback(targetLevel, placedLevel, item.text);

        confusions.push({
          itemId: item.id,
          itemText: item.text,
          targetLevel,
          placedLevel,
          message: specificFeedback
        });
      }
    });

    const isAllCorrect = correctCount === this.items.length;
    this.allCorrect = isAllCorrect;

    const isEn = this.lang === 'en';

    if (isAllCorrect) {
      this._renderFeedbackCard({
        isSuccess: true,
        title: isEn ? 'Exact People Analyzer Calibration!' : '¡Calibración Exacta en el Analizador de Personas!',
        message: isEn
          ? 'You have accurately calibrated all collaborators into the People Analyzer quadrants according to EOS and GWC criteria.'
          : 'Has calibrado con precisión a todos los colaboradores en los cuadrantes del Analizador de Personas respetando los criterios de EOS y GWC.',
        confusions: []
      });

      // Congela controles interactivos
      const btnValidate = this.rootEl ? this.rootEl.querySelector('#btn-validate-sorting') : null;
      if (btnValidate) btnValidate.setAttribute('disabled', 'true');

      if (this.onComplete) {
        this.onComplete({
          allCorrect: true,
          attempts: this.attempts,
          placements: Object.fromEntries(this.placements)
        });
      }
    } else {
      this._renderFeedbackCard({
        isSuccess: false,
        title: isEn
          ? `${correctCount} of ${this.items.length} Correct Descriptors`
          : `${correctCount} de ${this.items.length} Descriptores Correctos`,
        message: isEn
          ? 'There are confusions regarding complexity scope. Review the analytical micro-feedback and relocate the descriptors highlighted in red:'
          : 'Existen confusiones en el alcance de complejidad. Revisa los micro-feedbacks analíticos y reubica los descriptores destacados en rojo:',
        confusions
      });
    }

    return {
      allCorrect: isAllCorrect,
      correctCount,
      total: this.items.length,
      attempts: this.attempts,
      confusions
    };
  }

  /**
   * Genera micro-feedback metodológico basado en el Analizador de Personas y GWC de EOS
   */
  _generateTaxonomyConfusionFeedback(targetLevel, placedLevel, itemText) {
    const isEn = this.lang === 'en';
    if (targetLevel === 'A' && placedLevel === 'B') {
      return isEn
        ? 'Confusion: This person embodies Core Values AND has GWC (Yes, Yes, Yes). They are Right Person in Right Seat (Quadrant A), not a mismatched seat.'
        : 'Confusión: Esta persona encarna los Valores Medulares Y tiene GWC (Sí, Sí, Sí). Es Persona Correcta en Puesto Correcto (Cuadrante A), no un puesto equivocado.';
    }
    if (targetLevel === 'C' && placedLevel === 'A') {
      return isEn
        ? 'Warning (Productive Terrorist): Although productive, this person violates core values (-). In EOS, technical performance NEVER excuses cultural sabotage.'
        : 'Alerta (Terrorista Productivo): Aunque cumpla sus metas técnicas, viola los valores (-). En EOS la productividad NUNCA compensa el sabotaje cultural.';
    }
    if (targetLevel === 'B' && (placedLevel === 'A' || placedLevel === 'C')) {
      return isEn
        ? 'Right Person in Wrong Seat: They share core values (+), but lack Get it, Want it, or Capacity for this specific seat. Reassign them.'
        : 'Persona Correcta en Puesto Incorrecto: Comparte los valores (+), pero carece de Capacidad o Deseo para este puesto. Reubicar, no despedir.';
    }
    if (targetLevel === 'D') {
      return isEn
        ? 'Wrong Person in Wrong Seat: Violates core values and lacks GWC. In EOS, initiate the 30-day exit plan.'
        : 'Persona Incorrecta en Puesto Incorrecto: Falla en valores y en GWC. En EOS, ejecutar el plan de desvinculación a 30 días.';
    }
    return isEn
      ? `Placed in Quadrant ${placedLevel}, but EOS evidence indicates Quadrant ${targetLevel}.`
      : `Se clasificó en Cuadrante ${placedLevel}, pero las evidencias EOS indican Cuadrante ${targetLevel}.`;
  }

  /**
   * Despliega la tarjeta de feedback y micro-explicaciones analíticas
   */
  _renderFeedbackCard({ isSuccess, title, message, confusions }) {
    if (!this.feedbackEl) return;

    const isEn = this.lang === 'en';
    const cardClass = isSuccess ? 'rise-feedback-card--success' : 'rise-feedback-card--failure';
    const icon = isSuccess ? '✓' : '⚠';

    let confusionsListHtml = '';
    if (confusions.length > 0) {
      confusionsListHtml = `
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
          ${confusions.map(c => `
            <div style="background: #FFFFFF; border-left: 3px solid var(--alert-red); padding: 0.75rem 1rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.88rem;">
              <strong>${escapeHtml(c.itemText)}</strong><br>
              <span style="color: var(--alert-red-dark); font-weight: 700;">${isEn ? `Placed in Level ${escapeHtml(c.placedLevel)} (Expected: ${escapeHtml(c.targetLevel)}):` : `Ubicado en Nivel ${escapeHtml(c.placedLevel)} (Esperado: ${escapeHtml(c.targetLevel)}):`}</span>
              <p style="margin: 0.35rem 0 0 0; color: var(--slate-700);">${escapeHtml(c.message)}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    this.feedbackEl.innerHTML = `
      <div class="rise-feedback-card ${cardClass}">
        <div class="rise-feedback-header">
          <span class="rise-feedback-icon" aria-hidden="true">${icon}</span>
          <h4 class="rise-feedback-title">${escapeHtml(title)}</h4>
        </div>
        <div class="rise-feedback-desc">${escapeHtml(message)}</div>
        ${confusionsListHtml}
      </div>
    `;
  }

  /**
   * Reinicia la clasificación completa al pool inicial
   */
  reset() {
    this.placements.clear();
    this.selectedItemId = null;
    this.allCorrect = false;

    if (this.rootEl) {
      this.items.forEach(item => {
        this.placeItem(item.id, null);
      });
      if (this.feedbackEl) {
        this.feedbackEl.innerHTML = '';
      }
      const btnValidate = this.rootEl.querySelector('#btn-validate-sorting');
      if (btnValidate) btnValidate.removeAttribute('disabled');
    }
  }

  /**
   * Retorna snapshot de las asignaciones actuales
   * @returns {Object}
   */
  getPlacements() {
    return Object.fromEntries(this.placements);
  }
}
