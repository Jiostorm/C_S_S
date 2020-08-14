<div id="add-section-modal" class="modal fade hide" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content modal-color">

      <div class="modal-header">
        <h5 class="modal-title">Add Section</h5>
        <button class="close text-light" data-dismiss="modal" aria-label="Close" type="button" name="button"><span aria-hidden="true">&times;</span></button>
      </div>

      <div class="modal-body">
        <form id="section-form" class="" method="GET" autocomplete="off">
          <div class="container-fluid">
            <p><input class="form-control text-capitalize section" type="text" name="txtsectiongrade" id="txtsectiongrade" placeholder="Enter A Valid Grade Level: [e.g 12]" title="Enter A Valid Grade Level" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"></p>
            <p><input class="form-control text-capitalize section" type="text" name="txtsectionname" id="txtsectionname" placeholder="Enter A Valid Section: [e.g PROGRAMMING]" title="Enter A Valid Section"></p>
            <p><input class="form-control text-capitalize section" type="text" name="txtsectionnumber" id="txtsectionnumber" placeholder="Enter A Valid Section Number: [e.g 1]" title="Enter A Valid Section Number" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"></p>
            <p>
              <input class="form-control text-capitalize" type="text" id="txtadviser" placeholder="Enter A Valid Name Of An Adviser:" title="Enter A Valid Name Of An Adviser" list="list-adviser">
              <datalist id="list-adviser"></datalist>
            </p>
            <p>
              <input class="form-control text-capitalize" type="text" id="txtspecial" placeholder="Enter A Valid Specialization:" title="Enter A Valid Specialization" list="list-special">
              <datalist id="list-special"></datalist>
            </p>
            <p>
              <input class="form-control text-capitalize" type="text" id="txtroom" placeholder="Enter A Valid Room:" title="Enter A Valid Room" list="list-room">
              <datalist id="list-room"></datalist>
            </p>
            <button id="btnsubmit-section" class="form-control btn btn-outline-light btn-sm" type="submit" name="btnsubmit-section" value="submit"><i class="fa fa-save"></i> Save Information</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</div>

<div id="edit-student-modal" class="modal fade hide" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">

    <div class="modal-content modal-color">

      <div class="modal-header">
        <h5 class="modal-title"> Update of Student Information </h5>
        <button class="close text-light" data-dismiss="modal" aria-label="Close" type="button" name="button"><span aria-hidden="true">&times;</span></button>
      </div>

      <div class="modal-body">
        <form id="student-form" class="" method="GET" autocomplete="off">
          <div class="container-fluid">
            <p><input class="form-control text-capitalize" type="text" id="txtstudentlrn" readonly></p>
            <p><input class="form-control text-capitalize" type="text" id="txtstudentfn" placeholder="Enter A Valid First Name" title="Enter A Valid First Name"></p>
            <p><input class="form-control text-capitalize" type="text" id="txtstudentln" placeholder="Enter A Valid Last Name" title="Enter A Valid Last Name"></p>
            <p><input class="form-control text-capitalize" type="text" id="txtstudentmi" placeholder="Enter A Valid Middle Initial" title="Enter A Valid Middle Initial"></p>
            <p><input class="form-control text-capitalize" type="text" id="txtstudentage" placeholder="Enter A Valid Age" title="Enter A Valid Age" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"></p>
            <p>
              <select  class="custom-select" id="cbostudentgender" title="Select A Valid Gender">
                <option value="" selected disabled hidden> Select A Gender: </option>
                <option value="Male"> Male </option>
                <option value="Female"> Female </option>
              </select>
            </p>
            <p><input class="form-control text-capitalize" type="text" id="txtstudentbarangay" placeholder="Enter A Valid Barangay" title="Enter A Valid Barangay"></p>
            <p><input class="form-control text-capitalize" type="text" id="txtstudentmunicipality" placeholder="Enter A Valid Municipality" title="Enter A Valid Municipality"></p>
            <p><input class="form-control text-capitalize" type="text" id="txtstudentprovince" placeholder="Enter A Valid Province" title="Enter A Valid Province"></p>

            <button id="btnsave-student" class="form-control btn btn-outline-light btn-sm" type="submit"><i class="fa fa-save"></i> Update Information</button>
          </div>
        </form>
      </div>

    </div>

  </div>
</div>

<div id="transfer-student-modal" class="modal fade hide" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content modal-color">

      <div class="modal-header">
        <h5 class="modal-title">Choose An Available Section</h5>
        <button class="close text-light" data-dismiss="modal" aria-label="Close" type="button" name="button"><span aria-hidden="true">&times;</span></button>
      </div>

      <div class="modal-body">
        <div class="container-fluid">
          <p>
            <!-- <select class="custom-select" id="cbonewsection" title="Select New Section">
            </select> -->
            <input class="form-control text-capitalize" type="text" id="txtnewsection" placeholder="Select A Valid New Section:" title="Select A Valid New Section" list="list-newsection">
            <datalist id="list-newsection"></datalist>
          </p>
          <button id="btntransfer" class="form-control btn btn-outline-light btn-sm" type="button"><i class="fa fa-exchange-alt"></i> Transfer Now!</button>
        </div>
      </div>

    </div>
  </div>
</div>
