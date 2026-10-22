// Actor look references for the Fashion edition only.
// Includes archival film, television, campaign and public-appearance examples.
// Checked 2026-10-22. A reference illustrates the named detail, not the entire trend.
const FASHION_SIGHTINGS = {
  "1": {
    "actor": "Alia Bhatt",
    "note": "Handwoven Dhakai Jamdani sari with a chikankari blouse for Durga Puja.",
    "url": "https://www.vogue.in/content/alia-bhatts-custom-olive-dhakai-jamdani-sari-was-handwoven-over-three-months",
    "sourceTitle": "Alia Bhatt's custom olive Dhakai Jamdani sari was handwoven over three months | Vogue India"
  },
  "2": {
    "actor": "Sonam Kapoor",
    "note": "Barrette clips and decorative hair accessories, documented by Vogue India.",
    "url": "https://www.vogue.in/content/sonam-kapoor-loves-to-accessorise-her-hair-with-bows-scarves-and-flowers-take-inspiration-from-the-star",
    "sourceTitle": "Sonam Kapoor loves to accessorise her hair with bows, scarves and flowers-take inspiration from the star | Vogue India"
  },
  "3": {
    "actor": "Saif Ali Khan",
    "note": "Glasses, layered knitwear and a buttoned shirt in his Esquire India cover shoot.",
    "url": "https://www.esquireindia.co.in/entertainment/the-interview/here-are-all-images-from-our-cover-shoot-with-saif-ali-khan",
    "sourceTitle": "Exclusive Cover Shoot: Saif Ali Khan for Esquire India"
  },
  "4": {
    "actor": "Shilpa Shetty Kundra",
    "note": "A Manish Malhotra sequin sari with its pallu attached at a waist belt.",
    "url": "https://www.ndtv.com/lifestyle/shilpa-shetty-aces-ethnic-look-yet-again-in-a-manish-malhotra-sequin-saree-2701950",
    "sourceTitle": "Shilpa Shetty Aces Ethnic Look Yet Again In A Manish Malhotra Sequin Saree"
  },
  "5": {
    "actor": "Zendaya",
    "note": "A sports jersey with a plaid midi skirt at a Berlin Spider-Man photocall.",
    "url": "https://www.elle.com/culture/celebrities/a71665493/zendaya-sports-jersey-preppy-outfit-berlin-details-photos/",
    "sourceTitle": "Zendaya Gives the Sports Jersey a Preppy Twist in Berlin"
  },
  "6": {
    "actor": "Sonam Kapoor",
    "note": "A mirror-work corset and embellished jacket with a slit skirt and sneakers.",
    "url": "https://www.indiaforums.com/article/sonam-kapoor-once-again-aces-her-fashion-game-dishes-out-streetstyle-offbeat-vibes-in-new-look-pics_195272",
    "sourceTitle": "Sonam Kapoor once again aces her fashion game; dishes out street-style offbeat vibes in new ..."
  },
  "7": {
    "actor": "Gwyneth Paltrow",
    "note": "A minimal Calvin Klein slip dress at the 1996 Oscars.",
    "url": "https://www.vogue.co.uk/fashion/gallery/gwyneth-paltrow-90s-style",
    "sourceTitle": "Gwyneth Paltrow’s Minimalist ’90s Style Was Unmatched | British Vogue"
  },
  "8": {
    "actor": "Alia Bhatt",
    "note": "An ombre chiffon sari at the Ve Kamleya song launch for Rocky Aur Rani Kii Prem Kahaani.",
    "url": "https://bangaloremirror.indiatimes.com/entertainment/bollywood/chiffon-chic/amp_articleshow/101881393.cms",
    "sourceTitle": "Chiffon chic - Bangalore Mirror"
  },
  "9": {
    "actor": "Pamela Anderson",
    "note": "A floral dress, cardigan and rubber rain boots while gardening.",
    "url": "https://people.com/pamela-anderson-floral-dress-cardigan-rain-boots-blueprint-2024-8640570",
    "sourceTitle": "Pamela Anderson's Floral Dress and Rain Boots Are What You'll Want to Wear for Spring Chores - Get the Look from $10"
  },
  "10": {
    "actor": "Deepika Padukone",
    "note": "A neon-green Giambattista Valli tulle gown at Cannes 2019.",
    "url": "https://www.vogue.in/content/deepika-padukone-cannes-2019-lime-green-dress-turban-met-gala-2019-theme-camp",
    "sourceTitle": "Deepika Padukone At Cannes 2019: Neon Green Gown & Turban | VOGUE India | Vogue India"
  },
  "11": {
    "actor": "Yami Gautam",
    "note": "Her mother's vintage sari and grandmother's dupatta and jewellery at her wedding.",
    "url": "https://www.bridestoday.in/beauty-grooming/story/exclusive-yami-gautam-shares-the-details-of-her-wedding-look-with-brides-today-576263-2021-06-10",
    "sourceTitle": "Exclusive: Yami Gautam's Wedding Outfit Brought Together 3 Generations of Her Family"
  },
  "12": {
    "actor": "Kriti Sanon",
    "note": "An Abhinav Mishra lehenga covered in mirror work.",
    "url": "https://www.vogue.in/content/kriti-sanons-abhinav-mishra-lehenga-turns-mirror-work-into-the-main-event",
    "sourceTitle": "Kriti Sanon’s Abhinav Mishra lehenga turns mirror work into the main event | Vogue India"
  },
  "13": {
    "actor": "Samantha Ruth Prabhu",
    "note": "Her wedding gown reworked into a black evening dress, worn after the wedding.",
    "url": "https://indianexpress.com/article/lifestyle/fashion/samantha-ruth-prabhu-sustainability-repurposed-wedding-gown-9291719/",
    "sourceTitle": "Samantha Ruth Prabhu repurposes 'beloved' wedding gown: 'We’re past that stage...'"
  },
  "14": {
    "actor": "Florence Pugh",
    "note": "A sheer pink Valentino gown at the house's couture show in Rome, 2022.",
    "url": "https://www.vogue.com/article/florence-pugh-takes-a-stance-against-body-shamers",
    "sourceTitle": "\"Grow Up. Respect People\": Florence Pugh Takes a Stance Against Body Shamers"
  },
  "15": {
    "actor": "Timothee Chalamet",
    "note": "A green turtleneck under a black blazer at a Lady Bird premiere.",
    "url": "https://www.vogue.com/article/can-men-wear-turtlenecks-holiday-style",
    "sourceTitle": "Are Men in Turtlenecks a Holiday Jolly or Folly?"
  },
  "16": {
    "actor": "Zendaya",
    "note": "The tennis wardrobe of Challengers, combining custom pieces and vintage sportswear.",
    "url": "https://www.vogue.com/article/zendayas-challengers-wardrobe-is-a-mix-of-custom-and-vintage",
    "sourceTitle": "Zendaya’s Challengers Wardrobe Is a Mix of Custom and Vintage | Vogue"
  },
  "17": {
    "actor": "Deepika Padukone",
    "note": "A white ruffled Abu Jani Sandeep Khosla sari at the Cannes 2022 closing ceremony.",
    "url": "https://www.vogue.in/vogue-closet/collection/deepika-padukone-all-white-abu-jani-sandeep-khosla-sari-cannes-2022",
    "sourceTitle": "Deepika Padukone channeled celestial grace in a sari on the last day of the Cannes Film Festival 2022 | Vogue India"
  },
  "18": {
    "actor": "Zendaya",
    "note": "Archival Mugler from 1995 at the Dune: Part Two London premiere.",
    "url": "https://apnews.com/article/87ac7ba32360e3e36acde91fcbbd1148",
    "sourceTitle": "Zendaya stuns at 'Dune: Part Two' world premiere in vintage silver cyborg suit by Mugler"
  },
  "19": {
    "actor": "Kareena Kapoor Khan",
    "note": "Kolhapuri chappals styled with a striped shirt and cargo trousers.",
    "url": "https://www.vogue.in/fashion/content/kareena-kapoor-khan-fashion-looks-unusual-pairings-gowns-sneakers-maxi-dresses",
    "sourceTitle": "Want to dress like Kareena Kapoor Khan? Throw out the fashion rulebook | Vogue India"
  },
  "20": {
    "actor": "Kriti Sanon",
    "note": "A tonal mocha-brown Burberry trench dress and knee-high boots.",
    "url": "https://www.vogue.in/content/radhika-merchant-ambanis-couture-tweed-and-priyanka-chopra-jonass-zimmerman-set-lead-this-weeks-best-looks",
    "sourceTitle": "Radhika Merchant Ambani’s couture tweed and Priyanka Chopra Jonas’s Zimmerman set lead this week’s best looks | Vogue India"
  },
  "21": {
    "actor": "Zendaya",
    "note": "A flesh-toned leather Balmain dress moulded to her form for the Venice Dune premiere.",
    "url": "https://www.vogue.com/article/zendaya-dune-paris-premiere-alaia",
    "sourceTitle": "Zendaya’s Latest ‘Dune’ Premiere Look Is an Ab-Baring Knockout | Vogue"
  },
  "22": {
    "actor": "Mouni Roy",
    "note": "An oversized tote paired with her relaxed Mumbai airport outfit.",
    "url": "https://news.abplive.com/web-stories/celebrities/mouni-roy-opts-for-chic-comfort-airport-look-1754956",
    "sourceTitle": "Mouni Roy Opts For A Chic & Comfy Airport Look, See Pics"
  },
  "23": {
    "actor": "Kiara Advani",
    "note": "A Manish Malhotra sari in Italian velvet with a lace blouse.",
    "url": "https://www.vogue.in/content/kiara-advanis-gothic-manish-malhotra-sari-and-blouse-are-crafted-from-italian-velvet-and-lace",
    "sourceTitle": "Kiara Advani’s gothic Manish Malhotra sari and blouse are crafted from Italian velvet and lace | Vogue India"
  },
  "24": {
    "actor": "Kiara Advani",
    "note": "A zipped denim corset with matching denim from S&N by Shantnu Nikhil.",
    "url": "https://www.vogue.in/vogue-closet/collection/kiara-advani-denim-on-denim-shantanu-nikhil-look",
    "sourceTitle": "Kiara Advani flaunts denim on denim in her latest S&amp;N by Shantnu Nikhil look | Vogue India"
  },
  "25": {
    "actor": "Priyanka Chopra Jonas",
    "note": "Layered necklaces, featured in Vogue India's celebrity jewellery edit.",
    "url": "https://www.vogue.in/fashion/gallery/the-celebrity-approved-way-to-wear-layered-necklaces",
    "sourceTitle": "The celebrity-approved way to wear layered necklaces | Vogue India"
  },
  "26": {
    "actor": "Sonam Kapoor Ahuja",
    "note": "A cottagecore dress with puff sleeves, a Peter Pan collar and white lace details.",
    "url": "https://www.vogue.in/content/sonam-kapoor-ahuja-gets-onto-the-white-summer-dress-trend-in-this-outfit-from-teuta-matoshi",
    "sourceTitle": "Sonam Kapoor Ahuja is stepping into her cottagecore era for summer | Vogue India"
  },
  "27": {
    "actor": "Sydney Sweeney",
    "note": "A white high-low dress with a large crystal-trimmed bow at an Euphoria cast appearance.",
    "url": "https://www.instyle.com/sydney-sweeney-all-white-high-low-dress-divisive-cape-11945394",
    "sourceTitle": "Sydney Sweeney's All-White High-Low Dress Has an Unexpected Coquette Detail and a Divisive Cape"
  },
  "28": {
    "actor": "Ananya Panday",
    "note": "Rahul Mishra's butterfly-inspired dress on the Paris couture runway, 2024.",
    "url": "https://indianexpress.com/article/entertainment/bollywood/ananya-panday-carries-a-giant-sieve-as-she-debuts-at-paris-fashion-week-confused-fans-want-to-know-why-watch-9122913/",
    "sourceTitle": "Ananya Panday carries a giant sieve as she debuts at Paris Fashion Week, confused fans want to know why. Watch | Bollywood News - The Indian Express"
  },
  "29": {
    "actor": "Cillian Murphy",
    "note": "An elongated black Zegna coat with cummerbund-style trousers at the BAFTAs.",
    "url": "https://www.vogue.com/slideshow/cillian-murphy-oscars-versace-winning-look",
    "sourceTitle": "Cillian Murphy Referenced Vintage Versace for His Winning Oscars Look | Vogue"
  },
  "30": {
    "actor": "Deepika Padukone",
    "note": "An ivory-and-gold lehenga with chikankari, crystals and gold zardozi embroidery.",
    "url": "https://www.vogue.in/weddings/content/deepika-padukone-designer-lehengas-traditional-wear-blouse-design",
    "sourceTitle": "9 wedding-ready lehengas from Deepika Padukone’s traditional wear wardrobe | Vogue India"
  },
  "31": {
    "actor": "Amy Adams",
    "note": "An ivory Schiaparelli suit with golden padlocks and a gold astrology necklace.",
    "url": "https://schiaparelli.com/en/blogs/news/amy-adams-wore-schiaparelli-spring-summer-2021-ready-to-wear",
    "sourceTitle": "AMY ADAMS WORE SCHIAPARELLI SPRING SUMMER 2021 READY-TO-WEAR"
  },
  "32": {
    "actor": "Sonam Kapoor",
    "note": "A red sari paired with a cropped kaftan blouse while hosting David Beckham.",
    "url": "https://www.news9live.com/lifestyle/fashion/sonam-kapoors-crop-kaftan-blouse-an-absolute-must-have-2351420",
    "sourceTitle": "Sonam Kapoor's crop kaftan blouse: An absolute must-have | Fashion News - News9live"
  },
  "33": {
    "actor": "Jacob Elordi",
    "note": "An automatic platinum Cartier Tank on a burgundy leather strap at the Academy Museum Gala.",
    "url": "https://www.gq.com/story/jacob-elordi-cartier-tank-upgrade-10-20-26",
    "sourceTitle": "Jacob Elordi's New Cartier Is Secretly Extra Fancy"
  },
  "34": {
    "actor": "Alia Bhatt",
    "note": "Shaded saris worn throughout the Rocky Aur Rani Kii Prem Kahaani promotional tour.",
    "url": "https://hauterrfly.com/fashion/alia-bhatt-saree-ranveer-singh-rocky-aur-rani-kii-prem-kahaani-promotions-ranveer-singh/",
    "sourceTitle": "Alia Bhatt Romancing Shaded Sarees For Rocky Aur Rani Promotions Is A Prem Kahanii We Love!"
  },
  "35": {
    "actor": "Cillian Murphy",
    "note": "An Oppenheimer-inspired Sauvereign brooch at the 2024 Oscars.",
    "url": "https://www.gq.com/story/cillian-murphy-oscars-2024-versace-tuxedo-exclusive-photos",
    "sourceTitle": "Cillian Murphy's Oscars Tux Had a Nod to His Native Ireland"
  },
  "36": {
    "actor": "Deepika Padukone",
    "note": "Kanjivaram saris from Advaya by Angadi Galleria, documented in Vogue India's wedding gallery.",
    "url": "https://www.vogue.in/galleries/deepika-angadi",
    "sourceTitle": "Everything you need to know about Deepika Padukone’s Kanjivaram saris | Vogue India"
  },
  "37": {
    "actor": "Deepika Padukone",
    "note": "Shantipriya's bright-pink retro salwar look in Om Shanti Om.",
    "url": "https://www.idiva.com/fashion/celebrity-style/on-deepika-padukones-birthday-revisiting-her-most-iconic-onscreen-fashion-looks-of-all-times/photogallery/18072371",
    "sourceTitle": "Deepika Padukone Most Iconic Onscreen Fashion Moments"
  },
  "38": {
    "actor": "Taapsee Pannu",
    "note": "A printed sari worn with sneakers on a Saint Petersburg trip.",
    "url": "https://www.ndtv.com/lifestyle/taapsee-pannu-takes-over-saint-petersburg-in-style-wearing-a-printed-saree-with-sneakers-2469482",
    "sourceTitle": "Taapsee Pannu Takes Over Saint Petersburg In Style Wearing A Printed <i>Saree</i> With Sneakers"
  },
  "39": {
    "actor": "Kareena Kapoor Khan",
    "note": "Sanjana's baby tees, flared jeans and butterfly clips in Main Prem Ki Diwani Hoon.",
    "url": "https://www.femina.in/fashion/celeb-style/gen-z-is-dressing-like-bollywoods-most-iconic-divas-again-290939.html",
    "sourceTitle": "Gen Z Is Dressing Like Bollywood's Most Iconic Divas Again | Femina.in"
  },
  "40": {
    "actor": "Vidya Balan",
    "note": "A tonal sari with silver zari detailing and a matching blouse.",
    "url": "https://www.ndtv.com/lifestyle/another-day-another-gorgeous-saree-look-by-vidya-balan-2296168",
    "sourceTitle": "Another Day, Another Gorgeous <i>Saree</i> Look By Vidya Balan"
  },
  "41": {
    "actor": "Gwyneth Paltrow",
    "note": "Logo-free, neutral tailoring during her Utah court appearances in 2023.",
    "url": "https://www.theguardian.com/film/2023/mar/29/billionaire-chic-gwyneth-court-wardrobe-viral",
    "sourceTitle": "Billionaire chic: the meaning of Gwyneth Paltrow’s court wardrobe | Gwyneth Paltrow | The Guardian"
  },
  "42": {
    "actor": "Hina Khan",
    "note": "A dark-plum embroidered lehenga from Osaa by Adarsh for an Aza shoot.",
    "url": "https://timesofindia.indiatimes.com/life-style/fashion/style-guide/hina-khans-aubergine-lehenga-with-a-sweetheart-neck-choli-is-the-perfect-wedding-outfit-of-the-season/photostory/90374579.cms",
    "sourceTitle": "Hina Khan's aubergine lehenga with a sweetheart neck choli is the perfect wedding outfit of the season"
  },
  "43": {
    "actor": "Dakota Johnson",
    "note": "A vintage 1920s lace-trim slip dress sourced from eBay.",
    "url": "https://www.whowhatwear.com/fashion/celebrity-style/black-ballet-flats-green-dress-brown-suede-jacket-outfit-dakota-johnson-2026",
    "sourceTitle": "Chic Women in Their Late 30s Are Ditching Flip-Flops for This French Shoe Trend This Autumn"
  },
  "44": {
    "actor": "Keanu Reeves",
    "note": "His recurring suit-and-T-shirt uniform, documented across decades by GQ.",
    "url": "https://www.gq.com/story/keanu-reeves-same-outfit-suit-and-t-shirt",
    "sourceTitle": "Keanu Reeves Has Been Wearing the Same Outfit for 25 ..."
  },
  "45": {
    "actor": "Alia Bhatt",
    "note": "A rani-pink sari at a Rocky Aur Rani Kii Prem Kahaani event.",
    "url": "https://www.ndtv.com/entertainment/make-way-for-alia-bhatt-in-everything-rani-pink-see-stunning-pics-4266769",
    "sourceTitle": "Make Way For Alia Bhatt In \"Everything Rani Pink.\" See Stunning Pics"
  },
  "46": {
    "actor": "Shilpa Shetty Kundra",
    "note": "A pre-draped Tanieya Khanuja sari, documented by Vogue India.",
    "url": "https://www.vogue.in/content/shilpa-shetty-loved-her-pre-draped-saris-and-this-tanieya-khanuja-creation-is-proof",
    "sourceTitle": "Shilpa Shetty loves her pre-draped saris and this Tanieya Khanuja creation is proof | Vogue India"
  },
  "47": {
    "actor": "Zendaya",
    "note": "The silver Mugler robot suit at the Dune: Part Two London premiere.",
    "url": "https://apnews.com/article/87ac7ba32360e3e36acde91fcbbd1148",
    "sourceTitle": "Zendaya stuns at 'Dune: Part Two' world premiere in vintage silver cyborg suit by Mugler"
  },
  "48": {
    "actor": "Sonam Kapoor",
    "note": "An Anamika Khanna sari-gown with a sheer cape at Cannes 2014.",
    "url": "https://www.mid-day.com/entertainment/bollywood-news/photo/cannes-2026-saree-looks-that-turned-heads-at-the-french-riviera-111059/4",
    "sourceTitle": "Cannes 2026: Saree looks that turned heads at the French Riviera"
  },
  "49": {
    "actor": "Kristen Stewart",
    "note": "A vintage Pixies tee and frayed shirt during The Wrong Girls press tour.",
    "url": "https://www.gq-magazine.co.uk/article/kristen-stewart-jacket-august-2026",
    "sourceTitle": "Every guy will look great in Kristen Stewart's jacket | British GQ"
  },
  "50": {
    "actor": "Zendaya",
    "note": "Sneakerinas with black shorts and a pink sweater from The Row.",
    "url": "https://www.vogue.com/article/zendaya-chloe-sevigny-sneakerina",
    "sourceTitle": "Zendaya Adds Chloë Sevigny’s Favorite Sneakerina to Her Closet | Vogue"
  },
  "51": {
    "actor": "Alia Bhatt",
    "note": "Stacked bangles with an ice-blue sari and strapless corset blouse.",
    "url": "https://www.vogue.in/content/alia-bhatt-made-a-case-for-a-modern-sari-with-a-strapless-corset-blouse",
    "sourceTitle": "Alia Bhatt made a case for a modern sari with a strapless corset blouse | Vogue India"
  },
  "52": {
    "actor": "Genelia D'Souza",
    "note": "Dark-blue jeans with numeric and star-shaped patchwork detailing.",
    "url": "https://timesofindia.indiatimes.com/life-style/fashion/style-guide/5-times-bollywood-celebs-aced-the-quirky-denim-jeans-trend/photostory/118734595.cms",
    "sourceTitle": "5 times Bollywood celebs aced the quirky jeans trend"
  },
  "53": {
    "actor": "Rashmika Mandanna",
    "note": "An indigo Raw Mango silk sari with an embroidered border.",
    "url": "https://timesofindia.indiatimes.com/life-style/fashion/celeb-style/rashmika-mandannas-raw-mango-saree-is-a-love-letter-to-indian-handlooms-at-her-meeting-with-cm-thalapathy-vijay/amp_etphotostory/134917777.cms",
    "sourceTitle": "Rashmika Mandanna’s Raw Mango saree is a love letter to Indian handlooms at her meeting with CM Thalapathy Vijay"
  },
  "54": {
    "actor": "Alia Bhatt",
    "note": "Oversized silver-toned chandbalis with her ice-blue sari.",
    "url": "https://www.vogue.in/content/alia-bhatt-made-a-case-for-a-modern-sari-with-a-strapless-corset-blouse",
    "sourceTitle": "Alia Bhatt made a case for a modern sari with a strapless corset blouse | Vogue India"
  },
  "55": {
    "actor": "Bhumi Pednekkar",
    "note": "A black-velvet corset sari with crystal-traced animal stripes.",
    "url": "https://www.vogue.in/content/bhumi-pednekkar-wears-a-corset-sari-embellished-with-crystal-traced-animal-stripes",
    "sourceTitle": "Bhumi Pednekkar wears a corset sari embellished with crystal-traced animal stripes | Vogue India"
  },
  "56": {
    "actor": "Nicole Kidman",
    "note": "A tie-front ballet-wrap sweater worn for a flight.",
    "url": "https://www.instyle.com/nicole-kidman-ballet-wrap-sweater-amazon-march-2026-11931115",
    "sourceTitle": "Nicole Kidman, 58, Just Sold Me on This Rich-Looking Cardigan That's Perfect for Spring Travel-From $20 on Amazon"
  },
  "57": {
    "actor": "Shruti Haasan",
    "note": "Lace-up combat boots with a floral dress for a grunge-inspired look.",
    "url": "https://www.vogue.in/vogue-closet/collection/shruti-haasan-channels-tumblr-era-grunge-in-this-florals-and-combat-boots-combo",
    "sourceTitle": "Shruti Haasan channels grunge in a floral dress and combat boots combo | Vogue India"
  },
  "58": {
    "actor": "Anne Hathaway",
    "note": "Andy's cerulean-blue sweater in The Devil Wears Prada, 2006.",
    "url": "https://people.com/anne-hathaway-kicks-off-devil-wears-prada-2-in-cerulean-blue-sweatshirt-11937506",
    "sourceTitle": "Anne Hathaway Kicks Off \"The Devil Wears Prada 2 \"Promo Wearing Cerulean Blue Sweatshirt"
  },
  "59": {
    "actor": "Ranveer Singh",
    "note": "A floral suit, documented in GQ India's printed-tailoring edit.",
    "url": "https://www.gqindia.com/content/how-to-cop-the-ranveer-singh-floral-suit",
    "sourceTitle": "How to cop the Ranveer Singh floral suit style | GQ India | GQ India"
  },
  "60": {
    "actor": "Dakota Johnson",
    "note": "A pistachio-coloured, nightgown-inspired slip dress with lace trim.",
    "url": "https://www.marieclaire.com/fashion/celebrity-style/dakota-johnson-slip-dress-suede-jacket/",
    "sourceTitle": "Dakota Johnson Manifests Vintage Girl Fall in a Silk Nightgown and $3,450 Suede Bag"
  },
  "61": {
    "actor": "Kiara Advani",
    "note": "A soft rose-pink Manish Malhotra lehenga at her wedding.",
    "url": "https://www.vogue.in/fashion/content/kiara-advani-chose-a-soft-rose-lehenga-for-her-wedding-ensemble",
    "sourceTitle": "Kiara Advani chose a soft rose lehenga for her wedding ensemble | Vogue India"
  },
  "62": {
    "actor": "Ranveer Singh",
    "note": "A green sheer embroidered shirt under a textured coat.",
    "url": "https://www.filmibeat.com/bollywood/features/2026/ranveer-singh-vijay-verma-to-saqib-saleem-top-5-actors-serving-main-character-energy-in-sheer-shir-504293.html",
    "sourceTitle": "Ranveer Singh, Vijay Verma to Saqib Saleem: TOP 5 Actors Serving Main-Character Energy in Sheer Shirts - Filmibeat"
  },
  "63": {
    "actor": "Ranveer Singh",
    "note": "A Louis Vuitton denim workwear jacket with matching jeans.",
    "url": "https://www.vogue.in/fashion/content/a-deeper-look-at-ranveer-singhs-statement-style-and-love-for-logos",
    "sourceTitle": "A deeper look at Ranveer Singh's statement style and love for logos | Vogue India"
  },
  "64": {
    "actor": "Ananya Panday",
    "note": "A soft-yellow gingham sari paired with a flower-covered blouse.",
    "url": "https://www.ndtv.com/lifestyle/ananya-pandays-gajra-blouse-takes-her-spring-core-saree-to-new-heights-7541023",
    "sourceTitle": "Ananya Panday's Gajra Blouse Takes Her Spring-Core Saree To New Heights"
  },
  "65": {
    "actor": "Michael B. Jordan and Hailee Steinfeld",
    "note": "Vampire-fang grills at the Sinners London photocall, April 2025.",
    "url": "https://people.com/sinners-cast-method-dressing-vampire-fang-grills-london-photocall-11716516",
    "sourceTitle": "Michael B. Jordan, Hailee Steinfeld and More \"Sinners\" Actors Lean into Method Dressing with Vampire Fang Grills in London"
  },
  "66": {
    "actor": "Alia Bhatt",
    "note": "Shanaya's feminine co-ords and polished mini-skirt styling in Student of the Year.",
    "url": "https://www.femina.in/fashion/celeb-style/gen-z-is-dressing-like-bollywoods-most-iconic-divas-again-290939.html",
    "sourceTitle": "Gen Z Is Dressing Like Bollywood's Most Iconic Divas Again | Femina.in"
  },
  "67": {
    "actor": "Janhvi Kapoor",
    "note": "An ivory sari with a strapless embellished blouse during Mili promotions.",
    "url": "https://www.indiatoday.in/lifestyle/fashion/photo/janhvi-kapoor-gives-a-bold-twist-to-saree-with-a-strapless-blouse-for-mili-promotions-pics-here-2291363-2022-10-31",
    "sourceTitle": "Janhvi Kapoor gives a bold twist to saree with a strapless blouse for Mili promotions. Pics here - India Today"
  },
  "68": {
    "actor": "Neha Dhupia",
    "note": "A white embroidered kurta, silver earrings and bindi for Baisakhi at home.",
    "url": "https://www.vogue.in/vogue-closet/collection/neha-dhupia-baisakhi-2020-white-embroidered-kurta-bindi-silver-earrings-angad-bedi-video-home-mumbai",
    "sourceTitle": "Neha Dhupia celebrated Baisakhi 2020 at home in this breezy white embroidered kurta | Vogue India"
  },
  "69": {
    "actor": "Sonam Kapoor Ahuja",
    "note": "An oversized black Burberry blazer with precisely tailored straight trousers.",
    "url": "https://www.vogue.in/vogue-closet/collection/comes-rocking-suit-sonam-kapoor-ahujas-ensemble-go-guide",
    "sourceTitle": "When it comes to rocking a suit, Sonam Kapoor Ahuja's ensemble is your go-to guide | Vogue India"
  },
  "70": {
    "actor": "Sydney Sweeney",
    "note": "A butter-yellow dress, documented by Harper's Bazaar.",
    "url": "https://www.harpersbazaar.com/celebrity/latest/a70288863/sydney-sweeney-butter-yellow-dress/",
    "sourceTitle": "Sydney Sweeney Is Dripping in Butter Yellow"
  },
  "71": {
    "actor": "Ranveer Singh",
    "note": "A green lungi with a white shirt and matching sneakers.",
    "url": "https://indianexpress.com/article/lifestyle/fashion/bear-grylls-lungi-man-vs-wild-bollywood-lungi-moments-8688198/lite/",
    "sourceTitle": "Bear Grylls effortlessly rocks the lungi on Man Vs Wild; a look at times Bollywood actors donned this garment | Fashion News - The Indian Express"
  },
  "72": {
    "actor": "Ayushmann Khurrana",
    "note": "A powder-blue Tisa bandhgala-style suit with white Valentino sneakers.",
    "url": "https://www.hindustantimes.com/lifestyle/fashion/ayushmann-khurranas-dapper-powder-blue-suit-is-a-must-have-to-make-a-statement-at-the-next-party-you-attend-all-pics-101683791172623.html",
    "sourceTitle": "Ayushmann Khurrana's dapper powder blue suit is a must-have to make a statement at the next party you attend. All pics | Fashion Trends"
  },
  "73": {
    "actor": "Kriti Sanon",
    "note": "An asymmetrical Herve Leger fringe dress that adds texture to a monochrome look.",
    "url": "https://www.vogue.in/content/kriti-sanon-makes-a-case-for-texture-in-monochromatic-outfits-with-her-herve-leger-dress",
    "sourceTitle": "Kriti Sanon makes a case for texture in monochromatic outfits with her Hervé Léger fringe dress | Vogue India"
  },
  "74": {
    "actor": "Soha Ali Khan",
    "note": "A floaty, multicoloured printed kaftan.",
    "url": "https://www.ndtv.com/lifestyle/like-soha-ali-khan-wear-your-mood-when-you-have-colourful-kaftans-2422720",
    "sourceTitle": "Like Soha Ali Khan, \"Wear Your Mood\" When You Have Colourful Kaftans"
  },
  "75": {
    "actor": "Yerin Ha",
    "note": "Sophie Baek's empire-waist gown, gloves and mask in Bridgerton.",
    "url": "https://www.instyle.com/yerin-ha-bridgerton-interview-2026-11881609",
    "sourceTitle": "Bridgerton's Yerin Ha Needs No Saving: \"I Did Feel a Little Bit Invincible\""
  },
  "76": {
    "actor": "Selena Gomez",
    "note": "A vintage-inspired take on office-siren dressing, documented by Vogue.",
    "url": "https://www.vogue.com/article/selena-gomez-vintage-inspired-office-siren",
    "sourceTitle": "Selena Gomez Delivers a Grown-Up (And Vintage-Inspired!) Take On the Office Siren | Vogue"
  },
  "77": {
    "actor": "Leighton Meester",
    "note": "Blair Waldorf's coordinated cardigans and school-uniform styling in Gossip Girl.",
    "url": "https://www.teenvogue.com/gallery/gossip-girl-fashion",
    "sourceTitle": "Gossip Girl Fashion"
  },
  "78": {
    "actor": "Priyanka Chopra Jonas",
    "note": "A grey lace-up corset blazer with a shaped peplum, worn in New York.",
    "url": "https://www.instyle.com/priyanka-chopra-pirate-corset-blazer-top-11915101",
    "sourceTitle": "Priyanka Chopra Switches Up Her Signature Style and Gives Her Gray Corset Top a Pirate-Inspired Twist"
  },
  "79": {
    "actor": "Mrunal Thakur",
    "note": "A salmon Chanderi Anarkali with floral panels and hand-finished aari edges.",
    "url": "https://www.vogue.in/content/mrunal-thakurs-salmon-chanderi-anarkali-layers-digital-jaal-with-hand-finished-aari-edges",
    "sourceTitle": "Mrunal Thakur's salmon Chanderi anarkali layers digital ..."
  },
  "80": {
    "actor": "Deepika Padukone",
    "note": "Temple-inspired gold jewellery with her Kanjeevaram sari at her Konkani wedding.",
    "url": "https://indianexpress.com/article/lifestyle/fashion/gold-grace-and-goddesses-actors-mastering-the-temple-jewellery-look-10533373/",
    "sourceTitle": "Gold, grace, and goddesses: Actors mastering the temple jewellery look | Fashion News - The Indian Express"
  },
  "81": {
    "actor": "Jennifer Lawrence",
    "note": "A teal crewneck sweater with a peach slip skirt in New York.",
    "url": "https://www.harpersbazaar.com/celebrity/latest/a73708377/jennifer-lawrence-teal-blue-summer-style-streak-photos/",
    "sourceTitle": "Jennifer Lawrence's Summer Style Streak Is All About This Cheerful Color"
  },
  "82": {
    "actor": "Deepika Padukone",
    "note": "A gold crush potli with a beige Masaba kurta set at WAVES 2025.",
    "url": "https://www.pinkvilla.com/fashion/CelebFashion/deepika-padukone-is-back-with-new-ethnic-fashion-inspo-in-beige-kurta-set-and-chandelier-earrings-for-waves-2025-1385348",
    "sourceTitle": "Deepika Padukone goes elegant in beige Masaba Gupta kurta set and chandelier earrings for Waves 2025 | PINKVILLA: Fashion"
  },
  "83": {
    "actor": "Deepika Padukone",
    "note": "The bindi chosen for her everyday Bengali character in Piku.",
    "url": "https://indianexpress.com/article/entertainment/bollywood/i-have-never-been-insecure-deepika-padukone/",
    "sourceTitle": "I have never been insecure: Deepika Padukone | Bollywood News - The Indian Express"
  },
  "84": {
    "actor": "Priyanka Chopra Jonas",
    "note": "A black-and-white polka-dot maxi dress during Cannes Lions.",
    "url": "https://www.harpersbazaar.com/celebrity/latest/a71694797/priyanka-chopra-cannes-lions-sheer-polka-dot-maxi-dress-summer-style/",
    "sourceTitle": "Priyanka Chopra's Cannes Summer Wardrobe Includes a Sheer Polka-Dot Maxi Dress"
  },
  "85": {
    "actor": "Kareena Kapoor Khan",
    "note": "A leopard-print Sabyasachi sari with a matching cape at a Delhi event.",
    "url": "https://inshorts.com/en/news/kareena-dons-animal-print-sabyasachi-saree-with-matching-cape-1760100644443",
    "sourceTitle": "Kareena dons animal-print Sabyasachi saree with matching cape"
  },
  "86": {
    "actor": "Jenna Ortega",
    "note": "A black-lace Vivienne Westwood gown at a Beetlejuice Beetlejuice photocall in Mexico City.",
    "url": "https://www.harpersbazaar.com/celebrity/latest/a61875921/jenna-ortega-vivienne-westwood-dress-beetlejuice-beetlejuice/",
    "sourceTitle": "Jenna Ortega Ditches Wednesday-core for a Romantic Gothic Look"
  },
  "87": {
    "actor": "Kriti Sanon",
    "note": "A white fringe dress and boots during Teri Baaton Mein Aisa Uljha Jiya promotions.",
    "url": "https://www.ndtv.com/lifestyle/for-the-promotion-of-teri-baaton-mein-aisa-uljha-jiya-kriti-sanon-serves-weekend-drama-right-in-a-stunning-white-fringe-dress-4897383",
    "sourceTitle": "For The Promotion Of <i>Teri Baaton Mein Aisa Uljha Jiya</i>, Kriti Sanon Serves Weekend Drama Right In A Stunning White Fringe Dress"
  },
  "88": {
    "actor": "Zendaya",
    "note": "A sports jersey softened with a plaid midi skirt at her Berlin photocall.",
    "url": "https://www.elle.com/culture/celebrities/a71665493/zendaya-sports-jersey-preppy-outfit-berlin-details-photos/",
    "sourceTitle": "Zendaya Gives the Sports Jersey a Preppy Twist in Berlin"
  },
  "89": {
    "actor": "Emma Watson",
    "note": "Ivy League-inspired layering, with a sweater draped over her shoulders.",
    "url": "https://www.vogue.co.uk/article/emma-watson-ivy-league-style",
    "sourceTitle": "Emma Watson Shows Off Her Preppy Side | British Vogue"
  },
  "90": {
    "actor": "Keanu Reeves",
    "note": "Well-worn white sneakers with distressed jeans and a leather motorcycle jacket.",
    "url": "https://i-d.co/article/keanu-reeves-style-evolution-fashion-best-outfits/",
    "sourceTitle": "A guide to Keanu Reeves’ style evolution"
  },
  "91": {
    "actor": "Ananya Panday",
    "note": "A patchwork Oshadi denim coat over a white bralette and trousers.",
    "url": "https://www.vogue.in/vogue-closet/collection/ananya-panday-white-bralette-trousers-denim-patchwork-jacket-coat-gold-rings",
    "sourceTitle": "Ananya Panday’s patchwork denim coat is the ultimate layer for mid-season weather | Vogue India"
  },
  "92": {
    "actor": "Emma Watson",
    "note": "A Calvin Klein ensemble made with recycled plastic bottles at the 2016 Met Gala.",
    "url": "https://www.vogue.co.uk/fashion/gallery/emma-watson-sustainable-fashion",
    "sourceTitle": "13 Of Emma Watson’s Best Sustainable Looks To Date | British Vogue"
  },
  "93": {
    "actor": "Rachel Brosnahan",
    "note": "A Miu Miu polo shirt tucked into a plaid pleated skirt in New York.",
    "url": "https://www.whowhatwear.com/fashion/celebrity-style/miu-miu-preppy-aesthetic-trend",
    "sourceTitle": "All the Miu Miu-Obsessed Cool Girls Are Bringing Back This Early 2000s Aesthetic Trend for Summer 2025"
  },
  "94": {
    "actor": "Kristen Stewart",
    "note": "An unbuttoned burgundy suit without a shirt at the Certain Women premiere.",
    "url": "https://www.usmagazine.com/stylish/news/kristen-stewart-goes-topless-under-suit-on-red-carpet-photos-w443247/",
    "sourceTitle": "Kristen Stewart Goes Topless Under Suit on Red Carpet: Photos - Us"
  },
  "95": {
    "actor": "Sonam Kapoor",
    "note": "Two embroidered saris layered across one another for a maximalist store-opening look.",
    "url": "https://www.hindustantimes.com/htcity/htcity-showstoppers/sonam-kapoor-s-two-saree-drape-is-your-cue-to-rethink-wedding-dressing-101787233181076.html",
    "sourceTitle": "Sonam Kapoor’s two-saree drape is your cue to rethink wedding dressing | Hindustan Times"
  },
  "96": {
    "actor": "Jane Birkin",
    "note": "Her personally decorated handbag, the reference behind the bag-charm revival.",
    "url": "https://timesofindia.indiatimes.com/life-style/fashion/jane-birkin-bag-charms-trend-tips-to-try/articleshow/115055535.cms",
    "sourceTitle": "How to ace the bag charm trend inspired by Jane Birkin? | - Times of India"
  },
  "97": {
    "actor": "Deepika Padukone",
    "note": "Bold kohl-lined eyes as Piku in the 2015 film.",
    "url": "https://www.indiatoday.in/lifestyle/fashion/story/fashion-friday-how-piku-got-everyday-fashion-right-for-indian-women-1652984-2020-03-06",
    "sourceTitle": "Fashion Friday: How Piku got everyday fashion right for Indian women - India Today"
  },
  "98": {
    "actor": "Rashmika Mandanna",
    "note": "Clogs in her Crocs India campaign.",
    "url": "https://www.crocs.in/campaign/rashmika",
    "sourceTitle": "Campaign Rashmika - Crocs™ India"
  },
  "99": {
    "actor": "Babil Khan",
    "note": "A semi-sheer black shirt with a floral embroidered motif by Mard by Abu Sandeep.",
    "url": "https://www.indiatoday.in/amp/lifestyle/fashion/story/sheer-shirts-for-men-and-how-to-style-them-for-a-head-turning-fashion-moment-trending-now-2340782-2023-02-28",
    "sourceTitle": "Sheer shirts for men and how to style them for a head-turning fashion moment. Trending now - India Today"
  },
  "100": {
    "actor": "Emma Stone",
    "note": "A Charlotte Simone faux-fur coat over a slip dress for the Poor Things premiere.",
    "url": "https://www.instyle.com/emma-stone-red-hair-poor-things-premiere-8411854",
    "sourceTitle": "Emma Stone Returned to Her Signature Red Hair on the Red Carpet"
  },
  "101": {
    "actor": "Janhvi Kapoor",
    "note": "An unconventional mermaid-inspired sari drape ahead of Devara: Part 1.",
    "url": "https://www.filmfare.com/photos/janhvi-kapoor-stuns-in-mermaid-inspired-looks-ahead-of-devara-part-1_-68355.html",
    "sourceTitle": "Janhvi Kapoor stuns in mermaid-inspired looks ahead of Devara: Part 1 | Filmfare.com"
  },
  "102": {
    "actor": "Karisma Kapoor",
    "note": "A throwback 1990s outfit shared from her personal archive.",
    "url": "https://www.ndtv.com/lifestyle/karisma-kapoors-flashback-friday-photo-with-retro-style-takes-us-back-to-the-90s-2410130",
    "sourceTitle": "Karisma Kapoor's Flashback Friday Photo With Retro Style Takes Us Back To The 90s"
  },
  "103": {
    "actor": "Dakota Johnson",
    "note": "A vintage green slip dress edged with cream lace, worn with a suede jacket.",
    "url": "https://www.whowhatwear.com/fashion/celebrity-style/black-ballet-flats-green-dress-brown-suede-jacket-outfit-dakota-johnson-2026",
    "sourceTitle": "Chic Women in Their Late 30s Are Ditching Flip-Flops for This French Shoe Trend This Autumn"
  },
  "104": {
    "actor": "Deepika Padukone",
    "note": "An oversized denim shirt with relaxed matching trousers.",
    "url": "https://timesofindia.indiatimes.com/life-style/fashion/celeb-style/deepika-padukones-maternity-style-playbook-starts-with-a-denim-on-denim-look-proving-she-doesnt-do-boring/amp_etphotostory/130574973.cms",
    "sourceTitle": "Deepika Padukone’s maternity-style playbook starts with a denim-on-denim look, proving she doesn’t do boring | The Times of India"
  },
  "105": {
    "actor": "Shah Rukh Khan",
    "note": "Loose, all-black airport styling, documented by GQ India.",
    "url": "https://www.gqindia.com/content/shah-rukh-khan-styles-all-black-airport-look",
    "sourceTitle": "Shah Rukh Khan's Airport Look - Shah Rukh Khan's Airport Style | GQ India | GQ India"
  },
  "106": {
    "actor": "Priyanka Chopra Jonas",
    "note": "Gaurav Gupta's saffron Golden Arc saree-gown from The Divine Androgyne couture collection.",
    "url": "https://shop.gauravguptastudio.com/blogs/gg-blogs/priyanka-chopra-in-gaurav-gupta-couture",
    "sourceTitle": "PRIYANKA CHOPRA IN GAURAV GUPTA COUTURE - Gaurav Gupta International"
  },
  "107": {
    "actor": "Sonam Kapoor",
    "note": "A necklace worn backwards as a backlace.",
    "url": "https://www.manifestmagazine.in/fashion-beauty/celebrity-style/how-to-wear-backlace-trend-like-sonam-kapoor",
    "sourceTitle": "Let Sonam Kapoor Teach You How to Rock a Stunning ‘Backlace’ | Manifest India"
  },
  "108": {
    "actor": "Vidya Balan",
    "note": "A vintage silver necklace and oxidised silver bangle with a white sari.",
    "url": "https://www.vogue.in/vogue-closet/collection/vidya-balan-white-sari-sleeveless-black-blouse-silver-jewellery",
    "sourceTitle": "Vidya Balan styled her embroidered white sari with must- ..."
  },
  "109": {
    "actor": "Katie Holmes",
    "note": "A mint-green knit and pale-mint denim with a wool coat in New York.",
    "url": "https://www.vogue.com/article/katie-holmes-mint-green-pants",
    "sourceTitle": "Pastels for Winter? Katie Holmes Approves a Minty Green"
  },
  "110": {
    "actor": "Zendaya",
    "note": "A sand-inspired Balmain outfit on the Dune: Part Two Paris press tour.",
    "url": "https://www.harpersbazaar.com/celebrity/latest/a46785412/zendaya-slouchy-dune-press-look-balmain/",
    "sourceTitle": "Zendaya Dressed Like a Literal Sand Dune to Promote the Film"
  },
  "111": {
    "actor": "Deepika Padukone",
    "note": "A head-to-toe red look with an oversized blazer, cut-out top and flared trousers.",
    "url": "https://photogallery.indiatimes.com/celebs/bollywood/deepika-padukone-commands-attention-in-a-fiery-red-power-suit-see-pictures/articleshow/95487975.cms",
    "sourceTitle": "Deepika Padukone commands attention in a fiery red power suit, see pictures | Photogallery - ETimes"
  },
  "112": {
    "actor": "Alia Bhatt",
    "note": "Cherry-red Gucci accessories with a white shirt and baggy jeans in a Gucci campaign.",
    "url": "https://www.ndtv.com/lifestyle/birthday-girl-raha-kapoors-mother-alia-bhatts-classic-white-shirt-and-jeans-got-an-autumnal-cherry-red-touch-for-the-gucci-campaign-6957302/amp/1",
    "sourceTitle": "Alia Bhatt's Classic White Shirt And Jeans Got An Autumnal Cherry Red Touch For The Gucci Campaign"
  },
  "113": {
    "actor": "Zendaya",
    "note": "Silk headscarves tied two ways for Dolce & Gabbana's Summer 2017 campaign.",
    "url": "https://www.vogue.com/article/zendaya-dolce-and-gabbana-summer-2017-campaign-beauty-headscarves",
    "sourceTitle": "Zendaya Ties a Headscarf Two Ways for Dolce & Gabbana | Vogue"
  },
  "114": {
    "actor": "Deepika Padukone",
    "note": "Flared bell-bottom jeans and a white T-shirt at Cannes 2018.",
    "url": "https://www.ndtv.com/entertainment/cannes-2018-deepika-padukone-is-turning-all-her-denim-dreams-into-reality-1850746",
    "sourceTitle": "Cannes 2018: Deepika Padukone Is Turning All Her Denim Dreams Into Reality"
  },
  "115": {
    "actor": "Tilda Swinton",
    "note": "A monastic, draped-cape Valentino gown on Late Night with Seth Meyers.",
    "url": "https://www.redcarpet-fashionawards.com/2014/03/14/tilda-swinton-valentino-late-night-seth-meyers/",
    "sourceTitle": "Tilda Swinton In Valentino - Late Night with Seth Meyers - Red Carpet Fashion Awards"
  },
  "116": {
    "actor": "Alia Bhatt",
    "note": "A lilac Tarun Tahiliani sari referencing Rekha in Silsila at the Umrao Jaan re-release.",
    "url": "https://inshorts.com/en/news/alia-re-creates-rekha-s-look-from-silsila-at-umrao-jaan-re-release-1750995127574",
    "sourceTitle": "Alia re-creates Rekha's look from Silsila at Umrao Jaan re-release"
  },
  "117": {
    "actor": "Cillian Murphy",
    "note": "A custom Versace tuxedo for his winning night at the 2024 Oscars.",
    "url": "https://www.vogue.com/slideshow/cillian-murphy-oscars-versace-winning-look",
    "sourceTitle": "Cillian Murphy Referenced Vintage Versace for His Winning Oscars Look | Vogue"
  },
  "118": {
    "actor": "Sonam Kapoor Ahuja",
    "note": "Opera gloves with a black velvet dress and ivory tweed jacket.",
    "url": "https://www.vogue.in/vogue-closet/collection/4-times-sonam-kapoor-ahuja-emulated-black-tie-worthy-ensembles",
    "sourceTitle": "4 times Sonam Kapoor Ahuja emulated black-tie worthy ensembles | Vogue India"
  }
};

