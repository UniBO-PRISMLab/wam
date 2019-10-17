#!/usr/bin/env node
import * as chalk from 'chalk';
import * as commander from 'commander'
import * as npm from 'npm';

npm.load({},() => {
        npm.commands.init([], () => {});
})



