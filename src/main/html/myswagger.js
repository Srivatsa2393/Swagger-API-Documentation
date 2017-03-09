$(function () {
    var url = window.location.search.match(/url=([^&]+)/);
    if (url && url.length > 1) {
        url = decodeURIComponent(url[1]);
    } else {
        url = window.location + "/internalapi.json";
    }

    window.swaggerUi = new SwaggerUi({
        url: url,
        dom_id: "swagger-ui-container",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        onComplete: function (swaggerApi, swaggerUi) {
            if (typeof initOAuth == "function") {

                initOAuth({
                    clientId: "ffe7748a-3a3f-4860-a02a-42ab08e4fde2",
                    realm: "realm",
                    appName: "Swagger"
                });

            }

            $('pre code').each(function (i, e) {
                hljs.highlightBlock(e)
            });

            if (swaggerUi.options.url) {
                $('#input_baseUrl').val(swaggerUi.options.url);
            }
            if (swaggerUi.options.apiKey) {
                $('#input_apiKey').val(swaggerUi.options.apiKey);
            }

            $("[data-toggle='tooltip']").tooltip();

            addApiKeyAuthorization();
        },
        onFailure: function (data) {
            log("Unable to Load SwaggerUI");
        },
        docExpansion: "none",
        sorter: "alpha"
    });
		function addApiKeyAuthorization() {
                var key = encodeURIComponent($('#input_apiKey')[0].value);
                if (key && key.trim() != "") {
                    var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("Authorization", "Bearer " + key, "header");
                    window.swaggerUi.api.clientAuthorizations.add("key", apiKeyAuth);
                    log("added key " + key);
                }
            }
            $('#input_apiKey').change(addApiKeyAuthorization);

    window.swaggerUi.load();

    function log() {
        if ('console' in window) {
            console.log.apply(console, arguments);
        }
    }
});

$( document ).ready(function() {
    $( "#api_form_login" ).click(function() {
     var username =  $( "#api_username" ).val();
	 var password =  $( "#api_password" ).val();
	 if(username == "" || password==""){
		 alert("Please enter username and password");
	 }
	 else{
		 var data = {'username':username,"password":password};
		 $.ajax({
			  url:'https://internal-api-staging-lb.interact.io/v2/login',
			  type: 'post',
			  dataType: 'json',
			  data: JSON.stringify(data),
			  contentType :   'application/json',
			  success:function(response){
				  var authToken = response.token.authToken;
                  localStorage.setItem("authToken", authToken);
                  localStorage.setItem("userName", username);
				   $("input[name='authToken']").val(authToken);
				   $("#input_apiKey").val(authToken);
                   $("#input_userName").val(username);
				   $( "#api_username" ).val('');
				   $( "#api_password" ).val('');
				   $('#myModal').modal('hide');
                   $("#loginthing").hide();
			  },
			  error:function(response){
				  error = JSON.parse(response.responseText)
				  alert(error.message);
			  }
			});
	 }
});
});