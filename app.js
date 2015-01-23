var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.use(express.static('assets'));

//MySQL Connection

var mysql = require("mysql");
var my_sql = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "esh_schools"
});

my_sql.connect();

//MongoDB Connection

var MongoClient = require("mongodb").MongoClient;

var mongo;
MongoClient.connect("mongodb://localhost:27017/esh_schools", function(err, db) {
	mongo = db;
});

//Helper functions

function convertToMega(band, measure) {
	if (measure === "k") {
		return band / 1000;
	} else if (measure === "m") {
		return band;
	} else if (measure === "g") {
		return band * 1000;
	} else if (measure === "t") {
		return band * 1000 * 1000;
	}
}

//Routes

app.get("/", function(req, res) {
	var mysql_school_info = [];
	var mongo_school_info = [];

	//Get data from MySQL

	console.log("mysql running");
	my_sql.query("SELECT * FROM schools", function(err, schools, fields) {
		schools.forEach(function(school) {
			my_sql.query("SELECT * FROM school_purchases", function(err, purchases, fields) {
				var purchase_number = purchases.length;

				var temp_purchases = [];

				purchases.forEach(function(purchase) {
					temp_purchases.push(purchase.cost / convertToMega(purchase.bandwidth, purchase.measure));
				});

				var purchase_sum = temp_purchases.reduce(function(a, b) {
					return a + b;
				});

				var purchase_avg = purchase_sum / purchase_number;

				mysql_school_info.push({
					ben: school.ben,
					cost_per_megabit: purchase_avg
				});
			});
		});
	});

	//Get data from Mongo

	console.log("mongo running");
	var organizations = mongo.collection("organizations");

	organizations.find({}).toArray(function(err, schools) {
		schools.forEach(function(school) {
			var purchase_number = school.purchases.length;

			var temp_purchases = [];

			school.purchases.forEach(function(purchase) {
				temp_purchases.push(purchase.cost / convertToMega(purchase.bandwidth, purchase.measure));
			});

			var purchase_sum = temp_purchases.reduce(function(a, b) {
				return a + b;
			});

			var purchase_avg = purchase_sum / purchase_number;

			mongo_school_info.push({
				ben: school.ben,
				cost_per_megabit: purchase_avg
			});
		});
	});

	setTimeout(function() {
		var full_data = mysql_school_info.concat(mongo_school_info);

		res.render("index", {
			chart_data: full_data
		});
	}, 3000);
});

//Start the server

app.listen(3000);