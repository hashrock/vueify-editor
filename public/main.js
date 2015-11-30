var Vue = require("vue");
var request = require("superagent");

var app = new Vue({
	el: "#app",
	data: {
		message: "data",
		contents : "",
		saved: ""
	},
	methods: {
		save: function(){
			var self = this;
	
			console.log("save");
			request
				.post("/api")
				.type('form')
				.send({contents: self.contents})
				.end(function(err, res){
					console.log(res.body);
					self.saved = new Date();
				});
		}	
	},
	ready: function(){
		var self = this;

		console.log("loaded");
		request.get("/api", function(err, data){
			if(err){
				console.log(err);
			}
			self.contents = data.body.contents;
		})
	}
});
