import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import genDiff from '../src/formatters/index.js';
import formatData from '../src/formatters/stylish.js';
import makePlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedResult = readFile('expected_result.txt');
const expectedResultDeep = readFile('expected_result_deep.txt');
const expectedResultPlain = readFile('expected_result_plain.txt');

test('flat json and yaml', () => {
  const file1Json = JSON.parse(readFile('file1.json'));
  const file2Json = JSON.parse(readFile('file2.json'));
  const diffJson = genDiff(file1Json, file2Json);
  expect(formatData(diffJson)).toEqual(expectedResult.trim());

  const file1Yaml = yaml.load(readFile('file1.yaml'));
  const file2Yaml = yaml.load(readFile('file2.yaml'));
  const diffYaml = genDiff(file1Yaml, file2Yaml);
  expect(formatData(diffYaml)).toEqual(expectedResult.trim());
});

test('deep json', () => {
  const file1JsonDeep = JSON.parse(readFile('file1Deep.json'));
  const file2JsonDeep = JSON.parse(readFile('file2Deep.json'));
  const diff = genDiff(file1JsonDeep, file2JsonDeep);
  expect(formatData(diff)).toEqual(expectedResultDeep.trim());
});

test('plain json', () => {
  const file1JsonDeep = JSON.parse(readFile('file1Deep.json'));
  const file2JsonDeep = JSON.parse(readFile('file2Deep.json'));
  const diff = genDiff(file1JsonDeep, file2JsonDeep);
  expect(makePlain(diff)).toEqual(expectedResultPlain.trim());
});
