-- =====================================================================
-- BioStorefront PostgreSQL Database Schema & Seed Data
-- Database Name: biodata
-- Target: PostgreSQL 12+ (Tested on PostgreSQL 17)
-- =====================================================================

-- Run this command first if you need to create the database:
-- CREATE DATABASE biodata;
-- \c biodata;

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
-- SEED DATA: PRODUCTS (131 ITEMS)
-- ---------------------------------------------------------------------
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_001', 'Black Embroidered Kurti', 'Premium cotton black kurti with intricate thread embroidery on neckline.', 699, 1199, 42, 'Fashion', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80', 4.7, 87, 12, 'FA-001', '["kurti","ethnic","black","embroidery"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_002', 'Pure Chanderi Silk Saree', 'Handwoven pure Chanderi silk saree with zari border and matching blouse piece.', 1499, 2499, 40, 'Fashion', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', 4.9, 134, 8, 'FA-002', '["saree","silk","chanderi","festive"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_003', 'Oversized Cotton Graphic Tee', '240 GSM heavyweight combed cotton oversized t-shirt with aesthetic typography.', 549, 899, 39, 'Fashion', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80', 4.8, 181, 25, 'FA-003', '["tshirt","oversized","streetwear","cotton"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_004', 'Classic Indigo Denim Jacket', 'Timeless vintage wash denim jacket with brass button closures and dual chest pockets.', 1899, 2999, 37, 'Fashion', 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80', 4.5, 228, 14, 'FA-004', '["denim","jacket","outerwear","indigo"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_005', 'Slim Fit Linen Casual Shirt', 'Breathable 100% French linen button-down shirt designed for effortless summer styling.', 899, 1499, 40, 'Fashion', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', 4.2, 275, 19, 'FA-005', '["shirt","linen","casual","summer"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_006', 'Floral Print Anarkali Gown', 'Flared floor-length georgette Anarkali dress featuring digital botanical prints.', 1299, 2199, 41, 'Fashion', 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=600&q=80', 3.9, 322, 6, 'FA-006', '["anarkali","gown","ethnic","floral"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_007', 'Relaxed Fit Cargo Trousers', 'Durable cotton twill utility cargo pants with 6 pockets and adjustable ankle cuffs.', 999, 1699, 41, 'Fashion', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80', 3.9, 369, 15, 'FA-007', '["cargos","trousers","streetwear","utility"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_008', 'Cashmere Knit Turtleneck Sweater', 'Ultra-soft blended cashmere ribbed turtleneck sweater offering lightweight warmth.', 1799, 2799, 36, 'Fashion', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80', 4.1, 416, 9, 'FA-008', '["sweater","cashmere","winter","knitwear"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_009', 'Boho Tiered Maxi Dress', 'Flowy tiered maxi dress with ruffled hemlines and soft pastel tones.', 1149, 1899, 39, 'Fashion', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80', 4.5, 83, 11, 'FA-009', '["dress","maxi","boho","summer"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_010', 'Tailored Single-Breasted Blazer', 'Structured modern-fit blazer with notch lapel, satin lining, and welt pockets.', 2499, 3999, 38, 'Fashion', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', 4.8, 130, 7, 'FA-010', '["blazer","formal","office","outerwear"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_011', 'Embroidered Chikankari Kurta', 'Authentic handcrafted Lucknowi Chikankari modal kurta with intricate floral motifs.', 849, 1399, 39, 'Fashion', 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80', 4.9, 177, 17, 'FA-011', '["chikankari","kurta","lucknowi","traditional"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_012', 'High-Waist Wide Leg Jeans', 'Retro 90s aesthetic high-waisted wide-leg jeans in light vintage stone wash.', 1199, 1999, 40, 'Fashion', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', 4.8, 224, 13, 'FA-012', '["jeans","denim","wide-leg","vintage"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_013', 'Fleece Lined Pullover Hoodie', 'Cozy brushed fleece hoodie with kangaroo pocket and double-layered drawstring hood.', 899, 1499, 40, 'Fashion', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80', 4.5, 271, 22, 'FA-013', '["hoodie","fleece","streetwear","winter"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_014', 'Banarasi Brocade Silk Dupatta', 'Royal golden woven Banarasi silk dupatta to elevate any ethnic outfit.', 599, 999, 40, 'Fashion', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80', 4.1, 318, 18, 'FA-014', '["dupatta","banarasi","brocade","festive"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_015', 'Satin Silk Evening Slip Dress', 'Lustrous cowl-neck satin slip dress in emerald green with adjustable criss-cross straps.', 1399, 2299, 39, 'Fashion', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80', 3.9, 365, 5, 'FA-015', '["satin","slip-dress","partywear","evening"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_016', 'Casual Cuban Collar Striped Shirt', 'Breezy resort-wear short sleeve shirt with retro vertical stripes and camp collar.', 749, 1199, 38, 'Fashion', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80', 4, 412, 14, 'FA-016', '["shirt","cuban-collar","stripes","resort"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_017', 'Quilted Puffer Winter Vest', 'Water-resistant lightweight thermal puffer gilet with stand collar and zip pockets.', 1299, 1999, 35, 'Fashion', 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80', 4.2, 79, 8, 'FA-017', '["vest","puffer","quilted","winter"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_018', 'Pleated Velvet Party Skirt', 'Shimmering metallic velvet accordion pleat midi skirt with comfortable elastic waist.', 899, 1499, 40, 'Fashion', 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80', 4.6, 126, 10, 'FA-018', '["skirt","velvet","pleated","party"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_019', 'Cotton Linen Kurta Pajama Set', 'Classic mandarin collar men’s kurta in breathable cotton-linen paired with churidar.', 1199, 1999, 40, 'Fashion', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', 4.8, 173, 12, 'FA-019', '["kurta-set","menswear","ethnic","linen"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_020', 'Cropped Teddy Bear Fleece Jacket', 'Super soft faux sherpa plush cropped jacket with zippered front and funnel neck.', 1499, 2399, 38, 'Fashion', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', 4.9, 220, 7, 'FA-020', '["jacket","fleece","teddy","warm"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_021', 'Oxidized Silver Pearl Jhumkas', 'Traditional dome-shaped oxidized silver jhumkis accented with clustered mini pearls.', 349, 599, 42, 'Jewellery', 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80', 4.7, 267, 24, 'JE-021', '["jhumka","oxidized","earrings","silver"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_022', 'Kundan Choker Necklace Set', 'Exquisite handcrafted Jadau Kundan bridal choker with matching earrings and maang tikka.', 999, 1899, 47, 'Jewellery', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', 4.4, 314, 8, 'JE-022', '["kundan","necklace","choker","bridal"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_023', '18K Gold Plated Evil Eye Bracelet', 'Delicate cubic zirconia evil eye charm bracelet finished in gleaming 18K yellow gold.', 449, 799, 44, 'Jewellery', 'https://images.unsplash.com/photo-1611591475870-07e1591f4a9b?w=600&q=80', 4, 361, 30, 'JE-023', '["bracelet","evil-eye","gold-plated","minimal"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_024', 'Vintage Bohemian Ring Stack (Set of 6)', 'Assorted carved antique silver-tone midi and knuckle rings with turquoise stone accents.', 399, 699, 43, 'Jewellery', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', 3.9, 408, 18, 'JE-024', '["rings","stackable","boho","vintage"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_025', 'Baroque Freshwater Pearl Pendant', 'Natural irregular baroque freshwater cultured pearl suspended on a dainty 14K gold chain.', 599, 999, 40, 'Jewellery', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80', 4, 75, 15, 'JE-025', '["pearl","pendant","necklace","classic"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_026', 'Temple Art Lakshmi Coin Bangles', 'Intricately embossed matte antique gold Lakshmi kasu bangles (pair of 2).', 799, 1399, 43, 'Jewellery', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80', 4.3, 122, 9, 'JE-026', '["bangles","temple","lakshmi","antique"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_027', 'Minimalist Chunky Huggie Hoops', 'Hypoallergenic stainless steel thick huggie hoop earrings with mirror polish.', 299, 499, 40, 'Jewellery', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80', 4.6, 169, 26, 'JE-027', '["hoops","earrings","minimal","gold"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_028', 'Emerald Cut Solitaire Pendant', 'Radiant emerald-cut AAA grade cubic zirconia necklace prong-set in 925 sterling silver.', 499, 899, 44, 'Jewellery', 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80', 4.9, 216, 16, 'JE-028', '["solitaire","cz","pendant","silver"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_029', 'Rose Gold Floral Anklet Pair', 'Graceful twin chain rose-gold anklets with bell charms and sparkling crystal daisies.', 379, 599, 37, 'Jewellery', 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=600&q=80', 4.9, 263, 20, 'JE-029', '["anklet","payal","rose-gold","floral"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_030', 'Meenakari Enamel Statement Ear Drops', 'Vibrant hand-painted Jaipur Meenakari lotus dangle earrings with seed bead fringe.', 499, 799, 38, 'Jewellery', 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=600&q=80', 4.6, 310, 12, 'JE-030', '["meenakari","earrings","handcrafted","jaipur"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_031', 'Adjustable Sterling Silver Cuff Bangle', 'Hammered texture solid 925 hallmarked silver open cuff bangle suitable for daily wear.', 699, 1199, 42, 'Jewellery', 'https://images.unsplash.com/photo-1611591475870-07e1591f4a9b?w=600&q=80', 4.3, 357, 14, 'JE-031', '["cuff","bangle","silver","unisex"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_032', 'Geometric Crystal Statement Ring', 'Modernist hexagonal faceted zirconia cocktail ring mounted on a tapered band.', 349, 549, 36, 'Jewellery', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80', 4, 404, 17, 'JE-032', '["ring","crystal","statement","modern"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_033', 'Layered Paperclip Link Chain', 'Trendy dual-strand trombone paperclip link chain necklace with lobster clasp.', 449, 749, 40, 'Jewellery', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80', 3.9, 71, 21, 'JE-033', '["necklace","paperclip","chain","layered"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_034', 'Tribal Afghan Mirror Choker', 'Authentic banjara tribal ghungroo neckpiece featuring reflective glass mirror work.', 549, 899, 39, 'Jewellery', 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80', 4.1, 118, 10, 'JE-034', '["choker","tribal","mirror","afghan"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_035', 'Opal Stone Constellation Studs', 'Ethereal iridescent synthetic fire opal studs in celestial north star settings.', 329, 599, 45, 'Jewellery', 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&q=80', 4.4, 165, 28, 'JE-035', '["studs","opal","celestial","dainty"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_036', 'Cloudfoam Knit Running Sneakers', 'Ultra-responsive cushioning with breathable mesh knit upper and slip-resistant rubber outsole.', 1299, 2299, 43, 'Footwear', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', 4.7, 212, 18, 'FO-036', '["sneakers","running","cloudfoam","athletics"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_037', 'Handcrafted Tan Penny Loafers', 'Supple vegan leather slip-on penny loafers with padded arch support and hand-stitched apron.', 1899, 3299, 42, 'Footwear', 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80', 4.9, 259, 9, 'FO-037', '["loafers","leather","formal","tan"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_038', 'Chunky Sole Streetwear High-Tops', 'Bold ankle-support high-top court kicks with vulcanized platform soles and dual lace options.', 1499, 2499, 40, 'Footwear', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80', 4.8, 306, 11, 'FO-038', '["sneakers","high-top","streetwear","chunky"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_039', 'Strappy Block Heel Sandal', 'Comfortable 2.5-inch block heel dress sandals with ankle wrap buckles and cushioned footbed.', 999, 1699, 41, 'Footwear', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', 4.6, 353, 14, 'FO-039', '["heels","sandals","block-heel","party"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_040', 'All-Terrain Chelsea Ankle Boots', 'Weatherproof matte finish pull-on Chelsea boots with elasticated side panels and rugged tread.', 2199, 3499, 37, 'Footwear', 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80', 4.2, 400, 8, 'FO-040', '["boots","chelsea","leather","winter"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_041', 'Orthopedic Cushion Cloud Slides', 'Thick ergonomic EVA foam pillow slides offering instant relief for tired feet and indoor wear.', 499, 899, 44, 'Footwear', 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80', 4, 67, 35, 'FO-041', '["slides","comfort","footwear","waterproof"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_042', 'Classic Canvas Low-Top Plimsolls', 'Everyday durable 12oz cotton duck canvas lace-up shoes with contrast foxing stripe.', 699, 1199, 42, 'Footwear', 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80', 3.9, 114, 22, 'FO-042', '["canvas","sneakers","casual","skate"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_043', 'Pointed Toe Stiletto Court Shoes', 'Sophisticated 3.5-inch slim heel pumps in glossy patent nude finish with non-slip pads.', 1399, 2299, 39, 'Footwear', 'https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?w=600&q=80', 4.1, 161, 7, 'FO-043', '["heels","stiletto","court-shoes","glamour"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_044', 'Braided Kolhapuri Leather Chappals', 'Handcrafted Kolhapur authentic toe-ring flats with t-strap braiding and pom-pom detailing.', 649, 999, 35, 'Footwear', 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&q=80', 4.5, 208, 16, 'FO-044', '["kolhapuri","ethnic","chappal","handmade"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_045', 'Trail Grip Hiking Trekking Shoes', 'Heavy-duty waterproof nubuck composite hiking shoes with shock-absorbing midsole.', 1999, 3199, 38, 'Footwear', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80', 4.8, 255, 10, 'FO-045', '["hiking","boots","outdoor","trekking"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_046', 'Knit Slip-On Walking Espadrilles', 'Braided jute sole slip-on espadrilles with stretch breathable upper and flexible footbed.', 799, 1299, 38, 'Footwear', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80', 4.9, 302, 19, 'FO-046', '["espadrilles","slip-on","summer","jute"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_047', 'Double Monk Strap Oxford Shoes', 'Burnished mahogany leather double monk strap shoes with gunmetal pin buckles.', 2299, 3699, 38, 'Footwear', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80', 4.8, 349, 6, 'FO-047', '["oxfords","monk-strap","leather","luxury"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_048', 'Metallic Mule Flats with Bow', 'Chic backless mule flats with knotted bow upper and comfortable low stacked heel.', 749, 1199, 38, 'Footwear', 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&q=80', 4.5, 396, 15, 'FO-048', '["mules","flats","slip-on","chic"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_049', 'Retro Gumsole Court Tennis Trainers', 'Vintage 80s inspired court sneakers with suede overlays and heritage gum rubber outsole.', 1199, 1999, 40, 'Footwear', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80', 4.1, 63, 20, 'FO-049', '["trainers","retro","sneakers","tennis"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_050', 'Velvet Embellished Wedding Mojaris', 'Traditional Punjabi juttis crafted in rich maroon velvet with zardozi thread embroidery.', 899, 1499, 40, 'Footwear', 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80', 3.9, 110, 13, 'FO-050', '["mojari","jutti","ethnic","wedding"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_051', 'Ultra Light SPF 50+ Sunscreen Gel', 'Invisible broad-spectrum SPF 50 PA++++ water gel sunscreen with zero white cast.', 399, 599, 33, 'Beauty', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80', 3.9, 157, 28, 'BE-051', '["sunscreen","skincare","spf","non-greasy"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_052', '10% Niacinamide + Zinc Face Serum', 'Pore-refining lightweight serum that balances sebum production and fades dark spots.', 449, 699, 36, 'Beauty', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', 4.2, 204, 32, 'BE-052', '["serum","niacinamide","skincare","blemish"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_053', 'Velvet Matte Liquid Lipstick Trio', '12-hour smudge-proof transfer-resistant liquid lipsticks in 3 universally flattering nude tones.', 599, 999, 40, 'Beauty', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80', 4.5, 251, 25, 'BE-053', '["lipstick","matte","makeup","lip-color"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_054', 'Hyaluronic Acid Deep Moisture Cream', 'Triple molecular weight hyaluronic acid barrier moisturizer infused with ceramides.', 499, 799, 38, 'Beauty', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', 4.8, 298, 20, 'BE-054', '["moisturizer","hyaluronic","hydration","barrier"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_055', 'Rosewater Glow Face Mist & Toner', 'Pure steam-distilled Kannauj damascena rosewater for instant dewy skin hydration.', 299, 499, 40, 'Beauty', 'https://images.unsplash.com/photo-1608248597359-545239a58406?w=600&q=80', 4.9, 345, 22, 'BE-055', '["toner","mist","rosewater","glow"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_056', 'Cold-Pressed Moroccan Argan Hair Oil', 'Rich golden organic argan elixir to tame frizz, mend split ends, and add salon-like shine.', 649, 999, 35, 'Beauty', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', 4.7, 392, 17, 'BE-056', '["haircare","argan-oil","hair-serum","frizz"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_057', 'Vitamin C Brightening Daily Cleanser', 'Gentle foaming face wash infused with Kakadu plum vitamin C to revive tired dull skin.', 349, 549, 36, 'Beauty', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', 4.4, 59, 30, 'BE-057', '["facewash","vitamin-c","cleanser","brightening"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_058', 'Volumizing Waterproof Kohl Kajal', 'Intense 24-hour jet black matte eyeliner pencil enriched with soothing almond oil.', 249, 399, 38, 'Beauty', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80', 4.1, 106, 40, 'BE-058', '["kajal","eyeliner","smudgeproof","kohl"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_059', 'French Vanilla Whipped Body Butter', 'Velvety whipped raw shea and cocoa butter with an intoxicating warm bourbon vanilla aroma.', 479, 799, 40, 'Beauty', 'https://images.unsplash.com/photo-1567928815116-f6d34b4c7308?w=600&q=80', 3.9, 153, 15, 'BE-059', '["body-butter","vanilla","shea","bodycare"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_060', 'Oud & Bergamot Luxury Eau De Parfum (50ml)', 'Long-lasting intoxicating artisanal blend of smoky agarwood, sparkling citrus, and cedar.', 1299, 2199, 41, 'Beauty', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80', 4, 200, 12, 'BE-060', '["perfume","fragrance","oud","luxury"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_061', 'Green Tea & Salicylic Detox Clay Mask', 'Mineral French green clay mask with 2% BHA to decongest pores without stripping moisture.', 429, 699, 39, 'Beauty', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', 4.3, 247, 18, 'BE-061', '["clay-mask","detox","acne","greentea"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_062', 'Tinted Peptide Lip Therapy Plumper', 'High-shine nourishing peptide lip butter delivering instant volume and juicy berry tint.', 379, 599, 37, 'Beauty', 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?w=600&q=80', 4.6, 294, 26, 'BE-062', '["lip-balm","peptides","gloss","plumping"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_063', 'Rose Quartz Gua Sha & Facial Roller Set', '100% natural grade A rose quartz face sculptor to contour jawlines and boost lymphatic drainage.', 549, 899, 39, 'Beauty', 'https://images.unsplash.com/photo-1590156221185-c5215233d650?w=600&q=80', 4.9, 341, 14, 'BE-063', '["gua-sha","skincare-tool","facial","rosequartz"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_064', 'Keratin Damage Repair Hair Mask', 'Intense reconstructive protein mask to repair chemically damaged, bleached, or heat-styled hair.', 599, 999, 40, 'Beauty', 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80', 4.9, 388, 16, 'BE-064', '["hair-mask","keratin","repair","haircare"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_065', 'Gentle Micellar Bi-Phase Makeup Remover', 'Lifts waterproof mascara and stubborn makeup effortlessly with no tugging or greasy residue.', 299, 499, 40, 'Beauty', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', 4.7, 55, 24, 'BE-065', '["makeup-remover","micellar","skincare","cleanse"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_066', 'Classic Aviator Polarized Sunglasses', 'Full UV400 polarized teardrop aviators in gunmetal alloy frame with scratch-resistant lenses.', 799, 1499, 47, 'Accessories', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 4.3, 102, 20, 'AC-066', '["sunglasses","polarized","aviator","eyewear"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_067', 'Genuine Full-Grain Leather Wallet', 'Slim bifold vintage pull-up leather wallet equipped with RFID blocking security lining.', 699, 1199, 42, 'Accessories', 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80', 4, 149, 24, 'AC-067', '["wallet","leather","rfid","accessories"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_068', 'Minimalist Minimal Bauhaus Analog Watch', 'Clean 40mm stainless steel case with Japanese quartz movement and genuine mesh strap.', 1499, 2499, 40, 'Accessories', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80', 3.9, 196, 11, 'AC-068', '["watch","analog","minimalist","accessories"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_069', 'Structured Vegan Leather Tote Handbag', 'Spacious work-to-weekend shoulder tote with zippered laptop compartment and gold hardware.', 1299, 2199, 41, 'Accessories', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80', 4, 243, 13, 'AC-069', '["handbag","tote","vegan-leather","bag"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_070', 'Reversible Italian Leather Formal Belt', 'Dual-tone black and cognac brown 35mm dress belt with twist-lock brushed steel buckle.', 549, 899, 39, 'Accessories', 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80', 4.4, 290, 19, 'AC-070', '["belt","leather","reversible","formal"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_071', 'Pashmina Cashmere Silk Blend Scarf', 'Feather-light warm woven shawl with delicate eyelash fringe and jacquard paisley border.', 699, 1199, 42, 'Accessories', 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80', 4.7, 337, 16, 'AC-071', '["scarf","pashmina","cashmere","winter"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_072', 'Water-Repellent Commuter Laptop Backpack', '25L anti-theft tech backpack with 15.6 inch padded sleeve, USB port, and luggage strap.', 1599, 2699, 41, 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', 4.9, 384, 15, 'AC-072', '["backpack","laptop-bag","commute","travel"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_073', 'Chunky Knit Beanie Cap', 'Thermal ribbed acrylic watch cap with turn-up cuff for cozy autumn and winter warmth.', 349, 599, 42, 'Accessories', 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80', 4.8, 51, 30, 'AC-073', '["beanie","winter","knit","cap"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_074', 'Vintage Retro Cat-Eye Sunglasses', 'Chic tortoiseshell acetate cat-eye shades with 100% UV protection and gradient tint.', 649, 1099, 41, 'Accessories', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', 4.6, 98, 18, 'AC-074', '["sunglasses","cateye","retro","eyewear"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_075', 'Compact Key Organizer & EDC Pocket Clip', 'Aircraft-grade anodized aluminum silent key holder holding up to 8 keys cleanly.', 399, 699, 43, 'Accessories', 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&q=80', 4.2, 145, 25, 'AC-075', '["keychain","edc","organizer","minimal"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_076', 'Canvas Crossbody Sling Bag', 'Hands-free compact chest sling with adjustable strap, earphone port, and security pocket.', 699, 1199, 42, 'Accessories', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', 4, 192, 17, 'AC-076', '["sling-bag","crossbody","canvas","travel"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_077', 'Classic Silk Pocket Square (Set of 3)', 'Hand-rolled pure mulberry silk pocket squares in floral, polka dot, and solid shades.', 449, 799, 44, 'Accessories', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80', 3.9, 239, 20, 'AC-077', '["pocket-square","silk","formal","accessories"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_078', 'Automatic Travel Compact Umbrella', 'One-touch auto open/close 10-rib wind-defying teflon coated umbrella with slip cover.', 499, 849, 41, 'Accessories', 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&q=80', 4.1, 286, 22, 'AC-078', '["umbrella","travel","rain","windproof"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_079', 'Active Noise Cancelling True Wireless Earbuds', 'Bluetooth 5.3 earbuds featuring 35dB hybrid ANC, low-latency gaming mode, and 36hr battery.', 1899, 3499, 46, 'Electronics', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', 4.4, 333, 16, 'EL-079', '["earbuds","anc","wireless","audio"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_080', '1.43” AMOLED Smartwatch with Bluetooth Calling', 'Always-on crisp AMOLED display with heart rate, SpO2 sensor, 100+ sports modes, and zinc casing.', 2199, 3999, 45, 'Electronics', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80', 4.8, 380, 14, 'EL-080', '["smartwatch","fitness","amoled","wearable"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_081', 'Compact 68-Key Hot-Swap Mechanical Keyboard', 'RGB backlit mechanical typing keyboard with pre-lubed linear red switches and detachable USB-C.', 2499, 4299, 42, 'Electronics', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', 4.9, 47, 10, 'EL-081', '["keyboard","mechanical","rgb","gaming"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_082', 'Portable 360° Waterproof Bluetooth Speaker', 'IPX7 floating rugged outdoor sound cylinder with punchy passive bass radiators and 14h playtime.', 1199, 1999, 40, 'Electronics', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80', 4.8, 94, 20, 'EL-082', '["speaker","bluetooth","waterproof","audio"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_083', '65W GaN Fast Charger with 3 Ports', 'Pocket-sized gallium nitride power adapter fast charging laptops, tablets, and phones simultaneously.', 899, 1499, 40, 'Electronics', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', 4.5, 141, 28, 'EL-083', '["charger","gan","usbc","fast-charging"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_084', 'MagSafe Compatible 10,000mAh Power Bank', 'Strong magnetic snap-on wireless portable charger with foldable kickstand and digital LED % display.', 1399, 2299, 39, 'Electronics', 'https://images.unsplash.com/photo-1609592424300-d26b527848f2?w=600&q=80', 4.2, 188, 18, 'EL-084', '["powerbank","magsafe","wireless","battery"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_085', 'Studio Monitoring Over-Ear Headphones', 'Precision-tuned 50mm neodymium drivers for crystalline highs, rich mids, and memory-foam pads.', 2799, 4499, 38, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', 3.9, 235, 8, 'EL-085', '["headphones","over-ear","audiophile","studio"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_086', 'Ergonomic Vertical Wireless Mouse', 'Natural handshake 57° vertical posture mouse reducing wrist strain with silent click buttons.', 799, 1399, 43, 'Electronics', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', 3.9, 282, 22, 'EL-086', '["mouse","ergonomic","office","wireless"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_087', 'Full HD USB Streaming Webcam with Privacy Cover', '1080p 60FPS autofocus wide-angle video conference camera with dual noise-cancelling mics.', 1099, 1899, 42, 'Electronics', 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&q=80', 4.2, 329, 15, 'EL-087', '["webcam","streaming","workfromhome","video"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_088', 'Smart LED Light Bar for Monitors', 'Asymmetric anti-glare screen hanging light bar with touch controls and adjustable color temperature.', 999, 1699, 41, 'Electronics', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80', 4.5, 376, 17, 'EL-088', '["screenbar","desk-setup","lighting","productivity"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_089', '3-in-1 Foldable Wireless Charging Station', 'Sleek travel charging stand for iPhone, Apple Watch, and AirPods at the same time.', 1299, 2099, 38, 'Electronics', 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&q=80', 4.8, 43, 14, 'EL-089', '["charger","wireless","dock","apple"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_090', 'Universal Travel Adapter with PD 30W', 'Worldwide all-in-one plug adapter compatible with EU, US, UK, AU and 150+ countries.', 649, 1099, 41, 'Electronics', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', 4.9, 90, 25, 'EL-090', '["travel-adapter","plug","universal","travel"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_091', 'Aromatherapy Soy Wax Scented Candle', 'Clean burning 100% natural soy wax infused with French lavender and sweet vanilla bean.', 449, 799, 44, 'Home & Living', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80', 4.7, 137, 25, 'HO-091', '["candle","aromatherapy","homedecor","relax"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_092', 'Handmade Matte Ceramic Coffee Mug', 'Studio handcrafted speckled stoneware pottery mug with ergonomic comfortable handle (350ml).', 349, 599, 42, 'Home & Living', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', 4.4, 184, 30, 'HO-092', '["mug","ceramic","coffee","kitchen"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_093', 'Minimalist Nordic Wooden Desk Lamp', 'Scandinavian solid beech wood articulated arm table lamp with warm white LED bulb.', 1299, 2199, 41, 'Home & Living', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80', 4.1, 231, 12, 'HO-093', '["lamp","lighting","desk","nordic"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_094', 'Boho Tufted Geometric Cushion Cover', 'Textured woven heavy cotton canvas throw pillow cover with tufting and corner tassels.', 399, 699, 43, 'Home & Living', 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80', 3.9, 278, 22, 'HO-094', '["cushion","pillow","boho","livingroom"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_095', 'Indoor Ceramic Planter with Wooden Stand', 'White fluted cylinder ceramic plant pot paired with natural cross-braced acacia wood stand.', 699, 1199, 42, 'Home & Living', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', 4, 325, 15, 'HO-095', '["planter","plants","ceramic","decor"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_096', 'Ultrasonic Woodgrain Essential Oil Diffuser', 'Whisper-quiet 400ml ultrasonic cool mist humidifier with 7 soothing ambient LED lights.', 899, 1499, 40, 'Home & Living', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80', 4.3, 372, 18, 'HO-096', '["diffuser","aromatherapy","humidifier","wellness"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_097', 'Double-Walled Insulated French Press (800ml)', 'Mirror-polished 304 food-grade stainless steel cafetiere that keeps coffee hot for 2 hours.', 1199, 1899, 37, 'Home & Living', 'https://images.unsplash.com/photo-1517668808822-9ebd02f2a8ea?w=600&q=80', 4.6, 419, 14, 'HO-097', '["french-press","coffee","kitchen","stainless"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_098', 'Bamboo Bathtub Caddy Tray', 'Expandable waterproof organic bamboo bath bridge with book holder, wine glass slot, and phone rest.', 999, 1699, 41, 'Home & Living', 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80', 4.9, 86, 10, 'HO-098', '["bath","bamboo","tray","spa"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_099', 'Textured Waffle Cotton Bath Towel', 'Quick-drying honeycomb weave 100% Turkish cotton large bath sheet in slate grey.', 499, 899, 44, 'Home & Living', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80', 4.9, 133, 26, 'HO-099', '["towel","cotton","waffle","bath"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_100', 'Abstract Minimalist Botanical Wall Art (Framed)', 'High-definition giclée print on textured linen paper housed in a natural oak composite frame.', 799, 1399, 43, 'Home & Living', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80', 4.7, 180, 16, 'HO-100', '["wall-art","decor","framed","prints"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_101', 'Pure Brass Incense Burner & Dhoop Stand', 'Handcrafted solid golden brass agarbatti holder with ash-catcher tray for daily puja and zen.', 349, 599, 42, 'Home & Living', 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80', 4.3, 227, 28, 'HO-101', '["incense","brass","spiritual","home"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_102', 'Modern Minimalist Wall Clock (12-inch)', 'Non-ticking silent sweep quartz wall clock with clean matte numerals and glass cover.', 749, 1299, 42, 'Home & Living', 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80', 4, 274, 17, 'HO-102', '["clock","wall-clock","silent","minimal"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_103', 'Block Printed Cotton Mulmul Saree', 'Bagru hand-block printed lightweight mulmul cotton saree for daily office elegance.', 999, 1599, 38, 'Fashion', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80', 4.9, 372, 12, 'FA-103', '["saree","mulmul","cotton","blockprint"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_104', 'Oversized Flannel Plaid Shirt', 'Heavyweight brushed cotton plaid flannel shirt with twin button flap pockets.', 849, 1399, 39, 'Fashion', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', 4.7, 411, 18, 'FA-104', '["shirt","flannel","plaid","casual"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_105', 'Khadi Cotton Short Kurta', 'Eco-friendly breathable handspun khadi short tunic shirt in earthy beige.', 599, 999, 40, 'Fashion', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', 4.1, 450, 22, 'FA-105', '["kurta","khadi","menswear","casual"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_106', 'Silk Jacquard Festive Kurta Set', 'Lustrous self-woven silk blend kurta with contrast pyjama and churidar.', 1699, 2799, 39, 'Fashion', 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80', 4.3, 79, 7, 'FA-106', '["kurta","festive","silk","ethnic"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_107', 'Faux Leather Biker Motorcycle Jacket', 'Asymmetrical zip moto jacket with notched lapel and zippered cuff hardware.', 2199, 3599, 39, 'Fashion', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80', 4.9, 118, 6, 'FA-107', '["leather-jacket","biker","outerwear","black"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_108', 'Tiered Linen Midi Sun Dress', 'Sun-drenched buttercup yellow linen dress with shirred back and puff sleeves.', 1049, 1699, 38, 'Fashion', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80', 4.7, 157, 15, 'FA-108', '["dress","midi","linen","summer"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_109', 'Washed Denim Dungaree Overalls', 'Relaxed fit classic utility denim overalls with adjustable buckle bib straps.', 1349, 2199, 39, 'Fashion', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', 4.1, 196, 10, 'FA-109', '["dungarees","overalls","denim","casual"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_110', 'Kashmiri Jhumka with Hair Chain', 'Traditional Kashmiri hanging sahara ear chains connecting to pearl-fringed bell drops.', 499, 899, 44, 'Jewellery', 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80', 4.3, 235, 14, 'JE-110', '["jhumka","kashmiri","hair-chain","bridal"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_111', 'Beaded Multi-Layer Choker Set', 'Turquoise and terracotta glass seed bead necklace stack with adjustable tie.', 379, 649, 42, 'Jewellery', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80', 4.9, 274, 20, 'JE-111', '["choker","beaded","boho","layers"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_112', 'Swarovski Zirconia Nose Pin (Clip-On)', 'No-piercing required sparkling floral clip-on nose stud in gold-plated brass.', 249, 449, 45, 'Jewellery', 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&q=80', 4.7, 313, 35, 'JE-112', '["nose-pin","clip-on","cz","ethnic"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_113', 'Antique Oxidized Waist Belt (Kamarbandh)', 'Sculpted ghungroo hanging waist chain to accent sarees and lehengas.', 699, 1299, 46, 'Jewellery', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80', 4.1, 352, 8, 'JE-113', '["kamarbandh","waist-belt","oxidized","belly-chain"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_114', 'Enamel Daisy Flower Stud Earrings', 'Cute pastel yellow and white enamel daisy button studs with push-back pin.', 289, 499, 42, 'Jewellery', 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=600&q=80', 4.3, 391, 25, 'JE-114', '["studs","daisy","floral","cute"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_115', 'Breathable Slip-On Mesh Loafers', 'Ultra lightweight air-mesh slip-ons designed for high mileage and hot days.', 799, 1299, 38, 'Footwear', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80', 4.8, 430, 22, 'FO-115', '["loafers","mesh","walking","comfort"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_116', 'Ankle Strap Espadrille Wedges', 'Jute wrapped 3-inch wedge heel sandals with soft microfiber suede upper.', 1199, 1899, 37, 'Footwear', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', 4.7, 59, 12, 'FO-116', '["wedges","espadrilles","summer","heels"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_117', 'Reflective Night Runner Road Shoes', 'High-visibility 3M reflective road trainers with carbon-reinforced torsion plate.', 1699, 2799, 39, 'Footwear', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', 4.2, 98, 14, 'FO-117', '["running","reflective","marathon","sport"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_118', 'Classic Derby Brogue Formal Shoes', 'Wingtip perforated derby dress shoes in rich burnished chestnut brown.', 2099, 3399, 38, 'Footwear', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80', 4.3, 137, 8, 'FO-118', '["brogues","derby","leather","formal"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_119', 'Avocado Cold Pressed Nourishing Night Oil', 'Deeply restoring night face oil rich in vitamins A, D, and E for supple glowing skin.', 549, 899, 39, 'Beauty', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', 4.8, 176, 17, 'BE-119', '["face-oil","avocado","nightcare","skincare"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_120', 'Mineral Rice Water Clarifying Shampoo', 'Sulfate-free fermented rice water shampoo that prevents hair fall and adds gloss.', 399, 599, 33, 'Beauty', 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80', 4.7, 215, 26, 'BE-120', '["shampoo","ricewater","haircare","sulfate-free"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_121', 'Exfoliating Walnut & Apricot Face Scrub', 'Micro-fine walnut beads and cold-pressed apricot kernel oil to buff away dead cells.', 299, 449, 33, 'Beauty', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', 4.2, 254, 21, 'BE-121', '["scrub","exfoliate","walnut","cleanse"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_122', '24K Gold Foil Revitalizing Eye Patches (30 Pairs)', 'Hydrogel collagen cooling eye patches that soothe morning puffiness and under-eye circles.', 499, 849, 41, 'Beauty', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', 4.3, 293, 19, 'BE-122', '["eye-mask","hydrogel","gold","anti-fatigue"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_123', 'Minimalist Titanium Key Carabiner', 'Sturdy ultra-light aerospace grade titanium keychain clip with integrated bottle opener.', 349, 599, 42, 'Accessories', 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&q=80', 4.8, 332, 30, 'AC-123', '["carabiner","titanium","edc","keys"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_124', 'Silk Twill Hair Scrunchies (Pack of 5)', '100% pure Mulberry silk scrunchies that eliminate creases, tugging, and hair breakage.', 299, 499, 40, 'Accessories', 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80', 4.7, 371, 45, 'AC-124', '["scrunchie","silk","hair","accessories"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_125', 'Retro Hexagonal Metal Frame Glasses', 'Slim gold wireframe geometric reading and blue-light computer glasses.', 699, 1199, 42, 'Accessories', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 4.2, 410, 18, 'AC-125', '["glasses","spectacles","hexagonal","vintage"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_126', 'Adjustable Aluminum Laptop Riser Stand', 'Foldable ventilated desktop elevation mount supporting all 10-17 inch laptops.', 699, 1199, 42, 'Electronics', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', 4.3, 449, 24, 'EL-126', '["laptop-stand","aluminum","desk","ergonomic"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_127', 'Braided 100W USB-C to USB-C Cable (2m)', 'Nylon armored heavy-duty cable with E-marker chip supporting 100W PD charging.', 349, 599, 42, 'Electronics', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', 4.8, 78, 50, 'EL-127', '["cable","usbc","100w","fastcharge"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_128', 'RGB Gaming Mousepad with Wireless Charging', '800x300mm extended micro-textured surface with 15W fast phone charging zone.', 999, 1699, 41, 'Electronics', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', 4.7, 117, 15, 'EL-128', '["mousepad","rgb","wireless-charging","gaming"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_129', 'Handwoven Natural Jute Floor Rug (4x6 ft)', 'Organic eco-friendly braided golden jute area rug adding rustic bohemian charm.', 1499, 2499, 40, 'Home & Living', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80', 4.2, 156, 8, 'HO-129', '["rug","jute","boho","homedecor"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_130', 'Borosilicate Glass Water Bottle with Bamboo Lid', 'Eco-conscious thermal-shock proof 750ml glass drinkware with silicone protective sleeve.', 449, 799, 44, 'Home & Living', 'https://images.unsplash.com/photo-1517668808822-9ebd02f2a8ea?w=600&q=80', 4.3, 195, 28, 'HO-130', '["bottle","glass","bamboo","sustainable"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
INSERT INTO products (id, name, description, price, original_price, discount, category, image, rating, review_count, stock, sku, tags, featured)
VALUES ('prod_131', 'Set of 4 Marble & Acacia Wood Coasters', 'Geometric split white marble and natural acacia beverage coasters with felt base pads.', 399, 699, 43, 'Home & Living', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', 4.8, 234, 22, 'HO-131', '["coasters","marble","wood","dining"]'::jsonb, false)
ON CONFLICT (id) DO NOTHING;
