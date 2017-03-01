#!/bin/sh
if [ "$1" ]; then
	for page in "$@"; do
		curl "https://mw.lojban.org/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&format=json&titles=$page" | (
			which nodejs && nodejs import.js /dev/stdin || node import.js /dev/stdin
		) || echo "Failed: $page" 1>&2
	done
else
	echo "ko mi dunda lo ka su papri cmene ce sumti"
fi
