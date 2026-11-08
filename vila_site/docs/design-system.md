# Design system

The site uses the stylesheets in `css/` without a build step. Add or adjust design decisions in `css/variables.css`; keep reusable patterns in `css/components.css`, page-level rules in `css/pages/`, and breakpoints in `css/responsive.css`.

## Visual foundations

- **Cotton and warm white** are the page and surface colors; the subtle dotted background texture is CSS-only.
- **Coffee and leather** are used for body text, headings, navigation, and primary actions.
- **Terracotta, mustard, and olive** are cultural accents, not large areas of small text. Dark text sits on light mustard surfaces.
- **Lora** is reserved for display and institutional headings; **Nunito Sans** is used for navigation, body copy, controls, and buttons.
- The header's small colored pennant edge and the cards' understated woven-media texture provide local character without competing with content.

Google Fonts are loaded as progressive enhancement. The system font fallbacks remain legible if the network or font service is unavailable.

## Component classes

### Section heading

```html
<header class="section-heading">
  <p class="section-heading__eyebrow">Identificação da seção</p>
  <h2 class="section-heading__title">Título da seção</h2>
  <p class="section-heading__description">Texto introdutório, se necessário.</p>
</header>
```

### Buttons

Use an anchor for navigation and a button for actions. The base `.button` is primary; add a variant when needed.

```html
<a class="button button--primary" href="destino.html">Ação principal</a>
<button class="button button--secondary" type="button">Ação secundária</button>
<button class="button button--accent" type="button">Destaque</button>
```

### Cards

The generic `.card` is a flexible surface. Specialist cards share its spacing, border, and type scale; use their semantic modifiers for content specific to artisans, events, or stories. Use `.card-grid`, `.artisan-grid`, `.event-grid`, or `.story-grid` on a containing element to apply responsive columns.

```html
<article class="artisan-card">
  <div class="artisan-card__media">
    <img src="../assets/img/imagem-confirmada.webp" alt="Descrição objetiva da imagem">
  </div>
  <div class="artisan-card__body">
    <p class="artisan-card__craft">Categoria confirmada</p>
    <h3 class="artisan-card__name">Nome autorizado</h3>
    <p class="artisan-card__description">Descrição validada com a pessoa artesã.</p>
  </div>
</article>
```

For event cards use `event-card`, `event-card__media`, `event-card__body`, `event-card__date`, `event-card__title`, and `event-card__description`. For story cards use the `story-card` equivalents and `story-card__byline`. Publish only verified dates, names, images, and copy.

### Form fields

Keep visible labels and connect help and validation text to the control with `aria-describedby`. Do not rely on placeholder text as a label.

```html
<div class="form-field">
  <label class="form-field__label" for="mensagem">Mensagem</label>
  <span class="form-field__hint" id="mensagem-ajuda">Orientação para preencher o campo.</span>
  <textarea class="form-field__control" id="mensagem" aria-describedby="mensagem-ajuda"></textarea>
</div>
```

For invalid fields set `aria-invalid="true"` and include a `.form-field__error` element referenced by `aria-describedby`.

### Alerts

Choose `.alert--success`, `.alert--warning`, `.alert--error`, or `.alert--info`. Use `role="status"` for routine confirmations and `role="alert"` for urgent messages; do not communicate meaning by color alone.

```html
<p class="alert alert--success" role="status">Mensagem de confirmação.</p>
```

### Icons

Use inline SVG with `.icon` and `aria-hidden="true"` when the icon is decorative. Keep a text label next to meaningful actions; icons should not be the only indication of purpose.

```html
<span class="icon" aria-hidden="true">
  <svg viewBox="0 0 24 24" focusable="false">
    <path d="M5 12h14M13 6l6 6-6 6"></path>
  </svg>
</span>
```

## Accessibility and responsive behavior

- Body text is at least 16px, with generous line height and strong text/surface contrast.
- Buttons, navigation links, and form controls have a minimum 44px target height.
- Keyboard focus is visible; reduced-motion preferences are respected.
- Color is not the only signal for active navigation, errors, or alerts.
- Component grids collapse to one column on narrow screens and expand at tablet/desktop widths.
