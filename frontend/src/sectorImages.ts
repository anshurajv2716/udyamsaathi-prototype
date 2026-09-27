import dairyImg from "./assets/sector-dairy.jpg";
import retailImg from "./assets/sector-retail.jpg";
import tailoringImg from "./assets/sector-tailoring.jpg";
import foodProcessingImg from "./assets/sector-food-processing.jpg";
import agriInputRetailImg from "./assets/sector-agri-input-retail.jpg";
import poultryImg from "./assets/sector-poultry.jpg";
// poultry and agri_input_retail images pending — add sector-poultry.jpg and
// sector-agri-input.jpg to this same folder once available, then add two
// more lines below following the same pattern.

export const SECTOR_IMAGES: Partial<Record<string, string>> = {
  dairy: dairyImg,
  retail: retailImg,
  tailoring: tailoringImg,
  food_processing: foodProcessingImg,
  agri_input_retail: agriInputRetailImg,
    poultry: poultryImg

};

// Returns undefined for sectors with no image yet — callers must handle
// that (SectorCard falls back to the original text-only header) rather
// than assuming every sector has a photo.
export function getSectorImage(sector: string): string | undefined {
  return SECTOR_IMAGES[sector];
}