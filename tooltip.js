class Tooltip extends HTMLElement {
    name = 'mukul';
    tooltipContainer;
    constructor() {
        super();
        this._tooltipText = "default text";
        this.attachShadow({ mode: 'open' });
        const template = document.querySelector('#my-template');
        this.shadowRoot.innerHTML=`
        <style>
        div{
            position:absolute;
            background:purple;
            color:#fff;
            z-index:10;
        }
        </style>
        <slot>Default value</slot>
        <span>(?)</span>
        `
        // appendChild(document.importNode(template.content,true));
    }

    connectedCallback() {
        this.style.position = "relative";
        
        this._tooltipText = this.getAttribute('text')||'Default value';
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip);
        tooltipIcon.addEventListener('mouseleave', this._removeTooltip)
    }
    f
    _showTooltip = () => {
        this.tooltipContainer = document.createElement('div');
        this.tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this.tooltipContainer);
    }
    _removeTooltip = () => {
        this.shadowRoot.removeChild(this.tooltipContainer);
    }
}

customElements.define('mk-tooltip', Tooltip);
