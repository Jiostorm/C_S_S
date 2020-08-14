<nav class="navbar navbar-expand-lg navbar-dark sticky-top navbar-style">

  <span class="fa fa-stack fa-2x">
    <i class="fas fa-circle fa-stack-2x"></i>
    <i class="fa fa-desktop fa-stack-1x fa-inverse"></i>
  </span>
  <a class="navbar-brand"> <strong> CSNHS SHS Sectioning System </strong> </a>
  <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbar-main">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div id="navbar-main" class="collapse navbar-collapse">

    <div id="user-navbar">
      <ul class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="../php/"> Home </a>
        </li>
        <li class="breadcrumb-item">
          <a href="dashboard.php"> Dashboard </a>
        </li>
        <li class="breadcrumb-item">
          <a href="student.php"> Students </a>
        </li>
        <?php if(isset($_SESSION['username'])){ ?>
          <?php if($_SESSION['type'] == "Admin"){ ?>
          <li class="breadcrumb-item">
            <a href="section.php"> Sections </a>
          </li>
          <li class="breadcrumb-item">
            <a href="teacher.php"> Teachers </a>
          </li>
          <li class="breadcrumb-item">
            <a href="specialization.php"> Specializations </a>
          </li>
          <li class="breadcrumb-item">
            <a href="room.php"> Rooms </a>
          </li>
          <?php } ?>
        <?php } ?>
      </ul>
    </div>

    <div id="control-navbar" class="ml-auto mr-5">
    <?php if(!isset($_SESSION['username'])){ ?>
      <form id="login-form" class="form-inline" method="post">
        <input id="inpuser" class="form-control m-2" type="text" name="inpuser" value="" placeholder="Username:" title="Enter A Username:">
        <input id="inppass" class="form-control" type="password" name="inppass" value="" placeholder="Password:" title="Enter A Password:">
        <button id="btnlogin" class="btn btn-outline-light btn-md m-2" type="submit" name="btnlogin" value="login"> Login </button>
      </form>
    <?php } else { ?>
      <div class="dropdown">
        <button id="drop-log" class="btn btn-outline-light btn-md dropdown-toggle" type="button" data-toggle="dropdown"> <?php echo $_SESSION['type']?>
          User: <?php echo $_SESSION['username']; ?> </button>

        <div class="dropdown-menu" aria-labelledby="drop-log">
          <form class="" action="modules/logout.php" method="post">
            <?php if($_SESSION['type'] == "Admin"){ ?>
            <a class="no-deco" href="signup.php?current=signup"> <button id="btnsignup" class="btn btn-outline-light btn-md dropdown-item" type="button" value="signup"> Add Account </button> </a>
            <?php } ?>
            <button class="btn btn-outline-light btn-md dropdown-item" type="submit"> Logout </button>
          </form>
        </div>
      </div>
      <?php } ?>

      <?php if(isset($_GET['login'])){ if($_GET['login'] == "failed") { ?>
        <div class="mt-2 text-center">
          <p class="bg-danger"> Username and Password did not matched! </p>
        </div>
      <?php } } ?>
    </div>
  </div>
</nav>
