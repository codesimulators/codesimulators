// Building the document is now instant — proxies are cheap:
const images: Image[] = files.map(f => new ImageProxy(f));   // 0 decodes

doc.open();              // still 0 decodes — nothing on screen yet
images[0].display();     // decodes ONLY image 0, on first use ⏳
images[0].display();     // cached — no work ⚡

// Need auth too? Wrap again — same interface, stacked control:
//   new ProtectionProxy(user, new ImageProxy(f))
// RealImage and every caller stay exactly as they are.