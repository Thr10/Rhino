from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from PIL import Image


COPY_SUFFIXES = {".atlas", ".json"}
IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg", ".webp", ".avif"}


def convert_image(source: Path, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as image:
        image.save(target.with_suffix(".png"), "PNG")


def copy_or_convert_file(source: Path, source_root: Path, target_root: Path) -> None:
    relative_path = source.relative_to(source_root)
    target = target_root / relative_path
    suffix = source.suffix.lower()

    if suffix in IMAGE_SUFFIXES:
        convert_image(source, target)
        return

    if suffix == ".bin":
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        shutil.copy2(source, target.with_suffix(".skel"))
        return

    if suffix in COPY_SUFFIXES:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)


def convert_folder(source_root: Path, target_root: Path) -> None:
    for source in source_root.rglob("*"):
        if source.is_file():
            copy_or_convert_file(source, source_root, target_root)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Convert Spine texture folders to Cocos-friendly PNG textures.",
    )
    parser.add_argument("source", type=Path, help="Source Spine folder")
    parser.add_argument("target", type=Path, help="Target folder")
    args = parser.parse_args()

    convert_folder(args.source, args.target)
    print(f"Converted {args.source} -> {args.target}")


if __name__ == "__main__":
    main()
