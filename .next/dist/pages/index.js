'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importamos el client de socket.io
var HomePage = function (_Component) {
  (0, _inherits3.default)(HomePage, _Component);

  function HomePage() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, HomePage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HomePage.__proto__ || (0, _getPrototypeOf2.default)(HomePage)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      field: '',
      messages: _this.props.messages
    }, _this.handleMessage = function (message) {
      _this.setState(function (state) {
        return { messages: state.messages.concat(message) };
      });
    }, _this.handleChange = function (event) {
      _this.setState({ field: event.target.value });
    }, _this.handleSubmit = function (event) {
      event.preventDefault();

      // creamos un objeto message con la fecha actual como ID y el valor del input
      var message = {
        id: new Date().getTime(),
        value: _this.state.field
      };

      // enviamos el objeto por socket al servidor
      _this.socket.emit('message', message);

      // lo agregamos a nuestro estado para que se muestre en pantalla y limpiamos el input
      _this.setState(function (state) {
        return {
          field: '',
          messages: state.messages.concat(message)
        };
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(HomePage, [{
    key: 'componentDidMount',

    // una vez que el componente se montó en el navegador nos conectamos al servidor de sockets
    // y empezamos a recibimos el evento `message` del servidor
    value: function componentDidMount() {
      this.socket = (0, _socket2.default)('http://localhost:3000/');
      this.socket.on('message', this.handleMessage);
    }

    // cuando el componente se va a desmontar es importante que dejemos de escuchar el evento
    // y que cerremos la conexión por sockets, esto es para evitar problemas de que lleguen mensajes

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.socket.off('message', this.handleMessage);
      this.socket.close();
    }

    // cuando llega un mensaje del servidor lo agregamos al estado de nuestra página


    // cuando el valor del input cambia actualizamos el estado de nuestra página


    // cuando se envía el formulario enviamos el mensaje al servidor

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('main', null, _react2.default.createElement('div', null, _react2.default.createElement('ul', null, this.state.messages.map(function (message) {
        return _react2.default.createElement('li', { key: message.id }, message.value);
      })), _react2.default.createElement('form', { onSubmit: this.handleSubmit }, _react2.default.createElement('input', {
        onChange: this.handleChange,
        type: 'text',
        placeholder: 'Hello, world!',
        value: this.state.field
      }), _react2.default.createElement('button', null, 'Enviar'))));
    }
  }], [{
    key: 'getInitialProps',

    // acá pedimos los datos de los mensajes viejos, esto se ejecuta tanto en el cliente como en el servidor
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
        var req = _ref2.req;
        var response, messages;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _isomorphicFetch2.default)('http://localhost:3000/messages');

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();

              case 5:
                messages = _context.sent;
                return _context.abrupt('return', { messages: messages });

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref3.apply(this, arguments);
      }

      return getInitialProps;
    }()

    // en el estado guardamos un string vacío (el campo del formulario) y los mensajes que recibimos del API

  }]);

  return HomePage;
}(_react.Component);
// importamos fetch

// importamos Component de React


HomePage.defaultProps = {
  messages: []
};

exports.default = HomePage;