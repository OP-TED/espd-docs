# Documentation for ESPD

## Workspace Setup

### VSCode installation

1. Install "Visual Studio Code" from EC Store.
2. Start "Visual Store Code [V5]" (if it is already running, restart it).

From within VSCode:

1. Configure proxy for VS Code and terminal:
   1. Open "View > Command Palette..." and select "Preferences: Open Settings (JSON)".
   2. Add or edit (if they already exist) the following lines, replacing values between "<" and ">":

      ```json
      "http.proxy": "http://<username:<password>@<proxy_host>:<proxy_port>",
      "terminal.integrated.env.windows": {
        "http_proxy": "http://<username:<password>@<proxy_host>:<proxy_port>",
        "https_proxy": "http://<username:<password>@<proxy_host>:<proxy_port>"
      }
      ```

> **NOTE**: When editing "settings.json", make sure that the resulting JSON is valid by fixing any warnings/errors that might appear.
