<a name="readme-top"></a>
<br />
<div align="center">
  <a href="https://gitlab.informatika.org/if3110-2022-k01-01-32/if-3110-2022-k-01-01-32">
    <img src="scripts/clientside/assets/ngnotify.png" alt="Logo">
  </a>

  <h3 align="center">Ngnotify</h3>

  <p align="center">
    :indonesia: Platform Mendengar Lagu Karya Anak Bangsa :indonesia:<br>
    Penantang Search Engine Gatot Kaca Sebagai Karya Terbaik Anak Bangsa
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Ngnotify adalah sebuah web app untuk memutar lagu yang ~menjiplak~ terinspirasi dari salah satu platform streaming lagu paling populer di dunia yakni Spotify. Web app ini dibuat untuk memenuhi ~Tugas Besar 1 IF3110 Teknik Informatika ITB~ panggilan negara untuk mencintai produk karya anak bangsa. Karena itu, kami membuat sebuah produk lokal agar terdapat produk Indonesia untuk dicintai :heart:heart:heart

Sebagai pesaing terbesar Search Engine Gatot Kaca untuk gelar aplikasi anak bangsa terbaik, tentu saja Ngnotify memiliki fitur yang sangat ~tidak~ lengkap. Ngnotify memiliki fitur login, register, add edit delete album dan lagu, play pause lagu, dan pastinya search lagu dengan search engine yang sangat ~cupu~ bagus.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* HTML
* CSS
* Javascript
* PHP
* Udah itu aja soalnya ~ITB style #kaloAdaYangSusahKenapaHarusYangGampang~ Vanilla Web App

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Tanpa Berlama-lama inilah cara menjalankan web app

### Prerequisites

* Docker
    ```sh
    https://www.docker.com/
    ```
* Git
    ```sh
    https://git-scm.com/downloads
    ```
* Internet (karena Database online)
* Kesabaran (karena akses data sering kali lemot - <i>maklum gratis</i>)
* Pastikan akses sebelum tanggal 28 November 2022 (karena DB onlinenya hanya ada sampai tanggal tersebut)
* Jika akses setelah tanggal 28, silahkan ubah konfigurasi database pada
    ```sh
    scripts/serverside/app/constants/base.php
    ```
setelah itu silahkan setting sendiri databasenya dari file dump :smile:. Jika tidak bisa, silahkan tanya yang bisa (Baca: google/stackoverflow/temen~kalo punya~)

### Installation



1. Clone Repo ini dengan menggunakan cmd pada directory yang diinginkan
    ```sh
    C:\Users\MerekLaptop> 
    git clone https://gitlab.informatika.org/if3110-2022-k01-01-32/if-3110-2022-k-01-01-32/
    ```
2. Buka Directory tempat file di clone
   ```sh
   C:\Users\MerekLaptop> cd if-3110-2022-k-01-01-32
   C:\Users\MerekLaptop\if-3110-2022-k-01-01-32>
   ```
3. Jalankan docker 
   ```sh
   C:\Users\MerekLaptop\if-3110-2022-k-01-01-32>
   docker-compose up -d
   ```
4. buka http://localhost:8080 di ~chrome~ browser favorit kalian
5. Ngnotify siap untuk dipakai :smile:
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

1. Login
<img src="assets/login.png" alt="Login Page">

2. Register
<img src="assets/registerfailed.png" alt="Register Failed">
<img src="assets/registerfailed.png" alt="Register Success">

3. Home
<img src="assets/homeadmin.png" alt="Register Success">
<img src="assets/homeuser.png" alt="Register Success">

4. Album
<img src="assets/album.png" alt="Album">

5. Detail Album
<img src="assets/detailalbum.png" alt="Detail Album">

6. Detail Song
<img src="assets/detailsong1.png" alt="Detail Lagu 1">
<img src="assets/detailsong2.png" alt="Detail Lagu 2">

7. Search Sort Filter
<img src="assets/searchsortfilter1.png" alt="Search Sort Filter 1">
<img src="assets/searchsortfilter2.png" alt="Search Sort Filter 2">
<img src="assets/searchsortfilter3.png" alt="Search Sort Filter 3">


8. Add Data
<img src="assets/adddata1.png" alt="Add Data 1">
<img src="assets/adddata2.png" alt="Add Data 2">


9. List User
<img src="assets/listuser.png" alt="List User 1">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributions
* Client-side (html,css,js)

|feature|13520019|13520034|13520040|
|-------|--------|--------|--------|
|adddata|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|albums|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|detailAlbum|:heavy_check_mark:||:heavy_check_mark:|
|detailSong|:heavy_check_mark:||:heavy_check_mark:|
|home|:heavy_check_mark:|:heavy_check_mark:|||
|listuser|:heavy_check_mark:|:heavy_check_mark:||
|login|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|register|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|searchSortFilter|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

* Server-side(php)

|feature|13520019|13520034|13520040|
|-------|--------|--------|--------|
|Docker||:heavy_check_mark:|:heavy_check_mark:|
|Routing|||:heavy_check_mark:|
|Core DB||:heavy_check_mark:|:heavy_check_mark:|
|User DB and API|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Song DB and API|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Album DB and API|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

* both

|feature|13520019|13520034|13520040|
|-------|--------|--------|--------|
|AJAX|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the NG License. See you again for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
|Name|Contact|Github|
|----|-------|------|
|Maharani Ayu Putri Irawan | 13520019@std.stei.itb.ac.id| <a href="https://www.github.com/rannnayy">@rannnayy</a>|
|Bryan Bernigen | 13520034@std.stei.itb.ac.id |<a href="https://www.github.com/Nk-Kyle">@Nk-Kyle</a>|
|Ng Kyle | 13520040@std.stei.itb.ac.id|<a href="https://www.github.com/bryanbernigen">@bryanbernigen</a>|

<p align="right">(<a href="#readme-top">back to top</a>)</p>