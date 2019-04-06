export default class Events {
  constructor(editor) {
    this.editor = editor;
    this.canvasEvent = null;
  }

  initCanvasEvent(e) {
    this.canvasEvent = {
      element: null,
      elementDrawn: null,
      elementSelected: null,
      resizing: false,
      dragging: false,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      mouse: {
        pageX: e.pageX,
        pageY: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        startCanvasX: null,
        startCanvasY: null,
        canvasX: null,
        canvasY: null,
      },
      position: {
        inCanvas: false,
        inElement: false,
        inResizer: false,
        resizer: null,
      },
      cache: null,
      e,
    };
  }

  mainEventHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.canvasEvent === null) this.initCanvasEvent(e);
    this.canvasEvent.e = e;
    this.updatePosition();
    switch (e.type) {
      case 'mousedown':
        this.onMouseDown();
        break;
      case 'mousemove':
        this.onMouseMove();
        break;
      case 'mouseup':
        this.onMouseUp();
        break;
      case 'click':
        this.onClick();
        break;
      default:
        throw new Error(`Events module wasn't set to handle with this event type: ${e.type}`);
    }
  }

  onMouseDown() {
    if (this.canvasEvent.position.inCanvas) {
      const relativeMousePosition = this.relativeMousePosition;
      this.canvasEvent.mouse.startCanvasX = relativeMousePosition.x;
      this.canvasEvent.mouse.startCanvasY = relativeMousePosition.y;
      if (this.canvasEvent.position.inElement) {
        this.handleElementMouseDown();
      } else if (this.canvasEvent.position.inResizer) {
        this.handleResizerMouseDown();
      } else if (this.editor.activeTool.name !== 'hold') {
        this.handleCanvasMouseDown();
      }
    }
  }

  onMouseMove() {
    if (this.canvasEvent.element || this.canvasEvent.dragging) {
      this.handleSelectionMouseMove();
    } else if (this.canvasEvent.position.resizer || this.canvasEvent.resizing) {
      this.handleResizerMouseMove();
    } else if (this.canvasEvent.position.inCanvas && this.canvasEvent.elementDrawn) {
      this.handleDrawMouseMove();
    }
  }

  onMouseUp() {
    this.handleMouseUp();
    this.canvasEvent = null;
  }

  updatePosition() {
    this.updateMousePosition();
    const mousePosition = this.mousePosition;
    if (mousePosition) {
      this.canvasEvent.position.inCanvas = true;
      if (mousePosition.type === 'element') {
        this.canvasEvent.position.inElement = true;
        this.canvasEvent.element = mousePosition;
        this.canvasEvent.position.resizer = null;
        this.canvasEvent.position.inResizer = false;
      } else if (mousePosition.type === 'resizer' || mousePosition.type === 'rotator') {
        this.canvasEvent.position.inResizer = true;
        this.canvasEvent.position.resizer = mousePosition;
        this.canvasEvent.element = null;
        this.canvasEvent.position.inElement = false;
      }
    } else if (!mousePosition) {
      this.canvasEvent.position.inCanvas = true;
      this.canvasEvent.position.inElement = false;
      this.canvasEvent.position.inResizer = false;
    } else {
      this.canvasEvent.position.inCanvas = false;
      this.canvasEvent.position.inElement = false;
      this.canvasEvent.position.inResizer = false;
    }
    console.log(`in canvas: ${this.canvasEvent.position.inCanvas}
    in element: ${this.canvasEvent.position.inElement}
    in resizer: ${this.canvasEvent.position.inResizer}`);
  }

  updateStartMousePosition() {
    this.updatePosition();
    const relativeMousePosition = this.relativeMousePosition;
    this.canvasEvent.mouse.startCanvasX = relativeMousePosition.x;
    this.canvasEvent.mouse.startCanvasY = relativeMousePosition.y;
  }

  updateMousePosition() {
    this.canvasEvent.mouse.clientX = this.canvasEvent.e.clientX;
    this.canvasEvent.mouse.clientY = this.canvasEvent.e.clientY;
    this.canvasEvent.mouse.pageX = this.canvasEvent.e.pageX;
    this.canvasEvent.mouse.pageY = this.canvasEvent.e.pageY;
    this.canvasEvent.mouse.screenX = this.canvasEvent.e.screenX;
    this.canvasEvent.mouse.screenY = this.canvasEvent.e.screenY;
  }

  get mousePosition() {
    const canvasPositionLeft = this.editor.position.left;
    const canvasPositionTop = this.editor.position.top;
    const canvasWidth = this.editor.width;
    const canvasHeight = this.editor.height;
    let answer = null;
    if (
      this.canvasEvent.mouse.pageX >= canvasPositionLeft
      && this.canvasEvent.mouse.pageX <= canvasPositionLeft + canvasWidth
      && this.canvasEvent.mouse.pageY >= canvasPositionTop
      && this.canvasEvent.mouse.pageY <= canvasPositionTop + canvasHeight
    ) {
      const relativeMousePosition = this.relativeMousePosition;
      this.canvasEvent.mouse.canvasX = relativeMousePosition.x;
      this.canvasEvent.mouse.canvasY = relativeMousePosition.y;
      this.editor.elements.forEach((element) => {
        if (
          element.mouseInElement(
            this.canvasEvent.mouse.canvasX, this.canvasEvent.mouse.canvasY,
          )) {
          answer = element;
        } else {
          this.editor.selection.forEach((selection) => {
            const mouseInResizer = selection.holder.mouseInResizer(
              this.canvasEvent.mouse.canvasX, this.canvasEvent.mouse.canvasY,
            );
            if (mouseInResizer) {
              answer = mouseInResizer;
            }
          });
        }
      });
    }
    return answer;
  }

  get relativeMousePosition() {
    const rect = this.editor.boundingRect;
    return {
      x: this.canvasEvent.mouse.clientX - rect.left,
      y: this.canvasEvent.mouse.clientY - rect.top,
    };
  }

  handleElementMouseDown() {
    // if element not selected, select it
    if (this.canvasEvent.element.holder) {
      this.canvasEvent.dragging = true;
    } else {
      this.canvasEvent.element.select();
      this.canvasEvent.elementSelected = this.canvasEvent.element;
      /* if (
        this.editor.selection.length === 1
          && !this.canvasEvent.ctrlKey
      ) this.editor.deselectAll(); */
    }
  }

  handleResizerMouseDown() {
    this.canvasEvent.resizing = true;
  }

  handleCanvasMouseDown() {
    this.editor.deselectAll();
    this.canvasEvent.elementDrawn = this.editor.activeTool.createElement();
  }

  handleSelectionMouseMove() {
    if (this.editor.selection.length > 1) {
      this.editor.selection.forEach((selection) => {
        selection.drag();
      });
    } else {
      this.canvasEvent.element.drag();
    }
    this.editor.renderAll();
    this.updatePosition();
    this.updateStartMousePosition();
  }

  handleResizerMouseMove() {
    this.editor.selection.forEach((selection) => {
      selection.resize();
    });
    this.editor.renderAll();
    this.updateStartMousePosition();
  }

  handleDrawMouseMove() {
    this.canvasEvent.elementDrawn.updateElement();
  }

  handleMouseUp() {
    if (this.canvasEvent.elementDrawn) {
      this.canvasEvent.elementDrawn.endDraw();
    }
    if (this.canvasEvent.cache) {
      this.recordUndo();
    }
  }

  recordUndo() {
    this.editor.undo.length = 0;
    this.editor.elements.forEach((element) => {
      this.editor.undo.push(element);
    });
  }
}

/*
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
*/

// TODO update selection and shape after shape 180 deg flip in resize
