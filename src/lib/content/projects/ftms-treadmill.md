---
slug: ftms-treadmill
title: Garmin FTMS Treadmill
status: In progress
timeframe: "2026"
visibility: public
previewLabel: project preview
summary: A Garmin Connect IQ data field that brings treadmill metrics to the watch over Bluetooth Low Energy.
contribution: Designing a pure FTMS parser and Bluetooth connection state machine with a deterministic mock treadmill.
technologies:
  - Monkey C
  - Garmin Connect IQ
  - Bluetooth LE
  - FTMS
  - Zephyr
media:
  - type: image
    src: /images/projects/garmin-treadmill.jpg
    alt: Garmin smartwatch displaying a treadmill running activity
    label: Garmin treadmill running preview
links:
  - label: View repository
    href: https://github.com/ryanmramos/ftms-treadmill
---

#### Overview

Garmin FTMS Treadmill is a Connect IQ data field for Garmin’s native Treadmill activity. It will connect directly to compatible treadmills using the Bluetooth Fitness Machine Service (FTMS) and surface data originating from the treadmill like pace, speed, connected-session distance, incline, and connection state.

I’m building this to make indoor running data more accurate by using treadmill measurements instead of relying entirely on Garmin’s pace assumptions. I also want to load a predetermined workout and eventually send commands to the treadmill so it can follow that workout. The project targets broad Garmin-watch support and aims to make the data more useful during and after a workout.

#### Technical notes

The implementation will be organized around a pure FTMS packet parser, an explicit Bluetooth connection state machine, and separate diagnostic and production watch apps. A Nordic nRF52840 dongle will provide a deterministic mock treadmill so parser, reconnection, and data-field behavior can be tested in a controlled environment before trying different treadmill hardware.

The next stages will focus on turning treadmill measurements into a clear, reliable experience across all Garmin watches possible.
