// Publish Event API
// -----------------
// Allows you to publish events to browser clients. All this code is closely related to the 'event' websocket responder

var isInternal,
  __slice = [].slice;

module.exports = function() {
  return {
    transport: require('./transport')(),
    api: function(transport) {
      var methods;
      methods = {
        logging: false,
        all: function() {
          var event, obj, params;
          event = arguments[0], params = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          obj = {
            t: 'all',
            e: event,
            p: params
          };
          transport.send(obj);
          if (!isInternal(event)) {
            return methods.logging ? console.log('➙'.cyan, 'event:all'.grey, event) : undefined;
          }
        },
        socketId: function() {
          var event, obj, params, socketId;
          socketId = arguments[0], event = arguments[1], params = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
          obj = {
            t: 'socketId',
            socketId: socketId,
            e: event,
            p: params
          };
          transport.send(obj);
          return methods.logging ? console.log('➙'.cyan, ("event:socketId:" + socketId).grey, event) : undefined;
        },
        users: function() {
          var event, obj, params, users;
          users = arguments[0], event = arguments[1], params = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
          users = users instanceof Array && users || [users];
          obj = {
            t: 'user',
            users: users,
            e: event,
            p: params
          };
          transport.send(obj);
          return methods.logging ? console.log('➙'.cyan, ("event:users:[" + (users.join(',')) + "]").grey, event) : undefined;
        },
        channels: function() {
          var channels, event, obj, params;
          channels = arguments[0], event = arguments[1], params = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
          channels = channels instanceof Array && channels || [channels];
          obj = {
            t: 'channel',
            channels: channels,
            e: event,
            p: params
          };
          transport.send(obj);
          return methods.logging ? console.log('➙'.cyan, ("event:channels:[" + (channels.join(',')) + "]").grey, event) : undefined;
        }
      };

      // Alias 0.2 command      
      methods.broadcast = methods.all;

      // Alias singles to plurals      
      methods.channel = methods.channels;
      methods.user = methods.users;

      // Return all methods      
      return methods;
    }
  };
};

// Private

isInternal = function(event) {
  return event.substr(0, 5) === '__ss:';
};
