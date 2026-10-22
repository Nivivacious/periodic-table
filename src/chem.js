// The chemistry behind the Lab. When two or three elements go into the flask, we find the real
// compound they make (or say honestly that they don't), then turn it into the look or the pile.
// Curated entries are checked against Wikipedia (the wiki slug is the source link). Anything not
// curated is built from the element's most common oxidation state and named by the IUPAC rules.

// Most common charge each element takes in a simple binary compound.
// Positive = cation or the less electronegative partner; negative = anion. 0 = makes no compounds.
const OX = {
  H: 1, He: 0, Li: 1, Be: 2, B: 3, C: 4, N: -3, O: -2, F: -1, Ne: 0,
  Na: 1, Mg: 2, Al: 3, Si: 4, P: -3, S: -2, Cl: -1, Ar: 0,
  K: 1, Ca: 2, Sc: 3, Ti: 4, V: 3, Cr: 3, Mn: 2, Fe: 3, Co: 2, Ni: 2, Cu: 2, Zn: 2, Ga: 3, Ge: 4, As: -3, Se: -2, Br: -1, Kr: 0,
  Rb: 1, Sr: 2, Y: 3, Zr: 4, Nb: 5, Mo: 4, Tc: 4, Ru: 3, Rh: 3, Pd: 2, Ag: 1, Cd: 2, In: 3, Sn: 4, Sb: 3, Te: -2, I: -1, Xe: 0,
  Cs: 1, Ba: 2, La: 3, Ce: 3, Pr: 3, Nd: 3, Pm: 3, Sm: 3, Eu: 3, Gd: 3, Tb: 3, Dy: 3, Ho: 3, Er: 3, Tm: 3, Yb: 3, Lu: 3,
  Hf: 4, Ta: 5, W: 6, Re: 4, Os: 4, Ir: 3, Pt: 2, Au: 3, Hg: 2, Tl: 1, Pb: 2, Bi: 3, Po: 4, At: -1, Rn: 0,
  Fr: 1, Ra: 2, Ac: 3, Th: 4, Pa: 5, U: 4, Np: 4, Pu: 4, Am: 3, Cm: 3, Bk: 3, Cf: 3, Es: 3, Fm: 3, Md: 3, No: 2, Lr: 3,
  Rf: 4, Db: 5, Sg: 6, Bh: 7, Hs: 8, Mt: 0, Ds: 0, Rg: 0, Cn: 0, Nh: 0, Fl: 0, Mc: 0, Lv: 0, Ts: 0, Og: 0,
};
// Which partner takes the negative end when two nonmetals meet (higher wins).
const EN = { F: 10, O: 9, Cl: 8, N: 7, Br: 6, I: 5, S: 4.5, Se: 4.4, C: 4, At: 3.8, P: 3.5, H: 3.4, Te: 3.5, B: 3, Si: 2.5, As: 2.4, Ge: 2.2, Sb: 2.1 };
// Elements that are only ever handled a few atoms at a time, so a generic formula is a prediction, not a bottle.
const TRACE = new Set(["Fr", "At", "Rn", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs"]);
// Metals whose name needs a Roman numeral because they take more than one charge.
const ROMANS = new Set(["V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Mo", "Tc", "Ru", "Rh", "Pd", "Sn", "Sb", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "Ce", "Eu", "U", "Np", "Pu", "Ti", "Nb", "Ta"]);
const STEM = { H: "hydride", B: "boride", C: "carbide", N: "nitride", O: "oxide", F: "fluoride", Si: "silicide", P: "phosphide", S: "sulfide", Cl: "chloride", As: "arsenide", Se: "selenide", Br: "bromide", Te: "telluride", I: "iodide", At: "astatide", Sb: "antimonide", Ge: "germanide" };
const PREFIX = ["", "mono", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa"];
const ROMAN_N = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

// Curated: the compounds and alloys people have actually heard of, plus the exotic ones worth a card.
// key: symbols sorted alphabetically. f: formula with plain digits. c: common name. w: Wikipedia slug.
const CURATED = {
  // Water, air and the kitchen
  "H-O": { f: "H2O", n: "Water", c: "water", w: "Water", note: "Two gases that burn make the thing that puts fires out." },
  "Cl-Na": { f: "NaCl", n: "Sodium chloride", c: "table salt", w: "Sodium_chloride", note: "A metal that explodes in water and a gas that was used as a weapon. Together, salt." },
  "C-O": { f: "CO2", n: "Carbon dioxide", c: "the fizz in a cold drink", w: "Carbon_dioxide", note: "What you breathe out and what makes the soda bite." },
  "C-H-O": { f: "C2H5OH", n: "Ethanol", c: "drinking alcohol", w: "Ethanol", note: "Also the base of perfume, hand sanitiser and bad decisions." },
  "C-H": { f: "CH4", n: "Methane", c: "cooking gas", w: "Methane", note: "The gas in a biogas plant and in a cow." },
  "H-N": { f: "NH3", n: "Ammonia", c: "the smell of a cleaning bucket", w: "Ammonia", note: "Half the world's food is grown on fertiliser made from it." },
  "C-H-N-O": { f: "CO(NH2)2", n: "Urea", c: "fertiliser", w: "Urea", note: "The first organic compound ever made in a lab, in 1828." },
  "C-Na-O-H": { f: "NaHCO3", n: "Sodium bicarbonate", c: "baking soda", w: "Sodium_bicarbonate", note: "Rises the cake, cleans the sink, settles the stomach." },
  "C-Na-O": { f: "Na2CO3", n: "Sodium carbonate", c: "washing soda", w: "Sodium_carbonate", note: "The old laundry powder, and the stuff that makes glass meltable." },
  "C-Ca-O": { f: "CaCO3", n: "Calcium carbonate", c: "chalk, marble and seashells", w: "Calcium_carbonate", note: "Blackboard chalk, Taj Mahal marble and an eggshell are the same formula." },
  "Ca-O": { f: "CaO", n: "Calcium oxide", c: "quicklime", w: "Calcium_oxide", note: "Hisses and heats up when wet. Whitewash starts here." },
  "Ca-H-O": { f: "Ca(OH)2", n: "Calcium hydroxide", c: "slaked lime, the chuna in paan", w: "Calcium_hydroxide", note: "Painted on walls as whitewash and smeared on a betel leaf." },
  "H-Na-O": { f: "NaOH", n: "Sodium hydroxide", c: "lye, caustic soda", w: "Sodium_hydroxide", note: "Turns oil into soap. Also unblocks drains, violently." },
  "H-K-O": { f: "KOH", n: "Potassium hydroxide", c: "caustic potash", w: "Potassium_hydroxide", note: "The soap-maker's other lye; this one makes the liquid kind." },
  "Cl-H": { f: "HCl", n: "Hydrogen chloride", c: "hydrochloric acid, in water", w: "Hydrochloric_acid", note: "Your stomach makes it every day. Toilet cleaner is mostly this." },
  "H-O-S": { f: "H2SO4", n: "Sulfuric acid", c: "battery acid", w: "Sulfuric_acid", note: "The most-made chemical on earth. Inside every car battery." },
  "H-N-O": { f: "HNO3", n: "Nitric acid", c: "aqua fortis", w: "Nitric_acid", note: "Turns skin yellow on contact. Fertiliser and explosives both start here." },
  "H-O-P": { f: "H3PO4", n: "Phosphoric acid", c: "the tang in cola", w: "Phosphoric_acid", note: "What makes a cola taste sharp. Also a rust remover." },
  "Cl-Na-O": { f: "NaOCl", n: "Sodium hypochlorite", c: "bleach", w: "Sodium_hypochlorite", note: "The white-shirt saver and the pool smell." },
  "Cl-Ca-O": { f: "Ca(OCl)2", n: "Calcium hypochlorite", c: "bleaching powder", w: "Calcium_hypochlorite", note: "The sack the municipality empties into the well." },
  "H-O-O": { f: "H2O2", n: "Hydrogen peroxide", c: "hair bleach", w: "Hydrogen_peroxide", note: "Water with one extra oxygen. Enough to blond a head of hair." },
  "K-N-O": { f: "KNO3", n: "Potassium nitrate", c: "saltpetre", w: "Potassium_nitrate", note: "The oxidiser in gunpowder and in the Diwali anar." },
  "Mg-O-S": { f: "MgSO4", n: "Magnesium sulfate", c: "Epsom salt", w: "Magnesium_sulfate", note: "The foot-soak salt." },
  "Ca-O-S": { f: "CaSO4", n: "Calcium sulfate", c: "gypsum, plaster of Paris", w: "Calcium_sulfate", note: "The ceiling, the cast on a broken arm and the sculptor's mould." },
  "Cu-O-S": { f: "CuSO4", n: "Copper sulfate", c: "blue vitriol", w: "Copper(II)_sulfate", note: "The brilliant blue crystal from school. Kills algae in ponds." },
  "K-Mn-O": { f: "KMnO4", n: "Potassium permanganate", c: "Condy's crystals", w: "Potassium_permanganate", note: "A few purple grains turn a bucket of water pink. Wound wash and water purifier." },
  "Cl-H-N": { f: "NH4Cl", n: "Ammonium chloride", c: "sal ammoniac, nausadar", w: "Ammonium_chloride", note: "The white powder in a soldering kit and in salty liquorice." },
  "Cl-K": { f: "KCl", n: "Potassium chloride", c: "low-sodium salt", w: "Potassium_chloride", note: "What 'lite' salt is made of." },
  "I-K": { f: "KI", n: "Potassium iodide", c: "the iodine in iodised salt", w: "Potassium_iodide", note: "A pinch in every packet of salt, so nobody gets a goitre." },
  "F-Na": { f: "NaF", n: "Sodium fluoride", c: "the fluoride in toothpaste", w: "Sodium_fluoride", note: "A trace of it in the paste is why fillings are rarer than they were." },
  "Ca-F": { f: "CaF2", n: "Calcium fluoride", c: "fluorite", w: "Fluorite", note: "The mineral that glows under UV and gave 'fluorescence' its name." },
  "Mg-O": { f: "MgO", n: "Magnesium oxide", c: "magnesia", w: "Magnesium_oxide", note: "Antacid tablets and the lining of steel furnaces." },
  "H-Mg-O": { f: "Mg(OH)2", n: "Magnesium hydroxide", c: "milk of magnesia", w: "Magnesium_hydroxide", note: "The chalky antacid your grandmother kept." },
  "Al-O": { f: "Al2O3", n: "Aluminium oxide", c: "alumina; ruby and sapphire", w: "Aluminium_oxide", note: "Sandpaper grit. With a trace of chromium, a ruby; with iron and titanium, a sapphire." },
  "Al-Cr-O": { f: "Al2O3:Cr", n: "Chromium-doped alumina", c: "ruby", w: "Ruby", note: "A ruby is alumina with a few chromium atoms sitting in for aluminium. That is the whole red." },
  "O-Si": { f: "SiO2", n: "Silicon dioxide", c: "sand, quartz, glass", w: "Silicon_dioxide", note: "The beach, the window and the chip in your phone, before it was a chip." },
  "Fe-O": { f: "Fe2O3", n: "Iron(III) oxide", c: "rust", w: "Iron(III)_oxide", note: "Also red ochre, the pigment in cave paintings and sindoor's cheap cousin." },
  "Fe-S": { f: "FeS2", n: "Iron disulfide", c: "pyrite, fool's gold", w: "Pyrite", note: "Looks like gold, strikes sparks, fooled a lot of prospectors." },
  "Cu-O": { f: "CuO", n: "Copper(II) oxide", c: "the black on an old copper pot", w: "Copper(II)_oxide", note: "The dark tarnish before the green patina." },
  "C-Cu-H-O": { f: "Cu2(OH)2CO3", n: "Basic copper carbonate", c: "verdigris, malachite", w: "Basic_copper_carbonate", note: "The green on the Statue of Liberty and on a forgotten temple bell." },
  "Ag-S": { f: "Ag2S", n: "Silver sulfide", c: "tarnish", w: "Silver_sulfide", note: "Why the silver payal goes black in a drawer." },
  "Cl-Ag": { f: "AgCl", n: "Silver chloride", c: "photographic film", w: "Silver_chloride", note: "Goes dark in light. Every photo before digital was this reacting." },
  "Ag-Br": { f: "AgBr", n: "Silver bromide", c: "film emulsion", w: "Silver_bromide", note: "The light-sensitive layer on camera film." },
  "Hg-S": { f: "HgS", n: "Mercury sulfide", c: "cinnabar, vermilion", w: "Cinnabar", note: "The original sindoor red, before anyone knew mercury was a problem." },
  "Pb-S": { f: "PbS", n: "Lead sulfide", c: "galena, kohl", w: "Galena", note: "The ore of lead, and the black of ancient kajal." },
  "Sb-S": { f: "Sb2S3", n: "Antimony trisulfide", c: "stibnite, surma", w: "Stibnite", note: "Ground to a powder, it lined eyes across the old world." },
  "Pb-O": { f: "Pb3O4", n: "Lead tetroxide", c: "red lead, sindoor's old base", w: "Lead(II,IV)_oxide", note: "The orange-red primer on iron gates, and once in sindoor." },
  "O-Ti": { f: "TiO2", n: "Titanium dioxide", c: "the white in paint and sunscreen", w: "Titanium_dioxide", note: "The whitest white. In toothpaste, wall paint, sunscreen and icing." },
  "O-Zn": { f: "ZnO", n: "Zinc oxide", c: "calamine, sunscreen", w: "Zinc_oxide", note: "The pink lotion for a rash and the white stripe on a cricketer's nose." },
  "S-Zn": { f: "ZnS", n: "Zinc sulfide", c: "glow-in-the-dark paint", w: "Zinc_sulfide", note: "The stars on a childhood ceiling." },
  "Cr-O": { f: "Cr2O3", n: "Chromium(III) oxide", c: "viridian green", w: "Chromium(III)_oxide", note: "The green in paint and in a Diwali sparkler's flash." },
  "Mn-O": { f: "MnO2", n: "Manganese dioxide", c: "the black in a dry cell", w: "Manganese_dioxide", note: "The black paste inside a torch battery." },
  "Fe-O-O": { f: "Fe3O4", n: "Magnetite", c: "lodestone", w: "Magnetite", note: "The first magnet anyone found, and the first compass." },
  "Cl-Fe": { f: "FeCl3", n: "Iron(III) chloride", c: "PCB etchant", w: "Iron(III)_chloride", note: "The brown liquid that eats copper off a circuit board." },
  "Al-Cl": { f: "AlCl3", n: "Aluminium chloride", c: "the active in antiperspirant", w: "Aluminium_chloride", note: "A relative of it is what stops sweat in a roll-on." },
  "Cl-Ca": { f: "CaCl2", n: "Calcium chloride", c: "road salt, the desiccant sachet", w: "Calcium_chloride", note: "The little bag in a shoebox that says DO NOT EAT." },
  "Ba-O-S": { f: "BaSO4", n: "Barium sulfate", c: "the barium meal", w: "Barium_sulfate", note: "Drunk before an X-ray so the stomach shows up." },
  "K-Cl-O": { f: "KClO3", n: "Potassium chlorate", c: "matchhead", w: "Potassium_chlorate", note: "The tip of a safety match." },
  "C-Ca": { f: "CaC2", n: "Calcium carbide", c: "the mango-ripening stone", w: "Calcium_carbide", note: "Drops in water and gives off acetylene. Banned for ripening fruit, used anyway." },
  "C-Si": { f: "SiC", n: "Silicon carbide", c: "carborundum", w: "Silicon_carbide", note: "Nearly as hard as diamond. Grinding wheels and moissanite 'diamonds'." },
  "C-W": { f: "WC", n: "Tungsten carbide", c: "drill bits, scratchproof rings", w: "Tungsten_carbide", note: "The ring that never scratches and the bit that goes through concrete." },
  "B-N": { f: "BN", n: "Boron nitride", c: "white graphite", w: "Boron_nitride", note: "Slippery like graphite, but white. In face powder and in cutting tools." },
  "B-H-O": { f: "H3BO3", n: "Boric acid", c: "carrom powder", w: "Boric_acid", note: "The slide on a carrom board. Also an antiseptic and an ant killer." },
  "B-Na-O": { f: "Na2B4O7", n: "Sodium tetraborate", c: "borax", w: "Borax", note: "Old laundry booster, slime ingredient and the flux in jewellery soldering." },
  "N-O": { f: "N2O", n: "Nitrous oxide", c: "laughing gas", w: "Nitrous_oxide", note: "The dentist's gas and the whipped-cream charger." },
  "C-N-H": { f: "HCN", n: "Hydrogen cyanide", c: "prussic acid", w: "Hydrogen_cyanide", note: "Smells of bitter almonds. Do not mix this one at home." },
  "H-S": { f: "H2S", n: "Hydrogen sulfide", c: "rotten-egg gas", w: "Hydrogen_sulfide", note: "The smell of a blocked drain and a hot spring." },
  "O-S": { f: "SO2", n: "Sulfur dioxide", c: "the preservative in dried apricots", w: "Sulfur_dioxide", note: "Keeps wine and dried fruit from browning. Also acid rain." },
  "C-S": { f: "CS2", n: "Carbon disulfide", c: "the rayon solvent", w: "Carbon_disulfide", note: "Dissolves cellulose into viscose, which becomes rayon, which becomes the saree." },
  "F-S": { f: "SF6", n: "Sulfur hexafluoride", c: "the deep-voice gas", w: "Sulfur_hexafluoride", note: "Inhale it and your voice drops an octave. Also the worst greenhouse gas by weight." },
  "Cl-P": { f: "PCl3", n: "Phosphorus trichloride", w: "Phosphorus_trichloride", note: "A starting point for pesticides and flame retardants." },
  "H-P": { f: "PH3", n: "Phosphine", c: "the grain fumigant", w: "Phosphine", note: "The gas that aluminium phosphide tablets give off in a grain store." },
  "Al-P": { f: "AlP", n: "Aluminium phosphide", c: "the grain tablet", w: "Aluminium_phosphide", note: "Sold as fumigant tablets. Infamous in India for the wrong reasons." },
  "As-H": { f: "AsH3", n: "Arsine", w: "Arsine", note: "Garlic-smelling and lethal; used to dope semiconductors." },
  "Cl-Cl": { f: "Cl2", n: "Chlorine gas", w: "Chlorine", note: "Green, heavy, and what swimming pools smell faintly of." },
  // Alloys and metals together
  "C-Fe": { f: "Fe + ~1% C", n: "Steel", c: "steel", w: "Steel", kind: "alloy", note: "Iron with a pinch of carbon. The bridge, the blade, the safety pin." },
  "Cr-Fe-Ni": { f: "Fe·Cr·Ni", n: "Stainless steel", c: "the steel tiffin", w: "Stainless_steel", kind: "alloy", note: "18% chromium, 8% nickel. The dabba, the sink, the kada." },
  "Cr-Fe": { f: "Fe·Cr", n: "Ferrochrome steel", c: "chrome steel", w: "Chromium_steel", kind: "alloy", note: "Chromium is what stops the knife from rusting." },
  "Cu-Zn": { f: "Cu·Zn", n: "Brass", c: "brass", w: "Brass", kind: "alloy", note: "The temple lamp, the door knocker, the trumpet. Copper and zinc, roughly two to one." },
  "Cu-Sn": { f: "Cu·Sn", n: "Bronze", c: "bronze", w: "Bronze", kind: "alloy", note: "The Chola Nataraja. Copper with a tenth of tin, and an age named after it." },
  "Cu-Ni": { f: "Cu·Ni", n: "Cupronickel", c: "the coin metal", w: "Cupronickel", kind: "alloy", note: "75 copper, 25 nickel. Most of the world's silver-coloured coins." },
  "Cu-Ni-Zn": { f: "Cu·Ni·Zn", n: "Nickel silver", c: "German silver", w: "Nickel_silver", kind: "alloy", note: "No silver in it at all. Cutlery, zips and cheap bangles." },
  "Ag-Cu": { f: "Ag·Cu (92.5:7.5)", n: "Sterling silver", c: "925 silver", w: "Sterling_silver", kind: "alloy", note: "Pure silver is too soft for a ring; 7.5% copper makes it hold a shape." },
  "Ag-Au": { f: "Au·Ag", n: "Electrum", c: "green gold", w: "Electrum", kind: "alloy", note: "The first coins ever struck, in Lydia, were this natural mix." },
  "Au-Cu": { f: "Au·Cu", n: "Rose gold", c: "rose gold", w: "Colored_gold", kind: "alloy", note: "The blush is copper. 18-karat rose is three parts gold to one part copper." },
  "Au-Ni": { f: "Au·Ni", n: "White gold", c: "white gold", w: "Colored_gold", kind: "alloy", note: "Nickel or palladium bleaches the yellow out; rhodium plating does the shine." },
  "Au-Pd": { f: "Au·Pd", n: "White gold", c: "palladium white gold", w: "Colored_gold", kind: "alloy", note: "The hypoallergenic white gold, for people nickel gives a rash." },
  "Au-Ag-Cu": { f: "Au·Ag·Cu", n: "22-karat gold", c: "the jeweller's gold", w: "Gold#Jewelry", kind: "alloy", note: "Indian wedding gold: 91.6% gold, the rest silver and copper for strength." },
  "Pb-Sn": { f: "Sn·Pb", n: "Solder", c: "the wire in a soldering kit", w: "Solder", kind: "alloy", note: "60 tin, 40 lead. Every old circuit board is held together by it." },
  "Sb-Sn": { f: "Sn·Sb", n: "Pewter", c: "pewter", w: "Pewter", kind: "alloy", note: "Tin stiffened with antimony. Tankards, trophies, old plates." },
  "Cu-Sb-Sn": { f: "Sn·Sb·Cu", n: "Pewter", c: "modern pewter", w: "Pewter", kind: "alloy", note: "Lead-free pewter: tin, antimony and a touch of copper." },
  "Ni-Ti": { f: "NiTi", n: "Nitinol", c: "shape-memory wire", w: "Nickel_titanium", kind: "alloy", note: "Bend it, warm it, it springs back. Braces and spectacle frames." },
  "Cr-Ni": { f: "Ni·Cr", n: "Nichrome", c: "heater wire", w: "Nichrome", kind: "alloy", note: "The glowing coil in a toaster and a hair dryer." },
  "Al-Cu": { f: "Al·Cu", n: "Duralumin", c: "aircraft aluminium", w: "Duralumin", kind: "alloy", note: "Aluminium hardened with copper. Zeppelins first, then every plane." },
  "Al-Mg": { f: "Al·Mg", n: "Magnalium", w: "Magnalium", kind: "alloy", note: "Light, strong, and burns bright white in fireworks." },
  "Al-Zn": { f: "Zn·Al", n: "Zamak", c: "die-cast zinc", w: "Zamak", kind: "alloy", note: "The metal of zips, belt buckles and toy cars." },
  "Al-Ti-V": { f: "Ti·6Al·4V", n: "Titanium alloy", c: "aerospace titanium", w: "Ti-6Al-4V", kind: "alloy", note: "Hip implants, jet engines and expensive bicycle frames." },
  "Ag-Hg": { f: "Hg·Ag", n: "Silver amalgam", c: "the old tooth filling", w: "Amalgam_(dentistry)", kind: "alloy", note: "Mercury and silver, pressed into a cavity. Still in millions of mouths." },
  "Ag-Hg-Sn": { f: "Hg·Ag·Sn", n: "Dental amalgam", c: "the silver filling", w: "Amalgam_(dentistry)", kind: "alloy", note: "The grey filling at the back of your mouth." },
  "Au-Hg": { f: "Au·Hg", n: "Gold amalgam", c: "fire-gilding", w: "Amalgam_(chemistry)", kind: "alloy", note: "How temple domes were gilded: paint the amalgam on, burn the mercury off." },
  "Ga-In-Sn": { f: "Ga·In·Sn", n: "Galinstan", c: "the liquid metal", w: "Galinstan", kind: "alloy", note: "Liquid at room temperature and not poisonous. Replaced mercury in thermometers." },
  "Bi-Sn": { f: "Bi·Sn", n: "Bismuth-tin solder", c: "lead-free solder", w: "Solder", kind: "alloy", note: "Melts at 138 °C, below boiling water. Fire sprinklers trip on it." },
  "K-Na": { f: "NaK", n: "Sodium-potassium alloy", c: "NaK", w: "Sodium-potassium_alloy", kind: "alloy", note: "Two solid metals that make a liquid. Coolant in fast reactors." },
  "B-Fe-Nd": { f: "Nd2Fe14B", n: "Neodymium magnet", c: "the fridge-magnet-on-steroids", w: "Neodymium_magnet", note: "The strongest magnet you can buy. In every earbud and electric motor." },
  "Co-Sm": { f: "SmCo5", n: "Samarium-cobalt magnet", w: "Samarium–cobalt_magnet", note: "The magnet that keeps working when hot. Guitar pickups and jet sensors." },
  "Nb-Ti": { f: "Nb·Ti", n: "Niobium-titanium", c: "MRI magnet wire", w: "Niobium–titanium", kind: "alloy", note: "Superconducting below −263 °C. Every MRI machine is wound with it." },
  "Nb-Sn": { f: "Nb3Sn", n: "Niobium-tin", w: "Niobium–tin", note: "The other superconductor, for the biggest magnets at CERN." },
  "Ir-Pt": { f: "Pt·Ir", n: "Platinum-iridium", c: "the kilogram", w: "Platinum–iridium_alloy", kind: "alloy", note: "The metal of the old standard kilogram and the standard metre bar." },
  "Pt-Rh": { f: "Pt·Rh", n: "Platinum-rhodium", c: "thermocouple wire", w: "Thermocouple", kind: "alloy", note: "Measures furnace temperatures nothing else survives." },
  "Co-Cr": { f: "Co·Cr", n: "Cobalt-chrome", c: "the hip joint", w: "Cobalt-chrome", kind: "alloy", note: "Knee and hip replacements, dental crowns." },
  "Mg-Zn": { f: "Mg·Zn", n: "Magnesium-zinc alloy", w: "Magnesium_alloy", kind: "alloy", note: "Laptop shells and camera bodies. Light enough to carry all day." },
  "Fe-Ni": { f: "Fe·Ni", n: "Invar", c: "the clock-pendulum metal", w: "Invar", kind: "alloy", note: "Barely expands with heat. Precision clocks and the Eiffel-Tower-sized surveys." },
  "Cu-Au-Ag-Zn": { f: "Au·Ag·Cu·Zn", n: "Yellow gold alloy", c: "jeweller's yellow", w: "Colored_gold", kind: "alloy", note: "A little zinc keeps it bright and castable." },
  // Semiconductors and screens
  "As-Ga": { f: "GaAs", n: "Gallium arsenide", c: "the phone-signal chip", w: "Gallium_arsenide", note: "Faster than silicon. In every phone's radio and in solar panels on satellites." },
  "Ga-N": { f: "GaN", n: "Gallium nitride", c: "the blue LED", w: "Gallium_nitride", note: "The blue LED that won a Nobel prize and made white LEDs possible. Also fast chargers." },
  "In-P": { f: "InP", n: "Indium phosphide", w: "Indium_phosphide", note: "The laser in fibre-optic internet." },
  "In-O-Sn": { f: "In2O3:Sn", n: "Indium tin oxide", c: "the touchscreen coating", w: "Indium_tin_oxide", note: "The invisible conductor on every touchscreen." },
  "Cd-S": { f: "CdS", n: "Cadmium sulfide", c: "cadmium yellow", w: "Cadmium_sulfide", note: "Van Gogh's yellow. Also the light sensor in a streetlamp." },
  "Cd-Te": { f: "CdTe", n: "Cadmium telluride", c: "thin-film solar", w: "Cadmium_telluride", note: "The second most-made solar panel material." },
  "Cd-Se": { f: "CdSe", n: "Cadmium selenide", c: "quantum dots", w: "Cadmium_selenide", note: "The dots in a QLED TV." },
  "Ge-Si": { f: "SiGe", n: "Silicon-germanium", w: "Silicon–germanium", kind: "alloy", note: "The fast transistor inside a 5G chip." },
  "Co-Li-O": { f: "LiCoO2", n: "Lithium cobalt oxide", c: "the phone battery cathode", w: "Lithium_cobalt_oxide", note: "Why your phone lasts a day. Why cobalt mining is a story." },
  "Fe-Li-O-P": { f: "LiFePO4", n: "Lithium iron phosphate", c: "the e-scooter battery", w: "Lithium_iron_phosphate", note: "The safer, cobalt-free cell in electric scooters and buses." },
  "Mo-S": { f: "MoS2", n: "Molybdenum disulfide", c: "dry lubricant", w: "Molybdenum_disulfide", note: "The grey grease in a bike chain spray." },
  "O-W": { f: "WO3", n: "Tungsten trioxide", c: "smart-glass tint", w: "Tungsten_trioxide", note: "The coating that darkens an aeroplane window at the touch of a button." },
  "O-V": { f: "V2O5", n: "Vanadium pentoxide", w: "Vanadium(V)_oxide", note: "The catalyst that makes most of the world's sulfuric acid." },
  "O-Zr": { f: "ZrO2", n: "Zirconium dioxide", c: "cubic zirconia", w: "Cubic_zirconia", note: "The diamond stand-in. Also the white ceramic crown on a tooth." },
  "Ce-O": { f: "CeO2", n: "Cerium oxide", c: "jeweller's rouge, glass polish", w: "Cerium(IV)_oxide", note: "Polishes glass and gemstones. In the catalytic converter too." },
  "Y-O": { f: "Y2O3", n: "Yttrium oxide", w: "Yttrium(III)_oxide", note: "The red in old CRT televisions, with a pinch of europium." },
  "Eu-O-Y": { f: "Y2O3:Eu", n: "Europium-doped yttria", c: "the red phosphor", w: "Yttrium(III)_oxide", note: "The red in every colour TV before flat screens." },
  "Ba-Cu-O-Y": { f: "YBa2Cu3O7", n: "YBCO", c: "the high-temperature superconductor", w: "Yttrium_barium_copper_oxide", note: "Superconducts in liquid nitrogen. The levitating-train material." },
  "Bi-Te": { f: "Bi2Te3", n: "Bismuth telluride", c: "the Peltier cooler", w: "Bismuth_telluride", note: "Run current through it and one side gets cold. Mini fridges." },
  "Ge-O": { f: "GeO2", n: "Germanium dioxide", w: "Germanium_dioxide", note: "In the core of optical fibre, to bend the light." },
  "O-Sn": { f: "SnO2", n: "Tin dioxide", c: "cassiterite", w: "Tin(IV)_oxide", note: "The ore of tin, and the gas sensor that sniffs a kitchen leak." },
  "Hf-O": { f: "HfO2", n: "Hafnium dioxide", w: "Hafnium(IV)_oxide", note: "The insulating layer in a modern processor's transistors." },
  "Ta-O": { f: "Ta2O5", n: "Tantalum pentoxide", c: "the phone capacitor", w: "Tantalum_pentoxide", note: "Tiny capacitors in every phone. The 'conflict mineral' in the news." },
  "C-Ti": { f: "TiC", n: "Titanium carbide", w: "Titanium_carbide", note: "The gold-coloured coating on a drill bit." },
  "N-Ti": { f: "TiN", n: "Titanium nitride", c: "the gold-look coating", w: "Titanium_nitride", note: "Gold-coloured, scratchproof. Watch cases and 'gold' taps." },
  "N-Si": { f: "Si3N4", n: "Silicon nitride", w: "Silicon_nitride", note: "Ceramic bearing balls and the white in some ceramic knives." },
  "O-Th": { f: "ThO2", n: "Thorium dioxide", c: "the gas-lantern mantle", w: "Thorium_dioxide", note: "Old Petromax mantles glowed with it. Mildly radioactive; now mostly replaced." },
  "O-U": { f: "UO2", n: "Uranium dioxide", c: "reactor fuel pellets", w: "Uranium_dioxide", note: "The ceramic pellets inside a nuclear fuel rod." },
  "F-U": { f: "UF6", n: "Uranium hexafluoride", c: "the enrichment gas", w: "Uranium_hexafluoride", note: "The gas spun in centrifuges to enrich uranium." },
  "O-Pu": { f: "PuO2", n: "Plutonium dioxide", w: "Plutonium(IV)_oxide", note: "Keeps the Voyager probes warm, 24 billion km away." },
  "Am-O": { f: "AmO2", n: "Americium dioxide", c: "the smoke-detector speck", w: "Americium_dioxide", note: "A speck of it is in the smoke detector on your ceiling." },
  "Cl-Ra": { f: "RaCl2", n: "Radium chloride", w: "Radium_chloride", note: "The first radium compound Marie Curie isolated, in 1902." },
  "Cl-Au-H": { f: "HAuCl4", n: "Chloroauric acid", c: "gold dissolved in aqua regia", w: "Chloroauric_acid", note: "Aqua regia dissolves gold into this. The gold-plater's bottle." },
  "Au-Cl": { f: "AuCl3", n: "Gold(III) chloride", w: "Gold(III)_chloride", note: "Red crystals. Dissolve them and you can plate anything gold." },
  "Cl-Pt": { f: "PtCl4", n: "Platinum(IV) chloride", w: "Platinum(IV)_chloride", note: "Where platinum catalysts and cancer drugs both begin." },
  "Cl-Pd": { f: "PdCl2", n: "Palladium chloride", w: "Palladium(II)_chloride", note: "Detects carbon monoxide: the paper turns black." },
  "O-Os": { f: "OsO4", n: "Osmium tetroxide", w: "Osmium_tetroxide", note: "Stains cells for electron microscopes. Smells of chlorine and ruins eyes." },
  "O-Ru": { f: "RuO4", n: "Ruthenium tetroxide", w: "Ruthenium_tetroxide", note: "Develops fingerprints on fabric for forensics." },
  "Cl-Rh": { f: "RhCl3", n: "Rhodium(III) chloride", w: "Rhodium(III)_chloride", note: "The bath that rhodium-plates white gold and silver." },
  "Cl-Ir": { f: "IrCl3", n: "Iridium(III) chloride", w: "Iridium(III)_chloride", note: "Where OLED screen phosphors start." },
  "O-Re": { f: "ReO3", n: "Rhenium trioxide", w: "Rhenium_trioxide", note: "A red oxide that conducts like a metal." },
  "O-Tc": { f: "TcO2", n: "Technetium dioxide", w: "Technetium_dioxide", note: "Technetium is the most-used isotope in hospital scans; this is its stable oxide." },
  "Cl-Sc": { f: "ScCl3", n: "Scandium chloride", w: "Scandium_chloride", note: "A step on the way to scandium-aluminium bike frames." },
  "La-O": { f: "La2O3", n: "Lanthanum oxide", w: "Lanthanum_oxide", note: "In camera lenses, to bend light without colour fringing." },
  "Nd-O": { f: "Nd2O3", n: "Neodymium oxide", c: "the lilac in glass", w: "Neodymium(III)_oxide", note: "Colours glass lilac in daylight and blue under tubelight." },
  "Er-O": { f: "Er2O3", n: "Erbium oxide", c: "the pink in glass", w: "Erbium(III)_oxide", note: "Pink glass, and the amplifier in undersea internet cables." },
  "Gd-O": { f: "Gd2O3", n: "Gadolinium oxide", w: "Gadolinium(III)_oxide", note: "Gadolinium is the contrast dye in an MRI." },
  "Pr-O": { f: "Pr6O11", n: "Praseodymium oxide", c: "the yellow-green in glass", w: "Praseodymium(III,IV)_oxide", note: "The green tint in welder's goggles." },
  "O-Tb": { f: "Tb4O7", n: "Terbium oxide", c: "the green phosphor", w: "Terbium(III,IV)_oxide", note: "The green in a fluorescent tube and a banknote's security ink." },
  "Dy-O": { f: "Dy2O3", n: "Dysprosium oxide", w: "Dysprosium(III)_oxide", note: "Added to neodymium magnets so they survive a hot motor." },
  "Ho-O": { f: "Ho2O3", n: "Holmium oxide", c: "the calibration glass", w: "Holmium(III)_oxide", note: "The yellow glass that calibrates spectrometers." },
  "O-Tm": { f: "Tm2O3", n: "Thulium oxide", w: "Thulium(III)_oxide", note: "Thulium is the rarest stable rare earth; this is almost all it does." },
  "O-Yb": { f: "Yb2O3", n: "Ytterbium oxide", w: "Ytterbium(III)_oxide", note: "The amplifier in fibre lasers that cut steel." },
  "Lu-O": { f: "Lu2O3", n: "Lutetium oxide", w: "Lutetium(III)_oxide", note: "Lutetium goes into PET-scan detectors." },
  "O-Sm": { f: "Sm2O3", n: "Samarium oxide", w: "Samarium(III)_oxide", note: "Absorbs neutrons; control rods in reactors." },
  "O-Pm": { f: "Pm2O3", n: "Promethium oxide", w: "Promethium(III)_oxide", note: "Glows faintly in the dark on its own. Old luminous watch dials." },
  "Cl-Tl": { f: "TlCl", n: "Thallium chloride", w: "Thallium(I)_chloride", note: "Thallium is the poisoner's metal; this salt is in heart-scan tracers." },
  "O-Po": { f: "PoO2", n: "Polonium dioxide", w: "Polonium_dioxide", note: "Polonium is the Curie's other element. Only grams of this have ever existed." },
  "Cl-Hg": { f: "HgCl2", n: "Mercury(II) chloride", c: "corrosive sublimate", w: "Mercury(II)_chloride", note: "The old disinfectant and the old poison, both." },
  "Hg-O": { f: "HgO", n: "Mercury(II) oxide", w: "Mercury(II)_oxide", note: "Heating this is how Priestley discovered oxygen, in 1774." },
  "I-Pb": { f: "PbI2", n: "Lead iodide", c: "the golden rain", w: "Lead(II)_iodide", note: "The yellow shower in the school 'golden rain' demo; now in perovskite solar cells." },
  "Bi-I": { f: "BiI3", n: "Bismuth iodide", w: "Bismuth(III)_iodide", note: "Black crystals, studied as an X-ray detector." },
  "Bi-O": { f: "Bi2O3", n: "Bismuth oxide", w: "Bismuth(III)_oxide", note: "The yellow that replaced lead in fireworks' crackle." },
  "Bi-Cl-O": { f: "BiOCl", n: "Bismuth oxychloride", c: "pearl pigment", w: "Bismuth_oxychloride", note: "The shimmer in highlighter and pearlescent nail paint." },
  "Ba-O-Ti": { f: "BaTiO3", n: "Barium titanate", w: "Barium_titanate", note: "The ceramic in a capacitor and in a lighter's click." },
  "O-Pb-Ti-Zr": { f: "Pb(Zr,Ti)O3", n: "PZT", c: "the buzzer crystal", w: "Lead_zirconate_titanate", note: "Squeeze it, it makes a voltage. Ultrasound probes and the birthday-card chip." },
  "Mg-Si-O-H": { f: "Mg3Si4O10(OH)2", n: "Talc", c: "talcum powder", w: "Talc", note: "The softest mineral. Baby powder and the matte in compact powder." },
  "Al-Si-O-H": { f: "Al2Si2O5(OH)4", n: "Kaolinite", c: "china clay, multani-mitti's cousin", w: "Kaolinite", note: "The white clay in porcelain and face packs." },
  "Al-Si-O": { f: "Al2SiO5", n: "Kyanite / andalusite", w: "Kyanite", note: "Blue blades of it in schist. Spark-plug ceramic." },
  "Al-O-Be": { f: "BeAl2O4", n: "Chrysoberyl", c: "cat's eye, alexandrite", w: "Chrysoberyl", note: "Cat's eye and the colour-changing alexandrite are this one mineral." },
  "Al-Be-O-Si": { f: "Be3Al2Si6O18", n: "Beryl", c: "emerald, aquamarine", w: "Beryl", note: "Emerald with chromium, aquamarine with iron. Same stone underneath." },
  "Mg-O-Si": { f: "Mg2SiO4", n: "Forsterite", c: "peridot", w: "Forsterite", note: "The green August birthstone, and most of the Earth's upper mantle." },
  "Al-Mg-O": { f: "MgAl2O4", n: "Spinel", c: "the 'ruby' in the Crown Jewels", w: "Spinel", note: "The Black Prince's Ruby is actually a spinel. So were a lot of rubies." },
  "Ca-F-O-P": { f: "Ca5(PO4)3F", n: "Fluorapatite", c: "tooth enamel", w: "Fluorapatite", note: "What fluoride turns your enamel into. Harder than the original." },
  "Ca-O-P": { f: "Ca3(PO4)2", n: "Calcium phosphate", c: "bone", w: "Calcium_phosphate", note: "The mineral in bone and teeth." },
  "C-O-Zn": { f: "ZnCO3", n: "Zinc carbonate", c: "smithsonite", w: "Smithsonite", note: "Old calamine was this. Pastel pink and green crystals." },
  "C-Cu-O": { f: "CuCO3", n: "Copper carbonate", c: "the green on a copper roof", w: "Copper(II)_carbonate", note: "Patina green." },
  "Cu-Fe-S": { f: "CuFeS2", n: "Chalcopyrite", c: "peacock ore", w: "Chalcopyrite", note: "Tarnishes into iridescent purple and blue. The main copper ore." },
  "As-Fe-S": { f: "FeAsS", n: "Arsenopyrite", w: "Arsenopyrite", note: "The main ore of arsenic." },
  "As-S": { f: "As2S3", n: "Orpiment", c: "king's yellow", w: "Orpiment", note: "The golden pigment in Mughal miniatures. Arsenic, so the painters didn't lick the brush." },
  "Al-K-O-S": { f: "KAl(SO4)2", n: "Potassium alum", c: "fitkari", w: "Potassium_alum", note: "The after-shave block, the water clarifier, the pickling crisper." },
  "Fe-O-S": { f: "FeSO4", n: "Iron(II) sulfate", c: "green vitriol", w: "Iron(II)_sulfate", note: "Iron tablets for anaemia, and the old black ink." },
  "K-Cr-O": { f: "K2Cr2O7", n: "Potassium dichromate", w: "Potassium_dichromate", note: "The orange crystal of the old breathalyser; turns green with alcohol." },
  "Cr-O-Pb": { f: "PbCrO4", n: "Lead chromate", c: "chrome yellow", w: "Lead(II)_chromate", note: "The yellow of American school buses and Van Gogh's sunflowers." },
  "Cu-H-O": { f: "Cu(OH)2", n: "Copper hydroxide", w: "Copper(II)_hydroxide", note: "The pale blue precipitate from school chemistry." },
  "Fe-H-O": { f: "Fe(OH)3", n: "Iron(III) hydroxide", c: "the brown in rusty water", w: "Iron(III)_oxide-hydroxide", note: "The orange sludge where a tap leaks." },
  "Al-H-O": { f: "Al(OH)3", n: "Aluminium hydroxide", c: "the antacid gel", w: "Aluminium_hydroxide", note: "The chalky antacid, and the flame retardant in a mattress." },
  "Mg-Cl": { f: "MgCl2", n: "Magnesium chloride", c: "nigari, the tofu-setter", w: "Magnesium_chloride", note: "What curdles soy milk into tofu." },
  "Cl-Zn": { f: "ZnCl2", n: "Zinc chloride", c: "soldering flux", w: "Zinc_chloride", note: "Tinner's fluid. Also the smoke in a smoke grenade." },
  "Cl-Sn": { f: "SnCl2", n: "Tin(II) chloride", c: "tin-plating salt", w: "Tin(II)_chloride", note: "Makes the silver mirror on the back of glass." },
  "Cl-Cu": { f: "CuCl2", n: "Copper(II) chloride", c: "the blue-green flame", w: "Copper(II)_chloride", note: "Burns blue-green. The colour in a firework." },
  "Cl-Co": { f: "CoCl2", n: "Cobalt chloride", c: "the humidity-test paper", w: "Cobalt(II)_chloride", note: "Blue when dry, pink when wet. The silica-gel indicator." },
  "Cl-Ni": { f: "NiCl2", n: "Nickel chloride", w: "Nickel(II)_chloride", note: "The green bath that nickel-plates a tap." },
  "Cl-Cr": { f: "CrCl3", n: "Chromium(III) chloride", w: "Chromium(III)_chloride", note: "Violet flakes. Chrome tanning of leather starts near here." },
  "Cl-Mn": { f: "MnCl2", n: "Manganese chloride", w: "Manganese(II)_chloride", note: "Pink crystals; a trace mineral in fertiliser." },
  "Cl-Ti": { f: "TiCl4", n: "Titanium tetrachloride", c: "tickle", w: "Titanium_tetrachloride", note: "Fumes white smoke in damp air. Skywriting and the step before titanium metal." },
  "Cl-Si": { f: "SiCl4", n: "Silicon tetrachloride", w: "Silicon_tetrachloride", note: "Distilled pure, then turned back into the silicon in a solar panel." },
  "Cl-Li": { f: "LiCl", n: "Lithium chloride", w: "Lithium_chloride", note: "So thirsty it pulls water out of the air. Dehumidifiers." },
  "Cl-Cs": { f: "CsCl", n: "Caesium chloride", w: "Caesium_chloride", note: "Dense enough to float DNA in a centrifuge." },
  "Cl-Rb": { f: "RbCl", n: "Rubidium chloride", w: "Rubidium_chloride", note: "A lab reagent that turns a flame violet-red." },
  "Br-Na": { f: "NaBr", n: "Sodium bromide", c: "the old sedative", w: "Sodium_bromide", note: "Victorian calming salts. Now the pool and hot-tub sanitiser." },
  "Br-K": { f: "KBr", n: "Potassium bromide", w: "Potassium_bromide", note: "Early film and a Victorian sedative. Pressed into discs for infrared spectroscopy." },
  "I-Na": { f: "NaI", n: "Sodium iodide", w: "Sodium_iodide", note: "Grown as a crystal, it flashes when radiation hits it. Gamma cameras." },
  "I-Ag": { f: "AgI", n: "Silver iodide", c: "cloud-seeding", w: "Silver_iodide", note: "Fired into clouds to make them rain over a dry reservoir." },
  "H-Li": { f: "LiH", n: "Lithium hydride", w: "Lithium_hydride", note: "Light, stores hydrogen, and sits inside a thermonuclear bomb." },
  "H-Na": { f: "NaH", n: "Sodium hydride", w: "Sodium_hydride", note: "A strong base chemists keep under oil because it catches fire in air." },
  "Al-H-Li": { f: "LiAlH4", n: "Lithium aluminium hydride", w: "Lithium_aluminium_hydride", note: "The reducing agent every organic-chemistry student fears a little." },
  "B-H-Na": { f: "NaBH4", n: "Sodium borohydride", w: "Sodium_borohydride", note: "The gentler reducing agent; also a hydrogen store for fuel cells." },
  "Ca-H": { f: "CaH2", n: "Calcium hydride", w: "Calcium_hydride", note: "Drying agent for solvents. Fizzes hydrogen with water." },
  "Mg-N": { f: "Mg3N2", n: "Magnesium nitride", w: "Magnesium_nitride", note: "What forms when magnesium burns in air with no oxygen left." },
  "Li-N": { f: "Li3N", n: "Lithium nitride", w: "Lithium_nitride", note: "The only alkali metal nitride that is stable at room temperature." },
  "Al-N": { f: "AlN", n: "Aluminium nitride", w: "Aluminium_nitride", note: "A ceramic that conducts heat like a metal. Under LED chips." },
  "N-Nb": { f: "NbN", n: "Niobium nitride", w: "Niobium_nitride", note: "The single-photon detectors in quantum computers." },
  "C-Nb": { f: "NbC", n: "Niobium carbide", w: "Niobium_carbide", note: "Cutting-tool coating, nearly as hard as tungsten carbide." },
  "C-Ta": { f: "TaC", n: "Tantalum carbide", w: "Tantalum_carbide", note: "One of the highest melting points of anything: about 3,880 °C." },
  "C-Hf": { f: "HfC", n: "Hafnium carbide", w: "Hafnium_carbide", note: "The highest melting point of any binary compound." },
  "B-Mg": { f: "MgB2", n: "Magnesium diboride", w: "Magnesium_diboride", note: "A cheap superconductor discovered by accident in 2001." },
  "B-C": { f: "B4C", n: "Boron carbide", c: "body-armour plate", w: "Boron_carbide", note: "Third-hardest material known. Bulletproof vests and tank armour." },
  "B-F": { f: "BF3", n: "Boron trifluoride", w: "Boron_trifluoride", note: "The textbook Lewis acid." },
  "B-O": { f: "B2O3", n: "Boron trioxide", c: "the glass in Pyrex", w: "Boron_trioxide", note: "What makes borosilicate glass survive the oven and the freezer." },
  "Br-H": { f: "HBr", n: "Hydrogen bromide", w: "Hydrogen_bromide", note: "Hydrobromic acid; a step in making sedatives and flame retardants." },
  "H-I": { f: "HI", n: "Hydrogen iodide", w: "Hydrogen_iodide", note: "One of the strongest acids in water." },
  "F-H": { f: "HF", n: "Hydrogen fluoride", c: "the glass-etching acid", w: "Hydrogen_fluoride", note: "Eats glass. Frosted-glass patterns are etched with it." },
  "Cl-O": { f: "ClO2", n: "Chlorine dioxide", w: "Chlorine_dioxide", note: "Bleaches paper pulp and disinfects city water." },
  "Cl-F": { f: "ClF3", n: "Chlorine trifluoride", w: "Chlorine_trifluoride", note: "Sets sand, asbestos and chemists on fire. Nobody uses it twice." },
  "Cl-I": { f: "ICl", n: "Iodine monochloride", w: "Iodine_monochloride", note: "The Wijs reagent that grades cooking oil." },
  "Br-I": { f: "IBr", n: "Iodine monobromide", w: "Iodine_monobromide", note: "A dark red solid; grades fats in the lab." },
  "Br-Cl": { f: "BrCl", n: "Bromine chloride", w: "Bromine_monochloride", note: "A cooling-tower disinfectant." },
  "N-F": { f: "NF3", n: "Nitrogen trifluoride", w: "Nitrogen_trifluoride", note: "Cleans the chambers that make flat screens. A savage greenhouse gas." },
  "Br-N": { f: "NBr3", n: "Nitrogen tribromide", w: "Nitrogen_tribromide", note: "Deep red, and explodes above −100 °C. Nobody has a use for it." },
  "I-N": { f: "NI3", n: "Nitrogen triiodide", c: "the touch-powder", w: "Nitrogen_triiodide", note: "A feather touching it sets it off with a purple bang. The classic chemistry-teacher prank." },
  "N-Cl": { f: "NCl3", n: "Nitrogen trichloride", w: "Nitrogen_trichloride", note: "Explodes if you look at it wrong. Once used to bleach flour." },
  "O-P": { f: "P4O10", n: "Phosphorus pentoxide", w: "Phosphorus_pentoxide", note: "The driest thing in the lab. Sucks water out of everything." },
  "F-Xe": { f: "XeF2", n: "Xenon difluoride", w: "Xenon_difluoride", note: "A noble gas that bonded. In 1962 this upended a century of textbooks." },
  "O-Xe": { f: "XeO3", n: "Xenon trioxide", w: "Xenon_trioxide", note: "A noble-gas compound that explodes when dry." },
  "F-Kr": { f: "KrF2", n: "Krypton difluoride", w: "Krypton_difluoride", note: "Krypton's only compound. Made in an electric discharge at −196 °C." },
  "F-Rn": { f: "RnF2", n: "Radon difluoride", w: "Radon_difluoride", note: "The one radon compound anyone has made, and only in trace amounts." },
  "Ar-F-H": { f: "HArF", n: "Argon fluorohydride", w: "Argon_fluorohydride", note: "Argon's only compound. Exists below −256 °C and nowhere else." },
  "Cl-Fr-O": { f: "FrClO4", n: "Francium perchlorate", w: "Francium_compounds", note: "Carried down with caesium perchlorate in the only francium chemistry ever done." },
  "At-H": { f: "HAt", n: "Hydrogen astatide", w: "Astatine#Compounds", note: "Astatine's best-known compound, and still only ever a few atoms at a time." },
  "Cl-Rf": { f: "RfCl4", n: "Rutherfordium tetrachloride", w: "Rutherfordium#Experimental_chemistry", note: "Made a few atoms at a time and sniffed in a gas-phase experiment." },
  "Br-Rf": { f: "RfBr4", n: "Rutherfordium tetrabromide", w: "Rutherfordium#Experimental_chemistry", note: "Observed as a volatile gas. Rutherfordium behaves like hafnium, as the table says it should." },
  "Cl-Db-O": { f: "DbOCl3", n: "Dubnium oxychloride", w: "Dubnium#Experimental_chemistry", note: "A few atoms, seen by their volatility. That is all dubnium chemistry there is." },
  "Cl-O-Sg": { f: "SgO2Cl2", n: "Seaborgium oxychloride", w: "Seaborgium#Experimental_chemistry", note: "The first seaborgium chemistry, 1995, from the ²⁴⁸Cm + ²²Ne reaction." },
  "C-O-Sg": { f: "Sg(CO)6", n: "Seaborgium hexacarbonyl", w: "Seaborgium#Experimental_chemistry", note: "Shown in 2014. It behaves like its tungsten cousin, which is the point." },
  "Bh-Cl-O": { f: "BhO3Cl", n: "Bohrium oxychloride", w: "Bohrium#Experimental_chemistry", note: "Six atoms. That was enough to confirm it sits under rhenium." },
  "Hs-O": { f: "HsO4", n: "Hassium tetroxide", w: "Hassium#Experimental_chemistry", note: "Hassium reacts with oxygen like osmium does. Seen at GSI, Darmstadt." },
  "Cn-Se": { f: "CnSe", n: "Copernicium selenide", w: "Copernicium#Experimental_chemistry", note: "In 2015, copernicium atoms landed on selenium and stuck. The heaviest compound ever seen." },
};

const NAMES = Object.fromEntries(ELEMENTS.map(e => [e[1], e[2]]));
// Keys are matched by sorted symbols; the flask holds at most three, so longer recipes are left out.
const CHEM = Object.fromEntries(Object.entries(CURATED).map(([k, v]) => [k.split("-").sort().join("-"), v]).filter(([k]) => k.split("-").length <= 3 && new Set(k.split("-")).size === k.split("-").length));
const sub = f => f.replace(/(\d+)/g, "<sub>$1</sub>").replace(/·/g, "<i>·</i>");
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const lower = s => s.charAt(0).toLowerCase() + s.slice(1);

// A generic binary compound from oxidation states. Returns null when the pair doesn't bond.
function generic(a, b) {
  let oa = OX[a], ob = OX[b];
  if (oa === 0 || ob === 0) return null;
  const aN = a in EN, bN = b in EN;
  // Two nonmetals: the more electronegative one goes negative.
  if (aN && bN) {
    if (EN[a] > EN[b]) [a, b] = [b, a];
    oa = Math.abs(OX[a]) > 0 ? ({ H: 1, B: 3, C: 4, Si: 4, N: 3, P: 3, As: 3, Sb: 3, Ge: 4, S: 4, Se: 4, Te: 4, Cl: 1, Br: 1, I: 1, At: 1, O: 2, F: 1 })[a] : 1;
    ob = OX[b] < 0 ? -OX[b] : 1;
  } else if (!aN && !bN) {
    return { f: `${a}·${b}`, n: `${NAMES[a]}-${lower(NAMES[b])} alloy`, kind: "alloy", generic: true, note: "Two metals don't make a formula; they make an alloy. Melt them together and they mix in any proportion." };
  } else {
    if (aN) [a, b] = [b, a];
    oa = OX[a]; ob = OX[b] < 0 ? -OX[b] : ({ H: 1 })[b] || 1;
    if (b === "H") ob = 1;
    if (oa < 0) return null;
  }
  const g = gcd(oa, ob), na = ob / g, nb = oa / g;
  const f = `${a}${na > 1 ? na : ""}${b}${nb > 1 ? nb : ""}`;
  let n;
  if (aN) n = `${na > 1 ? PREFIX[na] + lower(NAMES[a]) : NAMES[a]} ${nb > 1 ? PREFIX[nb] : ""}${STEM[b]}`.replace(/([ao])oxide/, "oxide");
  else n = `${NAMES[a]}${ROMANS.has(a) ? `(${ROMAN_N[oa]})` : ""} ${STEM[b]}`;
  n = n.charAt(0).toUpperCase() + n.slice(1);
  const trace = TRACE.has(a) || TRACE.has(b);
  return { f, n, generic: true, trace, note: trace ? `${NAMES[a]} and ${lower(NAMES[b])} have only ever met a few atoms at a time, so this formula is what the table predicts, not what sits in a bottle.` : (aN ? "A molecule, named by the counting rules: one prefix per atom." : "A salt: the metal gives up electrons, the nonmetal takes them, and the ratio balances the charge.") };
}

// Why a set of elements makes nothing. Returns null when it might.
function inert(syms) {
  const dead = syms.filter(s => OX[s] === 0);
  if (!dead.length) return null;
  const s = dead[0];
  if (s === "He" || s === "Ne") return `${NAMES[s]} has never bonded with anything. Not once, not at any temperature.`;
  if (s === "Ar") return "Argon has exactly one compound, HArF, and it only exists below −256 °C.";
  if (s === "Kr") return "Krypton bonds only with fluorine, and only at −196 °C.";
  if (s === "Xe") return "Xenon bonds only with fluorine and oxygen.";
  if (s === "Rn") return "Radon has one compound, the difluoride, and only in trace amounts.";
  return `${NAMES[s]} has only ever existed a few atoms at a time, each gone in under a second. Nobody has made a compound of it.`;
}

// The Lab's answer for a list of element objects. Returns { f, n, c, note, w, kind, spectator, generic, none }.
function react(list) {
  const syms = list.map(e => e.sym);
  const key = (arr) => [...arr].sort().join("-");
  if (syms.length === 1) return { none: true, f: syms[0], n: `Pure ${lower(NAMES[syms[0]])}`, note: "One element on its own. Add another and see if they react." };
  const hit = CHEM[key(syms)];
  if (hit) return { ...hit, w: hit.w ? `https://en.wikipedia.org/wiki/${hit.w}` : null };
  if (syms.length === 2) {
    const why = inert(syms);
    if (why) return { none: true, f: `${syms[0]} + ${syms[1]}`, n: "No reaction", note: why };
    const g = generic(syms[0], syms[1]);
    if (!g) return { none: true, f: `${syms[0]} + ${syms[1]}`, n: "No simple compound", note: `${NAMES[syms[0]]} and ${lower(NAMES[syms[1]])} don't pair into a simple salt or molecule.` };
    return { ...g, w: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(g.n)}` };
  }
  // Three elements: try each pair, keep the best, name the third a spectator.
  const pairs = [[0, 1, 2], [0, 2, 1], [1, 2, 0]];
  let best = null;
  for (const [i, j, k] of pairs) {
    const c = CHEM[key([syms[i], syms[j]])];
    if (c) { best = { ...c, w: c.w ? `https://en.wikipedia.org/wiki/${c.w}` : null, spectator: syms[k] }; break; }
  }
  if (!best) for (const [i, j, k] of pairs) {
    if (inert([syms[i], syms[j]])) continue;
    const g = generic(syms[i], syms[j]);
    if (g) { best = { ...g, w: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(g.n)}`, spectator: syms[k] }; break; }
  }
  if (!best) return { none: true, f: syms.join(" + "), n: "No reaction", note: inert(syms) || "These three don't make anything together." };
  return best;
}
