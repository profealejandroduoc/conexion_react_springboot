# Conexión aplicación React con SpringBoot

Cada página interactúa con la API de Spring Boot utilizando la librería `axios` y un servicio centralizado (`src/services/mascota.service.ts`).

Instalar axios
`npm install axios`

## Funcionamiento

1. Asegurate de descargar el proyecto con la API rest desde [https://github.com/profealejandroduoc/unitarias](https://github.com/profealejandroduoc/unitarias) y en Mysql crea una base de datos con el nombre *mascotas_db*
2. Prueba el correcto funcionamiento del proyecto

3. Ejecuta `npm install` (solo la primera vez) de este repositorio para reconstruir las dependencias.
4. Inicia el servidor :

   ```bash
   npm run dev
   ```

5. Abre el navegador en la URL indicada por la terminal (por defecto `http://localhost:5173`). La pámgina no debería funcionatr y estar bloqueada por CORS

6. Para corregir esto deberemos agregar al proyecto de SpringBoot lo siguiente:

crea una carpeta *config* en la raiz del proyecto al mismo nivel de las carpeta controller, repository, etc.
`.....src\main\java\com\pruebas\unitarias\config`

Crea un archivo llamado *CorsConfig.java*9 con el siguiente código:

```java
package com.pruebas.unitarias.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Aplica a todos los endpoints
                        .allowedOrigins(
                                "http://localhost:5173",   // acceso a vite
                                "http://localhost:3000",   // (opcional)
                                "https://tu-frontend.com"  // Producción si es que lo subes
                        )
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .exposedHeaders("Location") // (opcional) si devuelves Location u otros
                        .allowCredentials(false)      // Si usas cookies o auth con fetch/axios { withCredentials: true } si no false como acá
                        .maxAge(3600);               //gestiona el tiempo en caché
            }
        };
    }
}


```

7. Vuelve a compilar el proyecto en Spring y asegurate con postman que funcione

8. Levanta el servidor vite y debería estar completo su funcionamiento
