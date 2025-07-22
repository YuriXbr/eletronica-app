# 🌈 Controle RGB ESP32 - WebSocket Guide

Este guia mostra como receber dados RGB do aplicativo via WebSocket e controlar LEDs RGB com ESP32.

## 📋 Índice

- [Requisitos](#requisitos)
- [Configuração do Hardware](#configuração-do-hardware)
- [Código da ESP32](#código-da-esp32)
- [Configuração da Rede](#configuração-da-rede)
- [Formato dos Dados](#formato-dos-dados)
- [Troubleshooting](#troubleshooting)
- [Exemplos Avançados](#exemplos-avançados)

---

## 🛠️ Requisitos

### Hardware
- **ESP32** 
- **LEDs RGB** ou **Fita LED RGB** 
- **Resistores**
- **Protoboard** e **jumpers**
- **Fonte**

### Software
- **Arduino IDE** com suporte ESP32
- **Bibliotecas**:
  - `WiFi.h` (nativa)
  - `WebSocketsServer.h` 
  - `ArduinoJson.h`

---

## ⚡ Configuração do Hardware

### Esquema de Ligação - LED RGB Comum

```
ESP32          LED RGB
GPIO 25  ----[220Ω]----  Pino R (Vermelho)
GPIO 26  ----[220Ω]----  Pino G (Verde) 
GPIO 27  ----[220Ω]----  Pino B (Azul)
GND      ---------------  Pino GND (Cátodo comum)
```

### Esquema de Ligação - Fita LED RGB

```
ESP32          Fita LED RGB (12V)
GPIO 25  ----[MOSFET]----  Canal R
GPIO 26  ----[MOSFET]----  Canal G  
GPIO 27  ----[MOSFET]----  Canal B
GND      ----------------  GND Fita
+12V     ----------------  +12V Fita
```

---

## 💾 Código da ESP32

### Instalação das Bibliotecas

No Arduino IDE:
1. **Tools > Manage Libraries**
2. Instale: `WebSockets by Markus Sattler`
3. Instale: `ArduinoJson by Benoit Blanchon`

### Código Principal

```cpp
#include <WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>

// Configurações de Rede
const char* ssid = "SUA_REDE_WIFI";
const char* password = "SUA_SENHA_WIFI";

// Pinos dos LEDs RGB
const int PIN_RED = 25;
const int PIN_GREEN = 26;
const int PIN_BLUE = 27;

// Configuração PWM
const int PWM_FREQ = 5000;
const int PWM_RESOLUTION = 8; // 0-255
const int PWM_CHANNEL_R = 0;
const int PWM_CHANNEL_G = 1;
const int PWM_CHANNEL_B = 2;

// WebSocket Server na porta 8080
WebSocketsServer webSocket = WebSocketsServer(8080);

// Valores RGB atuais
int currentRed = 0;
int currentGreen = 0;
int currentBlue = 0;

void setup() {
  Serial.begin(115200);
  Serial.println("🌈 ESP32 RGB LED Server");
  
  // Configurar pinos PWM
  setupPWM();
  
  // Conectar ao WiFi
  connectToWiFi();
  
  // Iniciar WebSocket
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
  
  Serial.println("✅ Sistema iniciado!");
  printSystemInfo();
}

void loop() {
  webSocket.loop();
  
  // Piscar LED interno para mostrar que o loop está recebendo iteraç~oes
  static unsigned long lastBlink = 0;
  if (millis() - lastBlink > 2000) {
    digitalWrite(2, !digitalRead(2));
    lastBlink = millis();
  }
}

void setupPWM() {
  // Configurar canais PWM
  ledcSetup(PWM_CHANNEL_R, PWM_FREQ, PWM_RESOLUTION);
  ledcSetup(PWM_CHANNEL_G, PWM_FREQ, PWM_RESOLUTION);
  ledcSetup(PWM_CHANNEL_B, PWM_FREQ, PWM_RESOLUTION);
  
  // Anexar pinos aos canais
  ledcAttachPin(PIN_RED, PWM_CHANNEL_R);
  ledcAttachPin(PIN_GREEN, PWM_CHANNEL_G);
  ledcAttachPin(PIN_BLUE, PWM_CHANNEL_B);
  
  // LED interno para debug
  pinMode(2, OUTPUT);
  
  // Iniciar com LEDs apagados
  setRGBColor(0, 0, 0);
  
  Serial.println("🔧 PWM configurado nos pinos 25, 26, 27");
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("📡 Conectando ao WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.println("✅ WiFi conectado!");
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("👋 Cliente [%u] desconectado\n", num);
      break;
      
    case WStype_CONNECTED:
      {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("🤝 Cliente [%u] conectado: %d.%d.%d.%d\n", 
                     num, ip[0], ip[1], ip[2], ip[3]);
        
        // Enviar estado atual para o novo cliente
        sendCurrentState(num);
      }
      break;
      
    case WStype_TEXT:
      Serial.printf("📨 Dados recebidos [%u]: %s\n", num, payload);
      processRGBMessage((char*)payload);
      break;
      
    default:
      break;
  }
}

void processRGBMessage(const char* jsonString) {
  // Parse do JSON
  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, jsonString);
  
  if (error) {
    Serial.print("❌ Erro ao fazer parse do JSON: ");
    Serial.println(error.c_str());
    return;
  }
  
  // Verificar se é mensagem RGB
  if (doc["type"] != "rgb") {
    Serial.println("⚠️ Tipo de mensagem não é 'rgb'");
    return;
  }
  
  // Extrair valores RGB
  int r = doc["values"]["r"];
  int g = doc["values"]["g"];  
  int b = doc["values"]["b"];
  
  // Validar valores (0-255)
  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);
  
  // Aplicar nova cor
  setRGBColor(r, g, b);
  
  Serial.printf("🎨 Cor atualizada: RGB(%d, %d, %d)\n", r, g, b);
}

void setRGBColor(int red, int green, int blue) {
  // Salvar valores atuais
  currentRed = red;
  currentGreen = green;
  currentBlue = blue;
  
  // Aplicar PWM nos LEDs
  ledcWrite(PWM_CHANNEL_R, red);
  ledcWrite(PWM_CHANNEL_G, green);
  ledcWrite(PWM_CHANNEL_B, blue);
  
  // Debug no Serial
  Serial.printf("💡 LEDs: R=%d G=%d B=%d\n", red, green, blue);
}

void sendCurrentState(uint8_t clientNum) {
  // Criar JSON com estado atual
  DynamicJsonDocument doc(512);
  doc["type"] = "state";
  doc["values"]["r"] = currentRed;
  doc["values"]["g"] = currentGreen;
  doc["values"]["b"] = currentBlue;
  
  String message;
  serializeJson(doc, message);
  
  webSocket.sendTXT(clientNum, message);
  Serial.printf("📤 Estado enviado para cliente [%u]: %s\n", clientNum, message.c_str());
}

void printSystemInfo() {
  Serial.println("\n📋 === INFORMAÇÕES DO SISTEMA ===");
  Serial.printf("🔗 IP Local: %s\n", WiFi.localIP().toString().c_str());
  Serial.printf("🌐 WebSocket: ws://%s:8080\n", WiFi.localIP().toString().c_str());
  Serial.printf("📡 SSID: %s\n", WiFi.SSID().c_str());
  Serial.printf("📶 Sinal: %d dBm\n", WiFi.RSSI());
  Serial.printf("🔧 Pinos RGB: %d, %d, %d\n", PIN_RED, PIN_GREEN, PIN_BLUE);
  Serial.println("================================\n");
  
  Serial.println("💡 Digite no app o endereço:");
  Serial.printf("   ws://%s:8080\n\n", WiFi.localIP().toString().c_str());
}
```

---

## 🌐 Configuração da Rede

### 1. Alterar Credenciais WiFi

```cpp
const char* ssid = "NOME_DA_SUA_REDE";
const char* password = "SENHA_DA_SUA_REDE";
```

### 2. Descobrir o IP da ESP32

Após carregar o código:
1. Abra o **Serial Monitor** (115200 baud)
2. Anote o IP mostrado (ex: `192.168.1.150`)
3. Configure no app: `ws://192.168.1.150:8080`

### 3. Configurar Firewall

Se não conectar, libere a **porta 8080** no roteador.

---

## 📨 Formato dos Dados

### Dados Enviados pelo App

```json
{
  "type": "rgb",
  "values": {
    "r": 255,
    "g": 128, 
    "b": 64
  },
  "timestamp": 1674739200000
}
```

### Dados de Resposta (Estado Atual)

```json
{
  "type": "state",
  "values": {
    "r": 255,
    "g": 128,
    "b": 64
  }
}
```

---

## 🔧 Troubleshooting

### ❌ ESP32 não conecta ao WiFi
- Verificar SSID e senha
- ESP32 só suporta WiFi 2.4GHz
- Verificar se não há caracteres especiais na senha

### ❌ App não conecta ao WebSocket
- Confirmar IP correto da ESP32
- Verificar se estão na mesma rede
- Testar com: `ws://IP_DA_ESP32:8080`
- Verificar firewall do roteador

### ❌ LEDs não acendem
- Verificar conexões dos pinos 25, 26, 27
- Testar LEDs individualmente
- Verificar se é cátodo comum
- Confirmar resistores de 220Ω

### ❌ Cores erradas
- LEDs de ânodo comum: inverter lógica
- Alterar: `ledcWrite(canal, 255 - valor)`

---

## 🚀 Exemplos Avançados

### Efeito Fade Suave

```cpp
void fadeToColor(int targetR, int targetG, int targetB) {
  int steps = 50;
  int delayTime = 10;
  
  for (int i = 0; i <= steps; i++) {
    int r = currentRed + (targetR - currentRed) * i / steps;
    int g = currentGreen + (targetG - currentGreen) * i / steps;  
    int b = currentBlue + (targetB - currentBlue) * i / steps;
    
    setRGBColor(r, g, b);
    delay(delayTime);
  }
}
```

### Salvamento em EEPROM

```cpp
#include <EEPROM.h>

void saveColorToEEPROM() {
  EEPROM.write(0, currentRed);
  EEPROM.write(1, currentGreen);
  EEPROM.write(2, currentBlue);
  EEPROM.commit();
}

void loadColorFromEEPROM() {
  currentRed = EEPROM.read(0);
  currentGreen = EEPROM.read(1);
  currentBlue = EEPROM.read(2);
  setRGBColor(currentRed, currentGreen, currentBlue);
}
```

### Múltiplos LEDs/Fitas

```cpp
// Adicionar mais canais PWM
const int PWM_CHANNEL_R2 = 3;
const int PWM_CHANNEL_G2 = 4;
const int PWM_CHANNEL_B2 = 5;

void setRGBColor(int red, int green, int blue) {
  // LED 1
  ledcWrite(PWM_CHANNEL_R, red);
  ledcWrite(PWM_CHANNEL_G, green);
  ledcWrite(PWM_CHANNEL_B, blue);
  
  // LED 2  
  ledcWrite(PWM_CHANNEL_R2, red);
  ledcWrite(PWM_CHANNEL_G2, green);
  ledcWrite(PWM_CHANNEL_B2, blue);
}
```

---

## 📚 Recursos Adicionais

- [Documentação ESP32 PWM](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/ledc.html)
- [ArduinoJson Documentation](https://arduinojson.org/)
- [WebSocketsServer Library](https://github.com/Links2004/arduinoWebSockets)

---

## 🤝 Contribuição

Não tem kkkk

---

**✨ Divirta-se controlando LEDs RGB remotamente! 🌈**
