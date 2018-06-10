# Grupo Super Metroid

![portada](https://vignette.wikia.nocookie.net/metroid/images/d/d6/Super_Metroid_pantalla_inicio_sm.gif/revision/latest?cb=20140318203744&path-prefix=es)


# Concepto

**Super Metroid** es un juego concebido en **1994** y el tercero de la saga [Metroid](https://es.wikipedia.org/wiki/Metroid). Fue desarrollado por el equipo **R&D1** de [Nintendo](https://www.nintendo.es) para la consola [Super Nes](https://es.wikipedia.org/wiki/Super_Nintendo). Con un cartucho de 24 megabits, fue en su tiempo el juego más grande disponible para esta consola.

Es un juego de **plataformas en 2D** con elementos de acción y aventura. La progresión del juego gira alrededor de la recolección secuencial de objetos que permiten que **Samus** (la protagonista del juego) supere obstáculos para tener acceso a nuevas partes de los escenarios. El mundo tiene una abundancia de elementos y características no lineales y contiene una gran cantidad de **áreas ocultas**, haciendo de la exploración un concepto central. Incluye elementos totalmente nuevos, como el mapa, la historia, el diseño de personajes y los artefactos para ayudar en la travesía.


# Historia

La cazarrecompensas Samus Aran trae a la **última larva Metroid** a la Colonia Espacial. Dicha larva rompió el cascarón de su huevo cuando Samus estaba presente y siguió creyendo que era su madre. Al llegar a la colonia, los científicos realizan investigaciones sobre la larva y llegan a la conclusión de que los **poderes de los Metroids** podrían ser aprovechados para el beneficio de la humanidad. Poco después, Samus recibe una llamada de auxilio de la colonia y decide ir a investigar. Cuando Samus explora la estación, para saber qué está ocurriendo, es atacada por **Ridley**, un dragón pirata espacial y archienemigo de Samus. Ridley escapa con la larva entre sus garras y activa la cuenta atrás para la autodestrucción de la colonia espacial. Samus sigue a Ridley al planeta Zebes, una base de los **Piratas Espaciales**, con el objetivo de localizar a la larva de Metroid para evitar que sea utilizada por los piratas.

![Ridley escapando con la larva Metroid](https://vignette.wikia.nocookie.net/nintendo/images/2/25/Ridley_SM.gif/revision/latest?cb=20170224232320&path-prefix=es)

Ridley escapando con la larva Metroid

![Super Metroid atacando a Mother Brain](http://www.blogodisea.com/wp-content/uploads/2009/02/super-metroid-musica-10-brain-mother.jpg)

Super Metroid atacando a Mother Brain


# Datos curiosos

1. El juego tardó en desarrollarse 2 años y estuvo a punto de ser cancelado 3 veces, si no hubiera sido porque sus desarrolladores suplicaron a Nintendo que les dejaran terminarlo nunca se hubiera convertido en uno de los juegos más emblemáticos de la snes.

1. El juego posee 3 finales diferentes y se llega a cada uno según la cantidad de veces que hayas muerto en la partida.

1. Introdujo el concepto del wall jump.

    ![wall jump](https://lh3.googleusercontent.com/-ROOwmRxlpm4/WNL6EcGbm3I/AAAAAAAARFA/cOdbq-fLN608jKM53mzlzHWMbazkcC6LwCJoC/w412-h360/12-who-is-your-favoureite-character-ever.gif)

1. Incluía una técnica secreta presente desde el principio llamada Crystal Flash que era muy complicada de descubrir. Requería tener menos de 29 de energía en el tanque, tener los tanques de reserva vacíos y tener 10 misiles, 10 super misiles y 11 bombas. Después de cumplir estas condiciones tenías que mantener presionados los botones L y R, utilizar la morfoesfera, mantener la flecha de abajo y por último mantener pulsado X para poner una bomba, el resultado era que Samus absorbe la fuerza de la explosión y recuperaba toda su energía y tanques de reserva.

    ![crystal flash](https://i.gifer.com/3H0k.gif)

1. La apariencia de Samus está basada en la actriz Kim Basinger.

    ![Kim Basinger](http://1.bp.blogspot.com/-3DYTDGys2UI/TkZ-h8YymnI/AAAAAAAABKA/DhhaKb2SCPY/s400/Kim+Basinger.jpg)


# Alcance

El proyecto consiste en recrear el inicio del planeta Zebes, primer nivel del juego. Primero aparece una pantalla de inicio que da comienzo al juego pulsando el botón enter o pulsando con el ratón en el canvas, tras esta pantalla Samus aparece encima de su nave (como en el juego original) y comienza el nivel. Durante el nivel Samus deberá enfrentarse a tres tipos de enemigos, pasar por zonas de plataformeo y obtener mejoras de su traje (Una obligatoria y una opcional) hasta llegar a la sala del boss, que en este nivel será Kraid (un boss recurrente en la saga). Samus tiene la posibilidad de guardar la partida en un punto de guardado antes de enfrentar al boss, para así no tener que repetir todo el nivel si muere, si no ha guardado volverá al incio del nivel. Cuando Samus vence a Kraid aparecerá una pantalla de créditos donde aparezcan los nombres de los integrantes del grupo y artistas de los recursos utilizados. Estos recursos se sacarán de la web [Spriters Resource](https://www.spriters-resource.com/snes/smetroid) y algún otro portal en caso de que sea necesario.

![Batalla contra Kraid con misiles](https://i.redd.it/vg0zu6r8ln2z.gif)

Batalla contra Kraid con misiles


# Diseño del juego

1. Objetivo del juego
    - Cómo ganar: Para ganar Samus deberá atravesar todo el nivel hasta llegar a la sala del boss y derrotar a Kraid.
    - Cómo perder: Se pierde la partida cuando Samus se queda sin vida cuando algún enemigo le hace daño.

2. Mecánicas principales
    - Plataformeo: La saga metroid es del género plataformas, por lo que las zonas de plataformeo son esenciales. Durante el juego se pueden obtener mejoras del salto base que permiten acceder a nuevas zonas del nivel, sin embargo al ser un nivel sencillo solo hemos implementado el salto básico y nos hemos centrado más en las mejoras del traje.
    - Mejoras del traje: Hemos implementado dos mejoras, la morfoesfera y los misiles. La morfoesfera es necesario obtenerla para poder llegar a la sala del boss, los misiles son opcionales pero ayudan mucho en la pelea contra Kraid, deberás obtener antes la morfoesfera para poder acceder a ellos.
    - Combate contra enemigos: En la saga metroid hay varios enemigos en el recorrido del nivel que al vencerlos dan a Samus más vida o munición de misiles. Nosotros hemos implementado tres tipos de enemigos y un boss final descritos en la sección de personajes.
    - Punto de guardado: Hay un punto de guardado antes de llegar a la sala del boss, cuando Samus guarda la partida, al morir, no tendrá que volver a recorrer todo en nivel desde el principio si no que aparecerá en la sala de guardado. 


3. Personajes

    - Samus: Protagonista del juego, se mueve utilizando las flechas de dirección derecha e izquierda, con la flecha de arriba salta y con la debajo se agacha, si ya ha obtenido la mejora de la morfoesfera, al pulsar dos veces la flecha de abajo, se transforma en morfoesfera. Con el espacio dispara, si se ha  obtenido la mejora de los misiles, con el botón enter se podrá cambiar de tipo de munición entre balas normales y misiles. Si se pulsa el botón S se podra apuntar en diagonal.
    
        ![Samus](https://thumbs.gfycat.com/ImmaterialDefiantGar-max-1mb.gif)
    
    - Skree: Es un enemigo parecido a un murciélago que al ver a Samus se lanzará hacia ella como un kamikaze. Si choca contra el suelo morirá y si choca contra Samus le quitará un tercio del tanque de vida.
    
        ![Skree](https://i.gifer.com/fetch/w300-preview/90/9024104d05be2162ad1bfd3c03c31ea6.gif)
    
    - Zoomer: Es un enemigo con un aspecto similar a un erizo que camina por el suelo o las paredes, al chocar contra él Samus pierde un tercio del tanque de vida.
    
        ![Zoomer](https://i.ytimg.com/vi/juGDUgcfSaw/hqdefault.jpg)
   
    - Pirata Espacial: Un enemigo con aspecto de mantis humanoide, patrulla una pequeña zona y al ver a Samus le dispara un rayo que si colisiona con ella le quitará un tercio del tanque de vida.
    
        ![Pirata Espacial](https://vignette.wikia.nocookie.net/metroid/images/1/1f/ZEBESIAN_SPACE_PIRATES.jpg/revision/latest?cb=20051229165931)
    
    - Kraid: Es el boss final, un enemigo con aspecto de dinosaurio que lanza pinchos desde su estómago, que al colisionar con Samus le quitarán dos tercios del tanque de vida. Es el enemigo con ams vida del nivel.
    
        ![Kraid](https://i.ytimg.com/vi/ExWFGqDTQ_M/hqdefault.jpg)
        
# Diseño de la implementación

Hemos adoptado un diseño modular para la implementación del proyecto con el fin de facilitar su comprensión, empezando por un sistema de carpetas que mantienen separados los diferentes archivos en función de su tipo:

- Carpeta lib:
    Esta carpeta recoge todos los archivos con extensión .js que conforman el motor Quintus. Son los mismos que se facilitan en la asignatura para la realización de las prácticas y no han sido modificados durante la realización del proyecto.
    
- Carpeta audio:
    Aquí se recogen todas las pistas de audio utilizadas en el proyecto en formato .mp3
    
- Carpeta images:
    Contiene todas las imágenes en formato .png empleadas en el proyecto, desde las pantallas de inicio y fin hasta los sprites de cada uno de los personajes y objetos que aparecen en el nivel.
    
- Carpeta data:
    Aquí se guardan los archivos .json que permiten utilizar las imágenes anteriormente mencionadas dentro del código como sheets, permitiendo manipular los distintos frames de los sprites para reproducir animaciones. También se encuentra en esta carpeta el mapa en formato .tmx, creado con el programa Tiled.
    
- Carpeta js
    Esta carpeta reúne todos los archivos que contienen el código JavaScript que conforman el código principal del proyecto. En una primera versión este código estaba reunido en un único archivo .js, pero decidimos separarlo en varios archivos en función de los componentes que contiene cada uno:  
    
    - Cuerpo principal (main.js): Desde este archivo se cargan los recursos contenidos en el resto de archivos y se compilan las sheets del juego, además de configurar las diferentes scenes. También hay algún fragmento de código que era demasiado general para incluirlo en otro lugar.
    - samus.js: Este archivo contiene la clase entera de Samus (el personaje controlado por el jugador) donde se gestionan todas sus funciones y también todas sus animaciones.
    - Mejoras del traje (ball.js y missile.js): En estos dos archivos se encuentran las clases de las dos mejoras para el traje de Samus que se obtienen durante el nivel: la morfoesfera y los misiles.
    - Enemigos (zoomer.js, skree.js, space_pirate.js): Siguen la misma estructura de samus.js. En cada uno de estos archivos se encuentra la clase correspondiente al enemigo concreto junto a la gestión de sus animaciones.
    - Jefe final (kraid.js): Contiene la clase del enemigo final del nivel y sus animaciones.
    - Proyectiles (munition.js, space_pirate_projectile.js y kraid_bullet.js): En estos archivos se encuentran las clases correspondientes a los distintos tipos de proyectiles del nivel: los disparos de Samus (tanto los misiles como los disparos normales utilizan la misma clase cambiando algunos parámetros), los rayos disparados por los piratas espaciales y los proyectiles disparados por Kraid. Su funcionamiento es muy similar entre sí.
    - Puertas (door_l.js y door_r.js): Aquí se encuentran las clases de las puertas en ambas direcciones que se encuentran en varios puntos del mapa.
    - diagonal.js: Este archivo contiene una clase cuya función es gestionar las colisiones en las cuestas del escenario para que sean más suaves.
    - save.js: Esta clase se corresponde con el tanque en el que se guarda la partida cuando Samus se coloca en su interior. Guarda el estado del juego.
    - spikes.js: En este archivo se encuentra la clase correspondiente a los pinchos que se encuentran a los pies de Kraid y la gestión de su sprite. Su funcionamiento y estructura es muy similar al de otros enemigos y, por lo tanto, se puede considerar como un cuarto tipo de enemigo, aunque en este caso es solo un objeto inanimado que hace daño a Samus cuando lo pisa.

# Miembros del grupo:

- Adrián Garrido Sierra - adrigarr@ucm.es
- Jose Javier Escudero Gómez - josejesc@ucm.es
- Pablo Verdugo Garrido - pverdu01@ucm.es

> **Adrián Garrido Sierra**
    Ha sido el encargado de implementar todos los enemigos, incluido el jefe final, que aparecen a lo largo del juego. Esta tarea no solo supuso diseñar las mecánicas de cada tipo de enemigo basándose en las mecánicas originales, sino que también supuso una gran labor de retoque digital para adaptar todos los sprites necesarios para animar a estas entidades. También ha sido el encargado de dividir todo el código en diferentes scripts el día después de realizar la presentación del proyecto.
    
> **José Javier Escudero Gómez**
    Ha sido el encargado de implementar las mecánicas de Samus y los proyectiles que esta dispara. Al igual que Adrián, este trabajo no supuso tan solo diseñar las mecánicas del personaje jugable basándose en las que fueron escogidas del juego original, sino que también tuvo que dedicar una gran cantidad de tiempo para editar todos los sprites de las distintas animaciones de Samus. También ha sido el encargado de crear las escenas de inicio, muerte y créditos del juego, así como también ha creado el sistema de guardado.
    
> **Pablo Verdugo Garrido**
    Ha sido el encargado de diseñar el mapa del juego y los power-ups con los que Samus puede interactuar. El escenario de juego fue diseñado completamente a mano tomando como referencia el primer nivel del juego, lo cual no fue para nada sencillo al tratarse de un espacio bastante amplio. Una vez montado el mapa, se encargó de ajustar el sistema de colisiones de este contra Samus y de crear el sistema de teletransporte entre las distintas puertas que unen todo el mapa como en el juego original.
    
El trabajo de todos los miembros del grupo ha sido completamente equitativo (33% de esfuerzo para cada uno) tratando de ajustar una carga de trabajo similar en todos los hitos de proyecto marcados. Se ha usado Trello a la hora de dividir el trabajo en pequeños módulos independientes y su posterior asignación. Discord fue utilizado los fines de semana para poner en común el trabajo realizado por cada uno de los miembros durante cada hito.
    
# Referencias:
    
- La mayoría de sprites del juego han sido sacados de la siguiente página web: https://www.spriters-resource.com/snes/smetroid/
- Los sprites utilizados para los piratas espaciales y Kraid proceden de esta página: http://tsgk.captainn.net/index.php?p=search&q=enemy
- A la hora de implementar las mecánicas de Samus, se jugó a esta versión online del juego: https://www.retrogames.cz/play_767-SNES.php

