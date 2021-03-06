JSON is JavaScript's data format. 
Basically you can take a JavaScript object and covert it to JSON, which is just text.
This is especially convenient, because text can be stored in a file!
Then, you can open the file again, have JavaScript read the JSON for you, and get back your useable object.

A quick note about JS objects:
An "object" in javascript is pretty universal. 
The way we'll be using them when it comes to data storage is pretty similar to Python's dictionaries.

So basically one example of an object we could use would be:

	{
		"matchNumber": "1",
		"teamNumber": "1540",
		"ballData": {
			"numberOfBalls": 15,
			"accuracy": "90%"
		}
	}

NB: this (above) isn't anything we are actually using, just an example

In javascript code, you can work with objects/dictionaries like so:

	var myObj = {}
	myObj = {
		"foo": "bar"
	}

These are the same!:

	myObj.teamNumber = "1540"
	myObj["teamNumber"] = "1540"

You can also do this!:

	var keyName = "teamNumber"
	myObj[keyName] = "1540"

You can also use variables within objects when you create them, like so:

	var numBalls = 0
	var myObj = {
		"numBalls": numBalls //will be 0
	}


When a file is a .json, it should be a JSON text version of one of these JavaScript objects.
No custom data formats allowed!
The reason we use this is that JS does all of the work for us. 
No matter what people put in their notes, or whatever, it will parse correctly.

So basically, once you construct an object in your code, then you can convert it to JSON

	var myObj = {
		"foo": "bar"
	}
	var jsonText = JSON.stringify(myObj)

Then you can save jsonText into a file

Then you can take that file, and get the object back

	var jsonText = ... (load the file contents)
	var myObj = JSON.parse(jsonText)