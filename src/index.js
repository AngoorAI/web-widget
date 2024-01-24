// import chatIcon from "./src/assets/chat.svg";

// import "./style.css"

// const MESSAGE_ICON = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#FFFFFF"
//         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
//         <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//         <polyline points="22,6 12,13 2,6"></polyline>
//     </svg>
// `;



class MessageWidget {
  constructor(position = "bottom-right") {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialize();
    // this.injectStyles();
  }

  position = "";
  // conversationId = undefined;
  // projectId = "51c3831e-f01d-43a3-9e74-639f0a3f12d5";
  // open = false;
  // widgetContainer = null;
  // BASE_URL = 'https://fserver.angoor.ai/twillio'; // Replace with your base URL
//   characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

//   generateString(length) {
//       let result = ' ';
//       const charactersLength = characters.length;
//       for ( let i = 0; i < length; i++ ) {
//           result += characters.charAt(Math.floor(Math.random() * charactersLength));
//       }
//       return result;
//   }

  // streamChat(evt) {
  //   // const query_field = document.getElementById('query_input')
  //   const message_container = document.getElementsByClassName('message_container')[0]
  //   console.log(this.query_field.value)
  //   let user_div = document.createElement("div");
  //   let msg = this.query_field.value
  //   if (msg == "") return
  //   user_div.className = 'msg-box user-msg'
  //   user_div.innerHTML = msg
  //   message_container.appendChild(user_div)
  //   user_div.scrollIntoView()
  //   this.query_field.value = ""
  //   let bot_div = document.createElement("div");
  //   bot_div.className = 'msg-box bot-msg'


  //   const eventSource = new EventSource(`${this.BASE_URL}/stream/?conversationId=${this.conversationId}&body=${msg}`);
  //   console.info("Listenting on SEE", eventSource);
  //   eventSource.onmessage = (event) => {
  //       console.log(event['data'])
  //       console.log("===============")
  //       bot_div.innerHTML += event['data']
  //       message_container.appendChild(bot_div)
  //       bot_div.scrollIntoView()
  //   };

  //   eventSource.onerror = (error) => {
  //       console.log(error)
  //       eventSource.close()
  //   }
  // }

  // handle_keyup(evt) {
  //   if (evt.key === 'Enter') {
  //       console.log(this.query_field.value)
  //       this.streamChat(null);
  //       // Do something
  //   }
  // }

  async initialize() {
    // console.log("Project ID")
    // console.log(import.meta.url.split('=')[1])
    /**
     * Create and append a div element to the document body
     */
    console.log("This module is loaded")
    // if (this.conversationId == undefined) {
    //     fetch(`${this.BASE_URL}/new_conversation?projectId=${this.projectId}`)
    //     .then((response) => response.json())
    //     .then(res => {
    //         console.log(res)
    //         console.log("Creating new session ID")
    //         console.log("Creating new session ID")
    //         this.conversationId = res["sessionId"]
    //     })
    // }
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.zIndex = 99;
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );

    const iframe = document.createElement("iframe");
    iframe.src = "https://chat-widget-jade.vercel.app/test"
    iframe.id = "myFrame"
    iframe.style.border = "none"
    // iframe.addEventListener("load", () => {
    //   console.log("IFrame loaded successfully...")
    //   // window['iFrameResize'](iframe);
    //   const iframes = iFrameResize({ log: true }, '#myFrame')
    //   console.log(iframes)
    // });

    container.appendChild(iframe)
    document.body.appendChild(container);

    window.addEventListener(
      "message",
      (event) => {
        console.log("Received message on host", event)
        if (event.origin !== "https://chat-widget-jade.vercel.app") return;
        console.log(event.data)
        if (event.data == true) {
          iframe.height = "664px"
          iframe.width = "400px"
        }
        else {
          iframe.height = "48px"
          iframe.width = "161px"
        }
        // …
      },
      false,
    );

    var our_elements = document.getElementsByClassName("our_element")
    console.log("Found elements..", our_elements)
    for (const elem of our_elements) {
      console.log("Added onmouseover function")
      elem.onmouseover = (evt) => {
        console.log("Found hover...", evt, elem)
        // window.postMessage("This is some sample message from host", "https://chat-widget-jade.vercel.app")
        // window.postMessage("This is some sample message from host", "*")
        iframe.contentWindow.postMessage(`Got hover on: ${elem.innerHTML}`, "*")
      }
      console.log("Done")
      window.postMessage("This is some sample message from host", "https://chat-widget-jade.vercel.app")
    }
    // our_elements.forEach((elem) => {
    //   console.log("Added onmouseover function")
    //   elem.onmouseover((evt) => {
    //     console.log("Found hover...", evt, elem)
    //   })
    //   console.log("Done")
    // })


