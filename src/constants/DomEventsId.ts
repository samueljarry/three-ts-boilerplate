export enum DomEventsId {
  // Mouse Events
  CLICK = 'click',
  DBLCLICK = 'dblclick',
  MOUSEUP = 'mouseup',
  MOUSEDOWN = 'mousedown',
  MOUSEMOVE = 'mousemove',
  MOUSEOVER = 'mouseover',
  MOUSEOUT = 'mouseout',
  MOUSEENTER = 'mouseenter',
  MOUSELEAVE = 'mouseleave',
  CONTEXTMENU = 'contextmenu',

  // Keyboard Events
  KEYDOWN = 'keydown',
  KEYPRESS = 'keypress',
  KEYUP = 'keyup',

  // Frame/Object Events
  LOAD = 'load',
  UNLOAD = 'unload',
  RESIZE = 'resize',
  SCROLL = 'scroll',
  
  // Form Events
  SELECT = 'select',
  CHANGE = 'change',
  SUBMIT = 'submit',
  RESET = 'reset',
  FOCUS = 'focus',
  BLUR = 'blur',

  // Drag Events
  DRAG = 'drag',
  DRAGEND = 'dragend',
  DRAGENTER = 'dragenter',
  DRAGLEAVE = 'dragleave',
  DRAGOVER = 'dragover',
  DRAGSTART = 'dragstart',
  DROP = 'drop',

  // Clipboard Events
  CUT = 'cut',
  COPY = 'copy',
  PASTE = 'paste',

  // Print Events
  AFTERPRINT = 'afterprint',
  BEFOREPRINT = 'beforeprint',

  // Media Events
  ABORT = 'abort',
  CANPLAY = 'canplay',
  CANPLAYTHROUGH = 'canplaythrough',
  DURATIONCHANGE = 'durationchange',
  EMPTIED = 'emptied',
  ENDED = 'ended',
  ERROR = 'error',
  LOADEDDATA = 'loadeddata',
  LOADEDMETADATA = 'loadedmetadata',
  LOADSTART = 'loadstart',
  PAUSE = 'pause',
  PLAY = 'play',
  PLAYING = 'playing',
  PROGRESS = 'progress',
  RATECHANGE = 'ratechange',
  SEEKED = 'seeked',
  SEEKING = 'seeking',
  STALLED = 'stalled',
  SUSPEND = 'suspend',
  TIMEUPDATE = 'timeupdate',
  VOLUMECHANGE = 'volumechange',
  WAITING = 'waiting',
  
  // Misc / Global Events
  ANIMATIONSTART = 'animationstart',
  ANIMATIONEND = 'animationend',
  ANIMATIONITERATION = 'animationiteration',
  TRANSITIONEND = 'transitionend',
  MESSAGE = 'message',
  ONLINE = 'online',
  OFFLINE = 'offline',
  POPSTATE = 'popstate',
  SHOW = 'show',
  STORAGE = 'storage',
  TOGGLE = 'toggle',
  TOUCHCANCEL = 'touchcancel',
  TOUCHEND = 'touchend',
  TOUCHMOVE = 'touchmove',
  TOUCHSTART = 'touchstart',
  WHEEL = 'wheel',
}
