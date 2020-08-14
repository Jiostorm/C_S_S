$(document).ready(function() {
  const customSwal = swal.mixin({
    confirmButtonClass: "btn btn-outline-success",
    cancelButtonClass: "btn btn-outline-danger ml-2",
    showCloseButton: true,
    showConfirmButton: true,
    showCancelButton: true,
    buttonsStyling: false,
    animation: false,
    focusConfirm: false,
  });

  hideNavItems();
  formatFooter();

  if (!window.location.href.includes(".php")) {
    window.location.href += "index.php?current=login";
  }
  if (window.location.href.includes("signup.php")) {
    $('#control-navbar').empty();
    let back = "<button id='btnbackhome' class='btn btn-outline-light btn-md' type='button'> Back </button>";
    $('#control-navbar').append(back);
  }

  function hideNavItems() {
    let url = window.location.href,
      currentFile = url.substring(url.lastIndexOf("/") + 1);
    $('#user-navbar').css('visibility', currentFile == "" || currentFile.includes("index") || currentFile.includes("signup") ? 'hidden' : 'visible');
    $('#login-form').css('display', currentFile.includes("signup") ? 'none' : 'block');
  }

  function formatFooter() {
    if ($('.footer').length == 0) {
      return;
    }
    var docHeight = $(window).height();
    var footerHeight = $('.footer').outerHeight();
    var footerTop = $('.footer').position().top + footerHeight;

    if (footerTop < docHeight) {
      $('.footer').css('margin-top', (docHeight - footerTop) + 'px');
    }
  }

  function VerifyInput($element, datavalue) {
    if ($element.val() == "" || $element.val() == null || datavalue != "~") {
      $element.tooltip('show');
      $element.tooltip('enable');

      setTimeout(function() {
        $element.tooltip('hide');
        $element.tooltip('disable');
      }, 5000);
      $element.focus();
      return false;
    } else {
      return true;
    }
  }

  function VerfiyPrimaryKey(key) {
    let query = "SELECT * FROM tbsignup WHERE Username = '" + key + "'"

    let i = RequestData(query, "COUNT");
    if (i == 0) {
      return true;
    } else {
      return false;
    }
  }

  function RequestData(query, method) {
    let dataReturned;

    $.ajax({
      url: "../php/modules/handler.php",
      type: "POST",
      async: false,
      data: {
        approval: "approved",
        query: query,
        method: method
      },
      dataType: "JSON",
      success: function(dataReceived) {
        dataReturned = dataReceived;
      }
    })
    return dataReturned;
  }
  // =============================================================================================================================================================

  $(document).on('submit', '#login-form', function(event) {
    event.preventDefault();

    if (!VerifyInput($('#inpuser'), '~') || !VerifyInput($('#inppass'), '~')) {
      return;
    }

    $.ajax({
      url: "../php/modules/login.php",
      type: "POST",
      async: false,
      data: {
        login: $('#btnlogin').val(),
        user: $('#inpuser').val(),
        pass: $('#inppass').val()
      },
      success: function(message) {
        window.location.href = message;
      }
    })
  })

  $(document).on("submit", "#signup-form", function(event) {
    event.preventDefault();

    customSwal({
      type: "question",
      title: "<strong>Server Says: </strong>",
      html: "<strong>Do you want to register this Account Information?</strong>",
      confirmButtonText: "Yes! Register It!",
      cancelButtonText: "No! Don't!!",
      customClass: "animated bounce",
      background: "#ffcce6"
    }).then((result) => {
      if (result.value) {
        if (!VerifyInput($('#inpuser-signup'), '~') || !VerifyInput($('#inpemail-signup'), '~') || !VerifyInput($('#inpfname-signup'), '~') || !VerifyInput($('#inplname-signup'), '~') ||
          !VerifyInput($('#inppass-signup'), '~') || !VerifyInput($('#cbousertype'), '~')) {
          swal({
            type: "error",
            title: "<strong>Server Says: </strong>",
            html: "<strong>Incomplete Information for the Account!</strong>",
            showConfirmButton: false,
            timer: 2000,
          });

          VerifyInput($('#inpuser-signup'), '~');
          VerifyInput($('#inpemail-signup'), '~');
          VerifyInput($('#inpfname-signup'), '~');
          VerifyInput($('#inplname-signup'), '~');
          VerifyInput($('#inppass-signup'), '~');
          VerifyInput($('#cbousertype'), '~');
          return;
        }

        $('#inpuser-signup').css('background-color', 'white');

        if (!VerfiyPrimaryKey($('#inpuser-signup').val())) {
          $('#inpuser-signup').css('background-color', 'red');
          swal({
            type: "error",
            title: "<strong>Server Says: </strong>",
            html: "<strong>This Username Exists in the System!</strong>",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }

        if ($('#inppass-signup').val() != $('#inprepass-signup').val()) {
          swal({
            type: "error",
            title: "<strong>Server Says: </strong>",
            html: "<strong>Incomplete Information for the Account!</strong>",
            showConfirmButton: false,
            timer: 2000,
          });

          $('#inprepass-signup').tooltip('show');
          $('#inprepass-signup').tooltip('enable');

          setTimeout(function() {
            $('#inprepass-signup').tooltip('hide');
            $('#inprepass-signup').tooltip('disable');
          }, 5000);
          $('#inprepass-signup').focus();
          return;
        }

        $.ajax({
          url: "../php/modules/login.php",
          type: "POST",
          async: false,
          data: {
            signup: $('#btnsignup-user').val(),
            user: $('#inpuser-signup').val(),
            email: $('#inpemail-signup').val(),
            fname: $('#inpfname-signup').val(),
            lname: $('#inplname-signup').val(),
            pass: $('#inppass-signup').val(),
            type: $('#cbousertype').val()
          },
          success: function(message) {
            if (message.includes("email=invalid")) {
              swal({
                type: "error",
                title: "<strong>Server Says: </strong>",
                html: "<strong>Invalid Email!</strong>",
                showConfirmButton: false,
                timer: 2000,
              });
              return;
            }

            swal({
              type: "success",
              title: "<strong>Server Says: </strong>",
              html: "<strong>The Account Information has been registered!</strong>",
              showConfirmButton: false,
              timer: 2500
            }).then(function() {
              window.location.href = message;
            })
          }
        })
      }
    });
  })

  $(document).on('click', '#btnbackhome', function() {
    window.location.href = "../php/";
  })
})
