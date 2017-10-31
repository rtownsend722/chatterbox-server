// Methods for stubbing HTTP requests and responses
module.exports = {

  response: function() {
    this._ended = false;
    this._responseCode = null;
    this._headers = null;
    this._data = null;

    this.writeHead = function(responseCode, headers) {
      this._responseCode = responseCode;
      this._headers = headers;
    }.bind(this);

    this.end = function(data) {
      console.log('CALLED THEIR RESPONSE.END', data);
      this._ended = true;
      this._data = data;
    }.bind(this);
  },

  request: function(url, method, postdata) {
    this.url = url;
    this.method = method;
    this._postData = postdata;
    this.setEncoding = function() { /* noop */ };

//  request.on('data', function(chunk) {
//     data.push(chunk);
//   })

  // var data = [];
  // request.on('data', function(chunk) {
  //   data.push(chunk);
  // })
  // request.on('end', function() {
  //   data = Buffer.concat(data).toString();
  //   data = JSON.parse(data);
  //   //push the data into the storage array
  //   storage.push(data);
  // });

    this.addListener = this.on = function(type, callback) {
      console.log('this is the callback', callback);
      if (type === 'data') {
        callback(new Buffer(new Uint8Array(1)));
      }

      if (type === 'end') {
        callback();
      }
      return this;
    }.bind(this);
  }

};
