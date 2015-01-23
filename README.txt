
# EducationSuperhighway Coding Challenge

Using the technology stack of your choice, produce a web application which displays a bar chart of the average cost per megabit of bandwidth for each organization in the sample set provided.

## Requirements

- The horizontal X axis should show BEN, which is the Billed Entity Number of the organization, a unique number provided in the sample set
- The vertical Y axis should show average (mean) cost per megabit. In other words, taking bandwidth and purchase price, first convert the bandwidth value into megabits and then use the formula cost_per_megabit = purchase_price / bandwidth_in_mb
 Average these values over the sample set to find the average cost per megabit.
- Some of the data is in MongoDB. Some of the data is in a SQL format. For the SQL data you will have to write the schema for the database engine of your choice based on the INSERTs provided. The data is not in the same format in each database, but the bar chart should show data from both sources.
- To start, install mongodb and the SQL engine of your choice and use seed.js and seed.sql, respectively, to populate the databases
- Additionally, write at least one test case, testing either the model, controller, view, or all three. Choose the test that is most valuable, depending on how you've chosen to write the code.

## Additional Notes

- In the seed data the bandwidth values are given as either 10, 100, or 1000, but the measure is indicated by a separate field (measure). Conversions are as follows:
"k" => kilobits. 1000 kilobits = 1 megabit
"m" => megabits. 1000 megabits = 1 gigabit
"g" => gigabits. 1000 gigabits = 1 terabit
"t" => terabits
The cost field is given in dollars.

## Submitting

Please include instructions on how to execute your project on a Linux or Unix environment:
1) Run 'npm install'
2) Make sure 'Postgres' is running
3) Run 'nodemon'
4) Have the terminal running and the mongo shell running simultaneously
5) The site can be found on 'localhost:3000'

