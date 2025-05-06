<template>
  <div class="contact-page">
    <AppNavbar :navItems="navItems" />
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Kontak Kami</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div></div>
        <div></div>
      </div>
    </div>
    
    <AppFooter :socialLinks="socialLinks" :footerLinkSections="footerLinkSections" />
  </div>
</template>