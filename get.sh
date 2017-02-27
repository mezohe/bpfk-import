#!/bin/sh
if [ "$1" ]; then
	for page in "$@"; do
		curl "https://mw.lojban.org/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&format=json&titles=$page" | (
			which nodejs && nodejs import.js /dev/stdin || node import.js /dev/stdin
		)
	done
else
	echo "ko mi dunda su papri cmene"
fi
