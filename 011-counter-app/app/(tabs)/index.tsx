import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FetchDeDatos = () => {
  // 1. Estado para almacenar los datos (simulados).
  //    Inicialmente un objeto vacío, se llenará cuando el timer "cargue" los datos.
  const [datos, setDatos] = useState<any>({});

  // 2. Estado para controlar si estamos cargando los datos.
  //    Comienza en 'false' porque el timer no se inicia automáticamente al montar.
  const [loading, setLoading] = useState(false);

  // 3. Estado para llevar el conteo de las "refrescadas" del timer.
  //    Se incrementará cada vez que el setTimeout se dispare.
  const [refreshCount, setRefreshCount] = useState(0);

  // 4. Estado para controlar si el timer está activo o parado.
  //    Comienza en 'false' (parado).
  const [isTimerActive, setIsTimerActive] = useState(false);

  // 5. useRef para almacenar la referencia del timer.
  //    Esto es crucial para poder limpiar el timer cuando el componente se desmonte
  //    o cuando el timer se detenga, evitando fugas de memoria y comportamientos inesperados.
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- useEffect para manejar el ciclo de vida del timer ---
  useEffect(() => {
    // Esta función de limpieza se ejecutará cuando el componente se desmonte
    // o antes de que el efecto se vuelva a ejecutar (si sus dependencias cambian).
    // Asegura que siempre limpiemos cualquier timer activo para evitar problemas.
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // El array de dependencias vacío [] significa que este efecto se ejecuta solo una vez al montar.

  // --- Función para iniciar el timer ---
  const startTimer = () => {
    // Si el timer ya está activo, no hacemos nada para evitar múltiples timers.
    if (isTimerActive) return;

    // Marcamos que el timer está activo.
    setIsTimerActive(true);
    // Ponemos el estado de carga en true para mostrar el indicador.
    setLoading(true);
    // Limpiamos cualquier timer anterior por si acaso.
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Iniciamos el setTimeout y guardamos su referencia en timerRef.
    timerRef.current = setTimeout(() => {
      // Simulación de carga de datos.
      setDatos({ titulo: "Datos cargados", contenido: `Aquí están los datos de la carga número ${refreshCount + 1}.` });
      // Detenemos el estado de carga.
      setLoading(false);
      // Incrementamos el contador de refrescos.
      setRefreshCount(prevCount => prevCount + 1);
      // Marcamos el timer como inactivo una vez que ha terminado su ejecución.
      setIsTimerActive(false);
    }, 2000); // El timer dura 2 segundos.
  };

  // --- Función para detener el timer ---
  const stopTimer = () => {
    // Si el timer está inactivo, no hacemos nada.
    if (!isTimerActive) return;

    // Limpiamos el timer usando la referencia guardada.
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null; // Reiniciamos la referencia.
    }
    // Marcamos que el timer está inactivo.
    setIsTimerActive(false);
    // Ponemos el estado de carga en false si estaba activo.
    setLoading(false);
    // Opcional: Podrías querer resetear los datos o mostrar un mensaje específico.
    setDatos({ titulo: "Timer parado", contenido: "El timer ha sido detenido. Pulsa 'Iniciar Timer' para continuar." });
  };

  // --- Renderizado del componente ---
  return (
    <View style={styles.container}>
      {/* Contador de refrescos */}
      <Text style={styles.counterText}>Refrescos del Timer: {refreshCount}</Text>

      {/* Botón para Iniciar/Detener el Timer */}
      <TouchableOpacity
        // El estilo del botón cambia según si el timer está activo.
        style={[styles.button, isTimerActive ? styles.buttonStop : styles.buttonStart]}
        // La acción del botón depende de si el timer está activo.
        onPress={isTimerActive ? stopTimer : startTimer}
      >
        <Text style={styles.buttonText}>
          {isTimerActive ? "Detener Timer" : "Iniciar Timer"}
        </Text>
      </TouchableOpacity>

      {/* Mensaje de estado del timer */}
      <Text style={styles.statusText}>
        Estado del Timer: {isTimerActive ? "Activo" : "Parado"}
      </Text>

      {/* Condicional para mostrar el ActivityIndicator o los datos */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando datos...</Text>
        </View>
      ) : (
        <View style={styles.dataContainer}>
          <Text style={styles.dataContent}>{datos.contenido}</Text>
        </View>
      )}
    </View>
  );
};

// --- Estilos para el componente ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  counterText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonStart: {
    backgroundColor: '#4CAF50', // Verde para iniciar
  },
  buttonStop: {
    backgroundColor: '#f44336', // Rojo para detener
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  dataContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
  },
  dataContent: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default FetchDeDatos;