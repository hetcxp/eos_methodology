/**
 * Rubric Evaluator - Servicio de Auditoría y Certificación Binaria Capstone EOS
 * Aplica la rúbrica binaria de 4 criterios obligatorios (100% pass) según Gino Wickman (Tracción):
 * - C1: Enfoque Medular puro sin clichés ni dispersión (Propósito/Causa + Nicho observable + 3 Únicas).
 * - C2: Rendición de Cuentas unívoca sin roles compartidos (1 solo cuello por asiento) y filtro GWC.
 * - C3: Cuadro de Indicadores predictivo (Scorecard de métricas semanales leading con meta y responsable).
 * - C4: Rocas SMART de 90 días con dueño individual y agenda sagrada de Reunión Nivel 10 (L10 - 90 min).
 *
 * Layer: SERVICE (Zero UI / Zero DOM dependencies)
 */

export const FORBIDDEN_STRATEGIC_CLICHES = Object.freeze([
  'los mejores', 'el mejor', 'la mejor',
  'más barato', 'mas barato', 'precio bajo',
  'mucho dinero', 'amor', 'sonrisa',
  'hacer felices', 'cualquier cliente', 'cualquier flete', 'todo tipo'
]);

export const FORBIDDEN_SHARED_ROLES = Object.freeze([
  /co-director/i,
  /co-gerente/i,
  /compartid[oa]/i,
  /ambos\s+lideran/i,
  /dos\s+responsables/i,
  /responsabilidad\s+compartida/i,
  /co-responsab/i
]);

export const FORBIDDEN_VAGUE_ROCKS = Object.freeze([
  /seguir\s+trabajando/i,
  /hacer\s+lo\s+posible/i,
  /intentar\s+mejorar/i,
  /hacer\s+reuniones\s+cuando\s+se\s+pueda/i,
  /reuniones\s+informales/i,
  /ver\s+qu[eé]\s+pasa/i
]);

export const OPERATIVE_ATTRIBUTES = Object.freeze([
  'gps', 'telemetría', 'telemetria', 'rastreo', 'sla', 'custodia', 'merma', 'mermas',
  'despacho', 'entrega', 'entregas', 'factura', 'facturación', 'facturacion', 'flota',
  'camión', 'camion', 'almacén', 'almacen', 'tiempo real', 'flete', 'corte', 'horario',
  '24h', '15 min', '30 min', 'monitoreo', 'tránsito', 'transito', 'inventario',
  'distribución', 'distribucion', 'jit', 'just-in-time', 'precisión', 'precision',
  'seguridad', 'bodega', 'embarque', 'temperatura', 'cadena'
]);

export class RubricEvaluator {
  /**
   * @param {Object} [options]
   * @param {Object} [options.store] - Instancia opcional de CourseStore
   * @param {string} [options.lang] - 'es' | 'en'
   */
  constructor(options = {}) {
    this.store = options.store || null;
    this.lang = options.lang === 'en' ? 'en' : 'es';
  }

  /**
   * Actualiza el idioma de la rúbrica
   * @param {'es'|'en'} lang
   */
  setLanguage(lang) {
    this.lang = lang === 'en' ? 'en' : 'es';
  }

