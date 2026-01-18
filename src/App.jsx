import React, { useState, useEffect, useMemo } from 'react';
import { Settings, Calculator, Info, AlertTriangle, ChevronDown } from 'lucide-react';

// --- MATERIAALIDATA (Kovakoodattu materials.json:sta) ---
const MATERIALS_DATA = [
  {
    "category": "Tekniset",
    "id": "abs",
    "name": "ABS (Standardi)",
    "density": 1.05,
    "defaultMfr": 20.0,
    "defaultPrice": 2.4,
    "viscosityFactor": 1.4,
    "diffusivity": 0.128,
    "defaultInjectionPressure": 1200,
    "meltTemp": 240,
    "moldTemp": 60,
    "ejectTemp": 95,
    "maxResidenceTime": 10
  },
  {
    "category": "Tekniset",
    "id": "abspc",
    "name": "ABS/PC (Seos)",
    "density": 1.14,
    "defaultMfr": 12.0,
    "defaultPrice": 3.9,
    "viscosityFactor": 1.6,
    "diffusivity": 0.11,
    "defaultInjectionPressure": 1400,
    "meltTemp": 260,
    "moldTemp": 70,
    "ejectTemp": 110,
    "maxResidenceTime": 8
  },
  {
    "category": "Tekniset",
    "id": "asa",
    "name": "ASA (UV-kestävä ABS)",
    "density": 1.07,
    "defaultMfr": 15.0,
    "defaultPrice": 3.1,
    "viscosityFactor": 1.4,
    "diffusivity": 0.12,
    "defaultInjectionPressure": 1200,
    "meltTemp": 250,
    "moldTemp": 60,
    "ejectTemp": 95,
    "maxResidenceTime": 10
  },
  {
    "category": "Perusmuovit",
    "id": "hips",
    "name": "HIPS (Iskunkestävä PS)",
    "density": 1.04,
    "defaultMfr": 10.0,
    "defaultPrice": 1.95,
    "viscosityFactor": 1.2,
    "diffusivity": 0.08,
    "defaultInjectionPressure": 1000,
    "meltTemp": 230,
    "moldTemp": 50,
    "ejectTemp": 80,
    "maxResidenceTime": 20
  },
  {
    "category": "Tekniset",
    "id": "pa6",
    "name": "PA6 (Nylon)",
    "density": 1.13,
    "defaultMfr": 15.0,
    "defaultPrice": 3.2,
    "viscosityFactor": 1.3,
    "diffusivity": 0.09,
    "defaultInjectionPressure": 1100,
    "meltTemp": 260,
    "moldTemp": 80,
    "ejectTemp": 120,
    "maxResidenceTime": 15
  },
  {
    "category": "Tekniset",
    "id": "pa6gf30",
    "name": "PA6 GF30 (30% lasikuitu)",
    "density": 1.35,
    "defaultMfr": 8.0,
    "defaultPrice": 3.6,
    "viscosityFactor": 1.5,
    "diffusivity": 0.18,
    "defaultInjectionPressure": 1300,
    "meltTemp": 280,
    "moldTemp": 90,
    "ejectTemp": 140,
    "maxResidenceTime": 15
  },
  {
    "category": "Tekniset",
    "id": "pa66",
    "name": "PA66 (Nylon 6,6)",
    "density": 1.15,
    "defaultMfr": 12.0,
    "defaultPrice": 4.0,
    "viscosityFactor": 1.5,
    "diffusivity": 0.09,
    "defaultInjectionPressure": 1300,
    "meltTemp": 280,
    "moldTemp": 85,
    "ejectTemp": 130,
    "maxResidenceTime": 15
  },
  {
    "category": "Tekniset",
    "id": "pc",
    "name": "PC (Polykarbonaatti)",
    "density": 1.2,
    "defaultMfr": 10.0,
    "defaultPrice": 4.2,
    "viscosityFactor": 1.8,
    "diffusivity": 0.1,
    "defaultInjectionPressure": 1600,
    "meltTemp": 300,
    "moldTemp": 90,
    "ejectTemp": 135,
    "maxResidenceTime": 8
  },
  {
    "category": "Tekniset",
    "id": "pcgf30",
    "name": "PC GF30 (Polykarbonaatti 30% GF)",
    "density": 1.43,
    "defaultMfr": 7.0,
    "defaultPrice": 5.5,
    "viscosityFactor": 2.0,
    "diffusivity": 0.168,
    "defaultInjectionPressure": 1600,
    "meltTemp": 310,
    "moldTemp": 100,
    "ejectTemp": 145,
    "maxResidenceTime": 8
  },
  {
    "category": "Perusmuovit",
    "id": "pehd",
    "name": "PE-HD (High Density)",
    "density": 0.95,
    "defaultMfr": 4.0,
    "defaultPrice": 1.65,
    "viscosityFactor": 1.1,
    "diffusivity": 0.1,
    "defaultInjectionPressure": 900,
    "meltTemp": 220,
    "moldTemp": 40,
    "ejectTemp": 80,
    "maxResidenceTime": 25
  },
  {
    "category": "Perusmuovit",
    "id": "peld",
    "name": "PE-LD (Low Density)",
    "density": 0.92,
    "defaultMfr": 6.0,
    "defaultPrice": 1.7,
    "viscosityFactor": 0.9,
    "diffusivity": 0.11,
    "defaultInjectionPressure": 700,
    "meltTemp": 200,
    "moldTemp": 30,
    "ejectTemp": 70,
    "maxResidenceTime": 25
  },
  {
    "category": "Tekniset",
    "id": "peek",
    "name": "PEEK (Polyeteerieteeriketoni)",
    "density": 1.3,
    "defaultMfr": 5.0,
    "defaultPrice": 65.0,
    "viscosityFactor": 2.2,
    "diffusivity": 0.165,
    "defaultInjectionPressure": 1700,
    "meltTemp": 380,
    "moldTemp": 180,
    "ejectTemp": 250,
    "maxResidenceTime": 30
  },
  {
    "category": "Tekniset",
    "id": "pbt",
    "name": "PBT (Polybutyleenitereftalaatti)",
    "density": 1.31,
    "defaultMfr": 15.0,
    "defaultPrice": 3.4,
    "viscosityFactor": 1.4,
    "diffusivity": 0.12,
    "defaultInjectionPressure": 1000,
    "meltTemp": 250,
    "moldTemp": 70,
    "ejectTemp": 110,
    "maxResidenceTime": 15
  },
  {
    "category": "Tekniset",
    "id": "pmma",
    "name": "PMMA (Akryyli)",
    "density": 1.18,
    "defaultMfr": 6.0,
    "defaultPrice": 3.5,
    "viscosityFactor": 1.7,
    "diffusivity": 0.09,
    "defaultInjectionPressure": 1300,
    "meltTemp": 240,
    "moldTemp": 60,
    "ejectTemp": 85,
    "maxResidenceTime": 12
  },
  {
    "category": "Tekniset",
    "id": "pom",
    "name": "POM (Asetaali)",
    "density": 1.41,
    "defaultMfr": 13.0,
    "defaultPrice": 3.1,
    "viscosityFactor": 1.4,
    "diffusivity": 0.085,
    "defaultInjectionPressure": 1400,
    "meltTemp": 205,
    "moldTemp": 90,
    "ejectTemp": 110,
    "maxResidenceTime": 8
  },
  {
    "category": "Perusmuovit",
    "id": "pp",
    "name": "PP (Polypropeeni)",
    "density": 0.9,
    "defaultMfr": 25.0,
    "defaultPrice": 1.55,
    "viscosityFactor": 1.0,
    "diffusivity": 0.096,
    "defaultInjectionPressure": 800,
    "meltTemp": 230,
    "moldTemp": 40,
    "ejectTemp": 90,
    "maxResidenceTime": 25
  },
  {
    "category": "Tekniset",
    "id": "ppgf30",
    "name": "PP GF30 (Polypropeeni 30% GF)",
    "density": 1.13,
    "defaultMfr": 8.0,
    "defaultPrice": 2.6,
    "viscosityFactor": 1.5,
    "diffusivity": 0.122,
    "defaultInjectionPressure": 1200,
    "meltTemp": 240,
    "moldTemp": 50,
    "ejectTemp": 100,
    "maxResidenceTime": 25
  },
  {
    "category": "Tekniset",
    "id": "pps",
    "name": "PPS (Polyfenyleenisulfidi)",
    "density": 1.35,
    "defaultMfr": 10.0,
    "defaultPrice": 12.0,
    "viscosityFactor": 1.8,
    "diffusivity": 0.15,
    "defaultInjectionPressure": 1400,
    "meltTemp": 320,
    "moldTemp": 140,
    "ejectTemp": 200,
    "maxResidenceTime": 20
  },
  {
    "category": "Perusmuovit",
    "id": "ps",
    "name": "PS (Polystyreeni GPPS)",
    "density": 1.05,
    "defaultMfr": 12.0,
    "defaultPrice": 1.8,
    "viscosityFactor": 1.2,
    "diffusivity": 0.08,
    "defaultInjectionPressure": 1000,
    "meltTemp": 220,
    "moldTemp": 40,
    "ejectTemp": 80,
    "maxResidenceTime": 20
  },
  {
    "category": "Tekniset",
    "id": "psu",
    "name": "PSU (Polysulfoni)",
    "density": 1.25,
    "defaultMfr": 8.0,
    "defaultPrice": 12.5,
    "viscosityFactor": 1.8,
    "diffusivity": 0.15,
    "defaultInjectionPressure": 1600,
    "meltTemp": 360,
    "moldTemp": 140,
    "ejectTemp": 190,
    "maxResidenceTime": 20
  },
  {
    "category": "Tekniset",
    "id": "san",
    "name": "SAN (Styreeni-akryylinitriili)",
    "density": 1.08,
    "defaultMfr": 18.0,
    "defaultPrice": 2.5,
    "viscosityFactor": 1.2,
    "diffusivity": 0.123,
    "defaultInjectionPressure": 1200,
    "meltTemp": 240,
    "moldTemp": 60,
    "ejectTemp": 95,
    "maxResidenceTime": 15
  },
  {
    "category": "Tekniset",
    "id": "tpe",
    "name": "TPE/TPU (Elastomeeri)",
    "density": 1.18,
    "defaultMfr": 10.0,
    "defaultPrice": 5.5,
    "viscosityFactor": 0.8,
    "diffusivity": 0.07,
    "defaultInjectionPressure": 600,
    "meltTemp": 200,
    "moldTemp": 30,
    "ejectTemp": 60,
    "maxResidenceTime": 20
  }
];

