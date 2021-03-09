import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1Stylish = readFile('file1_after_stylish.txt');
const file2Plain = readFile('file2_after_plain.txt');
const file3Stylish = readFile('file3_after_stylish.txt');
const file4Json = readFile('file4_after_json.txt');

const file1Json = getFixturePath('file1_before.json');
const file2Json = getFixturePath('file2_before.json');
const file2Yaml = getFixturePath('file2_before.yaml');

test('stylish with json', () => {
  const diff = genDiff(file1Json, file2Json);
  expect(diff).toEqual(file1Stylish.trim());
});

test('stylish with json and yaml', () => {
  const diff = genDiff(file1Json, file2Yaml);
  expect(diff).toEqual(file3Stylish.trim());
});

test('plain', () => {
  const diff = genDiff(file1Json, file2Json, 'plain');
  expect(diff).toEqual(file2Plain.trim());
});

test('json', () => {
  const diff = genDiff(file1Json, file2Json, 'json');
  expect(diff).toEqual(file4Json.trim());
});
