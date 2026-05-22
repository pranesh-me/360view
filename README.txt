3D PRODUCT VIEWER PACKAGE
=========================

This package is a standalone luxury jewelry product viewer built with pure HTML, CSS, JavaScript, and Google Model Viewer.

Folder structure:

3d-product-viewer/
|-- index.html
|-- viewer.css
|-- viewer.js
|-- README.txt
|-- models/
|   `-- ring.glb
|-- hdr/
|   `-- studio.hdr
`-- poster/
    `-- preview.webp

Required assets:

1. The optimized test GLB is currently placed at:
   models/ring.glb

   The original 4096px texture version is preserved at:
   models/ring-original-4k.glb

2. A tiny neutral placeholder HDR is currently placed at:
   hdr/studio.hdr

   Replace it with a real studio HDR for premium metal and gemstone reflections.

3. The poster image is currently placed at:
   poster/preview.webp

How to run:

1. Open the 3d-product-viewer folder in VSCode.
2. Start VSCode Live Server from index.html.
3. Open the provided local URL in a browser.

Do not open index.html directly from the filesystem for production testing. Browser security rules can block model, HDR, or poster loading from file:// URLs.

Included features:

- Google Model Viewer CDN import from @google/model-viewer
- Full 360 degree rotation
- Zoom and touch gestures
- Auto rotate on/off control
- Fullscreen control
- Loading progress indicator
- Shadows and soft grounding
- HDR environment lighting
- Jewelry-friendly camera orbit and field-of-view settings
- Responsive premium dark luxury layout

Recommended production notes:

- Optimize ring.glb with Draco or mesh compression when possible.
- Keep poster/preview.webp lightweight for fast first paint.
- Use a high-quality studio HDR with bright highlight sources for stronger metal and gemstone reflections.
- Host all assets from the same domain or configure CORS correctly.
