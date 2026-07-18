#!/usr/bin/env python3
"""
extract_logo.py

Uso: python assets/scripts/extract_logo.py /caminho/para/Gemini_Generated_Image_.png

O script gera:
- assets/images/logo-duarte-jr.png (quadrante inferior direito)
- assets/images/logo-duarte-jr-footer.png (mesma imagem redimensionada)
- assets/images/hero/hero-duarte-jr.jpg (quadrante superior esquerdo)

Requer: Pillow (pip install pillow)
"""
import sys
from PIL import Image
import os

def main():
    if len(sys.argv) < 2:
        print('Uso: python extract_logo.py /caminho/para/Gemini_Generated_Image_.png')
        return
    src = sys.argv[1]
    img = Image.open(src)
    w,h = img.size
    # quadrante superior esquerdo
    hero_box = (0,0, w//2, h//2)
    hero = img.crop(hero_box)
    os.makedirs('assets/images/hero', exist_ok=True)
    hero = hero.resize((1920,700), Image.LANCZOS)
    hero.save('assets/images/hero/hero-duarte-jr.jpg', quality=85)

    # quadrante inferior direito (logo)
    logo_box = (w//2, h//2, w, h)
    logo = img.crop(logo_box)
    os.makedirs('assets/images', exist_ok=True)
    logo.save('assets/images/logo-duarte-jr.png', quality=90)

    # footer version
    footer = logo.copy()
    fw = 320
    fh = int(logo.height * (fw / logo.width))
    footer = footer.resize((fw, fh), Image.LANCZOS)
    footer.save('assets/images/logo-duarte-jr-footer.png', quality=90)

    print('Gerado: assets/images/hero/hero-duarte-jr.jpg, assets/images/logo-duarte-jr.png, assets/images/logo-duarte-jr-footer.png')

if __name__ == '__main__':
    main()
