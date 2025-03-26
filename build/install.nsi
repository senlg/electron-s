; 定义安装程序的名称和版本
Name "MyApp Installer"
OutFile "mMyAppInstaller.exe"

; 设置安装目录
InstallDir "$PROGRAMFILES\MyApp"


Section "Install Main Program"
    ; 创建安装目录
    CreateDirectory "$INSTDIR"
    ; File "" "$INSTDIR\app.exe"
    WriteUninstaller "$INSTDIR\Uninstall.exe"
SectionEnd

Section "Uninstall"
    ; Delete "$INSTDIR\app.exe"
    ; 删除安装目录
    RMDir "$INSTDIR"
SectionEnd