// --- VAKIOT ---
const FLOW_PRESSURE_EXPONENT = 1.25;
const FLOW_PRESSURE_MULTIPLIER = 1.5;
const FLOW_BASE_PRESSURE_DROP = 300.0;
const BAR_CM2_TO_TON_DIVISOR = 981.0;

const App = () => {
  // --- STATE ---
  
  // 1. Materiaali
  const [selectedMatName, setSelectedMatName] = useState(MATERIALS_DATA[0].name);
  
  // Materiaalin muokattavat arvot (alustetaan efektillä)
  const [matProps, setMatProps] = useState({
    visc: 1.0,
    refMfr: 15.0,
    defPressure: 1000,
    refMelt: 230,
    refMold: 50
  });

  // 2. Geometria
  const [geoMode, setGeoMode] = useState('rect'); // rect, round, manual
  const [dims, setDims] = useState({ length: 150, width: 100, diameter: 100, area: 0 });
  
  // 3. Prosessi ja Käyttäjän syötteet
  const [userMfr, setUserMfr] = useState('');
  const [cavities, setCavities] = useState(1);
  const [safetyFactor, setSafetyFactor] = useState(1.1);
  const [wallThickness, setWallThickness] = useState(2.0);
  const [flowLength, setFlowLength] = useState(150);
  
  // Käyttäjän säädöt (Lämpötilat & Nopeus)
  const [userMeltTemp, setUserMeltTemp] = useState(230);
  const [userMoldTemp, setUserMoldTemp] = useState(50);
  const [speedFactor, setSpeedFactor] = useState(1.0);
  
  const [userPressure, setUserPressure] = useState('');

  // --- LOGIIKKA ---

  // Kun materiaali vaihtuu, päivitä oletusarvot
  useEffect(() => {
    const mat = MATERIALS_DATA.find(m => m.name === selectedMatName);
    if (mat) {
      setMatProps({
        visc: mat.viscosityFactor,
        refMfr: mat.defaultMfr,
        defPressure: mat.defaultInjectionPressure,
        refMelt: mat.meltTemp,
        refMold: mat.moldTemp
      });
      // Resetoi myös käyttäjän sliderit oletuksiin
      setUserMeltTemp(mat.meltTemp);
      setUserMoldTemp(mat.moldTemp);
    }
  }, [selectedMatName]);

  // Laskenta
  const results = useMemo(() => {
    // 1. Pinta-ala
    let areaCm2 = 0;
    if (geoMode === 'rect') {
      areaCm2 = (dims.length * dims.width) / 100;
    } else if (geoMode === 'round') {
      areaCm2 = (Math.PI * Math.pow(dims.diameter / 2, 2)) / 100;
    } else {
      areaCm2 = dims.area;
    }

    const totalArea = areaCm2 * cavities;
    const userMfrVal = parseFloat(userMfr) || null;
    const userPressureVal = parseFloat(userPressure) || null;

    // --- 1. Nopea malli ---
    const quickFactor = (matProps.defPressure * 0.6) / BAR_CM2_TO_TON_DIVISOR;
    const quickForce = totalArea * quickFactor;

    // --- 2. Tarkka malli ---
    let ltRatio = 0;
    if (wallThickness > 0) ltRatio = flowLength / wallThickness;

    // Korjauskertoimet
    let mfrCorrection = 1.0;
    let tempCorrection = 1.0;
    let speedCorrection = 1.0;

    // A. MFR
    if (userMfrVal && userMfrVal > 0) {
      mfrCorrection = Math.pow(matProps.refMfr / userMfrVal, 0.25);
    }

    // B. Lämpötila
    const deltaMelt = userMeltTemp - matProps.refMelt;
    const deltaMold = userMoldTemp - matProps.refMold;
    const meltEffect = 1.0 - (deltaMelt * 0.003);
    const moldEffect = 1.0 - (deltaMold * 0.002);
    tempCorrection = Math.max(0.5, Math.min(1.5, meltEffect * moldEffect));

    // C. Nopeus
    speedCorrection = Math.pow(speedFactor, 0.4);

    const effectiveViscosity = matProps.visc * mfrCorrection * tempCorrection;

    // Paineen laskenta
    const flowPressure = Math.pow(ltRatio, FLOW_PRESSURE_EXPONENT) * effectiveViscosity * FLOW_PRESSURE_MULTIPLIER;
    const calcPressure = (FLOW_BASE_PRESSURE_DROP + flowPressure) * speedCorrection;

    // Clamp Factor
    let clampFactor = 0.9 - (ltRatio * 0.003);
    if (clampFactor > 0.9) clampFactor = 0.9;
    if (clampFactor < 0.35) clampFactor = 0.35;

    // Voiman laskenta
    const baseTonnage = (calcPressure * clampFactor * totalArea) / BAR_CM2_TO_TON_DIVISOR;
    const preciseForce = baseTonnage * safetyFactor;

    // --- 3. Custom Paine ---
    let customForce = 0;
    if (userPressureVal && userPressureVal > 0) {
      const customTonnage = (userPressureVal * clampFactor * totalArea) / BAR_CM2_TO_TON_DIVISOR;
      customForce = customTonnage * safetyFactor;
    }

    return {
      quick: quickForce,
      precise: preciseForce,
      custom: customForce,
      pressure: calcPressure,
      lt: ltRatio,
      tempCorr: tempCorrection,
      speedCorr: speedCorrection,
      warning: ltRatio > 250,
      clampFactor
    };
  }, [geoMode, dims, cavities, userMfr, safetyFactor, wallThickness, flowLength, userMeltTemp, userMoldTemp, speedFactor, userPressure, matProps]);


  // --- UI KOMPONENTIT ---
  
  const SliderInput = ({ label, val, setVal, min, max, step, unit = "" }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-sm font-bold text-blue-400">{Number(val).toFixed(step < 1 ? 1 : 0)} {unit}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} 
        value={val} onChange={(e) => setVal(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-8 border-b border-gray-700 pb-4 flex items-center gap-3">
          <Calculator className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold text-white">Sulkuvoimalaskuri Pro 3.0</h1>
            <p className="text-sm text-gray-400">PWA Web Edition</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* SIDEBAR (ASETUKSET) */}
          <div className="lg:col-span-4 space-y-6 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold">Asetukset</h2>
            </div>

            {/* Materiaalin valinta */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Valitse materiaali</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 appearance-none"
                  value={selectedMatName}
                  onChange={(e) => setSelectedMatName(e.target.value)}
                >
                  {MATERIALS_DATA.map(m => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Materiaalin arvot (ReadOnly/Edit - tässä vain näyttö selkeyden vuoksi, tai editointi kuten Python-versiossa) */}
            <div className="bg-slate-900/50 p-4 rounded-lg text-xs space-y-2 border border-slate-700">
              <p className="font-bold text-gray-400 mb-2">Materiaalin perusarvot</p>
              <div className="flex justify-between"><span>Viskositeettikerroin:</span> <span className="text-blue-300">{matProps.visc}</span></div>
              <div className="flex justify-between"><span>Ref. MFR:</span> <span className="text-blue-300">{matProps.refMfr}</span></div>
              <div className="flex justify-between"><span>Peruspaine:</span> <span className="text-blue-300">{matProps.defPressure} bar</span></div>
              <div className="flex justify-between"><span>Sula (°C):</span> <span className="text-blue-300">{matProps.refMelt}</span></div>
              <div className="flex justify-between"><span>Muotti (°C):</span> <span className="text-blue-300">{matProps.refMold}</span></div>
            </div>

            {/* Muut säädöt */}
            <div className="space-y-4 pt-4 border-t border-slate-700">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Todellinen MFR (g/10min)</label>
                <input 
                  type="number" 
                  placeholder="Tyhjä = Ei korjausta"
                  value={userMfr}
                  onChange={(e) => setUserMfr(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-sm"
                />
              </div>

              <SliderInput label="Pesien määrä" val={cavities} setVal={setCavities} min={1} max={64} step={1} unit="kpl" />
              <SliderInput label="Varmuuskerroin" val={safetyFactor} setVal={setSafetyFactor} min={1.0} max={2.0} step={0.05} />
            </div>
          </div>

          {/* MAIN AREA */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* GEOMETRIA */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Osan Geometria
              </h2>

              {/* Tabs */}
              <div className="flex gap-1 bg-slate-900/50 p-1 rounded-lg mb-6 w-fit">
                {['rect', 'round', 'manual'].map(mode => (
                  <button 
                    key={mode}
                    onClick={() => setGeoMode(mode)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${geoMode === mode ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    {mode === 'rect' ? 'Suorakaide' : mode === 'round' ? 'Pyöreä' : 'Pinta-ala'}
                  </button>
                ))}
              </div>

              {geoMode === 'rect' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SliderInput label="Pituus" val={dims.length} setVal={(v) => setDims({...dims, length: v})} min={10} max={800} step={1} unit="mm" />
                  <SliderInput label="Leveys" val={dims.width} setVal={(v) => setDims({...dims, width: v})} min={10} max={800} step={1} unit="mm" />
                </div>
              )}
              {geoMode === 'round' && (
                <SliderInput label="Halkaisija" val={dims.diameter} setVal={(v) => setDims({...dims, diameter: v})} min={10} max={800} step={1} unit="mm" />
              )}
              {geoMode === 'manual' && (
                <div>
                   <label className="block text-sm text-gray-300 mb-1">Pinta-ala (cm²)</label>
                   <input 
                    type="number" 
                    value={dims.area || ''}
                    onChange={(e) => setDims({...dims, area: parseFloat(e.target.value)})}
                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-sm"
                   />
                </div>
              )}
            </div>

            {/* PROSESSI */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Prosessi & Säädöt
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <SliderInput label="Seinämävahvuus" val={wallThickness} setVal={setWallThickness} min={0.5} max={10.0} step={0.1} unit="mm" />
                <SliderInput label="Virtausmatka" val={flowLength} setVal={setFlowLength} min={10} max={1000} step={5} unit="mm" />
                
                <SliderInput label="Sulan lämpötila" val={userMeltTemp} setVal={setUserMeltTemp} min={150} max={450} step={5} unit="°C" />
                <SliderInput label="Muotin lämpötila" val={userMoldTemp} setVal={setUserMoldTemp} min={20} max={200} step={5} unit="°C" />
                
                <SliderInput label="Täyttönopeuskerroin" val={speedFactor} setVal={setSpeedFactor} min={0.5} max={3.0} step={0.1} unit="x" />
              </div>

              {/* Paineen syöttö */}
              <div className="mt-6 bg-slate-900/50 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 border border-slate-700">
                <div className="text-blue-300 font-medium">
                  Laskettu paine: <span className="text-white text-lg ml-2">{Math.round(results.pressure)} bar</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Tai syötä oma:</span>
                  <input 
                    type="number" 
                    placeholder="bar"
                    value={userPressure}
                    onChange={(e) => setUserPressure(e.target.value)}
                    className="w-24 bg-slate-700 border border-slate-600 rounded p-2 text-sm text-center"
                  />
                </div>
              </div>
            </div>

            {/* TULOKSET */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-600 shadow-2xl relative overflow-hidden">
              <h2 className="text-xl font-bold mb-6 text-center tracking-wider text-blue-100">LASKENTATULOKSET</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                    <span className="text-gray-400">Nopea arvio:</span>
                    <span className="text-2xl font-bold text-gray-500">{results.quick.toFixed(1)} t</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                    <span className="text-blue-200 font-bold">Tarkka laskelma:</span>
                    <div className="text-right">
                       <span className="text-4xl font-extrabold text-blue-400 block">{results.precise.toFixed(1)} t</span>
                       <span className="text-xs text-blue-300">({Math.round(results.pressure)} bar)</span>
                    </div>
                  </div>

                  {results.custom > 0 && (
                    <div className="flex justify-between items-center bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                      <span className="text-yellow-200 font-bold">Omalla paineella:</span>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-yellow-500 block">{results.custom.toFixed(1)} t</span>
                        <span className="text-xs text-yellow-300">
                          ({userPressure} bar)
                          {Number(userPressure) < results.pressure && " \u26A0 Matala?"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* INFO & VAROITUKSET */}
                <div className="bg-slate-950/50 p-4 rounded-lg space-y-3 text-sm h-full flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                     <Info className="w-4 h-4 text-blue-400" />
                     <span className="text-gray-300">L/T-suhde: <span className="text-white font-mono">{results.lt.toFixed(1)}</span></span>
                  </div>
                  {results.tempCorr !== 1.0 && (
                    <div className="text-gray-400 text-xs pl-6">
                      Lämpökorjaus: {Math.round((1 - results.tempCorr) * 100)}%
                    </div>
                  )}
                  {results.speedCorr !== 1.0 && (
                    <div className="text-gray-400 text-xs pl-6">
                      Nopeuslisä: +{Math.round((results.speedCorr - 1) * 100)}%
                    </div>
                  )}

                  {results.warning && (
                    <div className="mt-4 flex items-start gap-2 text-red-400 bg-red-900/20 p-2 rounded">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                      <span className="font-bold">VAROITUS: L/T-suhde &gt; 250 (Vaikea täyttää!)</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;