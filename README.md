jsonify-ot-contract
===================

This script preprocesses an Open Transactions contract, removing the header and
footer metadata, then converting the XML contract body to JSON.

It is out of scope of this project to re-convert a JSON object back to XML and
add the metadata back in. Unless you can figure out where all the whitespace
goes, the contract's signature will fail to verify. 

Thus you should probably only use this for displaying parts of the contract in a
browser.

Usage
-----

    $ git clone https://github.com/plato-cambrian/jsonify-ot-contract.git; cd jsonify-ot-contract
    $ npm install
    $ node jsonifyContract crappy-beer-contract.otc > crappy-beer-contract.json
