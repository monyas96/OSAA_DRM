"""
OSAA DRM Application Package
Path resolution for imports and file access
"""
import sys
from pathlib import Path

# Add root directory and scripts to path for imports
root_dir = Path(__file__).resolve().parent.parent
scripts_dir = root_dir / "scripts"

if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))
if str(scripts_dir) not in sys.path:
    sys.path.insert(0, str(scripts_dir))
