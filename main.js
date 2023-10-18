// import { CLOSE_ICON, MESSAGE_ICON, styles } from "./assets.js";

const styles = `
    .widget__container * {
        box-sizing: border-box;
    }

    h3, p, input {
        margin: 0;
        padding: 0;
    }

    .widget__container {
        box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
        width: 400px;
        overflow: auto;
        right: -25px;
        bottom: 75px;
        position: absolute;
        transition: max-height .2s ease;
        font-family: Helvetica, Arial ,sans-serif;
        background-color: #e6e6e6;
        border-radius: 10px;
        box-sizing: border-box;
        height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: end;
    }

    .widget__icon {
        cursor: pointer;
        width: 60%;
        position: absolute;
        top: 18px;
        left: 16px;
        transition: transform .3s ease;
    }

    .widget__hidden {
        transform: scale(0);
    }
    .button__container {
        border: none;
        background-color: #0f172a;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
    }

    .widget__container.hidden {
        max-height: 0px;
    }

    .widget__header {
        padding: 1rem 2rem 1.5rem;
        background-color: #000;
        color: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-align: center;
    }

    .widget__header h3 {
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 8px;
    }

    .form {
        padding: 2rem 1rem 1.5rem;
    }

    .form .query_field {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
    }

    .query_field label {
        margin-bottom: 8px;
        font-size: 14px;
    }

    .query_field input,
    .query_field textarea {
        border: 1px solid #000000ad;
        border-radius: 3px;
        padding: 8px 10px;
        background-color: #fff;
        width: 100%;
    }

    .query_field input {
        height: 48px;
    }

    .query_field textarea::placeholder {
        font-family: Helvetica, Arial ,sans-serif;
    }

    .send_button {
        height: 48px;
        border-radius: 6px;
        font-size: 18px;
        background-color: #000;
        color: #fff;
        border: 0;
        width: 100%;
        cursor: pointer;
    }

    .send_button:hover {
        background-color: rgba(0, 0, 0, 95%);
    }
    .message_container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow-y: auto;
    }
    .msg-box {
        width: 70%;
        border: solid;
        border-radius: 10px;
        padding: 5px;
        margin: 10px 5px;
    }
    .user-msg {
        align-self: end;
    }
`;

const MESSAGE_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FFFFFF"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
`;

const CLOSE_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#FFFFFF" stroke="#FFFFFF"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
`;


class MessageWidget {
  constructor(position = "bottom-right") {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialize();
    this.injectStyles();
  }

  position = "";
  open = false;
  widgetContainer = null;
  BASE_URL = 'http://127.0.0.1:8000/twillio'; // Replace with your base URL
  characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  generateString(length) {
      let result = ' ';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  streamChat(evt) {
    const query_field = document.getElementById('query_input')
    const message_container = document.getElementsByClassName('message_container')[0]
    console.log(query_field.value)
    let user_div = document.createElement("div");
    let msg = query_field.value
    user_div.className = 'msg-box user-msg'
    user_div.innerHTML = msg
    message_container.appendChild(user_div)
    query_field.value = ""
    let bot_div = document.createElement("div");
    bot_div.className = 'msg-box bot-msg'


    const eventSource = new EventSource(`${this.BASE_URL}/stream/?body=${msg}`);
    console.info("Listenting on SEE", eventSource);
    eventSource.onmessage = (event) => {
        console.log(event['data'])
        console.log("===============")
        bot_div.innerHTML += event['data']
        message_container.appendChild(bot_div)
    };

    eventSource.onerror = (error) => {
        console.log(error)
        eventSource.close()
    }
    query_field.setAttribute('value', '')
  }

  async initialize() {
    console.log("Project ID")
    console.log(import.meta.url.split('=')[1])
    /**
     * Create and append a div element to the document body
     */
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    /**
     * Create a button element and give it a class of button__container
     */
    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("button__container");

    /**
     * Create a span element for the widget icon, give it a class of 'widget__icon', update it's innerHTML property to an icon which would serve as the widget icon.
     */
    const widgetIconElement = document.createElement("span");
    widgetIconElement.innerHTML = MESSAGE_ICON;
    widgetIconElement.classList.add("widget__icon");
    this.widgetIcon = widgetIconElement;

    /**
     * Create a span element for the close icon, give it a class of 'widget__icon' and 'widget__hidden' which would be removed whenever the widget is closed, update it's innerHTML property to an icon which would serve as the widget icon during that state.
     */
    const closeIconElement = document.createElement("span");
    closeIconElement.innerHTML = CLOSE_ICON;
    closeIconElement.classList.add("widget__icon", "widget__hidden");
    this.closeIcon = closeIconElement;

    /**
     * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
     */
    buttonContainer.appendChild(this.widgetIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    /**
     * Create a container for the widget and add the following classes:- "widget__hidden", "widget__container"
     */
    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("widget__hidden", "widget__container");

    /**
     * Invoke the `createWidget()` method
     */
    this.createWidgetContent();

    /**
     * Append the widget's content and the button to the container
     */
    container.appendChild(this.widgetContainer);
    container.appendChild(buttonContainer);

    let send_button = document.getElementsByClassName('send_button')[0]
    send_button.addEventListener("click", this.streamChat.bind(this))
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
        <header class="widget__header">
            <h3>Start a conversation</h3>
            <p>We usually respond within a few hours</p>
        </header>

        <div class='message_container'></div>

        <div class='form'>
            <div class="query_field">
                <input
                type="text"
                id="query_input"
                name="name"
                placeholder="Enter your query"
                />
            </div>

            <button class='send_button'>Send Message</button>
        </div>
    `;
  }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");

    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.widgetIcon.classList.add("widget__hidden");
      this.closeIcon.classList.remove("widget__hidden");
      this.widgetContainer.classList.remove("widget__hidden");
    } else {
      this.createWidgetContent();
      this.widgetIcon.classList.remove("widget__hidden");
      this.closeIcon.classList.add("widget__hidden");
      this.widgetContainer.classList.add("widget__hidden");
    }
  }
}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();
