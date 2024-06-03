const moment = require('moment');

// moment().format('MMMM Do YYYY, h:mm:ss a')
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

const tanggal1 = moment('2023-11-11').add(30, "day").format('YYYY-MM-DD');

for (let m = 1; m <= 6; m++) {
    const tanggal2 = moment(tanggal1).add(m, "day");
    console.log(moment(tanggal2).format("YYYY-MM-DD"));
}


moment("2021-04-01").format("YYYY-MM-DD");
console.log(moment("2021-04-01").format("YYYY-MM-DD"));


// Fungsi untuk mengonversi format harga
const convertToInteger = (priceString) => {
    const numericString = priceString.replace(/\D/g, ''); // Menghapus semua karakter non-digit
    return parseInt(numericString); // Mengonversi string menjadi integer
};

const num1 = convertToInteger("IDR 1.200.000");
const num2 = convertToInteger("IDR 1.500.000");
console.log(`num1: ${num1}, num2: ${num2}`);
console.log(num1 + num2);

//
//
// import puppeteer from 'puppeteer';
// import fs from 'fs';
// import moment from 'moment';
// import config from './config.js';
// import model from './model.js';
//
// const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//
// const convertToInteger = (priceString) => {
//     const numericString = priceString.replace(/\D/g, ''); // Menghapus semua karakter non-digit
//     return parseInt(numericString); // Mengonversi string menjadi integer
// };
//
// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false
//     });
//
//     let allData = []; // Array untuk menyimpan semua data dari setiap tanggal
//
//     // Looping berdasarkan rentang tanggal dari config.startDate hingga config.endDate
//     for (let currentDate = moment(config.startDate); currentDate.isBefore(moment(config.endDate)); currentDate.add(1, 'days')) {
//         const page = await browser.newPage();
//
//         // Masuk ke halaman web yang ingin di-scrape untuk tanggal saat ini
//         await page.goto(
//             config.getURLbyDate(currentDate.format('YYYY-MM-DD')),
//             { waitUntil: 'networkidle0' });
//
//         // Lakukan scraping untuk kutipan dan penulisnya
//         const data = await page.evaluate(() => {
//             const card = Array.from(document.querySelectorAll('.FlightCard_card__2LuC2'));
//
//             return card.map(element => {
//                 const maskapai = element.querySelector('.AirlinesAndFacilities_airline_text__6YuoQ').innerText;
//                 const harga_tiket = element.querySelector('.Text_variant_alert__7jMF3').innerText;
//                 const tujuan = element.querySelector('.FlightCard_time_duration__GO_b1+ .FlightCard_time__ssfW4 .Text_size_b3__6n_9j').innerText;
//                 const asal_penerbangan = element.querySelector('.FlightCard_time__ssfW4:nth-child(1) .Text_size_b3__6n_9j').innerText;
//                 const jam_berangkat = element.querySelector('.FlightCard_time__ssfW4:nth-child(1) .Text_weight_bold__m4BAY').innerText;
//                 const jam_sampai = element.querySelector('.FlightCard_time_duration__GO_b1+ .FlightCard_time__ssfW4 .Text_weight_bold__m4BAY').innerText;
//                 const transit = element.querySelector('.FlightCard_arrow__aSJtN+ .Text_size_b3__6n_9j').innerText;
//                 return { maskapai, harga_tiket, tujuan, asal_penerbangan, jam_berangkat, jam_sampai, transit }
//             });
//         });
//
//         const formattedData = data.map((item, index) => {
//             return model.dataModel(index + 1, currentDate.format('YYYY-MM-DD'), convertToInteger(item.harga_tiket), item.maskapai, item.tujuan, item.asal_penerbangan, item.jam_berangkat, item.jam_sampai, item.transit);
//         });
//
//         allData = allData.concat(formattedData); // Menggabungkan data dari setiap tanggal
//
//         await page.close();
//
//         // Menunggu sejumlah waktu tertentu sebelum melanjutkan ke iterasi berikutnya
//         await waitFor(5000); // Misalnya menunggu 5 detik
//     }
//
//     // Menyimpan semua data dalam satu file JSON
//     fs.writeFileSync('all_data.json', JSON.stringify(allData, null, 2));
//
//     console.log('Semua data telah disimpan dalam file all_data.json');
//
//     await browser.close();
// })();
//


