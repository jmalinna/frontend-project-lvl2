#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../formatters/index.js';

commander
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2> [formatName]')
  .action((filepath1, filepath2, formatName) => {
    const diff = genDiff(filepath1, filepath2, formatName);
    console.log(diff);
  })
  .parse(process.argv);
