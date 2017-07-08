#!/bin/bash

# ~/mljs/night.bash

# I should run this script at 8pm Calif-time.
# Demo:
# ./night.bash

# This script should generate some static content each night
# after the market has closed and the most recent GSPC-closing-price
# is available from Yahoo.

# The static content should help me judge feasibility of keras-js for
# predicting GSPC daily direction.

# If you have questions, e-me: bikle101@gmail.com

# I should cd to the right place:

cd `dirname $0`

# I should get prices:
./curl_gspc.bash

# I should compute features from the prices (and dates):
python genf.py SLOPES='[2,3,4,5,6,7,8,9]'
# The above call should give me feat.csv

# I should learn, test, and report:
./keras_tensorflow.bash learn_tst_rpt.py TRAINSIZE=25 TESTYEAR=2017

exit
