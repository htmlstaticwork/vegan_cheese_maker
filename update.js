const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const brandLogo = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="logo-icon"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg> Cheevo`;

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf-8');

  // Skip auth pages since they don't have header/footer, but do update their brand name & logo
  if (file === 'login.html' || file === 'signup.html') {
    content = content.replace(/Artisanal Vegan/g, 'Cheevo');
    content = content.replace(/<i data-lucide="leaf" class="logo-icon"><\/i> Cheevo/g, brandLogo);
    content = content.replace(/<i data-lucide="leaf" class="logo-icon"><\/i>\s*Cheevo/g, brandLogo);
    fs.writeFileSync(path.join(dir, file), content);
    return;
  }

  // Dashboard updates
  if (file === 'dashboard.html') {
    content = content.replace(/Artisanal Vegan/g, 'Cheevo');
    content = content.replace(/<i data-lucide="leaf" class="logo-icon"><\/i> Cheevo/g, brandLogo);
    content = content.replace(/<i data-lucide="leaf" class="logo-icon"><\/i>\s*Cheevo/g, brandLogo);
    
    // Fix Dashboard sidebar links
    content = content.replace(/<nav class="dashboard-nav">[\s\S]*?<\/nav>/, `<nav class="dashboard-nav">
        <a href="dashboard.html" class="dash-nav-item active"><i data-lucide="layout-dashboard"></i> Overview</a>
        <a href="dashboard.html" class="dash-nav-item"><i data-lucide="shopping-bag"></i> Orders</a>
        <a href="dashboard.html" class="dash-nav-item"><i data-lucide="calendar"></i> Subscriptions</a>
        <a href="dashboard.html" class="dash-nav-item"><i data-lucide="star"></i> Preferences</a>
        <a href="dashboard.html" class="dash-nav-item"><i data-lucide="credit-card"></i> Billing</a>
        <a href="dashboard.html" class="dash-nav-item"><i data-lucide="settings"></i> Settings</a>
      </nav>`);
    fs.writeFileSync(path.join(dir, file), content);
    return;
  }

  // Replace Header
  const headerRegex = /<header class="site-header">[\s\S]*?<\/header>/;
  const newHeader = `<header class="site-header">
    <div class="header-container">
      <a href="index.html" class="logo">
        ${brandLogo}
      </a>
      <nav class="nav-menu">
        <a href="index.html" class="nav-link ${file === 'index.html' ? 'active' : ''}">Home 1</a>
        <a href="home-2.html" class="nav-link ${file === 'home-2.html' ? 'active' : ''}">Home 2</a>
        <a href="about.html" class="nav-link ${file === 'about.html' ? 'active' : ''}">About</a>
        <a href="shop.html" class="nav-link ${file === 'shop.html' ? 'active' : ''}">Shop</a>
        <a href="subscription.html" class="nav-link ${file === 'subscription.html' ? 'active' : ''}">Subscription</a>
        <a href="collections.html" class="nav-link ${file === 'collections.html' ? 'active' : ''}">Collections</a>
        <a href="contact.html" class="nav-link ${file === 'contact.html' ? 'active' : ''}">Contact</a>
        <a href="dashboard.html" class="nav-link">Dashboard</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" id="theme-toggle"><i data-lucide="moon"></i></button>
        <button class="icon-btn" id="rtl-toggle"><i data-lucide="align-right"></i></button>
        <a href="login.html" class="nav-link login-btn" style="margin-inline-end:0.5rem;">Login</a>
        <a href="shop.html" class="btn btn-secondary">Shop Now</a>
        <a href="subscription.html" class="btn btn-primary">Subscribe</a>
      </div>
      <button class="icon-btn menu-toggle" id="menu-toggle"><i data-lucide="menu"></i></button>
    </div>
  </header>`;

  // Replace Mobile Menu
  const mobileRegex = /<div class="mobile-menu-overlay" id="mobile-menu">[\s\S]*?<\/div>\s*<\/div>|<div class="mobile-menu-overlay" id="mobile-menu">[\s\S]*?<\/div>\s*<div class="mobile-actions">[\s\S]*?<\/div>\s*<\/div>/;
  const newMobile = `<div class="mobile-menu-overlay" id="mobile-menu">
    <div class="mobile-menu-header">
      <a href="index.html" class="logo">${brandLogo}</a>
      <button class="icon-btn" id="close-menu"><i data-lucide="x"></i></button>
    </div>
    <div class="mobile-nav-links">
      <a href="index.html" class="${file === 'index.html' ? 'active' : ''}">Home 1</a>
      <a href="home-2.html" class="${file === 'home-2.html' ? 'active' : ''}">Home 2</a>
      <a href="about.html" class="${file === 'about.html' ? 'active' : ''}">About</a>
      <a href="shop.html" class="${file === 'shop.html' ? 'active' : ''}">Shop</a>
      <a href="subscription.html" class="${file === 'subscription.html' ? 'active' : ''}">Subscription</a>
      <a href="collections.html" class="${file === 'collections.html' ? 'active' : ''}">Collections</a>
      <a href="contact.html" class="${file === 'contact.html' ? 'active' : ''}">Contact</a>
      <a href="dashboard.html" class="${file === 'dashboard.html' ? 'active' : ''}">Dashboard</a>
    </div>
    <div class="mobile-actions">
      <div style="display:flex; gap:1rem; margin-bottom:1rem; padding-left:1rem;">
        <button class="icon-btn" id="mobile-theme-toggle" style="background:var(--border-color);"><i data-lucide="moon"></i></button>
        <button class="icon-btn" id="mobile-rtl-toggle" style="background:var(--border-color);"><i data-lucide="align-right"></i></button>
      </div>
      <a href="login.html" class="btn btn-secondary text-center">Login</a>
      <a href="shop.html" class="btn btn-secondary text-center">Shop Now</a>
      <a href="subscription.html" class="btn btn-primary text-center">Subscribe</a>
    </div>
  </div>`;
  
  if (content.match(headerRegex)) {
    content = content.replace(headerRegex, newHeader);
  }
  
  // Custom mobile menu replace approach since regex might fail with nested divs
  const mobileStart = content.indexOf('<div class="mobile-menu-overlay" id="mobile-menu">');
  if (mobileStart !== -1) {
    const mainStart = content.indexOf('<main', mobileStart);
    if (mainStart !== -1) {
      content = content.substring(0, mobileStart) + newMobile + '\n\n  ' + content.substring(mainStart);
    }
  }

  // Update Footer (Brand Name)
  content = content.replace(/Artisanal Vegan/g, 'Cheevo');
  content = content.replace(/<i data-lucide="leaf" class="logo-icon"><\/i> Cheevo/g, brandLogo);
  content = content.replace(/<i data-lucide="leaf" class="logo-icon"><\/i>\s*Cheevo/g, brandLogo);

  // For specific pages, add background image to hero if missing
  if (file === 'about.html') {
    if (!content.includes('about-hero-bg')) {
      content = content.replace(
        /<section style="background:var\(--card-bg\); padding:6rem 2rem; text-align:center; border-bottom:1px solid var\(--border-color\);">/, 
        `<section style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=1974&auto=format&fit=crop'); background-size: cover; background-position: center; padding: 10rem 2rem; text-align:center; color: #fff;">`
      );
      content = content.replace(/<h1 class="section-title"/, `<h1 style="font-family:var(--font-heading); font-size:4rem;" class="section-title"`);
    }
  }
  if (file === 'shop.html') {
    if (!content.includes('shop-hero-bg')) {
      content = content.replace(
        /<section class="shop-header">/,
        `<section class="shop-header" style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop'); background-size: cover; background-position: center; color: #fff; padding: 10rem 2rem;">`
      );
    }
  }
  if (file === 'contact.html') {
    if (!content.includes('contact-hero-bg')) {
      content = content.replace(
        /<section style="background:var\(--card-bg\); padding:6rem 2rem; text-align:center; border-bottom:1px solid var\(--border-color\);">/,
        `<section style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=1974&auto=format&fit=crop'); background-size: cover; background-position: center; padding: 10rem 2rem; text-align:center; color: #fff;">`
      );
      content = content.replace(/<h1 class="section-title"/, `<h1 style="font-family:var(--font-heading); font-size:4rem;" class="section-title"`);
    }
  }

  // Remove Pariings link from footer
  content = content.replace(/<a href="pairing-guide.html".*?<\/a>/, `<a href="collections.html">Collections</a>`);

  // Ensure button sizes are consistent in Header -> wait, styling fixes are for style.css

  fs.writeFileSync(path.join(dir, file), content);
});
console.log('Update complete.');