    // const headers = document.createElement("div")
    // headers.innerHTML = `
    // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">`
    // document.head.appendChild(headers)

    // /**
    //  * Create a button element and give it a class of button__container
    //  */
    // const buttonContainer = document.createElement("button");
    // buttonContainer.classList.add("button__container");


    // const startChattingText = document.createElement("div");
    // startChattingText.classList.add("widget__text");
    // startChattingText.innerHTML = "Start Chatting";
    // this.startChattingText = startChattingText;

    // /**
    //  * Create a span element for the widget icon, give it a class of 'widget__icon', update it's innerHTML property to an icon which would serve as the widget icon.
    //  */
    // const widgetIconElement = document.createElement("span");
    // widgetIconElement.classList.add("widget__icon", "chat__icon");
    // this.widgetIcon = widgetIconElement;

    // /**
    //  * Create a span element for the close icon, give it a class of 'widget__icon' and 'widget__hidden' which would be removed whenever the widget is closed, update it's innerHTML property to an icon which would serve as the widget icon during that state.
    //  */
    // const closeIconElement = document.createElement("span");
    // closeIconElement.classList.add("widget__icon", "widget__hidden", "close__icon");
    // this.closeIcon = closeIconElement;

    // /**
    //  * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
    //  */
    // buttonContainer.appendChild(this.startChattingText)
    // buttonContainer.appendChild(this.widgetIcon);
    // buttonContainer.appendChild(this.closeIcon);
    // buttonContainer.addEventListener("click", this.toggleOpen.bind(this));
    // this.buttonContainer = buttonContainer

    // /**
    //  * Create a container for the widget and add the following classes:- "widget__hidden", "widget__container"
    //  */
    // this.widgetContainer = document.createElement("div");
    // this.widgetContainer.classList.add("widget__hidden", "widget__container");

    // /**
    //  * Invoke the `createWidget()` method
    //  */
    // this.createWidgetContent();

    // /**
    //  * Append the widget's content and the button to the container
    //  */
    // container.appendChild(this.widgetContainer);
    // container.appendChild(this.buttonContainer);

    // let send_button = document.getElementsByClassName('send_button')[0]
    // send_button.addEventListener("click", this.streamChat.bind(this))
    // const query_field = document.getElementById('query_input')
    // this.query_field = query_field
    // this.query_field.addEventListener("keyup", this.handle_keyup.bind(this))
  }

  // createWidgetContent() {
  //   this.widgetContainer.innerHTML = `
  //       <div class="widget__header">
  //           <div class="widget__header__icon"></div>
  //           <div class="widget__header__content">
  //               <h3>Brainseeder</h3>
  //               <p>Virtual assistant</p>
  //           </div>
  //       </div>
  //       <div class="widget__divider"></div>

  //       <div class='message_container'></div>

  //       <div class='form'>
  //           <div class="query_field">
  //               <input
  //               rows=1
  //               autocomplete="off"
  //               id="query_input"
  //               name="name"
  //               placeholder="Ask anything..."
  //               ></input>
  //               <div class="send_button"></div>
  //           </div>
  //       </div>
  //       <div class="widget__divider"></div>
  //       <a href="https://angoor.ai" target="blank" class="widget__angoor">Powered by Angoor AI</a>
  //   `;
  // }

//   injectStyles() {
//     const styleTag = document.createElement("style");
//     styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");

//     document.head.appendChild(styleTag);
//   }

  // toggleOpen() {
  //   this.open = !this.open;
  //   if (this.open) {
  //     this.widgetIcon.classList.add("widget__hidden");
  //     this.startChattingText.classList.add("widget__hidden");
  //     this.buttonContainer.classList.add("button__container__collapsed");
  //     this.closeIcon.classList.remove("widget__hidden");
  //     this.widgetContainer.classList.remove("widget__hidden");
  //     if (this.conversationId == undefined) {
  //       // Create new conversation ID
  //       fetch(`${this.BASE_URL}/new_conversation?projectId=${this.projectId}`)
  //       .then((response) => response.json())
  //       .then(res => {
  //           console.log(res)
  //           console.log("Creating new session ID")
  //           this.conversationId = res["sessionId"]
  //       })
  //     } else {
  //       console.log("Conversation established")
  //     }
  //   } else {
  //     this.createWidgetContent();
  //     this.widgetIcon.classList.remove("widget__hidden");
  //     this.startChattingText.classList.remove("widget__hidden");
  //     this.buttonContainer.classList.remove("button__container__collapsed");
  //     this.closeIcon.classList.add("widget__hidden");
  //     this.widgetContainer.classList.add("widget__hidden");
  //   }
  // }
}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();
