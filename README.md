angular-mask-money
==================

A simple angular directive wrapper for jquery.maskMoney.js (https://github.com/plentz/jquery-maskmoney)

###View index.html to see it in action

the view value now gets unmasked, so if your input element is displaying '$1,000,000.00', your angular model will be 1000000.00


Supports using an options object as well as inline attributes.

You can pass mm-options="optionsObject" or prefix="prefixString" or prefix="'$'".

Inline attributes trump an options object.

Currently, the options object supports immediate update, inline attributes do not, will do that soon