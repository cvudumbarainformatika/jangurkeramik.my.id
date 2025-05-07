# Catatan Implementasi Tailwind CSS v4 dengan Quasar

## Fitur Utama Tailwind CSS v4

1. **Variabel CSS yang Lebih Kuat**
   ```html
   <div class="bg-[--my-color]">
     <!-- Menggunakan variabel CSS kustom -->
   </div>
   ```

2. **Arbitrary Properties yang Lebih Fleksibel**
   ```html
   <div class="[--scroll-offset:56px] [mask-image:linear-gradient(to_bottom,black,transparent)]">
     <!-- Properti CSS arbitrary -->
   </div>
   ```

3. **Performa yang Lebih Baik**
   - Build time yang lebih cepat
   - File CSS yang lebih kecil

4. **Dukungan untuk Container Queries**
   ```html
   <div class="@container">
     <div class="@lg:text-red-500">
       <!-- Responsif berdasarkan container, bukan viewport -->
     </div>
   </div>
   ```

5. **Fitur Baru untuk Dark Mode**
   ```html
   <div class="dark:bg-gray-800">
     <!-- Styling untuk dark mode -->
   </div>
   ```

## Implementasi dengan Atomic Design

Atomic Design adalah metodologi untuk menciptakan sistem desain yang modular dan terstruktur. Berikut adalah penerapan Atomic Design dalam proyek Jangur Keramik:

## Catatan Penting: Kelas Utilitas Responsif

Untuk menangani tampilan responsif yang konsisten, gunakan kelas-kelas utilitas kustom berikut (bukan kelas Tailwind seperti `hidden md:block` yang mungkin bermasalah dengan CSS yang menggunakan `!important`):

### Kelas Utilitas Responsif:

1. **Untuk menyembunyikan di mobile, tampilkan di desktop:**
   - `desktop-only` - Tampil sebagai block di desktop
   - `desktop-only-flex` - Tampil sebagai flex di desktop
   - `desktop-only-inline` - Tampil sebagai inline di desktop
   - `desktop-only-inline-block` - Tampil sebagai inline-block di desktop

2. **Untuk menampilkan di mobile, sembunyikan di desktop:**
   - `mobile-only` - Tampil di mobile, tersembunyi di desktop

3. **Untuk menyembunyikan di desktop, tampilkan di mobile:**
   - `desktop-hidden` - Tersembunyi di desktop, tampil di mobile

### Contoh Penggunaan:

