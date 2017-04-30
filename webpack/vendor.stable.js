/**
 * Created by liu on 17-4-30.
 */
const vendors = [
    'react',
    'react-dom',
    'jquery',
    'bootstrap-loader',
    'font-awesome-webpack',
];
const generator = require('./vendor.generate');
module.exports = generator.generate('stable', vendors);
