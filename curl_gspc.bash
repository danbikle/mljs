#!/bin/bash

# curl_gspc.bash

# This script should get GSPC prices.

/usr/bin/curl http://ml4.herokuapp.com/csv/GSPC.csv > gspc.csv

# I should extract two columns and also sort:
echo cdate,cp                                          > gspc2.csv
sort gspc.csv|awk -F, '{print $1"," $5}'|grep -v Date >> gspc2.csv

exit
