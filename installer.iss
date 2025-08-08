[Setup]
AppName=Silent Printer
AppVersion=1.0.0
DefaultDirName={pf}\Silent Printer
DefaultGroupName=Silent Printer
UninstallDisplayIcon={app}\silent-printer-node18-win-x64.exe
OutputDir=dist
OutputBaseFilename=silent-printer-win-x64-installer
Compression=lzma
SolidCompression=yes

[Files]
Source: "dist\silent-printer-node18-win-x64.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\Silent Printer"; Filename: "{app}\silent-printer-node18-win-x64.exe"
Name: "{userstartup}\Silent Printer"; Filename: "{app}\silent-printer-node18-win-x64.exe"

[Run]
Filename: "{app}\silent-printer-node18-win-x64.exe"; Flags: nowait postinstall skipifsilent
