#!/bin/bash

baseUrl="https://docs.google.com/forms/d/e"

## -- Exempelform -- ##
formId="1FAIpQLScTm5KoP2kXT1wh5mtM3DI4S84NzGfCh_NkO69MKzqWlwkMUg"

contactParam="entry.1349343839"
mailParam="entry.1662488425"
placeParam="entry.570129751"
yearParam="entry.1026295849_year"
monthParam="entry.1026295849_month"
dayParam="entry.1026295849_day"
hourParam="entry.1026295849_hour"
minParam="entry.1026295849_minute"

contactAnswer="micek"
mailAnswer="micek@hotmail.com"
placeAnswer="Nånstans"
yearAnswer="2020"
monthAnswer="12"
dayAnswer="23"
hourAnswer="13"
minAnswer="37"

## -- Panoply-form -- ##

# formId="1NtQk-lAuL8Eh4UjLNLOfAnxoT9NpVxz24FW_iUCtreg"

# contactParam="entry.1085999444"
# mailParam="entry.1146311830"
# placeParam="entry.749042839"
# yearParam="entry.1762746159_year"
# monthParam="entry.1762746159_month"
# dayParam="entry.1762746159_day"
# hourParam="entry.1762746159_hour"
# minParam="entry.1762746159_minute"

# contactAnswer="Mikael"
# mailAnswer="micek@hotmail.com"
# yearAnswer="2012"
# placeAnswer="månen"
# monthAnswer="12"
# dayAnswer="12"
# hourAnswer="13"
# minAnswer="37"


## -- Composition -- ##
contact="$contactParam=$contactAnswer"
mail="$mailParam=$mailAnswer"
place="$placeParam=$placeAnswer"
year="$yearParam=$yearAnswer"
month="$monthParam=$monthAnswer"
day="$dayParam=$dayAnswer"
hour="$hourParam=$hourAnswer"
min="$minParam=$minAnswer"

curl -X POST -H "Content-Type:application/x-www-form-urlencoded" "$baseUrl/$formId/formResponse?$contact&$mail&&place&$year&$month&$day&$hour&$min"
