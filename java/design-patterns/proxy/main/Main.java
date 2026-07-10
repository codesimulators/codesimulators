// Building the document is now instant — proxies are cheap:
List<Image> images = files.stream().map(ImageProxy::new).toList(); // 0 decodes

doc.open();              // still 0 decodes
images.get(0).display(); // decodes ONLY image 0, on first use
images.get(0).display(); // cached — no work

// Need auth too? Wrap again: new ProtectionProxy(user, new ImageProxy(f))