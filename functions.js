//function to display market data
/*
$(function(){
  var $markets = $('#markets');
  $.ajax({
    type: 'GET',
    url: 'https://data.hawaii.gov/resource/b2y9-ab7v.json',
    dataType: 'json',
    success: function(data) {
      $.each(data, function(i, market) {
        if(i <= 8){
          $markets.append('<li><a href="#"><img src="http://famouswonders.com/wp-content/uploads/2010/01/Otavalo-Market.jpg" height="50" width="50">Farmers Market: '+'<h2>'
          + market.farmer_s_market +'</h2>'+ '<p>' +'Island: '+ market.island + 'Location: ' + market.location_1_location + 'State: ' + market. location_1_state +
          'Information: ' + market.location_info +'Phone: '+market.phone+ 'Time: '+market.time +'</p></a></li>');
          $('#markets').listview().listview('refresh');
        }
      });
    }
  });
});*/
$(document).ready(function() {
var $markets = $('#markets');
var query = new CB.CloudQuery('Market');
query.setLimit(62);
query.equalTo('island', 'Oahu');
query.find({
    success : function(list){
        for(x = 0; x < list.length; x++){
          console.log(list[x].document);
          $markets.append('<li> <a href="#">'+'<h2>'
          + list[x].document.name +'</h2>'+ '<p>' +'Island: '+ list[x].document.island + '<br>Time: ' + list[x].document.time
          +'<br>Phone: '+ list[x].document.phone +'</p></a></li>');
          $('#markets').listview().listview('refresh');
            //console.log(list[0].document.name);
        }//list is an array of CloudObjects

    },error : function(error){
        //error
    }
});
});
//map function
/*
$(document).ready(function() {
  var locations = [
    ['Ewa Beach', 21.419100, -157.962173],
    ['Windward Mall', 21.42064035000044, -157.80338967099974],
    ['Pearl City', 21.393800202000477, -157.96977976199975],
    ['Salt Lake', 21.34594295700043, -157.90491127999974],
    ['Haleiwa', 21.58948073400046, -158.10290913599974]
  ];
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: new google.maps.LatLng(21.419100, -157.962173),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      animation: google.maps.Animation.BOUNCE
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
        $('#map').listview().listview('refresh');
      }
    })(marker, i));
  }
});  */ //END OLD MAP Function
//function to reset password

//User location functions integrated with Google API's
//reference link: https://developers.google.com/maps/documentation/javascript/tutorials/geolocation
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.4354327, lng: -158.0365637},
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
//end User location functions

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
  var password = document.getElementById("pass").value;
  if(username === '' & password === ''){
    alert('Enter pass/user');
  }else{
    var user = new CB.CloudUser();
    user.set('username', username );
    user.set('password', password );
    user.logIn({
      success: function(user) {
        alert('Thats you!');//Login successfull
      },
      error: function(error) {
        //Error.
        alert('Wrong!')
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

//function to upload photo files
//reference link: https://tutorials.cloudboost.io/en/datastorage/files
function uploadPhoto(fileName, photo) {
	saveLocalPhoto();
}

//test saving a file from the local system
function saveLocalPhoto(){
	var fileUploadControl = $("#photo")[0];
	console.log(`fileUploadControl is ${fileUploadControl}`);
	if (fileUploadControl.files.length > 0) {
	  var file = fileUploadControl.files[0];
	  var name = "localSystemPhoto.png";
	  var cloudFile = new CB.CloudFile(file);
	  cloudFile.set('name',name);
	  cloudFile.save({
		success : function(cloudFile){
			console.log("successfully saved?");
		  console.log(cloudFile.URL);
		}, error: function(error){
		  //error
		  console.log("upload error");
		}, uploadProgress : function(percentComplete){
			//upload progress.
			console.log("file upload progress");
		}
	  })
	}
}
