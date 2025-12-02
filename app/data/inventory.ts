import { Category } from './types';

// Helper to standardise IDs for scrolling
const toSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '-');

export const INVENTORY_DATA: Category[] = [
      {
    title: "Fastening & Joining",
    slug: toSlug("Fastening & Joining"),
    items: [
      { name: "Anchors", imagePath: "/fastening\\anchor.webp" },
      { name: "Bolts", imagePath: "/fastening\\bolts.webp" },
      { name: "Cable Ties", imagePath: "/fastening\\cable-ties.jpg" },
      { name: "Eyebolts", imagePath: "/fastening\\eyebolts.jpg" },
      { name: "Helical Inserts", imagePath: "/fastening\\helical-inserts.jpg" },
      { name: "Key Stock", imagePath: "/fastening\\keystock.jpg" },
      { name: "Lanyards", imagePath: "/fastening\\lanyards.avif" },
      { name: "Magnets", imagePath: "/fastening\\magnets.jpg" },
      { name: "Nails", imagePath: "/fastening\\nails.jpg" },
      { name: "Nuts" , imagePath: "/fastening\\nuts.jpg"},
      { name: "Pins", imagePath: "/fastening\\pins.jpg" },
      { name: "Retaining Rings", imagePath: "/fastening\\retaining-rings.jpg" },
      { name: "Rivets", imagePath: "/fastening\\rivets.jpg" },
      { name: "Screws", imagePath: "/fastening\\screws.jpg" },
      { name: "Shims", imagePath: "/fastening\\shims.jpg" },
      { name: "Spacers", imagePath: "/fastening\\spacers.jpg" },
      { name: "Staples", imagePath: "/fastening\\staples.jpg" },
      { name: "Studs", imagePath: "/fastening\\studs.jpg" },
      { name: "Threaded Rods", imagePath: "/fastening\\threaded-rods.jpg" },
      { name: "U-Bolts", imagePath: "/fastening\\u-bolts.jpg" },
      { name: "Washers", imagePath: "/fastening\\washers.jpg" }
    ]
  },
  {
    title: "Abrading & Polishing",
    slug: toSlug("Abrading & Polishing"),
    items: [
      { name: "Abrasive Belts", imagePath: "/abrasive\\belt.jpg" }, // Example: Real image path
      { name: "Abrasive Discs", imagePath: "/abrasive\\discs.jpg" }, 
      { name: "Abrasive Wheels", imagePath: "/abrasive\\abrasive-wheels.jpg" },
      { name: "Buffing Wheels", imagePath: "/abrasive\\buffing-wheels.jpg" },
      { name: "Deburring Tools", imagePath: "/abrasive\\deburring-tools.jpg" },
      { name: "Files", imagePath: "/abrasive\\files.jpg" },
      { name: "Grinding Wheels", imagePath: "/abrasive\\grinding-wheels.jpg" },
      { name: "Honing Tools", imagePath: "/abrasive\\honing-tools.jpg" },
      { name: "Polishing Compounds", imagePath: "/abrasive\\polishing-compound.webp" },
      { name: "Sandpaper", imagePath: "/abrasive\\sandpaper.jpg" },
      { name: "Sharpening Stones", imagePath: "/abrasive\\sharpening-stones.webp" },
      { name: "Wire Brushes", imagePath: "/abrasive\\wire-brushes.jpg"}
    ]
  },
  {
    title: "Building & Grounds",
    slug: toSlug("Building & Grounds"),
    items: [
      { name: "Acoustic Tiles", imagePath: "/building&grounds\\acoustic-tiles.jpg" },
      { name: "Awnings", imagePath: "/building&grounds\\Awnings.webp" },
      { name: "Barriers & Railings", imagePath: "/building&grounds\\barriers-railings.jpg" },
      { name: "Doors", imagePath: "/building&grounds\\doors.webp" },
      { name: "Drainage", imagePath: "/building&grounds\\drainage.avif" },
      { name: "Flooring", imagePath: "/building&grounds\\flooring.webp" },
      { name: "Grounds Maintenance", imagePath: "/building&grounds\\ground-maintainance.jpg" },
      { name: "Ladders", imagePath: "/building&grounds\\ladders.jpg" },
      { name: "Matting", imagePath: "/building&grounds\\matting.jpg" },
      { name: "Stairs", imagePath: "/building&grounds\\stairs.jpg" },
      { name: "Windows", imagePath: "/building&grounds\\windows.webp" }
    ]
  },
  {
    title: "Electrical & Lighting",
    slug: toSlug("Electrical & Lighting"),
    items: [
      { name: "Batteries", imagePath: "/electrical\\batteries.jpg" },
      { name: "Circuit Breakers", imagePath: "/electrical\\circuit-breakers.jpg" },
      { name: "Conduit", imagePath: "/electrical\\conduit.jpg" },
      { name: "Electrical Boxes", imagePath: "/electrical\\electrical-boxes.jpg" },
      { name: "Extension Cords", imagePath: "/electrical\\extension-cords.webp" },
      { name: "Fuses", imagePath: "/electrical\\fuses.jpg" },
      { name: "Light Bulbs", imagePath: "/electrical\\light-bulbs.webp" },
      { name: "Lighting Fixtures", imagePath: "/electrical\\light-fixture.avif" },
      { name: "Outlets & Plugs", imagePath: "/electrical\\outlets-plugs.webp" },
      { name: "Switches", imagePath: "/electrical\\switches.webp" },
      { name: "Transformers", imagePath: "/electrical\\transformer.webp" },
      { name: "Wire & Cable", imagePath: "/electrical\\wire-cables.webp" }
    ]
  },
  {
    title: "Fabricating",
    slug: toSlug("Fabricating"),
    items: [
      { name: "Insulation", imagePath: "/fabricating\\insulation.jpg" },
      { name: "Machine Guards", imagePath: "/fabricating\\machine-guards.webp" },
      { name: "Noise Control", imagePath: "/fabricating\\noise-control.jpg" },
      { name: "Plastic Fabrication", imagePath: "/fabricating\\plastic-fabrications.png" },
      { name: "Sheet Metal Tools", imagePath: "/fabricating\\sheet-metal-tools.jpg" },
      { name: "Shim Stock", imagePath: "/fabricating\\shim-stock.jpg" },
      { name: "Vibration Control Mounts", imagePath: "/fabricating\\vibration-control-mounts.jpg" }
    ]
  },

  {
    title: "Filtering",
    slug: toSlug("Filtering"),
    items: [
      { name: "Air Filters", imagePath: "/filtering\\air-filters.webp" },
      { name: "Compressed Air Filters", imagePath: "/filtering\\compressed-air-filter.jpg" },
      { name: "Filter Bags", imagePath: "/filtering\\filter-bags.webp" },
      { name: "Filter Cartridges", imagePath: "/filtering\\filter-cartridge.jpg" },
      { name: "Hydraulic Filters", imagePath: "/filtering\\hydraulic.jpg" },
      { name: "Liquid Filters", imagePath: "/filtering\\liquid-filters.jpg" },
      { name: "Oil Filters", imagePath: "/filtering\\oil-filters.webp" },
      { name: "Strainers", imagePath: "/filtering\\strainers.jpg" },
      { name: "Water Filters", imagePath: "/filtering\\water-filters.jpg" }
    ]
  },
  {
    title: "Flow & Level Control",
    slug: toSlug("Flow & Level Control"),
    items: [
      { name: "Flow Switches", imagePath: "/flow\\flow-switches.jpg" },
      { name: "Flowmeters", imagePath: "/flow\\flowmeters.png" },
      { name: "Gauges", imagePath: "/flow\\gauges.webp" },
      { name: "Level Switches", imagePath: "/flow\\level-switches.jpg" },
      { name: "Pumps", imagePath: "/flow\\pumps.webp" },
      { name: "Regulators", imagePath: "/flow\\regulators.jpg" },
      { name: "Solenoid Valves", imagePath: "/flow\\solenoid-valve.webp" },
      { name: "Valves", imagePath: "/flow\\valves.png" }
    ]
  },
  {
    title: "Furniture & Storage",
    slug: toSlug("Furniture & Storage"),
    items: [
      { name: "Bins & Totes", imagePath: "/furniture\\bins-totes.png" },
      { name: "Cabinets", imagePath: "/furniture\\cabinets.webp" },
      { name: "Carts", imagePath: "/furniture\\carts.jpg" },
      { name: "Chairs & Stools", imagePath: "/furniture\\chairs.webp" },
      { name: "Desks", imagePath: "/furniture\\desks.webp" },
      { name: "Drawers", imagePath: "/furniture\\drawers.jpg" },
      { name: "Lockers", imagePath: "/furniture\\lockers.webp" },
      { name: "Racks", imagePath: "/furniture\\racks.jpg" },
      { name: "Shelving", imagePath: "/furniture\\shelving.webp" },
      { name: "Workbenches", imagePath: "/furniture\\workbenches.jpg" }
    ]
  },
  {
    title: "Hand Tools",
    slug: toSlug("Hand Tools"),
    items: [
      { name: "Clamps", imagePath: "/handtools/clamps.webp" }, // Example
      { name: "Crimpers", imagePath: "/handtools/crimpers.jpg" },
      { name: "Files", imagePath: "/handtools/files.avif" },
      { name: "Hammers", imagePath: "/handtools/hammer.webp" }, // Example
      { name: "Knives", imagePath: "/handtools/knives.jpg" },
      { name: "Multi-Tools", imagePath: "/handtools/multitools.jpg" },
      { name: "Pliers", imagePath: "/handtools/pliers.webp" },
      { name: "Pry Bars", imagePath: "/handtools/pry-bars.jpg" },
      { name: "Ratchets", imagePath: "/handtools/ratches.jpg" },
      { name: "Saws", imagePath: "/handtools/saw.webp" },
      { name: "Screwdrivers", imagePath: "/handtools/screwdriver.webp" }, // Example
      { name: "Sockets", imagePath: "/handtools/sockets.jpg" },
      { name: "Staplers", imagePath: "/handtools/staplers.jpg" },
      { name: "Wrenches", imagePath: "/handtools/wrenches.avif" }
    ]
  },
  {
    title: "Hardware",
    slug: toSlug("Hardware"),
    items: [
      { name: "Bumpers", imagePath: "/hardware\\bumpers.jpg" },
      { name: "Casters", imagePath: "/hardware\\casters.jpg" },
      { name: "Door Hardware", imagePath: "/hardware\\door-hardware.png" },
      { name: "Drawer Slides", imagePath: "/hardware\\drawer-sliders.jpg" },
      { name: "Handles", imagePath: "/hardware\\handles.jpg" },
      { name: "Hinges", imagePath: "/hardware\\hinges.jpg" },
      { name: "Hooks", imagePath: "/hardware\\hooks.webp" },
      { name: "Knobs", imagePath: "/hardware\\knobs.jpg" },
      { name: "Latches", imagePath: "/hardware\\latches.webp" },
      { name: "Locks", imagePath: "/hardware\\locks.jpg" },
      { name: "Springs", imagePath: "/hardware\\springs.jpg" }
    ]
  },
  {
    title: "Heating & Cooling",
    slug: toSlug("Heating & Cooling"),
    items: [
      { name: "Air Conditioners", imagePath: "/heating&cooling/ac.avif" },
      { name: "Blowers", imagePath: "/heating&cooling/blowers.webp" },
      { name: "Chillers", imagePath: "/heating&cooling/chillers.jpg" },
      { name: "Ducting", imagePath: "/heating&cooling/ducting.jpg" },
      { name: "Fans", imagePath: "/heating&cooling/fans.webp" },
      { name: "Heat Exchangers", imagePath: "/heating&cooling/heat-exchangers.webp" },
      { name: "Heaters", imagePath: "/heating&cooling/heaters.jpg" },
      { name: "HVAC Controls", imagePath: "/heating&cooling/hvac.jpg" },
      { name: "Thermostats", imagePath: "/heating&cooling/thermostat.webp" },
      { name: "Vents", imagePath: "/heating&cooling/vents.jpg" }
    ]
  },
  {
    title: "Lubricating",
    slug: toSlug("Lubricating"),
    items: [
      { name: "Dispensing Equipment", imagePath: "/lubricants/dispensive-equipment.jpg" },
      { name: "Funnels", imagePath: "/lubricants/funnels.jpg" },
      { name: "Grease", imagePath: "/lubricants/grease.jpg" },
      { name: "Grease Guns", imagePath: "/lubricants/grease-guns.jpg" },
      { name: "Lubricants", imagePath: "/lubricants/lubricants.jpg" },
      { name: "Lubricators", imagePath: "/lubricants/lubricators.png" },
      { name: "Oilers", imagePath: "/lubricants/oilers.jpg" },
      { name: "Oils", imagePath: "/lubricants/oils.avif" }
    ]
  },
  {
    title: "Material Handling",
    slug: toSlug("Material Handling"),
    items: [
      { name: "Cranes", imagePath: "/material-handling/cranes.png" },
      { name: "Dock Equipment", imagePath: "/material-handling/dock-equipment.jpg" },
      { name: "Dollies", imagePath: "/material-handling/dollies.webp" },
      { name: "Drum Handling", imagePath: "/material-handling/dum-handling.webp" },
      { name: "Forklifts", imagePath: "/material-handling/forklifts.webp" },
      { name: "Hoists", imagePath: "/material-handling/Hoists.webp" },
      { name: "Jacks", imagePath: "/material-handling/jacks.webp" },
      { name: "Lift Tables", imagePath: "/material-handling/lift-tables.png" },
      { name: "Pallet Trucks", imagePath: "/material-handling/pallet-trucks.webp" },
      { name: "Slings", imagePath: "/material-handling/slings.jpg" },
      { name: "Winches", imagePath: "/material-handling/winches.jpg" }
    ]
  },
  {
    title: "Measuring & Inspecting",
    slug: toSlug("Measuring & Inspecting"),
    items: [
      { name: "Calipers", imagePath: "/measuring/calipers.jpg" },
      { name: "Gauges", imagePath: "/measuring/gauges.webp" },
      { name: "Indicators", imagePath: "/measuring/indicators.jpg" },
      { name: "Levels", imagePath: "/measuring/levels.webp" },
      { name: "Magnifiers", imagePath: "/measuring/mabnifiers.jpg" },
      { name: "Micrometers", imagePath: "/measuring/micrometers.webp" },
      { name: "Microscopes", imagePath: "/measuring/microscopes.webp" },
      { name: "Protractors", imagePath: "/measuring/protactors.webp" },
      { name: "Rulers", imagePath: "/measuring/rulers.jpg" },
      { name: "Scales", imagePath: "/measuring/scales.webp" },
      { name: "Squares", imagePath: "/measuring/squares.jpg" },
      { name: "Tape Measures", imagePath: "/measuring/tape-measure.jpg" },
      { name: "Thermometers", imagePath: "/measuring/thermometers.webp" }
    ]
  },
  {
    title: "Office Supplies & Signs",
    slug: toSlug("Office Supplies & Signs"),
    items: [
      { name: "Boards & Easels", imagePath: "/office-supplies/boards.webp" },
      { name: "Cleaning Supplies", imagePath: "/office-supplies/cleaning-supplies.jpg" },
      { name: "Envelopes", imagePath: "/office-supplies/envelopes.jpg" },
      { name: "Labels", imagePath: "/office-supplies/labels.jpg" },
      { name: "Office Furniture", imagePath: "/office-supplies/office-furniture.webp" },
      { name: "Paper", imagePath: "/office-supplies/paper.jpg" },
      { name: "Pens & Pencils", imagePath: "/office-supplies/pens-pencils.jpg" },
      { name: "Tags", imagePath: "/office-supplies/tags.jpg" }
    ]
  },
  {
    title: "Pipe, Tubing, Hose & Fittings",
    slug: toSlug("Pipe, Tubing, Hose & Fittings"),
    items: [
      { name: "Hose", imagePath: "/pipes/hose.jpg" },
      { name: "Hose Clamps", imagePath: "/pipes/hose-clamps.jpg" },
      { name: "Hose Fittings", imagePath: "/pipes/hose-fittings.jpg" },
      { name: "Hose Reels", imagePath: "/pipes/hose-reel.jpg" },
      { name: "Manifolds", imagePath: "/pipes/manifolds.jpg" },
      { name: "Pipe", imagePath: "/pipes/pipe.jpg" },
      { name: "Pipe Fittings", imagePath: "/pipes/pipe-fittings.jpg" },
      { name: "Pipe Hangers", imagePath: "/pipes/pipe-hangers.jpg" },
      { name: "Tank Fittings", imagePath: "/pipes/tank-fittings.jpg" },
      { name: "Tube Benders", imagePath: "/pipes/tube-benders].jpg" },
      { name: "Tube Cutters", imagePath: "/pipes/tube-cutters.webp" },
      { name: "Tubing", imagePath: "/pipes/tubinng.jpg" }
    ]
  },
  {
    title: "Plumbing & Janitorial",
    slug: toSlug("Plumbing & Janitorial"),
    items: [
      { name: "Bathroom Fixtures", imagePath: "/plumbing-janitorial/bathroom-fixtures.jpg" },
      { name: "Cleaning Chemicals", imagePath: "/plumbing-janitorial/cleaning-chemical.jpeg" },
      { name: "Drains", imagePath: "/plumbing-janitorial/drains.webp" },
      { name: "Faucets", imagePath: "/plumbing-janitorial/faucets.jpg" },
      { name: "Mops & Brooms", imagePath: "/plumbing-janitorial/mops-brooms.jpg" },
      { name: "Paper Products", imagePath: "/plumbing-janitorial/papers.jpg" },
      { name: "Pumps", imagePath: "/plumbing-janitorial/pumps.jpg" },
      { name: "Sinks", imagePath: "/plumbing-janitorial/sinks.jpg" },
      { name: "Toilets", imagePath: "/plumbing-janitorial/toilet.webp" },
      { name: "Trash Cans", imagePath: "/plumbing-janitorial/trash-cans.webp" },
      { name: "Water Heaters", imagePath: "/plumbing-janitorial/water-heater.webp" }
    ]
  },
  {
    title: "Power Transmission",
    slug: toSlug("Power Transmission"),
    items: [
      { name: "Bearings", imagePath: "/power-transmission/bearings.jpg" },
      { name: "Belts", imagePath: "/power-transmission/belts.jpg" },
      { name: "Bushings", imagePath: "/power-transmission/bushings.avif" },
      { name: "Chains", imagePath: "/power-transmission/chains.webp" },
      { name: "Clutches", imagePath: "/power-transmission/clutches.jpg" },
      { name: "Couplings", imagePath: "/power-transmission/couplings.jpg" },
      { name: "Gears", imagePath: "/power-transmission/gears.jpg" },
      { name: "Linear Motion", imagePath: "/power-transmission/linear-motion.jpg" },
      { name: "Motors", imagePath: "/power-transmission/motor.jpg" },
      { name: "Pulleys", imagePath: "/power-transmission/pulleys.webp" },
      { name: "Shafts", imagePath: "/power-transmission/shafts.webp" },
      { name: "Sprockets", imagePath: "/power-transmission/sprockets.jpg" }
    ]
  },
  {
    title: "Pressure & Temperature Control",
    slug: toSlug("Pressure & Temperature Control"),
    items: [
      { name: "Controllers", imagePath: "/pressure-temperature-control/controllers.jpg" },
      { name: "Gauges", imagePath: "/pressure-temperature-control/gauges.jpg" },
      { name: "Heating Elements", imagePath: "/pressure-temperature-control/heating-elements.jpg" },
      { name: "Pressure Switches", imagePath: "/pressure-temperature-control/pressure-switches.webp" },
      { name: "Recorders", imagePath: "/pressure-temperature-control/recorders.png" },
      { name: "Sensors", imagePath: "/pressure-temperature-control/sensors.jpeg" },
      { name: "Thermocouples", imagePath: "/pressure-temperature-control/thermocouples.jpg" },
      { name: "Thermometers", imagePath: "/pressure-temperature-control/thermometer.jpg" },
      { name: "Transducers", imagePath: "/pressure-temperature-control/transducers.jpg" }
    ]
  },
  {
    title: "Pulling & Lifting",
    slug: toSlug("Pulling & Lifting"),
    items: [
      { name: "Chain", imagePath: "/pulling-lifting/chain.jpg" },
      { name: "Clamps", imagePath: "/pulling-lifting/clamps.jpg" },
      { name: "Eye Bolts", imagePath: "/pulling-lifting/eye-bolts.webp" },
      { name: "Hoists", imagePath: "/pulling-lifting/hoists.jpeg" },
      { name: "Hooks", imagePath: "/pulling-lifting/hooks.avif" },
      { name: "Rope", imagePath: "/pulling-lifting/rope.jpg" },
      { name: "Shackles", imagePath: "/pulling-lifting/shackles.webp" },
      { name: "Slings", imagePath: "/pulling-lifting/slings.jpg" },
      { name: "Turnbuckles", imagePath: "/pulling-lifting/turnbuckles.jpg" },
      { name: "Winches", imagePath: "/pulling-lifting/winches.jpg" },
      { name: "Wire Rope", imagePath: "/pulling-lifting/wire-rope.jpeg" }
    ]
  },
  {
    title: "Raw Materials",
    slug: toSlug("Raw Materials"),
    items: [
      { name: "Ceramics", imagePath: "/raw-materials/ceramics.jpg" },
      { name: "Fabrics", imagePath: "/raw-materials/fabrics.jpg" },
      { name: "Felt", imagePath: "/raw-materials/felt.webp" },
      { name: "Fiberglass", imagePath: "/raw-materials/fiberglass.jpg" },
      { name: "Foam", imagePath: "/raw-materials/foam.jpg" },
      { name: "Glass", imagePath: "/raw-materials/glass.jpg" },
      { name: "Metals", imagePath: "/raw-materials/metals.jpg" },
      { name: "Plastics", imagePath: "/raw-materials/plastic.webp" },
      { name: "Rubber", imagePath: "/raw-materials/rubber.webp" },
      { name: "Wood", imagePath: "/raw-materials/wood.webp" }
    ]
  },
  {
    title: "Safety Supplies",
    slug: toSlug("Safety Supplies"),
    items: [
      { name: "Clothing", imagePath: "/safety-supplies/clothing.jpg" },
      { name: "Ear Protection", imagePath: "/safety-supplies/ear-protection.jpg" },
      { name: "Eye Protection", imagePath: "/safety-supplies/eye-protection.jpg" },
      { name: "Fall Protection", imagePath: "/safety-supplies/fall-protection.jpg" },
      { name: "Fire Extinguishers", imagePath: "/safety-supplies/fire-extinguishers.jpg" },
      { name: "First Aid", imagePath: "/safety-supplies/first-aid.jpg" },
      { name: "Gloves", imagePath: "/safety-supplies/gloves.jpeg" },
      { name: "Hard Hats", imagePath: "/safety-supplies/hard-hats.webp" },
      { name: "Masks", imagePath: "/safety-supplies/masks.jpg" },
      { name: "Respirators", imagePath: "/safety-supplies/respirators.avif" },
      { name: "Safety Shoes", imagePath: "/safety-supplies/safety-shoes.jpg" },
      { name: "Vests", imagePath: "/safety-supplies/vests.avif" }
    ]
  },
  {
    title: "Sawing & Cutting",
    slug: toSlug("Sawing & Cutting"),
    items: [
      { name: "Bandsaw Blades", imagePath: "/sawing-cutting/bandsaw-blades.jpg" },
      { name: "Circular Saw Blades", imagePath: "/sawing-cutting/circular-saw-blades.webp" },
      { name: "Cut-Off Wheels", imagePath: "/sawing-cutting/cut-off-wheels.jpg" },
      { name: "Dies", imagePath: "/sawing-cutting/dies.jpg" },
      { name: "Drill Bits", imagePath: "/sawing-cutting/drill-bits.jpg" },
      { name: "End Mills", imagePath: "/sawing-cutting/end-mills.png" },
      { name: "Hole Saws", imagePath: "/sawing-cutting/hole-saws.jpg" },
      { name: "Jigsaw Blades", imagePath: "/sawing-cutting/jigsaw-blades.jpg" },
      { name: "Knives", imagePath: "/sawing-cutting/knives.jpg" },
      { name: "Reamers", imagePath: "/sawing-cutting/reamers.jpg" },
      { name: "Reciprocating Saw Blades", imagePath: "/sawing-cutting/reciprocating-saw-blades.jpg" },
      { name: "Taps", imagePath: "/sawing-cutting/taps.avif" }
    ]
  },
  {
    title: "Sealing",
    slug: toSlug("Sealing"),
    items: [
      { name: "Compression Packing", imagePath: "/sealing/compression-packing.jpg" },
      { name: "Gaskets", imagePath: "/sealing/gaskets.jpg" },
      { name: "O-Rings", imagePath: "/sealing/o-rings.jpg" },
      { name: "Sealants", imagePath: "/sealing/sealants.jpg" },
      { name: "Thread Sealants", imagePath: "/sealing/thread-sealants.webp" },
      { name: "Weatherstripping", imagePath: "/sealing/weatherstripping.jpg" }
    ]
  },
  {
    title: "Shipping",
    slug: toSlug("Shipping"),
    items: [
      { name: "Bags", imagePath: "/shipping/bags.jpg" },
      { name: "Boxes", imagePath: "/shipping/boxes.jpg" },
      { name: "Bubble Wrap", imagePath: "/shipping/bubble-wrap.jpg" },
      { name: "Packing Peanuts", imagePath: "/shipping/packing-peanuts.jpg" },
      { name: "Pallets", imagePath: "/shipping/pallets.webp" },
      { name: "Shrink Wrap", imagePath: "/shipping/shrink-wrap.jpg" },
      { name: "Strapping", imagePath: "/shipping/strapping.jpg" },
      { name: "Tape", imagePath: "/shipping/tape.jpg" }
    ]
  },
  {
    title: "Suspending",
    slug: toSlug("Suspending"),
    items: [
      { name: "Beam Clamps", imagePath: "/suspending/beam-clamps.jpg" },
      { name: "Cable", imagePath: "/suspending/cables.jpg" },
      { name: "Chain", imagePath: "/suspending/chain.avif" },
      { name: "Hangers", imagePath: "/suspending/hanger.jpg" },
      { name: "Hooks", imagePath: "/suspending/hooks.webp" },
      { name: "Strut Channels", imagePath: "/suspending/strut-channels.png" },
      { name: "Threaded Rod", imagePath: "/suspending/threaded-rod.jpg" },
      { name: "Wire Rope", imagePath: "/suspending/wire-rope.webp" }
    ]
  }
];

// Helper to get simple list of names for the Sidebar
export const SIDEBAR_LINKS = INVENTORY_DATA.map(cat => cat.title).sort();