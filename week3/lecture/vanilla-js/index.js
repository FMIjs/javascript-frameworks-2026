// const app = document.querySelector('#app');
// app.addEventListener('click', function (event) {
//   console.log('app', event.target)
// })

// const welcomeText = document.createElement('span');
// welcomeText.innerText = 'Welcome!';
// welcomeText.setAttribute('id', 'welcome-text');

// app.appendChild(welcomeText);
// welcomeText.previousSibling.remove();

// const button = document.createElement('button');
// button.textContent = 'Click me';

// app.appendChild(button);

// button.addEventListener('click', function (event) {
//   console.log('button', event);
// });

function myTag(staticParts, ...allDynamicParts) {
  console.log(staticParts, allDynamicParts);
}


myTag`This is a test ${1 + 43} ! `

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const div = document.createElement('div');
    div.innerHTML = 'HELLO'
    this.shadowRoot.appendChild(div)
  }

  connectedCallback() {
    console.log('connected')
  }

  disconnectedCallback() {
    console.log('disconnected')
  }
}

customElements.define('app-root', App)
