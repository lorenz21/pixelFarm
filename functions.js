//Pulls markets from DB
$(document).ready(function() {
var $markets = $('#markets');
var query = new CB.CloudQuery('Market');
query.setLimit(10);
query.equalTo('island', 'Oahu');
query.find({
    success : function(list){
        for(x = 0; x < list.length; x++){
          //console.log(list[x].document);
          $markets.append('<li><a href="#" onclick="marketSetup( ' + '\''+ list[x].document._id + '\'' + ')">'+'<h2>'
          + list[x].document.name +'</h2>'+ '<p>' +'Island: '+ list[x].document.island
          + '<br>Time: ' + list[x].document.time
          +'<br>Phone: '+ list[x].document.phone +'</p></a></li>');
          $('#markets').listview().listview('refresh');
            //console.log(list[0].document.name);
        }//list is an array of CloudObjects

    },error : function(error){
        //error
    }
});
});
//Market setup
function marketSetup(marketID){
$.mobile.navigate("#market", {transition: "slide", info: "info about the #bar hash"});
  var marketID = marketID;
  //$( "#market-title" ).append(marketID);
  //alert(marketID);
  var query = new CB.CloudQuery('Market');
  query.setLimit(1);
  query.equalTo('id', marketID );
  query.find({
      success : function(list){
          for(x = 0; x < list.length; x++){
            //console.log(list[x].document);
            $( "#market-title" ).html(list[x].document.name);
            $( "#info" ).html(list[x].document.island +'<br>'+ list[x].document.description +'<br>'+ list[x].document.email +'<br>'+ list[x].document.phone);
            var locations = [
              ['Ewa Beach', list[x].document.latitude, list[x].document.longitude]
            ];
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 11,
              center: new google.maps.LatLng(list[x].document.latitude, list[x].document.longitude),
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var infowindow = new google.maps.InfoWindow();
            var marker, i;
            for (i = 0; i < locations.length; i++) {
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(list[x].document.latitude, list[x].document.longitude),
                map: map,
                animation: google.maps.Animation.BOUNCE
              });
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  infowindow.setContent(locations[i][1]);
                  infowindow.open(map, marker);
                  $('#map').listview().listview('refresh');
                }
              })(marker, i));
            }
              //console.log(list[0].document.name);
          }//list is an array of CloudObjects

      },error : function(error){
          //error
      }
  });
}
//Vendor setup
function vendorSetup(vendorID){
$.mobile.navigate("#vendor", {transition: "slide", info: "info about the #bar hash"});
  var vendorID = vendorID;
  //$( "#market-title" ).append(marketID);
  //alert(marketID);
  var query = new CB.CloudQuery('Vendor');
  query.setLimit(1);
  query.equalTo('id', vendorID );
  query.find({
      success : function(list){
          for(x = 0; x < list.length; x++){
            //console.log(list[x].document);
            $( "#vendor-name" ).html(list[x].document.name);
            $( "#vendor-data" ).html(list[x].document.description);
            $( "#annoncements" ).html(list[x].document.annoncements);
            var locations = [
              ['Ewa Beach', list[x].document.latitude, list[x].document.longitude]
            ];
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 11,
              center: new google.maps.LatLng(list[x].document.latitude, list[x].document.longitude),
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var infowindow = new google.maps.InfoWindow();
            var marker, i;
            for (i = 0; i < locations.length; i++) {
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(list[x].document.latitude, list[x].document.longitude),
                map: map,
                animation: google.maps.Animation.BOUNCE
              });
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  infowindow.setContent(locations[i][1]);
                  infowindow.open(map, marker);
                  $('#map').listview().listview('refresh');
                }
              })(marker, i));
            }
              //console.log(list[0].document.name);
          }//list is an array of CloudObjects

      },error : function(error){
          //error
      }
  });
}
//Get vendors from DB
$(document).ready(function() {
var $vendors = $('#vendors');
var query = new CB.CloudQuery('Vendor');
query.setLimit(62);
query.notEqualTo('name', ' ');
query.find({
    success : function(list){
        for(x = 0; x < list.length; x++){
          //console.log(list[x].document);
          $vendors.append('<li> <a href="#" onclick="vendorSetup( ' + '\''+ list[x].document._id + '\'' + ')">'+'<h2>'
          + list[x].document.name +'</h2>'+ '<p>' +'Type: '+ list[x].document.type
          + '<br>Description: ' + list[x].document.description +'</p></a></li>');
          $('#vendors').listview().listview('refresh');
            //console.log(list[0].document.name);
        }//list is an array of CloudObjects

    },error : function(error){
        //error
    }
});
});
//User navigation
$(document).ready(function() {
var currentUser = CB.CloudUser.current;
if(currentUser.document.type === 'A'){
  alert('Admin');
  $( "#nav" ).append('<li><a href="admin.html">Admin</a></li>');
  $('#nav').listview().listview('refresh');
}

});
//function to reset password
function resetBtn(){

  var email = document.getElementById("email").value;
  alert(email);
  var user = new CB.CloudUser();
  CB.CloudUser.resetPassword(email,{
    success: function() {
      alert('Email Sent');
      alert('Reset Password email sent!');
    },
    error: function(error) {
      alert('error occured');
    }
  });

}
//function used to test user login
function loginValidate(){
  var username = document.getElementById("usrname").value;
  var password = document.getElementById("password").value;
  if(username === '' & password === ''){
    alert('Enter pass/user');
  }else{
    var user = new CB.CloudUser();
    user.set('username', username );
    user.set('password', password );
    user.logIn({
      success: function(user) {
        var currentUser = CB.CloudUser.current;
        alert('Welcome : ' + currentUser.document.username);
      },
      error: function(error) {
        //Error.
        alert('Sorry, that username or password doesn\'t match')
      }
    });
  }
}
//function to create a new user
function newUserValidate(){

  var username = document.getElementById("username").value;
  var password = document.getElementById("pass").value;
  var confirmPass = document.getElementById("confirm_pass").value;
  var email = document.getElementById("email").value;

  if(username !== '' & password !== '' & confirmPass !== '' & email !== '' ){
    if( password === confirmPass ){
      var user = new CB.CloudUser();
      user.set('username', username );
      user.set('password', password );
      user.set('email', email );
      user.signUp({
        success: function(user) {
          //Registration successfull
          alert('Welcome ' + username)
        },
        error: function(error) {
          //Error in user registration.
          alert('A problem occured');
        }
      });

    }else{
      alert('Passwords don\'t match');
    }
  }else{
    alert('Please Fill out all fields');
  }

}
