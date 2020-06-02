class Modal extends HTMLElement {

    cancelButton;
    continueButton;
    backdrop;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
        <style>
        #backdrop{
            
            position:fixed;
            top:0;
            left:0;
            height:100vh;
            width:100%;
            background:rgba(0,0,0,0.6);
            opacity:0;
            z-index:10;
            pointer-events:none;
        }
        #modal{
            display:grid;
            grid-template-rows:30% 50% 20%;
            z-index:100;
            position:fixed;
            top:30vh;
            left:30%;
            background:#fff;
            height:40vh;
            width:40%;
            border-radius:1rem;
            padding:1rem;
            opacity:0;
            pointer-events:none;
        }
        .action-buttons{
            display:flex;
            justify-content:flex-end;
        }
        .action-buttons button{
            margin: 10px;
            border-radius: 6px;
            height: 2rem;
            background: white;
            font-family: MONOSPACE;
            border: 1px solid white;
            cursor: pointer;
            font-weight: bolder;
            font-size: 1.25rem;
        }
        .title{
            text-align:center;
            font-family:sans-serif;
        }
        ::slotted(div){
            font-family:sans-serif;
            text-align:center;
        }
        :host([open]) #backdrop{
            opacity:0.6;
            pointer-events:auto;
        }
        :host([open]) #modal{
            opacity:1;
            pointer-events:auto;
        }
        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <h2 class="title"><slot name="header"></slot></h2>
            </header>
            <section>
                <slot>
                </slot>
            </section>
            <section>
            <hr>
                <div class="action-buttons">
                <button id="cancel">Cancel</button>
                <button id="contiinue">Continue</button>
                </div>
            </section>
        </div>
        `
    }
    connectedCallback() {

        this.cancelButton = this.shadowRoot.querySelector('#cancel');
        this.cancelButton.addEventListener('click', this.close);
        this.backdrop = this.shadowRoot.querySelector('#backdrop');
        this.backdrop.addEventListener('click', this.close);

    }
    close = (event) => {
        event.preventDefault();
        this.removeAttribute('open');
        this.isOpen = false;

    }
    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (name === 'open' && newValue === '' && newValue != oldValue) {
    //         this._openModal();
    //     }
    // }
    // _openModal = () => {
    //     const modal = this.shadowRoot.querySelector('#modal');
    //     const backdrop = this.shadowRoot.querySelector('#backdrop');
    //     modal.style.opacity = "1";
    //     modal.style.pointerEvents = "auto";
    //     backdrop.style.opacity = "0.6";
    // }
    // static get observedAttributes() {
    //     return ['open']
    // }
    disconnectedCallback() {
        this.backdrop.removeEventListener('click', this.close);
        this.cancelButton.removeEventListener('click', this.close)
    }
    open = () => {
        this.setAttribute('open', '');
        this.isOpen = true;
    }
}

customElements.define('my-modal', Modal);