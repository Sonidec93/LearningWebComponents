class ToggleText extends HTMLElement {

    isVisible;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
       
        div{
            margin:10px 0px;
            color:blue;
        }
        #para{
            display:none;
        }
        </style>
        <div>
        <button><slot></slot></button>
        <p id="para">I am getting displayed :)</p>
        </div>
        `

    }

    connectedCallback() {

        this.para = this.shadowRoot.querySelector('#para');
        
        let button = this.shadowRoot.querySelector('button');

        this.listener = button.addEventListener('click', this._toggleTextHandler);
    }

    _toggleTextHandler = () => {
        
        this.isVisible = !this.isVisible;
        this.para.style.display = this.isVisible ? 'block' : 'none';

    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener(this.listener);
    }
}

customElements.define('toggle-text-with-button', ToggleText);