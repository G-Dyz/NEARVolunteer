**NEAR de voluntario**

NEARVolunteer es una dApp que permite a las personas recolectar certificados cada vez que participan en un voluntariado. Los eventos de voluntariado son creados por anfitriones, los cuales determinan el periodo en el que se podrá reclamar el certificado.

Los voluntarios que tengan certificados, podrán recibir recompensas e invitaciones. También estos voluntarios son los únicos que podrán calificar el evento y generar sugerencias. Además los voluntarios pueden formarse una reputación por su nivel de participación.

El proceso puede ser mejorado, si creará un mecanismo de reputación, y solo aquellos voluntarios con un nivel de reputación(número de certificados) pueden generar eventos, de esa manera se evita que se creen imitaciones o eventos innecesarios.

Inicio rápido
===========

Para ejecutar este proyecto localmente:

1. Requisitos previos: asegúrese de tener Node.js ≥ 12 instalado (https://nodejs.org), luego úselo para instalar [yarn]: `npm install --global yarn` (o simplemente` npm i -g yarn `)
2. Ejecute el servidor de desarrollo local: `yarn && yarn dev` (consulte` package.json` para
   lista completa de `scripts` que puede ejecutar con` yarn`)

¡Ahora tendrá un entorno de desarrollo local respaldado por NEAR TestNet! Ejecutar `yarn dev` te dirá la URL que puedes visitar en tu navegador para ver la aplicación.


Explorando el código
==================

1. El código de backend vive en la carpeta `/ assembly`. Este código se implementa en
   la cadena de bloques NEAR cuando ejecuta `yarn deploy: contract`. Este tipo de
   el código que se ejecuta en una cadena de bloques se denomina "contrato inteligente" - [más información
   acerca de los contratos inteligentes NEAR] [documentos de contratos inteligentes].
2. El código de la interfaz reside en la carpeta `/ src`.
   [/src/index.html](/src/index.html) es un excelente lugar para comenzar a explorar. Nota
   que carga en `/ src / index.js`, donde puede aprender cómo la interfaz
   se conecta a la cadena de bloques NEAR.
3. Pruebas: existen diferentes tipos de pruebas para el frontend y el backend. los
   el código de backend se prueba con el comando [asp] para ejecutar el backend
   Pruebas de AssemblyScript y [jest] para ejecutar pruebas de frontend. Tu puedes correr
   ambos a la vez con "prueba de hilo".

Tanto el código del lado del cliente como del contrato se recargarán automáticamente a medida que cambie los archivos de origen.


Desplegar
======

Cada contrato inteligente en NEAR tiene su [propia cuenta asociada] [NEAR cuentas]. Cuando ejecuta `yarn dev`, sus contratos inteligentes se implementan en NEAR TestNet en vivo con una cuenta desechable. Cuando esté listo para hacerlo permanente, aquí le explicamos cómo hacerlo.


Paso 0: Instale near-cli
--------------------------

Necesita near-cli instalado globalmente. Así es cómo:

    npm install --global near-cli

Esto le dará la herramienta "near" [CLI]. Asegúrese de que esté instalado con:

    casi --versión


Paso 1: crea una cuenta para el contrato
------------------------------------------

Visite [NEAR Wallet] y cree una nueva cuenta. Implementarás estos contratos inteligentes en esta nueva cuenta.

Ahora autorice NEAR CLI para esta nueva cuenta y siga las instrucciones que le da:

    near login


Paso 2: establezca el nombre del contrato en el código
---------------------------------

Modifique la línea en `src / config.js` que establece el nombre de cuenta del contrato. Configúrelo con la identificación de cuenta que utilizó anteriormente.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'tu-cuenta-aquí!'


Paso 3: cambie la URL remota si clonó este repositorio
-------------------------

A menos que haya bifurcado este repositorio, deberá cambiar la URL remota a un repositorio al que tenga acceso de confirmación. Esto permitirá la implementación automática en Github Pages desde la línea de comandos.

1) vaya a GitHub y cree un nuevo repositorio para este proyecto
2) abre tu terminal y en la raíz de este proyecto ingresa lo siguiente:

    $ `git remote set-url origin https: // github.com / YOUR_USERNAME / YOUR_REPOSITORY.git`


Paso 4: ¡despliegue!
---------------

Un comando:

    despliegue de hilo

Como puede ver en `package.json`, esto hace dos cosas:

1. crea e implementa contratos inteligentes en NEAR TestNet
2. construye e implementa código frontend en GitHub usando [gh-pages]. Esto solo funcionará si el proyecto ya tiene un repositorio configurado en GitHub. Siéntase libre de modificar el script `deploy` en` package.json` para implementarlo en otro lugar.


Paso 5: 📑 ¡Explorando los métodos de contrato inteligente de NEAR Volunteer!
---------------

### Comando para agregar un evento:
    near view aysel.testnet getAllEvents 

### Comando para obtener todos los eventos:
    near call <id_of_your_smart_contract> addEvent '{"text":"path of your certificate","code":"code","dateStart":"XXXX-XX-XX","dateEnd":"XXXX-XX-XX"}' --account-id <your_account.testnet>

Ejemplo:

    near call aysel.testnet addEvent '{"text":"http://www.relal.org.co/images/Redes_RELAL/Voluntariado/Logo-Voluntariado.jpg","code":"123234","dateStart":"2021-10-02","dateEnd":"2021-10-04"}' --account-id aysel.testnet

### Comando para agregar un certificado:
    near view aysel.testnet getAllCertificates 

### Comando para obtener todos los certificados:
    near call <id_of_your_smart_contract> addCertificate '{"text":"path of your certificate"}' --account-id <your_account.testnet>

Ejemplo:

    near call aysel.testnet addCertificate '{"text":"123234"}' --account-id aysel.testnet

Paso 6: 📑 ¡Explorando las pruebas de NEAR Volunteer!
---------------
### Pruebas de contratos inteligentes

    yarn asp

### Pruebas de integración y UI

    yarn jest

### Todas las pruebas

    npm run test

Paso 7: 📑 ¡Explorando el NEAR Volunteer en vivo!
---------------
Inicie sesión en su billetera cercana, cree eventos y reclame sus certificados

https://near-volunteer.vercel.app/

Agregue más ideas en la figma de la maqueta, será genial tener más ideas

https://www.figma.com/file/gnhw58NXOAVfYnl7sg13zr/NEAR-Volunteer?node-id=0%3A1



  [NEAR]: https://nearprotocol.com/
  [yarn]: https://yarnpkg.com/
  [AssemblyScript]: https://docs.assemblyscript.org/
  [React]: https://reactjs.org
  [smart contract docs]: https://docs.nearprotocol.com/docs/roles/developer/contracts/assemblyscript
  [asp]: https://www.npmjs.com/package/@as-pect/cli
  [jest]: https://jestjs.io/
  [NEAR accounts]: https://docs.nearprotocol.com/docs/concepts/account
  [NEAR Wallet]: https://wallet.nearprotocol.com
  [near-cli]: https://github.com/nearprotocol/near-cli
  [CLI]: https://www.w3schools.com/whatis/whatis_cli.asp
  [create-near-app]: https://github.com/nearprotocol/create-near-app
  [gh-pages]: https://github.com/tschaub/gh-pages