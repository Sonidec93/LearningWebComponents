class ToggleText extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        p{
            display:none;
        }
        div{
            margin:10px 0px;
        }
        </style>
        <div>
        <button></button>
        <p><slot></slot></p>
        </div>
        `

    }

    connectedCallback() {
        this.para = this.shadowRoot.querySelector('p');
        const buttonText = this.getAttribute('button-text') || 'Toggle text';
        let button = this.shadowRoot.querySelector('button');
        button.textContent = buttonText;
        this.listener = button.addEventListener('click', this._toggleTextHandler);
    }

    _toggleTextHandler = () => {
        if (this.para.style.display === 'none') {
            this.para.style.display = 'block';
        } else {
            this.para.style.display = 'none'
        }
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener(this.listener);
    }
}

customElements.define('toggle-text-with-button', ToggleText);