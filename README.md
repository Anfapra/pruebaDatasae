# pruebaDatasae
video:https://1drv.ms/u/s!AqHvd0o9MVjfrxmpcLi0X1rK6MaP?e=ceuYWo
##Backend

Paso 1: Actualizar las versiones del sistema
"sudo apt update && sudo apt upgrate"

Paso 2: Veritficar que el sistema tenga Git
"git --version"

En caso de que no tenga Git usar el comando "apt-get install git"

Paso 3: Crear directoria y clonar repositorio
"mkdir pruebaDatasae", "cd pruebaDatasae" y "git clone https://github.com/Anfapra/pruebaDatasae.git"

Paso 4: Instalar nvm
"curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash"

Paso 5: Reiniciar el sistema y verificar instalaci{on
"source ~/.bashrc" y "nvm --version"

Paso 6: Instalar node
"nvm install --lts"

Paso 7: instalar node_modules
"cd backend" y "npm install"

Paso 8: correr el servido
"npm start &"

##Frontend
