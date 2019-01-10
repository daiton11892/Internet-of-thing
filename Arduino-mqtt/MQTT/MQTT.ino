#include <ESP8266WiFi.h>
// Khai báo thư viện
#include <PubSubClient.h>
#include <DHT.h>

//Truy cập wifi raspberry
#define wifi_ssid "utc2hcm"
#define wifi_password "12345678"

//Khai báo address MQTT
#define mqtt_server "10.10.0.1"
//Khai báo port MQTT
#define mqtt_port 1883

//Ở đây nếu ta muốn sử dụng bảo mật cho giao thức thì bỏ chú thích
//#define mqtt_user "pi"
//#define mqtt_password "ch1602023"

//Khai báo tên khách hàng
#define client_name "Client_1"

//Khai báo topic để gửi nhận
#define humidity_topic "Humi"
#define temperature_topic "Temp"
#define gas_topic "Gas"


#define DHTTYPE DHT11
#define DHTPIN  4
#define DOPin 2
#define ledPin 13
#define sensorPin A0

#define client_name "Client_1"

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE, 11);

void setup() {
  Serial.begin(9600);
  pinMode(DOPin, INPUT);
  pinMode(ledPin, OUTPUT);
  dht.begin();
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("ESP8266 MAC: ");
  Serial.println(WiFi.macAddress());
  Serial.print("Connecting to ");
  Serial.println(wifi_ssid);

  WiFi.begin(wifi_ssid, wifi_password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect(client_name)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

long lastMsg = 0;
float temp = 0.0;
float hum = 0.0;
int gas = 0;

void loop() {
    if (!client.connected()) {
      reconnect();
    }
    client.loop();
    long now = millis();
    if (now - lastMsg > 60000) {
      lastMsg = now;

      float newTemp = dht.readTemperature();
      float newHum = dht.readHumidity();
      int newGas = analogRead(sensorPin);
      
      temp = newTemp;
      Serial.print("New temperature:");
      Serial.println(String(temp).c_str());
      client.publish(temperature_topic, String(temp).c_str(), true);
  
      hum = newHum;
      Serial.print("New humidity:");
      Serial.println(String(hum).c_str());
      client.publish(humidity_topic, String(hum).c_str(), true);

      // read the value from the sensor:
      gas = newGas;
      Serial.print("New gas:");
      Serial.println(String(gas).c_str());
      client.publish(gas_topic, String(gas).c_str(), true);
      
      // turn the ledPin on if triggered
      if (digitalRead(DOPin) == HIGH){
      digitalWrite(ledPin, LOW);
      Serial.println("Digital Output = OFF");
      }
      else {
      digitalWrite(ledPin, HIGH);
      Serial.println("Digital Output = ON");
      }
    }
}
