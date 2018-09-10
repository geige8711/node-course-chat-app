// let date = new Date();
// console.log(date.getMonth());
let moment = require('moment');
// let date = moment();
// console.log(date.format());
// console.log(date.format('MMM Do. YYYY'));
// console.log(date.format('h:mm a'))

let createdAt = 1234;
let date = moment(createdAt);
console.log(createdAt);
var someTimestamp = moment().valueOf();
console.log(someTimestamp);