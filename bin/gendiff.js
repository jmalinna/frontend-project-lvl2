#!/usr/bin/env node
import commander from 'commander';
import buildPathAndParse from '../src/parsers.js';
import genDiff from '../src/index.js';

commander
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const parsedPath1 = buildPathAndParse(filepath1);
    const parsedPath2 = buildPathAndParse(filepath2);
    const diff = genDiff(parsedPath1, parsedPath2);
    console.log(diff);
  })
  .parse(process.argv);
