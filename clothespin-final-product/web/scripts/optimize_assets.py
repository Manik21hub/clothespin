"""Optimize the iOS asset catalog images for the web build."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / "Clothespin" / "Clothespin" / "Assets.xcassets"
OUT = ROOT / "web" / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)

MAX_WIDTH = 900
QUALITY = 82


def convert(src: Path, dest: Path, max_width: int = MAX_WIDTH) -> None:
    with Image.open(src) as img:
        img = img.convert("RGB")
        if img.width > max_width:
            ratio = max_width / img.width
            img = img.resize((max_width, round(img.height * ratio)), Image.LANCZOS)
        img.save(dest, "WEBP", quality=QUALITY, method=6)
    print(f"{src.name} -> {dest.name} ({dest.stat().st_size // 1024} KB)")


for imageset in sorted(ASSETS.glob("img_*.imageset")):
    pngs = list(imageset.glob("*.png"))
    if not pngs:
        continue
    name = imageset.name.replace(".imageset", "")
    convert(pngs[0], OUT / f"{name}.webp")

convert(ASSETS / "ProfilePhoto.imageset" / "profile_picture.jpeg", OUT / "profile.webp", 500)

# Transparent marks stay PNG so they can sit on any background.
for src, dest in [
    (ASSETS / "Logo.imageset" / "wordmark_white.png", OUT / "wordmark_white.png"),
    (ASSETS / "PinIcon.imageset" / "pin.png", OUT / "pin.png"),
    (ASSETS / "AppIcon.appiconset" / "app-icon-white.png", OUT / "app-icon.png"),
]:
    if src.exists():
        with Image.open(src) as img:
            img.save(dest)
        print(f"{src.name} -> {dest.name}")

# Recolour the white wordmark so it can sit on the cream background too.
src = ASSETS / "Logo.imageset" / "wordmark_white.png"
if src.exists():
    with Image.open(src) as img:
        img = img.convert("RGBA")
        pixels = img.getdata()
        dark = (39, 54, 23)  # #273617
        img.putdata([(dark[0], dark[1], dark[2], a) for _, _, _, a in pixels])
        img.save(OUT / "wordmark_dark.png")
    print("wordmark_white.png -> wordmark_dark.png")
