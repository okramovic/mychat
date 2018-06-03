/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/app2.js":
/*!*********************!*\
  !*** ./app/app2.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//const React = require('react');\n//const ReactDOM = require('react-dom');\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n//const main = document.getElementById('main'),\n//appDiv = document.getElementById('app');\n\n\n/*const Rooms = require('./components/Rooms'),\n      Chat  = require('./components/Chat'),\n      Blocker  = require('./components/helpers').Blocker,\n      Warning = require('./components/helpers').Warning*/\n\n//import FileUploadForm from './components/fileUploadForm';\n//import Input from './components/input';\n\nvar applicationServerPublicKey = 'BF56pZXovwEOAn0eCrYXe8kj3LKL7HYWjfzpn2fqGUYBOne_R1KjJKSc_aQtlsqp3Tv2ZWj5ZVEw1wMPWt3jy3w';\n\nvar socket = void 0;\n\n/*socket.on('serverMsg', msg =>{\n    console.log('serverMsg', msg)\n})*/\n\n/*const Test = props =>{\n  return(<div>\n      <h1>hi this is test element</h1>\n      <p>and this some text</p>\n\n    </div>\n  )\n}*/\n\n//export default Test\n\n//ReactDOM.render(<Test />, document.querySelector('#app'))\n\n\nvar App = function (_Component) {\n  _inherits(App, _Component);\n\n  //class App extends React.Component{\n  function App(props) {\n    _classCallCheck(this, App);\n\n    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n    var userName = localStorage.getItem('userName');\n    var lastRoom = localStorage.getItem('lastRoom');\n\n    //if (lastRoom) {\n    //window.socket = io('https://snapdrop.glitch.me?room='+lastRoom)\n    //socket = io('https://snapdrop.glitch.me',{path:'/' + lastRoom})\n    //console.log('socket', window.socket)\n    //}\n\n    _this.messageHandler = _this.messageHandler.bind(_this);\n    _this.userNameHandler = _this.userNameHandler.bind(_this);\n    _this.getRoomContent = _this.getRoomContent.bind(_this);\n    _this.fileHandler = _this.fileHandler.bind(_this);\n    _this.openFileForm = _this.openFileForm.bind(_this);\n    _this.fileSubmitHandler = _this.fileSubmitHandler.bind(_this);\n    _this.displayWarning = _this.displayWarning.bind(_this);\n    _this.removeWarning = _this.removeWarning.bind(_this);\n\n    //this.refreshSocketListeners = this.refreshSocketListeners.bind(this)\n\n\n    _this.state = {\n      loggedIn: userName ? true : false,\n      promptUserName: false,\n      userName: userName || null,\n      activeRoom: lastRoom || null,\n      currentRoomStartDate: null,\n      messages: _this.props.data || null,\n      warning: null,\n      socketConnected: null,\n      shouldScroll: true,\n      showFileForm: false\n\n      //if (!Notification.permission || Notification.permission == 'default') \n      //      Notification.requestPermission()\n      //      .then(result =>{\n      //            alert('notif permission ' + result)\n      // }) \n      //else console.log(Notification.permission)\n\n    };return _this;\n  }\n\n  _createClass(App, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      if (this.state.activeRoom) this.getRoomContent(this.state.activeRoom);\n      //refreshSocketListeners.call(this)\n      //Push.Permission.request(onGranted, onDenied);\n      //if (!Push.Permission.has())  Push.Permission.request()\n\n      window.addEventListener(\"message\", receivePostMessage, false); // used when? wth SSE? or window.post?\n\n      if (this.state.userName) registerServiceWorker();\n    }\n  }, {\n    key: 'userNameHandler',\n    value: function userNameHandler(string) {\n      //if (this.state.activeRoom) \n      localStorage.setItem('userName', string);\n      this.setState({ userName: string, loggedIn: true }); //, promptUserName: false})\n    }\n  }, {\n    key: 'messageHandler',\n    value: function messageHandler(text) {\n      //console.log('new msg inputed', text, Date.now() )\n      window.socket.emit('msg', { room: this.state.activeRoom, from: this.state.userName, text: text.toString().trim(), timeStamp: Date.now() });\n    }\n  }, {\n    key: 'fileHandler',\n    value: function fileHandler(ev) {\n      var _this2 = this;\n\n      console.log('file ev', ev.target.files);\n\n      var file = ev.target.files[0],\n          reader = new FileReader();\n\n      if (!file) return console.log('no file');\n\n      if (file.size > 5 * 1000 * 1000) {\n        console.error('file too big');\n        return this.displayWarning('File too big, 5Megs is maximum', 4500);\n      }\n\n      reader.onloadend = function (ev) {\n        console.log('loadend');\n        var fileBuffer = ev.target.result,\n            fileName = encodeURI(file.name),\n            //  encodeURIComponent   .replace(/\\s/g, '-') ),\n        fileType = file.type,\n            activeRoom = _this2.state.activeRoom,\n            userName = _this2.state.userName;\n\n        console.log(activeRoom, userName, fileName);\n        _this2.setState({ fileReady: true }, function () {\n          return sendFileToServer(fileBuffer, fileName, fileType, activeRoom, userName);\n        }\n        //.then(res=>{})\n        );\n      };\n      reader.onerror = function (er) {\n        return console.error('er reading file');\n      };\n\n      reader.readAsArrayBuffer(file);\n    }\n  }, {\n    key: 'uploadHandler',\n    value: function uploadHandler() {}\n  }, {\n    key: 'openFileForm',\n    value: function openFileForm() {\n      if (!(this.state.activeRoom == 'me' || this.state.activeRoom == 'ku' || this.state.activeRoom == 'mak' || this.state.activeRoom == 'vlad')) {\n        this.displayWarning('not possible here');\n        return console.error('not for you');\n      }\n\n      this.setState({ showFileForm: !this.state.showFileForm });\n    }\n  }, {\n    key: 'fileSubmitHandler',\n    value: function fileSubmitHandler(ev) {\n      console.log('file submitted');\n      ev.preventDefault();\n      console.log('submit', document.querySelector('input[type=\"file\"]').files);\n      var room = localStorage.getItem('lastRoom'); //document.querySelector('#loginForm').userName.value\n      //const pass = document.querySelector('#loginForm').pass.value\n      var formData = new FormData();\n      formData.append('room', room);\n      formData.append(\"uploadFile\", document.querySelector('input[type=\"file\"]').files[0]);\n\n      fetch('/api/uploadFile', {\n        method: 'POST',\n        credentials: 'include',\n        body: formData,\n        headers: new Headers({\n          //'Content-Type': 'application/json'\n          \"x-app-roomname\": room,\n          \"x-app-username\": localStorage.getItem('userName')\n        })\n      }).then(function (response) {\n        console.log(response);\n        //if (response.ok) location.pathname = '/'\n        //else console.error('not authorized')\n      });\n    }\n  }, {\n    key: 'getRoomContent',\n    value: function getRoomContent(roomName) {\n      var _this3 = this;\n\n      //console.log('getRoomContent', roomName)\n\n      fetch('/api/roomContent', {\n        method: 'POST',\n        credentials: 'include',\n        body: JSON.stringify({ room: roomName }),\n        headers: new Headers({ 'content-type': 'application/json' })\n      }).then(function (res) {\n\n        if (!res.ok) {\n\n          _this3.displayWarning('~ not for your eyes ~');\n          throw new Error('not successful');\n        } else {\n          setTimeout(function () {\n            return _this3.setState({ warning: null });\n          }, 250);\n          return res.json();\n        }\n      }).then(function (res) {\n\n        if (window.socket) {\n          window.socket.emit('leave', _this3.state.activeRoom);\n          window.socket.disconnect();\n        }\n\n        _this3.setState({\n          messages: res.chat,\n          activeRoom: res.roomName,\n          currentRoomStartDate: res.roomStarted,\n          shouldScroll: true\n        });\n\n        saveLastRoom(res.roomName);\n        window.socket = io('https://snapdrop.glitch.me?room=' + res.roomName);\n        refreshSocketListeners.call(_this3);\n      }).catch(function (er) {\n        console.error(er);\n        _this3.displayWarning('something went wrong...', null, false);\n      });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      /*const loggedIn = this.state.loggedIn  //(this.state.activeRoom && this.state.userName) ? true : false\n      // style={{display: this.state.showFileForm == true ? 'block': 'none'}}\n      const display = (this.state.showFileForm == true) ? 'block': 'none',\n            roomOK = (this.state.activeRoom == 'me' || this.state.activeRoom == 'ku' || \n                      this.state.activeRoom == 'mak' || this.state.activeRoom == 'vlad' )\n      */\n      //console.log('display', display, this.state.showFileForm)\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          'h1',\n          null,\n          'hoy'\n        ),\n        ' ',\n        this.props.data.map(function (el, i) {\n          return _react2.default.createElement(\n            'div',\n            null,\n            _react2.default.createElement(\n              'h3',\n              { key: i },\n              el,\n              ' it works i said'\n            )\n          );\n        })\n      );\n      /*return(\n        <div id=\"app\">\n          <Rooms getRoomContent={this.getRoomContent} activeRoom={this.state.activeRoom} />\n          <Chat  messages={this.state.messages} activeRoom={this.state.activeRoom}\n                 loggedIn={this.state.loggedIn} scroll={this.state.shouldScroll}\n                 started={this.state.currentRoomStartDate} loggedIn={this.state.loggedIn}/>\n          \n          <Input type=\"msg\"  room={this.state.activeRoom} \n                 loggedIn={(this.state.loggedIn && this.state.activeRoom)? true: false} \n                 fileHandler={this.fileHandler} fileReady={this.state.fileReady} \n                 uploadHandler={this.uploadHandler} openFileForm={this.openFileForm}\n                 user={this.state.userName} inputHandler={this.messageHandler} \n                 makeBottomSpace={this.state.showFileForm} \n                 display={!this.state.showFileForm && this.state.socketConnected}/>\n          \n          <FileUploadForm fileSubmitHandler={this.fileSubmitHandler} \n               display={this.state.showFileForm && roomOK}\n               openFileForm={this.openFileForm}/>\n          \n          <Input type=\"userName\" loggedIn={this.state.loggedIn} user={null} \n                 inputHandler={this.userNameHandler}/>\n          <Blocker  display={!this.state.loggedIn} />\n          <Warning text={this.state.warning}/>\n        </div>\n      )*/\n    }\n    /*displayWarning(msg = 'Sorry, something went wrong. Try again', hideMillis = 3500, hide = true){\n        this.setState({warning: msg, shouldScroll: false})\n        if (hide) setTimeout(()=>this.setState({warning: null}), hideMillis)\n    }\n    removeWarning(){\n        this.setState({warning: null, shouldScroll: true})\n    }*/\n\n  }]);\n\n  return App;\n}(_react.Component);\n\nmodule.exports = App;\n\n//ReactDOM.render(<App />, appDiv)\n\n\nfunction refreshSocketListeners() {\n  var _this4 = this;\n\n  //  https://socket.io/docs/client-api/#event-connect\n\n  //console.log('refreshing socket:', window.socket)\n  // Push.create('Hello World!')\n  /* Push.create('Hello world!', {\n      body: 'How\\'s it hangin\\'?',\n      icon: '/images/icon.png',\n      link: '/#',\n      timeout: 4000,\n      onClick: function () {\n          console.log(\"Fired!\");\n          window.focus();\n          this.close();\n      },\n      vibrate: [200, 100, 200, 100, 200, 100, 200]\n  });*/\n  //console.log(Push.Permission.has(), Push.Permission)\n\n  if (!window.socket) return;\n\n  window.socket.on('connect', function () {\n    console.log('socket connected', new Date());\n    _this4.setState({ socketConnected: true });\n    _this4.removeWarning();\n  });\n  window.socket.on('disconnect', function (reason) {\n    console.error('socket DISconnected', new Date());\n    _this4.setState({ socketConnected: false }, function () {\n      return _this4.displayWarning('refresh the page please', null, false);\n    });\n  });\n  window.socket.on('error', function (error) {\n    console.error('socket Error', new Date());\n    _this4.setState({ socketConnected: false }, function () {\n      return _this4.displayWarning('refresh the page please', null, false);\n    });\n  });\n  window.socket.on('connect_timeout', function (timeout) {\n    console.error('socket connect_timeout', new Date());\n    // window.socket.open()  ? \n  });\n\n  window.socket.on('msg', function (msg) {\n    console.log('new socket msg', msg);\n    //alert('EMIT')\n    if (_this4.state.activeRoom == msg.room) {\n\n      _this4.setState(function (prev, props) {\n        prev.messages.push(msg);\n        return { messages: prev.messages, shouldScroll: true };\n      });\n      //Push.create('Hello World!')\n      //spawnNotification(`~ ${msg.from} ~ wrote something`, `New msg in room ${msg.room.toUpperCase()}`)\n    } else spawnNotification('~ ' + msg.from + ' ~ wrote something', 'New msg in room ' + msg.room.toUpperCase());\n  });\n\n  window.socket.on('broadcast', function (msg) {\n    console.log('socket broadcast event', msg);\n    //return alert('BC')\n  });\n}\n\nfunction saveLastRoom(name) {\n  if (name) return localStorage.setItem('lastRoom', name);\n}\n\nfunction sendFileToServer(fileBuffer, fileName, fileType, roomName, userName) {\n\n  return new Promise(function (resolve, reject) {\n    console.log('before fetch', fileName, fileType, roomName, userName);\n    fetch('/api/uploadFile', {\n      method: 'POST',\n      headers: {\n        //\"Content-Type\": \"application/octet-stream\",\n        \"x-app-filename\": fileName,\n        \"x-app-filetype\": fileType,\n        \"x-app-roomname\": roomName,\n        \"x-app-username\": userName\n      },\n      body: fileBuffer\n    }).then(function (res) {\n      console.log(res);return res.text();\n    }).then(function (res) {\n      console.log(res);\n      resolve(res);\n    });\n  });\n}\n\nfunction registerServiceWorker() {\n  //return;\n  if ('serviceWorker' in navigator) {\n\n    navigator.serviceWorker.register('/service-worker.js') // {scope: '/somescope'}\n    .then(function (reg) {\n      //console.log('Service Worker registered', reg)\n      //reg.update();\n      window.swRegistration = reg;\n\n      reg.onupdatefound = function (x) {\n        //console.log('SW update found', x)\n      };\n    }).then(function () {\n      //console.log('Service Worker registered', window.swRegistration)\n      return window.swRegistration.pushManager.getSubscription();\n    }).then(function (subscription) {\n      //console.log('subscr', subscription)\n      window.isSubscribed = !(subscription === null);\n\n      if (window.isSubscribed) {\n        console.log('User IS subscribed.');\n        fetch('/api/subscribe', {\n          method: 'POST',\n          credentials: 'include',\n          headers: {\n            'content-type': 'application/json'\n          },\n          body: JSON.stringify(subscription)\n        });\n      } else {\n        console.log('User is NOT subscribed.');\n        subscribeUser();\n      }\n    });\n\n    navigator.serviceWorker.addEventListener('message', function (event) {\n      console.log('msg from SW 1', _typeof(event.data.msg), event.data.msg, '\\n\\n', event.data.url);\n      //navigator.serviceWorker.controller.postMessage('THIS IS CRAZY');\n      if (event.data.url !== 'https://snapdrop.glitch.me') return console.error('msg not ok from', event.data.url);\n\n      // looking for  \"userName\", \"lastRoom\"\n      var msg = JSON.parse(event.data.msg),\n          keys = msg.get;\n      keys.forEach(function (key) {\n        msg[key] = localStorage.getItem(key);\n      });\n      //if (key !== 'userName') return console.error('not msg for username', key);\n\n\n      //reply = localStorage.getItem(key)\n      //if (!reply) return console.log('no reply');\n\n      //msg[key] = reply\n      //console.log('   reply',reply, typeof reply)\n      navigator.serviceWorker.controller.postMessage(JSON.stringify(msg\n      //{[event.data.msg]: reply}\n      ));\n    });\n  }\n}\n\nfunction subscribeUser() {\n\n  var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);\n\n  window.swRegistration.pushManager.subscribe({\n    userVisibleOnly: true,\n    applicationServerKey: applicationServerKey\n  }).then(function (subscription) {\n    console.log('User is subscribed.', subscription);\n\n    //updateSubscriptionOnServer(subscription);\n\n    window.isSubscribed = true;\n\n    //updateBtn();\n  }).catch(function (err) {\n    console.log('Failed to subscribe the user: ', err);\n    //updateBtn();\n  });\n}\n\nfunction urlB64ToUint8Array(base64String) {\n  var padding = '='.repeat((4 - base64String.length % 4) % 4);\n  var base64 = (base64String + padding).replace(/\\-/g, '+').replace(/_/g, '/');\n\n  var rawData = window.atob(base64);\n  var outputArray = new Uint8Array(rawData.length);\n\n  for (var i = 0; i < rawData.length; ++i) {\n    outputArray[i] = rawData.charCodeAt(i);\n  }\n  return outputArray;\n}\n\nfunction spawnNotification() {\n  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'check the chat';\n  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'new notif';\n\n  var options = {\n    body: body,\n    icon: 'https://cdn.glitch.com/a2eec912-3cca-419e-908b-6e26f3a8dee3%2Fhand-small.png?1525434374837'\n  };\n  var n = new Notification(title, options);\n}\n\nfunction receivePostMessage(ev) {\n  // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage\n  console.error('received PostMessage');\n\n  if (!ev.origin.startsWith('https://snapdrop.glitch.me')) return console.log('msg event', ev);\n\n  console.error('msg event', ev.origin, '\\n', ev);\n}\n\n//# sourceURL=webpack:///./app/app2.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nvar _serializeJavascript = __webpack_require__(/*! serialize-javascript */ \"serialize-javascript\");\n\nvar _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar express = __webpack_require__(/*! express */ \"express\"),\n    app = express(),\n    http = __webpack_require__(/*! http */ \"http\").Server(app),\n    path = __webpack_require__(/*! path */ \"path\"),\n    fs = __webpack_require__(/*! fs */ \"fs\"),\n    bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\"),\n    session = __webpack_require__(/*! express-session */ \"express-session\"),\n    mongo = __webpack_require__(/*! mongodb */ \"mongodb\").MongoClient,\n    MongoStore = __webpack_require__(/*! connect-mongo */ \"connect-mongo\")(session),\n    io = __webpack_require__(/*! socket.io */ \"socket.io\")(http),\n    _require = __webpack_require__(/*! node-wit */ \"node-wit\"),\n    Wit = _require.Wit,\n    log = _require.log,\n    fileUpload = __webpack_require__(/*! express-fileupload */ \"express-fileupload\"),\n    React = __webpack_require__(/*! react */ \"react\"),\n    exphbs = __webpack_require__(/*! express-handlebars */ \"express-handlebars\"),\n    webpush = __webpack_require__(/*! web-push */ \"web-push\");\n\n\nvar renderToString = __webpack_require__(/*! react-dom/server */ \"react-dom/server\").renderToString;\nvar App = __webpack_require__(/*! ./src/../app/app2 */ \"./app/app2.js\");\n//_reactRouter = require('react-router'),\n//match = _reactRouter.match\n//{ match, RouterContext } = _reactRouter\n\nvar Glob_socket = void 0;\n\nvar jsonParser = bodyParser.json();\n// https://www.npmjs.com/package/body-parser#express-route-specific\n// const urlencodedParser = bodyParser.urlencoded({ extended: false })\n// app.use(bodyParser.text({ type: 'text/html' }))\n\n// stuff for push notifs\nwebpush.setVapidDetails('mailto:okram@protonmail.ch', process.env.vapidPublic, process.env.vapidPrivate);\n\napp.set('views', path.join(__dirname, 'views')); // was 'views'\napp.engine('handlebars', exphbs({ defaultLayout: 'main' }));\napp.set('view engine', 'handlebars');\n\n//app.use(bodyParser.json());\n//app.use(bodyParser.urlencoded({ extended: false }) );\napp.get('/manifest.json', function (req, res) {\n  //console.log('get mainfest ')\n  res.sendFile(__dirname + '/manifest.json');\n});\napp.get('/index.html', function (req, res) {\n  //console.log('get public/index.html');\n  res.redirect('/');\n});\napp.use('/public', express.static('public'));\napp.use(session({\n  secret: process.env.sessionSecret,\n  resave: false,\n  saveUninitialized: false,\n  store: new MongoStore({ url: process.env.mongoURL })\n}));\n\nio.use(function (socket, next) {\n  //console.log(socket.handshake.query, '\\n', socket.handshake)\n  var room = socket.handshake.query;\n  //if (isValid(token)) {\n  return next();\n  //}\n  //return next(new Error('authentication error'));\n});\n\nvar witClient = new Wit({\n  accessToken: process.env.witToken\n  //,logger: new log.Logger(log.DEBUG) // optional\n});\n\nvar checkAccess = function checkAccess(req, res, next) {\n  //console.log('check access', req.url, req.body, req.session._id)\n\n  if (req.session._id || req.url == '/api/rooms' || req.body && (req.body.room == 'pub' || req.body.room == 'bot')) {\n    req.locals = { ok: true };\n    next();\n  } else res.sendStatus(401);\n\n  /*\n  notes on req.url from SO\n      req.protocol + '://' + req.get('host') + req.originalUrl\n      or\n       req.protocol + '://' + req.headers.host + req.originalUrl \n      // I like this one as it survives from proxy server, getting the original host name\n  */\n};\n\nio.sockets.on('connection', function (socket) {\n  // https://stackoverflow.com/questions/9262811/socket-io-messaging-to-multiple-rooms?rq=1\n  // https://stackoverflow.com/questions/17476294/how-to-send-a-message-to-a-particular-client-with-socket-io?rq=1\n  // long ones\n  //       http://www.psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/\n  //       https://udidu.blogspot.co.at/2012/11/chat-evolution-nodejs-and-socketio.html\n\n  // https://github.com/jgonera/socket.io-multichat/blob/master/app.js\n\n\n  //console.log('connection', socket.client) //console.log('glob connection', Glob_socket.handshake)\n\n  console.log('connection', socket.handshake.query.room, socket.handshake.query);\n  var socRoom = socket.handshake.query.room;\n  socket.join(socRoom);\n\n  //console.log(io.sockets)\n\n  Glob_socket = socket;\n\n  Glob_socket.on('msg', function (msg) {\n\n    console.log(msg, Glob_socket.handshake.query);\n    //socket.broadcast.to(msg.room).emit(\"message to all other users in channel\");\n\n\n    //socket.emit('msg', 'test')\n\n\n    addMsgToRoom(msg).then(function (result) {\n      console.log('msg added to file');\n\n      //Glob_socket.emit('msg', result)\n      io.sockets.in(result.room).emit('msg', result);\n\n      sendPushToAllSubs(result);\n\n      // io.sockets.in('some other room').emit('hi');\n      // versus: socket.broadcast.to('a room').send('im here');\n\n      if (result.room == 'bot') {\n        var botmsg = { room: 'bot', from: \"m's agent\", text: null, timeStamp: Date.now() };\n\n        sendToWit(msg.text).then(function (res) {\n\n          botmsg.text = 'I think you are asking me about ' + res.value;\n\n          //Glob_socket.emit('msg', botmsg)\n          io.sockets.in(result.room).emit('msg', botmsg);\n          addMsgToRoom(botmsg);\n        }).catch(function (er) {\n\n          botmsg.text = \"Sorry, i'm not very smart yet\";\n\n          //Glob_socket.emit('msg', botmsg)\n          io.sockets.in(result.room).emit('msg', botmsg);\n          addMsgToRoom(botmsg);\n        });\n      }\n    });\n  });\n\n  Glob_socket.on('leave', function (room) {\n    console.log('leaving room ' + room);\n    Glob_socket.leave(room);\n  });\n\n  Glob_socket.on('disconnect', function (ev) {\n    console.log('disconnected', ev);\n  });\n});\n\nfunction sendPushToAllSubs(msg) {\n  fs.readFile('pushsubs.json', 'utf8', function (err, file) {\n    if (err) throw err;else {\n      console.log('file ok');\n      var subs = JSON.parse(file);\n\n      subs.allsubs.forEach(function (sub) {\n        console.log('--- sub', subs.allsubs.length, sub.endpoint);\n\n        webpush.sendNotification(sub, JSON.stringify(msg));\n      });\n    }\n  });\n}\n\napp.get(\"/\", function (req, res) {\n  console.log(process.cwd(), path.join(__dirname, 'app/app/index.html'));\n  //console.log('/', req.session)\n  if (!req.session._id) res.sendFile(__dirname + '/app/app/login.html'); //res.redirect('/login')\n  //res.sendFile(__dirname + '/app/login.html');\n\n  else {\n      //res.sendFile(__dirname + 'app/index.html');\n      res.sendFile(path.join(__dirname, 'app/app/index.html'));\n    }\n});\napp.get(\"/service-worker.js\", function (req, res) {\n  res.sendFile(__dirname + 'app/service-worker.js');\n});\n/*app.get(\"/upload\", (req, res) =>{\n    res.sendFile(__dirname + '/app/upload.html');\n})*/\n\napp.get(\"/bot\", function (req, res) {\n  console.log('/bot');\n  var name = [\"aaa\", \"bbb\", \"ccc\", 'marko']; //\"marko\"\n  var markup = renderToString(React.createElement(App, { data: name }));\n  console.log((0, _serializeJavascript2.default)(name));\n  // <script src=\"/public/bundle.js\" defer></script>\n  res.send('\\n      <!DOCTYPE html>\\n      <head>\\n        \\n        <script>window.__INITIAL_DATA__ = ' + (0, _serializeJavascript2.default)(name) + '</script>\\n      </head>\\n      <body>\\n        <h2>bot</h2>\\n        <div id=\"app\">' + markup + '</div>\\n      </body>');\n  //res.render('layouts/main.handlebars',{content: 'this is server test content', data:[1,2,3]})\n  /*res.render('layouts/userContent.handlebars', {\n        tags:tags \n  })*/\n  //res.end('in progress')\n});\n\napp.get('/login', function (req, res) {\n  if (!req.session._id) res.sendFile(__dirname + '/app/login.html');else res.redirect('/');\n});\napp.post('/api/login', jsonParser, function (req, res) {\n\n  console.log('loggin in', req.body);\n\n  //console.log('/login \\n', req.session)\n  if (!req.body.userName || req.body.pass !== process.env.friendsPass) {\n    console.error('not authorized', req.body.userName);\n    return res.sendStatus(401);\n  }\n\n  findUser(req.body.userName).then(function (user) {\n    console.log('found user', user);\n    req.session._id = user._id;\n    req.session.userName = user.userName;\n    //req.session.canAccess = user.canAccess\n    //console.log(req.session)\n    //res.redirect('/')\n\n    res.sendStatus(200);\n\n    //res.sendFile(__dirname + '/app/index.html');\n  }).catch(function (status) {\n    return res.sendStatus(status);\n  });\n});\n\napp.post('/api/subscribe', checkAccess, jsonParser, function (req, res) {\n  console.log('subscribe', req.session, req.body.endpoint);\n\n  res.sendStatus(200);\n\n  // add new sub to file\n  fs.readFile('pushsubs.json', 'utf8', function (err, file) {\n    if (err) throw err;else {\n      var subs = JSON.parse(file);\n\n      if (subs.allsubs.find(function (sub) {\n        return sub.endpoint == req.body.endpoint;\n      }) !== undefined) return console.log('sub already there');\n\n      console.log('   this sub not there yet');\n      subs.allsubs.push(req.body);\n\n      fs.writeFile('pushsubs.json', JSON.stringify(subs), function (err) {\n        if (err) throw err;else console.log('pushsubs updated');\n      });\n    }\n  });\n\n  /*const payload = JSON.stringify({title: \"hi from myChat\", whatever: 11})\n  \n  webpush.sendNotification(\n      req.body, // subscription,\n      payload\n  )*/\n});\n\napp.get('/pub', function (req, res) {\n  res.sendFile(__dirname + '/app/index.html');\n  //res.redirect('/')\n});\n\napp.get('/api/rooms', checkAccess, function (req, res) {\n  //console.log('get rooms session',req.session._id)\n  fs.readdir('rooms', function (er, files) {\n\n    var jsons = files.filter(function (name) {\n      return name.match(/.json$/);\n    });\n    //console.log(jsons)  \n    res.json({ ok: true, rooms: jsons });\n  });\n});\napp.post('/api/roomContent', jsonParser, checkAccess, allowRoomAccess, function (req, res) {\n\n  //console.log('req body', req.session._id, req.body, req.body.room)\n  //console.log('', req.locals.ok)\n\n  //if (!req.locals.ok) res.sendStatus(401)\n\n\n  fs.readFile('rooms/' + req.body.room + '.json', function (err, data) {\n    if (err) {\n      //res.sendStatus(500)\n      res.end();\n      throw err;\n    } else res.end(data);\n  });\n});\napp.get(/sentfiles\\/.*/, function (req, res) {\n  res.sendFile(__dirname + req.url);\n});\n\n//app.use(fileUpload())\napp.post('/api/uploadFile', checkAccess, fileUpload(), function (req, response) {\n\n  console.log(req.headers['x-app-roomname'], req.headers['x-app-username'], req.files);\n\n  if (req.files.uploadFile.data.length > 5 * 1000 * 1000) return response.sendStatus(413); // code = payload too large\n\n  //console.log(req.headers)\n  //console.log('file upload', req.headers['x-app-filename'], req.headers['x-app-filetype'])  \n\n\n  var room = req.headers['x-app-roomname'],\n      user = req.headers['x-app-username'],\n      fileName = encodeURI(req.headers['x-app-filename'] || req.files.uploadFile.name);\n\n  if (!room || !user || !fileName) return console.error('file info missing', room, user, fileName);\n\n  /*  didnt work\n        let fileData = [];\n        req.on('data', chunk=>fileData+=chunk)\n        req.on('end', ()=>{*/\n\n  fs.open('./sentfiles/' + room + '/', 'r', function (er, fd) {\n    if (er) {\n      console.error(er, er.errno);\n      if (er.code == 'ENOENT') {\n        console.log('----missing directory');\n        fs.mkdirSync('./sentfiles/' + room);\n      } else return response.sendStatus(500);\n    }\n\n    req.files.uploadFile.mv('./sentfiles/' + room + '/' + fileName, function (err) {\n      if (err) return response.status(500).send(err);\n\n      var fp2 = 'sentfiles/' + room + '/' + fileName;\n      var msg = { room: room, from: user, text: 'file: https://snapdrop.glitch.me/' + fp2, timeStamp: Date.now() };\n\n      addMsgToRoom(msg).then(function (res) {\n        response.sendStatus(200);\n        //response.redirect('/')\n        Glob_socket.emit('msg', res);\n      });\n    });\n\n    //const filePath = './sentfiles/' + room + '/' + fileName\n    //const writable = fs.createWriteStream(filePath)\n    //req.pipe(writable)\n\n  });\n});\n\n//checkFiles()\nfunction checkFiles() {\n  fs.readdir('sentfiles', function (er, files) {\n    if (er) throw er;\n    console.log('sentfiles/', files);\n  });\n}\n\napp.get('/logout', function (req, res) {\n  req.session.destroy(function () {\n    res.redirect('/login');\n    /*res.json({\n      success: true,\n      message: \"Logged out.\"\n    })*/\n  });\n});\n\nhttp.listen(3000, function () {\n  return console.log('- - - - on port 3000 - - - -');\n});\n\nvar validMsg = function validMsg(msg) {\n\n  if (msg.room && msg.from && msg.text && msg.timeStamp) return true;else return false;\n};\n\nfunction addMsgToRoom(msg) {\n  return new Promise(function (resolve, reject) {\n    var room = msg.room;\n    if (validMsg(msg) == true) fs.readFile('rooms/' + room + '.json', 'utf8', function (err, file) {\n      if (err) throw err;else {\n        var fileContent = JSON.parse(file);\n        if (!fileContent.roomStarted) fileContent.roomStarted = Date.now();\n        delete msg.room;\n\n        fileContent.chat.push(msg);\n\n        fs.writeFile('rooms/' + room + '.json', JSON.stringify(fileContent), function (err) {\n          if (err) throw err;\n          msg.room = room;\n\n          //socket.emit('msg', msg);\n          resolve(msg);\n        });\n      }\n    });else console.error('not valid msg');\n  });\n}\n\nfunction findUser(userName) {\n  return new Promise(function (resolve, reject) {\n    mongo.connect(process.env.mongoURL, function (err, client) {\n      if (err) reject(err);else client.db('chat-sessions').collection('users').findOne({ userName: userName }, function (er, doc) {\n        if (er) return reject(500);else if (!doc) {\n          console.error('! no doc', doc);\n          reject(401);\n          return;\n        }\n\n        //console.log('user')\n        //console.log(doc, doc._id)\n        resolve(doc);\n      });\n    });\n  });\n}\nfunction allowRoomAccess(req, res, next) {\n\n  if (req.body.room == 'pub' || req.body.room == 'bot') return next();\n\n  findUser(req.session.userName).then(function (user) {\n\n    //console.log('--- user')\n    //console.log(user)\n\n    var allowed = user.canAccess == 'all' || user.canAccess.includes(req.body.room);\n    //console.log('allowed?', allowed)\n    if (!allowed) res.sendStatus(401);else next();\n  }).catch(function (er) {\n    if (typeof er == 'number') res.sendStatus(er);else console.error(er);\n  });\n}\n\n//readfile('sentfiles/__ test vocab.txt')\nfunction readfile(path) {\n  fs.readFile(path, 'utf8', function (er, data) {\n    console.log('file data', data);\n  });\n}\n//delFile('sentfiles/undefined')\nfunction delFile(path) {\n  //fs.readdir('rooms', (er, files)=>{\n\n  //const jsons = files.filter(name =>name.match(/.json$/))\n  //console.log(jsons)  \n  fs.unlink(path, function (er) {\n    console.log('error?', er);\n\n    fs.readdir('sentfiles', function (er, files) {\n\n      //const jsons = files.filter(name =>name.match(/.json$/))\n      console.log(files);\n    });\n  });\n  //})\n}\n\nfunction sendToWit(text) {\n  return new Promise(function (resolve, reject) {\n\n    witClient.message(text, {}).then(function (data) {\n      console.log('Wit: \\n', data);\n\n      if (!data.entities.intent) return reject('no intent');\n\n      console.log(data.entities.intent); // .value\n      resolve(data.entities.intent[0]);\n    }).catch(console.error);\n  });\n} // https://github.com/wit-ai/node-wit\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "connect-mongo":
/*!********************************!*\
  !*** external "connect-mongo" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-mongo\");\n\n//# sourceURL=webpack:///external_%22connect-mongo%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-fileupload":
/*!*************************************!*\
  !*** external "express-fileupload" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-fileupload\");\n\n//# sourceURL=webpack:///external_%22express-fileupload%22?");

/***/ }),

/***/ "express-handlebars":
/*!*************************************!*\
  !*** external "express-handlebars" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-handlebars\");\n\n//# sourceURL=webpack:///external_%22express-handlebars%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");\n\n//# sourceURL=webpack:///external_%22mongodb%22?");

/***/ }),

/***/ "node-wit":
/*!***************************!*\
  !*** external "node-wit" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-wit\");\n\n//# sourceURL=webpack:///external_%22node-wit%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");\n\n//# sourceURL=webpack:///external_%22serialize-javascript%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ }),

/***/ "web-push":
/*!***************************!*\
  !*** external "web-push" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"web-push\");\n\n//# sourceURL=webpack:///external_%22web-push%22?");

/***/ })

/******/ });