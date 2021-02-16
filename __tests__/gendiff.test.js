import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedResult = readFile('expected_result.txt');

test('flat json and yaml', () => {
  const file1Json = JSON.parse(readFile('file1.json'));
  const file2Json = JSON.parse(readFile('file2.json'));
  expect(genDiff(file1Json, file2Json)).toEqual(expectedResult.trim());

  const file1Yaml = yaml.load(readFile('file1.yaml'));
  const file2Yaml = yaml.load(readFile('file2.yaml'));
  expect(genDiff(file1Yaml, file2Yaml)).toEqual(expectedResult.trim());
});