  /**
   * Evalúa Criterio 1: Enfoque Medular Puro (V/TO)
   * @param {string} input 
   * @returns {{ passed: boolean, feedback: string }}
   */
  evaluateCriterion1(input) {
    if (typeof input !== 'string') {
      return {
        passed: false,
        feedback: 'Criterio 1 no cumplido: El valor debe ser una cadena de texto descriptiva.'
      };
    }

    const lower = input.toLowerCase();

    // 1. Detección de clichés prohibidos PRIORITARIA
    for (const term of FORBIDDEN_STRATEGIC_CLICHES) {
      if (lower.includes(term)) {
        return {
          passed: false,
          feedback: `Criterio 1 no cumplido: Contiene clichés genéricos no permitidos ("${term}"). En EOS el Enfoque Medular debe ser específico y delimitar qué NO hacer.`
        };
      }
    }

    // Detección de inundación de caracteres o repetición artificial
    if (/(.)\1{4,}/.test(input) || /([a-z]{1,4})\1{3,}/i.test(input)) {
      return {
        passed: false,
        feedback: 'Criterio 1 no cumplido: Se detectó texto repetitivo o artificial no válido.'
      };
    }

    if (input.trim().length < 80) {
      return {
        passed: false,
        feedback: 'Criterio 1 no cumplido: El texto es insuficiente (mínimo 80 caracteres). Debe articular Propósito/Causa con descripción real, Nicho Operativo delimitado y 3 Cualidades Únicas o Garantía medible.'
      };
    }

    // 2. Propósito / Causa sustantiva (mínimo 4 palabras con significado operativo)
    const purposeMatch = input.match(/(?:propósito|proposito|causa|pasión|pasion)\s*(?::|\/|\-|\bes\b)?\s*([^\n\r.;]{20,})/i) ||
      (lower.includes('eliminar la incertidumbre') && lower.includes('precisión') ? [input, input] : null);
    if (!purposeMatch) {
      return {
        passed: false,
        feedback: 'Criterio 1 no cumplido: Falta declarar explícitamente el Propósito, Causa o Pasión central con contenido sustantivo (el "por qué existimos" con al menos 20 caracteres descriptivos).'
      };
    }
    const purposeText = purposeMatch[1] || purposeMatch[0];
    const purposeWords = (purposeText.match(/\b[a-záéíóúñ]{3,}\b/gi) || []).length;
    if (purposeWords < 4) {
      return {
        passed: false,
        feedback: 'Criterio 1 no cumplido: Falta declarar explícitamente el Propósito, Causa o Pasión central con contenido sustantivo real (mínimo 4 palabras significativas).'
      };
    }

    // 3. Nicho Operativo acotado y descriptivo (mínimo 4 palabras con significado operativo)
    const nicheMatch = input.match(/(?:nicho|mercado\s*objetivo)\s*(?::|\/|\-|\bes\b)?\s*([^\n\r.;]{20,})/i) ||
      (((lower.includes('nicho') || lower.includes('mercado objetivo') || lower.includes('distribución') || lower.includes('distribucion')) &&
        (lower.includes('industrial') || lower.includes('manufactura') || lower.includes('componentes')) &&
        (lower.includes('300') || lower.includes('km') || lower.includes('jit') || lower.includes('just-in-time'))) ? [input, input] : null);
    if (!nicheMatch) {
      return {
        passed: false,
        feedback: 'Criterio 1 no cumplido: Falta delimitar con precisión el Nicho Operativo con alcance industrial y geográfico o temporal específico (mínimo 20 caracteres).'
      };
    }
    const nicheText = nicheMatch[1] || nicheMatch[0];
    const nicheWords = (nicheText.match(/\b[a-záéíóúñ]{3,}\b/gi) || []).length;
    if (nicheWords < 4) {
      return {
        passed: false,
        feedback: 'Criterio 1 no cumplido: Falta delimitar con precisión el Nicho Operativo con alcance industrial y geográfico o temporal específico (mínimo 4 palabras significativas).'
      };
    }

    // 4. Cualidades Únicas estructuradas con sustantivo operativo explícito y diferenciación mutua
    const normalizeUniqueText = (t) => {
      return (t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
    };

    const isQualitativeUnique = (item) => {
      const itemLower = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (item.trim().length < 15) return false;
      const words = itemLower.match(/\b[a-z0-9]{3,}\b/gi) || [];
      if (words.length < 2) return false;
      // Rechazo de flooding de palabras repetidas
      if (words.length >= 3 && new Set(words).size < words.length * 0.7) return false;
      // Exige al menos un atributo operativo comprobable
      const hasAttr = OPERATIVE_ATTRIBUTES.some(attr => itemLower.includes(attr));
      return hasAttr;
    };

    const validateUniqueSet = (items) => {
      if (!items) return false;
      const clean = items.map(i => i.trim()).filter(Boolean).filter(isQualitativeUnique);
      if (clean.length < 3) return false;

      // Unicidad léxica: deben ser 3 cualidades distintas (no repetidas)
      const normList = clean.map(normalizeUniqueText);
      if (new Set(normList).size < 3) return false;

      // Si las 3 cualidades comparten exactamente el mismo atributo operativo (ej: solo 'gps')
      // exigimos que al menos 2 de ellas tengan parámetros cuantitativos/métricos o SLAs específicos (/\d+/)
      const primaryAttrs = clean.map(item => {
        const itemLower = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return OPERATIVE_ATTRIBUTES.find(attr => itemLower.includes(attr)) || '';
      });
      if (new Set(primaryAttrs).size === 1) {
        const withMetrics = clean.filter(f => /\d+/.test(f));
        if (withMetrics.length < 2) return false;
      }

      return true;
    };

    let hasValidUniques = false;
    const itemMatches = input.match(/(?:^|\n|\s)(?:[1-3]\.|[-•])\s*([^\n\r]+?)(?=(?:[1-3]\.|[-•]|\n\n|garantía|garantia|$))/gi);
    if (itemMatches && itemMatches.length >= 3) {
      const cleanItems = itemMatches.map(m => m.replace(/^(?:[1-3]\.|[-•])\s*/, '').trim());
      if (validateUniqueSet(cleanItems)) {
        hasValidUniques = true;
      }
    }

    const hasUniquesHeader = lower.includes('3 únicas') || lower.includes('3 unicas') || lower.includes('tres cualidades') || lower.includes('cualidades únicas');
    if (!hasValidUniques && hasUniquesHeader) {
      const uHeader = input.match(/(?:3\s*únicas|3\s*unicas|tres\s*cualidades|cualidades\s*únicas)\s*:\s*([^.\n]+)/i);
      if (uHeader) {
        const parts = uHeader[1].split(/(?:,\s*y\s+|[,;]|\s+\by\b\s+)/i).map(p => p.trim()).filter(Boolean);
        if (validateUniqueSet(parts)) {
          hasValidUniques = true;
        }
      }
    }

    // Garantía estructurada con umbral de desvío medible y compensación económica explícita vinculada al bloque de Garantía
    let hasStructuredGuarantee = false;
    const guaranteeMatch = input.match(/(?:garant[íi]a(?:\s*de\s*servicio)?|garantia)[\s\S]*?(?=(?:\n\n|\n\s*[-•]|\n\s*\d+\.|$))/i);
    if (guaranteeMatch) {
      const guaranteeText = guaranteeMatch[0];
      const hasGuaranteeThreshold = /\b(?:desv[ií]o|retraso|demora|tardanza)\s*(?:de\s*)?(?:m[aá]s\s*de\s*)?(?:>\s*)?\d+\s*(?:min|minutos|h|horas)\b/i.test(guaranteeText) ||
        /(?:>\s*30\s*min|m[aá]s\s*de\s*30\s*minutos)/i.test(guaranteeText) ||
        (/\b\d+\s*(?:min|minutos|h|horas)\b/i.test(guaranteeText) && /(?:desv[ií]o|retraso|demora)/i.test(guaranteeText));

      // Exige beneficio económico concreto DENTRO de la cláusula de Garantía: flete gratis/bonificado, bonificación porcentual, nota de crédito o importe monetario
      const hasGuaranteeCompensation = /(?:flete\s*(?:es\s*)?(?:100%\s*)?(?:gratuito|gratis|bonificado)|100%\s*(?:gratis|gratuito|bonificado)|sin\s*costo|bonificaci[oó]n\s*(?:del\s*)?\d+\s*%|descuento\s*(?:del\s*)?\d+\s*%|reembolso\s*(?:del\s*)?\d+\s*%|(?:penalizaci[oó]n|reembolso|devoluci[oó]n|cr[eé]dito)\s*(?:de\s*)?(?:\$|\d+\s*(?:usd|pesos|d[oó]lares|%))|nota\s*de\s*cr[eé]dito)/i.test(guaranteeText);

      hasStructuredGuarantee = hasGuaranteeThreshold && hasGuaranteeCompensation;
    }

    if (!hasValidUniques && !hasStructuredGuarantee) {
      return {
        passed: false,
        feedback: 'Criterio 1 no cumplido: Debe formular 3 Cualidades Únicas diferenciadoras (distintas y no duplicadas) con atributos operativos concretos (ej: telemetría GPS con SLA < 15 min, custodia certificada cero mermas, facturación unificada en 24h) O una Garantía de servicio estructurada con umbral medible de desvío (ej: > 30 min) y compensación económica explícita (ej: flete bonificado / 100% gratuito / reembolso del 50%).'
      };
    }

    return {
      passed: true,
      feedback: 'Criterio 1 cumplido: Enfoque Medular y Estrategia de Mercadeo formulados con rigor EOS, sin dispersión ni comoditización.'
    };
  }

  /**
   * Evalúa Criterio 2: Rendición de Cuentas Unívoca & Filtro GWC
   * @param {string} input 
   * @returns {{ passed: boolean, feedback: string }}
   */
  evaluateCriterion2(input) {
    if (typeof input !== 'string') {
      return {
        passed: false,
        feedback: 'Criterio 2 no cumplido: El valor debe ser una cadena de texto descriptiva.'
      };
    }

    // 1. Detección de roles compartidos prohibidos PRIORITARIA
    for (const pattern of FORBIDDEN_SHARED_ROLES) {
      if (pattern.test(input)) {
        return {
          passed: false,
          feedback: 'Criterio 2 no cumplido: Se detectó co-liderazgo o responsabilidad compartida. Regla EOS innegociable: UN SOLO cuello por asiento.'
        };
      }
    }

    // Detección de dobles dueños en asignación (e.g., "Gonzalo/Lucía" o "Pedro y Juan")
    const origMatch = input.match(/\b([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)\s*(?:\/|\by\b)\s*([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)\b/);
    if (origMatch && !['Ventas/Mercadeo', 'Finanzas/Admin'].includes(`${origMatch[1]}/${origMatch[2]}`)) {
      const w1 = origMatch[1].toLowerCase();
      const w2 = origMatch[2].toLowerCase();
      const knownNames = ['gonzalo', 'lucía', 'lucia', 'marcos', 'tomás', 'tomas', 'pedro', 'juan', 'ana'];
      if (knownNames.includes(w1) && knownNames.includes(w2)) {
        return {
          passed: false,
          feedback: `Criterio 2 no cumplido: Se detectó una función asignada a dos personas compartidas (${origMatch[1]} y ${origMatch[2]}). Cada función debe tener un único responsable.`
        };
      }
    }

    if (input.trim().length < 80) {
      return {
        passed: false,
        feedback: 'Criterio 2 no cumplido: El texto es insuficiente (mínimo 80 caracteres). Debe definir al Integrador con LMA, las 3 funciones medulares con sus titulares individuales y la evaluación GWC.'
      };
    }

    // Detección de inundación de caracteres
    if (/(.)\1{4,}/.test(input)) {
      return {
        passed: false,
        feedback: 'Criterio 2 no cumplido: Se detectó texto repetitivo o artificial no válido.'
      };
    }

    // 2. Identificación y aislamiento de los 4 asientos estructurales
    const seatPositions = [
      { key: 'integrator', pos: input.search(/\b(?:integrador|direcci[oó]n\s*general)\b/i) },
      { key: 'sales', pos: input.search(/\b(?:ventas|mercadeo|comercial)\b/i) },
      { key: 'ops', pos: input.search(/\b(?:operaciones|despacho|almac[eé]n|log[ií]stica|transporte)\b/i) },
      { key: 'finance', pos: input.search(/\b(?:finanzas|admin|administraci[oó]n|tesorer[ií]a|contabilidad)\b/i) }
    ].filter(s => s.pos !== -1).sort((a, b) => a.pos - b.pos);

    if (seatPositions.length < 4) {
      return {
        passed: false,
        feedback: 'Criterio 2 no cumplido: El Organigrama debe individualizar con claridad las cuatro funciones base: Integrador, Ventas/Mercadeo, Operaciones y Finanzas/Admin.'
      };
    }

    const seatSlices = {};
    for (let i = 0; i < seatPositions.length; i++) {
      const start = seatPositions[i].pos;
      const end = (i + 1 < seatPositions.length) ? seatPositions[i + 1].pos : input.length;
      seatSlices[seatPositions[i].key] = input.slice(start, end);
    }

    // 3. Extracción y validación estricta de titular individual por asiento (cero co-liderazgo agnóstico)
    const candidateNames = ['marcos', 'gonzalo', 'lucia', 'tomas', 'ana', 'pedro', 'carlos', 'roberto', 'esteban', 'david', 'martin', 'elena', 'laura', 'patricia', 'javier'];
    const nonHolderWords = new Set(['ventas', 'mercadeo', 'operaciones', 'finanzas', 'admin', 'administracion', 'cuentas', 'despacho', 'almacen', 'logistica', 'transporte', 'tesoreria', 'contabilidad', 'integrador', 'direccion', 'general', 'gwc', 'lma', 'sal', 'con', 'del', 'los', 'las', 'por', 'que', 'una', 'uno', 'para']);
    const seatHolders = {};

    for (const key of ['integrator', 'sales', 'ops', 'finance']) {
      const sliceText = seatSlices[key] || '';

      // Detección agnóstica de co-titularidad con conectores (ej: "Lucía / Carlos", "Pedro y Juan")
      const multiHolderPattern = /\b([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)\s*(?:\/|\by\b|\be\b)\s*([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)\b/g;
      let multiMatch;
      while ((multiMatch = multiHolderPattern.exec(sliceText)) !== null) {
        const w1 = multiMatch[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const w2 = multiMatch[2].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (!nonHolderWords.has(w1) && !nonHolderWords.has(w2) && w1.length >= 3 && w2.length >= 3) {
          return {
            passed: false,
            feedback: `Criterio 2 no cumplido: Se detectó co-liderazgo o doble asignación en la función (${multiMatch[1]} y ${multiMatch[2]}). Invariante EOS innegociable: UN SOLO cuello por asiento estructural.`
          };
        }
      }

      // Detección de múltiples campos de titularidad en el mismo asiento (ej: "Beatriz. Responsable: Zoe")
      const assignmentMatches = sliceText.match(/(?:titular|responsable|dueño|dueña|l[ií]der|a\s*cargo\s*de)\s*:/gi) || [];
      if (assignmentMatches.length > 1) {
        return {
          passed: false,
          feedback: 'Criterio 2 no cumplido: Se detectaron múltiples campos de asignación o titulares en el mismo asiento estructural. Invariante EOS innegociable: UN SOLO cuello por asiento.'
        };
      }

      // Detección de múltiples personas o apoyos informales en el mismo asiento
      if (/(?:con\s+apoyo\s+de|con\s+ayuda\s+de|apoyo\s+de|colabora|asiste|junto\s+con)/i.test(sliceText)) {
        return {
          passed: false,
          feedback: 'Criterio 2 no cumplido: Se detectó mención de apoyo informal o colaboración en el asiento. Regla de oro EOS: UN SOLO responsable por función.'
        };
      }

      const candidateFirstNames = new Set([
        'marcos', 'gonzalo', 'lucia', 'tomas', 'ana', 'pedro', 'carlos', 'roberto', 'esteban',
        'david', 'martin', 'elena', 'laura', 'patricia', 'javier', 'beatriz', 'zoe', 'juan',
        'diego', 'sofia', 'camila', 'valentina', 'felipe', 'matias', 'nicolas', 'pablo', 'manuel',
        'fernando', 'andres'
      ]);
      const wordsInSlice = (sliceText.match(/\b[A-Za-zÁÉÍÓÚÑáéíóúñ]+\b/g) || [])
        .map(w => w.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      const foundFirstNames = [...new Set(wordsInSlice.filter(w => candidateFirstNames.has(w)))];
      if (foundFirstNames.length >= 2) {
        return {
          passed: false,
          feedback: `Criterio 2 no cumplido: Se detectaron múltiples personas asociadas al asiento (${foundFirstNames.slice(0, 2).join(' y ')}). Regla de oro EOS: UN SOLO responsable por función.`
        };
      }

      if (/\b[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\b\s*[.;]\s*(?:(?:titular|responsable|dueño|l[ií]der)\s*:\s*)?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\b/i.test(sliceText)) {
        return {
          passed: false,
          feedback: 'Criterio 2 no cumplido: Se detectaron múltiples personas o titulares separados en el asiento. Regla de oro EOS: UN SOLO responsable por función.'
        };
      }

      if (/(?:co-director|co-lider|compartid[oa]|ambos\s+lideran|dupla|dos\s+responsables)/i.test(sliceText)) {
        return {
          passed: false,
          feedback: 'Criterio 2 no cumplido: Se detectó co-liderazgo o responsabilidad compartida en el asiento. Invariante EOS innegociable: UN SOLO cuello por asiento.'
        };
      }

      const norm = sliceText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      let matchedName = null;
      for (const name of candidateNames) {
        if (new RegExp(`\\b${name}\\b`, 'i').test(norm)) {
          matchedName = name;
          break;
        }
      }
      if (!matchedName) {
        const explicitMatch = sliceText.match(/(?:\(|\b(?:titular|responsable|nombre)\s*:\s*|:\s*)([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/);
        if (explicitMatch) {
          matchedName = explicitMatch[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
      }
      seatHolders[key] = matchedName;
    }

    if (!seatHolders.integrator || !seatHolders.sales || !seatHolders.ops || !seatHolders.finance) {
      return {
        passed: false,
        feedback: 'Criterio 2 no cumplido: Cada asiento del Organigrama debe tener su titular individual explícitamente identificado.'
      };
    }

    // Requiere al menos 3 titulares individuales distintos asignados a sus respectivos asientos
    const distinctHolders = new Set(Object.values(seatHolders));
    if (distinctHolders.size < 3) {
      return {
        passed: false,
        feedback: 'Criterio 2 no cumplido: Se detectó asignación concentrada o indebida de asientos (un único titular no puede asumir la totalidad o mayoría de funciones). Cada asiento debe individualizarse con al menos 3 titulares distintos distribuidos en el Organigrama.'
      };
    }

    // 4. Integrador con funciones de LMA o P&L
    const intSlice = (seatSlices.integrator || '').toLowerCase();
    const hasIntegratorLma = intSlice.includes('lma') ||
      (intSlice.includes('liderar') && intSlice.includes('manejar')) ||
      intSlice.includes('p&l') ||
      intSlice.includes('trabas');

    if (!hasIntegratorLma) {
      return {
        passed: false,
        feedback: 'Criterio 2 no cumplido: Debe definir formalmente al Integrador especificando funciones de LMA (Liderar, Manejar y Rendir Cuentas) o ejecución del P&L.'
      };
    }

    // 5. Verificación GWC explícita en la totalidad (4) de los asientos estructurales (Sí/Sí/Sí o las 3 dimensiones evaluadas)
    const hasSeatGwc = (sliceText) => {
      const sLower = sliceText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const hasTripleYes = /(?:si|yes)\s*(?:\/|,)\s*(?:si|yes)\s*(?:\/|,)\s*(?:si|yes)/i.test(sLower);
      const hasAllThreeDimensions = sLower.includes('comprender') && sLower.includes('desear') && sLower.includes('capacidad');
      return hasTripleYes || (hasAllThreeDimensions && sLower.includes('si'));
    };

    const seatsWithGwc = ['integrator', 'sales', 'ops', 'finance'].filter(key => hasSeatGwc(seatSlices[key]));
    if (seatsWithGwc.length < 4) {
      return {
        passed: false,
        feedback: 'Criterio 2 no cumplido: La calibración GWC debe evaluar explícitamente las tres dimensiones (Comprenderlo, Desearlo y Capacidad: Sí/Sí/Sí) en cada uno de los 4 asientos estructurales del Organigrama (Integrador, Ventas, Operaciones y Finanzas; no se admiten evaluaciones globales incompletas ni un solo Sí genérico).'
      };
    }

    return {
      passed: true,
      feedback: 'Criterio 2 cumplido: Organigrama de Rendición de Cuentas con asientos funcionales unívocos y filtro GWC validado.'
    };
  }

  /**
   * Evalúa Criterio 3: Cuadro de Indicadores Predictivo (Scorecard)
   * @param {string} input 
   * @returns {{ passed: boolean, feedback: string }}
   */
  evaluateCriterion3(input) {
    if (typeof input !== 'string' || input.trim().length < 120) {
      return {
        passed: false,
        feedback: 'Criterio 3 no cumplido: El texto es insuficiente (mínimo 120 caracteres). Debe detallar el Scorecard con métricas semanales leading, metas cuantitativas y dueños individuales.'
      };
    }

    const lower = input.toLowerCase();

    // 1. Periodicidad semanal requerida
    const hasWeeklyCadence = lower.includes('semanal') || lower.includes('/ sem') || lower.includes('/sem') || lower.includes('weekly') || lower.includes('por semana');
    if (!hasWeeklyCadence) {
      return {
        passed: false,
        feedback: 'Criterio 3 no cumplido: El Scorecard en EOS es estrictamente de cadencia semanal. No se admiten reportes mensuales cerrados tardíos.'
      };
    }

    // 2. Parseo de métricas individuales (al menos 4 métricas estructuradas)
    let metrics = [];
    const numberedChunks = input.split(/(?:^|\n|\s)(?=[1-5]\.\s+)/).map(c => c.trim()).filter(c => /^[1-5]\.\s+/.test(c));
    if (numberedChunks.length >= 4) {
      metrics = numberedChunks;
    } else {
      const bulletChunks = input.split(/(?:^|\n)\s*[-•]\s*/).map(c => c.trim()).filter(c => c.length > 15 && /\d+/.test(c));
      if (bulletChunks.length >= 4) {
        metrics = bulletChunks;
      } else {
        metrics = input.split(/\n+/).map(l => l.trim()).filter(l => l.length > 20 && /(?:meta|target|objetivo|\d+)/i.test(l));
      }
    }

    if (metrics.length < 4) {
      return {
        passed: false,
        feedback: 'Criterio 3 no cumplido: El Scorecard debe contener al menos 4 métricas operativas individuales estructuradas (ej: 1. Prospectos, 2. Cotizaciones, 3. Entregas SLA, 4. Días DSO).'
      };
    }

    // 3. Verificación de estructura {métrica, meta, dueño} y unicidad de métricas
    const candidateOwners = ['gonzalo', 'lucia', 'tomas', 'marcos', 'ana', 'pedro', 'carlos', 'roberto', 'esteban'];
    const parsedMetrics = [];

    for (const m of metrics) {
      const normM = m.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      // Rechazar expresiones circunstanciales temporales que no son metas cuantitativas (ej: "Meta: en 15 días")
      if (/(?:meta|target|objetivo)\s*:\s*(?:en|durante|dentro\s+de)\s+\d+/i.test(m)) {
        return {
          passed: false,
          feedback: `Criterio 3 no cumplido: La meta de cada indicador debe ser un valor cuantitativo medible o umbral de comparación (ej: Meta: >= 15 / sem), no una circunstancia temporal (se detectó meta circunstancial: "${m.slice(0, 50)}...").`
        };
      }

      // Verificación de meta cuantitativa numérica dentro de un campo explícito Meta/Target/Objetivo o con operador de umbral
      const hasThresholdOperator = /(?:>=|<=|>|<|=)\s*\d+/i.test(m);
      const hasExplicitMetaField = /(?:\(|\b)(?:meta|target|objetivo)\s*:\s*(?:(?:>=|<=|>|<|=)\s*)?\d+(?:\.\d+)?/i.test(m);

      if (!hasExplicitMetaField && !hasThresholdOperator) {
        return {
          passed: false,
          feedback: `Criterio 3 no cumplido: CADA indicador del Scorecard debe tener su propia meta numérica cuantitativa explícita en un campo Meta/Target/Objetivo con operador o umbral numérico (se detectó indicador sin meta cuantitativa válida: "${m.slice(0, 50)}...").`
        };
      }

      // Detección de múltiples campos de dueño o co-titularidad en campos separados (ej: "Dueño: Ana, Responsable: Zoe")
      const ownerFieldMatches = m.match(/(?:dueño|dueña|owner|responsable|titular|l[ií]der)\s*:/gi) || [];
      if (ownerFieldMatches.length > 1) {
        return {
          passed: false,
          feedback: `Criterio 3 no cumplido: Cada indicador debe tener un único responsable individual, no múltiples titulares (se detectaron múltiples campos de asignación en: "${m.slice(0, 50)}...").`
        };
      }

      // Verificación de campo explícito de dueño/responsable (no menciones casuales o preposicionales como 'de Gonzalo')
      const explicitOwnerMatch = m.match(/(?:\(|\b)(?:dueño|dueña|owner|responsable|titular|l[ií]der)\s*:\s*([A-ZÁÉÍÓÚÑa-záéíóúñ]+)/i);
      if (!explicitOwnerMatch) {
        return {
          passed: false,
          feedback: `Criterio 3 no cumplido: CADA indicador del Scorecard debe tener un campo explícito de dueño/responsable individual (ej: Dueño: Gonzalo; se detectó indicador sin campo formal de titularidad: "${m.slice(0, 50)}...").`
        };
      }

      // Rechazar si hay co-titularidad con conectores en el campo de dueño
      if (/(?:dueño|dueña|owner|responsable|titular|l[ií]der)\s*:\s*[A-ZÁÉÍÓÚÑa-záéíóúñ]+\s*(?:\/|\by\b|\be\b|,)\s*[A-ZÁÉÍÓÚÑa-záéíóúñ]+/i.test(m)) {
        return {
          passed: false,
          feedback: `Criterio 3 no cumplido: Cada indicador debe tener un único responsable individual, no co-liderazgo (se detectó doble titular en: "${m.slice(0, 50)}...").`
        };
      }

      const rawOwner = explicitOwnerMatch[1].trim();
      const normOwner = rawOwner.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normOwner.length < 3) {
        return {
          passed: false,
          feedback: `Criterio 3 no cumplido: Nombre de dueño inválido en indicador: "${m.slice(0, 50)}...".`
        };
      }
      const owner = normOwner;

      // Extracción y normalización de la denominación de la métrica
      const cleanPrefix = m.replace(/^(?:[1-5]\.|\bMétrica\s*\d+:?|\bIndicador\s*\d+:?|[-•])\s*/i, '').trim();
      const cleanName = cleanPrefix.replace(/(?:\(|,)?\s*(?:meta|target|objetivo)\s*:[\s\S]*$/i, '').trim();
      const normName = cleanName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();

      parsedMetrics.push({
        raw: m,
        normalizedName: normName.length >= 4 ? normName : normM.slice(0, 30),
        owner
      });
    }

    // Rechazo de métricas duplicadas: las 4 métricas deben ser distintas
    const distinctMetricNames = new Set(parsedMetrics.map(p => p.normalizedName));
    if (distinctMetricNames.size < 4) {
      return {
        passed: false,
        feedback: 'Criterio 3 no cumplido: El Scorecard debe contener al menos 4 métricas operativas distintas y no repetidas (se detectaron métricas duplicadas o con la misma denominación).'
      };
    }

    // Al menos 2 dueños distintos entre las métricas
    const distinctOwners = new Set(parsedMetrics.map(p => p.owner));
    if (distinctOwners.size < 2) {
      return {
        passed: false,
        feedback: 'Criterio 3 no cumplido: Regla de oro EOS: los indicadores del Scorecard no pueden recaer en un único responsable global; deben distribuirse entre los líderes de función correspondientes (mínimo 2 dueños distintos entre las métricas).'
      };
    }

    return {
      passed: true,
      feedback: 'Criterio 3 cumplido: Cuadro de Indicadores predictivo de 5-15 números semanales con meta numérica y rendición de cuentas unívoca.'
    };
  }

  /**
   * Evalúa Criterio 4: Rocas SMART de 90 Días & Disciplina L10
   * @param {string} input 
   * @returns {{ passed: boolean, feedback: string }}
   */
  evaluateCriterion4(input) {
    if (typeof input !== 'string') {
      return {
        passed: false,
        feedback: 'Criterio 4 no cumplido: El valor debe ser una cadena de texto descriptiva.'
      };
    }

    // 1. Detección de patrones vagos prohibidos PRIORITARIA
    for (const pattern of FORBIDDEN_VAGUE_ROCKS) {
      if (pattern.test(input)) {
        return {
          passed: false,
          feedback: 'Criterio 4 no cumplido: Se detectaron expresiones difusas o tareas continuas. Las Rocas deben ser hitos terminales específicos a 90 días.'
        };
      }
    }

    if (input.trim().length < 80) {
      return {
        passed: false,
        feedback: 'Criterio 4 no cumplido: El texto es insuficiente (mínimo 80 caracteres). Debe formular al menos 3 Rocas SMART de 90 días con dueños individuales y la agenda de Reunión Nivel 10 con IDS.'
      };
    }

    const lower = input.toLowerCase();

    // 2. Horizonte trimestral a 90 días obligatorio
    const hasHorizon = lower.includes('90 días') || lower.includes('90 dias') || lower.includes('trimestral') || lower.includes('90-day');
    if (!hasHorizon) {
      return {
        passed: false,
        feedback: 'Criterio 4 no cumplido: Las Rocas requieren un horizonte temporal terminal estricto a 90 días (trimestral).'
      };
    }

    // 3. Extracción de al menos 3 Rocas identificadas e individualizadas
    let rocks = [];
    const r1Match = input.match(/(?:roca\s*(?:institucional\s*)?1\b|roca\s*#\s*1\b)[\s\S]*?(?=(?:roca\s*(?:institucional\s*)?2\b|roca\s*#\s*2\b|$))/i);
    const r2Match = input.match(/(?:roca\s*(?:institucional\s*)?2\b|roca\s*#\s*2\b)[\s\S]*?(?=(?:roca\s*(?:institucional\s*)?3\b|roca\s*#\s*3\b|$))/i);
    const r3Match = input.match(/(?:roca\s*(?:institucional\s*)?3\b|roca\s*#\s*3\b)[\s\S]*?(?=(?:agenda|reuni[oó]n|l10|nivel\s*10|$))/i);

    if (r1Match && r2Match && r3Match) {
      rocks = [r1Match[0].trim(), r2Match[0].trim(), r3Match[0].trim()];
    } else {
      const bulletRocks = input.match(/(?:^|\n)\s*[-•]\s*roca[\s\S]*?(?=(?:\n\s*[-•]\s*roca|\n\s*[-•]\s*pulso|\n\s*[-•]\s*agenda|agenda|reuni[oó]n|$))/gi);
      if (bulletRocks && bulletRocks.length >= 3) {
        rocks = bulletRocks.slice(0, 3).map(r => r.trim());
      }
    }

    if (rocks.length < 3) {
      return {
        passed: false,
        feedback: 'Criterio 4 no cumplido: Debe formular explícitamente al menos 3 Rocas trimestrales individualizadas (Roca 1, Roca 2, Roca 3).'
      };
    }

    // 4. Verificación de resultado SMART cuantitativo, verbo de acción y dueño individual en CADA Roca
    const actionVerbs = ['implementar', 'estandarizar', 'cerrar', 'automatizar', 'certificar', 'migrar', 'documentar', 'lanzar', 'diseñar', 'completar', 'crear', 'establecer', 'reducir', 'duplicar'];
    const candidateOwners = ['gonzalo', 'lucia', 'tomas', 'marcos', 'ana', 'pedro', 'carlos', 'roberto', 'esteban'];
    const rockOwners = [];

    for (const r of rocks) {
      const rLower = r.toLowerCase();
      const hasAction = actionVerbs.some(v => rLower.includes(v));
      if (!hasAction || r.length < 30) {
        return {
          passed: false,
          feedback: `Criterio 4 no cumplido: Cada Roca debe tener un entregable SMART concreto y un verbo de acción terminal (se detectó roca ambigua: "${r.slice(0, 50)}...").`
        };
      }

      // Quitar el prefijo identificador (ej: "Roca 1:", "Roca #1:", "Roca institucional 1:") para evaluar el contenido intrínseco
      const rockBody = r.replace(/^(?:roca\s*(?:institucional\s*)?\d+:?|roca\s*#\s*\d+:?|[-•]\s*roca\s*\d*:?)\s*/i, '').trim();

      // Exige parámetro cuantitativo o meta medible explícita en la Roca (números, horas, porcentajes, etc.)
      const hasQuantitativeSmart = /\d+/.test(rockBody);
      if (!hasQuantitativeSmart) {
        return {
          passed: false,
          feedback: `Criterio 4 no cumplido: CADA una de las 3 Rocas debe contener un resultado SMART cuantitativo y medible con parámetros específicos (se detectó roca sin meta cuantitativa ni parámetro medible: "${r.slice(0, 50)}...").`
        };
      }

      // Rechazar colaboradores informales o dilución de rendición de cuentas (ej: "con apoyo de", "colabora")
      if (/(?:con\s+apoyo\s+de|con\s+ayuda\s+de|apoyo\s+de|colabora(?:ci[oó]n)?|colaborador|asiste|junto\s+con)/i.test(r)) {
        return {
          passed: false,
          feedback: `Criterio 4 no cumplido: Invariante EOS: Las Rocas tienen un único titular responsable absoluto; se prohíbe diluir la rendición de cuentas con colaboradores o apoyos informales (se detectó colaborador/apoyo en: "${r.slice(0, 50)}...").`
        };
      }

      // Detección de múltiples campos de asignación en la misma Roca (ej: "Dueño: Lucía, Responsable: Zoe")
      const rOwnerFieldMatches = r.match(/(?:dueño|dueña|owner|responsable|l[ií]der|titular)\s*:/gi) || [];
      if (rOwnerFieldMatches.length > 1) {
        return {
          passed: false,
          feedback: `Criterio 4 no cumplido: Cada Roca debe tener un único responsable individual, no múltiples titulares (se detectaron múltiples campos de asignación en: "${r.slice(0, 50)}...").`
        };
      }

      // Dueño explícito: requiere campo Dueño/Responsable/Líder/Titular formal
      const explicitRockOwnerMatch = r.match(/(?:\(|\b)(?:dueño|dueña|owner|responsable|l[ií]der|titular)\s*:\s*([A-ZÁÉÍÓÚÑa-záéíóúñ]+)/i);
      if (!explicitRockOwnerMatch) {
        return {
          passed: false,
          feedback: `Criterio 4 no cumplido: CADA una de las Rocas debe tener un campo explícito de dueño/responsable individual (ej: Dueño: Lucía; se detectó roca sin asignación formal de titular: "${r.slice(0, 50)}...").`
        };
      }

      // Rechazar si hay co-titularidad con conectores en la Roca
      if (/(?:dueño|dueña|owner|responsable|l[ií]der|titular)\s*:\s*[A-ZÁÉÍÓÚÑa-záéíóúñ]+\s*(?:\/|\by\b|\be\b|,)\s*[A-ZÁÉÍÓÚÑa-záéíóúñ]+/i.test(r)) {
        return {
          passed: false,
          feedback: `Criterio 4 no cumplido: Cada Roca debe tener un único responsable individual (se detectó co-titularidad en: "${r.slice(0, 50)}...").`
        };
      }

      const rawOwner = explicitRockOwnerMatch[1].trim();
      const normOwner = rawOwner.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normOwner.length < 3) {
        return {
          passed: false,
          feedback: `Criterio 4 no cumplido: Nombre de titular inválido en Roca: "${r.slice(0, 50)}...".`
        };
      }

      rockOwners.push(normOwner);
    }

    // Al menos 2 dueños distintos entre las Rocas
    const distinctRockOwners = new Set(rockOwners);
    if (distinctRockOwners.size < 2) {
      return {
        passed: false,
        feedback: 'Criterio 4 no cumplido: Regla EOS: las Rocas no pueden recaer en un único titular; deben distribuirse entre al menos 2 líderes diferentes del equipo.'
      };
    }

    // 5. Disciplina de Reunión Nivel 10 (L10) de 90 minutos exactos con 60 minutos de IDS y bloques de agenda
    const hasL10Name = lower.includes('l10') || lower.includes('l-10') || lower.includes('nivel 10') || lower.includes('level 10');
    const hasWeeklyCadence = lower.includes('semanal') || lower.includes('lunes') || lower.includes('weekly');
    const has90MinTotal = lower.includes('90 min') || lower.includes('90 minutos') || lower.includes('90m') || lower.includes('hora y media');

    // Asignación explícita de 60 minutos a IDS
    const has60MinIds = /(?:60\s*min|60m|60\s*minutos)[\s\S]{0,40}(?:ids|identificar|discutir|resolver|solucionar)|(?:ids|identificar|discutir|resolver|solucionar)[\s\S]{0,40}(?:60\s*min|60m|60\s*minutos)/i.test(input);

    // Bloques o estructura de agenda L10 canónica
    const agendaComponents = [
      /(?:buenas?\s*noticias?|segway)/i,
      /(?:scorecard|cuadro\s*de\s*indicadores|indicadores)/i,
      /(?:revisi[oó]n\s*de\s*rocas|rocas)/i,
      /(?:titulares|mensajes\s*de\s*clientes)/i,
      /(?:conclusi[oó]n|lista\s*de\s*pendientes|to-do|mensajes\s*en\s*cascada|puntuaci[oó]n|calificaci[oó]n)/i,
      /(?:agenda|bloques\s*de\s*tiempo)/i
    ];
    const matchedAgendaComponents = agendaComponents.filter(regex => regex.test(input));

    // Aislamiento de la sección de agenda para verificar minutos desglosados si están presentes
    const agendaMatch = input.match(/(?:agenda|reuni[oó]n\s*(?:semanal\s*)?nivel\s*10|reuni[oó]n\s*l10|pulso\s*de\s*reuni[oó]n)[\s\S]*$/i);
    const agendaSegment = agendaMatch ? agendaMatch[0] : input;
    const minuteTokens = agendaSegment.match(/\b(\d+)\s*(?:m|min|minutos)\b/gi) || [];
    const extractedMinutes = minuteTokens.map(t => parseInt(t.match(/\d+/)[0], 10));
    const subBlocks = extractedMinutes.filter(m => m !== 90);

    // Si la agenda desglosa bloques de tiempo individuales, la suma debe dar exactamente 90
    if (subBlocks.length >= 3) {
      const sumMinutes = subBlocks.reduce((acc, val) => acc + val, 0);
      if (sumMinutes !== 90) {
        return {
          passed: false,
          feedback: `Criterio 4 no cumplido: Los bloques desglosados de la agenda L10 deben sumar exactamente 90 minutos (la suma actual da ${sumMinutes} minutos). La agenda EOS canónica requiere 90 minutos exactos: Buenas Noticias (5m), Scorecard (5m), Rocas (5m), Titulares (5m), Pendientes To-Do (5m), IDS (60m) y Conclusión (5m).`
        };
      }
    }

    if (!hasL10Name || !hasWeeklyCadence || !has90MinTotal || !has60MinIds || matchedAgendaComponents.length < 2) {
      return {
        passed: false,
        feedback: 'Criterio 4 no cumplido: Debe detallar formalmente la Reunión Semanal Nivel 10 (L10) con duración exacta de 90 minutos, estructurada con sus bloques de agenda (Buenas Noticias, Scorecard, Rocas, Titulares, Conclusión) y con 60 minutos explícitamente dedicados al bloque IDS (Identificar, Discutir, Resolver).'
      };
    }

    return {
      passed: true,
      feedback: 'Criterio 4 cumplido: Prioridades trimestrales formuladas como Rocas SMART a 90 días con agenda y pulso semanal L10/IDS.'
    };
  }

  /**
   * Evalúa la Ficha Maestra Capstone completa (4 criterios binarios)
   * @param {Object} submission 
   * @returns {{ passed: boolean, score: number, criteria: Object.<string, {passed: boolean, feedback: string}>, allPassed: boolean }}
   */
  evaluateSubmission(submission = {}) {
    const rawDef = submission.vtoFocus ?? submission.definition ?? submission.c1 ?? '';
    let rawLevels = submission.accountabilityChart ?? submission.levels ?? submission.c2 ?? '';
    if (rawLevels && typeof rawLevels === 'object') {
      rawLevels = Object.values(rawLevels).join('\n');
    }
    let rawC3 = submission.scorecardWeekly ?? submission.scorecard ?? submission.c3 ?? '';
    let rawC4 = submission.rocksAndL10 ?? submission.rocks ?? submission.c4 ?? '';
    const execSections = Array.isArray(submission.executionSections)
      ? submission.executionSections
      : null;
    if (execSections) {
      if (!rawC3 && execSections[0]) rawC3 = execSections[0];
      if (!rawC4 && execSections.length > 1) rawC4 = execSections.slice(1).join('\n');
    }

    const c1 = this.evaluateCriterion1(rawDef);
    const c2 = this.evaluateCriterion2(rawLevels);
    const c3 = this.evaluateCriterion3(rawC3);
    const c4 = this.evaluateCriterion4(rawC4);

    const criteria = { c1, c2, c3, c4 };
    const criteriaDetails = {
      c1: c1.passed,
      c2: c2.passed,
      c3: c3.passed,
      c4: c4.passed
    };

    const checklist = [
      {
        id: 'c1',
        name: 'Criterio 1: Enfoque Medular Puro (V/TO)',
        passed: c1.passed,
        feedback: c1.feedback
      },
      {
        id: 'c2',
        name: 'Criterio 2: Rendición de Cuentas Unívoca & GWC',
        passed: c2.passed,
        feedback: c2.feedback
      },
      {
        id: 'c3',
        name: 'Criterio 3: Cuadro de Indicadores Predictivo',
        passed: c3.passed,
        feedback: c3.feedback
      },
      {
        id: 'c4',
        name: 'Criterio 4: Rocas de 90 Días & Agenda L10',
        passed: c4.passed,
        feedback: c4.feedback
      }
    ];

    const passedCount = [c1.passed, c2.passed, c3.passed, c4.passed].filter(Boolean).length;
    const allPassed = passedCount === 4;
    const score = allPassed ? 100 : Math.round((passedCount / 4) * 100);

    // Sincronización automática con CourseStore si está presente
    if (this.store && typeof this.store.dispatchAction === 'function') {
      this.store.dispatchAction('UPDATE_CAPSTONE_RUBRIC', { rubric: criteriaDetails });
    }

    const overallFeedback = allPassed
      ? '¡Certificación Exitosa! La Ficha Maestra de Implementación cumple el 100% de los estándares del Sistema Operativo Empresarial (EOS® - Gino Wickman). Lista para exportación y despliegue directivo.'
      : `Auditoría incompleta (${passedCount}/4 criterios aprobados). Corrige los criterios observados para certificar la Ficha Maestra EOS.`;

    return {
      passed: allPassed,
      allPassed,
      score,
      checklist,
      criteriaDetails,
      feedback: overallFeedback,
      criteria
    };
  }
}

export function evaluateCapstoneSubmission(submission, options = {}) {
  const evaluator = new RubricEvaluator(options);
  return evaluator.evaluateSubmission(submission);
}
