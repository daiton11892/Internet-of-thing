#include <SocketIOClient.h>
#include <WiFiClient.h>
#include <DHT.h>

#define wifi_ssid "Vuong_Ton"
#define wifi_password "12345@ton"

#define LedPin_1 2
#define LedPin_2 12
#define DHTTYPE DHT11
#define DHTPIN  4

// Server Ip
String host = "10.10.0.1";
// Server port
int port = 8000;

// Khởi tạo socket
SocketIOClient socket;

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

// Thay đổi trạng thái đèn theo dữ liệu nhận được
void changeLedState(String data) {
    if (data == "[\"led-change\",\"on_1\"]") {
        digitalWrite(LedPin_1, HIGH);
    } 
    else if(data == "[\"led-change\",\"off_1\"]")
    {
        digitalWrite(LedPin_1, LOW);
    }
    else if (data == "[\"led-change\",\"on_2\"]") {
        digitalWrite(LedPin_2, HIGH);
    } 
    else if(data == "[\"led-change\",\"off_2\"]")
    {
        digitalWrite(LedPin_2, LOW);
    }
    else if (data == "[\"led-change\",\"on_all\"]") {
        digitalWrite(LedPin_1, HIGH);
        digitalWrite(LedPin_2, HIGH);
    } 
    else if(data == "[\"led-change\",\"off_all\"]")
    {
        digitalWrite(LedPin_1, LOW);
        digitalWrite(LedPin_2, LOW);
    }
}

void setup() {

    // Cài đặt chân LED_BUILTIN là chân đầu ra tín hiệu
    pinMode(LedPin_1, OUTPUT);
    pinMode(LedPin_2, OUTPUT);
    
    // Cài đặt giá trị mặc định là đèn tắt
    digitalWrite(LedPin_1, LOW);
    digitalWrite(LedPin_2, LOW);
    
    // Bắt đầu kết nối serial với tốc độ baud là 115200.
    // Khi bạn bật serial monitor lên để xem log thì phải set đúng tốc độ baud này.
    Serial.begin(115200);
    setup_wifi();
    
    // Lắng nghe sự kiện led-change thì sẽ thực hiện hàm changeLedState
    socket.on("led-change", changeLedState);
    
    // Kết nối đến server
    socket.connect(host, port);
}

void loop() {
     // Luôn luôn giữ kết nối với server.
    socket.monitor();
}
