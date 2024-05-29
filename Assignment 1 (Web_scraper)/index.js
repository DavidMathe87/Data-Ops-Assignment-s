const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const baseUrl = 'https://books.toscrape.com/';
const outputDir = 'book_images';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

axios.get(baseUrl).then(response => {
    const $ = cheerio.load(response.data);

    const books = [];
    $('article.product_pod').each((i, element) => {
     const title = $(element).find('h3 a').attr('title');
    const price = $(element).find('p.price_color').text();
     const imageUrl = baseUrl + $(element).find('img').attr('src');

        books.push({ title, price, imageUrl });
    });


    const fetchImages = books.map(book => {
        return axios.get(book.imageUrl, { responseType: 'arraybuffer' })
            .then(response => {
            const imagePath = path.join(outputDir, `${book.title}.jpg`);
            fs.writeFileSync(imagePath, response.data);
            return { ...book, imagePath };
            });
    });

    Promise.all(fetchImages).then(booksWithImages => {
      
    displayImages(booksWithImages);
    });
});

function displayImages(books) {
const canvasWidth = 1500;
const canvasHeight = 600;
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

const imagesPerRow = 5;
const imageWidth = canvasWidth / imagesPerRow;
const imageHeight = canvasHeight / 2;

books.forEach((book, index) => {
    loadImage(book.imagePath).then(image => {
        const x = (index % imagesPerRow) * imageWidth;
        const y = Math.floor(index / imagesPerRow) * imageHeight;
        ctx.drawImage(image, x, y, imageWidth, imageHeight);
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(book.title, x, y + imageHeight - 20);
        ctx.fillText(book.price, x, y + imageHeight - 5);

     if (index === books.length - 1) {
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync('books_grid.png', buffer);
      console.log('Images displayed and saved to books_grid.png');
            }
        });
    });
}
