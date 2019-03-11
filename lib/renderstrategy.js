// core composition
import { RasterManager } from './rastermanager';
// rendering platforms
import { DOMRaster } from './rasters/dom';
import { WKRaster } from './rasters/wkwebview';
import { NoDOM } from './rasters/nodom';

// detecting rendering bridge
if (
  typeof window !== 'undefined' &&
  (window.SyrBridge || (window.webkit && window.webkit.messageHandlers))
) {
  RasterManager.setRaster(WKRaster);
} else {
  if (typeof window == 'undefined' && !global.document) {
    RasterManager.setRaster(NoDOM);
  } else {
    RasterManager.setRaster(DOMRaster);
  }
}