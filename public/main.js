var Vue = require("vue");
var request = require("superagent");
var CodeMirror = require("codemirror");
var App = require('../app.vue');

var myCodeMirror;
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
				.send({contents: myCodeMirror.getValue()})
				.end(function(err, res){
					console.log(res.body);
					self.saved = new Date();
				});
		}	
	},
	ready: function(){
		var self = this;
		
		
		myCodeMirror = CodeMirror(
			document.querySelector(".editorContainer"),
			{
				lineNumbers: true,
				mode: "text/x-vue",
				 extraKeys: {
					"Ctrl-S": function(instance) {
						self.save();
					}
				}
			}
		);

		console.log("loaded");
		request.get("/api", function(err, data){
			if(err){
				console.log(err);
			}
			self.contents = data.body.contents;
			myCodeMirror.setValue(data.body.contents);
		})
	},
	components: {
		app: App
	}
});
