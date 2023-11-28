# Adobe InDesign place multipage print scan

This repo contains a simple utility to place the scan of an unstitched saddle stich type print into a InDesign document.

The script expects the PDF to have the following format:

![Visualization of an input PDF with 4 pages](/example/pdf-example_in.png)

The example shows a visualization of a PDF with 4 pages, i.e. the scan of 2 sheets containing 8 pages in total.
This is achieved by unstitching the source material and scanning the front and back side of each sheet of paper.

The InDesign document is expected to have the correct dimensions. Each page should fit one page of the source material.
(Example: A DIN A3 PDF with 4 pages results in a DIN A4 document with 8 pages.)

After running the script, the InDesign document will have the following format:

![Visualization of an output document](/example/pdf-example_out.png)
