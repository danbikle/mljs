#!/bin/bash

# curl_gspc.bash

# This script should copy GSPC prices from yahoo into gspc2.csv

/usr/bin/curl http://ichart.finance.yahoo.com/table.csv?s=%5EGSPC > gspc.csv
# I should extract two columns and also sort:
echo cdate,cp                                                     > gspc2.csv
sort gspc.csv|awk -F, '{print $1"," $5}'|grep -v Date            >> gspc2.csv

exit
