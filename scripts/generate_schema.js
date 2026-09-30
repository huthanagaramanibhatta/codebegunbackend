const fs = require('fs');
const path = require('path');
const catalog = require('../src/db/productsCatalog');

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

let sql = `-- =====================================================================
-- BioStorefront PostgreSQL Database Schema & Seed Data
-- Database Name: biodata
-- Target: PostgreSQL 12+ (Tested on PostgreSQL 17)
-- =====================================================================

-- Run this command first if you need to create the database:
-- CREATE DATABASE biodata;
-- \\c biodata;

-- ---------------------------------------------------------------------
-- 1. PRODUCTS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    discount INTEGER DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    image TEXT,
    rating NUMERIC(3, 1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    sku VARCHAR(100),
    tags JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes for storefront queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- ---------------------------------------------------------------------
-- 2. ORDERS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50),
    product_name VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_id VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ---------------------------------------------------------------------
-- 3. STORE PROFILE TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS store_profile (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    name VARCHAR(255) NOT NULL,
    handle VARCHAR(100) NOT NULL,
    description TEXT,
    avatar TEXT,
    banner TEXT,
    followers VARCHAR(50),
    location VARCHAR(100),
    verified BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 4. ANALYTICS STATS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS analytics_stats (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'global',
    visitors INTEGER DEFAULT 1248,
    checkout_started INTEGER DEFAULT 560,
    completed_purchases INTEGER DEFAULT 412,
    cart_abandoned INTEGER DEFAULT 148,
    avg_page_load_ms INTEGER DEFAULT 312,
    product_views JSONB DEFAULT '{}'::jsonb,
    product_clicks JSONB DEFAULT '{}'::jsonb,
    funnel_visitors INTEGER DEFAULT 1248,
    funnel_product_clicks INTEGER DEFAULT 842,
    funnel_checkout_started INTEGER DEFAULT 560,
    funnel_purchases INTEGER DEFAULT 412,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- SEED DATA: STORE PROFILE
-- ---------------------------------------------------------------------
INSERT INTO store_profile (id, name, handle, description, avatar, banner, followers, location, verified)
VALUES (
    'default',
    'BioStorefront',
    '@biostorefront',
    '✨ Curated fashion & lifestyle picks. Tap to shop directly — no redirects, ever.',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&q=80',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    '42.8K',
    'Mumbai, India',
    true
)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------
-- SEED DATA: ANALYTICS STATS
-- ---------------------------------------------------------------------
INSERT INTO analytics_stats (
    id, visitors, checkout_started, completed_purchases, cart_abandoned,
    avg_page_load_ms, product_views, product_clicks,
    funnel_visitors, funnel_product_clicks, funnel_checkout_started, funnel_purchases
)
VALUES (
    'global', 1248, 560, 412, 148,
    312, '{}'::jsonb, '{}'::jsonb,
    1248, 842, 560, 412
)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------
-- SEED DATA: PRODUCTS (` + catalog.length + ` ITEMS)
-- ---------------------------------------------------------------------
`;

catalog.forEach(p => {
  const id = escapeSql(p.id);
  const name = escapeSql(p.name);
  const desc = escapeSql(p.description || '');
  const price = Number(p.price) || 0;
  const origPrice = p.originalPrice != null ? Number(p.originalPrice) : price;
  const discount = Number(p.discount) || 0;
  const cat = escapeSql(p.category || 'General');
  const img = escapeSql(p.image || '');
  const rating = Number(p.rating) || 0;
  const reviewCount = Number(p.reviewCount) || 0;
  const stock = p.stock != null ? Number(p.stock) : 10;
  const sku = escapeSql(p.sku || '');
  const tags = escapeSql(JSON.stringify(p.tags || []));
  const featured = Boolean(p.featured);

  sql += `INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES (${id}, ${name}, ${desc}, ${price}, ${origPrice}, ${discount}, ${cat}, ${img}, ${rating}, ${reviewCount}, ${stock}, ${sku}, ${tags}::jsonb, ${featured})
ON CONFLICT (id) DO NOTHING;\n`;
});

const outputPath = path.join(__dirname, '..', 'schema.sql');
fs.writeFileSync(outputPath, sql, 'utf-8');
console.log('Successfully created schema.sql at:', outputPath);
