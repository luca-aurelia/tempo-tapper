// use tauri::generate_handler;
// use tauri::AppHandle;
// use tauri::SystemTray;
// use tauri::SystemTrayEvent;
// use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};

// Commented out code is for when Tauri adds support for adding text to
// system trays:
// https://github.com/tauri-apps/tao/pull/369

fn main() {
    // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
    // let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    // let tray_menu = SystemTrayMenu::new().add_item(quit);

    // let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        // .system_tray(tray)
        // .on_system_tray_event(handle_system_tray_events)
        // .invoke_handler(generate_handler![set_system_tray_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// #[tauri::command]
// fn set_system_tray_message(app_handle: tauri::AppHandle, name: &str) -> String {
//     app_handle.tray_handle().fmt(f)
//     format!("Hello, {}!", name)
// }

// fn handle_system_tray_events(app: &AppHandle, event: SystemTrayEvent) {
//     if let SystemTrayEvent::MenuItemClick { id, .. } = event {
//         if id.as_str() == "quit" {
//             std::process::exit(0);
//         }
//     }
// }
