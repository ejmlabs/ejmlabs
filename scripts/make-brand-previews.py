from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'design-kit'
X = ROOT / 'x-kit'
PAPER = '#F6F5EF'
FOREST = '#29443B'
INK = '#202721'


def font(size, weight=400):
    face = ImageFont.truetype(str(KIT / 'fonts/Manrope-Variable.ttf'), size)
    face.set_variation_by_axes([weight])
    return face


def place(canvas, file, x, y, width, height):
    image = Image.open(file).convert('RGBA')
    image = ImageOps.contain(image, (width, height), Image.Resampling.LANCZOS)
    canvas.paste(image, (x, y), image)


def circle_avatar(canvas, size, x, y):
    avatar = Image.open(X / 'avatars/sage-1024.png').convert('RGB').resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new('L', (size, size))
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    draw = ImageDraw.Draw(canvas)
    draw.ellipse((x - 7, y - 7, x + size + 7, y + size + 7), fill=PAPER)
    canvas.paste(avatar, (x, y), mask)


def profile_previews():
    target = X / 'previews'
    target.mkdir(exist_ok=True)
    desktop = Image.new('RGB', (1500, 1080), PAPER)
    place(desktop, X / 'UPLOAD-header.png', 0, 0, 1500, 500)
    circle_avatar(desktop, 250, 72, 390)
    draw = ImageDraw.Draw(desktop)
    draw.text((72, 684), 'ejmlabs', font=font(52, 600), fill=INK)
    draw.text((72, 762), '@ejmlabs', font=font(30), fill=FOREST)
    bio = 'An independent studio for small experiments, useful software, and open source tools.'
    for i, line in enumerate(textwrap.wrap(bio, 80)):
        draw.text((72, 836 + 44 * i), line, font=font(30), fill=INK)
    draw.text((72, 955), 'ejmlabs.com', font=font(28, 600), fill=FOREST)
    draw.text((72, 1030), 'Profile mockup. Suggested handle; availability has not been checked.', font=font(18), fill=FOREST)
    desktop.save(target / 'profile-desktop.png', optimize=True)

    mobile = Image.new('RGB', (390, 480), PAPER)
    place(mobile, X / 'UPLOAD-header.png', 0, 0, 390, 130)
    circle_avatar(mobile, 94, 20, 84)
    draw = ImageDraw.Draw(mobile)
    draw.text((20, 207), 'ejmlabs', font=font(27, 600), fill=INK)
    draw.text((20, 247), '@ejmlabs', font=font(16), fill=FOREST)
    for i, line in enumerate(textwrap.wrap(bio, 39)):
        draw.text((20, 290 + 26 * i), line, font=font(16), fill=INK)
    draw.text((20, 392), 'ejmlabs.com', font=font(16, 600), fill=FOREST)
    draw.text((20, 444), 'Profile mockup. Handle availability unverified.', font=font(11), fill=FOREST)
    mobile.save(target / 'profile-mobile.png', optimize=True)


def extension_overview():
    canvas = Image.new('RGB', (1800, 1730), PAPER)
    draw = ImageDraw.Draw(canvas)
    place(canvas, KIT / 'logos/ejmlabs-primary.png', 56, 54, 228, 45)
    draw.text((355, 52), 'Brand building blocks', font=font(34, 600), fill=INK)
    draw.text((1458, 66), 'Version 1.1.0', font=font(18), fill=FOREST)
    draw.text((56, 134), 'Four motif families', font=font(24, 600), fill=INK)
    families = [('signature-crop', 'Signature crop'), ('echo', 'Echo'), ('flow', 'Flow'), ('orbit', 'Orbit')]
    for row, theme in enumerate(['forest', 'paper']):
        for column, (key, label) in enumerate(families):
            x = 56 + column * 428
            y = 185 + row * 286
            place(canvas, KIT / f'motifs/{key}-{theme}.png', x, y, 404, 227)
            draw.text((x, y + 243), f'{label} / {theme.capitalize()}', font=font(18), fill=FOREST)
    draw.text((56, 794), 'Signature lockups', font=font(24, 600), fill=INK)
    for i, theme in enumerate(['forest', 'paper']):
        x = 56 + i * 856
        place(canvas, KIT / f'lockups/signature-{theme}.png', x, 840, 832, 347)
        draw.text((x, 1202), theme.capitalize(), font=font(18), fill=FOREST)
    draw.text((56, 1280), 'Project and post templates', font=font(24, 600), fill=INK)
    for i, (key, label) in enumerate([('project-forest', 'Project announcement'), ('quote-paper', 'Signature post'), ('image-frame', 'Image frame')]):
        x = 56 + i * 571
        place(canvas, KIT / f'templates/{key}.png', x, 1328, 547, 308)
        draw.text((x, 1652), label, font=font(18), fill=FOREST)
    canvas.save(KIT / 'preview-extensions.png', optimize=True)


profile_previews()
extension_overview()
print('Built desktop/mobile X previews and the brand extension overview.')
