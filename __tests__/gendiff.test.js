import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import createTree from '../src/formatters/tree.js';
import makeStylish from '../src/formatters/stylish.js';
import makePlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedResultNested = readFile('expected_result_nested.txt');
const expectedResultPlain = readFile('expected_result_plain.txt');
const expectedResultYamlArray = readFile('expected_result_yaml.txt');
const expectedResult2Yamls = readFile('expected_result_yaml2.txt');

const file1Json = JSON.parse(readFile('nested_1.json'));
const file2Json = JSON.parse(readFile('nested_2.json'));
const file2Yaml = yaml.load(readFile('nested_array_1.yaml'));

test('nested json', () => {
  const tree = createTree(file1Json, file2Json);
  expect(makeStylish(tree)).toEqual(expectedResultNested.trim());
});

test('nested json and yaml', () => {
  const nestedYaml = yaml.load(readFile('nested_2.yaml'));
  const tree = createTree(file1Json, nestedYaml);
  expect(makeStylish(tree)).toEqual(expectedResultNested.trim());
});

test('plain json', () => {
  const tree = createTree(file1Json, file2Json);
  expect(makePlain(tree)).toEqual(expectedResultPlain.trim());
});

test('nested json and yaml with array', () => {
  const tree = createTree(file1Json, file2Yaml);
  expect(makeStylish(tree)).toEqual(expectedResultYamlArray.trim());
});

test('nested yamls with arrays', () => {
  const file1YamlDeep1 = yaml.load(readFile('nested_array_2.yaml'));
  const tree = createTree(file1YamlDeep1, file2Yaml);
  expect(makeStylish(tree)).toEqual(expectedResult2Yamls.trim());
});
