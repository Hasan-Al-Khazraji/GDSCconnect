#!/usr/bin/env python3
"""
csv_to_badges.py
Read GDSC Qr Codes - Sheet1.csv and make one badge PNG per row,
placing ONLY the QR code into GDSC_HACKS_NAMETAG_QR.png.
"""

import csv, os, re
from pathlib import Path
from PIL import Image
import qrcode

# ─── CONFIG ────────────────────────────────────────────────────────────────
CSV_FILE  = "GDSCQrCodes-Sheet1.csv"       # path to your CSV
TEMPLATE  = "GDSC_HACKS_NAMETAG_QR.png"        # the template PNG (648×864)
OUT_DIR   = Path("badges")                     # where finished badges go

# coordinates (l, t, r, b) of the white QR rectangle on the template
QR_FRAME  = (182+20, 470+20, 182+274-20, 470+184-20)

URL_COL   = "Website"      # column header in the CSV
# ───────────────────────────────────────────────────────────────────────────


def make_qr(url: str, box):
    """Return a PIL Image of the QR scaled to fit `box` exactly."""
    side = min(box[2] - box[0], box[3] - box[1])
    qr   = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_Q)
    qr.add_data(url)
    qr.make(fit=True)
    img  = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    return img.resize((side, side), Image.LANCZOS)


def main():
    OUT_DIR.mkdir(exist_ok=True)
    template = Image.open(TEMPLATE)

    with open(CSV_FILE, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for idx, row in enumerate(reader, 1):
            url = row.get(URL_COL, "").strip()
            if not url:
                print(f"⏭️  Row {idx}: no URL, skipped")
                continue

            badge = template.copy()

            # Create & paste QR
            qr_img = make_qr(url, QR_FRAME)
            x = QR_FRAME[0] + (QR_FRAME[2] - QR_FRAME[0] - qr_img.width)  // 2
            y = QR_FRAME[1] + (QR_FRAME[3] - QR_FRAME[1] - qr_img.height) // 2
            badge.paste(qr_img, (x, y))

            # Nice deterministic filename
            slug = re.sub(r"[^\w\-]+", "_", url.rsplit("/", 1)[-1]) or f"{idx:03}"
            out  = OUT_DIR / f"badge_{slug}.png"
            badge.save(out)
            print("✅", out)

    print("\nAll done!  Find your badges in", OUT_DIR.resolve())


if __name__ == "__main__":
    main()
