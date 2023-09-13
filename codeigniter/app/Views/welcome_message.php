<!DOCTYPE html>
<html lang="en">

<head>
  <title>Welcome to CodeIgniter 4!</title>
  <meta name="description" content="The small framework with powerful features">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="shortcut icon" type="image/png" href="/favicon.ico">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    
  <!-- STYLES -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
    integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
    crossorigin="anonymous"></script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js"
    integrity="sha384-Rx+T1VzGupg4BHQYs2gCW9It+akI2MM/mndMCy36UVfodzcJcF0GGLxZIzObiEfa"
    crossorigin="anonymous"></script>



</head>

<body>

  <div class="container px-4 text-center mt-4">
    <div class="row gx-5 ">
      <div class="card" style="width: 12rem;">
      <div class="col">
        <div class="card-body">
          <h5 class="card-title">Button Initalize</h5>
          <p class="card-text">
            <button type="button" id="testfilemanager" thumb="test" target="test3" data-filemanager-toggle="image"
              class="btn btn-primary">test buttn</button>
          </p>
        </div>
      </div>
</div>


<div class="col">
      <div class="card image" style="width: 12rem;">
        <img src="<?=$thumb;?>" alt="" title="" id="thumb-image"
          class="card-img-top" />
        <input type="hidden" name="image" value="{{ image }}" id="input-image" />
        <div class="card-body">
          <button type="button" data-filemanager-toggle="image" class="btn btn-primary btn-sm btn-block"><i
              class="fa-solid fa-pencil"></i> Edit</button>
          <button type="button" data-filemanager-toggle="clear" class="btn btn-warning btn-sm btn-block"><i
              class="fa-regular fa-trash-can"></i> Clear</button>
        </div>
      </div>
    </div>
</div>

  </div>



  <script>

    // Image Manager
    $(document).on('click', '[data-filemanager-toggle=\'image\']', function (e) {
      var element = this;

      $('#filemanagerModal').remove();

      $.ajax({
        url: 'api/filemanager?usertoken=token',
        dataType: 'html',
        success: function (html) {
          $('body').append(html);

          var element = document.querySelector('#filemanagerModal');

          var modal = new bootstrap.Modal(element);

          modal.show();
        }
      });
    });
  </script>

  <!-- -->

</body>

</html>