// Building the document is now instant — proxies are cheap:
images := make([]Image, len(files))
for i, f := range files { images[i] = &ImageProxy{file: f} } // 0 decodes

doc.Open()              // still 0 decodes
images[0].Display()     // decodes ONLY image 0, on first use
images[0].Display()     // cached — no work