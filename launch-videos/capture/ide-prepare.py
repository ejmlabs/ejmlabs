#!/usr/bin/env python3
"""Prepare a disposable native IDE capture build from its recorded revision."""
from pathlib import Path
import hashlib
import io
import json
import subprocess
import tarfile

ROOT = Path('/private/tmp/ejm-ide-launch-film-20261019')
SOURCE = Path('/Users/everettmorgan/Desktop/ejm-ide')
REVISION = 'bde96726270afe16777a3ae6461064367ce4d204'

if ROOT.exists():
    raise SystemExit(f'Refusing to replace existing capture: {ROOT}')
ROOT.mkdir()
archive = subprocess.check_output(['git', 'archive', REVISION], cwd=SOURCE)
with tarfile.open(fileobj=io.BytesIO(archive)) as bundle:
    bundle.extractall(ROOT / 'ejm-ide', filter='data')
(ROOT / 'ejm-ui').symlink_to('/Users/everettmorgan/Desktop/ejm-ui')
(ROOT / 'ejm-harness').symlink_to('/private/tmp/ejm-ide-native-session-20261019/ejm-harness')
(ROOT / 'ejm-ide/node_modules').symlink_to('/Users/everettmorgan/Desktop/ejm-ide/node_modules')
for folder in ['home', 'evidence', 'harbor']:
    (ROOT / folder).mkdir()
harbor_archive = subprocess.check_output(['git', 'archive', REVISION, 'examples/harbor'], cwd=SOURCE)
with tarfile.open(fileobj=io.BytesIO(harbor_archive)) as bundle:
    for member in bundle.getmembers():
        if member.name.rstrip('/') == 'examples':
            continue
        relative = Path(member.name).relative_to('examples/harbor')
        member.name = str(relative)
        if member.name != '.':
            bundle.extract(member, ROOT / 'harbor', filter='data')
subprocess.run(['git', 'init', '-q'], cwd=ROOT / 'harbor', check=True)
subprocess.run(['git', 'add', '.'], cwd=ROOT / 'harbor', check=True)
subprocess.run(['git', '-c', 'user.name=ejmlabs capture', '-c', 'user.email=capture@example.invalid', 'commit', '-qm', 'Capture fixture'], cwd=ROOT / 'harbor', check=True)

lib = ROOT / 'ejm-ide/src-tauri/src/lib.rs'
original = lib.read_text()
old = '''            tauri::WebviewWindowBuilder::from_config(app, &config)?
                .initialization_script(&script)
                .build()?;'''
replacement = '''            let capture_root = std::env::var_os("EJM_IDE_CAPTURE_ROOT").map(std::path::PathBuf::from);
            let capture_script = r#"
                localStorage.setItem('ejm-ide.theme', 'dark');
                localStorage.setItem('ejm-ide.fontSize', '16');
                localStorage.setItem('ejm-ide.inlineEnabled', 'false');
                localStorage.setItem('ejm-ide.agent.provider', 'capture-replay');
                localStorage.setItem('ejm-ide.agent.selection.capture-replay', JSON.stringify({model:'capture-replay',effort:''}));
            "#;
            if let Some(root) = &capture_root {
                let home = std::path::PathBuf::from(std::env::var_os("HOME").ok_or("Missing isolated HOME")?);
                let config_dir = app.path().app_config_dir()?;
                let data_dir = app.path().app_data_dir()?;
                if !config_dir.starts_with(&home) || !data_dir.starts_with(&home) {
                    return Err("Capture app paths escaped isolated HOME".into());
                }
                std::fs::create_dir_all(&config_dir)?;
                let provider = serde_json::json!([{
                    "id":"capture-replay", "name":"Local capture replay", "protocol":"openaiCompatible",
                    "endpoint":"http://127.0.0.1:18787/v1/", "models":["capture-replay"],
                    "reasoning":"none", "maxOutputTokens":4096, "apiKeyEnv":"EJM_IDE_CAPTURE_TOKEN"
                }]);
                std::fs::write(config_dir.join("providers.json"), serde_json::to_vec_pretty(&provider)?)?;
                app.state::<workspace::WorkspaceState>().open_folder(&root.join("harbor"))?;
            }
            let window = tauri::WebviewWindowBuilder::from_config(app, &config)?
                .initialization_script(&script)
                .initialization_script(if capture_root.is_some() { capture_script } else { "" })
                .theme(Some(tauri::Theme::Dark))
                .inner_size(1280.0, 820.0)
                .build()?;
            if let Some(root) = capture_root {
                let _ = window.unminimize();
                let _ = window.show();
                let _ = window.set_focus();
                // Disposable capture adapter. It evaluates only task-owned action files
                // through Tauri's public test API. Product commands and UI stay unchanged.
                tauri::async_runtime::spawn(async move {
                    let mut last = String::new();
                    for _ in 0..2400 {
                        let action = root.join("action.js");
                        if let Ok(js) = std::fs::read_to_string(&action) {
                            if js != last {
                                last = js.clone();
                                let _ = window.unminimize();
                                let _ = window.show();
                                let _ = window.set_focus();
                                let output = root.join("evidence/action-result.json");
                                let _ = window.eval_with_callback(js, move |value| {
                                    let _ = std::fs::write(&output, value);
                                });
                            }
                        }
                        tokio::time::sleep(std::time::Duration::from_millis(250)).await;
                    }
                });
            }'''
if old not in original:
    raise SystemExit('Native window setup changed; inspect before patching')
lib.write_text(original.replace(old, replacement))
(ROOT / 'evidence/lib.original.rs').write_text(original)
diff = subprocess.run(['diff', '-u', '--label', 'a/src-tauri/src/lib.rs', '--label', 'b/src-tauri/src/lib.rs', str(ROOT / 'evidence/lib.original.rs'), str(lib)], capture_output=True, check=False)
(ROOT / 'evidence/startup-driver.patch').write_bytes(diff.stdout)
(ROOT / 'evidence/source.json').write_text(json.dumps({
    'revision': REVISION,
    'source': str(SOURCE),
    'archiveSha256': hashlib.sha256(archive).hexdigest(),
    'patchSha256': hashlib.sha256(diff.stdout).hexdigest(),
    'driverPurpose': 'Visible native capture and task-only test actions. No product behavior is replaced.',
}, indent=2) + '\n')
print(ROOT)
