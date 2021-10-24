const mongoose = require('mongoose');
const Add = require('./createAccount');

mongoose.connect('mongodb://localhost/DataBase-MongoDB');
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
const Schema = mongoose.Schema;
const accountSchema = new Schema({
  username: String,
  password: String,
  address: String,
  email: String,
  phoneNumber: Number,
  age: Number,
  list_course: {
    coureId: {
      type: String,
      ref: 'course' // ! ref đến model
    },
  },
  cardId: {
    type: String,
    ref: 'card' // ! ref đến model
  }
}, {
  collection: 'Account'
});

const courseSchema = new Schema({
  name: String,
  teacher: {
    type: String,
    ref: 'account'
  },
  price: Number,
}, {
  collection: 'Course'
});

const cardSchema = new Schema({
  name: String,
  address: String,
}, {
  collection: 'Card'
});

const AccountModel = mongoose.model('account', accountSchema);
const CourseModel = mongoose.model('course', courseSchema);
const CardModel = mongoose.model('card', cardSchema);


for(let i = 1; i <= 20; i++) {
  AccountModel.create({
    username: "User_" + i,
    password: "pass_" + i,
  })
    .then((data) => { console.log(data); })
    .catch((err) => { console.log(err);})
}

/**
 * TODO Quan hệ table: populate.
 * ? Có 3 dạng quan hệ populate
 * * 1 .populate(tên filed liên kết)
 * * 2. Quan hệ lòng nhau hay là cha con
 * ! VD:
 * ? .populate('course')
 * ? .populate({
 * ?    path: 'đường dẫn đến populate muốn liên kết'
 * ?    Liên kết tiếp đến đường dẫn muốn liên kết
 * ?    populate: { path: 'teacher' }
 * ? })
 * * 3. Quan hệ object
 */

// * 1
// AccountModel.find({
//   username: "student1"
// }).populate('coureId')
//   .then(data => { console.log(data); })
//   .catch(err => { console.error(err); });

// * 2
// AccountModel.find({
//   username: "student1"
// }).populate('coureId')
//   .populate({
//     path: 'coureId',
//     populate: { path: 'teacher' }
//   })
//   .then(data => { console.log(data); })
//   .catch(err => { console.error(err); });

// * 3
// AccountModel.find({
//   username: "student1"
// }).populate('list_course.coureId')
//   .populate({
//     path: 'list_course.coureId',
//     populate: { path: 'teacher' }
//   })
//   .then(data => { console.log(data); })
//   .catch(err => { console.error(err); });

/**
 * TODO tìm kiếm và so sánh
 * TODO: 2 keyword dùng để so sánh $gt (lớn hơn) $gte (lớn hơn hoặc bằng)
 * TODO: 2 keyword dùng để so sánh $lt (nhỏ hơn) $lte (nhỏ hơn hoặc bằng)
 * TODO: toán tử $or: [{điều kiện 1}, {điều kiện 2}, ...];
 */

// AccountModel.find({
//   age: { $lte: 10 }
// }).sort('username')
//   .then(data => { console.log(data); })
//   .catch(err => { console.error(err); });

// TODO Tạo data
// Add.createAccount(AccountModel);
// Add.createCourse(CourseModel);

// TODO Xóa 1 bản ghi
// AccountModel.deleteOne({
//   username: 'letien'
// }, (err) => {
//   console.log(`Error: ` + err)
// });


// TODO Xóa nhiều bản ghi
AccountModel.deleteMany({})
  .then(data => console.log(data))
  .catch(err => console.error(err));

// CourseModel.deleteMany({})
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

// TODO Tìm kiếm theo điều kiện
// AccountModel.find({
//   username: /s/
// }).sort('username')
//   .then(data => { console.log(data); })
//   .catch(err => { console.error(err); });

// AccountModel.deleteOne({
//   username: 'letien'
// }, (err) => {
//   console.log(`Error: ` + err)
// });

// TODO Cập nhật
// AccountModel.updateOne({
//   username: "student4"
// }, {
//   username: "hocsinh4"
// }).then(data => {
//   console.log("check", data);
// }).catch(err => {
//   console.log("error", err);
// });

// TODO Tạo
// AccountModel.create(data, (err, data) => {
//   console.log("ERROR", err);
//   console.log("check create", data);
// })

// TODO Tìm kiếm theo ID
// AccountModel.findById({ _id: '6164c01c938535f1ca5d4f8d' }, (err, data) => {
//   if (err) console.error(err);
//   console.log("check data", data);
// });


