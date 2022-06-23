require("dotenv").config();
// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("../models/Product");
// const cities = require("./cities");
const { categories, sizes, colors } = require("./seedHelpers");
const { faker } =require('@faker-js/faker') ;
// import Product from '../models/Product';

const dbUrl = process.env.MONGO_URL 
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const randomEleOfArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
 const popularProducts = [
  {
    id:1,
    img:"https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
  },
  {
    id:2,
    img:"https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388",
  },
  {
    id:3,
    img:"https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
  },
  {
    id:4,
    img:"https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
  },
  {
    id:5,
    img:"https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
  },
  {
    id:6,
    img:"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
  },
  {
    id:7,
    img:"https://www.vintageindustries.nl/download_front/qympzk1762/2217_Arrow_Jacket_Forest.png",
  },
  {
    id:8,
    img:"https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
  },
]

const seedDB = async () => {
  await Product.deleteMany({});
  for (let i = 0; i < 10; i++) {
    // const randomNum = Math.floor(Math.random() * 1000);
    const randomPrice = Math.floor(Math.random() * 30);
    const randomImgArray = shuffle(popularProducts);
    // const randomImg = randomImgArray[0].img;
    const product = new Product({
      // author: "624d2ebe7b801b1801084315",
      title: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      img: randomImgArray[0].img,
      category:randomEleOfArray(categories),
      price: randomPrice,
      size:[randomEleOfArray(sizes),randomEleOfArray(sizes)],
      color:[randomEleOfArray(colors),randomEleOfArray(colors)],
      instock:true
    });
    await product.save();
  }
};
seedDB();