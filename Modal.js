class Modal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        
    }
}

customElements.define('my-modal', Modal);