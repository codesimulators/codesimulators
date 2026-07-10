// Building the document is now instant — proxies are cheap:
std::vector<std::unique_ptr<Image>> images;
for (auto& f : files) images.push_back(std::make_unique<ImageProxy>(f)); // 0 decodes

doc.open();              // still 0 decodes
images[0]->display();    // decodes ONLY image 0, on first use
images[0]->display();    // cached — no work