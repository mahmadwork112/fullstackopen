const mongoose = require("mongoose");

// ask for password if not provided
if (process.argv.length < 3) {
  console.log("give password first");
  process.exit(1);
}

// saving the password
const password = process.argv[2];

// url to the database
const url = `mongodb+srv://AhmadSiddiqui:${password}@phonebookcluster.7tqbq90.mongodb.net/?appName=PhonebookCluster`;
// const url = `mongodb+srv://mahmadsiddiqui111_db_user:${password}@phonebookcluster.7tqbq90.mongodb.net/?appName=PhonebookCluster`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

// each person needs to have a name and a phone number which will both be of type string
// beacuse of the '-' in the numbers
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(`${person.name} ${person.number}`);
  });
});

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
