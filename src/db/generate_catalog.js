const fs = require('fs');
const path = require('path');

const categories = {
  Fashion: [
    { name: 'Black Embroidered Kurti', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80', tags: ['kurti', 'ethnic', 'black', 'embroidery'], stock: 12, feat: true, desc: 'Premium cotton black kurti with intricate thread embroidery on neckline.' },
    { name: 'Pure Chanderi Silk Saree', price: 1499, orig: 2499, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', tags: ['saree', 'silk', 'chanderi', 'festive'], stock: 8, feat: true, desc: 'Handwoven pure Chanderi silk saree with zari border and matching blouse piece.' },
    { name: 'Oversized Cotton Graphic Tee', price: 549, orig: 899, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80', tags: ['tshirt', 'oversized', 'streetwear', 'cotton'], stock: 25, feat: false, desc: '240 GSM heavyweight combed cotton oversized t-shirt with aesthetic typography.' },
    { name: 'Classic Indigo Denim Jacket', price: 1899, orig: 2999, img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80', tags: ['denim', 'jacket', 'outerwear', 'indigo'], stock: 14, feat: true, desc: 'Timeless vintage wash denim jacket with brass button closures and dual chest pockets.' },
    { name: 'Slim Fit Linen Casual Shirt', price: 899, orig: 1499, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', tags: ['shirt', 'linen', 'casual', 'summer'], stock: 19, feat: false, desc: 'Breathable 100% French linen button-down shirt designed for effortless summer styling.' },
    { name: 'Floral Print Anarkali Gown', price: 1299, orig: 2199, img: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=600&q=80', tags: ['anarkali', 'gown', 'ethnic', 'floral'], stock: 6, feat: false, desc: 'Flared floor-length georgette Anarkali dress featuring digital botanical prints.' },
    { name: 'Relaxed Fit Cargo Trousers', price: 999, orig: 1699, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80', tags: ['cargos', 'trousers', 'streetwear', 'utility'], stock: 15, feat: false, desc: 'Durable cotton twill utility cargo pants with 6 pockets and adjustable ankle cuffs.' },
    { name: 'Cashmere Knit Turtleneck Sweater', price: 1799, orig: 2799, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80', tags: ['sweater', 'cashmere', 'winter', 'knitwear'], stock: 9, feat: true, desc: 'Ultra-soft blended cashmere ribbed turtleneck sweater offering lightweight warmth.' },
    { name: 'Boho Tiered Maxi Dress', price: 1149, orig: 1899, img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80', tags: ['dress', 'maxi', 'boho', 'summer'], stock: 11, feat: false, desc: 'Flowy tiered maxi dress with ruffled hemlines and soft pastel tones.' },
    { name: 'Tailored Single-Breasted Blazer', price: 2499, orig: 3999, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', tags: ['blazer', 'formal', 'office', 'outerwear'], stock: 7, feat: true, desc: 'Structured modern-fit blazer with notch lapel, satin lining, and welt pockets.' },
    { name: 'Embroidered Chikankari Kurta', price: 849, orig: 1399, img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80', tags: ['chikankari', 'kurta', 'lucknowi', 'traditional'], stock: 17, feat: false, desc: 'Authentic handcrafted Lucknowi Chikankari modal kurta with intricate floral motifs.' },
    { name: 'High-Waist Wide Leg Jeans', price: 1199, orig: 1999, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', tags: ['jeans', 'denim', 'wide-leg', 'vintage'], stock: 13, feat: false, desc: 'Retro 90s aesthetic high-waisted wide-leg jeans in light vintage stone wash.' },
    { name: 'Fleece Lined Pullover Hoodie', price: 899, orig: 1499, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80', tags: ['hoodie', 'fleece', 'streetwear', 'winter'], stock: 22, feat: false, desc: 'Cozy brushed fleece hoodie with kangaroo pocket and double-layered drawstring hood.' },
    { name: 'Banarasi Brocade Silk Dupatta', price: 599, orig: 999, img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80', tags: ['dupatta', 'banarasi', 'brocade', 'festive'], stock: 18, feat: false, desc: 'Royal golden woven Banarasi silk dupatta to elevate any ethnic outfit.' },
    { name: 'Satin Silk Evening Slip Dress', price: 1399, orig: 2299, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80', tags: ['satin', 'slip-dress', 'partywear', 'evening'], stock: 5, feat: true, desc: 'Lustrous cowl-neck satin slip dress in emerald green with adjustable criss-cross straps.' },
    { name: 'Casual Cuban Collar Striped Shirt', price: 749, orig: 1199, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80', tags: ['shirt', 'cuban-collar', 'stripes', 'resort'], stock: 14, feat: false, desc: 'Breezy resort-wear short sleeve shirt with retro vertical stripes and camp collar.' },
    { name: 'Quilted Puffer Winter Vest', price: 1299, orig: 1999, img: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80', tags: ['vest', 'puffer', 'quilted', 'winter'], stock: 8, feat: false, desc: 'Water-resistant lightweight thermal puffer gilet with stand collar and zip pockets.' },
    { name: 'Pleated Velvet Party Skirt', price: 899, orig: 1499, img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80', tags: ['skirt', 'velvet', 'pleated', 'party'], stock: 10, feat: false, desc: 'Shimmering metallic velvet accordion pleat midi skirt with comfortable elastic waist.' },
    { name: 'Cotton Linen Kurta Pajama Set', price: 1199, orig: 1999, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', tags: ['kurta-set', 'menswear', 'ethnic', 'linen'], stock: 12, feat: false, desc: 'Classic mandarin collar men’s kurta in breathable cotton-linen paired with churidar.' },
    { name: 'Cropped Teddy Bear Fleece Jacket', price: 1499, orig: 2399, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', tags: ['jacket', 'fleece', 'teddy', 'warm'], stock: 7, feat: false, desc: 'Super soft faux sherpa plush cropped jacket with zippered front and funnel neck.' }
  ],

  Jewellery: [
    { name: 'Oxidized Silver Pearl Jhumkas', price: 349, orig: 599, img: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80', tags: ['jhumka', 'oxidized', 'earrings', 'silver'], stock: 24, feat: true, desc: 'Traditional dome-shaped oxidized silver jhumkis accented with clustered mini pearls.' },
    { name: 'Kundan Choker Necklace Set', price: 999, orig: 1899, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', tags: ['kundan', 'necklace', 'choker', 'bridal'], stock: 8, feat: true, desc: 'Exquisite handcrafted Jadau Kundan bridal choker with matching earrings and maang tikka.' },
    { name: '18K Gold Plated Evil Eye Bracelet', price: 449, orig: 799, img: 'https://images.unsplash.com/photo-1611591475870-07e1591f4a9b?w=600&q=80', tags: ['bracelet', 'evil-eye', 'gold-plated', 'minimal'], stock: 30, feat: true, desc: 'Delicate cubic zirconia evil eye charm bracelet finished in gleaming 18K yellow gold.' },
    { name: 'Vintage Bohemian Ring Stack (Set of 6)', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', tags: ['rings', 'stackable', 'boho', 'vintage'], stock: 18, feat: false, desc: 'Assorted carved antique silver-tone midi and knuckle rings with turquoise stone accents.' },
    { name: 'Baroque Freshwater Pearl Pendant', price: 599, orig: 999, img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80', tags: ['pearl', 'pendant', 'necklace', 'classic'], stock: 15, feat: false, desc: 'Natural irregular baroque freshwater cultured pearl suspended on a dainty 14K gold chain.' },
    { name: 'Temple Art Lakshmi Coin Bangles', price: 799, orig: 1399, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80', tags: ['bangles', 'temple', 'lakshmi', 'antique'], stock: 9, feat: false, desc: 'Intricately embossed matte antique gold Lakshmi kasu bangles (pair of 2).' },
    { name: 'Minimalist Chunky Huggie Hoops', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80', tags: ['hoops', 'earrings', 'minimal', 'gold'], stock: 26, feat: false, desc: 'Hypoallergenic stainless steel thick huggie hoop earrings with mirror polish.' },
    { name: 'Emerald Cut Solitaire Pendant', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80', tags: ['solitaire', 'cz', 'pendant', 'silver'], stock: 16, feat: false, desc: 'Radiant emerald-cut AAA grade cubic zirconia necklace prong-set in 925 sterling silver.' },
    { name: 'Rose Gold Floral Anklet Pair', price: 379, orig: 599, img: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=600&q=80', tags: ['anklet', 'payal', 'rose-gold', 'floral'], stock: 20, feat: false, desc: 'Graceful twin chain rose-gold anklets with bell charms and sparkling crystal daisies.' },
    { name: 'Meenakari Enamel Statement Ear Drops', price: 499, orig: 799, img: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=600&q=80', tags: ['meenakari', 'earrings', 'handcrafted', 'jaipur'], stock: 12, feat: false, desc: 'Vibrant hand-painted Jaipur Meenakari lotus dangle earrings with seed bead fringe.' },
    { name: 'Adjustable Sterling Silver Cuff Bangle', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1611591475870-07e1591f4a9b?w=600&q=80', tags: ['cuff', 'bangle', 'silver', 'unisex'], stock: 14, feat: false, desc: 'Hammered texture solid 925 hallmarked silver open cuff bangle suitable for daily wear.' },
    { name: 'Geometric Crystal Statement Ring', price: 349, orig: 549, img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80', tags: ['ring', 'crystal', 'statement', 'modern'], stock: 17, feat: false, desc: 'Modernist hexagonal faceted zirconia cocktail ring mounted on a tapered band.' },
    { name: 'Layered Paperclip Link Chain', price: 449, orig: 749, img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80', tags: ['necklace', 'paperclip', 'chain', 'layered'], stock: 21, feat: false, desc: 'Trendy dual-strand trombone paperclip link chain necklace with lobster clasp.' },
    { name: 'Tribal Afghan Mirror Choker', price: 549, orig: 899, img: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80', tags: ['choker', 'tribal', 'mirror', 'afghan'], stock: 10, feat: false, desc: 'Authentic banjara tribal ghungroo neckpiece featuring reflective glass mirror work.' },
    { name: 'Opal Stone Constellation Studs', price: 329, orig: 599, img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&q=80', tags: ['studs', 'opal', 'celestial', 'dainty'], stock: 28, feat: false, desc: 'Ethereal iridescent synthetic fire opal studs in celestial north star settings.' }
  ],

  Footwear: [
    { name: 'Cloudfoam Knit Running Sneakers', price: 1299, orig: 2299, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', tags: ['sneakers', 'running', 'cloudfoam', 'athletics'], stock: 18, feat: true, desc: 'Ultra-responsive cushioning with breathable mesh knit upper and slip-resistant rubber outsole.' },
    { name: 'Handcrafted Tan Penny Loafers', price: 1899, orig: 3299, img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80', tags: ['loafers', 'leather', 'formal', 'tan'], stock: 9, feat: true, desc: 'Supple vegan leather slip-on penny loafers with padded arch support and hand-stitched apron.' },
    { name: 'Chunky Sole Streetwear High-Tops', price: 1499, orig: 2499, img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80', tags: ['sneakers', 'high-top', 'streetwear', 'chunky'], stock: 11, feat: false, desc: 'Bold ankle-support high-top court kicks with vulcanized platform soles and dual lace options.' },
    { name: 'Strappy Block Heel Sandal', price: 999, orig: 1699, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', tags: ['heels', 'sandals', 'block-heel', 'party'], stock: 14, feat: true, desc: 'Comfortable 2.5-inch block heel dress sandals with ankle wrap buckles and cushioned footbed.' },
    { name: 'All-Terrain Chelsea Ankle Boots', price: 2199, orig: 3499, img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80', tags: ['boots', 'chelsea', 'leather', 'winter'], stock: 8, feat: false, desc: 'Weatherproof matte finish pull-on Chelsea boots with elasticated side panels and rugged tread.' },
    { name: 'Orthopedic Cushion Cloud Slides', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80', tags: ['slides', 'comfort', 'footwear', 'waterproof'], stock: 35, feat: false, desc: 'Thick ergonomic EVA foam pillow slides offering instant relief for tired feet and indoor wear.' },
    { name: 'Classic Canvas Low-Top Plimsolls', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80', tags: ['canvas', 'sneakers', 'casual', 'skate'], stock: 22, feat: false, desc: 'Everyday durable 12oz cotton duck canvas lace-up shoes with contrast foxing stripe.' },
    { name: 'Pointed Toe Stiletto Court Shoes', price: 1399, orig: 2299, img: 'https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?w=600&q=80', tags: ['heels', 'stiletto', 'court-shoes', 'glamour'], stock: 7, feat: false, desc: 'Sophisticated 3.5-inch slim heel pumps in glossy patent nude finish with non-slip pads.' },
    { name: 'Braided Kolhapuri Leather Chappals', price: 649, orig: 999, img: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&q=80', tags: ['kolhapuri', 'ethnic', 'chappal', 'handmade'], stock: 16, feat: false, desc: 'Handcrafted Kolhapur authentic toe-ring flats with t-strap braiding and pom-pom detailing.' },
    { name: 'Trail Grip Hiking Trekking Shoes', price: 1999, orig: 3199, img: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80', tags: ['hiking', 'boots', 'outdoor', 'trekking'], stock: 10, feat: false, desc: 'Heavy-duty waterproof nubuck composite hiking shoes with shock-absorbing midsole.' },
    { name: 'Knit Slip-On Walking Espadrilles', price: 799, orig: 1299, img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80', tags: ['espadrilles', 'slip-on', 'summer', 'jute'], stock: 19, feat: false, desc: 'Braided jute sole slip-on espadrilles with stretch breathable upper and flexible footbed.' },
    { name: 'Double Monk Strap Oxford Shoes', price: 2299, orig: 3699, img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80', tags: ['oxfords', 'monk-strap', 'leather', 'luxury'], stock: 6, feat: false, desc: 'Burnished mahogany leather double monk strap shoes with gunmetal pin buckles.' },
    { name: 'Metallic Mule Flats with Bow', price: 749, orig: 1199, img: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&q=80', tags: ['mules', 'flats', 'slip-on', 'chic'], stock: 15, feat: false, desc: 'Chic backless mule flats with knotted bow upper and comfortable low stacked heel.' },
    { name: 'Retro Gumsole Court Tennis Trainers', price: 1199, orig: 1999, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80', tags: ['trainers', 'retro', 'sneakers', 'tennis'], stock: 20, feat: false, desc: 'Vintage 80s inspired court sneakers with suede overlays and heritage gum rubber outsole.' },
    { name: 'Velvet Embellished Wedding Mojaris', price: 899, orig: 1499, img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80', tags: ['mojari', 'jutti', 'ethnic', 'wedding'], stock: 13, feat: false, desc: 'Traditional Punjabi juttis crafted in rich maroon velvet with zardozi thread embroidery.' }
  ],

  Beauty: [
    { name: 'Ultra Light SPF 50+ Sunscreen Gel', price: 399, orig: 599, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80', tags: ['sunscreen', 'skincare', 'spf', 'non-greasy'], stock: 28, feat: true, desc: 'Invisible broad-spectrum SPF 50 PA++++ water gel sunscreen with zero white cast.' },
    { name: '10% Niacinamide + Zinc Face Serum', price: 449, orig: 699, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', tags: ['serum', 'niacinamide', 'skincare', 'blemish'], stock: 32, feat: true, desc: 'Pore-refining lightweight serum that balances sebum production and fades dark spots.' },
    { name: 'Velvet Matte Liquid Lipstick Trio', price: 599, orig: 999, img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80', tags: ['lipstick', 'matte', 'makeup', 'lip-color'], stock: 25, feat: true, desc: '12-hour smudge-proof transfer-resistant liquid lipsticks in 3 universally flattering nude tones.' },
    { name: 'Hyaluronic Acid Deep Moisture Cream', price: 499, orig: 799, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', tags: ['moisturizer', 'hyaluronic', 'hydration', 'barrier'], stock: 20, feat: false, desc: 'Triple molecular weight hyaluronic acid barrier moisturizer infused with ceramides.' },
    { name: 'Rosewater Glow Face Mist & Toner', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1608248597359-545239a58406?w=600&q=80', tags: ['toner', 'mist', 'rosewater', 'glow'], stock: 22, feat: false, desc: 'Pure steam-distilled Kannauj damascena rosewater for instant dewy skin hydration.' },
    { name: 'Cold-Pressed Moroccan Argan Hair Oil', price: 649, orig: 999, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', tags: ['haircare', 'argan-oil', 'hair-serum', 'frizz'], stock: 17, feat: false, desc: 'Rich golden organic argan elixir to tame frizz, mend split ends, and add salon-like shine.' },
    { name: 'Vitamin C Brightening Daily Cleanser', price: 349, orig: 549, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', tags: ['facewash', 'vitamin-c', 'cleanser', 'brightening'], stock: 30, feat: false, desc: 'Gentle foaming face wash infused with Kakadu plum vitamin C to revive tired dull skin.' },
    { name: 'Volumizing Waterproof Kohl Kajal', price: 249, orig: 399, img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80', tags: ['kajal', 'eyeliner', 'smudgeproof', 'kohl'], stock: 40, feat: false, desc: 'Intense 24-hour jet black matte eyeliner pencil enriched with soothing almond oil.' },
    { name: 'French Vanilla Whipped Body Butter', price: 479, orig: 799, img: 'https://images.unsplash.com/photo-1567928815116-f6d34b4c7308?w=600&q=80', tags: ['body-butter', 'vanilla', 'shea', 'bodycare'], stock: 15, feat: false, desc: 'Velvety whipped raw shea and cocoa butter with an intoxicating warm bourbon vanilla aroma.' },
    { name: 'Oud & Bergamot Luxury Eau De Parfum (50ml)', price: 1299, orig: 2199, img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80', tags: ['perfume', 'fragrance', 'oud', 'luxury'], stock: 12, feat: true, desc: 'Long-lasting intoxicating artisanal blend of smoky agarwood, sparkling citrus, and cedar.' },
    { name: 'Green Tea & Salicylic Detox Clay Mask', price: 429, orig: 699, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', tags: ['clay-mask', 'detox', 'acne', 'greentea'], stock: 18, feat: false, desc: 'Mineral French green clay mask with 2% BHA to decongest pores without stripping moisture.' },
    { name: 'Tinted Peptide Lip Therapy Plumper', price: 379, orig: 599, img: 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?w=600&q=80', tags: ['lip-balm', 'peptides', 'gloss', 'plumping'], stock: 26, feat: false, desc: 'High-shine nourishing peptide lip butter delivering instant volume and juicy berry tint.' },
    { name: 'Rose Quartz Gua Sha & Facial Roller Set', price: 549, orig: 899, img: 'https://images.unsplash.com/photo-1590156221185-c5215233d650?w=600&q=80', tags: ['gua-sha', 'skincare-tool', 'facial', 'rosequartz'], stock: 14, feat: false, desc: '100% natural grade A rose quartz face sculptor to contour jawlines and boost lymphatic drainage.' },
    { name: 'Keratin Damage Repair Hair Mask', price: 599, orig: 999, img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80', tags: ['hair-mask', 'keratin', 'repair', 'haircare'], stock: 16, feat: false, desc: 'Intense reconstructive protein mask to repair chemically damaged, bleached, or heat-styled hair.' },
    { name: 'Gentle Micellar Bi-Phase Makeup Remover', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', tags: ['makeup-remover', 'micellar', 'skincare', 'cleanse'], stock: 24, feat: false, desc: 'Lifts waterproof mascara and stubborn makeup effortlessly with no tugging or greasy residue.' }
  ],

  Accessories: [
    { name: 'Classic Aviator Polarized Sunglasses', price: 799, orig: 1499, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', tags: ['sunglasses', 'polarized', 'aviator', 'eyewear'], stock: 20, feat: true, desc: 'Full UV400 polarized teardrop aviators in gunmetal alloy frame with scratch-resistant lenses.' },
    { name: 'Genuine Full-Grain Leather Wallet', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80', tags: ['wallet', 'leather', 'rfid', 'accessories'], stock: 24, feat: true, desc: 'Slim bifold vintage pull-up leather wallet equipped with RFID blocking security lining.' },
    { name: 'Minimalist Minimal Bauhaus Analog Watch', price: 1499, orig: 2499, img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80', tags: ['watch', 'analog', 'minimalist', 'accessories'], stock: 11, feat: true, desc: 'Clean 40mm stainless steel case with Japanese quartz movement and genuine mesh strap.' },
    { name: 'Structured Vegan Leather Tote Handbag', price: 1299, orig: 2199, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80', tags: ['handbag', 'tote', 'vegan-leather', 'bag'], stock: 13, feat: false, desc: 'Spacious work-to-weekend shoulder tote with zippered laptop compartment and gold hardware.' },
    { name: 'Reversible Italian Leather Formal Belt', price: 549, orig: 899, img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80', tags: ['belt', 'leather', 'reversible', 'formal'], stock: 19, feat: false, desc: 'Dual-tone black and cognac brown 35mm dress belt with twist-lock brushed steel buckle.' },
    { name: 'Pashmina Cashmere Silk Blend Scarf', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80', tags: ['scarf', 'pashmina', 'cashmere', 'winter'], stock: 16, feat: false, desc: 'Feather-light warm woven shawl with delicate eyelash fringe and jacquard paisley border.' },
    { name: 'Water-Repellent Commuter Laptop Backpack', price: 1599, orig: 2699, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', tags: ['backpack', 'laptop-bag', 'commute', 'travel'], stock: 15, feat: false, desc: '25L anti-theft tech backpack with 15.6 inch padded sleeve, USB port, and luggage strap.' },
    { name: 'Chunky Knit Beanie Cap', price: 349, orig: 599, img: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80', tags: ['beanie', 'winter', 'knit', 'cap'], stock: 30, feat: false, desc: 'Thermal ribbed acrylic watch cap with turn-up cuff for cozy autumn and winter warmth.' },
    { name: 'Vintage Retro Cat-Eye Sunglasses', price: 649, orig: 1099, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', tags: ['sunglasses', 'cateye', 'retro', 'eyewear'], stock: 18, feat: false, desc: 'Chic tortoiseshell acetate cat-eye shades with 100% UV protection and gradient tint.' },
    { name: 'Compact Key Organizer & EDC Pocket Clip', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&q=80', tags: ['keychain', 'edc', 'organizer', 'minimal'], stock: 25, feat: false, desc: 'Aircraft-grade anodized aluminum silent key holder holding up to 8 keys cleanly.' },
    { name: 'Canvas Crossbody Sling Bag', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', tags: ['sling-bag', 'crossbody', 'canvas', 'travel'], stock: 17, feat: false, desc: 'Hands-free compact chest sling with adjustable strap, earphone port, and security pocket.' },
    { name: 'Classic Silk Pocket Square (Set of 3)', price: 449, orig: 799, img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80', tags: ['pocket-square', 'silk', 'formal', 'accessories'], stock: 20, feat: false, desc: 'Hand-rolled pure mulberry silk pocket squares in floral, polka dot, and solid shades.' },
    { name: 'Automatic Travel Compact Umbrella', price: 499, orig: 849, img: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&q=80', tags: ['umbrella', 'travel', 'rain', 'windproof'], stock: 22, feat: false, desc: 'One-touch auto open/close 10-rib wind-defying teflon coated umbrella with slip cover.' }
  ],

  Electronics: [
    { name: 'Active Noise Cancelling True Wireless Earbuds', price: 1899, orig: 3499, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', tags: ['earbuds', 'anc', 'wireless', 'audio'], stock: 16, feat: true, desc: 'Bluetooth 5.3 earbuds featuring 35dB hybrid ANC, low-latency gaming mode, and 36hr battery.' },
    { name: '1.43” AMOLED Smartwatch with Bluetooth Calling', price: 2199, orig: 3999, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80', tags: ['smartwatch', 'fitness', 'amoled', 'wearable'], stock: 14, feat: true, desc: 'Always-on crisp AMOLED display with heart rate, SpO2 sensor, 100+ sports modes, and zinc casing.' },
    { name: 'Compact 68-Key Hot-Swap Mechanical Keyboard', price: 2499, orig: 4299, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', tags: ['keyboard', 'mechanical', 'rgb', 'gaming'], stock: 10, feat: true, desc: 'RGB backlit mechanical typing keyboard with pre-lubed linear red switches and detachable USB-C.' },
    { name: 'Portable 360° Waterproof Bluetooth Speaker', price: 1199, orig: 1999, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80', tags: ['speaker', 'bluetooth', 'waterproof', 'audio'], stock: 20, feat: false, desc: 'IPX7 floating rugged outdoor sound cylinder with punchy passive bass radiators and 14h playtime.' },
    { name: '65W GaN Fast Charger with 3 Ports', price: 899, orig: 1499, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', tags: ['charger', 'gan', 'usbc', 'fast-charging'], stock: 28, feat: false, desc: 'Pocket-sized gallium nitride power adapter fast charging laptops, tablets, and phones simultaneously.' },
    { name: 'MagSafe Compatible 10,000mAh Power Bank', price: 1399, orig: 2299, img: 'https://images.unsplash.com/photo-1609592424300-d26b527848f2?w=600&q=80', tags: ['powerbank', 'magsafe', 'wireless', 'battery'], stock: 18, feat: false, desc: 'Strong magnetic snap-on wireless portable charger with foldable kickstand and digital LED % display.' },
    { name: 'Studio Monitoring Over-Ear Headphones', price: 2799, orig: 4499, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', tags: ['headphones', 'over-ear', 'audiophile', 'studio'], stock: 8, feat: true, desc: 'Precision-tuned 50mm neodymium drivers for crystalline highs, rich mids, and memory-foam pads.' },
    { name: 'Ergonomic Vertical Wireless Mouse', price: 799, orig: 1399, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', tags: ['mouse', 'ergonomic', 'office', 'wireless'], stock: 22, feat: false, desc: 'Natural handshake 57° vertical posture mouse reducing wrist strain with silent click buttons.' },
    { name: 'Full HD USB Streaming Webcam with Privacy Cover', price: 1099, orig: 1899, img: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600&q=80', tags: ['webcam', 'streaming', 'workfromhome', 'video'], stock: 15, feat: false, desc: '1080p 60FPS autofocus wide-angle video conference camera with dual noise-cancelling mics.' },
    { name: 'Smart LED Light Bar for Monitors', price: 999, orig: 1699, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80', tags: ['screenbar', 'desk-setup', 'lighting', 'productivity'], stock: 17, feat: false, desc: 'Asymmetric anti-glare screen hanging light bar with touch controls and adjustable color temperature.' },
    { name: '3-in-1 Foldable Wireless Charging Station', price: 1299, orig: 2099, img: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&q=80', tags: ['charger', 'wireless', 'dock', 'apple'], stock: 14, feat: false, desc: 'Sleek travel charging stand for iPhone, Apple Watch, and AirPods at the same time.' },
    { name: 'Universal Travel Adapter with PD 30W', price: 649, orig: 1099, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', tags: ['travel-adapter', 'plug', 'universal', 'travel'], stock: 25, feat: false, desc: 'Worldwide all-in-one plug adapter compatible with EU, US, UK, AU and 150+ countries.' }
  ],

  'Home & Living': [
    { name: 'Aromatherapy Soy Wax Scented Candle', price: 449, orig: 799, img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80', tags: ['candle', 'aromatherapy', 'homedecor', 'relax'], stock: 25, feat: true, desc: 'Clean burning 100% natural soy wax infused with French lavender and sweet vanilla bean.' },
    { name: 'Handmade Matte Ceramic Coffee Mug', price: 349, orig: 599, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', tags: ['mug', 'ceramic', 'coffee', 'kitchen'], stock: 30, feat: false, desc: 'Studio handcrafted speckled stoneware pottery mug with ergonomic comfortable handle (350ml).' },
    { name: 'Minimalist Nordic Wooden Desk Lamp', price: 1299, orig: 2199, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80', tags: ['lamp', 'lighting', 'desk', 'nordic'], stock: 12, feat: true, desc: 'Scandinavian solid beech wood articulated arm table lamp with warm white LED bulb.' },
    { name: 'Boho Tufted Geometric Cushion Cover', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80', tags: ['cushion', 'pillow', 'boho', 'livingroom'], stock: 22, feat: false, desc: 'Textured woven heavy cotton canvas throw pillow cover with tufting and corner tassels.' },
    { name: 'Indoor Ceramic Planter with Wooden Stand', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', tags: ['planter', 'plants', 'ceramic', 'decor'], stock: 15, feat: false, desc: 'White fluted cylinder ceramic plant pot paired with natural cross-braced acacia wood stand.' },
    { name: 'Ultrasonic Woodgrain Essential Oil Diffuser', price: 899, orig: 1499, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80', tags: ['diffuser', 'aromatherapy', 'humidifier', 'wellness'], stock: 18, feat: false, desc: 'Whisper-quiet 400ml ultrasonic cool mist humidifier with 7 soothing ambient LED lights.' },
    { name: 'Double-Walled Insulated French Press (800ml)', price: 1199, orig: 1899, img: 'https://images.unsplash.com/photo-1517668808822-9ebd02f2a8ea?w=600&q=80', tags: ['french-press', 'coffee', 'kitchen', 'stainless'], stock: 14, feat: true, desc: 'Mirror-polished 304 food-grade stainless steel cafetiere that keeps coffee hot for 2 hours.' },
    { name: 'Bamboo Bathtub Caddy Tray', price: 999, orig: 1699, img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80', tags: ['bath', 'bamboo', 'tray', 'spa'], stock: 10, feat: false, desc: 'Expandable waterproof organic bamboo bath bridge with book holder, wine glass slot, and phone rest.' },
    { name: 'Textured Waffle Cotton Bath Towel', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80', tags: ['towel', 'cotton', 'waffle', 'bath'], stock: 26, feat: false, desc: 'Quick-drying honeycomb weave 100% Turkish cotton large bath sheet in slate grey.' },
    { name: 'Abstract Minimalist Botanical Wall Art (Framed)', price: 799, orig: 1399, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80', tags: ['wall-art', 'decor', 'framed', 'prints'], stock: 16, feat: false, desc: 'High-definition giclée print on textured linen paper housed in a natural oak composite frame.' },
    { name: 'Pure Brass Incense Burner & Dhoop Stand', price: 349, orig: 599, img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80', tags: ['incense', 'brass', 'spiritual', 'home'], stock: 28, feat: false, desc: 'Handcrafted solid golden brass agarbatti holder with ash-catcher tray for daily puja and zen.' },
    { name: 'Modern Minimalist Wall Clock (12-inch)', price: 749, orig: 1299, img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80', tags: ['clock', 'wall-clock', 'silent', 'minimal'], stock: 17, feat: false, desc: 'Non-ticking silent sweep quartz wall clock with clean matte numerals and glass cover.' }
  ]
};

// Flatten and expand to ensure at least 110 unique items
let allProducts = [];
let idCounter = 1;

for (const [catName, items] of Object.entries(categories)) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const discount = Math.round(((item.orig - item.price) / item.orig) * 100);
    const id = 'prod_' + String(idCounter).padStart(3, '0');
    const sku = catName.slice(0, 2).toUpperCase() + '-' + String(idCounter).padStart(3, '0');
    const rating = +(4.0 + (Math.sin(idCounter * 7) * 0.5 + 0.4)).toFixed(1);
    const reviewCount = Math.floor(40 + ((idCounter * 47) % 380));
    
    allProducts.push({
      id,
      name: item.name,
      description: item.desc,
      price: item.price,
      originalPrice: item.orig,
      discount,
      category: catName,
      image: item.img,
      rating: Math.min(5, Math.max(3.8, rating)),
      reviewCount,
      stock: item.stock,
      sku,
      tags: item.tags,
      featured: item.feat || (idCounter % 8 === 0),
    });
    idCounter++;
  }
}

// Add more specific curated products to exceed 100+
const additionalProducts = [
  // Additional Fashion items
  { name: 'Block Printed Cotton Mulmul Saree', cat: 'Fashion', price: 999, orig: 1599, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80', tags: ['saree', 'mulmul', 'cotton', 'blockprint'], stock: 12, desc: 'Bagru hand-block printed lightweight mulmul cotton saree for daily office elegance.' },
  { name: 'Oversized Flannel Plaid Shirt', cat: 'Fashion', price: 849, orig: 1399, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', tags: ['shirt', 'flannel', 'plaid', 'casual'], stock: 18, desc: 'Heavyweight brushed cotton plaid flannel shirt with twin button flap pockets.' },
  { name: 'Khadi Cotton Short Kurta', cat: 'Fashion', price: 599, orig: 999, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', tags: ['kurta', 'khadi', 'menswear', 'casual'], stock: 22, desc: 'Eco-friendly breathable handspun khadi short tunic shirt in earthy beige.' },
  { name: 'Silk Jacquard Festive Kurta Set', cat: 'Fashion', price: 1699, orig: 2799, img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80', tags: ['kurta', 'festive', 'silk', 'ethnic'], stock: 7, desc: 'Lustrous self-woven silk blend kurta with contrast pyjama and churidar.' },
  { name: 'Faux Leather Biker Motorcycle Jacket', cat: 'Fashion', price: 2199, orig: 3599, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80', tags: ['leather-jacket', 'biker', 'outerwear', 'black'], stock: 6, desc: 'Asymmetrical zip moto jacket with notched lapel and zippered cuff hardware.' },
  { name: 'Tiered Linen Midi Sun Dress', cat: 'Fashion', price: 1049, orig: 1699, img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80', tags: ['dress', 'midi', 'linen', 'summer'], stock: 15, desc: 'Sun-drenched buttercup yellow linen dress with shirred back and puff sleeves.' },
  { name: 'Washed Denim Dungaree Overalls', cat: 'Fashion', price: 1349, orig: 2199, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', tags: ['dungarees', 'overalls', 'denim', 'casual'], stock: 10, desc: 'Relaxed fit classic utility denim overalls with adjustable buckle bib straps.' },

  // Additional Jewellery
  { name: 'Kashmiri Jhumka with Hair Chain', cat: 'Jewellery', price: 499, orig: 899, img: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80', tags: ['jhumka', 'kashmiri', 'hair-chain', 'bridal'], stock: 14, desc: 'Traditional Kashmiri hanging sahara ear chains connecting to pearl-fringed bell drops.' },
  { name: 'Beaded Multi-Layer Choker Set', cat: 'Jewellery', price: 379, orig: 649, img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80', tags: ['choker', 'beaded', 'boho', 'layers'], stock: 20, desc: 'Turquoise and terracotta glass seed bead necklace stack with adjustable tie.' },
  { name: 'Swarovski Zirconia Nose Pin (Clip-On)', cat: 'Jewellery', price: 249, orig: 449, img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&q=80', tags: ['nose-pin', 'clip-on', 'cz', 'ethnic'], stock: 35, desc: 'No-piercing required sparkling floral clip-on nose stud in gold-plated brass.' },
  { name: 'Antique Oxidized Waist Belt (Kamarbandh)', cat: 'Jewellery', price: 699, orig: 1299, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80', tags: ['kamarbandh', 'waist-belt', 'oxidized', 'belly-chain'], stock: 8, desc: 'Sculpted ghungroo hanging waist chain to accent sarees and lehengas.' },
  { name: 'Enamel Daisy Flower Stud Earrings', cat: 'Jewellery', price: 289, orig: 499, img: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=600&q=80', tags: ['studs', 'daisy', 'floral', 'cute'], stock: 25, desc: 'Cute pastel yellow and white enamel daisy button studs with push-back pin.' },

  // Additional Footwear
  { name: 'Breathable Slip-On Mesh Loafers', cat: 'Footwear', price: 799, orig: 1299, img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80', tags: ['loafers', 'mesh', 'walking', 'comfort'], stock: 22, desc: 'Ultra lightweight air-mesh slip-ons designed for high mileage and hot days.' },
  { name: 'Ankle Strap Espadrille Wedges', cat: 'Footwear', price: 1199, orig: 1899, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', tags: ['wedges', 'espadrilles', 'summer', 'heels'], stock: 12, desc: 'Jute wrapped 3-inch wedge heel sandals with soft microfiber suede upper.' },
  { name: 'Reflective Night Runner Road Shoes', cat: 'Footwear', price: 1699, orig: 2799, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', tags: ['running', 'reflective', 'marathon', 'sport'], stock: 14, desc: 'High-visibility 3M reflective road trainers with carbon-reinforced torsion plate.' },
  { name: 'Classic Derby Brogue Formal Shoes', cat: 'Footwear', price: 2099, orig: 3399, img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80', tags: ['brogues', 'derby', 'leather', 'formal'], stock: 8, desc: 'Wingtip perforated derby dress shoes in rich burnished chestnut brown.' },

  // Additional Beauty
  { name: 'Avocado Cold Pressed Nourishing Night Oil', cat: 'Beauty', price: 549, orig: 899, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', tags: ['face-oil', 'avocado', 'nightcare', 'skincare'], stock: 17, desc: 'Deeply restoring night face oil rich in vitamins A, D, and E for supple glowing skin.' },
  { name: 'Mineral Rice Water Clarifying Shampoo', cat: 'Beauty', price: 399, orig: 599, img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80', tags: ['shampoo', 'ricewater', 'haircare', 'sulfate-free'], stock: 26, desc: 'Sulfate-free fermented rice water shampoo that prevents hair fall and adds gloss.' },
  { name: 'Exfoliating Walnut & Apricot Face Scrub', cat: 'Beauty', price: 299, orig: 449, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', tags: ['scrub', 'exfoliate', 'walnut', 'cleanse'], stock: 21, desc: 'Micro-fine walnut beads and cold-pressed apricot kernel oil to buff away dead cells.' },
  { name: '24K Gold Foil Revitalizing Eye Patches (30 Pairs)', cat: 'Beauty', price: 499, orig: 849, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', tags: ['eye-mask', 'hydrogel', 'gold', 'anti-fatigue'], stock: 19, desc: 'Hydrogel collagen cooling eye patches that soothe morning puffiness and under-eye circles.' },

  // Additional Accessories
  { name: 'Minimalist Titanium Key Carabiner', cat: 'Accessories', price: 349, orig: 599, img: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&q=80', tags: ['carabiner', 'titanium', 'edc', 'keys'], stock: 30, desc: 'Sturdy ultra-light aerospace grade titanium keychain clip with integrated bottle opener.' },
  { name: 'Silk Twill Hair Scrunchies (Pack of 5)', cat: 'Accessories', price: 299, orig: 499, img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80', tags: ['scrunchie', 'silk', 'hair', 'accessories'], stock: 45, desc: '100% pure Mulberry silk scrunchies that eliminate creases, tugging, and hair breakage.' },
  { name: 'Retro Hexagonal Metal Frame Glasses', cat: 'Accessories', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', tags: ['glasses', 'spectacles', 'hexagonal', 'vintage'], stock: 18, desc: 'Slim gold wireframe geometric reading and blue-light computer glasses.' },

  // Additional Electronics
  { name: 'Adjustable Aluminum Laptop Riser Stand', cat: 'Electronics', price: 699, orig: 1199, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', tags: ['laptop-stand', 'aluminum', 'desk', 'ergonomic'], stock: 24, desc: 'Foldable ventilated desktop elevation mount supporting all 10-17 inch laptops.' },
  { name: 'Braided 100W USB-C to USB-C Cable (2m)', cat: 'Electronics', price: 349, orig: 599, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80', tags: ['cable', 'usbc', '100w', 'fastcharge'], stock: 50, desc: 'Nylon armored heavy-duty cable with E-marker chip supporting 100W PD charging.' },
  { name: 'RGB Gaming Mousepad with Wireless Charging', cat: 'Electronics', price: 999, orig: 1699, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', tags: ['mousepad', 'rgb', 'wireless-charging', 'gaming'], stock: 15, desc: '800x300mm extended micro-textured surface with 15W fast phone charging zone.' },

  // Additional Home & Living
  { name: 'Handwoven Natural Jute Floor Rug (4x6 ft)', cat: 'Home & Living', price: 1499, orig: 2499, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80', tags: ['rug', 'jute', 'boho', 'homedecor'], stock: 8, desc: 'Organic eco-friendly braided golden jute area rug adding rustic bohemian charm.' },
  { name: 'Borosilicate Glass Water Bottle with Bamboo Lid', cat: 'Home & Living', price: 449, orig: 799, img: 'https://images.unsplash.com/photo-1517668808822-9ebd02f2a8ea?w=600&q=80', tags: ['bottle', 'glass', 'bamboo', 'sustainable'], stock: 28, desc: 'Eco-conscious thermal-shock proof 750ml glass drinkware with silicone protective sleeve.' },
  { name: 'Set of 4 Marble & Acacia Wood Coasters', cat: 'Home & Living', price: 399, orig: 699, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', tags: ['coasters', 'marble', 'wood', 'dining'], stock: 22, desc: 'Geometric split white marble and natural acacia beverage coasters with felt base pads.' }
];

for (const item of additionalProducts) {
  const discount = Math.round(((item.orig - item.price) / item.orig) * 100);
  const id = 'prod_' + String(idCounter).padStart(3, '0');
  const sku = item.cat.slice(0, 2).toUpperCase() + '-' + String(idCounter).padStart(3, '0');
  const rating = +(4.1 + (Math.sin(idCounter * 11) * 0.4 + 0.4)).toFixed(1);
  const reviewCount = Math.floor(45 + ((idCounter * 39) % 410));

  allProducts.push({
    id,
    name: item.name,
    description: item.desc,
    price: item.price,
    originalPrice: item.orig,
    discount,
    category: item.cat,
    image: item.img,
    rating: Math.min(5, Math.max(3.9, rating)),
    reviewCount,
    stock: item.stock,
    sku,
    tags: item.tags,
    featured: idCounter % 6 === 0,
  });
  idCounter++;
}

console.log('Total products prepared:', allProducts.length);

const outputContent = `/**
 * BioStorefront Product Database
 * Automatically generated catalog with ${allProducts.length} high-quality products.
 */

module.exports = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'productsCatalog.js'), outputContent, 'utf-8');
console.log('Successfully written to productsCatalog.js');
