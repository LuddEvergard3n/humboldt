/** Converts the official IBGE 1:5,000,000 biome shapefile into audited GeoJSON. */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [shpArgument, dbfArgument, outputArgument] = process.argv.slice(2);
if (!shpArgument || !dbfArgument) {
  throw new Error('Usage: node tools/import-ibge-biomes.mjs <file.shp> <file.dbf> [output.geojson]');
}

const output = resolve(outputArgument || 'tools/cartography-source/ibge-biomes-5000.geojson');
const [shp, dbf] = await Promise.all([readFile(resolve(shpArgument)), readFile(resolve(dbfArgument))]);

/** Reads fixed-width DBF records without adding a conversion dependency. */
function readDbf(buffer) {
  const recordCount = buffer.readUInt32LE(4);
  const headerLength = buffer.readUInt16LE(8);
  const recordLength = buffer.readUInt16LE(10);
  const fields = [];
  for (let offset = 32; buffer[offset] !== 0x0d; offset += 32) {
    fields.push({
      name: buffer.subarray(offset, offset + 11).toString('ascii').replace(/\0.*$/, ''),
      length: buffer[offset + 16],
    });
  }
  return Array.from({ length: recordCount }, (_, index) => {
    let offset = headerLength + index * recordLength + 1;
    const row = {};
    for (const field of fields) {
      row[field.name] = buffer.subarray(offset, offset + field.length).toString('latin1').trim();
      offset += field.length;
    }
    return row;
  });
}

/** Reads polygon records from an ESRI shapefile. Rings stay grouped per biome. */
function readShp(buffer) {
  if (buffer.readInt32BE(0) !== 9994 || buffer.readInt32LE(28) !== 1000) {
    throw new Error('Unsupported or invalid shapefile header.');
  }
  const geometries = [];
  for (let offset = 100; offset < buffer.length;) {
    const contentBytes = buffer.readInt32BE(offset + 4) * 2;
    const start = offset + 8;
    const shapeType = buffer.readInt32LE(start);
    if (shapeType === 0) geometries.push(null);
    else if (shapeType === 5) {
      const partCount = buffer.readInt32LE(start + 36);
      const pointCount = buffer.readInt32LE(start + 40);
      const partOffset = start + 44;
      const pointOffset = partOffset + partCount * 4;
      const starts = Array.from({ length: partCount }, (_, index) => buffer.readInt32LE(partOffset + index * 4));
      const points = Array.from({ length: pointCount }, (_, index) => [
        buffer.readDoubleLE(pointOffset + index * 16),
        buffer.readDoubleLE(pointOffset + index * 16 + 8),
      ]);
      const rings = starts.map((ringStart, index) => points.slice(ringStart, starts[index + 1] ?? pointCount));
      geometries.push({ type: 'Polygon', coordinates: rings });
    } else throw new Error(`Unsupported shape type ${shapeType}; expected Polygon (5).`);
    offset = start + contentBytes;
  }
  return geometries;
}

const rows = readDbf(dbf);
const geometries = readShp(shp);
if (rows.length !== geometries.length) throw new Error('SHP and DBF record counts differ.');

const features = rows.map((row, index) => ({
  type: 'Feature',
  properties: { code: row.COD_BIOMA, name: row.NOM_BIOMA },
  geometry: geometries[index],
}));
const required = ['Amazônia', 'Mata Atlântica', 'Cerrado', 'Caatinga', 'Pantanal', 'Pampa'];
for (const name of required) {
  if (!features.some(feature => feature.properties.name === name)) throw new Error(`Required biome missing: ${name}`);
}

const collection = {
  type: 'FeatureCollection',
  metadata: {
    source: 'IBGE, Biomas do Brasil 1:5.000.000',
    sourceUrl: 'https://geoftp.ibge.gov.br/informacoes_ambientais/estudos_ambientais/biomas/vetores/Biomas_5000mil.zip',
    sourceFile: 'Biomas_5000mil.zip',
    referenceSystem: 'SIRGAS 2000',
    imported: '2026-10-10',
  },
  features,
};
await writeFile(output, `${JSON.stringify(collection)}\n`, 'utf8');
console.log(`Imported ${features.length} IBGE biome and water features to ${output}.`);
