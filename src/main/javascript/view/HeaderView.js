'use strict';

SwaggerUi.Views.HeaderView = Backbone.View.extend({
  
  events: {
    'click #show-pet-store-icon'    : 'showPetStore',
    'click #show-wordnik-dev-icon'  : 'showWordnikDev',
    'click #explore'                : 'showCustom',
    'keyup #input_baseUrl'          : 'showCustomOnKeyup',
    'keyup #input_apiKey'           : 'showCustomOnKeyup',
     "click .button-up": "transitionUp",
    "click .button-down": "tranistionDown",
  },

  initialize: function(){},
  
transitionUp: function() {
    console.log("Transition up");
  },

  tranistionDown: function() {
    console.log("Transition down")
  },

  showPetStore: function(){
    this.trigger('update-swagger-ui', {
      url:'http://localhost:8080/?url=https://internal-api-staging-lb.interact.io/v2/swagger.json'
    });
 
  },

  showWordnikDev: function(){
    this.trigger('update-swagger-ui', {
      url: 'http://api.wordnik.com/v4/resources.json'
    });
  },

  showCustomOnKeyup: function(e){
    if (e.keyCode === 13) {
      this.showCustom();
    }
  },

  showCustom: function(e){
localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    $('#input_apiKey').val("");
    $('#input_userName').val("");
    $("input[name='authToken']").val("");
    $("#loginthing").show();
    if (localStorage.getItem("authToken") === null) {
      //Login Modal
      $("#myModal").modal();
    }
    else{
      
    }

  /*  if (e) {
      e.preventDefault();
    }
    this.trigger('update-swagger-ui', {
      url: $('#input_baseUrl').val(),
      apiKey: $('#input_apiKey').val()
    });*/
  },

  update: function(url, apiKey, trigger){
    if (trigger === undefined) {
      trigger = false;
    }

    $('#input_baseUrl').val(url);

    $('#input_apiKey').val(apiKey);
    if (trigger) {
      this.trigger('update-swagger-ui', {url:url});
    }
  }
});
