---
slug: ftms-treadmill
title: Treadmill Link
status: In progress
timeframe: "2026"
visibility: public
previewLabel: project preview
summary: A Garmin data field that reads pace, speed, distance, and incline straight from the treadmill over Bluetooth LE, built on a pure FTMS parser and an explicit connection state machine.
technologies:
  - Monkey C
  - Garmin Connect IQ
  - Bluetooth LE
  - FTMS
  - Zephyr
media:
  - type: image
    src: /images/projects/garmin-datafield-light.jpg
    darkSrc: /images/projects/garmin-datafield-dark.jpg
    alt: Data field in three states, picking a treadmill, live at 8:42 per mile, and no data
    label: Data field design
links:
  - label: View repository
    href: https://github.com/ryanmramos/ftms-treadmill
---

#### Overview

Treadmill Link is a Connect IQ data field for Garmin’s native Treadmill activity. It will connect directly to compatible treadmills using the Bluetooth Fitness Machine Service (FTMS) and surface data originating from the treadmill like pace, speed, connected-session distance, incline, and connection state.

I’m building this to make indoor running data more accurate by using treadmill measurements instead of relying entirely on Garmin’s pace assumptions. I also want to load a predetermined workout and eventually send commands to the treadmill so it can follow that workout. The project targets broad Garmin-watch support and aims to make the data more useful during and after a workout.

#### Technical notes

The implementation will be organized around a pure FTMS packet parser, an explicit Bluetooth connection state machine, and separate diagnostic and production watch apps. A Nordic nRF52840 dongle will provide a deterministic mock treadmill so parser, reconnection, and data-field behavior can be tested in a controlled environment before trying different treadmill hardware.

The next stages will focus on turning treadmill measurements into a clear, reliable experience across all Garmin watches possible.
