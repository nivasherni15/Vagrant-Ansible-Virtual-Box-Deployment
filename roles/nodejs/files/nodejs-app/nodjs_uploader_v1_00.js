var http = require('http');
var formidable = require('formidable');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded to img-panda');
      res.end();
    });
  }
  else if (req.url == '/filedownload'){
  	   var form = new formidable.IncomingForm();
           form.parse(req, function (err, fields, files) {
             res.write('File downloaded from img-panda');
             res.end();
           });

  } 
  else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('File uplpoad');
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    //return res.end();

    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('File Download');
    res.write('<form action="filedownload" method="get" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();

  }
}).listen(8080); 