import puppeteer from 'puppeteer';
import fs from 'fs';
import moment from 'moment';
import config from './config.js';
import model from './model.js';

// Fungsi untuk mengonversi format harga
// const convertToInteger = (priceString) => {
//     const numericString = priceString.replace(/\D/g, ''); // Menghapus semua karakter non-digit
//     return parseInt(numericString); // Mengonversi string menjadi integer
// };
//
// // Fungsi untuk membuat ID dengan format FL001, FL002, dsb.
// const generateFlightID = (index) => {
//     let formattedIndex = '';
//
//     if (index <= 999) {
//         formattedIndex = String(index).padStart(3, '0');
//     } else if (index <= 9999) {
//         formattedIndex = String(index).padStart(4, '0');
//     } else {
//         formattedIndex = String(index).padStart(5, '0');
//     }
//     return `FL${formattedIndex}`;
// };

// // Fungsi untuk menunggu sejumlah waktu tertentu (dalam milidetik)
// const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//
// (async () => {
//     const browser = await puppeteer.launch({
//         headless: true
//     });
//
//     let allData = []; // Array untuk menyimpan semua data dari setiap tanggal
//     let currentIndex = 1; // Untuk melacak indeks saat ini
//
//     // Looping berdasarkan rentang tanggal dari config.startDate hingga config.endDate
//     for (let currentDate = moment(config.startDate); currentDate.isBefore(moment(config.endDate)); currentDate.add(1, 'days')) {
//         console.log(`Memproses data untuk tanggal: ${currentDate.format('YYYY-MM-DD')} dimulai`);
//
//         const page = await browser.newPage();
//
//         // Masuk ke halaman web yang ingin di-scrape untuk tanggal saat ini
//         await page.goto(
//             config.getURLbyDate(currentDate.format('YYYY-MM-DD')),
//             { waitUntil: 'networkidle0' });
//
//         // Lakukan scraping untuk kutipan dan penulisnya
//         const data = await page.evaluate(() => {
//             const card = Array.from(document.querySelectorAll('.FlightCard_card__2LuC2'));
//
//             return card.map(element => {
//                 const maskapai = element.querySelector('.AirlinesAndFacilities_airline_text__6YuoQ').innerText;
//                 const harga_tiket = element.querySelector('.Text_variant_alert__7jMF3').innerText;
//                 const tujuan = element.querySelector('.FlightCard_time_duration__GO_b1+ .FlightCard_time__ssfW4 .Text_size_b3__6n_9j').innerText;
//                 const asal_penerbangan = element.querySelector('.FlightCard_time__ssfW4:nth-child(1) .Text_size_b3__6n_9j').innerText;
//                 const jam_berangkat = element.querySelector('.FlightCard_time__ssfW4:nth-child(1) .Text_weight_bold__m4BAY').innerText;
//                 const jam_sampai = element.querySelector('.FlightCard_time_duration__GO_b1+ .FlightCard_time__ssfW4 .Text_weight_bold__m4BAY').innerText;
//                 const transit = element.querySelector('.FlightCard_arrow__aSJtN+ .Text_size_b3__6n_9j').innerText;
//
//                 return { maskapai, harga_tiket, tujuan, asal_penerbangan, jam_berangkat, jam_sampai, transit }
//             });
//         });
//
//         const formattedData = data.map((item, index) => {
//             const flightID = generateFlightID(currentIndex); // Mendapatkan ID pesawat dengan format FL001, FL002, dst.
//             currentIndex++; // Menaikkan indeks
//             return model.dataModel(flightID, currentDate.format('YYYY-MM-DD'), convertToInteger(item.harga_tiket), item.maskapai, item.tujuan, item.asal_penerbangan, item.jam_berangkat, item.jam_sampai, item.transit);
//         });
//
//         allData = allData.concat(formattedData);
//
//         await page.close();
//
//         await waitFor(1000);
//         console.log(`Memproses data untuk tanggal: ${currentDate.format('YYYY-MM-DD')} selesai`);
//     }
//
//     // Menyimpan semua data dalam satu file JSON
//     fs.writeFileSync('all_data.json', JSON.stringify(allData, null, 2));
//
//     console.log('Semua data telah disimpan dalam file all_data.json');
//
//     await browser.close();
// })();



