class Events {
  constructor(editor) {
    this.editor = editor;
    this.dispatcher = new Dispatcher();
  }

  initCanvasEvent(e) {
    this.canvasEvent = {
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      mouse: {
        pageX: e.pageX,
        pageY: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY,
      },
      position: {
        inCanvas: false,
        inElement: false,
        resizer: -1,
      },
    };
  }

  onMouseDown(e) {
    const event = this.initCanvasEvent(e);
    const {
      canvasPositionLeft,
      canvasPositionTop,
    } = this.editor.position;
    const canvasWidth = this.editor.width;
    const canvasHeight = this.editor.height;

    if (
      event.mouse.pageX >= canvasPositionLeft
      && event.mouse.pageX <= canvasPositionLeft + canvasWidth
      && event.mouse.pageY >= canvasPositionTop
      && event.mouse.pageY <= canvasPositionTop + canvasHeight
    ) {
      event.mouse.x = this.editor.getBo
    }

    this.editor.elements.forEach((element) => {
      if (element.mouseInElement(ev))
    })
    if (element) {
      if (this.editor.hasSelection) {
        this.editor.selection.forEach((selectionElement) => {
          selectionElement.onMouseDown();
        });
      } else {
        element.onMouseDown(this);
      }
    }
  }

  get relativeMousePosition() {
    const rect = this.editor.boundingRect;
    return {
      x: this.canvasEvent.mouse.clientX - rect.left,
      y: this.canvasEvent.mouse.clientY - rect.top,
    };
  }
}

class DispatcherEvent {
  constructor(eventName) {
    this.eventName = eventName;
    this.callbacks = [];
  }

  registerCallback(callback) {
    this.callbacks.push(callback);
  }

  unregisterCallback(callback) {
    // Get the index of the callback in the callbacks array
    const index = this.callbacks.indexOf(callback);
    // If the callback is in the array then remove it
    if (index > -1) {
      this.callbacks.splice(index, 1);
    }
  }

  fire(data) {
    // We loop over a cloned version of the callbacks array
    // in case the original array is spliced while looping
    const callbacks = this.callbacks.slice(0);
    // loop through the callbacks and call each one
    callbacks.forEach((callback) => {
      callback(data);
    });
  }
}

class Dispatcher {
  constructor() {
    this.events = {};
  }

  dispatch(eventName, data) {
    // First we grab the event
    const event = this.events[eventName];
    // If the event exists then we fire it!
    if (event) {
      event.fire(data);
    }
  }

  on(eventName, callback) {
    // First we grab the event from this.events
    let event = this.events[eventName];
    // If the event does not exist then we should create it!
    if (!event) {
      event = new DispatcherEvent(eventName);
      this.events[eventName] = event;
    }
    // Now we add the callback to the event
    event.registerCallback(callback);
  }

  off(eventName, callback) {
    // First get the correct event
    const event = this.events[eventName];
    // Check that the event exists and it has the callback registered
    if (event && event.callbacks.indexOf(callback) > -1) {
      // if it is registered then unregister it!
      event.unregisterCallback(callback);
      // if the event has no callbacks left, delete the event
      if (event.callbacks.length === 0) {
        delete this.events[eventName];
      }
    }
  }
}
