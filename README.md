
# Sistem Manajemen PPIC & Produksi

Aplikasi berbasis web untuk mengelola proses perencanaan dan pelaksanaan produksi, dibangun menggunakan **Laravel** (Backend) dan **Vue.js** (Frontend).  
Aplikasi ini dibuat sebagai bagian dari **Technical Test Fullstack Developer Intern di Elitech**.

# Gambaran Fitur

##  Deskripsi Pengguna

Staff PPIC dapat:
- Membuat **Rencana Produksi** berdasarkan data produk yang tersedia.  
- Mengirimkan rencana produksi ke **Manager** untuk disetujui.  
- Melihat dan membuat **laporan periodik** (mingguan/bulanan).  
- Bisa menghapus rencana produksi sebelum disetujui.

Staff Produksi dapat:
- Menerima **Order Produksi** dari rencana yang disetujui.
- Memperbarui status produksi:
  
  menunggu → dikerjakan → selesai
  
- Mencatat jumlah produksi aktual dan produk reject (NG).
- Membuat laporan per order atau per periode.

Manager dapat:
- Mengelola data **Produk** (CRUD)
- Meninjau dan **menyetujui/menolak** rencana produksi

---

##  Teknologi yang Digunakan

| Layer | Teknologi |
|--------|-------------|
| Backend | Laravel 12 |
| Frontend | Vue.js 3  |
| UI | Tailwind CSS + ShadCN Components |
| Database | MySQL |

---

## Panduan Instalasi

### 1️ Clone Repositori
```bash
git clone https://github.com/rapsign/Manufacturing-System.git
cd Manufacturing-System
```

### 2️ Install Dependensi Backend
```bash
composer install
cp .env.example .env
php artisan key:generate
```


### 3️ Buat Database Baru
Buat database baru untuk aplikasi ini menggunakan alat yang kamu gunakan 
bisa phpMyAdmin, HeidiSQL, TablePlus, DBeaver, atau melalui terminal MySQL.
```bash
CREATE DATABASE manufacturing_system;
```

### 4 Konfigurasi Database
Edit file `.env`:
```env
DB_DATABASE=manufacturing_system
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan migrasi:
```bash
php artisan migrate --seed
```

Seeder akan otomatis membuat data.

### 5 Install Dependensi Frontend
```bash
npm install
```

### 6 Jalankan Aplikasi

Kamu bisa menjalankan aplikasi dengan salah satu cara berikut:

Opsi 1 — Satu perintah

```bash
composer run dev
```
Perintah ini akan menjalankan Laravel dan Vue secara bersamaan.

Opsi 2 — Manual (dua terminal)
```bash
php artisan serve
npm run dev
```

Akses aplikasi di:  
 `http://localhost:8000`

---

## Akun Login Default

| Peran | Email | Password |
|--------|--------|-----------|
| Manager | manager@rapsign.com | password |
| Staff PPIC | staff_ppic@rapsign.com | password |
| Staff Produksi | staff_production@rapsign.com | password |

---



##  Alur Website

```
[PPIC] Membuat Rencana Produksi (Draft)
      ↓
[PPIC] Mengirim (Submit) Rencana untuk Persetujuan
      ↓
[Manager] Menyetujui / Menolak Rencana
      ↓
[Produksi] Menerima Order → Memproses → Selesai
      ↓
[Produksi] Mengirim Barang ke Gudang
      ↓
[Manager] Melihat Data Gudang
```

---



## Developer
**Rinaldi A Prayuda**  
Fullstack Developer Intern Candidate  
 - renaldiprayuda11@gmail.com
 - [https://github.com/rapsign](https://github.com/rapsign)
