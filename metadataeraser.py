import os
from PIL import Image

# Path to your top-level photos folder
PHOTOS_DIR = r"C:\Users\Fila\Desktop\cernyfi.github.io\src\photos"

# Supported image extensions
IMAGE_EXTENSIONS = (
    ".jpg", ".jpeg", ".png", ".webp", 
    ".tiff", ".tif", ".bmp", ".heic"
)

def strip_metadata(file_path):
    try:
        # Open image
        with Image.open(file_path) as img:
            # Create a fresh copy of image data in memory WITHOUT metadata/EXIF
            data = list(img.getdata())
            clean_img = Image.new(img.mode, img.size)
            clean_img.putdata(data)
            
            # Preserve original image format (JPEG, PNG, etc.)
            img_format = img.format if img.format else "JPEG"

        # Overwrite original file safely outside the 'with' block 
        # (This avoids WinError 32 file-lock issues!)
        clean_img.save(file_path, format=img_format, quality=95)
        print(f"Cleaned: {file_path}")
        return True

    except Exception as e:
        print(f"Failed to process {file_path}: {e}")
        return False

def process_all_photos(root_folder):
    if not os.path.exists(root_folder):
        print(f"Directory not found: {root_folder}")
        return

    count = 0
    print(f"Starting metadata cleanup in: {root_folder}\n" + "-" * 50)
    
    # Recursively walk through all folders and subfolders
    for folder_path, _, filenames in os.walk(root_folder):
        for filename in filenames:
            if filename.lower().endswith(IMAGE_EXTENSIONS):
                full_path = os.path.join(folder_path, filename)
                if strip_metadata(full_path):
                    count += 1

    print("-" * 50)
    print(f"Done! Cleaned metadata from {count} image(s).")

if __name__ == "__main__":
    process_all_photos(PHOTOS_DIR)