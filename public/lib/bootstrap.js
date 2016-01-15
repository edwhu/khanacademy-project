window.onload = function() {
  window.editor = CodeMirror.fromTextArea(document.getElementById('hola'), {
    lineNumbers: true,
    firstLineNumber: 1,
    theme: "monokai",
    mode: 'javascript'

  });
  window.editor.setValue('')
  $(document).ready(function() {
    $('#but').on('click', function() {
      html = window.editor.getValue();
      //here we send it to ther server
      $.ajax({
        url: '/api',
        type: 'POST',
        data: {
          data: html
        },
        success: function(data) {
          document.getElementById('whitelist').innerHTML = data.whitelist;
          document.getElementById('blacklist').innerHTML = data.blacklist;
          document.getElementById('structure').innerHTML = data.structure;
          document.getElementById('tree').innerHTML = JSON.stringify(data.tree, null, '\t');
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, err.toString());
        }.bind(this)
      });
    });
  });
}
