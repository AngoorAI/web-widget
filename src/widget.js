//message-widget.js

(function () {
  class MessageWidget {
    endpoint = "https://chat-widget-jade.vercel.app";
    defaultSettings = {
      projectId: "",
      openDimensions: { height: "664px", width: "400px" },
      closedDimensions: { height: "48px", width: "161px" },
      targetContainerId: "widgetFrameContainer",
      targetContainerStyles: {
        position: "fixed",
        zIndex: 99,
        bottom: "12px",
        right: "12px",
      },
    };

    constructor(settings) {
      this.settings = { ...this.defaultSettings, ...settings };
      if (typeof document !== "undefined") {
        const iframe = this.createFrame();
        const container = this.getTargetContainer();
        this.appendFrame(iframe, container);
        this.setMessageListener(iframe);
      } else {
        console.error(
          "Cannot initialize MessageWidget: document is not defined"
        );
      }
    }

    getTargetContainer() {
      let container = document.getElementById(this.settings.targetContainerId);
      if (!container) {
        container = document.createElement("div");
        Object.assign(container.style, this.settings.targetContainerStyles);
        document.body.appendChild(container);
      }
      return container;
    }

    createFrame() {
      const iframe = document.createElement("iframe");
      iframe.src = `${this.endpoint}/${this.settings.projectId}`;
      iframe.id = "widgetFrame";
      iframe.style.border = "none";
      return iframe;
    }

    appendFrame(iframe, container) {
      container.appendChild(iframe);
    }

    setMessageListener(iframe) {
      this.messageListener = (event) => {
        console.log("Received message on host", event);
        if (event.origin === this.endpoint) {
          console.log(event.data);
          const isOpen = event.data;
          iframe.height = isOpen
            ? this.settings.openDimensions.height
            : this.settings.closedDimensions.height;
          iframe.width = isOpen
            ? this.settings.openDimensions.width
            : this.settings.closedDimensions.width;
        }
      };
      if (typeof window !== "undefined") {
        window.addEventListener("message", this.messageListener);
      } else {
        console.error(
          "Cannot set message listener for MessageWidget: window is not defined"
        );
      }
    }

    destroy() {
      if (typeof window !== "undefined") {
        window.removeEventListener("message", this.messageListener);
      }
      const iframe = document.getElementById("widgetFrame");
      if (iframe) {
        iframe.parentNode.removeChild(iframe);
      }
      this.settings = null;
    }
  }

  window.AngoorAI = {
    initMessageWidget: function (settings) {
      const messageWidget = new MessageWidget(settings);

      if (typeof window !== "undefined") {
        if (window.MessageWidgetInstance) {
          window.MessageWidgetInstance.destroy();
        }
        window.MessageWidgetInstance = messageWidget;
      } else {
        console.error(
          "Cannot attach MessageWidget instance to window: window is not defined"
        );
      }
    },
  };
})();