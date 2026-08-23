## How the speed test / calculator works

This is the explaining, since the numbers aren't as simple as "download a
big file and time it.

1. Measuring the visitor's speed.: 
 The page downloads a fixed 2 MB file (`speed-test-file.bin`) and times it with `performance.now()`. It does this
three times and uses the middle (median) result rather than the average, so
one unusually slow or fast attempt doesn't skew the number. From the time and
the file size, it works out a speed in Mbps (`bits ÷ seconds ÷ 1,000,000`).

2. Turning that into a download-time estimate:
 The calculator doesn't actually download a 500 MB file. It takes the speed already measured (or the
Palestine/UAE benchmark speed) and works out how long a 500 MB file *would*
take at that same rate, using the basic relationship `time = size ÷ speed`.
Same formula, applied to a bigger, more relatable file size (like an app
update) instead of the small test file.
