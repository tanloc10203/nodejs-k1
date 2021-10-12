
let createAccount = (AccountModel) => {
  AccountModel.create(
    {
      username: "student1",
      password: "student1",
      address: "Hà nội",
      email: "student1@gmail.com",
      phoneNumber: "0123474783",
      age: 13,
      coureId: "KhoaC#",
    },
    {
      username: "student2",
      password: "student2",
      address: "Hà nội",
      email: "student2@gmail.com",
      phoneNumber: "01234743838",
      age: 13,
      coureId: "KhoaJs",
    },
    {
      username: "student3",
      password: "student3",
      address: "Đà nẵng",
      email: "student3@gmail.com",
      phoneNumber: "01234784843",
      age: 10,
      coureId: "KhoaNodeJS",
    },
    {
      username: "student4",
      password: "student4",
      address: "Đồng Tháp",
      email: "student4@gmail.com",
      phoneNumber: "03833474783",
      age: 9,
      coureId: "KhoaJava",
    },
    {
      username: "student5",
      password: "student5",
      address: "Cần Thơ",
      email: "student1@gmail.com",
      phoneNumber: "0123474783",
      age: 20,
      coureId: "KhoaPHP",
    },
    {
      username: "student5",
      password: "student5",
      address: "Cần Thơ",
      email: "student1@gmail.com",
      phoneNumber: "0123474783",
      age: 20,
      coureId: "KhoaPHP",
    }
  ).then(data => console.log(data))
    .catch(err => console.error(err));
}


let createCourse = (CouserModel) => {
  CouserModel.create(
    {
      coureId: "KhoaPHP",
      name: "PHP",
      teacher: "Nguyễn Tùng",
      price: 3000,
    },
    {
      coureId: "KhoaJava",
      name: "JAVA",
      teacher: "Phan Tấn Lộc",
      price: 10000,
    },
    {
      coureId: "KhoaNodeJS",
      name: "Node JS",
      teacher: "Nguyễn Thành Lộc",
      price: 4000,
    },
    {
      coureId: "KhoaJs",
      name: "JavaScript",
      teacher: "Nguyễn Tùng",
      price: 3000,
    },
    {
      coureId: "KhoaC#",
      name: "C#",
      teacher: "Nguyễn Tùng",
      price: 4000,
    },
  ).then(data => console.log(data))
    .catch(err => console.error(err));
}


module.exports = {
  createAccount,
  createCourse
};