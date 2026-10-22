// Trend-specific shopping destinations. Researched 22 October 2026.
// Similar pieces and specialist services; listings and availability can change.
const FASHION_SHOP = {
  "1": [
    {
      "label": "Chikankari kurta",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/kurtas/semalhandicrafts/semal-handicrafts-embroidered-chikankari-kurta/38170593/buy",
      "kind": "product"
    },
    {
      "label": "Chikankari kurta",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/house-of-chikankari-nida-chikankari-black-cotton-straight-kurta/p/14997967",
      "kind": "product"
    }
  ],
  "2": [
    {
      "label": "Embellished hair clips",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/hair-accessory/youbella/youbella-set-of-12-embellished-floral-hair-clips/28540392/buy",
      "kind": "product"
    },
    {
      "label": "Embellished hair clips",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/creeva-sparkle-embellished-flower-shaped-hair-clips/p/30188850",
      "kind": "product"
    }
  ],
  "3": [
    {
      "label": "Satchel bag",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/bags/women-marks/women-marks-women-textured-satchel-bag/32170549/buy",
      "kind": "product"
    },
    {
      "label": "Satchel bag",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/fastrack-women-solid-black-satchel-bag/p/15751566",
      "kind": "product"
    }
  ],
  "4": [
    {
      "label": "Statement belt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/belts/kazo/kazo-women-statement-buckle-broad-elasticated-belt/31398421/buy",
      "kind": "product"
    },
    {
      "label": "Statement belt",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/h-m-women-black-double-strap-statement-belt/p/29621276",
      "kind": "product"
    }
  ],
  "5": [
    {
      "label": "Football jersey",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/tshirts/puma/puma-morocco-2026-womens-football-home-jersey/41963921/buy",
      "kind": "product"
    },
    {
      "label": "Pleated mini skirt",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/h-m-women-beige-pleated-mini-skirt/p/25007866",
      "kind": "product"
    }
  ],
  "6": [
    {
      "label": "Mirror work blouse",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/Saree-Blouse/RAISECHIC/RAISECHIC-Embroidered-Mirror-Work-Saree-Blouse/41722423/buy",
      "kind": "product"
    },
    {
      "label": "Mirror work blouse",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/soch-women-red-mirror-work-blouse/p/7125493",
      "kind": "product"
    }
  ],
  "7": [
    {
      "label": "Satin slip skirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/Skirts/H%26M/HM-Satin-Slip-Skirt/34168096/buy",
      "kind": "product"
    },
    {
      "label": "Satin slip skirt",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1285000001.html",
      "kind": "product"
    }
  ],
  "8": [
    {
      "label": "Ombre lehenga",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/lehenga-choli/koskii/koskii-grey--blue-mirrorwork-ready-to-wear-ombre-lehenga--blouse-with-dupatta/11682718/buy",
      "kind": "product"
    },
    {
      "label": "Ombre lehenga",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/kiran-kalsi-blue-ombre-embroidered-lehenga-with-blouse-and-cape-set-of-3/p/15693068",
      "kind": "product"
    }
  ],
  "9": [
    {
      "label": "Gingham dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/quiero/quiero-women-gorgeous-green-checked-summer-gingham-dress/17171792/buy",
      "kind": "product"
    },
    {
      "label": "Gingham dress",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/gap-women-s-gingham-check-peplum-dress/p/23591773",
      "kind": "product"
    }
  ],
  "10": [
    {
      "label": "Neon top",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/tops/neon%2Bfemme/neon-femme-top/43163877/buy",
      "kind": "product"
    },
    {
      "label": "Neon top",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/miss-chase-women-neon-green-round-neck-short-solid-ruching-top/p/29602778",
      "kind": "product"
    }
  ],
  "11": [
    {
      "label": "Block print saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sarees/kalini/kalini-block-print-saree/39181591/buy",
      "kind": "product"
    },
    {
      "label": "Block print saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/isadora-life-beige-hand-block-print-with-border-design-cotton-ready-to-wear-saree/p/29017216",
      "kind": "product"
    }
  ],
  "12": [
    {
      "label": "Mirror work jacket",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/nehru-jackets/vastramay/vastramay-mirror-work-woven-nehru-jacket/28918004/buy",
      "kind": "product"
    },
    {
      "label": "Mirror work jacket",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/hasttvam-amor-embroidered-mirror-work-jacket/p/15568122",
      "kind": "product"
    }
  ],
  "13": [
    {
      "label": "Black lace gown",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/v26m/vm-women-black-off-shoulder-lace-sheath-dress/19323902/buy",
      "kind": "product"
    },
    {
      "label": "Black lace gown",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/house-of-exotique-black-lace-embroidery-gown/p/13678979",
      "kind": "product"
    }
  ],
  "14": [
    {
      "label": "Sheer shirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/shirts/tzelynn/tzelynn-women-sheer-casual-shirt/40838979/buy",
      "kind": "product"
    },
    {
      "label": "Sheer shirt",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/pinacolada-women-s-icy-blue-star-sheer-shirt/p/17559429",
      "kind": "product"
    }
  ],
  "15": [
    {
      "label": "Trench coat",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/trench-coats",
      "kind": "collection"
    },
    {
      "label": "Trench coats",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-outerwear-trench-l1202.html",
      "kind": "collection"
    }
  ],
  "16": [
    {
      "label": "Track jacket",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/jackets/blissclub/blissclub-womenon-the-go-aeroflo-lightweight-running-sporty-track-jacket/21668532/buy",
      "kind": "product"
    },
    {
      "label": "Track jacket",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/silvertraq-women-track-jacket-3/p/2184034",
      "kind": "product"
    }
  ],
  "17": [
    {
      "label": "Ivory lehenga",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/lehenga-choli/alizeh/alizeh-ivory-color-net-designer-wedding-lehenga-choli-with-dupatta/32036549/buy",
      "kind": "product"
    },
    {
      "label": "Ivory lehenga",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/itrh-haathidant-organza-ivory-lehenga-with-blouse-and-dupatta/p/29915719",
      "kind": "product"
    }
  ],
  "18": [
    {
      "label": "Embroidered jacket",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/jackets/prijam/prijam-women-ethnic-embroidered-cotton-jacket/35128722/buy",
      "kind": "product"
    },
    {
      "label": "Vintage embroidered jacket",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/priyanka-raajiv-gohar-vintage-ivory-zardosi-jacket-with-bodice/p/7446373",
      "kind": "product"
    }
  ],
  "19": [
    {
      "label": "Kolhapuri chappals",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/kolhapuri-sandals-sandals",
      "kind": "collection"
    },
    {
      "label": "Kolhapuri chappals",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/korakari-womens-dual-tone-comfort-kolhapuri-chappal/p/10716938",
      "kind": "product"
    }
  ],
  "20": [
    {
      "label": "Brown knit sweater",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sweaters/kalt/kalt-women-brown-cable-knit-cardigan/14747264/buy",
      "kind": "product"
    },
    {
      "label": "Brown knit sweater",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/astr-the-label-daria-women-s-cable-knit-pullover-sweater-brown/p/30312492",
      "kind": "product"
    }
  ],
  "21": [
    {
      "label": "Bustier corset top",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/tops/outzidr/outzidr-off-white-corset-styled-neck-cut-out-bustier-top/40624891/buy",
      "kind": "product"
    },
    {
      "label": "Bustier corset top",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/anvi-be-yourself-bustier-corset-top-black/p/12928359",
      "kind": "product"
    }
  ],
  "22": [
    {
      "label": "Tote bag",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/women-bags-tote",
      "kind": "collection"
    },
    {
      "label": "Leather tote",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/leather-tote-bag-p13314920.html",
      "kind": "collection"
    }
  ],
  "23": [
    {
      "label": "Velvet blazer",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/women-velvet-blazers",
      "kind": "collection"
    },
    {
      "label": "Velvet blazer",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1214589001.html",
      "kind": "product"
    }
  ],
  "24": [
    {
      "label": "Banarasi blouse corset",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/saree-blouse/abhishti/abhishti-woven-design-banarasi-panelled-corset-saree-blouse/28425848/buy",
      "kind": "product"
    },
    {
      "label": "Banarasi corset",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/neha-khullar-mint-green-banarasi-chanderi-corset-lehenga-with-stitched-blouse-and-dupatta/p/25396487",
      "kind": "product"
    }
  ],
  "25": [
    {
      "label": "Beaded charm necklace",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/necklace-and-chains/jewelwati/jewelwati-beaded-bow-charm-necklace/30752498/buy",
      "kind": "product"
    },
    {
      "label": "Beaded charm necklace",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/prita-multi-color-beaded-charm-tasselled-link-gold-plated-necklace/p/10139936",
      "kind": "product"
    }
  ],
  "26": [
    {
      "label": "Tulle skirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/hatke/a/products/15212676/buy?ep=rd_111110626",
      "kind": "product"
    },
    {
      "label": "Ballet tulle skirt",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/ballet-tulle-skirt-p02878600.html",
      "kind": "product"
    }
  ],
  "27": [
    {
      "label": "Black lace top bows",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/tops/stylecast/stylecast-women-black-lace--bow-detailed-square-neck-top/31035134/buy",
      "kind": "product"
    },
    {
      "label": "Black lace top",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/embroidered-lace-top-p04813808.html",
      "kind": "product"
    }
  ],
  "28": [
    {
      "label": "Botanical print dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/ethnic-dresses/soch/soch-women-olive-gadwal-botanical-printed-a-line-sleeveless-dress/38507142/buy",
      "kind": "product"
    },
    {
      "label": "Botanical print dress",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/rareism-fasan-botanical-print-knee-length-dress/p/12487667",
      "kind": "product"
    }
  ],
  "29": [
    {
      "label": "Satin cummerbunds",
      "retailer": "The Tie Hub",
      "url": "https://www.thetiehub.com/product-category/accessories/cummerband",
      "kind": "collection"
    },
    {
      "label": "Pleated cummerbund",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/dolce-gabbana-black-cummerbund-pleated-belt/p/29892502",
      "kind": "product"
    }
  ],
  "30": [
    {
      "label": "Zardozi jacket set",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/kurta-sets/soch/soch-round-neck-zardozi-kurta-with-trousers--jacket/24586178/buy",
      "kind": "product"
    },
    {
      "label": "Zardozi velvet jacket",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/weaverstory-purple-hand-embroidered-zardozi-silk-velvet-sleeveless-jacket/p/14744309",
      "kind": "product"
    }
  ],
  "31": [
    {
      "label": "Gold cuff bracelet",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/bracelet/nui/nui-women-gold-plated-cuff-bracelet/37163955/buy",
      "kind": "product"
    },
    {
      "label": "Gold cuff",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/metal-cuff-bracelet-p01124200.html",
      "kind": "product"
    }
  ],
  "32": [
    {
      "label": "Ikat scarf",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/scarves/ravaiyaa/ravaiyaa-women-satin-ikat-printed-casual-scarf/31266895/buy",
      "kind": "product"
    },
    {
      "label": "Ikat scarf",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/toniq-monochrome-ikat-print-black-white-scarf/p/23803305",
      "kind": "product"
    }
  ],
  "33": [
    {
      "label": "Analogue leather strap watch",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/watches/sonata/sonata-men-brass-dial--leather-straps-analogue-watch-77105nl15w/31276546/buy",
      "kind": "product"
    },
    {
      "label": "Analogue leather strap watch",
      "retailer": "Nykaa",
      "url": "https://www.nykaa.com/ingersoll-mens-analogue-classic-automatic-watch-with-leather-strap-i00903b-m/p/14069382",
      "kind": "product"
    }
  ],
  "34": [
    {
      "label": "Cotton printed saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/saree-cotton-printed",
      "kind": "collection"
    },
    {
      "label": "Cotton printed saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/nyri-white-pure-cotton-printed-ready-to-wear-saree/p/29852144",
      "kind": "product"
    }
  ],
  "35": [
    {
      "label": "Brooches",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/women-brooches",
      "kind": "collection"
    },
    {
      "label": "Saree brooches",
      "retailer": "Kushal’s",
      "url": "https://www.kushals.com/collections/latest-trendy-brooches",
      "kind": "collection"
    },
    {
      "label": "Floral brooch",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/accessher-elegant-gold-plated-round-shaped-floral-brooch/p/23650575",
      "kind": "product"
    }
  ],
  "36": [
    {
      "label": "Kanjivaram saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/kanjivaram-sarees",
      "kind": "collection"
    },
    {
      "label": "Kanjivaram saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/anjaneya-sarees-white-woven-kanjivaram-saree-with-unstitched/p/21056135",
      "kind": "product"
    }
  ],
  "37": [
    {
      "label": "Layered choker necklace",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/necklace-and-chains/silvermercdesigns/silvermerc-designs-brass-gold-plated-elegant-multi-layered-choker-necklace/32226226/buy",
      "kind": "product"
    },
    {
      "label": "Layered choker",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/combined-choker-necklace-p04736274.html",
      "kind": "product"
    }
  ],
  "38": [
    {
      "label": "White sneakers",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sneakers-women-white",
      "kind": "collection"
    },
    {
      "label": "White sneakers",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/shoetopia-smart-casual-white-sneakers-for-women/p/14000388",
      "kind": "product"
    }
  ],
  "39": [
    {
      "label": "Low rise jeans",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/low-rise-jeans-women",
      "kind": "collection"
    },
    {
      "label": "Low-rise jeans",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-jeans-low-waist-l1464.html",
      "kind": "collection"
    }
  ],
  "40": [
    {
      "label": "Tissue zari saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sarees/threadbox/thread-box-zari-tissue-saree/38815928/buy",
      "kind": "product"
    },
    {
      "label": "Tissue zari saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/soch-gold-tissue-kasavu-saree-with-zari-woven-ethnic-motifs-and-temple-borders-with-unstitched/p/11849576",
      "kind": "product"
    }
  ],
  "41": [
    {
      "label": "Chikankari kurta",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/kurtas/semalhandicrafts/semal-handicrafts-embroidered-chikankari-kurta/38170593/buy",
      "kind": "product"
    },
    {
      "label": "Chikankari kurta",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/house-of-chikankari-nida-chikankari-black-cotton-straight-kurta/p/14997967",
      "kind": "product"
    }
  ],
  "42": [
    {
      "label": "Plum lehenga",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/pink-ethnic-plum-purple-sequins-embroidered-net-lehenga-choli/p/12172149",
      "kind": "product"
    },
    {
      "label": "Plum tissue lehenga",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/gajra-gang-plum-tissue-brocade-semi-stitched-lehenga-unstitched-blouse-dupatta-diwalicious-set-of-3/p/22711186",
      "kind": "product"
    }
  ],
  "43": [
    {
      "label": "Pre-loved denim jacket",
      "retailer": "SZN2",
      "url": "https://szn2.in/product/levis-levis-vintage-denim-jacket-c61495",
      "kind": "product"
    },
    {
      "label": "Pre-loved jackets",
      "retailer": "Bombay Closet Cleanse",
      "url": "https://bombayclosetcleanse.in/collections/hoodies-jackets",
      "kind": "collection"
    }
  ],
  "44": [
    {
      "label": "Crisp cotton shirts",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/white-cotton-shirts-women",
      "kind": "collection"
    },
    {
      "label": "Workwear blazers",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-blazers-l1055.html",
      "kind": "collection"
    }
  ],
  "45": [
    {
      "label": "Fuchsia saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sarees/exoticindia/exotic-india-festival-fuchsia-tangail-saree-with-woven-flowers-on-border-and-pallu/29610528/buy",
      "kind": "product"
    },
    {
      "label": "Fuchsia saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/inweave-fuchsia-pink-tie-and-die-saree/p/29656171",
      "kind": "product"
    }
  ],
  "46": [
    {
      "label": "Pre draped saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sarees/mabishbysonaljain/mabish-by-sonal-jain-pre-draped-sarree-/32374077/buy",
      "kind": "product"
    },
    {
      "label": "Pre draped saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/lush-glam-pre-draped-chinon-easy-elegance-saree-with-unstitched-blouse/p/21330778",
      "kind": "product"
    }
  ],
  "47": [
    {
      "label": "Metallic silver dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/pinacolada/pinacolada-women-antique-silver-metallic-chevron-wrap-dress/30870348/buy",
      "kind": "product"
    },
    {
      "label": "Metallic silver dress",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/draped-metallic-effect-strappy-dress-p04772291.html",
      "kind": "product"
    }
  ],
  "48": [
    {
      "label": "Cape saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sarees/indya/indya-x-shraddha-kapoor-pink--gold-toned-beads--stones-ready-to-wear-embroidered-cape-saree-tunic/15511110/buy",
      "kind": "product"
    },
    {
      "label": "Cape saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/itrh-beige-mradul-aayna-saree-with-stitched-blouse-with-cape/p/17742304",
      "kind": "product"
    }
  ],
  "49": [
    {
      "label": "Leather jacket",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/women-leather-jacket",
      "kind": "collection"
    },
    {
      "label": "Leather jackets",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-outerwear-leather-l1193.html",
      "kind": "collection"
    }
  ],
  "50": [
    {
      "label": "Puma speedcat ballet",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/casual-shoes/puma/puma-speedcat-suede-ballet-womens-shoes/35163323/buy",
      "kind": "product"
    },
    {
      "label": "Speedcat Ballet",
      "retailer": "Puma",
      "url": "https://in.puma.com/in/en/pd/speedcat-womens-ballet-shoes/401287?swatch=02",
      "kind": "collection"
    }
  ],
  "51": [
    {
      "label": "Oxidised bangles",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/bangle/teejh/teejh-oxidised-silver-plated-bangle/15606218/buy",
      "kind": "product"
    },
    {
      "label": "Oxidised bangles",
      "retailer": "Kushal’s",
      "url": "https://www.kushals.com/collections/oxidised-bangles",
      "kind": "collection"
    }
  ],
  "52": [
    {
      "label": "Embroidered jeans",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/jeans/only/only-women-straight-fit-mid-rise-embroidered-jeans/36520688/buy",
      "kind": "product"
    },
    {
      "label": "Embroidered jeans",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/only-womens-embroidered-straight-fit-mid-rise-black-jeans/p/22114497",
      "kind": "product"
    }
  ],
  "53": [
    {
      "label": "Indigo saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sarees/taavi/taavi-indigo-hand-block-printed-saree/29988675/buy",
      "kind": "product"
    },
    {
      "label": "Indigo saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/soch-indigo-art-silk-stripes-saree-with-unstitched-blouse-piece/p/20835220",
      "kind": "product"
    }
  ],
  "54": [
    {
      "label": "Oversized jhumka earrings",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/earrings/rubans/rubans-22k-gold-plated-kundan--pearl-studded-oversized-dangle-jhumka-earrings/30453709/buy",
      "kind": "product"
    },
    {
      "label": "Oversized jhumka earrings",
      "retailer": "Nykaa",
      "url": "https://www.nykaa.com/silvermerc-designs-gold-plated-traditional-oversized-dome-shaped-jhumkas-earrings/p/22553008",
      "kind": "product"
    }
  ],
  "55": [
    {
      "label": "Corset blouse saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/saree-blouse/amodinidesignerstudio/amodini-designer-studio-women-embroidered-corset-saree-blouse/36907777/buy",
      "kind": "product"
    },
    {
      "label": "Corset blouse saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/itrh-green-nour-corset-edition-pre-drape-saree-with-stitched-blouse/p/29993203",
      "kind": "product"
    }
  ],
  "56": [
    {
      "label": "Ballet flats",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/ballerinas/elle/elle-women-ballet-flats/38983093/buy",
      "kind": "product"
    },
    {
      "label": "Ballet flats and flats",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-shoes-flat-l1269.html",
      "kind": "collection"
    }
  ],
  "57": [
    {
      "label": "Lace bandana",
      "retailer": "Bella Luxe",
      "url": "https://bellaluxebynirat.com/products/white-lacy-bandana-dotted",
      "kind": "product"
    },
    {
      "label": "Lace scarf",
      "retailer": "Venus by Payal",
      "url": "https://venusbypayal.com/products/lace-scarf",
      "kind": "product"
    }
  ],
  "58": [
    {
      "label": "Cobalt blue trousers",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/trousers/vero-moda/vero-moda-women-cobalt-blue-defender-straight-fit-chino-trousers/120093/buy",
      "kind": "product"
    },
    {
      "label": "Cobalt blue trousers",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/fablestreet-cobalt-blue-wide-leg-solid-pant/p/444651",
      "kind": "product"
    }
  ],
  "59": [
    {
      "label": "Printed co-ords",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/co-ords?f=Gender%3Amen+women%2Cwomen%3A%3ATop+Pattern%3APrinted",
      "kind": "collection"
    },
    {
      "label": "Mixed print co ord set",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/ekta-textiles-teal-mixed-floral-print-straight-co-ord-set/p/26184422",
      "kind": "product"
    }
  ],
  "60": [
    {
      "label": "Babydoll dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/babydoll-dress-women",
      "kind": "collection"
    },
    {
      "label": "Babydoll dress",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/pomelo-babydoll-dress-white/p/30017576",
      "kind": "product"
    }
  ],
  "61": [
    {
      "label": "Pastel lehenga",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/lehenga-choli/koskii/koskii-pastel-green-ready-to-wear-lehenga--blouse-with-dupatta/12435344/buy",
      "kind": "product"
    },
    {
      "label": "Pastel lehenga",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/pink-ethnic-pastel-pink-taffeta-silk-semi-stitched-lehenga-with-unstitched-choli-and-dupatta/p/24777409",
      "kind": "product"
    }
  ],
  "62": [
    {
      "label": "Sheer shirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/shirts/szn/szn-men-standard-sheer-casual-shirt/41150504/buy",
      "kind": "product"
    },
    {
      "label": "Sheer polo shirt",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1284203001.html",
      "kind": "product"
    }
  ],
  "63": [
    {
      "label": "Carpenter trousers",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/trousers/h26m/hm-carpenter-trousers-/39474298/buy",
      "kind": "product"
    },
    {
      "label": "Carpenter trousers",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/plain-carpenter-trousers-p09959763.html",
      "kind": "product"
    }
  ],
  "64": [
    {
      "label": "Gingham midi dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/sugnaa/sugnaa-women-sleeveless-checked-cotton-gingham-midi-dress/44210305/buy",
      "kind": "product"
    },
    {
      "label": "Gingham midi dress",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/gingham-check-midi-dress-p03152302.html",
      "kind": "product"
    }
  ],
  "65": [
    {
      "label": "Custom grillz",
      "retailer": "Richa Baisa",
      "url": "https://richabaisa.com/pages/custom-grillz",
      "kind": "collection"
    },
    {
      "label": "Custom tooth jewellery",
      "retailer": "Hiflyer Jewels",
      "url": "https://www.hiflyerjewels.com/products/grillz",
      "kind": "product"
    }
  ],
  "66": [
    {
      "label": "Cropped choli blouse",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/lehenga-choli/ethnovog/ethnovog-customised-made-to-measure-lehenga--cropped-blouse/9697313/buy",
      "kind": "product"
    },
    {
      "label": "Cropped choli blouse",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1333639001.html",
      "kind": "product"
    }
  ],
  "67": [
    {
      "label": "Halter blouse saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/saree-blouse/vamas-thedesignerblouses/vamas---the-designer-blouses-women-halter-neck-padded-readymade-saree-blouse/33205458/buy",
      "kind": "product"
    },
    {
      "label": "Halter blouse saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/nirmooha-pre-draped-chiffon-printed-saree-with-halter-neck-blouse/p/7361441",
      "kind": "product"
    }
  ],
  "68": [
    {
      "label": "White cotton shirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/white-cotton-shirts-women",
      "kind": "collection"
    },
    {
      "label": "White cotton shirt",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1134781001.html",
      "kind": "product"
    }
  ],
  "69": [
    {
      "label": "Oversized blazer",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/blazers/hm/hm-women-oversized-blazer/23498506/buy",
      "kind": "product"
    },
    {
      "label": "Oversized blazers",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/women/shop-by-product/blazers-waistcoats/oversized.html",
      "kind": "collection"
    }
  ],
  "70": [
    {
      "label": "Butter yellow dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/leaclothingco/lea-clothing-co-gilliane-butter-yellow-ruffle-mini-dress/33984244/buy",
      "kind": "product"
    },
    {
      "label": "Butter yellow dress",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/amoshi-celeste-dress-butter-yellow/p/20145980",
      "kind": "product"
    }
  ],
  "71": [
    {
      "label": "Veshti dhoti silk",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dhotis/exoticindia/exotic-india-woven-design-art-silk-ready-to-wear-dhoti-pant--veshti-/29115286/buy",
      "kind": "product"
    },
    {
      "label": "Veshti dhoti silk",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/manyavar-mens-cream-art-silk-solid-shirt-veshti-set-of-2/p/13992443",
      "kind": "product"
    }
  ],
  "72": [
    {
      "label": "Bandhgala jacket",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/nehru-jackets/tahvo/tahvo-men-multicolored--printed-bandhgala-nehru-jacket/18741918/buy",
      "kind": "product"
    },
    {
      "label": "Bandhgala jacket",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/jb-studio-men-black-solid-bandhgala-jacket/p/12179004",
      "kind": "product"
    }
  ],
  "73": [
    {
      "label": "Boucle jacket",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/jackets/hm/hm-boucle-jacket/37649838/buy",
      "kind": "product"
    },
    {
      "label": "Bouclé jacket",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1217524001.html",
      "kind": "product"
    }
  ],
  "74": [
    {
      "label": "Chiffon dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/chiffon-dresses-dresses",
      "kind": "collection"
    },
    {
      "label": "Chiffon dress",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/sera-white-light-weight-flowy-chiffon-dress/p/20790706",
      "kind": "product"
    }
  ],
  "75": [
    {
      "label": "Empire waist puff sleeve dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/glitchez/glitchez-puff-sleeves-gathered-empire-mini-dress/31535242/buy",
      "kind": "product"
    },
    {
      "label": "Empire waist puff sleeve dress",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/aoba-by-erotissch-women-red-linen-empire-mini-dress/p/22078676",
      "kind": "product"
    }
  ],
  "76": [
    {
      "label": "Pencil skirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/women-pencil-skirts",
      "kind": "collection"
    },
    {
      "label": "Pencil skirts",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/women/shop-by-product/skirts/pencil-skirts.html",
      "kind": "collection"
    }
  ],
  "77": [
    {
      "label": "Lace camisole",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/camisoles/nykd/nykd-adjustable-lace--detail-cotton-camisole/30764077/buy",
      "kind": "product"
    },
    {
      "label": "Lace camisole",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/cider-textured-lace-womens-v-neck-strappy-lace-camisole-black/p/29418850",
      "kind": "product"
    }
  ],
  "78": [
    {
      "label": "Peplum blazer",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/blazers/h26m/hm-lapelless-peplum-blazer/46181996/buy",
      "kind": "product"
    },
    {
      "label": "Peplum blazer",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1364154001.html",
      "kind": "product"
    }
  ],
  "79": [
    {
      "label": "Chanderi anarkali",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/kurta-sets/here26now/herenow-sequinned-chanderi-silk-anarkali-kurti-with-dhoti-pants/29869839/buy",
      "kind": "product"
    },
    {
      "label": "Chanderi anarkali",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/club-loom-anarkali-chanderi-kurta/p/20542138",
      "kind": "product"
    }
  ],
  "80": [
    {
      "label": "Temple jewellery kasu necklace",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/necklace-and-chains/south%2Btemple%2Bjewellery/south-temple-jewellery-brass-gold-plated-temple-necklace/39838263/buy",
      "kind": "product"
    },
    {
      "label": "Kaasu necklaces",
      "retailer": "Kushal’s",
      "url": "https://www.kushals.com/collections/kasu-collection",
      "kind": "collection"
    }
  ],
  "81": [
    {
      "label": "Teal trousers",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/trousers/w/w-teal-blue-ankle-length-casual-trousers/1175299/buy",
      "kind": "product"
    },
    {
      "label": "Teal trousers",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/am-swan-women-s-luxury-banana-crepe-straight-fit-with-flap-pocket-teal-trouser/p/29523926",
      "kind": "product"
    }
  ],
  "82": [
    {
      "label": "Gathered clutch",
      "retailer": "Nykaa",
      "url": "https://www.nykaa.com/miraggio-faustine-soft-gathered-women-clutch-blue/p/3622271",
      "kind": "product"
    },
    {
      "label": "Soft clutch",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1312723005.html",
      "kind": "product"
    }
  ],
  "83": [
    {
      "label": "Bindi",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/bindi/cometbusters/comet-busters-traditional-designer-beaded-reusable-bindi-12pcs---green/29223722/buy",
      "kind": "product"
    },
    {
      "label": "Bindi book gift set",
      "retailer": "Nykaa",
      "url": "https://www.nykaa.com/parul-garg-beauty-shringar-glam-pack-with-bindi-book-sindoor-pink-potli-festive-gift-set/p/24233417",
      "kind": "product"
    }
  ],
  "84": [
    {
      "label": "Polka dot dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/polka-dot-dress-women",
      "kind": "collection"
    },
    {
      "label": "Polka-dot dress",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/polka-dot-dress-p02878621.html",
      "kind": "product"
    }
  ],
  "85": [
    {
      "label": "Zebra print skirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/skirts/na-kd/na-kd-women-zebra-print-straight-midi-skirt/22011596/buy",
      "kind": "product"
    },
    {
      "label": "Zebra midi skirt",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/animal-print-tie-midi-skirt-p05039852.html",
      "kind": "product"
    }
  ],
  "86": [
    {
      "label": "Black lace dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/v26m/vm-women-black-off-shoulder-lace-sheath-dress/19323902/buy",
      "kind": "product"
    },
    {
      "label": "Black lace dress",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/freo-black-lace-contrast-dress/p/22078912",
      "kind": "product"
    }
  ],
  "87": [
    {
      "label": "Fringe skirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/skirts/hm/hm-fringe-trimmed-skirt/22262714/buy",
      "kind": "product"
    },
    {
      "label": "Fringed skirts",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-skirts-fringe-l7703.html",
      "kind": "collection"
    }
  ],
  "88": [
    {
      "label": "Tennis skirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/skirts/decathlon/hm-women-quick-dry-tennis-skirt/17660944/buy",
      "kind": "product"
    },
    {
      "label": "Tennis skirts",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/women/sport/shorts/skirts-skorts.html",
      "kind": "collection"
    }
  ],
  "89": [
    {
      "label": "Tweed blazer",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/Tops/PowerSutra/PowerSutra-Mandarin-Collar-Ruffles-Woollen-Top/38049213/buy",
      "kind": "product"
    },
    {
      "label": "Tweed blazer",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/styli-women-black-regular-fit-short-length-double-breasted-tweed-blazer/p/17399901",
      "kind": "product"
    }
  ],
  "90": [
    {
      "label": "Pre-loved sneakers",
      "retailer": "Slayyitt",
      "url": "https://www.slayyitt.com/pre-loved-sneakers-india",
      "kind": "collection"
    }
  ],
  "91": [
    {
      "label": "Patchwork denim jacket",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/jackets/prijam/prijam-embroidered-spread-collar-denim-jacket-with-patchwork/35141899/buy",
      "kind": "product"
    },
    {
      "label": "Denim patchwork jacket",
      "retailer": "Doodlage",
      "url": "https://doodlage.in/products/dl26-jk-006-remi-denim-patchwork-jacket",
      "kind": "product"
    }
  ],
  "92": [
    {
      "label": "Upcycled tote bags",
      "retailer": "Scrapshala",
      "url": "https://scrapshala.com/collections/tote-bags",
      "kind": "collection"
    },
    {
      "label": "Upcycled patchwork tote",
      "retailer": "Club Artizen",
      "url": "https://clubartizen.com/product/upcycled-patchwork-tote-bags/",
      "kind": "product"
    }
  ],
  "93": [
    {
      "label": "Varsity cardigan",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sweaters/highstar/high-star-women-coloblocked-varsity-cardigan-sweaters/30916460/buy",
      "kind": "product"
    },
    {
      "label": "Varsity cardigan",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/kenzo-light-blue-varsity-cardigan/p/29739606",
      "kind": "product"
    }
  ],
  "94": [
    {
      "label": "Oversized blazer",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/oversized-blazer",
      "kind": "collection"
    },
    {
      "label": "Oversized blazers",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/ladies/shop-by-product/blazers-and-waistcoats/oversized.html",
      "kind": "collection"
    }
  ],
  "95": [
    {
      "label": "Multi-print scarves",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/multi-printed-scarves",
      "kind": "collection"
    },
    {
      "label": "Printed scarf",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/max-women-printed-scarf/p/28333711",
      "kind": "product"
    }
  ],
  "96": [
    {
      "label": "Bag charms",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/charms/ecoright/ecoright-unisex-floral-quirky-bag-charm/37427580/buy",
      "kind": "product"
    },
    {
      "label": "Bag charms",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/ladies/accessories/bag-charms.html",
      "kind": "collection"
    }
  ],
  "97": [
    {
      "label": "Kajal and kohl",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/kajal-kohl",
      "kind": "collection"
    },
    {
      "label": "Kajal",
      "retailer": "Nykaa",
      "url": "https://www.nykaa.com/maybelline-the-colossal-kajal-12-hour-smudge-free/p/12153?pps=3&productId=12153&redirectpath=slug&skuId=12151",
      "kind": "product"
    }
  ],
  "98": [
    {
      "label": "Crocs jibbitz",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/jibbitz/crocs/crocs-black-jibbitz-letter-p/27874688/buy",
      "kind": "product"
    },
    {
      "label": "Crocs jibbitz",
      "retailer": "Nykaa",
      "url": "https://www.nykaa.com/crocs-football-helmet-jibbitz-shoe-charm/p/5161512",
      "kind": "product"
    }
  ],
  "99": [
    {
      "label": "Embroidered shirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/topwear/zolo-label/zolo-label-women-black-handcrafted-embroidered-cotton-shirt-top/37107004/buy",
      "kind": "product"
    },
    {
      "label": "Embroidered shirt",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/only-womens-embroidered-regular-fit-white-shirt/p/22713460",
      "kind": "product"
    }
  ],
  "100": [
    {
      "label": "Faux fur coat",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/faux-fur-coat",
      "kind": "collection"
    },
    {
      "label": "Faux-fur coats",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-outerwear-fur-l1189.html",
      "kind": "collection"
    }
  ],
  "101": [
    {
      "label": "Sequin saree",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sequin-saree",
      "kind": "collection"
    },
    {
      "label": "Sequin saree",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/dress-dazzle-black-georgette-sequin-saree-with-unstitched/p/21580707",
      "kind": "product"
    }
  ],
  "102": [
    {
      "label": "Bandage dress",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/uptownie/uptownie-stretchable-ribbed-bandage-dress/27911426/buy",
      "kind": "product"
    },
    {
      "label": "Bandage dress",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/uptownie-lite-women-s-stretchable-ribbed-bandage-dress/p/14161616",
      "kind": "product"
    }
  ],
  "103": [
    {
      "label": "Lace trim satin skirt",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/skirts/pookiie/pookiie-women-satin-lace-trim-maxi-skirt/40143342/buy",
      "kind": "product"
    },
    {
      "label": "Lace-trim satin skirt",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/lace-trim-satin-midi-skirt-p04391538.html",
      "kind": "product"
    }
  ],
  "104": [
    {
      "label": "Relaxed-fit blazer",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/blazers/boohoo/boohoo-relaxed-fit-blazer/24826032/buy",
      "kind": "product"
    },
    {
      "label": "Fluid relaxed blazer",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/fluid-relaxed-fit-blazer-p04651736.html",
      "kind": "product"
    }
  ],
  "105": [
    {
      "label": "Dark baggy jeans",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/jeans/stylecast/stylecast-men-baggy-fit-mid-rise-dark-jeans/40045115/buy",
      "kind": "product"
    },
    {
      "label": "Dark baggy jeans",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/snitch-men-dark-brown-washed-baggy-fit-casual-jeans/p/22781864",
      "kind": "product"
    }
  ],
  "106": [
    {
      "label": "Saree gown",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/oneknotone/one-knot-one-one-shoulder-embellished-satin-maxi-saree-gown/29528248/buy",
      "kind": "product"
    },
    {
      "label": "Saree gown",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/afew-rahul-mishra-saree-gown/p/24867940",
      "kind": "product"
    }
  ],
  "107": [
    {
      "label": "Pearl back necklace",
      "retailer": "Bodystrands",
      "url": "https://www.bodystrands.com/shop/pearl-lariat-backdrop",
      "kind": "collection"
    },
    {
      "label": "Lariat back necklace",
      "retailer": "AMYO Bridal",
      "url": "https://www.amyobridal.com/products/mika-lariat-back-necklace-gold",
      "kind": "product"
    }
  ],
  "108": [
    {
      "label": "Silver ring",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/silver-rings-for-men",
      "kind": "collection"
    },
    {
      "label": "Silver ring",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/nvr-mens-silver-metal-ring/p/14753296",
      "kind": "product"
    }
  ],
  "109": [
    {
      "label": "Mint green sweater",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sweaters/basicsbytokyotalkies/basics-by-tokyo-talkies-women-mint-green-pullover/15562194/buy",
      "kind": "product"
    },
    {
      "label": "Mint rib-knit jumper",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1171541014.html",
      "kind": "product"
    }
  ],
  "110": [
    {
      "label": "Suede jacket",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/jackets/instafabplus/instafab-plus-women-suede-lightweight-bomber-jacket/37827236/buy",
      "kind": "product"
    },
    {
      "label": "Suede jackets",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-outerwear-suede-l1214.html",
      "kind": "collection"
    }
  ],
  "111": [
    {
      "label": "Red heels",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/heels/elle/elle-women-red-solid-block-heels/17079116/buy",
      "kind": "product"
    },
    {
      "label": "Red heels",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/shoetopia-women-red-heels/p/9894631",
      "kind": "product"
    }
  ],
  "112": [
    {
      "label": "Cherry red bag",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/handbags/carrylux/carrylux-pu-structured-handheld-bag/38488181/buy",
      "kind": "product"
    },
    {
      "label": "Cherry red bag",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/kazo-cherry-red-bianca-glaze-shoulder-bag-m/p/21552501",
      "kind": "product"
    }
  ],
  "113": [
    {
      "label": "Silk bandana scarf",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/hair-accessory/hairdramaco/hair-drama-co-women-abstract-floral-print-silk-satin-bandana-head-wrap-scarf/35155309/buy",
      "kind": "product"
    },
    {
      "label": "Silk bandana scarf",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/floral-beaded-silk-bandana-scarf-p03921010.html",
      "kind": "product"
    }
  ],
  "114": [
    {
      "label": "Flare jeans",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/women-flare-jeans",
      "kind": "collection"
    },
    {
      "label": "Flared jeans",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-jeans-flare-l1132.html",
      "kind": "collection"
    }
  ],
  "115": [
    {
      "label": "Long robe coat",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/women-long-coat",
      "kind": "collection"
    },
    {
      "label": "Long coats",
      "retailer": "Zara",
      "url": "https://www.zara.com/in/en/woman-outerwear-long-l4444.html",
      "kind": "collection"
    }
  ],
  "116": [
    {
      "label": "Lilac knit sweater",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/sweaters/levis/levis-self-design-knitted-round-neck-pure-cotton-pullover/26296512/buy",
      "kind": "product"
    },
    {
      "label": "Lilac knit sweater",
      "retailer": "Nykaa Fashion",
      "url": "https://www.nykaafashion.com/madame-cable-knit-embellished-lilac-sweater/p/13852186",
      "kind": "product"
    }
  ],
  "117": [
    {
      "label": "Tuxedos",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/mens-tuxedo",
      "kind": "collection"
    },
    {
      "label": "Tuxedo jacket",
      "retailer": "H&M",
      "url": "https://www2.hm.com/en_in/productpage.1246740001.html",
      "kind": "product"
    }
  ],
  "118": [
    {
      "label": "Evening opera gloves",
      "retailer": "Fancydresswale",
      "url": "https://www.fancydresswale.com/products/fancydresswale-women-evening-opera-satin-gloves-fingerless-gathered-lace-sequins-bridal-and-costume-party-gloves",
      "kind": "product"
    },
    {
      "label": "Black velvet gown",
      "retailer": "Myntra",
      "url": "https://www.myntra.com/dresses/athena/athena-black-halter-neck-velvet-gown/15980672/buy",
      "kind": "product"
    }
  ]
};

function fashionShopHTML(e) {
  if (isG || !FASHION_SHOP[e.n]) return "";
  const escape = value => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const retailers = [...new Map(FASHION_SHOP[e.n].map(item => [item.retailer, item])).values()];
  return `<div class="fact fact-shop"><dt>Shop the look</dt><dd class="shop-look"><div class="shop-links">${retailers.map(item => `<a href="${escape(item.url)}" target="_blank" rel="noopener noreferrer" title="${escape(item.label)}" aria-label="${escape(item.label)} at ${escape(item.retailer)} (opens in a new tab)">${escape(item.retailer)}<span aria-hidden="true">↗</span></a>`).join("")}</div></dd></div>`;
}
