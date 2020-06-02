class Tooltip extends HTMLElement {
    name = 'mukul';
    tooltipContainer;
    tooltipIcon;
    constructor() {
        super();
        this._tooltipText = "default text";
        this.attachShadow({ mode: 'open' });
        // const template = document.querySelector('#my-template');
        this.shadowRoot.innerHTML = `
        <style>
        *{
            --color-primary:purple; //css3 variables that does not require a css preprocessor
        }
        div{
            position:absolute;
            background:var(--color-primary,green);
            color:#fff;
            z-index:10;
        }
        :host-context(div.lwc-part-1){
            background:rgba(0,0,0,0.25);    
            font-family:sans-serif;
        }
        :host([text]){
            color:red;
        }
        ::slotted(span){
            color:orange;
        }
        </style>
        <slot></slot>
        <span>(?)</span>
        `
        // appendChild(document.importNode(template.content,true));
    }

    connectedCallback() {
        this.style.position = "relative";
        this._tooltipText = this.getAttribute('text') || 'Default value';
        this.tooltipIcon = this.shadowRoot.querySelector('span');
        this.tooltipIcon.addEventListener('mouseenter', this._showTooltip);
        this.tooltipIcon.addEventListener('mouseleave', this._removeTooltip)
    }

    _showTooltip = () => {

        this.tooltipContainer = document.createElement('div');
        this.tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this.tooltipContainer);


    }
    _render = () => {
        let tooltipContainer=this.shadowRoot.querySelector('div');

    }

    attributeChangedCallback(name, oldVal, newVal) {
        // console.log(name, oldVal, newVal);
        this._tooltipText = oldVal !== newVal ? newVal : oldVal;
    }

    static get observedAttributes() {
        return ['text'];
    }
    _removeTooltip = () => {
        this.shadowRoot.removeChild(this.tooltipContainer);
    }
    disconnectedCallback() {
        console.log('disconnected');
        this.tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this.tooltipIcon.removeEventListener('mouseleave', this._removeTooltip);
    }
}

customElements.define('mk-tooltip', Tooltip);
