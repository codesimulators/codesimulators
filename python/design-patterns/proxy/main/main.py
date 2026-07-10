# Building the document is now instant — proxies are cheap:
images = [ImageProxy(f) for f in files]   # 0 decodes

doc.open()              # still 0 decodes
images[0].display()     # decodes ONLY image 0, on first use
images[0].display()     # cached — no work

# Need auth too? Wrap again: ProtectionProxy(user, ImageProxy(f))