```vue
<!-- Elemen yang hanya tampil di desktop -->
<div class="desktop-only">Hanya tampil di desktop</div>

<!-- Elemen yang hanya tampil di mobile -->
<div class="mobile-only">Hanya tampil di mobile</div>

<!-- Flex container yang hanya tampil di desktop -->
<div class="desktop-only-flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### 1. Atoms (Atom)
Komponen terkecil dan paling dasar yang tidak dapat dipecah lagi:
- Button
- Input
- Label
- Icon
- Typography (headings, paragraphs)
- Color swatches
- Spacing units

### 2. Molecules (Molekul)
Kombinasi dari beberapa atom yang berfungsi sebagai unit:
- Form fields (label + input)
- Search bar (input + button)
- Navigation links
- Product badges
- Alert messages
- Card headers

### 3. Organisms (Organisme)
Kombinasi dari molekul dan/atau atom yang membentuk bagian antarmuka yang kompleks:
- Navigation bars
- Forms
- Product cards
- Feature sections
- Testimonial blocks
- Footer sections

### 4. Templates (Template)
Kerangka halaman yang terdiri dari organisme:
- Home page layout
- Product listing layout
- Product detail layout
- Checkout flow
- Account pages

### 5. Pages (Halaman)
Implementasi spesifik dari template dengan konten nyata:
- Home page
- Category page
- Product detail page
- About us page
- Contact page

## Struktur Folder untuk Atomic Design

```
src/
├── components/
│   ├── atoms/
│   │   ├── AppButton.vue
│   │   ├── AppInput.vue
│   │   ├── AppIcon.vue
│   │   ├── AppBadge.vue
│   │   └── ...
│   ├── molecules/
│   │   ├── AppFormField.vue
│   │   ├── AppSearchBar.vue
│   │   ├── AppNavLink.vue
│   │   ├── AppCardHeader.vue
│   │   └── ...
│   ├── organisms/
│   │   ├── AppNavbar.vue
│   │   ├── AppFooter.vue
│   │   ├── AppProductCard.vue
│   │   ├── AppFeatureSection.vue
│   │   └── ...
│   └── templates/
│       ├── HomeTemplate.vue
│       ├── ProductListTemplate.vue
│       ├── ProductDetailTemplate.vue
│       └── ...
├── pages/
│   ├── HomePage.vue
│   ├── ProductsPage.vue
│   ├── ProductDetailPage.vue
│   ├── AboutPage.vue
│   └── ...
```

## Langkah Selanjutnya

1. **Buat Komponen UI yang Konsisten**
   - Desain sistem komponen yang dapat digunakan kembali
   - Standardisasi warna, spacing, dan tipografi
   - Buat dokumentasi komponen internal

2. **Integrasikan dengan Quasar UI**
   - Kombinasikan class Tailwind dengan komponen Quasar
   - Buat wrapper components untuk komponen Quasar yang sering digunakan
   - Gunakan Tailwind untuk styling kustom pada komponen Quasar

3. **Buat Tema Kustom**
   - Sesuaikan warna dengan brand Jangur Keramik
   - Tambahkan font kustom jika diperlukan
   - Definisikan spacing dan breakpoint yang konsisten

   ```js
   // tailwind.config.cjs
   module.exports = {
     theme: {
       extend: {
         colors: {
           'jangur-primary': '#your-brand-color',
           'jangur-secondary': '#your-secondary-color',
         },
         fontFamily: {
           sans: ['Your-Brand-Font', 'sans-serif'],
         }
       }
     }
   }
   ```

4. **Optimalkan untuk Produksi**
   - Harus selalu Lazy Load Components
   - Pastikan content array di tailwind.config.cjs mencakup semua file yang menggunakan class Tailwind
   - Gunakan mode JIT (Just-In-Time) untuk build yang lebih cepat
   - Pertimbangkan untuk menggunakan strategi splitting CSS untuk performa yang lebih baik

5. **Implementasi Fitur Responsif**
   - Gunakan breakpoint Tailwind (`sm`, `md`, `lg`, `xl`, `2xl`)
   - Manfaatkan container queries untuk layout yang lebih fleksibel
   - Buat tampilan mobile-first yang konsisten

6. **Implementasi Dark Mode**
   - Aktifkan dark mode di konfigurasi Tailwind
   - Buat toggle untuk beralih antara light dan dark mode
   - Pastikan semua komponen mendukung dark mode

7. **Integrasi dengan State Management**
   - Gunakan Pinia untuk menyimpan preferensi tema pengguna
   - Implementasi persistensi preferensi dengan localStorage

8. **Optimasi Performa**
   - Gunakan dynamic imports untuk code splitting
   - Implementasi lazy loading untuk gambar dan komponen berat
   - Monitor ukuran bundle CSS dan JavaScript

## Konvensi Penamaan dengan Atomic Design

Untuk menghindari konflik dengan komponen bawaan Quasar dan memperjelas hierarki Atomic Design:
- Prefix "App" untuk semua komponen kustom
- Atoms: AppButton, AppInput, AppIcon, dll
- Molecules: AppFormField, AppSearchBar, dll
- Organisms: AppNavbar, AppFooter, AppProductCard, dll
- Templates: HomeTemplate, ProductListTemplate, dll

## Prinsip Atomic Design yang Wajib Diikuti

1. **Reusabilitas**: Komponen atom dan molekul harus dapat digunakan kembali di berbagai konteks
2. **Single Responsibility**: Setiap komponen harus memiliki satu tanggung jawab yang jelas
3. **Composability**: Komponen level tinggi dibuat dari komposisi komponen level rendah
4. **Dokumentasi**: Setiap komponen harus memiliki dokumentasi yang jelas tentang props, slots, dan penggunaannya
5. **Konsistensi**: Gunakan pola desain yang konsisten di seluruh komponen

## Referensi Penting

- [Dokumentasi Tailwind CSS](https://tailwindcss.com/docs)
- [Dokumentasi Quasar](https://quasar.dev/docs)
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Quasar + Tailwind Best Practices](https://quasar.dev/style/tailwindcss)
