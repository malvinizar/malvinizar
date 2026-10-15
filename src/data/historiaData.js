/**
 * MalvinizAR — Datos verificados de la Cronología Histórica
 * Fuentes: Naciones Unidas, Ministerio de Relaciones Exteriores de Argentina,
 * Archivo General de la Nación, Ministerio de Defensa, Cruz Roja Internacional,
 * Constitución Nacional de 1994 y Programa Educación y Memoria.
 */

export const historiaData = [
  {
    id: '01',
    numero: 1,
    year: '1764-1765',
    title: 'Los primeros asentamientos europeos',
    resumen: 'Durante el siglo XVIII se establecieron asentamientos franceses y británicos en las Islas Malvinas. Francia fundó Port Louis en 1764 y Gran Bretaña estableció Port Egmont en 1765. Estos acontecimientos forman parte de los antecedentes de la historia política de las islas.',
    categoria: 'antecedentes',
    categoriaLabel: 'Antecedentes históricos',
    image: 'images/historia/1.jpg',
    imageAlt: 'Ilustración histórica y cartografía de los primeros asentamientos europeos en las Islas Malvinas del siglo XVIII',
    contexto: 'Durante el siglo XVIII, las potencias marítimas europeas intensificaron sus expediciones de reconocimiento en el Atlántico Sur y los pasos interoceánicos.',
    queOcurrio: 'En 1764, la expedición francesa al mando de Louis Antoine de Bougainville fundó Port Louis en la Isla Soledad. Al año siguiente, en 1765, una expedición británica comandada por John Byron llegó a la Isla Trinidad (Saunders) y nombró Port Egmont al fondeadero, estableciendo un asentamiento secreto en 1766.',
    porQueImportante: 'Estos asentamientos generaron reclamos formales por parte de la Corona española, que invocaba sus derechos de posesión territorial emanados de tratados internacionales y de la jurisdicción del Virreinato del Río de la Plata.',
    quiz: {
      pregunta: '¿Qué países establecieron asentamientos en las Islas Malvinas durante 1764 y 1765?',
      opciones: [
        { id: 'A', texto: 'España y Portugal.' },
        { id: 'B', texto: 'Francia y Gran Bretaña.' },
        { id: 'C', texto: 'Argentina y Francia.' }
      ],
      correcta: 'B',
      explicacion: 'Francia fundó Port Louis en 1764 y Gran Bretaña estableció Port Egmont en 1765.'
    },
    fuente: {
      institucion: 'Archivo General de la Nación / Cancillería Argentina',
      descripcion: 'Documentos históricos y cartografía colonial del Atlántico Sur',
      url: 'https://www.cancilleria.gob.ar/es/politica-exterior/cuestion-malvinas/antecedentes-historicos',
      tipo: 'Documento histórico'
    }
  },
  {
    id: '02',
    numero: 2,
    year: '1767',
    title: 'La administración española',
    resumen: 'En 1767, Francia transfirió a España su asentamiento en las islas. España pasó a administrar Puerto Soledad, en el marco de los acuerdos entre ambas coronas.',
    categoria: 'antecedentes',
    categoriaLabel: 'Antecedentes históricos',
    image: 'images/historia/2.jpg',
    imageAlt: 'Retrato de la administración colonial española en Puerto Soledad a partir de 1767',
    contexto: 'Tras los reclamos diplomáticos españoles basados en el principio de integridad territorial y los tratados vigentes, Francia reconoció los derechos de España sobre el archipiélago.',
    queOcurrio: 'El 1 de abril de 1767, Francia entregó formalmente el establecimiento de Port Louis a España. El sitio fue rebautizado como Puerto Soledad y se nombró a Felipe Ruiz Puente como su primer gobernador militar y político, bajo dependencia directa de la Gobernación de Buenos Aires.',
    porQueImportante: 'Inició una administración continua y regular de gobernadores españoles que duró más de cuatro décadas, reafirmando la continuidad jurídica que más tarde heredaría el Estado argentino tras la Revolución de Mayo.',
    quiz: {
      pregunta: '¿Qué ocurrió con el asentamiento francés de Puerto Soledad en 1767?',
      opciones: [
        { id: 'A', texto: 'Fue transferido a España.' },
        { id: 'B', texto: 'Fue trasladado a Buenos Aires.' },
        { id: 'C', texto: 'Fue abandonado por completo ese mismo año.' }
      ],
      correcta: 'A',
      explicacion: 'Francia reconoció los derechos soberanos españoles y transfirió formalmente el asentamiento de Puerto Soledad en 1767.'
    },
    fuente: {
      institucion: 'Ministerio de Relaciones Exteriores, Comercio Internacional y Culto',
      descripcion: 'Antecedentes de la Gobernación de Malvinas en la administración virreinal',
      url: 'https://www.cancilleria.gob.ar/es/politica-exterior/cuestion-malvinas/antecedentes-historicos',
      tipo: 'Publicación institucional'
    }
  },
  {
    id: '03',
    numero: 3,
    year: '10 de junio de 1829',
    title: 'La Comandancia Política y Militar',
    resumen: 'El gobierno de Buenos Aires estableció la Comandancia Política y Militar de las Islas Malvinas y designó a Luis Vernet para ejercer esa función. Este hecho es un antecedente importante del reclamo argentino de soberanía.',
    categoria: 'antecedentes',
    categoriaLabel: 'Antecedentes históricos',
    image: 'images/historia/3.jpg',
    imageAlt: 'Retrato de Luis Vernet y decreto de creación de la Comandancia Política y Militar de 1829',
    contexto: 'Tras consolidar su independencia, las Provincias Unidas del Río de la Plata continuaron ejerciendo soberanía pacífica y efectiva sobre los territorios y mares del sur.',
    queOcurrio: 'El 10 de junio de 1829, el gobernador interino de la provincia de Buenos Aires, Martín Rodríguez, promulgó el decreto por el cual se creaba la Comandancia Política y Militar de las Islas Malvinas y las adyacentes al Cabo de Hornos en el Mar Atlántico, designando a Luis Vernet al frente de la misma.',
    porQueImportante: 'Representó la consolidación institucional argentina mediante el fomento de la población, el control de la pesca y la regulación de los recursos naturales en las islas por parte del naciente Estado argentino.',
    quiz: {
      pregunta: '¿Quién fue designado comandante político y militar de las Islas Malvinas en 1829?',
      opciones: [
        { id: 'A', texto: 'Manuel Belgrano.' },
        { id: 'B', texto: 'Luis Vernet.' },
        { id: 'C', texto: 'Raúl Alfonsín.' }
      ],
      correcta: 'B',
      explicacion: 'Luis Vernet fue designado titular de la Comandancia Política y Militar el 10 de junio de 1829.'
    },
    fuente: {
      institucion: 'Archivo General de la Nación (AGN)',
      descripcion: 'Decreto oficial del 10 de junio de 1829 de creación de la Comandancia',
      url: 'https://www.argentina.gob.ar/interior/archivo-general',
      tipo: 'Documento histórico'
    }
  },
  {
    id: '04',
    numero: 4,
    year: '3 de enero de 1833',
    title: 'La usurpación británica',
    resumen: 'Fuerzas británicas llegaron a las islas a bordo de la corbeta HMS Clio y desplazaron a las autoridades argentinas. Parte de la población permaneció en las islas. Argentina continuó reclamando su soberanía por vías diplomáticas.',
    categoria: 'antecedentes',
    categoriaLabel: 'Antecedentes históricos',
    image: 'images/historia/4.jpg',
    imageAlt: 'Representación histórica del desalojo forzado de las autoridades argentinas por la HMS Clio en 1833',
    contexto: 'En una época de expansión imperial británica por rutas comerciales estratégicas, Gran Bretaña envió una fuerza naval para tomar posesión del archipiélago.',
    queOcurrio: 'El 3 de enero de 1833, el comandante de la nave de guerra británica HMS Clio, John James Onslow, intimó por la fuerza al comandante militar argentino José María Pinedo a arriar la bandera argentina y abandonar el territorio junto a sus soldados y funcionarios.',
    porQueImportante: 'Este acto de fuerza quebrantó la soberanía territorial argentina y originó la protesta diplomática formal iniciada por el ministro Manuel Moreno en Londres, mantenida sin interrupción por todos los gobiernos constitucionales.',
    quiz: {
      pregunta: '¿Qué ocurrió cuando llegaron las fuerzas británicas a las islas en enero de 1833?',
      opciones: [
        { id: 'A', texto: 'Se firmó la Resolución 2065.' },
        { id: 'B', texto: 'Se inició la guerra de 1982.' },
        { id: 'C', texto: 'Las autoridades argentinas fueron desplazadas.' }
      ],
      correcta: 'C',
      explicacion: 'Las fuerzas navales británicas desplazaron por la fuerza a las autoridades legítimas argentinas que gobernaban las islas.'
    },
    fuente: {
      institucion: 'Ministerio de Relaciones Exteriores de Argentina',
      descripcion: 'La Cuestión Malvinas: antecedentes de la usurpación y primeras protestas diplomáticas de 1833',
      url: 'https://www.cancilleria.gob.ar/es/politica-exterior/cuestion-malvinas',
      tipo: 'Documento histórico'
    }
  },
  {
    id: '05',
    numero: 5,
    year: '16 de diciembre de 1965',
    title: 'La Resolución 2065 de las Naciones Unidas',
    resumen: 'La Asamblea General de las Naciones Unidas reconoció la existencia de una disputa de soberanía entre Argentina y el Reino Unido e invitó a ambos países a negociar una solución pacífica. La resolución no adjudicó definitivamente la soberanía a ninguna de las partes.',
    categoria: 'diplomacia',
    categoriaLabel: 'Diplomacia y ONU',
    image: 'images/historia/5.jpg',
    imageAlt: 'Sesión plenaria de la Asamblea General de la ONU en la aprobación de la Resolución 2065',
    contexto: 'En el marco del proceso de descolonización mundial impulsado por la Declaración sobre la Concesión de la Independencia a los Países y Pueblos Coloniales (Resolución 1514).',
    queOcurrio: 'La Asamblea General de la ONU adoptó formalmente la Resolución 2065 (XX) por 94 votos a favor, ninguno en contra y 14 abstenciones, reconociendo expresamente la disputa territorial e invitando a negociar bilateralmente para encontrar una solución pacífica.',
    porQueImportante: 'Constituye la piedra angular diplomática que encuadra el conflicto como un caso especial y particular de colonialismo, donde debe resolverse la controversia de soberanía considerando los intereses (y no los deseos) de los pobladores.',
    quiz: {
      pregunta: '¿Qué hizo la Resolución 2065 de las Naciones Unidas?',
      opciones: [
        { id: 'A', texto: 'Invitó a Argentina y al Reino Unido a negociar sobre la disputa de soberanía.' },
        { id: 'B', texto: 'Declaró finalizada la disputa.' },
        { id: 'C', texto: 'Estableció el comienzo de la guerra de 1982.' }
      ],
      correcta: 'A',
      explicacion: 'La Asamblea General de la ONU reconoció la disputa e invitó a ambas naciones a negociar una solución pacífica al diferendo.'
    },
    fuente: {
      institucion: 'Organización de las Naciones Unidas (ONU)',
      descripcion: 'Resolución 2065 (XX) de la Asamblea General: Cuestión de las Islas Malvinas (Falkland Islands)',
      url: 'https://undocs.org/es/A/RES/2065(XX)',
      tipo: 'Documento oficial ONU'
    }
  },
  {
    id: '06',
    numero: 6,
    year: 'Marzo de 1982',
    title: 'El contexto político argentino',
    resumen: 'La guerra de Malvinas tuvo lugar durante la última dictadura cívico-militar argentina, iniciada en 1976. Comprender el contexto político del país es fundamental para estudiar las decisiones que llevaron al conflicto y sus consecuencias.',
    categoria: 'conflicto',
    categoriaLabel: 'Conflicto de 1982',
    image: 'images/historia/6.jpg',
    imageAlt: 'Contexto social y político argentino de principios de 1982 durante el régimen de facto',
    contexto: 'Hacia principios de 1982, la dictadura cívico-militar atravesaba una profunda crisis económica, un fuerte aislamiento internacional y un creciente descontento popular y sindical.',
    queOcurrio: 'La junta militar presidida por Leopoldo Fortunato Galtieri aceleró los planes de una acción armada en las islas, buscando generar cohesión interna en medio de movilizaciones sociales como la histórica marcha de "Paz, Pan y Trabajo" del 30 de marzo de 1982.',
    porQueImportante: 'Permite deslindar la legítima causa histórica de soberanía nacional del pueblo argentino de los intereses y las decisiones tomadas por las cúpulas de la dictadura militar sin consenso democrático.',
    quiz: {
      pregunta: '¿Qué tipo de gobierno estaba en el poder en Argentina cuando comenzó la guerra de Malvinas?',
      opciones: [
        { id: 'A', texto: 'Un gobierno colonial británico.' },
        { id: 'B', texto: 'Una dictadura cívico-militar.' },
        { id: 'C', texto: 'Una monarquía.' }
      ],
      correcta: 'B',
      explicacion: 'Argentina se encontraba gobernada por la última dictadura cívico-militar iniciada en 1976.'
    },
    fuente: {
      institucion: 'Programa Educación y Memoria (Ministerio de Educación)',
      descripcion: 'Cuadernillos pedagógicos "Pensar Malvinas: una mirada desde el presente"',
      url: 'https://www.educ.ar/recursos/115598/pensar-malvinas',
      tipo: 'Material educativo'
    }
  },
  {
    id: '07',
    numero: 7,
    year: '2 de abril de 1982',
    title: 'Operación Rosario',
    resumen: 'Las fuerzas argentinas desembarcaron en las islas y tomaron el control del territorio. Durante los enfrentamientos murió el capitán argentino Pedro Giachino. La operación marcó el comienzo de una nueva etapa del conflicto, que se extendió hasta junio de 1982.',
    categoria: 'conflicto',
    categoriaLabel: 'Conflicto de 1982',
    image: 'images/historia/7.jpg',
    imageAlt: 'Vehículos anfibios y tropas argentinas durante la Operación Rosario en la madrugada del 2 de abril de 1982',
    contexto: 'La fuerza de tareas conjunta argentina planificó un desembarco anfibio con órdenes estrictas de no causar bajas mortales en la guarnición militar británica ni en la población civil.',
    queOcurrio: 'En la madrugada del 2 de abril, tropas de infantería de marina y comandos anfibios desembarcaron en las inmediaciones de Puerto Argentino. Durante el asalto a la casa del gobernador británico fue abatido el capitán de corbeta Pedro Edgardo Giachino, primera baja del conflicto. El gobernador Rex Hunt firmó la rendición local.',
    porQueImportante: 'Marcó el inicio del conflicto armado en el Atlántico Sur y la respuesta bélica del gobierno británico encabezado por Margaret Thatcher con el envío de una gigantesca fuerza de tareas expedicionaria.',
    quiz: {
      pregunta: '¿Qué ocurrió durante la Operación Rosario?',
      opciones: [
        { id: 'A', texto: 'Se aprobó la Constitución de 1994.' },
        { id: 'B', texto: 'Se firmó la Resolución 2065.' },
        { id: 'C', texto: 'Las fuerzas argentinas desembarcaron y tomaron el control de las islas.' }
      ],
      correcta: 'C',
      explicacion: 'Fuerzas argentinas desembarcaron en las islas y tomaron el control territorial el 2 de abril de 1982.'
    },
    fuente: {
      institucion: 'Ministerio de Defensa de la Nación',
      descripcion: 'Registros y memorias históricas del desembarco del 2 de abril de 1982',
      url: 'https://www.argentina.gob.ar/defensa/archivos-abiertos/malvinas',
      tipo: 'Archivo oficial de defensa'
    }
  },
  {
    id: '08',
    numero: 8,
    year: 'Abril-junio de 1982',
    title: 'La vida durante la guerra',
    resumen: 'La guerra afectó a soldados, personal sanitario, familias y otras personas involucradas. Las cartas, fotografías, documentos y testimonios permiten conocer distintas experiencias humanas y comprender las consecuencias del conflicto.',
    categoria: 'conflicto',
    categoriaSecundaria: 'memoria',
    categoriaLabel: 'Conflicto de 1982 y memoria',
    image: 'images/historia/8.jpg',
    imageAlt: 'Cartas, abrigos y vivencias cotidianas de los soldados conscriptos en las posiciones de combate de Malvinas',
    contexto: 'Miles de jóvenes conscriptos, en su mayoría de las clases 1962 y 1963, fueron destinados a posiciones en las islas junto a oficiales, suboficiales y personal de sanidad naval y aérea.',
    queOcurrio: 'En medio de un clima inhóspito, con bajas temperaturas, humedad y escasez de pertrechos, los soldados mantuvieron correspondencia con sus familias, compartieron vivencias en los pozos de zorro y afrontaron el bombardeo aeronaval británico constante.',
    porQueImportante: 'Pone en el centro la dimensión humana, testimonial y ética de la guerra, rescatando las voces directas de los veteranos y de las enfermeras que los asistieron.',
    quiz: {
      pregunta: '¿Qué fuentes nos ayudan a conocer las experiencias de quienes vivieron la guerra?',
      opciones: [
        { id: 'A', texto: 'Solamente mapas actuales.' },
        { id: 'B', texto: 'Cartas, fotografías, documentos y testimonios.' },
        { id: 'C', texto: 'Únicamente estadísticas económicas.' }
      ],
      correcta: 'B',
      explicacion: 'Las cartas familiares, fotografías, testimonios orales y diarios íntimos son fuentes primarias esenciales.'
    },
    fuente: {
      institucion: 'Museo Malvinas e Islas del Atlántico Sur',
      descripcion: 'Fondos documentales, testimoniales y cartas de combatientes de Malvinas',
      url: 'https://museomalvinas.cultura.gob.ar',
      tipo: 'Archivo testimonial'
    }
  },
  {
    id: '09',
    numero: 9,
    year: '2 de mayo de 1982',
    title: 'El hundimiento del ARA General Belgrano',
    resumen: 'El crucero argentino ARA General Belgrano fue hundido durante la guerra. Murieron 323 tripulantes. Este acontecimiento fue uno de los episodios más trágicos del conflicto y debe abordarse con respeto y precisión histórica.',
    categoria: 'conflicto',
    categoriaLabel: 'Conflicto de 1982',
    image: 'images/historia/9.jpg',
    imageAlt: 'Homenaje y registro histórico del Crucero ARA General Belgrano en navegación en el Atlántico Sur',
    contexto: 'Hacia principios de mayo se desarrollaban negociaciones de paz a través de mediaciones diplomáticas internacionales, como la propuesta peruana encabezada por el presidente Fernando Belaúnde Terry.',
    queOcurrio: 'El domingo 2 de mayo de 1982 a las 16:02 horas, el submarino nuclear británico HMS Conqueror disparó dos torpedos Mk 8 contra el crucero ARA General Belgrano fuera de la "zona de exclusión" marítima de 200 millas fijada por Gran Bretaña, provocando su hundimiento y la muerte de 323 de sus 1.093 tripulantes.',
    porQueImportante: 'Constituyó casi la mitad del total de las bajas argentinas en la guerra (649 en total) y clausuró abruptamente las posibilidades inmediatas de un acuerdo diplomático de cese al fuego.',
    quiz: {
      pregunta: '¿Qué ocurrió con el crucero ARA General Belgrano el 2 de mayo de 1982?',
      opciones: [
        { id: 'A', texto: 'Fue hundido durante la guerra.' },
        { id: 'B', texto: 'Fue utilizado para firmar la rendición.' },
        { id: 'C', texto: 'Fue construido después del conflicto.' }
      ],
      correcta: 'A',
      explicacion: 'El crucero fue torpedeado y hundido el 2 de mayo de 1982 con la pérdida de 323 compatriotas.'
    },
    fuente: {
      institucion: 'Armada Argentina / Ministerio de Defensa',
      descripcion: 'Libro de honor y parte oficial del hundimiento del ARA General Belgrano',
      url: 'https://www.argentina.gob.ar/armada/ara-general-belgrano',
      tipo: 'Archivo militar oficial'
    }
  },
  {
    id: '10',
    numero: 10,
    year: '11-14 de junio de 1982',
    title: 'Los combates finales',
    resumen: 'Durante junio se desarrollaron intensos combates en las alturas próximas a Puerto Argentino, entre ellas Monte Longdon, Dos Hermanas, Harriet y Tumbledown. El 14 de junio se produjo la rendición de las fuerzas argentinas en las islas y finalizaron las principales operaciones de combate.',
    categoria: 'conflicto',
    categoriaLabel: 'Conflicto de 1982',
    image: 'images/historia/10.jpg',
    imageAlt: 'Relieve y posiciones defensivas en los montes Longdon, Dos Hermanas y Tumbledown',
    contexto: 'Las fuerzas terrestres británicas, tras desembarcar en San Carlos, avanzaron hacia el este cercando las defensas argentinas apostadas en las colinas de roca que custodiaban el acceso a Puerto Argentino.',
    queOcurrio: 'Entre el 11 y el 14 de junio se libraron batallas terrestres cuerpo a cuerpo en Monte Longdon, Dos Hermanas, Monte Harriet y Monte Tumbledown en condiciones extremas. El 14 de junio el general Mario Benjamín Menéndez acordó el cese de hostilidades y la capitulación de las tropas en las islas ante el general británico Jeremy Moore.',
    porQueImportante: 'Puso fin a los 74 días de combates armados en el archipiélago y aceleró el desenlace político interno de la dictadura en el continente.',
    quiz: {
      pregunta: '¿Qué ocurrió el 14 de junio de 1982?',
      opciones: [
        { id: 'A', texto: 'Comenzó la dictadura.' },
        { id: 'B', texto: 'Se aprobó la Resolución 2065.' },
        { id: 'C', texto: 'Se produjo la rendición de las fuerzas argentinas en las islas.' }
      ],
      correcta: 'C',
      explicacion: 'El 14 de junio de 1982 se pactó el cese del fuego y la rendición de las tropas argentinas en las islas.'
    },
    fuente: {
      institucion: 'Comisión de Análisis y Evaluación de las Responsabilidades en el Conflicto del Atlántico Sur',
      descripcion: 'Informe Rattenbach (documento oficial desclasificado por el Estado Nacional)',
      url: 'https://www.argentina.gob.ar/defensa/archivos-abiertos/informe-rattenbach',
      tipo: 'Informe oficial desclasificado'
    }
  },
  {
    id: '11',
    numero: 11,
    year: '10 de diciembre de 1983',
    title: 'El regreso de la democracia',
    resumen: 'Raúl Alfonsín asumió la presidencia el 10 de diciembre de 1983, marcando el retorno al gobierno democrático constitucional. La memoria de la guerra pasó a formar parte de la reflexión pública sobre la dictadura, la democracia y sus consecuencias.',
    categoria: 'memoria',
    categoriaLabel: 'Memoria y democracia',
    image: 'images/historia/11.jpg',
    imageAlt: 'Asunción presidencial de Raúl Alfonsín el 10 de diciembre de 1983 restaurando el orden constitucional',
    contexto: 'El resultado de la guerra de Malvinas profundizó el derrumbe político y moral del régimen militar, abriendo camino a elecciones libres tras más de siete años de terrorismo de Estado.',
    queOcurrio: 'El 10 de diciembre de 1983, el Dr. Raúl Alfonsín juró como presidente constitucional de la Nación Argentina, restaurando el Estado de derecho, la división de poderes y las libertades civiles en todo el territorio nacional.',
    porQueImportante: 'Inauguró el período ininterrumpido de democracia más extenso de la historia argentina y recondujo el reclamo de soberanía por vías exclusivamente pacíficas, diplomáticas y de derecho internacional.',
    quiz: {
      pregunta: '¿Qué ocurrió en Argentina el 10 de diciembre de 1983?',
      opciones: [
        { id: 'A', texto: 'Comenzó la guerra de Malvinas.' },
        { id: 'B', texto: 'Raúl Alfonsín asumió la presidencia y se restableció el gobierno democrático constitucional.' },
        { id: 'C', texto: 'Se incorporó la Cláusula Transitoria Primera.' }
      ],
      correcta: 'B',
      explicacion: 'El 10 de diciembre de 1983 se restableció la democracia constitucional con la asunción de Raúl Alfonsín.'
    },
    fuente: {
      institucion: 'Archivo General de la Nación (AGN)',
      descripcion: 'Discurso de asunción presidencial de Raúl Alfonsín ante la Asamblea Legislativa',
      url: 'https://www.casarosada.gob.ar/informacion/discursos',
      tipo: 'Documento histórico'
    }
  },
  {
    id: '12',
    numero: 12,
    year: '1994',
    title: 'La Constitución Nacional y la soberanía',
    resumen: 'La reforma constitucional de 1994 incorporó la Cláusula Transitoria Primera, que establece el objetivo permanente e irrenunciable de recuperar el ejercicio pleno de la soberanía sobre las Islas Malvinas, Georgias del Sur y Sandwich del Sur y los espacios marítimos e insulares correspondientes, respetando el modo de vida de sus habitantes y conforme al derecho internacional.',
    categoria: 'soberania',
    categoriaLabel: 'Soberanía actual',
    image: 'images/historia/12.jpg',
    imageAlt: 'Convención Nacional Constituyente de Santa Fe y texto de la reforma constitucional de 1994',
    contexto: 'En la Convención Nacional Constituyente reunida en Santa Fe y Paraná, las distintas fuerzas políticas consensuaron fijar una postura de Estado obligatoria y unánime respecto a Malvinas.',
    queOcurrio: 'Se aprobó la incorporación de la Cláusula Transitoria Primera como mandato constitucional de máxima jerarquía legal para todos los gobiernos y poderes de la República.',
    porQueImportante: 'Transformó el reclamo territorial en una política de Estado obligatoria y permanente, fijando límites democráticos claros: respeto irrestricto al modo de vida de los habitantes de las islas y apego riguroso al derecho internacional.',
    clausulaLegal: '«La Nación Argentina ratifica su legítima e imprescriptible soberanía sobre las islas Malvinas, Georgias del Sur y Sandwich del Sur y los espacios marítimos e insulares correspondientes, por ser parte integrante del territorio nacional. La recuperación de dichos territorios y el ejercicio pleno de la soberanía, respetando el modo de vida de sus habitantes, y conforme a los principios del derecho internacional, constituyen un objetivo permanente e irrenunciable del pueblo argentino.»',
    quiz: {
      pregunta: '¿Qué establece la Cláusula Transitoria Primera de la Constitución Nacional?',
      opciones: [
        { id: 'A', texto: 'El objetivo permanente e irrenunciable de recuperar el ejercicio pleno de la soberanía, respetando el modo de vida de los habitantes y conforme al derecho internacional.' },
        { id: 'B', texto: 'La finalización de toda negociación internacional.' },
        { id: 'C', texto: 'La creación de la Resolución 2065.' }
      ],
      correcta: 'A',
      explicacion: 'Consagra la recuperación de la soberanía como objetivo permanente e irrenunciable conforme al derecho internacional y respetando el modo de vida de sus habitantes.'
    },
    fuente: {
      institucion: 'Honorable Congreso de la Nación Argentina',
      descripcion: 'Constitución de la Nación Argentina (1994), Cláusula Transitoria Primera',
      url: 'https://www.congreso.gob.ar/constitucionNacional.php',
      tipo: 'Texto constitucional oficial'
    }
  },
  {
    id: '13',
    numero: 13,
    year: '2012-2017',
    title: 'La identificación de los soldados caídos',
    resumen: 'Argentina y el Reino Unido impulsaron un proyecto humanitario para identificar los restos de soldados argentinos sepultados en el Cementerio Argentino de Darwin. Los trabajos de campo comenzaron en 2017 con participación internacional y equipos especializados. El proyecto permitió avanzar en la identificación de soldados y en el acompañamiento a sus familias.',
    categoria: 'memoria',
    categoriaLabel: 'Memoria y democracia',
    image: 'images/historia/13.jpg',
    imageAlt: 'Cruz y placas del Cementerio Argentino de Darwin en el marco del Plan Proyecto Humanitario',
    contexto: 'Durante más de tres décadas, 122 soldados argentinos descansaban en el Cementerio de Darwin bajo tumbas que rezaban "Soldado argentino solo conocido por Dios", sin que sus familias supieran su lugar exacto de descanso.',
    queOcurrio: 'En 2012 el Estado argentino solicitó la intervención humanitaria neutral del Comité Internacional de la Cruz Roja (CICR). Tras un acuerdo con el Reino Unido en 2016, en 2017 un equipo forense internacional —con labor central del prestigioso Equipo Argentino de Antropología Forense (EAAF)— exhumó y analizó muestras de ADN cotejándolas con los familiares.',
    porQueImportante: 'Permitió devolver la identidad a más de 120 combatientes, brindando consuelo y verdad a sus familias en un hito ejemplar del derecho internacional humanitario.',
    quiz: {
      pregunta: '¿Cuál fue el objetivo del proyecto humanitario de identificación en el Cementerio de Darwin?',
      opciones: [
        { id: 'A', texto: 'Construir un puerto comercial.' },
        { id: 'B', texto: 'Identificar los restos de soldados para reconocer su identidad y acompañar a sus familias.' },
        { id: 'C', texto: 'Crear una nueva resolución de las Naciones Unidas.' }
      ],
      correcta: 'B',
      explicacion: 'El objetivo fue identificar a los soldados sepultados sin nombre para restituir su identidad y acompañar a sus familias.'
    },
    fuente: {
      institucion: 'Comité Internacional de la Cruz Roja (CICR) y EAAF',
      descripcion: 'Plan de Proyecto Humanitario (PPH) en el Cementerio de Darwin',
      url: 'https://www.icrc.org/es/document/cementerio-de-darwin-islas-malvinas-informe-identificacion',
      tipo: 'Informe humanitario internacional'
    }
  },
  {
    id: '14',
    numero: 14,
    year: 'Actualidad',
    title: 'Memoria, ciencia y diplomacia',
    resumen: 'El reclamo argentino de soberanía continúa por vías diplomáticas y pacíficas. La investigación histórica, la memoria de quienes participaron en la guerra, el conocimiento de la geografía y la biodiversidad y el trabajo científico contribuyen a comprender la importancia de las islas en el presente.',
    categoria: 'soberania',
    categoriaLabel: 'Soberanía actual',
    image: 'images/historia/14.jpg',
    imageAlt: 'Investigación oceanográfica, paisaje natural malvinense y reclamo diplomático contemporáneo',
    contexto: 'El archipiélago malvinense y los espacios marítimos circundantes poseen un inmenso valor estratégico, ecológico y científico en la conexión entre los océanos Atlántico y Pacífico y el continente Antártico.',
    queOcurrio: 'Argentina mantiene activo el reclamo en el Comité Especial de Descolonización de la ONU, promueve investigaciones oceanográficas y pesqueras a través de la iniciativa Pampa Azul, y fortalece programas educativos de memoria en todo el territorio.',
    porQueImportante: 'Ratifica que Malvinas no es solo un hecho del pasado, sino un desafío presente y futuro de soberanía, desarrollo científico, protección ambiental y memoria viva.',
    quiz: {
      pregunta: '¿De qué manera continúa Argentina el reclamo de soberanía sobre las Islas Malvinas?',
      opciones: [
        { id: 'A', texto: 'Mediante videojuegos exclusivamente.' },
        { id: 'B', texto: 'A través de acciones militares actuales.' },
        { id: 'C', texto: 'A través de vías diplomáticas y pacíficas.' }
      ],
      correcta: 'C',
      explicacion: 'Argentina sostiene su reclamo de soberanía exclusivamente mediante negociaciones diplomáticas, multilaterales y pacíficas.'
    },
    fuente: {
      institucion: 'Secretaría de Malvinas, Antártida y Atlántico Sur (Cancillería Argentina)',
      descripcion: 'Lineamientos de la Política de Estado sobre la Cuestión Malvinas',
      url: 'https://www.cancilleria.gob.ar/es/politica-exterior/cuestion-malvinas',
      tipo: 'Documento oficial de Cancillería'
    }
  }
];
